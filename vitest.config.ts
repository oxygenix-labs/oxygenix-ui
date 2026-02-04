/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
    plugins: [react()],
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: ['./setupTests.ts'],
        include: ['packages/**/*.{test,spec}.{ts,tsx}'],
        alias: {
            '@oxygenix-ui/core': resolve(__dirname, './packages/core/src'),
            '@oxygenix-ui/ui': resolve(__dirname, './packages/ui/src'),
            '@oxygenix-ui/forms': resolve(__dirname, './packages/forms/src'),
            '@oxygenix-ui/data': resolve(__dirname, './packages/data/src'),
            '@oxygenix-ui/layout': resolve(__dirname, './packages/layout/src'),
            '@oxygenix-ui/tokens': resolve(__dirname, './packages/tokens/src'),
        },
    },
});
