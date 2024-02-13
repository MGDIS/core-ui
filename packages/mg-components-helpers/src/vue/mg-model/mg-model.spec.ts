import { describe, expect, test } from 'vitest';
import { createLocalVue } from '@vue/test-utils';
import { mgModel } from './';

const localVue = createLocalVue();

describe('mg-model', () => {
  test('nominal', () => {
    mgModel.install(localVue);
    const directive = localVue.directive('mg-model');

    expect(directive.bind).toBeDefined();
    expect(directive.componentUpdated).toBeDefined();
    expect(directive.unbind).toBeDefined();

    const el = document.createElement('div');
    const vnode = { context: {} };
    const binding = { value: 'blu', expression: 'blu' };

    directive.bind(el, binding, vnode);
    expect(el.value).toEqual('blu');

    expect(vnode.context[binding.expression]).not.toBeDefined();
    el.dispatchEvent(new CustomEvent('value-change', { bubbles: true }));
    expect(vnode.context[binding.expression]).toEqual(el.value);

    directive.componentUpdated(el, { value: 'bla' });
    expect(el.value).toEqual('bla');

    directive.unbind(el);
    el.dispatchEvent(new CustomEvent('value-change', { bubbles: true }));
    expect(vnode.context[binding.expression]).not.toEqual(el.value);
  });
  test('without binding values', () => {
    mgModel.install(localVue);
    const directive = localVue.directive('mg-model');

    const el = document.createElement('div');
    const vnode = { context: {} };

    directive.bind(el, {}, vnode);
    expect(el.value).toEqual('');

    directive.bind(el, { value: 'blu' }, vnode);
    expect(el.value).toEqual('blu');

    directive.componentUpdated(el, {});
    expect(el.value).toEqual('');
  });
});
