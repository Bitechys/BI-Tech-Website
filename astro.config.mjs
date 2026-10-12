// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Static build only: `npm run build` → dist/, uploaded as-is to Hostinger public_html.
export default defineConfig({
  site: 'https://bitechys.com',
  trailingSlash: 'always',
  build: { format: 'directory' },
  output: 'static',
  i18n: {
    locales: ['en', 'ar'],
    defaultLocale: 'en',
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      // Variant previews are for the team, never for search engines.
      filter: (page) => !page.includes('/preview/'),
      i18n: { defaultLocale: 'en', locales: { en: 'en', ar: 'ar' } },
    }),
  ],
  vite: { plugins: [tailwindcss()] },
  server: { port: 4370 },
  devToolbar: { enabled: false },
});
