import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgPopover } from '../mg-popover';
import { MgButton } from '../../../atoms/mg-button/mg-button';
import { mockWindowFrames } from '../../../../utils/unit.test.utils';
import { setupResizeObserverMock } from '@mgdis/stencil-helpers';
import { MgPopoverContent } from '../mg-popover-content/mg-popover-content';
import { MgCard } from '../../../atoms/mg-card/mg-card';

mockWindowFrames();

const getPage = (args, slot, parent?: boolean) => {
  const fallbackPlacement = args.fallbackPlacement;
  delete args.fallbackPlacement;
  const popover = () => (
    <mg-popover {...args} data-fallback-placement={fallbackPlacement}>
      {slot}
    </mg-popover>
  );
  return newSpecPage({
    components: [MgPopover, MgPopoverContent, MgButton, MgCard],
    template: () => (parent ? <mg-card data-mg-popover-guard={args.identifier}>{popover()}</mg-card> : popover()),
  });
};

describe('mg-popover', () => {
  let fireRo;
  beforeEach(() => {
    jest.useFakeTimers({ legacyFakeTimers: true });
    setupResizeObserverMock({
      observe: function () {
        fireRo = this.cb;
      },
      disconnect: function () {
        return null;
      },
    });
  });
  afterEach(() => jest.clearAllTimers());

  test.each([
    { identifier: 'identifier' },
    { identifier: 'identifier', placement: 'auto' },
    { identifier: 'identifier', display: true },
    { identifier: 'identifier', closeButton: true },
    { identifier: 'identifier', display: true },
    { identifier: 'identifier', closeButton: true, lang: 'fr' },
    { identifier: 'identifier', closeButton: true, lang: 'xx' },
    { identifier: 'identifier', arrowHide: true },
    { identifier: 'identifier', fallbackPlacement: 'left' },
  ])('Should render with element', async args => {
    const { root } = await getPage(args, [
      <h2 slot="title">Blu bli blo bla</h2>,
      <p slot="content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>,
      <mg-button>mg-button</mg-button>,
    ]);
    expect(root).toMatchSnapshot();
  });

  test.each([
    { eventIn: 'click', eventOut: 'clickBtn' },
    { eventIn: 'click', eventOut: { code: 'Escape' } },
    { eventIn: 'click', eventOut: 'clickCross' },
    { eventIn: 'click', eventOut: 'clickDocument' },
    { eventIn: 'click', eventOut: 'clickPopover' },
    { eventIn: 'click', eventOut: 'clickGuard' },
    { eventIn: 'click', eventOut: 'clickShadowGuard' },
  ])('Should manage display on events %s', async ({ eventIn, eventOut }) => {
    const args = { identifier: 'identifier', closeButton: true };
    const page = await getPage(
      args,
      [
        <h2 slot="title">Blu bli blo bla</h2>,
        <p slot="content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>,
        <mg-button>mg-button</mg-button>,
      ],
      typeof eventOut === 'string' && ['clickGuard', 'clickShadowGuard'].includes(eventOut),
    );

    const mgPopover = page.doc.querySelector('mg-popover');
    const interactiveElement = mgPopover.querySelector(`[aria-controls*='${args.identifier}']`) as HTMLElement;
    const popover = mgPopover.querySelector(`#${args.identifier}`);
    const popoverButton = popover.shadowRoot.querySelector(`mg-button`);
    const dataGuard = page.doc.querySelector('[data-mg-popover-guard]');
    const dataGuardInnerHTML = page.doc.createElement('span');

    if (eventOut === 'clickShadowGuard') {
      dataGuard.shadowRoot.appendChild(mgPopover);
      dataGuard.shadowRoot.appendChild(dataGuardInnerHTML);
    }

    const focusSpy = jest.spyOn(interactiveElement, 'focus');
    const displayChangeSpy = jest.spyOn(mgPopover, 'dispatchEvent');

    interactiveElement.dispatchEvent(new CustomEvent(eventIn, { bubbles: true }));
    await page.waitForChanges();
    jest.runOnlyPendingTimers();

    expect(popover).toHaveAttribute('data-show');

    if (typeof eventOut === 'string') {
      if (eventOut === 'clickBtn') {
        interactiveElement.dispatchEvent(new Event('click', { bubbles: true }));
      } else if (eventOut === 'clickCross') {
        popoverButton.dispatchEvent(new Event('click', { bubbles: true }));
      } else if (eventOut === 'clickDocument') {
        document.dispatchEvent(new Event('click', { bubbles: true }));
      } else if (eventOut === 'clickPopover') {
        popover.dispatchEvent(new Event('click', { bubbles: true }));
      } else if (eventOut === 'clickGuard') {
        dataGuard.dispatchEvent(new Event('click', { bubbles: true }));
      } else if (eventOut === 'clickShadowGuard') {
        dataGuardInnerHTML.dispatchEvent(new Event('click', { bubbles: true }));
      }
    } else {
      mgPopover.dispatchEvent(new KeyboardEvent('keydown', { code: eventOut.code }));
      expect(focusSpy).toHaveBeenCalled();
    }
    await page.waitForChanges();

    if (typeof eventOut === 'string' && ['clickPopover', 'clickGuard'].includes(eventOut)) {
      expect(popover).toHaveAttribute('data-show');
      expect(displayChangeSpy).toHaveBeenCalledWith(expect.objectContaining({ detail: true, type: 'display-change' }));
    } else {
      expect(popover).not.toHaveAttribute('data-show');
      expect(displayChangeSpy).toHaveBeenCalledWith(expect.objectContaining({ detail: false, type: 'display-change' }));
    }
  });

  test('Should log an error with invalid "identifier" property: %s', async () => {
    const identifier = '{{batman}}';
    const spy = jest.spyOn(console, 'error');
    await getPage({ identifier }, [
      <h2 slot="title">Blu bli blo bla</h2>,
      <p slot="content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>,
      <mg-button>mg-button</mg-button>,
    ]);
    expect(spy).toHaveBeenCalledWith(`<mg-popover> prop "identifier" value is invalid. Passed value: ${identifier}.`);
  });

  test('Should throw error if slot title element is not a heading', async () => {
    expect.assertions(1);
    try {
      const args = { identifier: 'identifier', closeButton: true };
      await getPage(args, [
        <span slot="title">Blu bli blo bla</span>,
        <p slot="content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>,
        <mg-button>mg-button</mg-button>,
      ]);
    } catch (err) {
      expect(err.message).toContain('<mg-popover> Slotted title must be a heading: ');
    }
  });

  test('Should update popper instance when slot %s update', async () => {
    const page = await getPage({ identifier: 'identifier', display: true }, [
      <h2 slot="title">Blu bli blo bla</h2>,
      <p slot="content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>,
      <mg-button>mg-button</mg-button>,
    ]);
    expect(page.root).toMatchSnapshot();

    const spy = jest.spyOn(page.rootInstance.popper, 'update');

    fireRo([]);

    expect(spy).toHaveBeenCalled();
    expect(page.root).toMatchSnapshot();
  });

  test('Should update mg-popover-content id when identifier is updated', async () => {
    const page = await getPage({ identifier: 'identifier' }, [
      <h2 slot="title">Blu bli blo bla</h2>,
      <p slot="content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>,
      <mg-button>mg-button</mg-button>,
    ]);
    expect(page.root).toMatchSnapshot();

    page.doc.querySelector('mg-popover').identifier = 'new-identifier';

    await page.waitForChanges();

    expect(page.root).toMatchSnapshot();
  });
});
