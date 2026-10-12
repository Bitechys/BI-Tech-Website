/**
 * Which design ships at bitechys.com/ and /ar/. Every variant is always reachable for review
 * at /preview/<id>/ (noindex, excluded from the sitemap). Switch the live design by changing
 * ACTIVE_VARIANT and rebuilding.
 */
export const VARIANTS = {
  precision: { name: 'Precision', summary: 'Light, editorial, calm. No WebGL; light GSAP reveals.' },
  connect: { name: 'Connect', summary: 'Dark. A Three.js network of your systems; pinned scroll story.' },
  build: { name: 'Build', summary: 'Code-forward. A product assembles itself from code to tested release.' },
} as const;

export type VariantId = keyof typeof VARIANTS;

export const ACTIVE_VARIANT: VariantId = 'precision';
