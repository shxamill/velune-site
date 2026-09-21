'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CLIENTS = [
  { name: 'Shruthi', url: 'https://www.instagram.com/shruthis_makeovers' },
  { name: 'Trisha', url: 'https://www.instagram.com/makeupartistrybytrishashah' },
  { name: 'Greeshma Prasanna', url: 'https://www.instagram.com/greeshmaprasanna_makeupartist' },
  { name: 'Ashwini Gowda', url: 'https://www.instagram.com/ashwinigowda___makeover' },
  { name: 'Bhargavi Vikyathi', url: 'https://www.instagram.com/bhargavi_vikyathi' },
  { name: 'Vajraraj Jewellery', url: 'https://www.instagram.com/vajraraj_jewellery' },
  { name: 'Nomi Kids Culture', url: 'https://www.instagram.com/nomi_kids_culture' },
  { name: 'Al Mariyam', url: 'https://www.instagram.com/almariyamcateres' },
  { name: 'Harshitha', url: 'https://www.instagram.com/harshithareddy_artistry' },
  { name: 'Avrathan', url: 'https://www.instagram.com/navrathan1954' },
  { name: 'Monika Reddy', url: 'https://www.instagram.com/monikareddy_artistry' }
];

export function ClientRosterSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.roster-item-anim',
        { opacity: 0, y: 15 },
        {
          opacity: 1, y: 0,
          duration: 0.8,
          stagger: 0.05,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="client-roster" className="w-full py-24 md:py-32 lg:py-40 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto flex flex-col gap-10">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <span className="font-label-sm text-label-sm uppercase tracking-[0.24em] text-ink-muted">
            Client Roster / Collaborations
          </span>
          <span className="font-label-sm text-label-sm tracking-[0.24em] text-ink-muted uppercase">
            Brands & Creators
          </span>
        </div>

        {/* Main Typographic Cloud */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-5 text-left py-4">
          {CLIENTS.map((client, index) => (
            <React.Fragment key={client.name}>
              <a
                href={client.url}
                target="_blank"
                rel="noopener noreferrer"
                className="roster-item-anim group inline-flex items-center gap-3 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm transition-colors"
                aria-label={`${client.name} Instagram profile`}
              >
                {/* 6px circular dot */}
                <span className="w-1.5 h-1.5 rounded-full bg-secondary group-hover:bg-primary transition-colors duration-300"></span>
                {/* Client name */}
                <span className="font-headline-sm text-headline-sm sm:text-headline-md text-secondary group-hover:text-primary transition-colors duration-300 font-light">
                  {client.name}
                </span>
              </a>
              
              {/* Slash separator (skip for the last item) */}
              {index < CLIENTS.length - 1 && (
                <span className="roster-item-anim text-border-subtle text-lg sm:text-xl font-light select-none">
                  /
                </span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Footer */}
        <p className="font-label-sm text-label-sm text-ink-muted uppercase tracking-[0.16em]">
          Every partnership is treated as an independent creative monograph.
        </p>

      </div>
    </section>
  );
}
