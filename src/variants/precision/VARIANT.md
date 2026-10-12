# Precision

Light, editorial, calm — the brand line "Where Business Meets Software Precision" made visible
with hairline drafting grids, numbered items and exact alignment. The safe default: fastest of
the three, nothing that can go wrong on an old phone.

## Sections

| Section | Content | Motion |
|---|---|---|
| Header | Logo, 6 anchors, language switch, CTA; full-screen menu < 1024px | Background blurs in after 8px of scroll; current section underlined |
| Hero `#top` | h1 = brand line (Business in sky, Software Precision in navy), lede = "what we do" body, 2 CTAs | The logo mark draws itself as a technical figure: pulse wipes in, arcs radiate from the node, guides and leader labels (WEB / MOBILE / API · ETL / QA) follow; two soft pings repeat |
| Promise rail | The 4 slides of the old hero slider, all visible | Highlight + progress bar cycles every 6s; pauses on hover, pause button (WCAG 2.2.2) |
| `#about` | "What we do" statement + Mission & Vision | Reveal on scroll |
| Why | 4 reasons in a hairline 2×2 grid | Reveal, staggered |
| `#services` | 6 cards (the old 4 + ETL & Data, QA) with the old illustrations | Card lift on hover (pointer only) |
| `#work` | 4 client sites in browser frames | Frame lifts, screenshot zooms 3% on hover |
| `#clients` | 6 logos as CSS masks (grey → navy on hover) | — |
| CTA band | "Want to digitalize your business?" | — |
| `#faq` | 8 questions, `<details name="faq">` (one open at a time in modern browsers) | Native |
| `#contact` | Pillars, direct email/phone, shared Web3Forms form | — |

## Budget

- **No WebGL, no animation library.** Drawing = CSS transitions on SVG clip paths and stroke
  dash offsets; reveals = one IntersectionObserver. Page script ≈ 3 KB gz.
- Fonts: Plus Jakarta Sans variable (Latin, ~30 KB woff2), IBM Plex Sans Arabic 400–700
  (Arabic subset, only downloaded on /ar/ thanks to unicode-range).
- Images: AVIF/WebP via astro:assets, lazy below the fold.

## Fallbacks

- No JS: everything visible, final drawing state, form posts directly to Web3Forms.
- `prefers-reduced-motion`: drawing shown complete, no pings, rail does not cycle (button hidden).
- RTL: layout mirrors through logical properties; the logo itself is never mirrored.
