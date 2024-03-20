import crypto from 'crypto';

// missing JSDom polyfill
// https://github.com/enzymejs/enzyme/issues/374#issuecomment-371823436
const checkValidity = jest.fn(() => true);
global.HTMLInputElement.prototype.checkValidity = checkValidity;
// textarea and select mock use the prototype of HTMLElement in JSDOM
Object.getPrototypeOf(global.HTMLElement).prototype.checkValidity = checkValidity;

// implement crypto behavior in jest
Object.defineProperty(globalThis, 'crypto', {
  value: {
    getRandomValues: length => crypto.getRandomValues(length),
  },
});

/**
 * Change Jest Timeout
 */

jest.setTimeout(6000);
