import crypto from 'crypto';

// missing JSDom polyfill
// https://github.com/enzymejs/enzyme/issues/374#issuecomment-371823436
global.HTMLInputElement.prototype.checkValidity = jest.fn(() => true);

// implement crypto behavior in jest
Object.defineProperty(globalThis, 'crypto', {
  value: {
    getRandomValues: length => crypto.getRandomValues(length),
  },
});

/**
 * Change Jest Timeout
 */

jest.setTimeout(60000);
