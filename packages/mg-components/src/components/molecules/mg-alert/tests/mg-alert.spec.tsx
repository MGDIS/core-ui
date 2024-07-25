import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgAlert } from '../mg-alert';
import { variants } from '../mg-alert.conf';

const getDefaultContent = () => (
  <p>
    <strong>Strong</strong> content!
  </p>
);

const getPage = (args, content) =>
  newSpecPage({
    components: [MgAlert],
    template: () => <mg-alert {...args}>{content}</mg-alert>,
  });

describe('mg-alert', () => {
  beforeEach(() => jest.useFakeTimers({ legacyFakeTimers: true }));
  afterEach(() => jest.runOnlyPendingTimers());

  describe('Render', () => {
    describe.each(variants)('Should render a %s alert', variant => {
      test.each([{}, { lang: 'fr' }, { lang: 'xx' }])('with args %s', async args => {
        const { root } = await getPage({ ...args, variant }, getDefaultContent());
        expect(root).toMatchSnapshot();
      });
    });

    test('Should render with action slot', async () => {
      const { root } = await getPage({}, [
        getDefaultContent(),
        <div slot="actions">
          <mg-button>Primary</mg-button>
          <mg-button variant="secondary">Secondary</mg-button>
        </div>,
      ]);
      expect(root).toMatchSnapshot();
    });
  });

  test('Should hide alert on close button', async () => {
    const page = await getPage({}, getDefaultContent());

    const element = page.doc.querySelector('mg-alert');
    const button = element.shadowRoot.querySelector('mg-button');

    jest.spyOn(page.rootInstance.componentHide, 'emit');

    button.dispatchEvent(new CustomEvent('click', { bubbles: true }));
    await page.waitForChanges();

    expect(page.rootInstance.componentHide.emit).toHaveBeenCalledTimes(1);
    expect(page.rootInstance.element.hidden).toBe(true);
  });

  test('Should hide alert on delay', async () => {
    const args = { delay: 2 };
    const page = await getPage(args, getDefaultContent());

    jest.spyOn(page.rootInstance.componentHide, 'emit');
    jest.spyOn(page.rootInstance.componentShow, 'emit');

    expect(page.rootInstance.element.hidden).toBe(false);

    jest.advanceTimersByTime(args.delay * 1000);

    expect(page.rootInstance.element.hidden).toBe(true);
    expect(page.rootInstance.componentHide.emit).toHaveBeenCalledTimes(1);

    page.rootInstance.element.hidden = false;
    await page.waitForChanges();

    expect(page.rootInstance.componentShow.emit).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(args.delay * 1000);

    expect(page.rootInstance.element.hidden).toBe(true);
    expect(page.rootInstance.componentHide.emit).toHaveBeenCalledTimes(2);
  });

  test.each(['focus', 'mouse'])('Should manage event %s with delay', async eventType => {
    const args = { delay: 2 };
    const page = await getPage(args, getDefaultContent());

    jest.spyOn(page.rootInstance.componentHide, 'emit');
    jest.spyOn(page.rootInstance.componentShow, 'emit');

    const element = page.doc.querySelector('mg-alert');

    expect(page.rootInstance.element.hidden).toBe(false);

    jest.advanceTimersByTime((args.delay / 2) * 1000);

    element.dispatchEvent(eventType === 'focus' ? new FocusEvent('focusin') : new MouseEvent('mouseenter'));

    jest.advanceTimersByTime(args.delay * 1000);

    expect(page.rootInstance.element.hidden).toBe(false);

    element.dispatchEvent(eventType === 'focus' ? new FocusEvent('focusout') : new MouseEvent('mouseleave'));

    jest.advanceTimersByTime(args.delay * 1000);

    expect(page.rootInstance.element.hidden).toBe(true);
    expect(page.rootInstance.componentHide.emit).toHaveBeenCalledTimes(1);
  });
  describe('Errors', () => {
    test.each([' ', 'blu'])('Should throw error with invalid variant property: %s', async variant => {
      expect.assertions(1);
      try {
        await getPage({ variant }, getDefaultContent());
      } catch (err) {
        expect(err.message).toMatch('<mg-alert> prop "variant" must be one of:');
      }
    });

    test.each([' ', 'batman'])('should throw error with invalid variantStyle property: %s', async variantStyle => {
      expect.assertions(1);
      try {
        await getPage(
          { variantStyle },
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        );
      } catch (err) {
        expect(err.message).toMatch('<mg-alert> prop "variantStyle" must be one of:');
      }
    });

    test('Should throw error with invalid delay property', async () => {
      expect.assertions(1);
      try {
        await getPage({ delay: 1 }, getDefaultContent());
      } catch (err) {
        expect(err.message).toMatch('<mg-alert> prop "delay" must be greater than 2 seconds.');
      }
    });
  });
});
