import { h } from '@stencil/core/internal';
import { newSpecPage } from '@stencil/core/testing';
import { MgItemMore } from '../components/molecules/internals/mg-item-more/mg-item-more';
import { MgMenuItem } from '../components/molecules/menus/mg-menu-item/mg-menu-item';
import { MgMenu } from '../components/molecules/menus/mg-menu/mg-menu';
import { OverflowBehavior } from './behaviors.utils';
import { setupMutationObserverMock, setupResizeObserverMock } from '@mgdis/core-ui-helpers/dist/stencil';

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

        fireRo([{ contentRect: { width: 350 } }, { contentRect: { width: 250 } }]);
        expect(page.root).toMatchSnapshot();
      });
    });

    test.each(['parentElement', 'itemMoreElement', 'itemMoreContainerElement'])('Should throw error when missing constructor param %s', async param => {
      expect.assertions(1);
      const page = await newSpecPage({
        components: [],
        template: () => (
          <ul>
            <li></li>
            <li>
              <ul></ul>
            </li>
          </ul>
        ),
      });
      let itemMoreContainerElement: HTMLElement = null;
      if (param !== 'itemMoreContainerElement') itemMoreContainerElement = page.doc.querySelector('ul > li > ul');
      let itemMoreElement: HTMLElement = null;
      if (param !== 'itemMoreElement') itemMoreElement = page.doc.querySelector('ul > li:last-of-type');
      let parentElement: HTMLElement = null;
      if (param !== 'parentElement') parentElement = page.doc.querySelector('ul');

      try {
        new OverflowBehavior(parentElement, itemMoreElement, itemMoreContainerElement);
      } catch (err) {
        expect(err.message).toEqual(`OverflowBehavior - all constructor params are required`);
      }
    });

    test('Should fire disconnect callback', async () => {
      const page = await newSpecPage({
        components: [],
        template: () => (
          <ul>
            <li></li>
            <li>
              <ul></ul>
            </li>
          </ul>
        ),
      });
      const itemMoreContainerElement = page.doc.querySelector('ul > li > ul') as HTMLElement;
      const itemMoreElement = page.doc.querySelector('ul > li:last-of-type') as HTMLElement;
      const parentElement = page.doc.querySelector('ul');
      const behavior = new OverflowBehavior(parentElement, itemMoreElement, itemMoreContainerElement);
      const spy = jest.spyOn((behavior as unknown as { _resizeObserver: never })._resizeObserver, 'disconnect');
      behavior.disconnect();

      expect(spy).toHaveBeenCalled();
    });
  });
});
