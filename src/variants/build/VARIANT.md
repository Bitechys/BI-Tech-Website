# Variant: Build

**Concept.** Code-forward: a product getting built in front of you, from code to UI to API to a
tested release. Off-white "canvas" sections with dark "build room" sections (services, contact,
CTA panel). Brand navy `#22338E` + sky `#31B3ED`. The logo's pulse line comes back as a
heartbeat/monitor for QA. No WebGL: everything is GSAP + CSS + inline SVG (it looked sharper
than a 3D device and costs a fraction of the bytes).

Preview: `/preview/build/` and `/preview/build/ar/`.

## Files

| File | Role |
|---|---|
| `Home.astro` | Page: imports fonts + CSS, intro, about (README card), why, work, clients, CTA, FAQ, contact |
| `components/Header.astro` | Fixed header (goes dark over dark sections) + full-screen mobile menu dialog (sibling of `<header>` because `backdrop-filter` would trap `position: fixed`) |
| `components/Hero.astro` | h1 = slide 1; decorative editor → browser + phone build (aria-hidden) |
| `components/Stages.astro` | `#services` as 4 stages; slides 2–4 are the stage headlines |
| `components/Footer.astro` | Offices, email/phone, © year + legal name + registration |
| `strings.ts` | Stage names and mock-UI labels (EN/AR) not in the shared i18n |
| `build.css` | Plain CSS scoped to `body.v-build` (no Tailwind) |
| `scripts/main.ts` | All behaviour |

## Motion, section by section

- **Head script** (inline in `<head>`): adds `html.bt-motion` unless the user prefers reduced motion. If the
  module hasn't loaded after 4 s, it removes the class, so the page shows its final state.
- **Hero**: copy rises in. The code types itself: one counter per line drives a `steps()` clip and the caret
  together, so they can't drift apart. "compiling…" then "compiled". Browser and phone fade in as wireframes
  (dashed outlines), then fill in block by block as a CSS transition with staggered delays. The chart line
  draws itself, then a "build passing" chip appears with a heartbeat. The ▶ button replays the build.
  Desktop pointers get CSS `translate` parallax on the layers (separate from GSAP transforms). The whole
  visual drifts up on scroll (scrub).
- **Intro**: the title's words light up as you scroll (scrub). A screen reader gets the plain sentence
  through an `sr-only` copy.
- **About / Why / Clients / FAQ**: `[data-reveal]` and `[data-stagger]` rise-ins (once).
- **Services**: on ≥ 1024 × 680 with motion, the section pins for 3 viewport heights, snaps to 4 stages,
  fills the progress rail (RTL-aware) and ticks off completed stages. Each stage's visual plays its own CSS
  animation when it becomes active:
  - Design: a cursor selects a button.
  - Build: the web and phone UIs assemble.
  - Connect: API data flows and a request log.
  - Test: 5 checks tick, the heartbeat monitor runs, "Ready to ship".

  Inactive copies are hidden only by opacity, so screen readers still read all four. Mobile, reduced
  motion and no-JS get stacked cards, each with its visual in its final state.
- **Work**: each card rises, its address bar shows a loading bar, then the screenshot "renders" top to bottom.
- **CTA**: `$ bitech init --your-business` types itself; the heartbeat runs along the panel.

## Budgets (measured)

- JS: `scripts/main.ts` bundled with gsap + ScrollTrigger is **123 KB min / 47.9 KB gzip**. The shared
  ContactForm script is extra, about 1 KB.
- Fonts: Sora variable + JetBrains Mono variable (latin subsets via unicode-range) + IBM Plex Sans Arabic
  400/500/600/700 (Arabic subset only downloads on `/ar/`).
- No WebGL, no video. Work screenshots are `<Picture>` avif/webp at 480/760/1100 w, lazy.

## Fallbacks

- **No JS**: everything visible in its final state (the hero is fully built; stages are stacked).
- **`prefers-reduced-motion`**: same as no JS, plus no pin. CSS loops (spinner, ping, heartbeat, data flow)
  are cut by the shared reduced-motion rule in `styles/base.css`.
- **RTL**: the layout mirrors through grid and logical properties. Physical left/right on the absolutely
  positioned mockups are flipped with `[dir='rtl']`. The code editor, URLs, emails, phones and the API log
  stay LTR. Arabic gets no uppercase or letter-spacing, and kickers drop the `//` prefix.

## Known issues / for the team

- `src/assets/clients/mono/sif.png` has a stray speck to the right of the logo (from `scripts/mono-logos.mjs`).
- The SIF screenshot carries an `imagesbazaar` stock watermark (already flagged).
- Mock-UI strings (`build passing`, `compiled · ready to ship`, `rows synced`) stay English on `/ar/` on
  purpose: they're terminal and code output. Stage names and test-runner labels are translated.
