/**
 * The design variants. Each is always reachable for review at /preview/<id>/ (noindex, excluded
 * from the sitemap). The live one is chosen in src/variants/active.ts.
 */
export const VARIANTS = {
  precision: { name: 'Precision', summary: 'Light, editorial, calm. The logo draws itself as a technical figure. No WebGL, no animation library.' },
  connect: { name: 'Connect', summary: 'Dark. A Three.js network of your systems; pinned scroll story.' },
  build: { name: 'Build', summary: 'Code-forward. A product assembles itself from code to tested release.' },
  signal: { name: 'Signal', summary: 'Connect, refined: light and dark themes, plus the best of Precision and Build.' },
} as const;

export type VariantId = keyof typeof VARIANTS;

/** Label only (marks the live one on /preview/). The live import is in src/variants/active.ts — keep the two in step. */
export const ACTIVE_VARIANT: VariantId = 'precision';
