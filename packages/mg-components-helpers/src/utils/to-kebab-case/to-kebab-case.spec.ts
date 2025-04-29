import { describe, expect, test } from 'vitest';
import { toKebabCase } from './to-kebab-case';

describe('toKebabCase', () => {
  test.each([
    ['UPPERCASE', 'uppercase'],
    ['camelCase', 'camel-case'],
    ['PascalCase', 'pascal-case'],
    ['XMLHttpRequest', 'xml-http-request'],
    ['lowercase', 'lowercase'],
    ['', ''],
    ['GEEKS__FOR__GEEKS', 'geeks-for-geeks'],
    ['GEEKS-----FOR_____Geeks', 'geeks-for-geeks'],
    ['geeks--FOR--geeks', 'geeks-for-geeks'],
    ['special@Case', 'special-case'],
    ['multiple---dashes', 'multiple-dashes'],
    ['case123Test', 'case123-test'],
    ['trailing--', 'trailing'],
    ['--leading', 'leading'],
    ['mixOfUPPERAndLower', 'mix-of-upper-and-lower'],
    ['special#characters!', 'special-characters'],
    ['12345', '12345'],
    ['textWith123Numbers', 'text-with123-numbers'],
    ['field-enumeration-list-D_PROC_POLE_REMU_NATIONALITE', 'field-enumeration-list-d-proc-pole-remu-nationalite'],
  ])('should convert %s to %s', (input, expected) => {
    expect(toKebabCase(input)).toBe(expected);
  });
});
