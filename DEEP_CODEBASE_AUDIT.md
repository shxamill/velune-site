# DEEP CODEBASE AUDIT — Velune Site

**Project:** `C:\Personal\Work\velune-site`  
**Date:** 2026-09-21  
**Auditors:** 4 parallel specialist agents (Project Structure, Source Code Quality, Media & Content, Accessibility & CSS)  
**Scope:** Complete repository — 137 files, 13 directories, 16 source files, 39 media assets  

> [!CAUTION]
> This is a **READ-ONLY audit**. No files were modified, deleted, or uninstalled.

---

## Table of Contents

1. [CRITICAL Issues](#1-critical-issues)
2. [IMPORTANT Cleanup](#2-important-cleanup)
3. [SAFE TO DELETE](#3-safe-to-delete)
4. [SAFE TO ARCHIVE](#4-safe-to-archive)
5. [KEEP](#5-keep)
6. [DEPENDENCY Cleanup](#6-dependency-cleanup)
7. [CODE QUALITY Improvements](#7-code-quality-improvements)
8. [PERFORMANCE Improvements](#8-performance-improvements)
9. [ACCESSIBILITY Improvements](#9-accessibility-improvements)

---

## 1. CRITICAL Issues

### 1.1 Broken Primary Navigation Anchor Links
**Files:** [HeroNavigation.tsx#L85-91](file:///c:/Personal/Work/velune-site/src/components/hero/HeroNavigation.tsx#L85-L91)  
**Issue:** 3 of 5 menu links point to non-existent section IDs:
| Link | `href` | Actual Section ID | Status |
|---|---|---|---|
| WORKS | `#works` | `#selected-works` | **BROKEN** |
| STUDIO | `#studio` | *(no id on ManifestoSection)* | **BROKEN** |
| CLIENTS | `#clients` | `#client-roster` | **BROKEN** |

### 1.2 Google Fonts Never Injected Into HTML
**Files:** [fonts.ts#L10-31](file:///c:/Personal/Work/velune-site/src/lib/fonts.ts#L10-L31), [layout.tsx#L18](file:///c:/Personal/Work/velune-site/src/app/layout.tsx#L18)  
**Issue:** `layout.tsx` only mounts `geist.variable` on `<body>`. The variables `newsreader.variable`, `anton.variable`, and `spaceMono.variable` are **never placed on `<html>` or `<body>`**. Consequence: `--font-newsreader` resolves to undefined everywhere except `HeroTypography.tsx` (which manually imports `newsreader.className` as a workaround). `Anton` and `Space Mono` are downloaded by Next.js but never render.

### 1.3 Zero Visible Focus Indicators Site-Wide
**Files:** [globals.css#L128-132](file:///c:/Personal/Work/velune-site/src/styles/globals.css#L128-L132), all interactive components  
**Issue:** `button { all: unset; }` in globals.css destroys browser default focus outlines. All components use `focus-visible:ring-primary` but `--color-primary` is **never declared** in `@theme inline`. Result: every button and link has **zero keyboard focus indicator**.  
**WCAG:** 2.4.7 Focus Visible (Level AA) — **FAIL**.

### 1.4 No Focus Trap in Fullscreen Menu Dialog
**File:** [HeroNavigation.tsx#L118-138](file:///c:/Personal/Work/velune-site/src/components/hero/HeroNavigation.tsx#L118-L138)  
**Issue:** The overlay has `role="dialog"` and `aria-modal="true"` but:
1. Focus is not moved into the dialog on open
2. Tab key escapes to covered page elements behind the dialog
3. Focus is not restored to the trigger button on close  
**WCAG:** 2.1.2 No Keyboard Trap, 2.4.3 Focus Order — **FAIL**.

### 1.5 No Pause/Stop Mechanism for Auto-playing Videos
**Files:** [HeroMedia.tsx](file:///c:/Personal/Work/velune-site/src/components/hero/HeroMedia.tsx), [HeroFocalMedia.tsx](file:///c:/Personal/Work/velune-site/src/components/hero/HeroFocalMedia.tsx), [SelectedWorksSection.tsx](file:///c:/Personal/Work/velune-site/src/components/home/SelectedWorksSection.tsx), [ServicesSection.tsx](file:///c:/Personal/Work/velune-site/src/components/home/ServicesSection.tsx)  
**Issue:** 15+ `<video>` elements have `autoPlay loop muted playsInline` with no user-accessible pause/play toggle. Videos loop indefinitely.  
**WCAG:** 2.2.2 Pause, Stop, Hide (Level A) — **FAIL**.

### 1.6 Complete Bypass of Next.js Image Optimization
**Files:** [LazyMedia.tsx#L55-63](file:///c:/Personal/Work/velune-site/src/components/common/LazyMedia.tsx#L55-L63), [HeroMedia.tsx#L52-58](file:///c:/Personal/Work/velune-site/src/components/hero/HeroMedia.tsx#L52-L58)  
**Issue:** `LazyMedia.tsx` uses native `<img>` tags (with ESLint rule disabled). The single `<Image>` tag in `HeroMedia.tsx` has `unoptimized={true}`. Raw assets are 2268×4032px (9MP) served uncompressed without WebP/AVIF transcoding or responsive `srcset`.

### 1.7 Preloader Race Conditions & Memory Leaks
**File:** [HeroScrollSection.tsx#L18-65](file:///c:/Personal/Work/velune-site/src/components/hero/HeroScrollSection.tsx#L18-L65)  
**Issue:** `setTimeout` and recursive `setTimeout(checkVideo, 50)` are never cleared in `useEffect` cleanup. The `loadedmetadata` event listener is not removed on unmount. If the component unmounts before timers fire, state updates occur on an unmounted component.

### 1.8 30+ Undefined CSS Classes Used in Components
**Files:** All component `.tsx` files  
**Issue:** Components reference Tailwind classes that don't exist in `@theme inline`:

| Category | Undefined Classes | Impact |
|---|---|---|
| Colors | `bg-surface`, `text-on-surface`, `text-primary`, `bg-primary`, `text-on-primary`, `text-secondary`, `bg-secondary`, `text-ink-muted`, `bg-surface-container`, `bg-inverse-surface` | Colors fallback to transparent/inherit |
| Typography | `font-display`, `font-body`, `font-headline-sm`, `font-label-sm`, `text-headline-sm`, `text-display-md`, `text-label-sm`, `text-body-lg` | Fonts fallback to sans-serif |
| Focus | `ring-primary`, `ring-on-primary`, `ring-offset-surface` | Focus rings invisible |

---

## 2. IMPORTANT Cleanup

### 2.1 Dual Unaligned Design Token Systems
**File:** [globals.css#L4-18](file:///c:/Personal/Work/velune-site/src/styles/globals.css#L4-L18)  
**Issue:** Two disjoint token systems exist:
- **Hero System:** `--hero-text-charcoal`, `--hero-text-espresso`, `--hero-border-subtle`, `--hero-surface-elevated`
- **Site System:** `--site-primary`, `--site-secondary`, `--site-subtle-line`, `--site-neutral`  
Components oscillate between both and invent a third undeclared set (`text-primary`, `text-ink-muted`).

### 2.2 Duplicate Media Folders
**Path:** `public/media/`  
**Issue:** Every client folder exists twice — un-slugified (`KInjal Mehtha/`) used by Hero and slugified (`work/kinjal-mehtha/`) used by SelectedWorks/Services. **18 files are exact duplicates**, doubling deployment payload for media.

### 2.3 Unkilled GSAP Timelines on Menu Toggle
**File:** [HeroNavigation.tsx#L36,54](file:///c:/Personal/Work/velune-site/src/components/hero/HeroNavigation.tsx#L36)  
**Issue:** New GSAP timelines are created every time `isOpen` changes. Previous timelines are never killed or reverted. Rapid toggling causes multiple timelines fighting over the same DOM properties.

### 2.4 DOM Coupling Across Component Boundaries
**File:** [HeroScrollSection.tsx#L42,75](file:///c:/Personal/Work/velune-site/src/components/hero/HeroScrollSection.tsx#L42)  
**Issue:** Uses `document.getElementById('hero-focal-video')` and `document.querySelector('.focal-visual')` to reach into child components. Breaks React component boundaries.

### 2.5 Hardcoded Spaces in Media File Paths
**Files:** [HeroFocalMedia.tsx#L7-8](file:///c:/Personal/Work/velune-site/src/components/hero/HeroFocalMedia.tsx#L7-L8), [HeroMedia.tsx#L11-69](file:///c:/Personal/Work/velune-site/src/components/hero/HeroMedia.tsx#L11-L69)  
**Issue:** Video/image paths contain unescaped spaces (e.g., `/media/Nomi Kids Culture/IMG_5857.MP4`). Can cause 404 errors depending on server/CDN URL encoding.

### 2.6 QuickTime .MOV Format Used in Web `<video>` Tags
**Files:** [HeroMedia.tsx](file:///c:/Personal/Work/velune-site/src/components/hero/HeroMedia.tsx), [SelectedWorksSection.tsx](file:///c:/Personal/Work/velune-site/src/components/home/SelectedWorksSection.tsx), [ServicesSection.tsx](file:///c:/Personal/Work/velune-site/src/components/home/ServicesSection.tsx)  
**Issue:** `.MOV` (QuickTime) is not universally supported. Chrome/Firefox on Windows/Linux and older Android may fail to decode. Videos should be `.mp4` (H.264) with `.webm` (VP9) fallback.

### 2.7 100% of Portfolio Images Lack Alt Text
**Files:** [SelectedWorksSection.tsx#L299-351](file:///c:/Personal/Work/velune-site/src/components/home/SelectedWorksSection.tsx#L299-L351), [LazyMedia.tsx#L14](file:///c:/Personal/Work/velune-site/src/components/common/LazyMedia.tsx#L14)  
**Issue:** All 17 media objects omit `alt`. `LazyMedia.tsx` defaults to `alt=''`, marking all portfolio work as decorative.  
**WCAG:** 1.1.1 Non-text Content (Level A).

### 2.8 Broken Heading Hierarchy
**Issue:** Heading levels are skipped across sections:
- `ServicesSection` skips `<h2>` entirely, jumping to `<h3>`
- `ClientRosterSection` has zero headings
- `SelectedWorksSection` renders the main title "Selected Works" as `<p>` while the eyebrow is `<h2>`  
**WCAG:** 1.3.1 Info and Relationships.

### 2.9 Low Contrast Text Fails WCAG AA
**File:** [ManifestoSection.tsx#L30-34](file:///c:/Personal/Work/velune-site/src/components/home/ManifestoSection.tsx#L30-L34)  
**Issue:** `text-text-muted` (`#8A8780`) at `text-[10px]` over `#FBFBFA` yields **3.41:1** contrast ratio. Minimum for normal text under 18pt is **4.5:1**.

### 2.10 Severe Eyebrow Styling Inconsistency
**Issue:** The small uppercase category label uses 6 different tracking/sizing values across 6 sections:
- Hero: `text-[11px] tracking-[0.25em]`
- Manifesto: `text-[10px] tracking-[0.2em]`
- Services: `tracking-[0.24em]`
- Let's Talk: `tracking-[0.28em]`

### 2.11 1024px vs 1025px Breakpoint Conflict
**Files:** [HeroScrollSection.tsx#L112](file:///c:/Personal/Work/velune-site/src/components/hero/HeroScrollSection.tsx#L112) uses `(min-width: 1025px)`, [SelectedWorksSection.tsx#L234](file:///c:/Personal/Work/velune-site/src/components/home/SelectedWorksSection.tsx#L234) uses `>= 1024`. Tailwind `lg:` is `1024px`. Creates a 1px synchronization gap at exactly 1024px.

---

## 3. SAFE TO DELETE

### 3.1 Root Test/Script Files (39 files)

| File | Reason |
|---|---|
| `test-height.js` | UTF-16LE encoded diagnostic; broken encoding |
| `test-menu.js` | One-off menu integration test |
| `test-overflow.js` | One-off overflow diagnostic |
| `test-overflow2.js` | One-off overflow diagnostic |
| `test-overflow3.js` | One-off overflow diagnostic |
| `test-preloader.js` | One-off preloader diagnostic |
| `test-scroll.js` | One-off scroll transform test |
| `test-scroll2.js` | One-off scroll transform test |
| `test-scroll3.js` | One-off ScrollTrigger progress test |
| `test-scroll4.js` | One-off ScrollTrigger progress test |
| `test-scroll5.js` | One-off scroll displacement test |
| `test-scroll6.js` | One-off velocity proxy test |
| `test-scroll7.js` | Phase 14.7 puppeteer verification |
| `test-scroll8.js` | Phase 14.8 puppeteer verification |
| `check-overlap.js` | One-off overlap diagnostic |
| `check-stitch-overlap.js` | One-off Stitch overlap diagnostic |
| `verify-layout.js` | One-off layout screenshot |
| `scan.js` | Asset dimension scanner |
| `scan2.js` | Alternative asset scanner |
| `capture.js` | Screenshot capture script |
| `capture-full.js` | Full-page capture script |
| `capture-letstalk.js` | Section capture script |
| `capture-manifesto.js` | Section capture script |
| `capture-menu.js` | Menu capture script |
| `capture-roster.js` | Section capture script |
| `capture-scroll.js` | Scroll milestone capture |
| `capture-scroll-v2.js` | Scroll milestone capture v2 |
| `capture-services.js` | Section capture script |
| `capture-works.js` | Section capture script |
| `record-scroll.js` | Video recording script |
| `record-scroll-v2.js` | Video recording script v2 |
| `record-scroll-v3.js` | Video recording script v3 |
| `get-media-dimensions.js` | Asset dimension metadata generator |
| `write_roster.js` | Code generation script (already generated) |
| `write_services.js` | Code generation script (already generated) |
| `fix_jsx.py` | One-off JSX post-processor |
| `generate_section.py` | One-off HTML-to-TSX converter |
| `parse.py` | One-off HTML parser |
| `parse_articles.py` | One-off article parser |

### 3.2 Root Screenshot & Recording Files (65 files)

| Pattern | Count | Reason |
|---|---|---|
| `hero-desktop-*.png` | 18 | Scroll progression captures (obsolete) |
| `hero-tablet-*.png` | 18 | Scroll progression captures (obsolete) |
| `hero-mobile-*.png` | 18 | Scroll progression captures (obsolete) |
| `hero-initial-*.png` | 3 | Initial captures (obsolete) |
| `manifesto-*.png` | 3 | Section captures (obsolete) |
| `verify-*.png` | 2 | Layout verification (obsolete) |
| `hero-animation*.mp4` | 3 | Screen recordings (obsolete) |

### 3.3 Root HTML & Text Dump Files (10 files)

| File | Reason |
|---|---|
| `hero.html` | Stitch HTML prototype (already converted) |
| `next-section.html` | Full Stitch export (already converted) |
| `next_section_2.html` | Duplicate of `full_selected_works.html` |
| `next_section_html.txt` | UTF-16LE snippet |
| `full_selected_works.html` | Stitch export (already converted) |
| `section4.html` | Stitch export (already converted) |
| `services_section.html` | Stitch export (already converted) |
| `stitch-source.html` | Empty 0-byte file |
| `stitch-source2.html` | Duplicate of `hero.html` |
| `stitch_home_f23.html` | Duplicate of `next-section.html` |

### 3.4 QA Capture Directories (6 directories, 17 files)

| Directory | Files | Reason |
|---|---|---|
| `qa_captures_full/` | 3 | Captured by `capture-full.js` |
| `qa_captures_letstalk/` | 3 | Captured by `capture-letstalk.js` |
| `qa_captures_menu/` | 2 | Captured by `capture-menu.js` |
| `qa_captures_roster/` | 3 | Captured by `capture-roster.js` |
| `qa_captures_services/` | 3 | Captured by `capture-services.js` |
| `qa_captures_works/` | 3 | Captured by `capture-works.js` |

### 3.5 Empty Source Directories

| Directory | Reason |
|---|---|
| `src/config/` | Empty, never used |
| `src/hooks/` | Empty, never used |

### 3.6 Miscellaneous Root Files

| File | Reason |
|---|---|
| `media-manifest.json` | Generated output from `get-media-dimensions.js` |
| `tsconfig.tsbuildinfo` | Build cache (should be in `.gitignore`) |
| `stitch_prompt.md` | Design prompt (no longer needed in root) |

### 3.7 Unused Default Public Assets (5 files)

| File | Reason |
|---|---|
| `public/file.svg` | Next.js starter template default |
| `public/globe.svg` | Next.js starter template default |
| `public/next.svg` | Next.js starter template default |
| `public/vercel.svg` | Next.js starter template default |
| `public/window.svg` | Next.js starter template default |

### 3.8 Unreferenced Media Files (10 files)

| File | Reason |
|---|---|
| `public/media/logo.jpeg` | Unused branding asset |
| `public/media/KInjal Mehtha/IMG_3845.PNG` | Duplicate; slug version used by SelectedWorks |
| `public/media/KInjal Mehtha/IMG_3846.MP4` | Duplicate; slug version used by SelectedWorks |
| `public/media/Lakshi Lingaraju/IMG_5845.MP4` | Duplicate; slug version used |
| `public/media/Lakshi Lingaraju/IMG_5846.PNG` | Duplicate; slug version used |
| `public/media/PL Edit/IMG_3755.MOV` | Duplicate; slug version used |
| `public/media/PL Edit/IMG_5853.MP4` | Duplicate; slug version used |
| `public/media/PL Edit/IMG_5855.PNG` | Duplicate; slug version used |
| `public/media/Stilat/IMG_5849.MOV` | Duplicate; slug version used |
| `public/media/Stilat/IMG_5852.JPG.jpeg` | Duplicate; slug version used |

---

## 4. SAFE TO ARCHIVE

### 4.1 QA Phase Reports (9 files)
These document the engineering history and should be moved to a `docs/qa/` directory:

| File | Phase |
|---|---|
| `QA_Performance_Preloader.md` | Phase 14 baseline |
| `QA_PHASE_14_1.md` | Kinjal collision fix |
| `QA_PHASE_14_2.md` | Parallax intensity tuning |
| `QA_PHASE_14_3.md` | Preloader masking + hero reveal |
| `QA_FEATURED_CLIENT_SCROLL.md` | Phase 14.4 scroll reveal |
| `QA_PHASE_14_5.md` | Missing hero media |
| `QA_PHASE_14_6.md` | Hero media swap + velocity proxy |
| `QA_PHASE_14_7.md` | Kinjal swap + data-speed fix |
| `QA_PHASE_14_8.md` | Stilat/PL Edits ScrollTrigger bounds fix |

### 4.2 Stitch Design Assets (3 files)
Already in `.stitch/` — keep as design reference:

| File | Purpose |
|---|---|
| `.stitch/DESIGN.md` | Design token documentation |
| `.stitch/SITE.md` | Architecture boundary rules |
| `.stitch/metadata.json` | Screen metadata |

### 4.3 Passthrough Component
**File:** [Hero.tsx](file:///c:/Personal/Work/velune-site/src/components/hero/Hero.tsx)  
**Issue:** Pure pass-through wrapper for `<HeroScrollSection />` with no logic. Can be inlined but low priority.

---

## 5. KEEP

### 5.1 Production Source (KEEP — production)

| File | Role |
|---|---|
| `src/app/layout.tsx` | Root layout |
| `src/app/page.tsx` | Landing page |
| `src/app/favicon.ico` | Favicon |
| `src/components/common/LazyMedia.tsx` | Lazy media loader |
| `src/components/common/SmoothScrolling.tsx` | Lenis smooth scroll |
| `src/components/hero/HeroScrollSection.tsx` | Core hero orchestration |
| `src/components/hero/HeroFocalMedia.tsx` | Focal video |
| `src/components/hero/HeroMedia.tsx` | Peripheral media |
| `src/components/hero/HeroNavigation.tsx` | Navbar + menu |
| `src/components/hero/HeroTypography.tsx` | Hero text |
| `src/components/home/ManifestoSection.tsx` | Manifesto |
| `src/components/home/SelectedWorksSection.tsx` | Featured clients |
| `src/components/home/ServicesSection.tsx` | Services accordion |
| `src/components/home/ClientRosterSection.tsx` | Client roster |
| `src/components/home/LetsTalkSection.tsx` | Contact CTA |
| `src/lib/fonts.ts` | Font configuration |
| `src/styles/globals.css` | Design tokens + resets |

### 5.2 Configuration (KEEP — production)

| File | Role |
|---|---|
| `next.config.ts` | Next.js config |
| `package.json` | Dependencies |
| `package-lock.json` | Lockfile |
| `tsconfig.json` | TypeScript config |
| `postcss.config.mjs` | PostCSS config |
| `eslint.config.mjs` | ESLint config |
| `.gitignore` | Git ignore rules |
| `next-env.d.ts` | Next.js types |

### 5.3 Documentation (KEEP — documentation)

| File | Role |
|---|---|
| `README.md` | Project readme |
| `AGENTS.md` | Next.js agent rules (auto-generated) |
| `CLAUDE.md` | AI assistant instructions |

### 5.4 Referenced Media (KEEP — production)

All 18 files in `public/media/work/` — **100% referenced by source code**.  
All 11 files in un-slugified Hero folders that are actively referenced (after consolidation, the un-slugified folders can be removed).

---

## 6. DEPENDENCY Cleanup

| Package | Location | Status | Recommendation |
|---|---|---|---|
| `three` | `dependencies` | **UNUSED** (0 imports) | Remove now, reinstall when WebGL work begins |
| `@react-three/fiber` | `dependencies` | **UNUSED** (0 imports) | Remove now |
| `@react-three/drei` | `dependencies` | **UNUSED** (0 imports) | Remove now |
| `@types/three` | `dependencies` | **UNUSED** (0 imports) | Remove; also miscategorized (should be `devDependencies`) |
| `@gsap/react` | `dependencies` | **UNUSED** (0 imports) | Remove; all animations use standard `useEffect` + `gsap.context()` |
| `puppeteer-screen-recorder` | `dependencies` | **MISPLACED** | Move to `devDependencies` (only used by root QA scripts) |
| `puppeteer` | `devDependencies` | **OPTIONAL** | Keep if QA scripts are retained; remove if scripts are deleted |
| `image-size` | `devDependencies` | **OPTIONAL** | Only used by `scan.js`; remove if script is deleted |
| `gsap` | `dependencies` | **USED** | Keep |
| `lenis` | `dependencies` | **USED** | Keep |
| `next` | `dependencies` | **USED** | Keep |
| `react` / `react-dom` | `dependencies` | **USED** | Keep |
| `tailwindcss` | `devDependencies` | **USED** | Keep |
| `typescript` | `devDependencies` | **USED** | Keep |
| `eslint` / `eslint-config-next` | `devDependencies` | **USED** | Keep |

**Estimated savings from removing unused deps:** ~150MB+ from `node_modules` (Three.js ecosystem is heavy).

---

## 7. CODE QUALITY Improvements

### 7.1 GSAP / ScrollTrigger

| Issue | File | Severity | Description |
|---|---|---|---|
| Unkilled timelines | [HeroNavigation.tsx#L36,54](file:///c:/Personal/Work/velune-site/src/components/hero/HeroNavigation.tsx#L36) | IMPORTANT | New timeline on every toggle; previous not killed |
| Unbounded global ScrollTrigger | [SelectedWorksSection.tsx#L248](file:///c:/Personal/Work/velune-site/src/components/home/SelectedWorksSection.tsx#L248) | POLISH | Velocity listener runs globally; should scope to section when possible |
| FOUC risk on hero | [HeroScrollSection.tsx#L209-213](file:///c:/Personal/Work/velune-site/src/components/hero/HeroScrollSection.tsx#L209-L213) | IMPORTANT | `#spatial-hero-stage` lacks initial CSS `opacity: 0` before GSAP takes over |

### 7.2 Preloader

| Issue | File | Severity | Description |
|---|---|---|---|
| Uncleaned timers | [HeroScrollSection.tsx#L18-65](file:///c:/Personal/Work/velune-site/src/components/hero/HeroScrollSection.tsx#L18-L65) | CRITICAL | `setTimeout` and `loadedmetadata` listener not cleaned up on unmount |
| DOM remains mounted | [HeroScrollSection.tsx#L246-253](file:///c:/Personal/Work/velune-site/src/components/hero/HeroScrollSection.tsx#L246-L253) | POLISH | Preloader fades to `opacity: 0` but stays in DOM without `aria-hidden` |

### 7.3 Component Architecture

| Issue | File | Severity | Description |
|---|---|---|---|
| DOM coupling | [HeroScrollSection.tsx#L42,75](file:///c:/Personal/Work/velune-site/src/components/hero/HeroScrollSection.tsx#L42) | IMPORTANT | `document.getElementById` / `querySelector` into child components |
| Passthrough wrapper | [Hero.tsx](file:///c:/Personal/Work/velune-site/src/components/hero/Hero.tsx) | POLISH | Pure wrapper with no logic; can be inlined |
| Stale array refs | [HeroNavigation.tsx#L10,130](file:///c:/Personal/Work/velune-site/src/components/hero/HeroNavigation.tsx#L10) | POLISH | `linksRef.current[index] = el` without resetting between renders |
| Inline type cast | [LazyMedia.tsx#L41,57](file:///c:/Personal/Work/velune-site/src/components/common/LazyMedia.tsx#L41) | POLISH | Shared ref cast inline for both `<img>` and `<video>` |

### 7.4 Lenis

| Issue | File | Severity | Description |
|---|---|---|---|
| Static reduced-motion check | [SmoothScrolling.tsx#L13](file:///c:/Personal/Work/velune-site/src/components/common/SmoothScrolling.tsx#L13) | POLISH | `matchMedia` queried once on mount without `change` event listener |

### 7.5 Layout Shift

| Issue | File | Severity | Description |
|---|---|---|---|
| Scrollbar width jump | [HeroNavigation.tsx#L28](file:///c:/Personal/Work/velune-site/src/components/hero/HeroNavigation.tsx#L28) | IMPORTANT | `body.style.overflow = 'hidden'` without compensating `padding-right` for scrollbar width |
| `overflow-x-hidden` on main | [page.tsx#L10](file:///c:/Personal/Work/velune-site/src/app/page.tsx#L10) | POLISH | May break descendant `position: sticky` in some browsers |

---

## 8. PERFORMANCE Improvements

| Issue | Severity | Description |
|---|---|---|
| No image optimization | CRITICAL | All images served as raw 9MP files. No WebP/AVIF, no responsive `srcset`, no compression. |
| .MOV video format | IMPORTANT | QuickTime containers not universally supported. Should transcode to `.mp4` (H.264) + `.webm` (VP9). |
| Duplicate media storage | IMPORTANT | 18 identical files exist in both `public/media/[Name]/` and `public/media/work/[slug]/`. |
| Excessive client components | IMPORTANT | `ClientRosterSection` and `LetsTalkSection` are `'use client'` but contain mostly static markup. GSAP triggers could be isolated to small wrapper components. |
| Missing `next.config.ts` settings | POLISH | No image format config, no security headers, no caching rules. |
| Missing OG/SEO metadata | POLISH | Only `title` and `description` defined. No OpenGraph, Twitter Card, or viewport metadata. |
| Anton + Space Mono downloaded but unused | POLISH | Next.js font optimization downloads these fonts during build; they never render. |

---

## 9. ACCESSIBILITY Improvements

### 9.1 CRITICAL (WCAG Level A failures)

| Issue | WCAG | File |
|---|---|---|
| No focus indicators site-wide | 2.4.7 | All interactive components |
| No focus trap in menu dialog | 2.1.2, 2.4.3 | HeroNavigation.tsx |
| No pause/stop for auto-play videos | 2.2.2 | All video components |
| Broken anchor navigation (3/5 links) | 2.4.4 | HeroNavigation.tsx |

### 9.2 HIGH

| Issue | WCAG | File |
|---|---|---|
| 100% of portfolio images lack alt text | 1.1.1 | SelectedWorksSection, LazyMedia |
| All videos lack `title` or `aria-label` | 1.1.1, 4.1.2 | HeroMedia, HeroFocalMedia, LazyMedia |
| Broken heading hierarchy | 1.3.1 | Services (skips h2), ClientRoster (no headings) |
| CSS animations ignore `prefers-reduced-motion` | 2.3.3 | globals.css |
| `<h4>` nested inside `<button>` in accordion | 4.1.2 | ServicesSection |
| Missing `aria-controls` on accordion buttons | 4.1.2 | ServicesSection |
| Low contrast text (3.41:1) | 1.4.3 | ManifestoSection |
| Inactive accordion items remain in DOM (videos auto-play) | — | ServicesSection |

### 9.3 MEDIUM

| Issue | WCAG | File |
|---|---|---|
| No focus restoration on dialog close | 2.4.3 | HeroNavigation |
| `target="_blank"` links without notification | 3.2.5 | ClientRosterSection, LetsTalkSection |
| Decorative `/` separators not `aria-hidden` | — | ClientRosterSection |
| Preloader remains in DOM without `aria-hidden` | — | HeroScrollSection |
| Missing `<track>` captions on videos | 1.2.2 | LazyMedia |
| `<nav>` wraps only the MENU button, not links | — | HeroNavigation |
| Hero rendered as `<div>` without landmark role | — | HeroScrollSection |
| Menu button lacks `aria-haspopup="dialog"` | — | HeroNavigation |

---

## Summary Statistics

| Category | Count |
|---|---|
| **CRITICAL issues** | 8 |
| **IMPORTANT issues** | 11 |
| **Files safe to DELETE** | ~131 (39 scripts + 65 screenshots/recordings + 10 HTML dumps + 17 QA captures + empty dirs + misc) |
| **Files safe to ARCHIVE** | 12 (9 QA reports + 3 Stitch files) |
| **Unused dependencies** | 5 packages (~150MB+ savings) |
| **Misplaced dependencies** | 1 (`puppeteer-screen-recorder` → devDependencies) |
| **Undefined CSS classes in use** | 30+ |
| **Duplicate media files** | 18 |
| **Accessibility WCAG failures** | 4 Level A, 8 Level AA |
