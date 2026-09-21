'use client';

import React, { useEffect, useRef, useState } from 'react';

interface LazyMediaProps {
  src: string;
  type: 'video' | 'image';
  alt?: string;
  className?: string;
  poster?: string;
  priority?: boolean;
}

export function LazyMedia({ src, type, alt = '', className = '', poster, priority = false }: LazyMediaProps) {
  const mediaRef = useRef<HTMLVideoElement | HTMLImageElement>(null);
  const [shouldLoad, setShouldLoad] = useState(priority);

  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '400px 0px' } // Load slightly before it enters viewport
    );

    if (mediaRef.current) {
      observer.observe(mediaRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  if (type === 'video') {
    return (
      <video
        ref={mediaRef as React.RefObject<HTMLVideoElement>}
        src={shouldLoad ? src : undefined}
        poster={poster}
        autoPlay={shouldLoad}
        preload={shouldLoad ? "auto" : "none"}
        loop
        muted
        playsInline
        className={className}
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={mediaRef as React.RefObject<HTMLImageElement>}
      src={shouldLoad ? src : undefined}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      className={className}
    />
  );
}
