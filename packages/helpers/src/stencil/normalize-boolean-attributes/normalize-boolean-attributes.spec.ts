import { describe, expect, test } from 'vitest';
import { normalizeBooleanAttributes } from '.';

const makeTarget = (html: string, props: Record<string, unknown>): { element: HTMLElement } => {
  const element = document.createElement('div');
  // Parse attributes from a fake tag so we can pass arbitrary attribute names/values
  const tmp = document.createElement('div');
  tmp.innerHTML = `<my-elem ${html}></my-elem>`;
  const source = tmp.firstElementChild as HTMLElement;
  for (const attr of Array.from(source.attributes)) {
    element.setAttribute(attr.name, attr.value);
  }
  return { element, ...props };
};

describe('normalizeBooleanAttributes', () => {
  test('rewrites boolean-typed attributes to empty string regardless of original value', () => {
    const target = makeTarget('readonly="false" disabled="true" required="" multiple', {
      readonly: false,
      disabled: true,
      required: false,
      multiple: false,
    });
    normalizeBooleanAttributes(target);
    expect(target.element.getAttribute('readonly')).toBe('');
    expect(target.element.getAttribute('disabled')).toBe('');
    expect(target.element.getAttribute('required')).toBe('');
    expect(target.element.getAttribute('multiple')).toBe('');
  });

  test('skips attributes that do not map to a boolean prop', () => {
    const target = makeTarget('class="foo" id="bar" data-x="1"', {});
    normalizeBooleanAttributes(target);
    expect(target.element.getAttribute('class')).toBe('foo');
    expect(target.element.getAttribute('id')).toBe('bar');
    expect(target.element.getAttribute('data-x')).toBe('1');
  });

  test('skips attributes whose prop is not boolean-typed', () => {
    const target = makeTarget('label="hello" count="3"', { label: 'hello', count: 3 });
    normalizeBooleanAttributes(target);
    expect(target.element.getAttribute('label')).toBe('hello');
    expect(target.element.getAttribute('count')).toBe('3');
  });

  test('converts kebab-case attribute name to camelCase prop name', () => {
    const target = makeTarget('is-legend="false" label-on-top="false"', { isLegend: false, labelOnTop: false });
    normalizeBooleanAttributes(target);
    expect(target.element.getAttribute('is-legend')).toBe('');
    expect(target.element.getAttribute('label-on-top')).toBe('');
  });

  test('leaves attributes alone when there is no matching prop', () => {
    const target = makeTarget('flag="false"', {});
    normalizeBooleanAttributes(target);
    expect(target.element.getAttribute('flag')).toBe('false');
  });

  test('handles an element with no attributes', () => {
    const target = makeTarget('', { readonly: false });
    expect(() => normalizeBooleanAttributes(target)).not.toThrow();
  });
});
