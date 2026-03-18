import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'bin/plane-mcp-server.ts'],
  format: ['esm'],
  target: 'node20',
  outDir: 'dist',
  clean: true,
  splitting: true,
  sourcemap: true,
  dts: false,
  banner: ({ format }) => {
    if (format === 'esm') {
      return { js: '' };
    }
    return {};
  },
});
