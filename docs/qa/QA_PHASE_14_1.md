# Phase 14.1 QA: Featured Clients + Preloader Correction

## 1. Kinjal Mehtha Media Collision
- **Status:** PASS
- **Details:** 
  - Identified the negative margin (`lg:-ml-12`) that was pulling the fourth media item outside its flex container boundary, causing it to overlap/collide with adjacent media in the cluster.
  - Removed the negative margin, allowing the native Flexbox `gap` styling to safely separate the media. The composition retains its intended density and asymmetric nature without unintended overlaps.

## 2. Scroll Response (Parallax)
- **Status:** PASS
- **Details:**
  - Separated the "Reveal" GSAP transform (`y: 40`, `opacity`) from the Parallax transform (`yPercent`), strictly adhering to the "one authoritative GSAP transform per target" rule.
  - The Media Wrapper handles the scrubbed Parallax.
  - The Media Child (`<img>`, `<video>`) handles the one-off Reveal interpolation (`y` and `scale`).
  - Parallax strength is clamped via a dynamic multiplier (`speed * 6` on desktop, `speed * 3` on tablet) resulting in `yPercent` ranging smoothly from roughly -6 to +6.
  - Parallax is disabled on mobile devices to preserve constrained layout boundaries.

## 3. Preloader Enhancements
- **Status:** PASS
- **Details:**
  - Implemented a firm `4000ms` minimum display timer via `Promise.all` equivalent state architecture (`timerDone`, `fontsLoaded`, `videoLoaded`).
  - The preloader remains strictly minimal, monochrome, and cinematic with no fake progress indicators.
  - The GSAP timeline is strictly deferred until this timer AND the Hero focal video metadata + fonts have resolved.

## 4. Full Page QA
- **Status:** PASS
- **Viewports Tested:** 1440x900, 1280x800, 390x844.
- **Observations:**
  - Preloader respects the 4-second delay before fading out.
  - Media elements scroll gracefully with independent subtle parallax rates.
  - No media items jump or fight their reveal tweens.
  - No horizontal overflow.
  - Build `npm run build` and `tsc` compile properly.
