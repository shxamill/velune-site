# VELUNE DESIGN SYSTEM

## 1. HERO DESIGN SYSTEM (Primary: projects/5027520591111435190)

**Visual atmosphere:** Quiet luxury, high-end art direction, cinematic spatial layout. Rooted in restraint, rejects visual clutter in favor of intentional emptiness, architectural framing, and meticulous typographical nuance.
**Density:** Wide margins, calibrated white space.
**Variance/asymmetry:** Layouts intentionally embrace spatial asymmetry: media blocks offset against centered text columns.
**Colour system:** 
- canvas-porcelain (#FBFBFA)
- surface-cream (#F7F6F3)
- surface-elevated (#FFFFFF)
- text-charcoal (#141413)
- text-espresso (#4A4844)
- border-subtle (#EAE8E3)
**Typography & Font families:** 
- **Newsreader** (Editorial serif for titles, hero statements)
- **Geist** (Swiss-rationalist sans-serif for body, captions)
**Type scale:** 
- display-hero: 80px
- headline-lg: 48px
- body-lead: 18px
- body-sm: 13px
- label-caps: 11px
**Letter spacing:** 
- Headlines tightly kerned (-0.025em to -0.015em)
- Labels tracked out (0.08em)
**Line heights:** 
- display-hero: 88px
- body-lead: 28px
**Media dimensions:** 
- Wide horizontal showcases, off-axis placements.
**Media placement:** offset against centered text columns.
**Corner treatment:** Standard 4px to 8px base curvature. Media containers 8px to 12px. Pills/capsules strictly avoided.
**Shadow/elevation treatment:** Diffusion over weight. Ultra-soft ambient shadow casts (0 12px 32px -4px rgba(20,20,19,0.04)). Low-contrast ghost outlines (border-subtle).
**Z-index/layering:** Glass translucency with backdrop blur (blur(16px)) over 85% opacity surfaces.
**Grid/positioning model:** Asymmetric 12-column editorial grid (1.5rem gutters, 4rem margins).
**Responsive behaviour:** Collapses to 6 cols on tablet, 2/4 on mobile.
**Motion intent:** Sequential states (Initial -> Focus -> Expand -> Cinematic -> Exit).

## 2. FULL SITE DESIGN SYSTEM (Primary: projects/1552690337128148933)

**Visual atmosphere:** High-end studio brutalism fused with refined Swiss editorial rigor. Unapologetic contrast, strict grid divisions, monumental scale.
**Colour system:** Strictly monochromatic.
- Primary (#000000)
- Neutral (#FFFFFF)
- Secondary (#737373)
- Subtle Line (#E5E5E5)
- Dark Line (#1A1A1A)
**Typography & Font families:**
- **Anton** (Display & Headlines)
- **Geist** (Editorial & Body)
- **Space Mono** (Metadata, Tags)
**Corner treatment:** Strictly 0px. Pure, sharp, structural.
**Shadow/elevation treatment:** Avoids ambient shadows. Bold structural outlines (1px/2px). Inverse contrast planes. Cinematic framing.

## 3. SHARED TOKENS

- **Geist** font family is shared for body/editorial text across both systems.
- **Asymmetric Grid Logic** (12-col desktop) is present in both, though the exact margin/gutter measurements differ (0px/2rem vs 1.5rem/4rem).
- Both heavily rely on fine hairline borders/frames, though Full Site uses sharper 0px radius #000000/#E5E5E5 lines, while Hero uses rounded 4-8px #EAE8E3 lines.

## 4. PLAYFIGHT REFERENCE (projects/5451761049033542459)
**Scroll choreography:** OBSERVED: Sequential revealing of full-bleed media and highly kinetic scrolling.
**Media transformations:** OBSERVED: 100% edge-to-edge snaps.
**Responsive behaviour:** CONFIRMED: 12-column fluid scaling to 6 (tablet) and 2 (mobile).
**Interaction hierarchy:** OBSERVED: Hover state triggers chromatic inversions.
