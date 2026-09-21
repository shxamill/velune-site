export function HeroFocalMedia() {
  return (
    <div className="orbit-focal absolute z-20" style={{ bottom: '10vh', left: '50%', transform: 'translateX(-50%)' }}>
      <div className="focal-visual relative w-[280px] lg:w-[400px] aspect-[16/9] overflow-hidden rounded-xl shadow-[0_28px_60px_-14px_rgba(20,20,19,0.2)] bg-surface-container">
        <video 
          id="hero-focal-video"
          src="/media/Nomi Kids Culture/IMG_5857.MP4" 
          poster="/media/Nomi Kids Culture/poster.jpg"
          autoPlay loop muted playsInline preload="auto"
          className="absolute inset-0 w-full h-full object-cover filter saturate-[1.05]"
        />
      </div>
    </div>
  );
}
