// Regenerates the static brand files in public/ from src/assets/brand/{lockup,mark}.svg:
// favicon.svg, apple-touch-icon.png, logo.png (schema.org), og.png and og-ar.png (1200x630).
// Usage: node scripts/build-brand-assets.mjs   (sharp ships with Astro)
import sharp from 'sharp';
import fs from 'node:fs';

const lockup = fs.readFileSync('src/assets/brand/lockup.svg', 'utf8');
const mark = fs.readFileSync('src/assets/brand/mark.svg', 'utf8');
const NAVY = '#22338E';
const SKY = '#31B3ED';

// Favicon: the mark alone, squared up.
const markInner = mark.replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '');
fs.writeFileSync(
  'public/favicon.svg',
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-60 -367 1595 1595">${markInner}</svg>`,
);

await sharp(Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="-200 -500 1875 1875"><rect x="-200" y="-500" width="1875" height="1875" fill="#fff"/>${markInner}</svg>`))
  .resize(180, 180)
  .png()
  .toFile('public/apple-touch-icon.png');

await sharp(Buffer.from(lockup)).resize({ width: 512 }).png().toFile('public/logo.png');

// Open Graph cards.
const logoPng = await sharp(Buffer.from(lockup)).resize({ width: 620 }).png().toBuffer();
async function og(file, tagline) {
  const base = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
    <rect width="1200" height="630" fill="#ffffff"/>
    <rect y="600" width="1200" height="30" fill="${NAVY}"/>
    <rect y="600" width="360" height="30" fill="${SKY}"/>
    <g stroke="#E6EAF5" stroke-width="1">${Array.from({ length: 20 }, (_, i) => `<line x1="${i * 64}" y1="0" x2="${i * 64}" y2="600"/>`).join('')}</g>
    <text x="90" y="500" font-family="Segoe UI, Arial, sans-serif" font-size="40" font-weight="600" fill="${NAVY}">${tagline}</text>
  </svg>`;
  await sharp(Buffer.from(base))
    .composite([{ input: logoPng, left: 90, top: 110 }])
    .png()
    .toFile(file);
}
await og('public/og.png', 'Where Business Meets Software Precision');
await og('public/og-ar.png', 'حيث تلتقي الأعمال بدقّة البرمجيات');
console.log('brand assets written to public/');
