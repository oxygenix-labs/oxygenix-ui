import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/index.ts'],
    format: ['esm', 'cjs'],
    dts: false, // Temporarily disabled
    splitting: true,
    sourcemap: true,
    clean: true,
    treeshake: true,
    external: ['react', 'react-dom', 'react-hook-form', '@oxygenix-ui/core', '@oxygenix-ui/tokens'],
    loader: {
        '.css': 'local-css',
    },
});
