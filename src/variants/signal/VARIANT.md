# Variant: Signal

**Idea:** Connect, refined. The same living system of connected parts (Three.js node network,
pinned services diagram, tilting work cards), now in **light and dark**, with the strongest
ideas from the other two variants folded in.

Preview: `/preview/signal/` and `/preview/signal/ar/`.

## What came from where

| From | What | Why |
|---|---|---|
| Connect | Everything structural: hero network, signal tabs, pinned services story, work tilt, FAQ, contact | The variant the team preferred |
| Precision | Client logos as CSS masks (grey → navy/sky on hover) | One file works in both themes; Connect's `invert()` only worked on dark |
| Precision | Nav indicator: one bar slides under the section in view | Clearer than Connect's pill highlight |
| Build | Intro sentence lights up word by word as it scrolls (scrub) | Gives the statement weight without a new visual |
| Build | Work cards: address-bar loading bar, then the screenshot renders top to bottom | Fits the "browser frame" already there |
| Build | CTA terminal: `$ bitech init --your-business` types itself | A software company's voice; stays English on `/ar/` on purpose |
| Build | 4 s safety net: if the page script never runs, `html.sg-motion` is dropped and everything shows | Hidden-until-played states can never get stuck |

Left out on purpose: Precision's self-drawing logo figure and Build's code-editor hero. Both
compete with the 3D hero.

## Theme

- **First visit:** follows the system setting (`prefers-color-scheme`), and keeps following it live
  until the visitor picks one. **After a choice:** saved in `localStorage` (`bt-theme`).
- **No flash:** an inline script in `<head>` sets `html[data-theme]`, `color-scheme` and the
  `theme-color` meta before first paint. Without JS the CSS media query decides and the toggle is hidden.
- **Tokens:** every colour that differs is a custom property on `.v-signal`. The light values are
  written twice in `signal.css` (system media query + explicit `[data-theme='light']`); keep the two
  blocks in step.
- **Toggle:** the logo's node with four signal arcs. Light = arcs lit like sun rays; dark = the node
  folds into a crescent. Its `aria-label` names the action ("Switch to light theme").
- **Pull-cord:** the node hangs from the top edge on a signal line. Drag it down (rubber-banded,
  max 34 px) and let go past 14 px: it springs back, a pulse runs down the cord, and the theme
  flips as the pulse reaches the node. Released early, it just springs back. Click, tap, Enter
  and Space give the cord a short tug of their own. `--pull` is a registered custom property so
  the Web Animations spring can interpolate it. First visit only (`bt-pull-hint` in
  `localStorage`, skipped once a theme is saved), the cord sways once after 2.2 s.
- **Switch:** the new theme spreads in a circle from the toggle (View Transitions API). Browsers
  without it, and reduced motion, switch instantly.
- **3D hero:** recolours live via a `bt:theme` event. Dark = additive glow on near-black; light =
  navy ink with normal blending, depth carried by alpha. On each switch a ripple of light runs
  out through the network's lines from the centre (about 1 s).

## Files

| File | What |
|---|---|
| `Home.astro` | The whole page + the head theme script |
| `HeroNetwork.astro` | Static SVG network (first paint, touch, reduced motion, no WebGL) |
| `ServiceDiagram.astro` | Hub + 6 service nodes |
| `Icon.astro` | Line icons |
| `signal.css` | All styles, every class `sg-*`, tokens for both themes |
| `signal.ts` | Theme + pull-cord, header + indicator, menu, hero tabs, pointer effects, on-view classes, GSAP |
| `hero-scene.ts` | Three.js hero (dynamic import), both looks |
| `strings.ts` | Toggle labels (EN/AR) and the CTA command |

Budgets are Connect's (see `../connect/VARIANT.md`) plus about 1 KB of script for the theme and
on-view features. No new libraries.

## Fallbacks

- **No JS:** everything visible; theme from the system; no toggle.
- **Reduced motion:** no WebGL, no scroll story, words/screenshots/terminal shown complete, instant theme switch; the cord does not drag, sway or pulse (click only).
- **RTL:** inherited from Connect (mirrored network, flipped bars and glows); the terminal and URLs stay LTR.
