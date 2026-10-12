import Precision from './precision/Home.astro';
import Connect from './connect/Home.astro';
import Build from './build/Home.astro';
import type { VariantId } from '../config';

/**
 * Contract for a variant: `src/variants/<id>/Home.astro` renders the complete page (it wraps
 * itself in layouts/Base.astro) and takes these props.
 */
export interface VariantProps {
  lang: 'en' | 'ar';
  /** '' on the live site, '/preview/<id>' on previews — prefix for the language switch link. */
  base: string;
  noindex?: boolean;
}

export const variantComponents: Record<VariantId, (props: VariantProps) => unknown> = {
  precision: Precision,
  connect: Connect,
  build: Build,
};
