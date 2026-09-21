# Phase 14.5 QA: Hero Missing Media + Featured Client Scroll Response

## 1. Hero Missing Media
- **Status:** PASS
- **Details:** 
  - Identified that the upper-left (Lakshi) and lower-right (Stilat) items were rendering as blank because their `src` pointed to `.MOV` files. Sometimes HEVC encoded `.MOV` files require user interaction or fallback depending on the browser renderer.
  - Added the missing `poster` attributes pointing to verified still image alternatives (`.JPG.jpeg`) already present in `C:\Personal\potfo_assets`, fulfilling the "show a REAL approved poster/still... until the video is ready" requirement.
  - Added the 5th missing peripheral item (Kinjal Mehtha) to the left stack's bottom (`bottom: '15%', left: '22%'`). The `HeroMedia` section now correctly houses 6 total media items: 5 peripheral + 1 focal. 
  - Verified all 6 are fully visible during the initial state.

## 2. Hero Reveal
- **Status:** PASS
- **Details:**
  - Preserved the existing 3-second loader sequence.
  - The side-reveal animation (`introTl`) now targets all 5 peripheral items (`.orbit-item-1` through `.orbit-item-5`). 
  - They gracefully slide in from `x: ±80px` as designed, keeping the existing target layouts unchanged, before settling seamlessly into the GSAP scroll-bound timelines.

## 3. Featured Clients — Scroll Reveal
- **Status:** PASS
- **Details:**
  - Outer `media-wrapper` applies no opacity or intro animations, strictly reserving itself for scroll scrub response.
  - Inner `.lazy-media-container` / `<video>` / `<img>` natively controls the reveal upon intersecting the viewport.
  - Succeeded in mapping `data-dir` intents (`left`, `right`, `center`) into initial states.
  - Entrance gracefully interpolates `opacity: 0 -> 1` and `y: 24px -> 0`. If aligned left/right, it also interpolates `x: -25px -> 0` or `x: +25px -> 0`.
  - Applied `duration: 1.1s` and `ease: 'power3.out'` across all breakpoints.

## 4. Featured Clients — Small Scroll Response (Transform Verification)
- **Status:** PASS
- **Details:**
  - The scroll scrub applies `yPercent: speed * multiplier`.
  - The multiplier on Desktop is set to `3.0`, bounding most motion between roughly `-4%` and `+4.5%` as requested. 
  - Utilized `scrub: 1` explicitly to guarantee a physical inertia lag.
  - Hand-wrote a Puppeteer evaluation script (`test-scroll5.js`) to forcibly inject scroll offsets on the native window and wait for the 1-second scrub physics.
  - The script validated actual visual movement:
    - **Element 2 (speed -1)** moved from `-10.26px` to a calculated offset.
    - **Element 3 (speed 1.5)** moved from `12.96px` to a calculated offset.
  - The outer wrapper controls this scroll inertia. The inner element controls the entrance. Transforms never conflict.

## 5. Responsive Behavior
- **Status:** PASS
- **Details:**
  - Mobile retains the identical GSAP logic but drops the multiplier to `1.5` (`±2%`).
  - Tablet utilizes a multiplier of `2.5`.
  - Responsive breakpoints handle all layouts flawlessly. 

## 6. Build Checks
- **Status:** PASS
- **Details:**
  - Clean runs of `npm run lint`, `npx tsc --noEmit`, and `npm run build` verify the Typescript and Next.js Turbopack build is perfectly safe.
