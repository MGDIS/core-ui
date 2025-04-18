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
  let fireRo = [];
  beforeEach(() => {
    jest.useFakeTimers({ legacyFakeTimers: true });
    setupResizeObserverMock({
      observe: function () {
        fireRo.push(this.cb);
      },
      disconnect: function () {
        return null;
      },
    });
  });
  afterEach(() => {
    jest.clearAllTimers();
    fireRo = [];
  });

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

  test.each(['auto', 'auto-end', 'auto-start', 'batman'])('Should update placement', async placement => {
    const args = { identifier: 'identifier', placement };
    const { doc } = await getPage(args, [
      <h2 slot="title">Blu bli blo bla</h2>,
      <p slot="content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>,
      <mg-button>mg-button</mg-button>,
    ]);

    const mgTooltip = doc.querySelector('mg-popover');

    expect(mgTooltip.placement).toEqual('bottom');
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
    const dispatchEventSpy = jest.spyOn(mgPopover, 'dispatchEvent');

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
      expect(dispatchEventSpy).toHaveBeenCalledWith(expect.objectContaining({ detail: true, type: 'display-change' }));
    } else {
      expect(popover).not.toHaveAttribute('data-show');
      expect(dispatchEventSpy).toHaveBeenCalledWith(expect.objectContaining({ detail: false, type: 'display-change' }));
    }
    // if clickCross or Escape
    if (eventOut === 'clickCross' || (typeof eventOut === 'object' && eventOut.code === 'Escape')) {
      expect(dispatchEventSpy).toHaveBeenCalledWith(expect.objectContaining({ type: 'component-close' }));
    }
  });

  test('Should log an error with invalid "identifier" property', async () => {
    const identifier = '{{batman}}';
    expect.assertions(1);
    try {
      await getPage({ identifier }, [
        <h2 slot="title">Blu bli blo bla</h2>,
        <p slot="content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>,
        <mg-button>mg-button</mg-button>,
      ]);
    } catch (err) {
      expect(err.message).toEqual(`<mg-popover> prop "identifier" value is invalid. Passed value: ${identifier}.`);
    }
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

  test('Should update Floating UI instance when slot updates', async () => {
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

    const spy = jest.spyOn(page.rootInstance, 'updatePopover');

    fireRo[0]([]);
    await page.waitForChanges();

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

  test('Should close mg-popover when click on element with "popovertargetaction" attribute', async () => {
    const page = await getPage({ identifier: 'identifier' }, [
      <div slot="content">
        <mg-button popovertargetaction="hide"></mg-button>
      </div>,
      <mg-button>mg-button</mg-button>,
    ]);
    expect(page.root).toMatchSnapshot();

    const popover = page.doc.querySelector('mg-popover-content');
    const interactiveElement = page.doc.querySelector('mg-popover > mg-button');
    interactiveElement.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await page.waitForChanges();

    expect(popover).toHaveAttribute('data-show');
    expect(page.root).toMatchSnapshot();

    const buttonWithAction = page.doc.querySelector('mg-button[popovertargetaction]');
    buttonWithAction.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    await page.waitForChanges();

    expect(popover).not.toHaveAttribute('data-show');
    expect(page.root).toMatchSnapshot();
  });

  test.each([
    {
      initialPlacement: 'bottom',
      expectedFallbacks: ['bottom-start', 'bottom', 'bottom-end', 'top', 'right', 'left'],
    },
    {
      initialPlacement: 'bottom-start',
      expectedFallbacks: ['bottom-start', 'bottom', 'bottom-end', 'top', 'right', 'left'],
    },
    {
      initialPlacement: 'right',
      expectedFallbacks: ['right-start', 'right', 'right-end', 'top', 'bottom', 'left'],
    },
    {
      initialPlacement: 'left',
      expectedFallbacks: ['left-start', 'left', 'left-end', 'top', 'right', 'bottom'],
    },
  ])('Should generate closest fallback placements for $initialPlacement', async ({ initialPlacement, expectedFallbacks }) => {
    const page = await getPage({ identifier: 'identifier', placement: initialPlacement, display: true }, [
      <h2 slot="title">Blu bli blo bla</h2>,
      <p slot="content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>,
    ]);

    const fallbacks = page.rootInstance.getClosestPlacements(initialPlacement);

    expect(fallbacks).toEqual(expectedFallbacks);
  });

  test('Should include sides in fallback placements when using data-fallback-placement', async () => {
    const page = await getPage(
      {
        identifier: 'identifier',
        placement: 'bottom',
        display: true,
        fallbackPlacement: 'right-start,right-end',
      },
      [
        <h2 slot="title">Blu bli blo bla</h2>,
        <p slot="content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>,
      ],
    );

    const fallbacks = page.rootInstance.getClosestPlacements('bottom');

    // The defined fallbackPlacements + the basic sides
    const expectedFallbacks = ['right-start', 'right-end', 'top', 'right', 'bottom', 'left'];
    expect(fallbacks).toEqual(expectedFallbacks);
  });

  test('Should manage disconnectedCallback hook without updatePopover', async () => {
    const page = await getPage({ identifier: 'identifier', display: true }, [
      <h2 slot="title">Blu bli blo bla</h2>,
      <p slot="content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>,
      <mg-button>mg-button</mg-button>,
    ]);

    expect(page.body).toMatchSnapshot();

    delete page.rootInstance.updatePopover;

    page.doc.querySelector('mg-popover').remove();

    await page.waitForChanges();

    expect(page.body).toMatchSnapshot();
  });
});
