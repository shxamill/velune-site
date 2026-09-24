import Image from 'next/image';

export function HeroMedia() {
  return (
    <>
      {/* Item 1: Left Stack - BACK */}
      <div className="orbit-item orbit-item-1 absolute z-content hidden md:block" style={{ top: '15%', left: '12%' }}>
        <div className="orbit-item-inner relative w-[160px] lg:w-[180px] xl:w-[200px] rounded-xl overflow-hidden shadow-[0_20px_45px_-12px_rgba(20,20,19,0.15)] bg-surface-cream">
          <div className="relative aspect-[9/16] overflow-hidden bg-secondary-container/40">
            <video 
              src="/media/Lakshi Lingaraju/IMG_3141.MOV"
              poster="/media/Lakshi Lingaraju/IMG_1298.JPG.jpeg"
              autoPlay loop muted playsInline
              className="absolute inset-0 w-full h-full object-cover filter saturate-[0.95]"
            />
          </div>
        </div>
      </div>

      {/* Item 3: Left Stack - FRONT */}
      <div className="orbit-item orbit-item-3 absolute z-elevated hidden md:block" style={{ top: '48%', left: '5%' }}>
        <div className="orbit-item-inner relative w-[140px] lg:w-[160px] xl:w-[180px] rounded-xl overflow-hidden shadow-[0_20px_45px_-12px_rgba(20,20,19,0.15)] bg-surface-cream">
          <div className="relative aspect-[9/16] overflow-hidden bg-secondary-container/40">
            <video 
              src="/media/Yash Jain/IMG_5847.MP4" 
              poster="/media/Yash Jain/IMG_5848.PNG"
              autoPlay loop muted playsInline
              className="absolute inset-0 w-full h-full object-cover filter saturate-[0.95]"
            />
          </div>
        </div>
      </div>

      {/* Item 5: Left Stack - BOTTOM */}
      <div className="orbit-item orbit-item-5 absolute z-content hidden lg:block" style={{ bottom: '15%', left: '22%' }}>
        <div className="orbit-item-inner relative w-[140px] lg:w-[160px] xl:w-[180px] rounded-xl overflow-hidden shadow-[0_20px_45px_-12px_rgba(20,20,19,0.15)] bg-surface-cream">
          <div className="relative aspect-[3/4] overflow-hidden bg-secondary-container/40">
            <video 
              src="/media/KInjal Mehtha/IMG_0286.MOV" 
              poster="/media/KInjal Mehtha/IMG_0257.JPG.jpeg"
              autoPlay loop muted playsInline
              className="absolute inset-0 w-full h-full object-cover filter saturate-[0.95]"
            />
          </div>
        </div>
      </div>

      {/* Item 2: Upper-Right */}
      <div className="orbit-item orbit-item-2 absolute z-content hidden lg:block" style={{ top: '10%', right: '10%' }}>
        <div className="orbit-item-inner relative w-[140px] lg:w-[160px] xl:w-[180px] rounded-xl overflow-hidden shadow-[0_20px_45px_-12px_rgba(20,20,19,0.15)] bg-surface-cream">
          <div className="relative aspect-[3/4] overflow-hidden bg-secondary-container/40">
            <Image 
              src="/media/PL Edit/IMG_5854.JPG.jpeg" 
              alt="Velune Editorial"
              fill
              className="object-cover filter saturate-[0.95]"
              unoptimized
            />
          </div>
        </div>
      </div>

      {/* Item 4: Lower-Right */}
      <div className="orbit-item orbit-item-4 absolute z-content hidden md:block" style={{ bottom: '20%', right: '12%' }}>
        <div className="orbit-item-inner relative w-[160px] lg:w-[180px] xl:w-[200px] rounded-xl overflow-hidden shadow-[0_20px_45px_-12px_rgba(20,20,19,0.15)] bg-surface-cream">
          <div className="relative aspect-[3/4] overflow-hidden bg-secondary-container/40">
            <video 
              src="/media/Stilat/IMG_3629.MOV"
              poster="/media/Stilat/IMG_5851.JPG.jpeg"
              autoPlay loop muted playsInline
              className="absolute inset-0 w-full h-full object-cover filter saturate-[0.95]"
            />
          </div>
        </div>
      </div>
    </>
  );
}
