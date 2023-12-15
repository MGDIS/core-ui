import { coverageConfigDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      reporter: ['text', 'html', 'lcov'],
      include: ['src/**'],
      exclude: [...coverageConfigDefaults.exclude, 'src/config'],
    },
    reporters: ['default', 'junit'],
    outputFile: './coverage/junit.xml',
  },
});
