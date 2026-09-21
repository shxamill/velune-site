const fs = require('fs');

const code = \'use client';

import React from 'react';

const CLIENTS = [
  'Shruthi',
  'Trisha',
  'Greeshma Prasanna',
  'Ashwini Gowda',
  'Bhargavi Vikyathi',
  'Vajraraj Jewellery',
  'Nomi Kids Culture',
  'Al Mariyam',
  'Harshitha',
  'Avrathan',
  'Monika Reddy'
];

export function ClientRosterSection() {
  return (
    <section className="w-full py-24 md:py-32 lg:py-40 px-4 sm:px-6 lg:px-8">
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
            <React.Fragment key={client}>
              <a
                href="#"
                className="group inline-flex items-center gap-3 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm transition-colors"
                aria-label={\\ Instagram profile\}
              >
                {/* 6px circular dot */}
                <span className="w-1.5 h-1.5 rounded-full bg-secondary group-hover:bg-primary transition-colors duration-300"></span>
                {/* Client name */}
                <span className="font-headline-sm text-headline-sm sm:text-headline-md text-secondary group-hover:text-primary transition-colors duration-300 font-light">
                  {client}
                </span>
              </a>
              
              {/* Slash separator (skip for the last item) */}
              {index < CLIENTS.length - 1 && (
                <span className="text-border-subtle text-lg sm:text-xl font-light select-none">
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
\;

fs.writeFileSync('src/components/home/ClientRosterSection.tsx', code);
