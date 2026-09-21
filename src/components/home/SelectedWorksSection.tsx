'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import { LazyMedia } from '../common/LazyMedia';

const SERVICES = ['Videography', 'Photography', 'Reels', 'Content Creation'];

interface MediaProps {
  src: string;
  type: 'video' | 'image';
  alt?: string;
  className?: string;
  poster?: string;
  sizeClass?: string;
  client?: string;
}

function Media({ src, type, alt = '', className = '', poster, sizeClass }: MediaProps) {
  const sizingClasses = sizeClass || "w-auto h-auto max-h-[62svh] md:max-h-[68svh] lg:max-h-[72svh] object-contain block";

  return (
    <LazyMedia
      src={src}
      type={type}
      alt={alt}
      poster={poster}
      className={`${sizingClasses} ${className}`}
    />
  );
}

function ClientHeader({ index, client, services }: { index: string; client: string; services: string[] }) {
  return (
    <header className="client-header mb-12 lg:mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-border-subtle pb-6">
      <div>
        <p className="text-label-sm lg:text-label-md text-ink-muted tracking-widest uppercase mb-3">
          {index}
        </p>
        <h3 className="text-headline-sm lg:text-headline-md font-serif uppercase tracking-tight text-on-surface">
          {client}
        </h3>
      </div>
      <ul className="flex flex-wrap gap-4 text-label-sm lg:text-label-md text-ink-muted uppercase tracking-widest">
        {services.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ul>
    </header>
  );
}

// 01 - KINJAL MEHTHA
function AnchorAndCluster({ assets }: { assets: MediaProps[] }) {
  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 items-start justify-center">
      <div className="shrink-0 z-10 media-wrapper" data-speed="0.9" data-dir="center">
        <Media {...assets[0]} sizeClass="w-auto h-auto max-h-[60svh] md:max-h-[68svh] lg:max-h-[72svh] object-contain block" />
      </div>
      <div className="flex flex-col sm:flex-row lg:flex-col gap-6 lg:gap-10 shrink-0 lg:mt-12">
        <div className="flex gap-6 items-start">
          <div className="media-wrapper" data-speed="-1.1" data-delay="0.1" data-dir="right">
            <Media {...assets[1]} sizeClass="w-auto h-auto max-h-[40svh] lg:max-h-[38svh] object-contain block" />
          </div>
          <div className="media-wrapper mt-8" data-speed="1.2" data-delay="0.2" data-dir="right">
            <Media {...assets[2]} sizeClass="w-auto h-auto max-h-[30svh] lg:max-h-[32svh] object-contain block" />
          </div>
        </div>
        <div className="flex justify-end w-full lg:w-auto media-wrapper" data-speed="-0.75" data-delay="0.3" data-dir="right">
          <Media {...assets[3]} sizeClass="w-auto h-auto max-h-[45svh] lg:max-h-[48svh] object-contain block" />
        </div>
      </div>
    </div>
  );
}

// 02 - LAKSHI LINGARAJU
function CenterFlanked({ assets }: { assets: MediaProps[] }) {
  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-center lg:items-start justify-center">
      <div className="hidden lg:flex flex-col gap-8 shrink-0 mt-24">
        <div className="media-wrapper" data-speed="1.2" data-dir="left">
          <Media {...assets[1]} sizeClass="w-auto h-auto max-h-[35svh] object-contain block" />
        </div>
        <div className="media-wrapper ml-12" data-speed="-0.8" data-delay="0.1" data-dir="left">
          <Media {...assets[2]} sizeClass="w-auto h-auto max-h-[25svh] object-contain block" />
        </div>
      </div>
      <div className="shrink-0 z-10 media-wrapper" data-speed="1.0" data-dir="center">
        <Media {...assets[0]} sizeClass="w-auto h-auto max-h-[60svh] md:max-h-[68svh] lg:max-h-[72svh] object-contain block" />
      </div>
      <div className="flex lg:hidden gap-6 w-full justify-center">
        <div className="media-wrapper" data-speed="1.15" data-dir="left">
          <Media {...assets[1]} sizeClass="w-auto h-auto max-h-[35svh] object-contain block" />
        </div>
        <div className="media-wrapper" data-speed="-0.85" data-delay="0.1" data-dir="right">
          <Media {...assets[2]} sizeClass="w-auto h-auto max-h-[35svh] object-contain block" />
        </div>
      </div>
      <div className="shrink-0 lg:mt-12 media-wrapper" data-speed="-1.3" data-delay="0.2" data-dir="right">
        <Media {...assets[3]} sizeClass="w-auto h-auto max-h-[45svh] md:max-h-[50svh] lg:max-h-[55svh] object-contain block" />
      </div>
    </div>
  );
}

// 03 - YASH JAIN
function CinematicSpread({ assets }: { assets: MediaProps[] }) {
  return (
    <div className="flex flex-col md:flex-row gap-6 lg:gap-20 items-center md:items-start justify-center">
      <div className="shrink-0 md:mt-24 w-full md:w-auto flex justify-start media-wrapper" data-speed="1.1" data-dir="left">
        <Media {...assets[1]} sizeClass="w-auto h-auto max-h-[50svh] lg:max-h-[55svh] object-contain block" />
      </div>
      <div className="shrink-0 w-full md:w-auto flex justify-end media-wrapper" data-speed="-1.15" data-delay="0.15" data-dir="right">
        <Media {...assets[0]} sizeClass="w-auto h-auto max-h-[60svh] lg:max-h-[72svh] object-contain block" />
      </div>
    </div>
  );
}

// 04 - STILAT
function DenseGrid({ assets }: { assets: MediaProps[] }) {
  return (
    <div className="flex flex-col md:flex-row gap-4 lg:gap-8 items-start justify-center">
      <div className="shrink-0 md:mt-16 media-wrapper" data-speed="-0.85" data-dir="left">
        <Media {...assets[0]} sizeClass="w-auto h-auto max-h-[45svh] lg:max-h-[50svh] object-contain block" />
      </div>
      <div className="shrink-0 md:mt-4 z-10 media-wrapper" data-speed="1.0" data-delay="0.1" data-dir="center">
        <Media {...assets[1]} sizeClass="w-auto h-auto max-h-[60svh] lg:max-h-[68svh] object-contain block" />
      </div>
      <div className="shrink-0 md:mt-32 media-wrapper" data-speed="-1.15" data-delay="0.2" data-dir="right">
        <Media {...assets[2]} sizeClass="w-auto h-auto max-h-[35svh] lg:max-h-[40svh] object-contain block" />
      </div>
      <div className="shrink-0 md:mt-12 media-wrapper" data-speed="0.95" data-delay="0.3" data-dir="right">
        <Media {...assets[3]} sizeClass="w-auto h-auto max-h-[55svh] lg:max-h-[60svh] object-contain block" />
      </div>
    </div>
  );
}

// 05 - PL EDITS
function AsymmetricCollage({ assets }: { assets: MediaProps[] }) {
  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 items-center lg:items-end justify-center relative">
      <div className="shrink-0 flex gap-4 lg:gap-8 w-full lg:w-auto justify-center lg:mb-12">
        <div className="media-wrapper" data-speed="1.25" data-dir="left">
          <Media {...assets[1]} sizeClass="w-auto h-auto max-h-[35svh] lg:max-h-[42svh] object-contain block" />
        </div>
        <div className="media-wrapper" data-speed="-0.9" data-delay="0.1" data-dir="left">
          <Media {...assets[2]} sizeClass="w-auto h-auto max-h-[45svh] lg:max-h-[52svh] object-contain block" />
        </div>
      </div>
      <div className="shrink-0 z-10 media-wrapper" data-speed="1.05" data-dir="center">
        <Media {...assets[0]} sizeClass="w-auto h-auto max-h-[60svh] md:max-h-[68svh] lg:max-h-[70svh] object-contain block" />
      </div>
      <div className="shrink-0 hidden lg:block lg:mt-12 media-wrapper" data-speed="-1.3" data-delay="0.2" data-dir="right">
        <Media {...assets[3]} sizeClass="w-auto h-auto max-h-[30svh] lg:max-h-[38svh] object-contain block" />
      </div>
      <div className="flex lg:hidden w-full justify-center media-wrapper" data-speed="-1.15" data-delay="0.2" data-dir="right">
        <Media {...assets[3]} sizeClass="w-auto h-auto max-h-[30svh] object-contain block" />
      </div>
    </div>
  );
}

export function SelectedWorksSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      // 1. Reveal Client Headers
      (gsap.utils.toArray('.client-header') as HTMLElement[]).forEach((header) => {
        gsap.fromTo(header,
          { opacity: 0, y: prefersReducedMotion ? 0 : 30 },
          {
            opacity: 1, y: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: header,
              start: 'top 85%',
            }
          }
        );
      });

      // 2. Animate Media Wrappers
      (gsap.utils.toArray('.media-wrapper') as HTMLElement[]).forEach((wrapper) => {
        const delay = parseFloat(wrapper.getAttribute('data-delay') || '0');
        const dir = wrapper.getAttribute('data-dir') || 'center';
        
        // Ensure inner media exists
        const mediaChild = wrapper.querySelector('img, video, .lazy-media-container');

        if (mediaChild) {
          // Media child handles the reveal transform (x/y and scale) and opacity
          let startX = 0;
          let startY = 0;
          
          if (!prefersReducedMotion) {
            startY = 24;
            if (dir === 'left') startX = -25;
            else if (dir === 'right') startX = 25;
          }

          gsap.fromTo(mediaChild,
            { scale: prefersReducedMotion ? 1 : 1.05, x: startX, y: startY, opacity: 0 },
            {
              scale: 1,
              x: 0,
              y: 0,
              opacity: 1,
              duration: 1.1,
              delay: delay,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: wrapper,
                start: 'top 85%',
              }
            }
          );
        }
      });

      if (prefersReducedMotion) return;

      // 3. Global Velocity-driven Inertia
      const isDesktop = window.innerWidth >= 1024;
      const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
      const maxDisplacement = isDesktop ? 16 : (isTablet ? 10 : 6);
      
      const motionElements = (gsap.utils.toArray('.media-wrapper') as HTMLElement[]).map((wrapper) => {
        const speed = parseFloat(wrapper.getAttribute('data-speed') || '0');
        if (speed === 0) return null;
        
        const quickY = gsap.quickSetter(wrapper, "y", "px");
        return { wrapper, quickY, mult: speed };
      }).filter(Boolean) as { wrapper: HTMLElement, quickY: ReturnType<typeof gsap.quickSetter>, mult: number }[];
      
      if (motionElements.length > 0) {
        const proxy = { velocity: 0 };
        const clamp = gsap.utils.clamp(-maxDisplacement, maxDisplacement);
        
        ScrollTrigger.create({
          onUpdate: (self) => {
            // Convert scroll velocity to physical displacement
            // Lenis + GSAP scrub can spike velocity, so we divide by 120 to get a reasonable pixel scale
            const v = clamp(self.getVelocity() / -120);
            
            // Only update if the new velocity spike is stronger than the currently decaying velocity
            // This prevents the tween from being unnecessarily interrupted if they slow down their scroll
            if (Math.abs(v) > Math.abs(proxy.velocity)) {
              proxy.velocity = v;
              gsap.to(proxy, {
                velocity: 0, 
                duration: 0.9, 
                ease: "power3.out", 
                overwrite: true, 
                onUpdate: () => {
                  motionElements.forEach(({ quickY, mult }) => {
                    quickY(proxy.velocity * mult);
                  });
                }
              });
            }
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="selected-works" className="relative py-24 md:py-32 lg:py-48 px-4 sm:px-6 lg:px-8 max-w-[1920px] mx-auto overflow-hidden">
      <div className="client-header mb-20 lg:mb-32 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
        <div>
          <h2 className="text-label-sm lg:text-label-md text-ink-muted tracking-widest uppercase mb-4">
            Portfolio Directory
          </h2>
          <p className="text-display-md-mobile md:text-display-md lg:text-display-lg font-serif uppercase tracking-tight text-on-surface">
            Selected Works
          </p>
        </div>
        <div className="flex gap-8 text-label-sm lg:text-label-md uppercase tracking-widest text-ink-muted">
          <span>FEATURED CLIENTS</span>
        </div>
      </div>

      <article className="mb-32 lg:mb-48">
        <ClientHeader index="01 / Makeup Artist" client="KINJAL MEHTHA" services={SERVICES} />
        <div className="mx-auto w-fit max-w-full flex justify-center">
          <AnchorAndCluster assets={[
            { src: '/media/work/kinjal-mehtha/IMG_0286.MOV', type: 'video', client: 'Kinjal Mehtha', poster: '/media/work/kinjal-mehtha/IMG_0257.JPG.jpeg' },
            { src: '/media/work/kinjal-mehtha/IMG_3846.MP4', type: 'video', client: 'Kinjal Mehtha', poster: '/media/work/kinjal-mehtha/IMG_3845.PNG' },
            { src: '/media/work/kinjal-mehtha/IMG_0257.JPG.jpeg', type: 'image', client: 'Kinjal Mehtha' },
            { src: '/media/work/kinjal-mehtha/IMG_3845.PNG', type: 'image', client: 'Kinjal Mehtha' }
          ]} />
        </div>
      </article>

      <article className="mb-32 lg:mb-48">
        <ClientHeader index="02 / Makeup Artist" client="LAKSHI LINGARAJU" services={SERVICES} />
        <div className="mx-auto w-fit max-w-full flex justify-center">
          <CenterFlanked assets={[
            { src: '/media/work/lakshi-lingaraju/IMG_3141.MOV', type: 'video', client: 'Lakshi Lingaraju', poster: '/media/work/lakshi-lingaraju/IMG_1298.JPG.jpeg' },
            { src: '/media/work/lakshi-lingaraju/IMG_1298.JPG.jpeg', type: 'image', client: 'Lakshi Lingaraju' },
            { src: '/media/work/lakshi-lingaraju/IMG_5846.PNG', type: 'image', client: 'Lakshi Lingaraju' },
            { src: '/media/work/lakshi-lingaraju/IMG_5845.MP4', type: 'video', client: 'Lakshi Lingaraju', poster: '/media/work/lakshi-lingaraju/IMG_5846.PNG' }
          ]} />
        </div>
      </article>

      <article className="mb-32 lg:mb-48">
        <ClientHeader index="03 / Makeup" client="YASH JAIN" services={SERVICES} />
        <div className="mx-auto w-fit max-w-full flex justify-center">
          <CinematicSpread assets={[
            { src: '/media/work/yash-jain/IMG_5847.MP4', type: 'video', client: 'Yash Jain', poster: '/media/work/yash-jain/IMG_5848.PNG' },
            { src: '/media/work/yash-jain/IMG_5848.PNG', type: 'image', client: 'Yash Jain' }
          ]} />
        </div>
      </article>

      <article className="mb-32 lg:mb-48">
        <ClientHeader index="04 / Luxury Clothing" client="STILAT" services={SERVICES} />
        <div className="mx-auto w-fit max-w-full flex justify-center">
          <DenseGrid assets={[
            { src: '/media/work/stilat/IMG_5852.JPG.jpeg', type: 'image', client: 'Stilat' },
            { src: '/media/work/stilat/IMG_3629.MOV', type: 'video', client: 'Stilat', poster: '/media/work/stilat/IMG_5851.JPG.jpeg' },
            { src: '/media/work/stilat/IMG_5851.JPG.jpeg', type: 'image', client: 'Stilat' },
            { src: '/media/work/stilat/IMG_5849.MOV', type: 'video', client: 'Stilat', poster: '/media/work/stilat/IMG_5852.JPG.jpeg' }
          ]} />
        </div>
      </article>

      <article>
        <ClientHeader index="05 / Stylist" client="PL EDITS" services={SERVICES} />
        <div className="mx-auto w-fit max-w-full flex justify-center">
          <AsymmetricCollage assets={[
            { src: '/media/work/pl-edit/IMG_3755.MOV', type: 'video', client: 'PL Edits', poster: '/media/work/pl-edit/IMG_5854.JPG.jpeg' },
            { src: '/media/work/pl-edit/IMG_5854.JPG.jpeg', type: 'image', client: 'PL Edits' },
            { src: '/media/work/pl-edit/IMG_5853.MP4', type: 'video', client: 'PL Edits', poster: '/media/work/pl-edit/IMG_5855.PNG' },
            { src: '/media/work/pl-edit/IMG_5855.PNG', type: 'image', client: 'PL Edits' }
          ]} />
        </div>
      </article>
    </section>
  );
}
