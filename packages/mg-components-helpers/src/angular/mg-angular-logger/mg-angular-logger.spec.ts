import { describe, expect, test, vi } from 'vitest';
import { setMgAngularLogger } from './mg-angular-logger';

const mgError = new Error('<mg-error');
const standardError = new Error('my error');

describe('mg-angular-logger', () => {
  test('Should hide error when error message start with "<mg-"', () => {
    const spy = vi.spyOn(console, 'error');
    setMgAngularLogger(mgError);
    console.error(new Error('<mg-'));

    expect(spy).not.to.toHaveBeenCalled();
  });

  test('Should display error message does NOT start with "<mg-"', () => {
    const spy = vi.spyOn(console, 'error');
    setMgAngularLogger();
    console.error(standardError);

    expect(spy).toHaveBeenCalled();
  });

  test('Should display message when element is NOT an error start with "<mg-"', () => {
    const spy = vi.spyOn(console, 'error');
    setMgAngularLogger();
    console.error('<mg-');

    expect(spy).toHaveBeenCalled();
  });

  test.each([mgError, standardError])('Should display error logger is set on "error"', err => {
    const spy = vi.spyOn(console, 'error');
    setMgAngularLogger({ level: 'error' });
    console.error(err);

    expect(spy).toHaveBeenCalled();
  });
});
