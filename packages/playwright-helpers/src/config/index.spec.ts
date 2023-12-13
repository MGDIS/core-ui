import { afterEach, describe, expect, test, vi } from 'vitest';

describe('playwrightBaseConfig', () => {
  afterEach(() => {
    vi.resetModules();
    vi.unstubAllEnvs();
  });

  test.each([true, false])('process.env.CI %s', async CI => {
    if (CI) vi.stubEnv('CI', 'blu');
    const playwrightBaseConfig = await import('.');
    expect(playwrightBaseConfig).toMatchSnapshot();
  });
});
