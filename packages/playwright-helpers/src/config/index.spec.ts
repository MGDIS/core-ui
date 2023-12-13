import { beforeEach, describe, expect, test, vi } from 'vitest';

describe('playwrightBaseConfig', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  test.each([false, true])('process.env.CI %s', async CI => {
    if (CI) import.meta.env.CI = CI;
    const playwrightBaseConfig = await import('.');
    expect(playwrightBaseConfig).toMatchSnapshot();
  });
});
