import { build } from 'esbuild';
import { resolve } from 'node:path';
import { writeFile } from 'node:fs/promises';
const result = await build({ absWorkingDir: resolve('.'), entryPoints: [resolve('sparkbound/src/app.ts')], outfile: resolve('sparkbound/game.js'), write: false, bundle: true, minify: true, format: 'esm', target: ['es2022'], nodePaths: process.env.BQ_NODE_MODULES ? [process.env.BQ_NODE_MODULES] : [], tsconfigRaw: {}, legalComments: 'eof', sourcemap: false });
// Normalise trailing spaces in bundled shader templates without changing GLSL.
for (const file of result.outputFiles) await writeFile(file.path, file.text.replace(/[\t ]+$/gm, ''));
console.log('Built Sparkbound');
