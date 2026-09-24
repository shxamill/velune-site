# Phase 15.3 — Preloader QA Verification

**Project:** `C:\Personal\Work\velune-site`  
**Date:** 2026-09-24  

## QA Summary

The cinematic Velune Preloader was fully rebuilt per the reference choreography. It is now a strictly isolated, self-contained component (`Preloader.tsx`) that acts as the entry gatekeeper for the Hero Scroll sequence.

### Timing Measurements & Choreography

| Time / State | Component Behavior | Visual Result |
| :--- | :--- | :--- |
| **0.0s** | Preloader Mounts | `fixed inset-0 z-[9999]` opaque canvas completely hides the underlying DOM. GSAP instantly sets Hero media (`.orbit-item-inner`, `.orbit-focal`, `.hero-typography-inner`, `header`) to `opacity: 0` behind the curtain. |
| **0.0s – 3.0s** | Resource Loading | Center wordmark displays `VEL [progress] UNE`. Progress organically interpolates from `0` to `100` based on a hard minimum 3000ms duration, blocked by `document.fonts.ready` and the `hero-focal-video` `loadedmetadata` event. |
| **~3.0s (100%)** | Trigger Exit: Step 1 | The `progress` number gracefully fades out over `350ms` using `power3.out`. |
| **~3.35s** | Trigger Exit: Step 2 | The number container's width/margin collapse over `450ms`, smoothly reuniting `VEL` and `UNE` into the solid `VELUNE` wordmark. |
| **~3.8s** | Trigger Exit: Step 3 | `VELUNE` begins slightly scaling down (`scale: 0.9`) and fading out over `500ms`. |
| **~3.9s** | Background Fade | The solid preloader canvas begins fading (`opacity: 0` over `600ms`), and immediately sets `pointer-events: none` to unlock user interaction. |
| **~4.0s** | Navbar Restore | The top `header` (VELUNE, MENU) gracefully fades in (`opacity: 1` over `800ms`). |
| **~4.0s** | Hero Media Reveal | Step 4 commences. The left flank media slide in from `x: -60px`. Right flank media slide in from `x: +60px`. Focal media floats up from `y: +30px`. Staggered softly by `100ms`. |
| **~4.4s** | Typography Reveal | Step 5 triggers. The core hero typography ("Create. Capture. Elevate.") fades upward (`y: 15px -> 0`). |
| **~5.2s** | Sequence Complete | The `onComplete` hook fires. `<Preloader />` safely unmounts. `HeroScrollSection` mounts its GSAP `ScrollTrigger` instances onto the perfectly settled Hero elements. |

### Technical Protections Implemented

1. **Self-Contained Isolation:** All exit animations (the full Hero entrance GSAP timeline) were migrated *into* the `Preloader.tsx` component. `HeroScrollSection.tsx` was stripped of entrance logic and now strictly serves as the ScrollTrigger wrapper.
2. **Stable Token Dependencies:** Bypassed fragile class tokens for the opaque veil, using rigorous layout primitives and explicit `z-max`.
3. **Accessibility:** Responds to `prefers-reduced-motion` cleanly. Number animation and media translations are skipped in favor of a synchronized 1-second global crossfade, while still strictly enforcing the minimum loading duration.
4. **GSAP Cleanups:** Handled via unmounting the `Preloader` only *after* the GSAP timeline finishes, perfectly preserving the final inline states of the Hero DOM elements without triggering reversion flashes.

### Validation Commands Run
- `npm run lint` → **PASS**
- `npx tsc --noEmit` → **PASS**
- `npm run build` → **PASS**

### Frame Verification
*Note: Puppeteer was utilized to verify DOM layout integrity, preventing "pop-in" flashes and confirming `z-index` layering during the opacity transitions across 1440, 1280, and 390.*

The cinematic preloader matches the user's velocity, framing, and layout requirements entirely.
