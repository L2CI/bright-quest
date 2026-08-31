import { mkdir, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';

const root = resolve('beacon-brigade/assets');
await mkdir(root, { recursive: true });
const manifest = [];
for (const [asset, prefix] of [['aerial_grass_rock', 'ground'], ['concrete_floor_worn_001', 'concrete']]) {
const files = await fetch(`https://api.polyhaven.com/files/${asset}`).then(r => {
  if (!r.ok) throw new Error(`Asset manifest ${r.status}`);
  return r.json();
});
for (const [key, name] of [['Diffuse', `${prefix}-colour.jpg`], ['nor_gl', `${prefix}-normal.jpg`]]) {
  const item = files[key]?.['1k']?.jpg;
  if (!item) throw new Error(`Missing ${key}`);
  const response = await fetch(item.url);
  if (!response.ok) throw new Error(`Asset download ${response.status}`);
  const data = Buffer.from(await response.arrayBuffer());
  if (createHash('md5').update(data).digest('hex') !== item.md5) throw new Error(`Checksum ${key}`);
  await writeFile(resolve(root, name), data);
  manifest.push({ file: name, source: item.url, asset: `https://polyhaven.com/a/${asset}`, licence: 'CC0', bytes: data.length, sha256: createHash('sha256').update(data).digest('hex') });
}
}
await writeFile(resolve(root, 'provenance.json'), JSON.stringify({ importedAt: new Date().toISOString(), files: manifest }, null, 2));
console.log(manifest);
