# Open questions for the Bi Tech team

Things the rebuild could not decide on its own. Each has a safe placeholder in place.

| # | Question | Now on the site | Where to change |
|---|---|---|---|
| 1 | One-line description of each project (the old site had `lorem ipsum`) | Neutral lines written from the screenshots: Cassandra = Bollywood fashion store (sale + rental), Crispy Chicken = brand/menu/franchise site, SIF = corporate site (est. 2014), Big Blue = fulfilment platform marketing site. Please confirm what Bi Tech actually built for each. | `work.items` in `src/i18n/en.ts` + `ar.ts` |
| 2 | Chennai and Dubai addresses (old footer said `[Correspondence address]`) | City and country only | `footer.offices` in both i18n files |
| 3 | Social media links (old icons linked nowhere) | Hidden | `socialLinks` in `src/lib/site.ts` |
| 4 | **Arabic review** by a native speaker | Draft MSA translation | `src/i18n/ar.ts` |
| 5 | Malay version for the Malaysia HQ? | Not built | — |
| 6 | Form "What do you need?" list: keep *Digital Marketing* and *POS Solutions*? They are not in the services section | Kept, plus ETL, QA and "Something else" | `contact.form.services` |
| 7 | Two Web3Forms keys existed (`9f90…` on the home form, `fae2…` in an unused service). The home one is used | `9f90131d-…` | `WEB3FORMS_KEY` in `src/lib/site.ts` |
| 8 | The SIF screenshot shows an **imagesbazaar** stock watermark (it's on SIF's own site) | Shown as is | Replace `src/assets/work/port-3.jpg` with a clean capture |
| 9 | Client names were read from the logo files: Maretek Singapore, MAS Jewellery, Sanko — correct? | As listed | `clients` in `src/lib/site.ts` (alt text) |
| 10 | Services 5–6 (ETL & Data Tools, Software Testing & QA) are new cards; their text reuses the old hero/FAQ wording | Shown | `services.items` |
| 11 | Bare domain or `www.`? | `https://bitechys.com` (www → bare) | `public/.htaccess`, `astro.config.mjs` `site` |
| 12 | Response-time promise in the form success message ("within one business day") | Shown | `contact.form.success` |
