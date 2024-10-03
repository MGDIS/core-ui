import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgDivider } from '../mg-divider';

const getPage = args =>
  newSpecPage({
    components: [MgDivider],
    template: () => <mg-divider {...args}></mg-divider>,
  });

describe('mg-divider', () => {
  test.each([false, true])('full-width %s', async fullWidth => {
    const { root } = await getPage({ fullWidth });
    expect(root).toMatchSnapshot();
  });
});
