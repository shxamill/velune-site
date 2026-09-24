'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const velRef = useRef<HTMLSpanElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const uneRef = useRef<HTMLSpanElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let isUnmounted = false;
    let rAF: number;
    let targetP = 0;
    let currentP = 0;

    let fontsReady = false;
    let vidReady = false;

    const checkResources = () => {
      if (fontsReady && vidReady) {
        targetP = 100;
      }
    };

    // 1. Fonts readiness
    document.fonts.ready.then(() => {
      fontsReady = true;
      checkResources();
    });

    // 2. Critical video readiness
    const checkVideo = () => {
      const vid = document.getElementById('hero-focal-video') as HTMLVideoElement;
      if (!vid) {
        if (!isUnmounted) setTimeout(checkVideo, 50);
        return;
      }
      if (vid.readyState >= 1) {
        vidReady = true;
        checkResources();
      } else {
        vid.addEventListener('loadedmetadata', () => {
          vidReady = true;
          checkResources();
        }, { once: true });
        
        // Fallback max wait
        setTimeout(() => {
          if (!vidReady) {
            vidReady = true;
            checkResources();
          }
        }, 3000);
      }
    };
    checkVideo();

    // Hide hero content immediately to prevent flashes
    gsap.set([
      '.orbit-item-inner', 
      '.orbit-focal', 
      '.hero-typography-inner',
      'header'
    ], { opacity: 0 });

    const startTime = Date.now();
    const minDuration = 3000;

    const tick = () => {
      if (isUnmounted) return;
      const elapsed = Date.now() - startTime;

      if (targetP < 100) {
        // Increment target up to 99 based on minDuration
        targetP = Math.min(99, (elapsed / minDuration) * 99);
      }

      currentP += (targetP - currentP) * 0.1;

      // When we hit the conditions to exit
      if (currentP > 99.5 && targetP === 100 && elapsed >= minDuration) {
        currentP = 100;
        setProgress(100);
        triggerExit();
        return;
      }

      setProgress(Math.floor(currentP));
      rAF = requestAnimationFrame(tick);
    };

    rAF = requestAnimationFrame(tick);

    const triggerExit = () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const tl = gsap.timeline({
        onComplete: () => {
          if (onComplete) onComplete();
        }
      });

      if (prefersReducedMotion) {
        tl.to(containerRef.current, { opacity: 0, duration: 1, ease: 'power2.inOut', pointerEvents: 'none' });
        tl.to([
          '.orbit-item-inner', 
          '.orbit-focal', 
          '.hero-typography-inner',
          'header'
        ], { opacity: 1, duration: 1 }, '<');
      } else {
        // Step 1: Number gently disappears
        tl.to(numRef.current, { opacity: 0, duration: 0.35, ease: 'power3.out' });

        // Step 2: VEL + UNE smoothly reunite
        tl.to(numRef.current, { width: 0, margin: 0, padding: 0, duration: 0.45, ease: 'power3.out' });

        // Step 3: Wordmark scales down/fades
        tl.to(wordmarkRef.current, { scale: 0.9, opacity: 0, duration: 0.5, ease: 'power3.out' }, '+=0.2');
        
        // Fade out preloader background
        tl.to(containerRef.current, { opacity: 0, duration: 0.6, ease: 'power2.inOut', pointerEvents: 'none' }, '<0.1');

        // Restore header
        tl.to('header', { opacity: 1, duration: 0.8, ease: 'power2.inOut' }, '<0.2');

        // Step 4: Hero media reveal
        tl.fromTo('.orbit-item-1 .orbit-item-inner, .orbit-item-3 .orbit-item-inner, .orbit-item-5 .orbit-item-inner',
          { x: -60, opacity: 0 },
          { x: 0, opacity: 1, duration: 1.2, ease: 'power3.out', stagger: 0.1 },
          '-=0.2'
        );

        tl.fromTo('.orbit-item-2 .orbit-item-inner, .orbit-item-4 .orbit-item-inner',
          { x: 60, opacity: 0 },
          { x: 0, opacity: 1, duration: 1.2, ease: 'power3.out', stagger: 0.1 },
          '<'
        );

        tl.fromTo('.orbit-focal',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' },
          '<'
        );

        // Step 5: Hero typography fades upward
        tl.fromTo('.hero-typography-inner',
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
          '-=0.8'
        );
      }
    };

    return () => {
      isUnmounted = true;
      cancelAnimationFrame(rAF);
    };
  }, [onComplete]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-max w-full h-[100dvh] bg-canvas-porcelain flex items-center justify-center"
    >
      <div 
        ref={wordmarkRef}
        className="flex items-center text-text-charcoal font-display text-[2rem] md:text-[3rem] tracking-[0.2em] uppercase"
      >
        <span ref={velRef} className="inline-block">VEL</span>
        <span 
          ref={numRef} 
          className="inline-block w-[60px] md:w-[80px] text-center font-body text-text-muted text-[1rem] md:text-[1.25rem] tracking-normal overflow-hidden whitespace-nowrap"
        >
          {progress}
        </span>
        <span ref={uneRef} className="inline-block">UNE</span>
      </div>
    </div>
  );
}
