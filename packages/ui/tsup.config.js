import { readFile, writeFile } from 'fs/promises';
import { resolve } from 'path';
import { defineConfig } from 'tsup';
export default defineConfig({
    entry: ['src/index.ts'],
    format: ['esm', 'cjs'],
    dts: true,
    splitting: true,
    sourcemap: true,
    clean: true,
    treeshake: true,
    external: ['react', 'react-dom', '@oxygenix-ui/core', '@oxygenix-ui/tokens'],
    loader: {
        '.css': 'local-css',
    },
    onSuccess: async () => {
        const files = ['dist/index.mjs', 'dist/index.js'];
        for (const file of files) {
            const filePath = resolve(__dirname, file);
            try {
                const content = await readFile(filePath, 'utf-8');
                if (!content.includes('"use client";')) {
                    await writeFile(filePath, '"use client";\n' + content);
                    console.log(`Prepended "use client" to ${file}`);
                }
            }
            catch (err) {
                console.error(`Failed to modify ${file}:`, err);
            }
        }
    },
});
