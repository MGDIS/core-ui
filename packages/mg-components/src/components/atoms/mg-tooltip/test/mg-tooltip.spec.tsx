import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgTooltip } from '../mg-tooltip';
import { MgButton } from '../../mg-button/mg-button';
import { MgIcon } from '../../mg-icon/mg-icon';
import { setupMutationObserverMock, mockWindowFrames, mockConsoleError } from '../../../../utils/unit.test.utils';
import { MgTooltipContent } from '../mg-tooltip-content/mg-tooltip-content';

mockWindowFrames();
mockConsoleError();

const getPage = (args, element) =>
  newSpecPage({
    components: [MgTooltip, MgTooltipContent, MgButton, MgIcon],
    template: () => <mg-tooltip {...args}>{element}</mg-tooltip>,
  });

describe('mg-tooltip', () => {
  let fireMo;

  beforeEach(() => {
    jest.useFakeTimers({ legacyFakeTimers: true });
    setupMutationObserverMock({
      observe: function () {
        fireMo = this.cb;
      },
      disconnect: function () {
        return null;
      },
      takeRecords: () => [],
    });
  });

  afterEach(() => jest.runOnlyPendingTimers());

  describe.each([
    () => <span>span</span>,
    () => <button aria-describedby="blu">button</button>,
    () => <mg-icon icon="check-circle"></mg-icon>,
    () => <mg-button identifier="identifier">mg-button</mg-button>,
    () => (
      <mg-button identifier="identifier" disabled>
        mg-button.disabled
      </mg-button>
    ),
  ])('render', element => {
    test.each([true, false])('Should render with tooltip', async disabled => {
      const page = await getPage({ identifier: 'identifier', message: 'My tooltip message', disabled }, element());
      expect(page.root).toMatchSnapshot();

      const mgTooltip = page.doc.querySelector('mg-tooltip');
      mgTooltip.disabled = !disabled;
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();

      mgTooltip.disabled = disabled;
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();
    });
  });

  test('Should render with element with given placement', async () => {
    const args = { identifier: 'identifier', message: 'My tooltip message', placement: 'auto' };
    const { root } = await getPage(args, <span>span</span>);
    expect(root).toMatchSnapshot();
  });

  test.each(['', ' ', undefined])('Should throw error, case invalid message prop', async message => {
    expect.assertions(1);
    try {
      await getPage({ message }, <span>span</span>);
    } catch (err) {
      expect(err.message).toContain('<mg-tooltip> prop "message" is required.');
    }
  });

  describe.each([
    { eventIn: 'mouseenter', eventOut: 'mouseleave' },
    { eventIn: 'focus', eventOut: 'blur' },
    { eventIn: 'mouseenter', eventOut: 'clickDocument' },
  ])('Should manage display on events enter with %s, leave with %s', ({ eventIn, eventOut }) => {
    test.each([
      <span>span</span>,
      <button aria-describedby="blu">button</button>,
      <mg-icon icon="check-circle"></mg-icon>,
      <mg-button identifier="identifier-mg-button">mg-button</mg-button>,
    ])('element', async element => {
      const args = { identifier: 'identifier', message: 'blu' };
      const page = await getPage(args, element);
      const mgTooltip = page.doc.querySelector('mg-tooltip');
      const linkedTooltipElement = mgTooltip.querySelector(`[aria-describedby*='${args.identifier}']`);
      const tooltip = mgTooltip.querySelector(`#${args.identifier}`);

      linkedTooltipElement.dispatchEvent(new CustomEvent(eventIn, { bubbles: true }));

      // flush windows addEventListener timeout
      jest.runOnlyPendingTimers();
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();
      expect(tooltip).toHaveAttribute('data-show');

      if (eventOut !== 'clickDocument') linkedTooltipElement.dispatchEvent(new CustomEvent(eventOut, { bubbles: true }));
      else page.doc.dispatchEvent(new Event('click', { bubbles: true }));

      if (eventOut !== 'blur') jest.runOnlyPendingTimers();

      await page.waitForChanges();

      expect(tooltip).not.toHaveAttribute('data-show');
    });

    test.each([false, true])('should not call event methods when disabled and display:%s', async display => {
      const args = { identifier: 'identifier', message: 'blu', disabled: true, display };
      const page = await getPage(args, <span>span</span>);
      const mgTooltip = page.doc.querySelector('mg-tooltip');
      const linkedTooltipElement = mgTooltip.querySelector(`[aria-describedby*='${args.identifier}']`);
      const tooltip = mgTooltip.querySelector(`#${args.identifier}`);

      [eventIn, eventOut].forEach(async event => {
        linkedTooltipElement.dispatchEvent(new CustomEvent(event, { bubbles: true }));
        await page.waitForChanges();
        if (display) {
          expect(tooltip).toHaveAttribute('data-show');
        } else {
          expect(tooltip).not.toHaveAttribute('data-show');
        }
      });
    });
  });

  test.each([
    <span>span</span>,
    <button aria-describedby="blu">button</button>,
    <mg-icon icon="check-circle"></mg-icon>,
    <mg-button identifier="identifier-mg-button">mg-button</mg-button>,
  ])('should manage cross mouse and keyboard navigation', async element => {
    const args = { identifier: 'identifier', message: 'blu' };
    const page = await getPage(args, element);
    const mgTooltip = page.doc.querySelector('mg-tooltip');
    const linkedTooltipElement = mgTooltip.querySelector(`[aria-describedby*='${args.identifier}']`);
    const tooltip = mgTooltip.querySelector(`#${args.identifier}`);

    linkedTooltipElement.dispatchEvent(new CustomEvent('focus', { bubbles: true }));
    await page.waitForChanges();
    expect(tooltip).toHaveAttribute('data-show');

    page.doc.dispatchEvent(new KeyboardEvent('keydown', { code: 'Escape' }));
    await page.waitForChanges();
    expect(tooltip).not.toHaveAttribute('data-show');

    linkedTooltipElement.dispatchEvent(new CustomEvent('mouseenter', { bubbles: true }));
    await page.waitForChanges();
    expect(tooltip).toHaveAttribute('data-show');

    linkedTooltipElement.dispatchEvent(new CustomEvent('mouseleave', { bubbles: true }));
    // flush windows addEventListener timeout
    jest.runOnlyPendingTimers();

    await page.waitForChanges();
    expect(tooltip).not.toHaveAttribute('data-show');
  });

  test.each([true, false])('Should toggle tooltip from prop display, case display %s', async display => {
    const args = { identifier: 'identifier', message: 'batman', display };
    const page = await getPage(args, <span>batman</span>);
    const mgTooltip = page.doc.querySelector('mg-tooltip');
    const tooltip = mgTooltip.querySelector(`#${args.identifier}`);

    expect(page.root).toMatchSnapshot();
    if (display) {
      expect(tooltip).toHaveAttribute('data-show');
    } else {
      expect(tooltip).not.toHaveAttribute('data-show');
    }

    page.rootInstance.display = !display;
    await page.waitForChanges();

    expect(page.root).toMatchSnapshot();
    if (display) {
      expect(tooltip).not.toHaveAttribute('data-show');
    } else {
      expect(tooltip).toHaveAttribute('data-show');
    }
  });

  describe('hide method', () => {
    test.each(['Tab', 'Space', 'Enter', 'i'])('should prevent keyboardEvent, case not "Escape" code', async code => {
      const args = { identifier: 'identifier', message: 'batman' };
      const page = await getPage(args, <span id="batman">batman</span>);
      const mgTooltip = page.doc.querySelector('mg-tooltip');
      const tooltip = mgTooltip.querySelector(`#${args.identifier}`);
      const element = page.doc.getElementById('batman');

      element.dispatchEvent(new CustomEvent('focus', { bubbles: true }));
      await page.waitForChanges();

      expect(tooltip).toHaveAttribute('data-show');

      page.doc.dispatchEvent(new KeyboardEvent('keydown', { code }));
      await page.waitForChanges();

      expect(tooltip).toHaveAttribute('data-show');
    });

    test('Should hide tooltip with keyboardEvent, case "Escape" code', async () => {
      const args = { identifier: 'identifier', message: 'batman' };
      const page = await getPage(args, <span id="batman">batman</span>);
      const mgTooltip = page.doc.querySelector('mg-tooltip');
      const tooltip = mgTooltip.querySelector(`#${args.identifier}`);
      const element = page.doc.getElementById('batman');

      element.dispatchEvent(new CustomEvent('focus', { bubbles: true }));
      await page.waitForChanges();

      expect(tooltip).toHaveAttribute('data-show');

      page.doc.dispatchEvent(new KeyboardEvent('keydown', { code: 'Escape' }));
      await page.waitForChanges();

      expect(tooltip).not.toHaveAttribute('data-show');
    });
  });

  test('Should keep displayed tooltip when hover it', async () => {
    const element = <span>span</span>;
    const eventIn = 'mouseenter';
    const eventOut = 'mouseleave';
    const args = { identifier: 'identifier', message: 'blu' };
    const page = await getPage(args, element);
    const mgTooltip = page.doc.querySelector('mg-tooltip');
    const linkedTooltipElement = mgTooltip.querySelector(`[aria-describedby*='${args.identifier}']`);
    const tooltip = mgTooltip.querySelector(`#${args.identifier}`);

    // 1. hover tooltipedElement and display tooltip
    linkedTooltipElement.dispatchEvent(new CustomEvent(eventIn, { bubbles: true }));
    await page.waitForChanges();

    expect(page.root).toMatchSnapshot();
    expect(tooltip).toHaveAttribute('data-show');

    // 2.1 leave tooltipedElement and tooltip stay displayed
    linkedTooltipElement.dispatchEvent(new CustomEvent(eventOut, { bubbles: true }));
    await page.waitForChanges();

    expect(tooltip).toHaveAttribute('data-show');

    // 2.2 hover on tooltipedElement and tooltip stay displayed
    tooltip.dispatchEvent(new CustomEvent(eventIn, { bubbles: true }));
    await page.waitForChanges();

    // 2.3 flush promise to keep tooltip display thanks to guard
    jest.advanceTimersByTime(200);
    await page.waitForChanges();

    expect(tooltip).toHaveAttribute('data-show');

    // 3 leave tooltipElement
    tooltip.dispatchEvent(new CustomEvent(eventOut, { bubbles: true }));
    await page.waitForChanges();

    // 3.2 flush promise to pass tooltip guard and hide it
    jest.advanceTimersByTime(200);
    await page.waitForChanges();

    expect(tooltip).not.toHaveAttribute('data-show');
  });

  test('Should prevent focus guard with click event', async () => {
    const args = { identifier: 'identifier', message: 'batman' };
    const page = await getPage(args, <mg-button>batman</mg-button>);
    const mgTooltip = page.doc.querySelector('mg-tooltip');
    const tooltip = mgTooltip.querySelector(`#${args.identifier}`);
    const element = page.doc.querySelector('mg-button');

    element.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    await page.waitForChanges();

    expect(tooltip).toHaveAttribute('data-show');

    // recompose a click event as click event is not properly mock by jest `mousedown` + `focus` + `mouseup`
    for (const event of ['mousedown', 'focus', 'mouseup']) {
      const Constructor = event === 'focus' ? FocusEvent : MouseEvent;
      element.dispatchEvent(new Constructor(event, { bubbles: true }));
      await page.waitForChanges();
    }

    expect(tooltip).toHaveAttribute('data-show');

    element.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
    await page.waitForChanges();
    jest.runOnlyPendingTimers();

    expect(tooltip).not.toHaveAttribute('data-show');
  });

  test.each(['button', 'mg-button'])('Should update %s wrapper dynamically', async TagName => {
    const page = await getPage(
      { identifier: 'identifier', message: 'My tooltip message' },
      <TagName identifier="identifier" disabled>
        {TagName}.disabled
      </TagName>,
    );

    expect(page.root).toMatchSnapshot();

    // Mock replaceWith
    const mgTooltip = page.doc.querySelector('mg-tooltip');
    mgTooltip.firstElementChild.replaceWith = jest.fn(element => {
      mgTooltip.innerHTML = (element as Node).parentElement.innerHTML;
    });

    const mgButton: HTMLButtonElement | HTMLMgButtonElement = page.doc.querySelector(TagName);
    mgButton.disabled = false;
    fireMo([{ attributeName: TagName === 'MG-BUTTON' ? 'aria-disabled' : 'disabled' }]);
    await page.waitForChanges();

    expect(page.root).toMatchSnapshot();
  });

  test('Should update popper instance when "message" prop change', async () => {
    const page = await getPage(
      { identifier: 'identifier', message: 'My tooltip message' },
      <mg-button identifier="identifier" disabled>
        mg-button.disabled
      </mg-button>,
    );

    const spy = jest.spyOn(page.rootInstance.popper, 'update');
    const mgTooltip = page.doc.querySelector('mg-tooltip');
    mgTooltip.message = 'my new message';

    await page.waitForChanges();

    expect(spy).toHaveBeenCalled();
  });

  test('Should update mg-popover-content id when "identifier" is updated', async () => {
    const page = await getPage(
      { identifier: 'identifier', message: 'My tooltip message' },
      <mg-button identifier="identifier" disabled>
        mg-button.disabled
      </mg-button>,
    );

    expect(page.root).toMatchSnapshot();

    const mgTooltip = page.doc.querySelector('mg-tooltip');
    mgTooltip.identifier = 'new-identifier';

    await page.waitForChanges();

    expect(page.root).toMatchSnapshot();
  });
});
