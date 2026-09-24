'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function LetsTalkSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.cta-anim-item',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section ref={sectionRef} id="contact" className="w-full py-24 md:py-32 lg:py-40 flex flex-col items-center text-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl flex flex-col items-center gap-6">
          <span className="cta-anim-item font-label-caps text-eyebrow tracking-eyebrow text-ink-muted uppercase">
            INQUIRIES
          </span>
          
          <h2 className="cta-anim-item text-6xl sm:text-7xl md:text-8xl lg:text-[9vw] text-primary uppercase font-light tracking-tight leading-none mb-2">
            LET&apos;S TALK
          </h2>
          
          <p className="cta-anim-item font-body-lg text-body-lg sm:text-xl text-secondary font-light max-w-xl">
            Whether you are planning a seasonal campaign, a single high-impact reel, or a complete brand presence overhaul.
          </p>
          
          {/* Primary Action Targets: WhatsApp & Instagram */}
          <div className="cta-anim-item flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 w-full sm:w-auto">
            <a 
              className="inline-flex w-full sm:w-auto justify-center items-center gap-3 px-8 py-4 rounded-full bg-primary text-on-primary hover:bg-inverse-surface transition-all shadow-md font-label-md text-label-md uppercase tracking-[0.16em] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2" 
              href="https://wa.me/6235348787" 
              rel="noopener noreferrer" 
              target="_blank"
            >
              <span>WhatsApp +91 6235348787</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
            <a 
              className="inline-flex w-full sm:w-auto justify-center items-center gap-3 px-8 py-4 rounded-full bg-surface-container hover:bg-surface-container-high text-primary transition-all font-label-md text-label-md uppercase tracking-[0.16em] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2" 
              href="https://instagram.com/veluneproductions" 
              rel="noopener noreferrer" 
              target="_blank"
            >
              <span>Instagram @veluneproductions</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" aria-hidden="true">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* EDITORIAL SUB-FOOTER NOTE */}
      <footer className="w-full py-8 px-4 sm:px-6 lg:px-8 border-t border-border-subtle/50">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 font-label-caps text-eyebrow tracking-eyebrow text-ink-muted uppercase text-center sm:text-left">
          <div>
            <span>VELUNE CREATIVE STUDIO</span>
          </div>
          <div>
            <span>SPATIAL EDITORIAL ARCHITECTURE</span>
          </div>
        </div>
      </footer>
    </>
  );
}
