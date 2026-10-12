# Variant: Connect

**Idea:** "Smart Connections. Smarter Systems." Dark, technical, calm — Bi Tech's services shown
as one living system of connected parts. Reference feel: Vercel / Resend. Brand sky `#31B3ED`
carries every accent; navy `#22338E` is used for depth, glows and the CTA band. The logo's two
motifs recur: the **pulse line** (mission divider, sky accents) and the **signal arcs** (hero
orbits, CTA band).

Preview: `/preview/connect/` and `/preview/connect/ar/`.

## Files

| File | What |
|---|---|
| `Home.astro` | The whole page (header, 9 sections, footer) |
| `HeroNetwork.astro` | Static SVG network: first paint + fallback for touch / reduced motion / no WebGL |
| `ServiceDiagram.astro` | Hub (logo mark) + 6 service nodes, lit by `data-active` |
| `Icon.astro` | Line icons (services, why-us, UI) |
| `connect.css` | All styles, plain CSS, every class `cx-*` (no Tailwind preflight needed) |
| `connect.ts` | Menu, header state, hero tabs, pointer glow/tilt, GSAP, WebGL bootstrap |
| `hero-scene.ts` | Three.js hero (dynamic import) |

Fonts: Space Grotesk (Latin), JetBrains Mono (labels/numbers), IBM Plex Sans Arabic 400/500/600
(Arabic only — the Latin page never downloads it).

## Motion, section by section

| Section | Desktop (fine pointer, motion OK) | Phones / touch | Reduced motion / no JS |
|---|---|---|---|
| Hero | Three.js: a Fibonacci sphere of ~230 connected nodes turning slowly, 42 "data" pulses walking the graph, two dotted orbits with a travelling signal. Pointer tilts the sphere and bends nearby nodes toward it. Fades in over the static SVG. | Static SVG network with CSS dash pulses (no WebGL) | Static SVG, pulses hidden |
| Hero slides 2–4 | Tabbed "signal" card, auto-advances every 6.5 s with progress bar; pauses on hover/focus; pause button; arrow keys/Home/End | same | No auto-rotate (starts paused). No JS: all three slides shown stacked |
| Intro, mission, why, section heads | GSAP reveal (y 26px + fade) via `ScrollTrigger.batch`; only on-screen elements animate, so nav jumps never wait | same | Static |
| Mission divider | Pulse line draws itself with scroll (scrub) | same | Drawn |
| Services | **Pinned story** (CSS `position: sticky` stage, progress from ScrollTrigger): 6 steps, the diagram lights each service node + animated flow line, big title/body/illustration swap, progress bar | Stacked cards (2 columns ≥700px) | ≥1024px: diagram sticky beside the card list; the node of the card in view lights up |
| Clients | Logos (inverted to white) drift in from the reading direction | same | Static |
| Work | Browser-framed screenshots; pointer **3D tilt** + glow that follows the cursor | No tilt | No tilt |
| FAQ | `<details name>` accordion (one open at a time) | same | same |
| Contact | Shared `ContactForm`, dark skin | same | same |

RTL: canvas and SVG network are mirrored with `scaleX(-1)` and pointer x is mirrored to match;
vignette, CTA band, contact glow and progress bars flip; arrows flip; tab arrow keys follow
reading direction; Arabic has no letter-spacing or uppercase and taller line-heights.

## Budgets (measured with esbuild, minified + gzip -9)

| Chunk | When | gzip |
|---|---|---|
| `connect.ts` | always | ~2.8 KB |
| GSAP core + ScrollTrigger | after first paint, skipped under reduced motion | ~46 KB |
| `hero-scene.ts` + three | desktop ≥900px, fine pointer, WebGL, motion OK — on `load` + idle | ~136 KB |

WebGL: DPR capped at 1.5, `powerPreference: 'low-power'`, 4 draw calls, render loop paused when
the hero is off-screen (IntersectionObserver) or the tab is hidden, everything disposed on
`pagehide` and restarted from the back/forward cache.

## Known issues / notes

- In headless Chromium **with the SwiftShader flags** (`qa/shot.mjs`), mobile screenshots of
  translucent cards show horizontal "bands". It's a SwiftShader raster artifact: the same page
  captured without those flags is clean, and `elementsFromPoint` shows nothing overlapping.
- Full-page Playwright captures on mobile emulation stitch badly (duplicated hero). Use viewport
  screenshots at section offsets instead.
- The pinned services stage adds ~3.3 viewport heights of scroll on desktop by design.
