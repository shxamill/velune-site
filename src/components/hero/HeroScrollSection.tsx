'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HeroNavigation } from './HeroNavigation';
import { HeroTypography } from './HeroTypography';
import { HeroMedia } from './HeroMedia';
import { HeroFocalMedia } from './HeroFocalMedia';

gsap.registerPlugin(ScrollTrigger);

export function HeroScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
  
  useEffect(() => {
    let fontsLoaded = false;
    let videoLoaded = false;
    let timerDone = false;
    
    const checkReady = () => {
      if (fontsLoaded && videoLoaded && timerDone) {
        setIsReady(true);
      }
    };

    // 1. Minimum 3 second timer
    setTimeout(() => {
      timerDone = true;
      checkReady();
    }, 3000);

    // 2. Fonts
    document.fonts.ready.then(() => {
      fontsLoaded = true;
      checkReady();
    });
    
    // 3. Video Metadata
    const checkVideo = () => {
      const vid = document.getElementById('hero-focal-video') as HTMLVideoElement;
      if (!vid) {
        setTimeout(checkVideo, 50);
        return;
      }
      if (vid.readyState >= 1) { // HAVE_METADATA
        videoLoaded = true;
        checkReady();
      } else {
        vid.addEventListener('loadedmetadata', () => {
          videoLoaded = true;
          checkReady();
        }, { once: true });
        // Fallback max wait 3s
        setTimeout(() => {
          if (!videoLoaded) {
            videoLoaded = true;
            checkReady();
          }
        }, 3000);
      }
    };
    checkVideo();
  }, []);

  useEffect(() => {
    if (!isReady) return;

    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const mm = gsap.matchMedia();

      const getCinematicTransform = () => {
        const focalVisual = document.querySelector('.focal-visual') as HTMLElement;
        if (!focalVisual) return { scale: 1, x: 0, y: 0 };
        
        // Temporarily clear transforms to get raw layout bounds
        const currentTransform = focalVisual.style.transform;
        focalVisual.style.transform = 'none';
        const rect = focalVisual.getBoundingClientRect();
        focalVisual.style.transform = currentTransform;

        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        const scaleX = viewportWidth / rect.width;
        const scaleY = viewportHeight / rect.height;
        const scale = Math.max(scaleX, scaleY); // MINIMUM POSSIBLE CROP
        
        const currentCenterX = rect.left + rect.width / 2;
        const currentCenterY = rect.top + rect.height / 2;
        
        const targetCenterX = viewportWidth / 2;
        const targetCenterY = viewportHeight / 2;
        
        const x = targetCenterX - currentCenterX;
        const y = targetCenterY - currentCenterY;
        
        return { scale, x, y };
      };

      const getDestabilizeConfig = (isMobile: boolean) => ({
        orbit1: isMobile ? { y: -5, x: -2, scale: 0.98, opacity: 0.8 } : { y: -20, x: -10, scale: 0.95, opacity: 0.8 },
        orbit2: isMobile ? { y: -8, x: 5, scale: 0.98, opacity: 0.8 } : { y: -10, x: 15, scale: 0.94, opacity: 0.7 },
        orbit3: isMobile ? { y: 5, x: -5, scale: 0.98, opacity: 0.8 } : { y: 15, x: -20, scale: 0.90, opacity: 0.6 },
        orbit4: isMobile ? { y: 8, x: 2, scale: 0.98, opacity: 0.8 }   : { y: 5, x: 10, scale: 0.96, opacity: 0.8 },
        orbit5: isMobile ? { y: 4, x: -2, scale: 0.98, opacity: 0.8 }  : { y: 10, x: -10, scale: 0.94, opacity: 0.7 }
      });

      const setupScrollTriggers = () => {
        mm.add("(min-width: 1025px) and (prefers-reduced-motion: no-preference)", () => {
          const tl = gsap.timeline({
            scrollTrigger: { 
              trigger: containerRef.current, start: 'top top', end: '+=300%', pin: true, scrub: 1, invalidateOnRefresh: true 
            }
          });
        
        const cfg = getDestabilizeConfig(false);

        // 0-25%: gentle orbital movement
        tl.to('.orbit-item-1', { ...cfg.orbit1, duration: 2.5 }, 0)
          .to('.orbit-item-2', { ...cfg.orbit2, duration: 2.5 }, 0)
          .to('.orbit-item-3', { ...cfg.orbit3, duration: 2.5 }, 0)
          .to('.orbit-item-4', { ...cfg.orbit4, duration: 2.5 }, 0)
          .to('.orbit-item-5', { ...cfg.orbit5, duration: 2.5 }, 0)
          .to('.focal-visual', { y: -5, scale: 1.02, duration: 2.5 }, 0);

        // 25-45%: progressive drift + blur
        tl.to('.orbit-item', { filter: 'blur(15px)', opacity: 0, duration: 2.0 }, 2.5)
          .to('.focal-visual', { y: -15, scale: 1.05, duration: 2.0 }, 2.5);

        // 45-55%: typography exits
        tl.to('.hero-typography', { y: -80, opacity: 0, scale: 0.95, duration: 1.0 }, 4.5);

        // 55-80%: focal video continuously expands + header becomes transparent overlay
        tl.to('.focal-visual', { 
             scale: () => getCinematicTransform().scale,
             x: () => getCinematicTransform().x,
             y: () => getCinematicTransform().y,
             borderRadius: 0,
             transformOrigin: "50% 50%",
             duration: 2.5, ease: "power2.inOut"
          }, 5.5);

        // 80-95%: hold (Nothing happens, timeline advances to 9.5)
        
        // 95-100%: exit
        tl.to('.focal-visual', { opacity: 0, duration: 0.5 }, 9.5);
      });

      mm.add("(min-width: 768px) and (max-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: containerRef.current, start: 'top top', end: '+=260%', pin: true, scrub: 1, invalidateOnRefresh: true }
        });
        const cfg = getDestabilizeConfig(false);

        tl.to('.orbit-item-1', { ...cfg.orbit1, duration: 2.5 }, 0)
          .to('.orbit-item-3', { ...cfg.orbit3, duration: 2.5 }, 0)
          .to('.orbit-item-5', { ...cfg.orbit5, duration: 2.5 }, 0)
          .to('.focal-visual', { y: -5, scale: 1.02, duration: 2.5 }, 0);

        tl.to('.orbit-item', { filter: 'blur(12px)', opacity: 0, duration: 2.0 }, 2.5)
          .to('.focal-visual', { y: -10, scale: 1.04, duration: 2.0 }, 2.5);

        tl.to('.hero-typography', { y: -60, opacity: 0, duration: 1.0 }, 4.5);

        tl.to('.focal-visual', { 
             scale: () => getCinematicTransform().scale,
             x: () => getCinematicTransform().x,
             y: () => getCinematicTransform().y,
             borderRadius: 0, transformOrigin: "50% 50%", duration: 2.5, ease: "power2.inOut"
          }, 5.5);

        tl.to('.focal-visual', { opacity: 0, duration: 0.5 }, 9.5);
      });

      mm.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: containerRef.current, start: 'top top', end: '+=225%', pin: true, scrub: 1, invalidateOnRefresh: true }
        });

        tl.to('.focal-visual', { y: -5, scale: 1.02, duration: 2.5 }, 0);
        tl.to('.focal-visual', { y: -10, scale: 1.04, duration: 2.0 }, 2.5);

        tl.to('.hero-typography', { y: -40, opacity: 0, duration: 1.0 }, 4.5);

        tl.to('.focal-visual', { 
             scale: () => getCinematicTransform().scale,
             x: () => getCinematicTransform().x,
             y: () => getCinematicTransform().y,
             borderRadius: 0, transformOrigin: "50% 50%", duration: 2.5, ease: "power2.inOut"
          }, 5.5);

        tl.to('.focal-visual', { opacity: 0, duration: 0.5 }, 9.5);
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: containerRef.current, start: 'top top', end: '+=150%', pin: true, scrub: 1 }
        });
        tl.to('.hero-typography', { opacity: 0, duration: 1 }, 1.0)
          .to('.orbit-item', { opacity: 0, duration: 1 }, 1.0)
          .to('.focal-visual', { opacity: 0, duration: 1 }, 4.0);
      });
      }; // end setupScrollTriggers

      if (prefersReducedMotion) {
        gsap.fromTo('#spatial-hero-stage', { opacity: 0 }, { opacity: 1, duration: 1.2 });
        setupScrollTriggers();
      } else {
        // Hero cinematic entrance after preloader exits
        gsap.set('#spatial-hero-stage', { opacity: 1 });
        
        const introTl = gsap.timeline({ onComplete: setupScrollTriggers });
        
        // Left media
        introTl.fromTo('.orbit-item-1 .orbit-item-inner, .orbit-item-3 .orbit-item-inner, .orbit-item-5 .orbit-item-inner',
          { x: -80, opacity: 0 }, { x: 0, opacity: 1, duration: 1.4, ease: 'power3.out', stagger: 0.1 }, 0
        );
        
        // Right media
        introTl.fromTo('.orbit-item-2 .orbit-item-inner, .orbit-item-4 .orbit-item-inner',
          { x: 80, opacity: 0 }, { x: 0, opacity: 1, duration: 1.4, ease: 'power3.out', stagger: 0.1 }, 0.1
        );
        
        // Focal media
        introTl.fromTo('.orbit-focal',
          { y: 40, scale: 0.98, opacity: 0 }, { y: 0, scale: 1, opacity: 1, duration: 1.2, ease: 'power3.out' }, 0.2
        );
        
        // Typography
        introTl.fromTo('.hero-typography-inner',
          { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 1.0, ease: 'power3.out' }, 0.6
        );
      }

    }, containerRef);

    return () => ctx.revert();
  }, [isReady]);

  return (
    <>
      {/* Global Preloader */}
      <div 
        className="fixed inset-0 z-[9999] w-[100vw] h-[100dvh] bg-canvas-porcelain flex items-center justify-center transition-opacity duration-1000 pointer-events-none"
        style={{ opacity: isReady ? 0 : 1 }}
      >
        <span className="font-label-caps tracking-[0.2em] text-text-charcoal uppercase animate-pulse">
          VELUNE
        </span>
      </div>

      <div className="bg-canvas-porcelain text-on-surface font-body-md text-body-md selection:bg-surface-cream selection:text-text-charcoal relative">
        <HeroNavigation />
        
        <div ref={containerRef} className="w-full h-[100dvh] relative overflow-hidden flex items-center justify-center bg-canvas-porcelain">
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-0">
            <div className="w-[900px] h-[700px] rounded-full bg-gradient-to-tr from-surface-cream/80 via-canvas-porcelain to-secondary-container/20 blur-[130px] opacity-70"></div>
          </div>
          
          <div className="relative w-full h-[100dvh] flex flex-col items-center justify-start pt-[22vh] lg:pt-[24vh] mx-auto transition-colors duration-1000 ease-out z-10" id="spatial-hero-stage">
            <HeroMedia />
            <HeroTypography />
            <HeroFocalMedia />
          </div>
        </div>
      </div>
    </>
  );
}
