import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgCard } from '../mg-card';
import { radiusSizes } from '../mg-card.conf';

const getPage = (props, slot) =>
  newSpecPage({
    components: [MgCard],
    template: () => <mg-card {...props}>{slot}</mg-card>,
  });

describe('mg-card', () => {
  test('render', async () => {
    const { root } = await getPage(
      {},
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    );
    expect(root).toMatchSnapshot();
  });

  test.each([undefined, true, false])('Should render correctly with shadow=%s', async shadow => {
    const { root } = await getPage({ shadow }, `shadow=${shadow}`);
    expect(root).toMatchSnapshot();
  });

  test.each([undefined, ...radiusSizes])('Should render correctly with radius=%s', async radius => {
    const { root } = await getPage({ radius }, `radius=${radius}`);
    expect(root).toMatchSnapshot();
  });

  test('Should remove old radius class when radius changes', async () => {
    const page = await getPage({ radius: 'xsmall' }, 'radius test');
    const card = page.root.shadowRoot.querySelector('.mg-c-card');
    // xsmall -> small
    page.root.radius = 'small';
    await page.waitForChanges();
    expect(card.classList.contains('mg-c-card--radius-xsmall')).toBe(false);
    expect(card.classList.contains('mg-c-card--radius-small')).toBe(true);
  });
});
