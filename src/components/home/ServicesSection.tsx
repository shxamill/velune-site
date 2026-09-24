'use client';

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LazyMedia } from '../common/LazyMedia';

gsap.registerPlugin(ScrollTrigger);

const SERVICES_DATA = [
  {
    id: '01',
    title: 'IPHONE VIDEOGRAPHY',
    desc: 'High-quality, cinematic content shot entirely on iPhone, crafted for brands, creators, products, and social media. Fast, flexible, and designed to make every frame feel premium.',
    media: {
      src: '/media/work/lakshi-lingaraju/IMG_3141.MOV',
      type: 'video',
      poster: '/media/work/lakshi-lingaraju/IMG_1298.JPG.jpeg'
    }
  },
  {
    id: '02',
    title: 'VIDEO PRODUCTION',
    desc: 'From concept and shooting to editing and final delivery, we handle the complete production process. We create cinematic videos that turn ideas into compelling visual stories.',
    media: {
      src: '/media/work/stilat/IMG_3629.MOV',
      type: 'video',
      poster: '/media/work/stilat/IMG_5851.JPG.jpeg'
    }
  },
  {
    id: '03',
    title: 'DIGITAL MARKETING',
    desc: 'We build digital strategies that help brands reach the right audience and grow their online presence. From strategy to execution, every campaign is driven by creative thinking and measurable results.',
    media: {
      src: '/media/work/stilat/IMG_5852.JPG.jpeg',
      type: 'image'
    }
  },
  {
    id: '04',
    title: 'SOCIAL MEDIA MANAGEMENT',
    desc: 'We manage your social presence from content planning and creative direction to publishing and optimization. Our goal is to build a consistent, recognizable brand that people want to follow.',
    media: {
      src: '/media/work/pl-edit/IMG_5854.JPG.jpeg',
      type: 'image'
    }
  },
  {
    id: '05',
    title: 'META ADS',
    desc: 'We create and manage targeted campaigns across Instagram and Facebook to put your brand in front of the right people. From creative concepts to campaign optimization, we focus on turning attention into action.',
    media: {
      src: '/media/work/kinjal-mehtha/IMG_3845.PNG',
      type: 'image'
    }
  },
  {
    id: '06',
    title: 'CONTENT CREATION',
    desc: 'We create scroll-stopping photos, videos, reels, graphics, and other social content tailored to your brand. Every piece is designed to communicate your identity while keeping your audience engaged.',
    media: {
      src: '/media/work/pl-edit/IMG_3755.MOV',
      type: 'video',
      poster: '/media/work/pl-edit/IMG_5854.JPG.jpeg'
    }
  }
];

export function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.services-header-anim',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          duration: 1.2,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
          }
        }
      );

      gsap.fromTo('.service-item-anim',
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0,
          duration: 1,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.services-list-container',
            start: 'top 85%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="w-full py-24 md:py-32 lg:py-48 px-4 sm:px-6 lg:px-8 max-w-[1920px] mx-auto overflow-hidden">
      <div className="flex flex-col gap-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6">
          <div>
            <span className="services-header-anim font-label-caps text-eyebrow tracking-eyebrow text-ink-muted uppercase block mb-2">
              Capabilities & Disciplines
            </span>
            <h3 className="services-header-anim font-display-md text-display-md lg:text-display-lg text-primary tracking-tight font-light uppercase">
              What We Do
            </h3>
          </div>
          <p className="services-header-anim font-body-md text-body-md text-secondary font-light max-w-sm">
            Interactive studio services designed to give brands cultural traction and enduring presence.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          <div className="services-list-container lg:col-span-7 flex flex-col divide-y divide-border-subtle">
            {SERVICES_DATA.map((service, index) => {
              const isActive = activeIndex === index;
              return (
                <button
                  key={service.id}
                  className="service-item-anim group py-8 flex flex-col text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-8 focus-visible:ring-offset-surface rounded-xl transition-colors"
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                  aria-expanded={isActive}
                >
                  <div className="flex items-start justify-between gap-4 w-full">
                    <span className="font-label-caps text-eyebrow tracking-eyebrow text-ink-muted uppercase mt-2 shrink-0">
                      {service.id}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-headline-sm sm:text-headline-md lg:text-headline-lg text-primary group-hover:translate-x-2 transition-transform duration-300 ease-out uppercase">
                        {service.title}
                      </h4>
                      <div
                        className={`grid transition-all duration-500 ease-in-out ${
                          isActive ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'
                        }`}
                      >
                        <div className="overflow-hidden">
                          <p className="font-body-md text-body-md text-secondary font-light leading-relaxed max-w-xl">
                            {service.desc}
                          </p>
                          
                          <div className="lg:hidden mt-8 w-full flex justify-center">
                              <LazyMedia
                                src={service.media.src}
                                type={service.media.type as 'video' | 'image'}
                                alt={service.title}
                                poster={service.media.poster}
                                className="w-auto h-auto max-h-[60svh] object-contain rounded-lg"
                              />
                          </div>
                        </div>
                      </div>
                    </div>
                    <span className={`shrink-0 mt-2 transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-secondary w-5 h-5 sm:w-6 sm:h-6">
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                      </svg>
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="hidden lg:block lg:col-span-5 sticky top-32">
            <div className="relative w-full h-[75svh] flex items-center justify-center">
              {SERVICES_DATA.map((service, index) => {
                const isActive = activeIndex === index;
                return (
                  <div
                    key={service.id}
                    className="absolute inset-0 flex items-center justify-center w-full h-full p-8 transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? 'scale(1)' : 'scale(0.96)',
                      pointerEvents: isActive ? 'auto' : 'none',
                      zIndex: isActive ? 10 : 0
                    }}
                  >
                    <LazyMedia
                      src={service.media.src}
                      type={service.media.type as 'video' | 'image'}
                      alt={service.title}
                      poster={service.media.poster}
                      className="w-auto h-auto max-h-full max-w-full object-contain"
                    />
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
