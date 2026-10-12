# Bi Tech Solutions — bitechys.com

One-page company site in **English (`/`) and Arabic (`/ar/`, right-to-left)**, built with
[Astro](https://astro.build) as plain static files for **Hostinger** shared hosting.

The previous Angular 14 site (hash routes, restaurant-template leftovers) is preserved on the
`archive/angular-ssr-wip` branch.

## Commands

```bash
npm install
npm run dev       # http://localhost:4370 — only one dev server per project (Astro 7)
npm run build     # → dist/
npm run preview   # serve dist/ locally
```

Node 20+ (tested on 24).

## Three designs, one content source

| Design | Preview | Character |
|---|---|---|
| Precision | `/preview/precision/` | Light, editorial; the logo draws itself. No WebGL. |
| Connect | `/preview/connect/` | Dark; Three.js network of systems, pinned scroll story. |
| Build | `/preview/build/` | Code-forward; a product assembles from code to tested release. |

`/preview/` lists them (noindex, blocked in robots.txt, left out of the sitemap).
Each has a `VARIANT.md` in `src/variants/<id>/`.

**Choosing the live design:** edit the single import in `src/variants/active.ts`
(and `ACTIVE_VARIANT` in `src/config.ts`, which only labels the picker), then rebuild.
Once the team has decided, the other two folders and their `src/pages/preview/<id>/` routes
can be deleted.

## Where things live

```
src/i18n/en.ts, ar.ts        all copy (Arabic is a draft — see NOTES.md)
src/lib/site.ts              facts: email, phone, Web3Forms key, clients, work, images
src/layouts/Base.astro       <head>: SEO, hreflang, Open Graph, JSON-LD, old #/ link redirect
src/components/shared/       Logo (inline SVG, animatable), ContactForm (Web3Forms)
src/variants/<id>/           one folder per design
src/assets/                  brand paths, client logos (mono/), work screenshots, service art
public/                      .htaccess, robots.txt, favicons, og.png / og-ar.png
scripts/                     one-off asset generators (logos, OG images)
```

## Contact form

Posts to [Web3Forms](https://web3forms.com) (same account as the old site), so Hostinger needs
no backend. Submissions arrive with name, email, phone, **service** and message, plus the page
language. In the Web3Forms dashboard, restrict the access key to `bitechys.com`.

## Deploying to Hostinger

1. `npm run build`
2. hPanel → **File Manager** → `public_html/` → delete the old site's files
   (keep anything that isn't the website, e.g. `.well-known/`).
3. Upload the **contents** of `dist/` (not the folder itself), including the hidden `.htaccess`.
4. Check `https://bitechys.com/`, `/ar/`, a missing page (bilingual 404) and
   `https://bitechys.com/#/contactus` (should land on the contact section).
5. Google Search Console: submit `https://bitechys.com/sitemap-index.xml`.

`.htaccess` forces HTTPS on the bare domain (switch to `www.` there if preferred), redirects the
old template paths to `/`, sets security headers and long-cache for `/_astro/`.

## Regenerating brand assets

```bash
node scripts/mono-logos.mjs          # client logos → src/assets/clients/mono/*.png
node scripts/build-brand-assets.mjs  # favicon.svg, apple-touch-icon, logo.png, og.png, og-ar.png
```
