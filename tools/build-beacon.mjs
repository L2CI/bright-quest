import { build } from 'esbuild';
import { resolve } from 'node:path';
const nodePaths = process.env.BQ_NODE_MODULES ? [process.env.BQ_NODE_MODULES] : [];
await build({ absWorkingDir: resolve('.'), entryPoints: [resolve('beacon-brigade/src/app.ts')], outfile: resolve('beacon-brigade/game.js'), bundle: true,
  minify: true, format: 'esm', target: ['es2022'], nodePaths, tsconfigRaw: {}, legalComments: 'eof', sourcemap: false });
console.log('Built Beacon Brigade');
