'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ROW1_CLIENTS = [
  { name: 'Shruthi', url: 'https://www.instagram.com/shruthis_makeovers' },
  { name: 'Trisha', url: 'https://www.instagram.com/makeupartistrybytrishashah' },
  { name: 'Greeshma Prasanna', url: 'https://www.instagram.com/greeshmaprasanna_makeupartist' },
  { name: 'Ashwini Gowda', url: 'https://www.instagram.com/ashwinigowda___makeover' },
  { name: 'Bhargavi Vikyathi', url: 'https://www.instagram.com/bhargavi_vikyathi' },
  { name: 'Vajraraj Jewellery', url: 'https://www.instagram.com/vajraraj_jewellery' },
];

const ROW2_CLIENTS = [
  { name: 'Nomi Kids Culture', url: 'https://www.instagram.com/nomi_kids_culture' },
  { name: 'Al Mariyam', url: 'https://www.instagram.com/almariyamcateres' },
  { name: 'Harshitha', url: 'https://www.instagram.com/harshithareddy_artistry' },
  { name: 'Avrathan', url: 'https://www.instagram.com/navrathan1954' },
  { name: 'Monika Reddy', url: 'https://www.instagram.com/monikareddy_artistry' }
];

interface MarqueeRowProps {
  clients: typeof ROW1_CLIENTS;
  direction?: 'left' | 'right';
  duration?: number;
}

function MarqueeRow({ clients, direction = 'left', duration = 30 }: MarqueeRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (direction === 'left') {
        gsap.to(rowRef.current, {
          xPercent: -25, // Move by exactly 1 out of 4 sets
          ease: 'none',
          duration: duration,
          repeat: -1,
        });
      } else {
        gsap.fromTo(
          rowRef.current,
          { xPercent: -25 },
          {
            xPercent: 0,
            ease: 'none',
            duration: duration,
            repeat: -1,
          }
        );
      }
    }, rowRef);

    return () => ctx.revert();
  }, [direction, duration]);

  // We duplicate the list 4 times to ensure it completely fills ultra-wide screens
  // and allows a perfect 25% shift for a seamless loop.
  const repeatedClients = [...clients, ...clients, ...clients, ...clients];

  return (
    <div className="flex w-max" ref={rowRef}>
      {repeatedClients.map((client, idx) => (
        <div key={`${client.name}-${idx}`} className="flex items-center">
          <a
            href={client.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-block font-headline-lg font-light text-[clamp(38px,6vw,100px)] leading-none text-secondary hover:text-primary transition-all duration-500 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary whitespace-nowrap"
            aria-label={`${client.name} Instagram profile`}
          >
            {client.name}
          </a>
          {/* Subtle separator dot */}
          <span className="mx-6 sm:mx-10 md:mx-16 lg:mx-20 flex items-center justify-center opacity-30">
            <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-secondary"></span>
          </span>
        </div>
      ))}
    </div>
  );
}

export function ClientRosterSection() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} id="client-roster" className="w-full py-24 md:py-32 lg:py-40 flex flex-col gap-12 sm:gap-16 lg:gap-24">
      
      {/* Header - Keeps existing bounds */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <span className="font-label-caps text-eyebrow tracking-eyebrow text-ink-muted uppercase">
            Client Roster / Collaborations
          </span>
          <span className="font-label-caps text-eyebrow tracking-eyebrow text-ink-muted uppercase">
            Brands & Creators
          </span>
        </div>
      </div>

      {/* Marquee Rows - Full Width */}
      <div 
        className="w-full overflow-hidden flex flex-col gap-8 sm:gap-12 lg:gap-16 relative"
        style={{ WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
      >
        <MarqueeRow clients={ROW1_CLIENTS} direction="left" duration={35} />
        <MarqueeRow clients={ROW2_CLIENTS} direction="right" duration={40} />
      </div>

      {/* Footer - Keeps existing bounds */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <p className="font-label-caps text-eyebrow tracking-eyebrow text-ink-muted uppercase">
          Every partnership is treated as an independent creative monograph.
        </p>
      </div>

    </section>
  );
}
