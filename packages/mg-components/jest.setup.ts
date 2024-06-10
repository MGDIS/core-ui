import crypto from 'crypto';

// missing JSDom polyfill
// https://github.com/enzymejs/enzyme/issues/374#issuecomment-371823436
const checkValidity = jest.fn(() => true);
global.HTMLInputElement.prototype.checkValidity = checkValidity;
// textarea and select mock use the prototype of HTMLElement in JSDOM
Object.getPrototypeOf(global.HTMLElement).prototype.checkValidity = checkValidity;
// dialog
Object.getPrototypeOf(global.HTMLElement).prototype.show = jest.fn();
Object.getPrototypeOf(global.HTMLElement).prototype.showModal = jest.fn();
Object.getPrototypeOf(global.HTMLElement).prototype.close = jest.fn();
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
