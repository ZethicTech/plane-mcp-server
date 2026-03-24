import { defineConfig } from 'tsup';
import { readFileSync } from 'fs';

const pkg = JSON.parse(readFileSync('package.json', 'utf-8'));

export default defineConfig({
  entry: ['src/index.ts', 'bin/plane-mcp-server.ts'],
  format: ['esm'],
  target: 'node20',
  outDir: 'dist',
  clean: true,
  splitting: true,
  sourcemap: true,
  dts: { entry: ['src/index.ts'] },
  define: {
    'process.env.PACKAGE_VERSION': JSON.stringify(pkg.version),
  },
});
