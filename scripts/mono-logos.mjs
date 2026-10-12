// One-off asset prep: turn the mixed client logos (some on white, some transparent, some grey)
// into uniform black-on-transparent PNGs, so each variant can tint them with CSS
// (filter: invert(1) for white on dark backgrounds). Usage: node scripts/mono-logos.mjs
import sharp from 'sharp';
import fs from 'node:fs';
const dir = 'src/assets/clients';
const out = `${dir}/mono`;
fs.mkdirSync(out, { recursive: true });
const map = {
  cassandra: 'Cassandra_bw.png', crispy: 'cc_bw.png', sif: 'sif_bw.png',
  maretek: 'maretek_bw.png', mas: 'mas.png', sanko: 'sanko_bw.png',
};
for (const [id, file] of Object.entries(map)) {
  const { data, info } = await sharp(`${dir}/${file}`).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const px = Buffer.alloc(info.width * info.height * 4);
  for (let i = 0, j = 0; i < data.length; i += 4, j += 4) {
    const lum = 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
    // Ink = darkness, stretched so mid-grey logos (Maretek, Sanko) read as solid.
    const ink = Math.min(1, Math.max(0, (235 - lum) / 150));
    px[j + 3] = Math.round(ink * data[i + 3]);
  }
  await sharp(px, { raw: { width: info.width, height: info.height, channels: 4 } })
    .trim().resize({ height: 240, withoutEnlargement: true }).png({ compressionLevel: 9 })
    .toFile(`${out}/${id}.png`);
  console.log(id);
}
