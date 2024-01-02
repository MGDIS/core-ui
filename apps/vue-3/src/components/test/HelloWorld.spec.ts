import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import HelloWorld from '../HelloWorld.vue';
import { axe } from 'jest-axe';

const getWrapper = () => mount(HelloWorld);

describe('HelloWorld', () => {
  test('Should render component', async () => {
    const wrapper = getWrapper();
    const html = wrapper.html();
    expect(await axe(html)).toHaveNoViolations();
    // Snapshot test
    expect(html).toMatchSnapshot();
  });
});
