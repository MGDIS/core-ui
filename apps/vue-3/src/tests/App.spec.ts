import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import App from '../App.vue';
import { axe } from 'jest-axe';

const getWrapper = () => mount(App);

describe('App', () => {
  test('Should render component', async () => {
    const wrapper = getWrapper();
    const html = wrapper.html();
    expect(await axe(html)).toHaveNoViolations();
    // Snapshot test
    expect(html).toMatchSnapshot();
  });
});
