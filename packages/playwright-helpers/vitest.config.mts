import { coverageConfigDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      provider: 'istanbul',
      reporter: ['html', 'lcov', 'cobertura', 'text'],
      include: ['src'],
      exclude: [...coverageConfigDefaults.exclude, 'src/config'],
    },
    reporters: ['default', 'junit', 'json'],
    outputFile: {
      junit: './coverage/junit.xml',
      json: './coverage/coverage-final.json',
    },
  },
});