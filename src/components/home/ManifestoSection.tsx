export function ManifestoSection() {
  return (
    <section className="relative w-full py-24 lg:py-32 flex flex-col justify-center z-10">
      <div className="max-w-4xl mx-auto flex flex-col gap-12 lg:gap-16 px-margin-mobile md:px-margin">
        
        {/* Eyebrow */}
        <div className="flex items-center gap-4">
          <span className="w-8 h-[1px] bg-text-muted"></span>
          <span className="font-label-caps text-label-caps tracking-[0.2em] text-text-muted uppercase">
            Manifesto & Perspective
          </span>
        </div>
        
        {/* Main Copy */}
        <div className="space-y-8">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-text-charcoal leading-[1.25] tracking-tight">
            Velune is a creative studio built for brands that want to be seen, remembered, and talked about.
          </h2>
          <p className="font-body text-lg md:text-xl text-text-espresso font-light leading-relaxed max-w-3xl">
            We bring together visual storytelling, content creation, video production, and digital marketing to help brands build a stronger presence in the digital world. From a single reel to a complete campaign, we turn ideas into visuals that capture attention and give brands a distinct identity.
          </p>
        </div>
        
        {/* Centered Italic Epigram in Delicate Container */}
        <div className="bg-canvas-porcelain rounded-3xl p-8 lg:p-14 my-4 shadow-sm">
          <p className="font-display text-2xl md:text-3xl lg:text-4xl italic text-text-charcoal font-light leading-tight">
            &ldquo;We believe great creative work isn&rsquo;t just about looking good&mdash;it&rsquo;s about making people stop, feel, and remember.&rdquo;
          </p>
          <div className="mt-6 flex items-center justify-between">
            <span className="font-label-caps text-[10px] tracking-[0.2em] uppercase text-text-muted">
              Principles of Presence
            </span>
            <span className="font-label-caps text-[10px] tracking-widest text-text-muted uppercase">
              Velune / Core Ethos
            </span>
          </div>
        </div>
        
      </div>
    </section>
  );
}
