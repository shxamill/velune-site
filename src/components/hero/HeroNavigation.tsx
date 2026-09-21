'use client';

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

export function HeroNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuInnerRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (!overlayRef.current || !menuInnerRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      
      gsap.set(overlayRef.current, { display: 'flex' });
      
      if (prefersReducedMotion) {
        gsap.set(overlayRef.current, { opacity: 1 });
        gsap.set(linksRef.current, { opacity: 1, y: 0 });
      } else {
        const tl = gsap.timeline();
        tl.to(overlayRef.current, {
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out'
        })
        .fromTo(linksRef.current, 
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: 'power3.out' },
          "-=0.2"
        );
      }
    } else {
      document.body.style.overflow = '';
      
      if (prefersReducedMotion) {
        gsap.set(overlayRef.current, { opacity: 0, display: 'none' });
      } else {
        const tl = gsap.timeline({
          onComplete: () => {
            gsap.set(overlayRef.current, { display: 'none' });
          }
        });
        
        tl.to(linksRef.current, {
          y: 20,
          opacity: 0,
          duration: 0.3,
          stagger: -0.05,
          ease: 'power2.in'
        })
        .to(overlayRef.current, {
          opacity: 0,
          duration: 0.4,
          ease: 'power2.inOut'
        }, "-=0.1");
      }
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const toggleMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { label: 'WORKS', href: '#works' },
    { label: 'STUDIO', href: '#studio' },
    { label: 'SERVICES', href: '#services' },
    { label: 'CLIENTS', href: '#clients' },
    { label: "LET'S TALK", href: '#contact' }
  ];

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-transparent">
        <div className="h-20 w-full px-4 sm:px-6 md:px-margin flex items-center justify-between pointer-events-none">
          <a 
            href="#" 
            className={`font-label-caps text-label-sm md:text-label-caps tracking-[0.25em] uppercase transition-colors pointer-events-auto ${isOpen ? 'text-on-primary' : 'text-primary'}`}
            onClick={() => setIsOpen(false)}
          >
            VELUNE
          </a>
          <nav className="flex items-center pointer-events-none">
            <button 
              onClick={toggleMenu}
              aria-expanded={isOpen}
              className={`font-label-caps text-label-sm md:text-label-caps tracking-[0.2em] uppercase transition-colors pointer-events-auto outline-none focus-visible:ring-2 focus-visible:ring-offset-2 px-4 py-2 ${isOpen ? 'text-on-primary focus-visible:ring-on-primary' : 'text-primary focus-visible:ring-primary'}`}
            >
              {isOpen ? 'CLOSE' : 'MENU'}
            </button>
          </nav>
        </div>
      </header>

      {/* Fullscreen Overlay */}
      <div 
        ref={overlayRef}
        className="fixed inset-0 z-40 bg-primary hidden flex-col justify-center px-4 sm:px-6 md:px-margin"
        style={{ opacity: 0 }}
        role="dialog"
        aria-modal="true"
        aria-label="Main Navigation"
      >
        <nav ref={menuInnerRef} className="flex flex-col items-start gap-4 md:gap-8 max-w-7xl mx-auto w-full">
          {navLinks.map((link, index) => (
            <a
              key={link.label}
              href={link.href}
              ref={(el) => { linksRef.current[index] = el; }}
              onClick={() => setIsOpen(false)}
              className="font-display-lg text-4xl sm:text-6xl md:text-8xl lg:text-[7vw] text-on-primary uppercase font-light tracking-tight leading-none hover:opacity-70 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-on-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>
        
        {/* Sub-footer inside menu */}
        <div className="absolute bottom-8 left-4 sm:left-6 md:left-margin right-4 sm:right-6 md:right-margin flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-on-primary/60 font-label-sm uppercase tracking-widest text-xs">
          <span>VELUNE CREATIVE STUDIO</span>
          <span>BANGALORE / GLOBAL</span>
        </div>
      </div>
    </>
  );
}
