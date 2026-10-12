/**
 * Contract for a variant: `src/variants/<id>/Home.astro` renders the complete page (it wraps
 * itself in layouts/Base.astro) and takes these props.
 *
 * Every route imports exactly ONE variant: Astro bundles the CSS of every component a page
 * imports (rendered or not), so a shared lookup map would leak all variants' styles everywhere.
 */
export interface VariantProps {
  lang: 'en' | 'ar';
  /** '' on the live site, '/preview/<id>' on previews — prefix for the language switch link. */
  base: string;
  noindex?: boolean;
}
