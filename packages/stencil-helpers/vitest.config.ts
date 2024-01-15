import { coverageConfigDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    coverage: {
      provider: 'istanbul',
      reporter: ['html', 'lcov', 'cobertura'],
      include: ['src'],
      exclude: [...coverageConfigDefaults.exclude, 'src/**/*.conf.ts'],
    },
    reporters: ['default', 'junit', 'json'],
    outputFile: {
      junit: './coverage/junit.xml',
      json: './coverage/coverage-final.json',
    },
  },
});
