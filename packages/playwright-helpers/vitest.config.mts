import vitestConfig from '@core-ui/vitest-config';
import { defineConfig, mergeConfig } from 'vitest/config';

export default mergeConfig(
  vitestConfig,
  defineConfig({
    test: {
      coverage: {
        exclude: ['src/config'],
      },
    },
  }),
);
