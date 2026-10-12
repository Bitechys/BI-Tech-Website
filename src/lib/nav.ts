import type { Dict } from '../i18n/en';

/** In-page sections every variant renders, in this order, with these ids (the header links to them). */
export const SECTION_IDS = ['about', 'services', 'work', 'clients', 'faq', 'contact'] as const;
export type SectionId = (typeof SECTION_IDS)[number];

export function navItems(t: Dict) {
  return SECTION_IDS.map((id) => ({ id, href: `#${id}`, label: t.nav[id] }));
}
