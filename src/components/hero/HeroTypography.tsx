import { newsreader, geist } from "@/lib/fonts";

export function HeroTypography() {
  return (
    <div className="hero-typography relative z-10 text-center max-w-2xl lg:max-w-3xl px-margin-mobile transition-transform duration-700 pointer-events-auto">
      <div className="hero-typography-inner">
      
        {/* Overline Studio Badge */}
        <div className="inline-flex items-center justify-center gap-2 mb-space-sm px-3 py-1 rounded-full bg-surface-cream/80 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-text-muted"></span>
          <span className={`${geist.className} text-[11px] leading-[14px] tracking-[0.25em] text-text-espresso uppercase`}>VELUNE STUDIO</span>
        </div>

        {/* Headline */}
        <h1 className={`${newsreader.className} text-[48px] md:text-[68px] lg:text-[80px] font-normal text-text-charcoal tracking-[-0.03em] leading-[1.05] mb-space-sm text-balance`}>
          Create. Capture. Elevate.
        </h1>

        {/* Supporting Line */}
        <p className={`${geist.className} text-[15px] md:text-[18px] text-text-espresso max-w-lg mx-auto font-light leading-relaxed tracking-[-0.01em] mb-space-md opacity-90 text-balance`}>
          A creative studio built around stories, visuals, and ideas that move people.
        </p>

      </div>
    </div>
  );
}
