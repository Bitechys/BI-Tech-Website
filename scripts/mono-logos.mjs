// One-off asset prep: turn the mixed client logos (some on white, some transparent, some grey)
// into uniform black-on-transparent PNGs, so each variant can tint them with CSS
// (filter: invert(1) for white on dark backgrounds). Usage: node scripts/mono-logos.mjs
import sharp from 'sharp';
import fs from 'node:fs';
const dir = 'scripts/source-logos';
const out = 'src/assets/clients/mono';
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
  // Drop specks: keep the widest run of inked columns (gaps wider than 6% split runs).
  const W = info.width, H = info.height, gapMax = Math.round(W * 0.06);
  const inked = Array.from({ length: W }, (_, x) => {
    let a = 0;
    for (let y = 0; y < H; y++) a += px[(y * W + x) * 4 + 3];
    return a > 255 * 2;
  });
  const runs = [];
  let start = -1, last = -1;
  for (let x = 0; x < W; x++) {
    if (!inked[x]) continue;
    if (start < 0) start = x;
    else if (x - last > gapMax) { runs.push([start, last]); start = x; }
    last = x;
  }
  if (start >= 0) runs.push([start, last]);
  const [x0, x1] = runs.sort((a, b) => b[1] - b[0] - (a[1] - a[0]))[0];
  // sharp trims before extracting within one pipeline, so extract into a buffer first.
  const kept = await sharp(px, { raw: { width: W, height: H, channels: 4 } })
    .extract({ left: x0, top: 0, width: x1 - x0 + 1, height: H })
    .png()
    .toBuffer();
  await sharp(kept)
    .trim().resize({ height: 240, withoutEnlargement: true }).png({ compressionLevel: 9 })
    .toFile(`${out}/${id}.png`);
  console.log(id);
}
