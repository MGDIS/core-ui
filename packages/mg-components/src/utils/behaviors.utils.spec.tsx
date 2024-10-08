import { h } from '@stencil/core/internal';
import { newSpecPage } from '@stencil/core/testing';
import { MgItemMore } from '../components/molecules/internals/mg-item-more/mg-item-more';
import { MgMenuItem } from '../components/molecules/menu/mg-menu-item/mg-menu-item';
import { MgMenu } from '../components/molecules/menu/mg-menu/mg-menu';
import { OverflowBehavior } from './behaviors.utils';
import { setupMutationObserverMock, setupResizeObserverMock } from '@mgdis/stencil-helpers';

const getPage = render =>
  newSpecPage({
    components: [MgMenu, MgMenuItem, MgItemMore],
    template: () => render,
  });

describe('behavior.utils', () => {
  describe('OverflowBehavior', () => {
    let fireRo;
    beforeEach(() => {
      jest.useFakeTimers({ legacyFakeTimers: true });
      setupResizeObserverMock({
        observe: function () {
          fireRo = this.cb;
        },
        disconnect: () => null,
      });
      setupMutationObserverMock({
        disconnect: () => null,
        observe: () => null,
        takeRecords: () => null,
      });
    });
    afterEach(() => jest.runOnlyPendingTimers());

    describe('render menu', () => {
      test.each([50, 80, 100, 250])('should manage resize with observer, case %s', async width => {
        const args = { label: 'batman' };
        const page = await getPage(
          <mg-menu {...args}>
            <mg-menu-item identifier="identifier-1">
              <span slot="label">Batman</span>
            </mg-menu-item>
            <mg-menu-item identifier="identifier-2">
              <span slot="label">Joker</span>
            </mg-menu-item>
            <mg-menu-item identifier="identifier-3">
              <span slot="label">Bane</span>
            </mg-menu-item>
          </mg-menu>,
        );

        // initial menu render
        jest.runAllTimers();
        await page.waitForChanges();

        // more-item render
        jest.runAllTimers();
        await page.waitForChanges();

        // more-item menu-items render
        jest.runAllTimers();
        await page.waitForChanges();

        const items = Array.from(page.doc.querySelectorAll('mg-menu-item'));
        items.forEach(item => {
          Object.defineProperty(item, 'offsetWidth', {
            get: jest.fn(() => 80),
          });
        });

        Object.defineProperty(page.doc.querySelector('mg-item-more'), 'offsetWidth', {
          get: jest.fn(() => 50),
        });

        fireRo([{ contentRect: { width } }]);

        expect(page.root).toMatchSnapshot();
      });
    });

    test('Should fire disconnect callback', () => {
      const behavior = new OverflowBehavior(<div></div>, () => <span></span>);
      const spy = jest.spyOn((behavior as unknown as { _resizeObserver: never })._resizeObserver, 'disconnect');
      behavior.disconnect();

      expect(spy).toHaveBeenCalled();
    });
  });
});
