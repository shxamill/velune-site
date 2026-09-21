# Selected Works — Editorial Redesign

## Goal
Redesign the "Selected Works" section in the main Velune homepage screen to be a MEDIA-DENSE, PORTRAIT-NATIVE, ASYMMETRIC CREATIVE STUDIO GALLERY.
Do NOT modify the Hero or the Manifesto section. Only modify the Portfolio Directory section.

## Asset Requirements
We need to use up to 3-5 assets per client to create dense, visually rich compositions.
The placeholder assets should be mapped to represent vertical 9:16 portrait assets.
**DO NOT USE LANDSCAPE PLACEHOLDERS.**
Use absolute positioning or flex layouts with staggering to create an overlapping or offset grid look for each client, rather than just two simple columns.

## Client 01: Kinjal Mehtha
**Theme**: 4 assets.
**Composition**: One dominant portrait (e.g. 70vh tall) anchoring the left side. To the right, a vertical stack or staggered arrangement of three smaller portraits (e.g., 20vh, 30vh, 25vh) overlapping or offset to fill the space cleanly.

## Client 02: Lakshi Lingaraju
**Theme**: 4 assets.
**Composition**: A central dominant portrait (e.g. 60vh tall). Flanked on the left by a medium portrait (40vh tall) and on the right by two smaller portraits stacked with a generous gap.

## Client 03: Yash Jain
**Theme**: 2 assets.
**Composition**: A highly cinematic asymmetrical spread. A large portrait (70vh tall) pushed to the right, with a smaller portrait (45vh tall) pushed to the far left, creating a massive diagonal tension across the viewport.

## Client 04: Stilat
**Theme**: 4 assets.
**Composition**: Dense fashion editorial grid. Four varying-sized portraits staggered across the entire width of the page. No two images share the exact same top or bottom baseline. (e.g. 50vh, 35vh, 60vh, 40vh).

## Client 05: PL Edits
**Theme**: 4 assets.
**Composition**: Asymmetric collage. One giant anchor (65vh tall), with 3 smaller supporting pieces clustered near the bottom edge of the anchor and offset to the sides.

## Styling Rules
- Maintain the text headers exactly as they are (Client name, 01 / CATEGORY, SERVICES).
- Use `width: auto` and `height: auto` for all images, but constrain them with `max-height` (e.g. `max-h-[70vh]`).
- Do NOT use `object-cover`. Assume all assets are 9:16 ratio.
- Keep the premium white space (`bg-background`).
- Avoid standard symmetrical masonry. Emphasize staggering, varied sizing, and editorial rhythm.
