import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    coverage: {
      provider: 'v8',
      reportsDirectory: './coverage',
      exclude: [
        '*.mjs',
        '*.config.{js,ts}',
        '**/src/config/**',
        '**/src/types/**',
      ],
    },
    exclude: ['**/node_modules/**', '**/dist/**', '**/coverage/**'],
  },
});
