const { coverageConfigDefaults, defineConfig } = require('vitest/config'); // eslint-disable-line @typescript-eslint/no-var-requires

module.exports = defineConfig({
  test: {
    environment: 'jsdom',
    coverage: {
      provider: 'istanbul',
      reporter: ['html', 'lcov', 'cobertura', 'text'],
      include: ['src'],
      exclude: [...coverageConfigDefaults.exclude, 'src/**/*.conf.ts'],
      thresholds: {
        lines: 100,
        functions: 100,
        branches: 100,
        statements: 100,
      },
    },
    reporters: ['default', 'junit', 'json'],
    outputFile: {
      junit: './coverage/junit.xml',
      json: './coverage/coverage-final.json',
    },
  },
});
