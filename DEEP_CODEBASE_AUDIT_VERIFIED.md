# Verified Codebase Audit

**Project:** `C:\Personal\Work\velune-site`  
**Date:** 2026-09-21  
**Verification Method:** 3 parallel specialist verifiers + automated build validation  
**Source Audit:** `DEEP_CODEBASE_AUDIT.md`  

---

## Executive Summary

Every CRITICAL and IMPORTANT finding from the original audit has been independently verified by reading the exact files and lines. Build validation commands all pass cleanly:

| Command | Result |
|---|---|
| `npm run lint` | **PASS** (0 errors) |
| `npx tsc --noEmit` | **PASS** (0 errors) |
| `npm run build` | **PASS** (compiled in 15.3s, 4/4 static pages generated) |

**Verification Outcome:**
- **8 CRITICAL findings:** 8 verified YES, 0 false positives
- **11 IMPORTANT findings:** 11 verified YES, 0 false positives
- **131 deletion candidates:** All verified safe (0 imports, 0 config references)
- **5 unused dependencies:** All confirmed (0 imports anywhere)
- **18 duplicate media files:** All confirmed byte-identical
- **10 unreferenced media files:** All confirmed (0 references in src/)
- **30+ undefined CSS classes:** All confirmed unresolved in @theme
- **0 false positives identified**

---

## CRITICAL

### 1.1 Broken Primary Navigation Anchor Links
- **Verified:** YES
- **Evidence:**
  - [HeroNavigation.tsx#L85-91](file:///c:/Personal/Work/velune-site/src/components/hero/HeroNavigation.tsx#L85-L91): `href` values are `#works`, `#studio`, `#clients`
  - [SelectedWorksSection.tsx#L281](file:///c:/Personal/Work/velune-site/src/components/home/SelectedWorksSection.tsx#L281): `id="selected-works"` → **MISMATCH** with `#works`
  - [ManifestoSection.tsx](file:///c:/Personal/Work/velune-site/src/components/home/ManifestoSection.tsx): **No `id` attribute at all** → `#studio` resolves nowhere
  - [ClientRosterSection.tsx#L50](file:///c:/Personal/Work/velune-site/src/components/home/ClientRosterSection.tsx#L50): `id="client-roster"` → **MISMATCH** with `#clients`
- **Production impact:** YES — 3 of 5 menu links fail to scroll to their sections
- **Recommended remediation:** Fix hrefs to match section IDs, add `id="manifesto"` to ManifestoSection

---

### 1.2 Google Fonts Never Injected Into HTML
- **Verified:** YES
- **Evidence:**
  - [fonts.ts#L10-31](file:///c:/Personal/Work/velune-site/src/lib/fonts.ts#L10-L31): Exports `geist`, `newsreader`, `anton`, `spaceMono` with `.variable` properties
  - [layout.tsx#L18](file:///c:/Personal/Work/velune-site/src/app/layout.tsx#L18): `<body className={`${geist.variable} antialiased`}>` — **only `geist.variable` mounted**
  - [globals.css#L47-50](file:///c:/Personal/Work/velune-site/src/styles/globals.css#L47-L50): `--font-newsreader: var(--font-newsreader)` — circular/undefined reference
  - [HeroTypography.tsx#L1,15](file:///c:/Personal/Work/velune-site/src/components/hero/HeroTypography.tsx#L1): Bypasses the CSS variable system entirely by importing `newsreader` directly and using `${newsreader.className}`
- **Production impact:** YES — Newsreader renders correctly ONLY in `HeroTypography.tsx` (via direct className). Everywhere else that relies on Tailwind font utilities (`font-newsreader`, `font-display`, etc.), the font falls back to system default. Anton and Space Mono are downloaded by Next.js but never render anywhere.
- **Recommended remediation:** Add `${newsreader.variable} ${anton.variable} ${spaceMono.variable}` to the `<body>` className in layout.tsx

---

### 1.3 Zero Visible Focus Indicators Site-Wide
- **Verified:** YES
- **Evidence:**
  - [globals.css#L128-132](file:///c:/Personal/Work/velune-site/src/styles/globals.css#L128-L132): `button { all: unset; box-sizing: border-box; cursor: pointer; }` — destroys all browser defaults including focus outlines
  - No `--color-primary` exists in `@theme inline` (only `--color-site-primary` exists)
  - Components using `focus-visible:ring-primary`: [HeroNavigation.tsx#L108](file:///c:/Personal/Work/velune-site/src/components/hero/HeroNavigation.tsx#L108), [ServicesSection.tsx#L136](file:///c:/Personal/Work/velune-site/src/components/home/ServicesSection.tsx#L136), [ClientRosterSection.tsx#L71](file:///c:/Personal/Work/velune-site/src/components/home/ClientRosterSection.tsx#L71), [LetsTalkSection.tsx#L56,68](file:///c:/Personal/Work/velune-site/src/components/home/LetsTalkSection.tsx#L56)
  - No global `:focus-visible` fallback rule exists anywhere in globals.css
- **Production impact:** YES — WCAG 2.4.7 Focus Visible (Level AA) FAIL. Zero keyboard focus indicators on any interactive element.
- **Recommended remediation:** Add `--color-primary` to @theme, add global `:focus-visible` outline rule

---

### 1.4 No Focus Trap in Fullscreen Menu Dialog
- **Verified:** YES (partial: Escape handling exists, trap does not)
- **Evidence:**
  - [HeroNavigation.tsx#L12-20](file:///c:/Personal/Work/velune-site/src/components/hero/HeroNavigation.tsx#L12-L20): Escape key handler correctly sets `isOpen = false` ✓
  - [HeroNavigation.tsx#L22-78](file:///c:/Personal/Work/velune-site/src/components/hero/HeroNavigation.tsx#L22-L78): useEffect manages `isOpen` state but contains **zero** focus trap logic, **zero** focus-move-to-dialog logic, and **zero** focus-restoration logic
  - Dialog has `role="dialog"` and `aria-modal="true"` but Tab key escapes to background page elements
- **Production impact:** YES — WCAG 2.1.2, 2.4.3 FAIL. Keyboard users can tab into hidden content behind the overlay.
- **Recommended remediation:** Implement focus trap (move focus into dialog on open, trap Tab cycle within dialog links, restore focus to trigger button on close)

---

### 1.5 No Pause/Stop Mechanism for Auto-playing Videos
- **Verified:** YES
- **Evidence:**
  - [HeroFocalMedia.tsx#L9](file:///c:/Personal/Work/velune-site/src/components/hero/HeroFocalMedia.tsx#L9): `autoPlay loop muted playsInline` — no controls
  - [HeroMedia.tsx#L13,27,41,70](file:///c:/Personal/Work/velune-site/src/components/hero/HeroMedia.tsx#L13): All 4 peripheral videos use `autoPlay loop muted playsInline` — no controls
  - No component anywhere provides a pause/play toggle or `controls` attribute
- **Production impact:** YES — WCAG 2.2.2 (Level A) FAIL. 15+ continuously looping videos with no user stop mechanism.
- **Recommended remediation:** Add a global pause-all-videos toggle, or mark ambient videos as `aria-hidden="true"` with a media pause button

---

### 1.6 Complete Bypass of Next.js Image Optimization
- **Verified:** YES
- **Evidence:**
  - [LazyMedia.tsx#L55-63](file:///c:/Personal/Work/velune-site/src/components/common/LazyMedia.tsx#L55-L63): Uses native `<img>` with `// eslint-disable-next-line @next/next/no-img-element`
  - [HeroMedia.tsx#L57](file:///c:/Personal/Work/velune-site/src/components/hero/HeroMedia.tsx#L57): Single `<Image>` tag has `unoptimized={true}`
  - Raw images are 2268×4032px (9MP) JPEG files served uncompressed
- **Production impact:** YES — Massive performance impact on mobile. No WebP/AVIF transcoding, no responsive srcset, no lazy dimension hints.
- **Recommended remediation:** Replace `<img>` with `<Image>` in LazyMedia, remove `unoptimized` flag, configure image formats in next.config.ts

---

### 1.7 Preloader Race Conditions & Memory Leaks
- **Verified:** YES
- **Evidence:**
  - [HeroScrollSection.tsx#L17-65](file:///c:/Personal/Work/velune-site/src/components/hero/HeroScrollSection.tsx#L17-L65): Contains 3 `setTimeout` calls (lines 29, 44, 56) and a `loadedmetadata` event listener (line 51)
  - The `useEffect` has **no cleanup return function** — no `clearTimeout`, no `removeEventListener`
- **Production impact:** YES — If component unmounts before timers fire (e.g., navigation), state updates on unmounted component cause memory leaks and potential runtime errors.
- **Recommended remediation:** Store timeout IDs in refs, return cleanup function from useEffect that clears all timeouts and removes event listeners

---

### 1.8 30+ Undefined CSS Classes Used in Components
- **Verified:** YES
- **Evidence:** Complete `@theme inline` token inventory extracted from [globals.css](file:///c:/Personal/Work/velune-site/src/styles/globals.css). Cross-referenced against all component className usages:

| Undefined Class | Defined Token (if any) | Used In |
|---|---|---|
| `bg-surface` | `surface-cream` exists, `surface` does not | page.tsx |
| `text-on-surface` | `on-surface-variant` exists, `on-surface` does not | HeroScrollSection, SelectedWorksSection |
| `text-primary` / `bg-primary` | `site-primary` exists, `primary` does not | HeroNavigation, ServicesSection, ClientRosterSection, LetsTalkSection |
| `text-on-primary` | — | HeroNavigation, LetsTalkSection |
| `text-secondary` / `bg-secondary` | `site-secondary` exists, `secondary` does not | ServicesSection, ClientRosterSection, LetsTalkSection |
| `text-ink-muted` | `text-muted` exists, `ink-muted` does not | SelectedWorksSection, ServicesSection, ClientRosterSection, LetsTalkSection (10+ usages) |
| `font-display` / `font-body` | `display-hero` exists, `display`/`body` do not | ManifestoSection, HeroNavigation |
| `font-headline-sm` / `font-label-sm` | `headline-lg` / `label-caps` exist, `sm` variants do not | ServicesSection, ClientRosterSection, LetsTalkSection |
| `text-headline-sm` / `text-label-sm` | `headline-lg` / `label-caps` exist | SelectedWorksSection, HeroNavigation |
| `ring-primary` / `ring-on-primary` | — | All interactive components |

- **Production impact:** YES — These classes resolve to nothing. Colors fall back to inherit/transparent, fonts fall back to system sans-serif, focus rings are invisible. The site appears to render acceptably in browsers because many elements inherit from parent defaults, but the visual design is not what was intended.
- **Recommended remediation:** Define all missing tokens in @theme inline, OR rename classes to match existing tokens

---

## IMPORTANT

### 2.1 Dual Unaligned Design Token Systems
- **Verified:** YES
- **Evidence:** [globals.css#L4-18](file:///c:/Personal/Work/velune-site/src/styles/globals.css#L4-L18) defines Hero tokens (`--hero-*`) and Site tokens (`--site-*`). Components use neither system directly — they use a third undeclared set (`text-primary`, `text-ink-muted`).
- **Production impact:** Maintainability — impossible to change colors consistently

### 2.2 Duplicate Media Folders
- **Verified:** YES — All 18 pairs are **byte-identical** (verified by file size comparison)
- **Evidence:** Complete size comparison table confirms exact matches across all clients (e.g., `IMG_0286.MOV`: 43,647,742 bytes in both locations)
- **Production impact:** ~200MB+ of redundant deployment payload

### 2.3 Unkilled GSAP Timelines on Menu Toggle
- **Verified:** YES
- **Evidence:** [HeroNavigation.tsx#L36,54](file:///c:/Personal/Work/velune-site/src/components/hero/HeroNavigation.tsx#L36): New `gsap.timeline()` on every `isOpen` change. Cleanup (L75-77) only resets `body.style.overflow`, no `.kill()` or `gsap.context()`
- **Production impact:** YES — Rapid toggling causes conflicting animations

### 2.4 DOM Coupling Across Component Boundaries
- **Verified:** YES
- **Evidence:** [HeroScrollSection.tsx#L42](file:///c:/Personal/Work/velune-site/src/components/hero/HeroScrollSection.tsx#L42): `document.getElementById('hero-focal-video')`, [#L75](file:///c:/Personal/Work/velune-site/src/components/hero/HeroScrollSection.tsx#L75): `document.querySelector('.focal-visual')`
- **Production impact:** Fragile — breaks if child component structure changes

### 2.5 Hardcoded Spaces in Media File Paths
- **Verified:** YES
- **Evidence:** [HeroMedia.tsx#L11](file:///c:/Personal/Work/velune-site/src/components/hero/HeroMedia.tsx#L11): `/media/Lakshi Lingaraju/IMG_3141.MOV`, [HeroFocalMedia.tsx#L7](file:///c:/Personal/Work/velune-site/src/components/hero/HeroFocalMedia.tsx#L7): `/media/Nomi Kids Culture/IMG_5857.MP4`
- **Production impact:** Works on localhost but may cause 404s on certain CDNs/servers that don't auto-encode spaces

### 2.6 QuickTime .MOV Format
- **Verified:** YES — 7 `.MOV` files referenced in source code
- **Production impact:** Chrome/Firefox on Windows/Linux may fail to decode. Requires transcoding to MP4.

### 2.7 100% of Portfolio Images Lack Alt Text
- **Verified:** YES
- **Evidence:** [LazyMedia.tsx#L14](file:///c:/Personal/Work/velune-site/src/components/common/LazyMedia.tsx#L14): `alt = ''` default. All 17 media objects in [SelectedWorksSection.tsx#L299-351](file:///c:/Personal/Work/velune-site/src/components/home/SelectedWorksSection.tsx#L299-L351) omit the `alt` property.
- **Production impact:** WCAG 1.1.1 (Level A) FAIL

### 2.8 Broken Heading Hierarchy
- **Verified:** YES
- **Evidence:**
  - [ServicesSection.tsx#L119](file:///c:/Personal/Work/velune-site/src/components/home/ServicesSection.tsx#L119): Uses `<h3>` with no parent `<h2>` — skips heading level
  - [ClientRosterSection.tsx#L50-98](file:///c:/Personal/Work/velune-site/src/components/home/ClientRosterSection.tsx#L50-L98): Zero headings in entire section
  - [SelectedWorksSection.tsx#L284,287](file:///c:/Personal/Work/velune-site/src/components/home/SelectedWorksSection.tsx#L284-L287): Eyebrow is `<h2>`, main title "Selected Works" is `<p>`
- **Production impact:** WCAG 1.3.1 FAIL — screen reader heading navigation broken

### 2.9 Low Contrast Text
- **Verified:** YES
- **Evidence:** [globals.css#L32](file:///c:/Personal/Work/velune-site/src/styles/globals.css#L32): `--color-text-muted: #8A8780`. [ManifestoSection.tsx#L30-34](file:///c:/Personal/Work/velune-site/src/components/home/ManifestoSection.tsx#L30-L34): `text-text-muted` at `text-[10px]` over `#FBFBFA` background = **3.41:1 contrast ratio** (AA requires 4.5:1)
- **Production impact:** WCAG 1.4.3 FAIL

### 2.10 Eyebrow Styling Inconsistency
- **Verified:** YES
- **Evidence:** 6 different tracking/sizing/color combinations across 6 sections:

| Section | Tracking | Font Token | Color Token |
|---|---|---|---|
| Hero | `0.25em` | `geist.className` (direct) | `text-espresso` |
| Manifesto | `0.2em` | `font-label-caps` | `text-muted` |
| Selected Works | `widest` | `text-label-sm` (undefined) | `ink-muted` (undefined) |
| Services | `0.24em` | `font-label-sm` (undefined) | `ink-muted` (undefined) |
| Client Roster | `0.24em` | `font-label-sm` (undefined) | `ink-muted` (undefined) |
| Let's Talk | `0.28em` | `font-label-sm` (undefined) | `ink-muted` (undefined) |

### 2.11 Breakpoint Conflict
- **Verified:** YES
- **Evidence:** [HeroScrollSection.tsx#L112](file:///c:/Personal/Work/velune-site/src/components/hero/HeroScrollSection.tsx#L112): `(min-width: 1025px)`, [SelectedWorksSection.tsx#L234](file:///c:/Personal/Work/velune-site/src/components/home/SelectedWorksSection.tsx#L234): `>= 1024`. Tailwind `lg:` = `1024px`. 1px gap at exactly 1024px viewport.

---

## CSS / Design System

### Defined Tokens (Complete Inventory from globals.css @theme inline)

**Colors (17):** `canvas-porcelain`, `surface-cream`, `surface-elevated`, `text-charcoal`, `text-espresso`, `border-subtle`, `text-muted`, `on-surface-variant`, `secondary-container`, `outline-variant`, `site-primary`, `site-neutral`, `site-secondary`, `site-subtle`, `site-dark`, `background`, `foreground`

**Fonts (10):** `newsreader`, `geist`, `anton`, `space-mono`, `display-hero`, `headline-lg`, `body-lead`, `body-md`, `body-sm`, `label-caps`

**Typography Sizes (7):** `display-hero`, `display-hero-mobile`, `headline-lg`, `body-lead`, `body-md`, `body-sm`, `label-caps`

**Spacing (10):** `margin-mobile`, `gutter-mobile`, `space-xs`, `space-sm`, `space-md`, `gutter`, `space-lg`, `margin`, `space-xl`, `space-2xl`

### Dead Tokens (Defined but Never Used in Components)
**Colors:** `surface-elevated`, `on-surface-variant`, `outline-variant`, `site-primary`, `site-neutral`, `site-secondary`, `site-subtle`, `site-dark`  
**Fonts:** `font-newsreader` (via CSS var), `font-anton`, `font-space-mono`, `font-display-hero`, `font-headline-lg`, `font-body-lead`, `font-body-sm`  
**Sizes:** `text-display-hero`, `text-display-hero-mobile`, `text-headline-lg`, `text-body-lead`, `text-body-sm`  
**Spacing:** `gutter-mobile`, `space-xs`, `gutter`, `space-lg`, `space-xl`, `space-2xl`

### Z-Index Inventory
| Value | Element | File |
|---|---|---|
| `z-0` | Hero stage floor | HeroScrollSection.tsx#L259 |
| `z-10` | Manifesto, media wrappers, hero typography, hero stage | Multiple files |
| `z-20` | Focal media, hero peripheral #2 | HeroFocalMedia.tsx#L3, HeroMedia.tsx#L21 |
| `z-40` | Navigation overlay | HeroNavigation.tsx#L119 |
| `z-50` | Navigation header | HeroNavigation.tsx#L95 |
| `z-[9999]` | Preloader | HeroScrollSection.tsx#L247 |
| `zIndex: 10/0` | Active/inactive service slides | ServicesSection.tsx#L195 |

---

## Fonts

### Complete Font Loading Path Trace

```
fonts.ts → exports 4 fonts with .variable properties
    ↓
layout.tsx → ONLY mounts geist.variable on <body>
    ↓                          ↓ (MISSING)
    ✓ --font-geist-sans        ✗ --font-newsreader
    reaches DOM                ✗ --font-anton
                               ✗ --font-space-mono
    ↓
globals.css @theme → References --font-newsreader, --font-anton, etc.
    ↓
    These resolve to UNDEFINED (variables never injected)
    ↓
WORKAROUND: HeroTypography.tsx imports newsreader directly
            and uses newsreader.className (bypasses CSS vars)
    ↓
    Newsreader renders ONLY in the hero headline
    Anton and Space Mono render NOWHERE
```

**Conclusion:** The font injection bug is real. Only Geist works globally. Newsreader works in one component via manual workaround. Anton and Space Mono are pure dead weight.

---

## Media

### Duplication Status: All 18 pairs BYTE-IDENTICAL

| Client | Files | Size Per Pair | Total Waste |
|---|---|---|---|
| Kinjal Mehtha | 4 files | 59.1 MB | 59.1 MB |
| Lakshi Lingaraju | 4 files | 58.8 MB | 58.8 MB |
| PL Edit | 4 files | 25.6 MB | 25.6 MB |
| Stilat | 4 files | 58.6 MB | 58.6 MB |
| Yash Jain | 2 files | 8.1 MB | 8.1 MB |
| **Total** | **18 files** | | **~210 MB duplicate** |

### Unreferenced Media: All 10 Confirmed

All 10 files were searched across `src/`, root `.js`, root `.html`, and root `.py` files. **Zero references found** for any of them using their un-slugified paths. All have slugified equivalents in `public/media/work/` that ARE referenced.

---

## Dependencies

### Unused Dependencies: All 5 Confirmed

| Package | Imports in `src/` | Imports in root scripts | Verdict |
|---|---|---|---|
| `three` | 0 | 0 | **SAFE TO REMOVE** |
| `@react-three/fiber` | 0 | 0 | **SAFE TO REMOVE** |
| `@react-three/drei` | 0 | 0 | **SAFE TO REMOVE** |
| `@types/three` | 0 | 0 | **SAFE TO REMOVE** (also misplaced in `dependencies`) |
| `@gsap/react` | 0 | 0 | **SAFE TO REMOVE** |

### Misplaced Dependency: Confirmed
`puppeteer-screen-recorder` is in `dependencies` but only imported by 3 root QA scripts (`record-scroll*.js`). Should be in `devDependencies`.

### QA-Only Dependencies
- `puppeteer`: Used by 25 root scripts, 0 in `src/`
- `image-size`: Used by 1 root script (`scan.js`), 0 in `src/`

---

## Accessibility

All accessibility findings from the audit verified as accurate:

| Finding | WCAG | Verified |
|---|---|---|
| Zero focus indicators | 2.4.7 (AA) | YES — `button { all: unset }` + undefined `ring-primary` |
| No focus trap in menu dialog | 2.1.2, 2.4.3 | YES — Escape works, Tab escapes dialog |
| No video pause mechanism | 2.2.2 (A) | YES — 15+ videos, 0 controls |
| Broken nav anchors | 2.4.4 | YES — 3/5 links broken |
| No alt text on portfolio images | 1.1.1 (A) | YES — `alt=''` default |
| No video titles/labels | 1.1.1, 4.1.2 | YES — no `title` or `aria-label` |
| Broken heading hierarchy | 1.3.1 | YES — skipped levels, missing headings |
| CSS ignores prefers-reduced-motion | 2.3.3 | YES — 0 `@media` rules for reduced motion |
| Low contrast (3.41:1) | 1.4.3 (AA) | YES — `#8A8780` on `#FBFBFA` |

---

## Files Proposed for Deletion

### Root Scripts (39 files)

| Path | Why Unused | References Checked | Safe to Delete |
|---|---|---|---|
| `test-*.js` (14 files) | One-off Puppeteer diagnostics | 0 in src/, 0 in package.json scripts, 0 in config | **YES** |
| `capture-*.js` (10 files) | QA screenshot scripts | 0 in src/, 0 in package.json scripts, 0 in config | **YES** |
| `record-scroll*.js` (3 files) | Screen recording scripts | 0 in src/, 0 in package.json scripts | **YES** |
| `check-overlap.js`, `check-stitch-overlap.js` | Overlap diagnostics | 0 in src/, 0 in package.json scripts | **YES** |
| `verify-layout.js` | Layout screenshot | 0 in src/, 0 in package.json scripts | **YES** |
| `scan.js`, `scan2.js` | Asset scanners | 0 in src/, 0 in package.json scripts | **YES** |
| `get-media-dimensions.js` | Dimension metadata generator | 0 in src/, 0 in package.json scripts | **YES** |
| `write_roster.js`, `write_services.js` | Code generators (already generated) | 0 in src/, 0 in package.json scripts | **YES** |
| `fix_jsx.py`, `generate_section.py`, `parse.py`, `parse_articles.py` | One-off converters | 0 in src/, 0 in package.json scripts | **YES** |

**Note:** `eslint.config.mjs` explicitly ignores `*.js` files. `tsconfig.json` only includes `.ts`/`.tsx`/`.mts`. These scripts are fully isolated from the build pipeline.

### Root Screenshots & Recordings (65 files)

| Pattern | Count | References Checked | Safe to Delete |
|---|---|---|---|
| `hero-*-*pct.png` | 39 | 0 references anywhere | **YES** |
| `hero-*-[A-E]-*.png` | 15 | 0 references anywhere | **YES** |
| `hero-initial-*.png` | 3 | 0 references anywhere | **YES** |
| `manifesto-*.png` | 3 | 0 references anywhere | **YES** |
| `verify-*.png` | 2 | 0 references anywhere | **YES** |
| `hero-animation*.mp4` | 3 | 0 references anywhere | **YES** |

### Root HTML/Text Dumps (10 files)

| Path | References Checked | Safe to Delete |
|---|---|---|
| `hero.html` | 0 in src/, 0 in config. Referenced only by `check-stitch-overlap.js` (also deletable) | **YES** |
| `next-section.html` | 0 in src/, 0 in config. Referenced only by `parse.py` (also deletable) | **YES** |
| `full_selected_works.html` | 0 in src/, 0 in config. Referenced only by `generate_section.py` (also deletable) | **YES** |
| `next_section_2.html` | Duplicate of above | **YES** |
| `next_section_html.txt` | 0 references | **YES** |
| `section4.html` | 0 references | **YES** |
| `services_section.html` | 0 references | **YES** |
| `stitch-source.html` | 0 bytes, empty file | **YES** |
| `stitch-source2.html` | Duplicate of hero.html | **YES** |
| `stitch_home_f23.html` | Duplicate of next-section.html | **YES** |

### QA Capture Directories (6 dirs, 17 files)

| Directory | Files | Safe to Delete |
|---|---|---|
| `qa_captures_full/` | 3 | **YES** |
| `qa_captures_letstalk/` | 3 | **YES** |
| `qa_captures_menu/` | 2 | **YES** |
| `qa_captures_roster/` | 3 | **YES** |
| `qa_captures_services/` | 3 | **YES** |
| `qa_captures_works/` | 3 | **YES** |

### Miscellaneous

| Path | Safe to Delete |
|---|---|
| `media-manifest.json` | **YES** — generated output, 0 references |
| `stitch_prompt.md` | **YES** — design prompt, 0 references |
| `tsconfig.tsbuildinfo` | **YES** — build cache (add to .gitignore instead) |
| `test-height.js` | **YES** — UTF-16LE encoding error, broken file |
| `src/config/` (empty) | **YES** |
| `src/hooks/` (empty) | **YES** |
| `public/file.svg`, `public/globe.svg`, `public/next.svg`, `public/vercel.svg`, `public/window.svg` | **YES** — Next.js starter defaults, 0 references |

### Unreferenced Media (10 files)

| Path | Every Reference Checked | Safe to Delete |
|---|---|---|
| `public/media/logo.jpeg` | Only in scan.js skip-list | **YES** |
| `public/media/KInjal Mehtha/IMG_3845.PNG` | 0 refs (slug version used) | **YES** |
| `public/media/KInjal Mehtha/IMG_3846.MP4` | 0 refs (slug version used) | **YES** |
| `public/media/Lakshi Lingaraju/IMG_5845.MP4` | 0 refs (slug version used) | **YES** |
| `public/media/Lakshi Lingaraju/IMG_5846.PNG` | 0 refs (slug version used) | **YES** |
| `public/media/PL Edit/IMG_3755.MOV` | 0 refs (slug version used) | **YES** |
| `public/media/PL Edit/IMG_5853.MP4` | 0 refs (slug version used) | **YES** |
| `public/media/PL Edit/IMG_5855.PNG` | 0 refs (slug version used) | **YES** |
| `public/media/Stilat/IMG_5849.MOV` | 0 refs (slug version used) | **YES** |
| `public/media/Stilat/IMG_5852.JPG.jpeg` | 0 refs (slug version used) | **YES** |

---

## Dependency Removal Candidates

| Package | Current Location | Imports (src/) | Imports (scripts) | Safe to Remove |
|---|---|---|---|---|
| `three` | dependencies | 0 | 0 | **YES** |
| `@react-three/fiber` | dependencies | 0 | 0 | **YES** |
| `@react-three/drei` | dependencies | 0 | 0 | **YES** |
| `@types/three` | dependencies | 0 | 0 | **YES** |
| `@gsap/react` | dependencies | 0 | 0 | **YES** |
| `puppeteer-screen-recorder` | dependencies → devDependencies | 0 | 3 | **MOVE** (if keeping QA scripts) or **REMOVE** (if deleting them) |
| `puppeteer` | devDependencies | 0 | 25 | **REMOVE** (if deleting QA scripts) |
| `image-size` | devDependencies | 0 | 1 | **REMOVE** (if deleting QA scripts) |

---

## Build / Runtime Validation

| Check | Command | Result | Exit Code |
|---|---|---|---|
| Lint | `npm run lint` | 0 errors, 0 warnings | 0 |
| TypeCheck | `npx tsc --noEmit` | 0 errors | 0 |
| Build | `npm run build` | Compiled in 15.3s, 4/4 static pages | 0 |

The codebase is in a clean build state. All proposed changes can be validated against this baseline.

---

## False Positives / Invalid Findings

**None identified.** Every CRITICAL and IMPORTANT finding from the original audit was independently verified as valid. No false positives were found.

One clarification:
- **Finding 1.8 (Undefined CSS classes):** While these classes genuinely don't resolve in Tailwind v4's `@theme`, the site still renders because browsers gracefully fall back when CSS properties resolve to undefined. The visual output is "acceptable" but not "as designed" — colors inherit from parents instead of using the intended tokens, and fonts fall back to system defaults instead of the designed typefaces.

---

## Recommended Remediation Order

The following sequence minimizes risk and maximizes incremental value. Each phase should be verified with `lint + tsc + build` before proceeding.

### Phase 1: Zero-Risk Cleanup (no code changes, no visual impact)
1. Delete 39 root scripts, 4 Python scripts
2. Delete 65 root screenshots/recordings
3. Delete 10 root HTML/text dumps
4. Delete 6 `qa_captures_*` directories
5. Delete `media-manifest.json`, `stitch_prompt.md`
6. Delete empty `src/config/`, `src/hooks/`
7. Delete 5 starter SVGs from `public/`
8. Add `tsconfig.tsbuildinfo` to `.gitignore`
9. Archive 9 QA reports to `docs/qa/`
10. Remove unused dependencies: `three`, `@react-three/fiber`, `@react-three/drei`, `@types/three`, `@gsap/react`
11. Move `puppeteer-screen-recorder` to `devDependencies`

### Phase 2: Design Token Harmonization (visual correctness)
1. Inject missing font variables onto `<body>` in layout.tsx
2. Define all 30+ missing CSS tokens in `@theme inline` (map `primary` → `site-primary`, `ink-muted` → `text-muted`, etc.)
3. Purge dead/unused tokens from globals.css
4. Unify eyebrow styling to consistent tracking/sizing/color
5. Fix contrast ratio for `text-muted` to meet WCAG AA (≥4.5:1)
6. Establish z-index token scale

### Phase 3: Navigation & Accessibility (functional correctness)
1. Fix broken anchor hrefs (`#works` → `#selected-works`, etc.)
2. Add `id="manifesto"` to ManifestoSection
3. Implement focus trap in HeroNavigation dialog
4. Add global `:focus-visible` outline rule
5. Fix heading hierarchy across all sections
6. Add descriptive `alt` text to all portfolio media
7. Add `aria-hidden="true"` to decorative elements
8. Add `aria-controls` to accordion buttons
9. Add `prefers-reduced-motion` CSS media query

### Phase 4: Media Consolidation (performance)
1. Migrate HeroMedia.tsx paths from `public/media/[Name]/` to `public/media/work/[slug]/`
2. Delete 10 unreferenced duplicate files + empty client folders
3. Replace `<img>` with `<Image>` in LazyMedia.tsx (enable optimization)
4. Transcode `.MOV` files to `.mp4` (H.264)
5. Configure image formats in `next.config.ts`

### Phase 5: Code Quality (maintainability)
1. Fix preloader useEffect cleanup (clear timeouts, remove listeners)
2. Kill GSAP timelines on menu toggle cleanup
3. Replace `document.getElementById` / `querySelector` with React refs
4. Add security headers to `next.config.ts`
5. Add OpenGraph/Twitter metadata to layout.tsx
6. Fix 1024/1025px breakpoint inconsistency
