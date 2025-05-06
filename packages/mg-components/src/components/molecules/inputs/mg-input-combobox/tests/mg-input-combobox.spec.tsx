import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgInputCombobox } from '../mg-input-combobox';
import { MgButton } from '../../../../atoms/mg-button/mg-button';
import { MgIcon } from '../../../../atoms/mg-icon/mg-icon';
import messages from '../../../../../locales/en/messages.json';
import { MgInput } from '../../mg-input/mg-input';
import { MgInputTitle } from '../../../../atoms/internals/mg-input-title/mg-input-title';
import { Cursor, setUpRequestAnimationFrameMock, setupResizeObserverMock, toString } from '@mgdis/stencil-helpers';
import { MgPopover } from '../../../mg-popover/mg-popover';
import { MgPopoverContent } from '../../../mg-popover/mg-popover-content/mg-popover-content';
import { mockWindowFrames } from '../../../../../utils/unit.test.utils';
import { tooltipPositions } from '../../mg-input/mg-input.conf';
import { Keys } from '../../../../../utils/events.utils';

mockWindowFrames();

const initArray = length => new Array(length).fill('').map((_, key) => (key + 1).toString());

const items = ['batman', 'robin', 'joker'];
const objectItems = items.map((item, key) => ({
  title: item,
  value: (key + 1).toString(),
}));

const initFetchSpy = (overrides = {}) =>
  jest.spyOn(global, 'fetch').mockResolvedValue(
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve(
          overrides === null
            ? null
            : {
                data: {
                  results: objectItems,
                  count: objectItems.length,
                  ...overrides,
                },
              },
        ),
    } as Response),
  );

const baseProps = {
  label: 'label',
  itemsLabel: 'Dc Comics',
  identifier: 'identifier',
  items,
};
const RequestMapping = {
  filter: '{q}',
};

const ResponseMapping = {
  items: 'data.results',
  total: 'data.count',
  next: 'data.next',
  itemTitle: 'title',
  itemValue: 'value',
};

const fetchmappings = {
  request: RequestMapping,
  response: ResponseMapping,
};
const fetchurl = `http://url.fr?filter=${RequestMapping.filter}`;

const getPage = (args, fetchOverrides?) => {
  // define fetch mock if needeed
  if (args.fetchurl) {
    initFetchSpy(fetchOverrides);
  }

  const page = newSpecPage({
    components: [MgInputCombobox, MgButton, MgIcon, MgInput, MgInputTitle, MgPopover, MgPopoverContent],
    template: () => <mg-input-combobox {...args}></mg-input-combobox>,
  });

  jest.runAllTimers();
  setUpRequestAnimationFrameMock(jest.runOnlyPendingTimers);

  return page;
};

describe('mg-input-combobox', () => {
  beforeEach(() => {
    jest.useFakeTimers({ legacyFakeTimers: true });
    setupResizeObserverMock({
      observe: () => null,
      disconnect: () => null,
    });
  });
  afterEach(() => {
    jest.runOnlyPendingTimers();
  });
  test.each([
    {},
    {
      items: [],
    },
    {
      items: initArray(30),
    },
    {
      items: objectItems,
    },
    {
      items: objectItems.map(item => ({ ...item, value: Number(item.value) })),
    },
    {
      items: undefined,
      fetchurl,
      fetchmappings,
    },
    {
      items: undefined,
      fetchurl,
      fetchmappings: { ...fetchmappings, response: { ...fetchmappings.response, itemValue: undefined } },
    },
    {
      items: undefined,
      fetchurl: new URL(fetchurl),
      fetchmappings,
    },
    {
      items,
      value: 'joker',
    },
    {
      items: objectItems,
      value: objectItems[1],
    },
    { labelHide: true },
    { labelOnTop: true },
    { readonly: true },
    { readonly: true, labelOnTop: true, tooltip: 'Tooltip message', tooltipPosition: 'input' },
    { readonly: true, labelOnTop: true, tooltip: 'Tooltip message', tooltipPosition: 'input', value: 'batman' },
    { readonly: true, value: 'batman' },
    { required: true, value: 'batman', helpText: 'My help text' },
    { required: true, readonly: true, value: 'batman', helpText: 'My help text' },
    { required: true, disabled: true, value: 'batman', helpText: 'My help text' },
    { tooltip: 'My Tooltip Message' },
    { tooltip: 'My Tooltip Message', labelOnTop: true },
    { tooltip: 'My Tooltip Message', tooltipPosition: 'label' },
    { tooltip: 'My Tooltip Message', tooltipPosition: 'input', labelOnTop: true },
    { characterLeftHide: true },
  ])('Should render with args %s:', async args => {
    const { root } = await getPage({ ...baseProps, ...args });
    expect(root).toMatchSnapshot();
  });

  test.each(['', ' ', undefined])('Should not render with invalid identifier property: %s', async identifier => {
    expect.assertions(1);
    try {
      await getPage({ ...baseProps, identifier });
    } catch (err) {
      expect(err.message).toEqual(`<mg-input> prop "identifier" is required and must be a string. Passed value: ${identifier}.`);
    }
  });

  test('Should update mg-width', async () => {
    const page = await getPage({ ...baseProps });
    const element = page.doc.querySelector('mg-input-combobox');

    element.mgWidth = 2;
    await page.waitForChanges();

    expect(page.root).toMatchSnapshot();

    element.mgWidth = 4;
    await page.waitForChanges();

    expect(page.root).toMatchSnapshot();

    element.mgWidth = 16;
    await page.waitForChanges();

    expect(page.root).toMatchSnapshot();

    const input = element.shadowRoot.querySelector('input');
    Object.defineProperty(input, 'offsetWidth', {
      get: jest.fn(() => 100),
    });
    element.mgWidth = 'full';
    await page.waitForChanges();

    expect(page.root).toMatchSnapshot();
  });

  test.each(['readonly', 'disabled', 'required'])('Should update %s props', async prop => {
    const page = await getPage({ ...baseProps, [prop]: true });
    const element = page.doc.querySelector('mg-input-combobox');

    element[prop] = false;
    await page.waitForChanges();

    expect(page.root).toMatchSnapshot();
  });

  describe('input errors', () => {
    describe.each(['readonly', 'disabled'])('validity, case next state is %s', nextState => {
      test.each([
        { validity: true, valueMissing: false },
        { validity: false, valueMissing: true },
      ])('validity (%s), valueMissing (%s), patternMismatch (%s)', async ({ validity, valueMissing }) => {
        const args = { ...baseProps };
        const page = await getPage(args);

        const element = page.doc.querySelector('mg-input-combobox');
        const input = element.shadowRoot.querySelector('input');

        //mock validity
        input.checkValidity = jest.fn(() => validity);
        Object.defineProperty(input, 'validity', {
          get: jest.fn(() => ({
            valueMissing,
          })),
        });

        input.dispatchEvent(new CustomEvent('blur', { bubbles: true }));
        await page.waitForChanges();

        if (validity) {
          expect(page.rootInstance.errorMessage).toBeUndefined();
        } else if (valueMissing) {
          expect(page.rootInstance.errorMessage).toEqual(messages.errors.required);
        }
        expect(page.rootInstance.valid).toEqual(validity);
        expect(page.rootInstance.invalid).toEqual(!validity);
        if (valueMissing) {
          expect(page.root).toMatchSnapshot(); //Snapshot with readonly/disabled FALSE
          element[nextState] = true;
          await page.waitForChanges();
          expect(page.root).toMatchSnapshot(); //Snapshot with readonly/disabled TRUE
        }
      });
    });

    test('Should remove error on input', async () => {
      const page = await getPage({ ...baseProps, required: true });
      const element = page.doc.querySelector('mg-input-combobox');
      const input = element.shadowRoot.querySelector('input');

      //mock validity
      input.checkValidity = jest.fn().mockReturnValueOnce(false).mockReturnValueOnce(true).mockReturnValueOnce(true).mockReturnValueOnce(true);
      Object.defineProperty(input, 'validity', {
        get: jest
          .fn()
          .mockReturnValueOnce({
            valueMissing: true,
          })
          .mockReturnValueOnce({
            valueMissing: true,
          })
          .mockReturnValueOnce({
            valueMissing: false,
          })
          .mockReturnValueOnce({
            valueMissing: false,
          }),
      });

      await element.displayError();
      await page.waitForChanges();

      expect(page.rootInstance.hasDisplayedError).toEqual(true);
      expect(page.rootInstance.errorMessage).toEqual(messages.errors.required);

      input.value = 'batman';
      input.dispatchEvent(new CustomEvent('focusin', { bubbles: true }));
      await page.waitForChanges();
      input.dispatchEvent(new CustomEvent('input', { bubbles: true }));
      await page.waitForChanges();
      // run debounce
      jest.runOnlyPendingTimers();
      await page.waitForChanges();

      // Error message should disapear but we keep the hasDisplayedError status
      expect(page.rootInstance.hasDisplayedError).toEqual(true);
      expect(page.rootInstance.errorMessage).toBeUndefined();

      element.shadowRoot.querySelector('li').dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await page.waitForChanges();

      input.dispatchEvent(new CustomEvent('blur', { bubbles: true }));
      await page.waitForChanges();

      // On blur the hasDisplayedError status change
      expect(page.rootInstance.hasDisplayedError).toEqual(false);
    });

    test('Should remove error on input when required change dynamically', async () => {
      const page = await getPage({ ...baseProps, required: true });
      const element = page.doc.querySelector('mg-input-combobox');
      const input = element.shadowRoot.querySelector('input');

      //mock validity
      input.checkValidity = jest.fn().mockReturnValueOnce(false).mockReturnValueOnce(true).mockReturnValueOnce(true).mockReturnValueOnce(true);
      Object.defineProperty(input, 'validity', {
        get: jest
          .fn()
          .mockReturnValueOnce({
            valueMissing: true,
          })
          .mockReturnValueOnce({
            valueMissing: true,
          })
          .mockReturnValueOnce({
            valueMissing: false,
          })
          .mockReturnValueOnce({
            valueMissing: false,
          }),
      });

      await element.displayError();
      await page.waitForChanges();

      expect(page.rootInstance.hasDisplayedError).toEqual(true);
      expect(page.rootInstance.errorMessage).toEqual(messages.errors.required);

      element.required = false;
      await page.waitForChanges();

      // Error message should disapear and change the hasDisplayedError status
      expect(page.rootInstance.hasDisplayedError).toEqual(false);
      expect(page.rootInstance.errorMessage).toBeUndefined();

      element.required = true;
      await page.waitForChanges();

      // If back on required the message is still not displayed
      expect(page.rootInstance.hasDisplayedError).toEqual(false);
      expect(page.rootInstance.errorMessage).toBeUndefined();
    });
  });

  describe('Locales', () => {
    test.each(['fr', 'xx'])('display error message with locale: %s', async lang => {
      const page = await getPage({ ...baseProps, required: true, lang });
      const element = page.doc.querySelector('mg-input-combobox');
      const input = element.shadowRoot.querySelector('input');

      //mock validity
      input.checkValidity = jest.fn(() => false);
      Object.defineProperty(input, 'validity', {
        get: jest.fn(() => ({
          valueMissing: true,
        })),
      });

      await element.displayError();

      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();
    });
    test.each(['fr', 'xx'])('display load-more message with locale: %s', async lang => {
      const page = await getPage({ ...baseProps, items: initArray(20), lang });

      expect(page.root).toMatchSnapshot();
    });
  });

  describe('Component render errors', () => {
    test('Should log an error with invalid "identifier" property', async () => {
      const identifier = '{{batman}}';
      const spy = jest.spyOn(console, 'error');
      expect.assertions(1);

      try {
        await getPage({ ...baseProps, label: 'test', identifier });
      } catch {
        expect(spy).toHaveBeenCalledWith(`<mg-input> prop "identifier" value is invalid. Passed value: ${identifier}.`);
      }
    });

    test.each(['', ' ', undefined])('Should throw error with invalid "label" property: %s', async label => {
      expect.assertions(1);
      try {
        await getPage({ ...baseProps, label });
      } catch (err) {
        expect(err.message).toEqual(`<mg-input> prop "label" is required and must be a string. Passed value: ${label}.`);
      }
    });

    test('Should throw an error with "labelOnTop" & "labelHide" set to true', async () => {
      expect.assertions(1);
      try {
        await getPage({ ...baseProps, labelOnTop: true, labelHide: true });
      } catch (err) {
        expect(err.message).toEqual('<mg-input> prop "labelOnTop" must not be paired with the prop "labelHide".');
      }
    });

    test.each(['blu', {}, 5, false])('Should not render with invalid "tooltipPosition" property: %s', async tooltipPosition => {
      expect.assertions(1);
      try {
        await getPage({ ...baseProps, tooltipPosition });
      } catch (err) {
        expect(err.message).toEqual(`<mg-input> prop "tooltipPosition" must be one of: ${tooltipPositions.join(', ')}. Passed value: ${toString(tooltipPosition)}.`);
      }
    });

    test.each(['blu', {}, 5, false])('Should not render with invalid "items" property: %s', async items => {
      expect.assertions(1);
      try {
        await getPage({ ...baseProps, items });
      } catch (err) {
        expect(err.message).toEqual(`<mg-input-combobox> prop "items" values must be the same type, string or Option. Passed value: ${toString(items)}.`);
      }
    });

    test('Should not render with invalid "items" property', async () => {
      expect.assertions(1);
      try {
        await getPage({ ...baseProps, fetchurl: '/url' });
      } catch (err) {
        expect(err.message).toEqual(`<mg-input-combobox> prop "items" values cannot be use with "fetchurl" prop defined. Passed value: ${toString(items)}.`);
      }
    });

    test('Should not render with undefined "fetchmappings" property', async () => {
      expect.assertions(1);
      try {
        await getPage({ ...baseProps, items: undefined, fetchurl });
      } catch (err) {
        expect(err.message).toEqual(`<mg-input-combobox> prop "fetchmappings" is required with "fetchurl" prop.`);
      }
    });

    test.each([undefined, null, ''])('Should not render with missing "fetchmappings" property, prop %s', async fetchmappings => {
      expect.assertions(1);
      try {
        await getPage({ ...baseProps, items: undefined, fetchurl, fetchmappings });
      } catch (err) {
        expect(err.message).toEqual(`<mg-input-combobox> prop \"fetchmappings\" is required with \"fetchurl\" prop.`);
      }
    });
    test.each([
      {},
      { hello: '' },
      ...[null, undefined, 1, [], ''].flatMap(value => [{ request: value }, { response: value }, { request: value, response: value }, { request: value, response: value }]),
      ...[null, undefined, 1, [], {}].flatMap(value => [
        {
          request: {
            filter: value,
          },
          response: { ...ResponseMapping },
        },
        {
          request: { ...RequestMapping },
          response: {
            ...ResponseMapping,
            total: value,
          },
        },
        {
          request: { ...RequestMapping },
          response: {
            ...ResponseMapping,
            next: value,
          },
        },
        {
          request: { ...RequestMapping },
          response: {
            ...ResponseMapping,
            items: value,
          },
        },
        {
          request: { ...RequestMapping },
          response: {
            ...ResponseMapping,
            itemTitle: value,
          },
        },
      ]),
      ...[null, 1, [], {}].flatMap(value => [
        {
          request: { ...RequestMapping },
          response: {
            ...ResponseMapping,
            itemValue: value,
          },
        },
      ]),
    ])('Should not render with invalid "fetchmappings" property', async fetchmappings => {
      expect.assertions(1);
      try {
        await getPage({ ...baseProps, items: undefined, fetchurl, fetchmappings });
      } catch (err) {
        expect(err.message).toEqual(
          `<mg-input-combobox> prop "fetchmappings" value must be { request: RequestMappingType, response: ResponseMappingType }. Passed value: ${toString(fetchmappings)}.`,
        );
      }
    });

    test.each(['hello', []])('Should not render with invalid "fetchoptions" property', async fetchoptions => {
      try {
        initFetchSpy(objectItems);
        await getPage({ ...baseProps, items: undefined, fetchurl, fetchmappings, fetchoptions });
      } catch (err) {
        expect(err.message).toEqual(`<mg-input-combobox> prop "fetchoptions" value must be a valid RequestInit. Passed value: ${toString(fetchoptions)}.`);
      }
    });
  });

  describe('Components methods', () => {
    describe('setFocus()', () => {
      test("should trigger input focus method with setFocus component's public method", async () => {
        const page = await getPage({ ...baseProps });
        const element = page.doc.querySelector('mg-input-combobox');
        const input = element.shadowRoot.querySelector('input');

        input.focus = jest.fn();

        await element.setFocus();

        await page.waitForChanges();

        expect(input.focus).toHaveBeenCalled();
      });
    });
    describe('reset()', () => {
      test('Should reset value', async () => {
        const page = await getPage({
          ...baseProps,
        });
        const element = page.doc.querySelector('mg-input-combobox');
        const input = element.shadowRoot.querySelector('input');

        // Simulate input with invalid value
        input.value = 'joker';
        input.dispatchEvent(new CustomEvent('input', { bubbles: true }));
        await page.waitForChanges();

        // run debounce
        jest.runOnlyPendingTimers();
        await page.waitForChanges();

        // click en first item
        element.shadowRoot.querySelector('li').dispatchEvent(new MouseEvent('click', { bubbles: true }));
        await page.waitForChanges();

        // Verify initial value is set
        expect(element.value).toEqual('joker');

        // Call reset method
        await element.reset();
        await page.waitForChanges();

        // Verify value has been reset
        expect(element.value).toEqual('');
      });

      test('Should reset error message when error is displayed', async () => {
        const page = await getPage({
          ...baseProps,
        });
        const element = page.doc.querySelector('mg-input-combobox');

        // Set error message
        await element.setError(false, "Message d'erreur de test");
        await page.waitForChanges();

        // Verify error state
        expect(page.root).toMatchSnapshot();

        // Call reset method
        await element.reset();
        await page.waitForChanges();

        // Verify reset state
        expect(page.root).toMatchSnapshot();
      });

      test('Should not reset value when readonly', async () => {
        const page = await getPage({
          ...baseProps,
          readonly: true,
          value: 'batman',
        });
        const element = page.doc.querySelector('mg-input-combobox');

        // Capture initial value
        const initialValue = element.value;

        // Try to reset
        await element.reset();
        await page.waitForChanges();

        // Verify value remains unchanged
        expect(element.value).toEqual(initialValue);
      });
    });

    describe('setError()', () => {
      test.each([
        {
          valid: true,
          errorMessage: 'Override error',
        },
        {
          valid: false,
          errorMessage: 'Override error',
        },
      ])("should display override error with setError component's public method", async params => {
        const page = await getPage({ ...baseProps, required: true });

        expect(page.root).toMatchSnapshot();

        const element = page.doc.querySelector('mg-input-combobox');
        const input = element.shadowRoot.querySelector('input');

        //mock validity
        Object.defineProperty(input, 'validity', {
          get: () => ({}),
        });

        await element.setError(params.valid, params.errorMessage);

        await page.waitForChanges();

        expect(page.root).toMatchSnapshot();
      });

      test.each([
        {
          valid: '',
          errorMessage: 'Override error',
          error: '<mg-input-combobox> method "setError()" param "valid" must be a boolean.',
        },
        {
          valid: undefined,
          errorMessage: 'Override error',
          error: '<mg-input-combobox> method "setError()" param "valid" must be a boolean.',
        },
        {
          valid: true,
          errorMessage: ' ',
          error: '<mg-input-combobox> method "setError()" param "errorMessage" must be a string.',
        },
        {
          valid: true,
          errorMessage: true,
          error: '<mg-input-combobox> method "setError()" param "errorMessage" must be a string.',
        },
      ])("shloud throw error with setError component's public method invalid params", async params => {
        expect.assertions(1);
        try {
          const page = await getPage({ ...baseProps, required: true });
          const element = page.doc.querySelector('mg-input-combobox');

          await element.setError(params.valid as unknown as boolean, params.errorMessage as unknown as string);
          await page.waitForChanges();
        } catch (err) {
          expect(err.message).toEqual(params.error);
        }
      });
    });

    describe('displayError()', () => {
      test("display error with displayError component's public method", async () => {
        const page = await getPage({ ...baseProps, required: true });

        expect(page.root).toMatchSnapshot();

        const element = page.doc.querySelector('mg-input-combobox');
        const input = element.shadowRoot.querySelector('input');

        //mock validity
        input.checkValidity = jest.fn(() => false);
        Object.defineProperty(input, 'validity', {
          get: jest.fn(() => ({
            valueMissing: true,
          })),
        });

        await element.displayError();

        await page.waitForChanges();

        expect(page.root).toMatchSnapshot();
      });
    });
  });

  describe('input events', () => {
    test.each([
      { items },
      { items: objectItems },
      { items: undefined, fetchurl, fetchmappings },
      { items: undefined, fetchurl, fetchmappings: { ...fetchmappings, response: { ...fetchmappings.response, itemValue: undefined } } },
    ])('Should handle option click, case props %s', async props => {
      const page = await getPage({ ...baseProps, ...props });
      const element = page.doc.querySelector('mg-input-combobox');
      const input = element.shadowRoot.querySelector('input');

      //mock validity
      input.checkValidity = jest.fn().mockReturnValue(true);
      Object.defineProperty(input, 'validity', {
        get: jest.fn(),
      });

      input.dispatchEvent(new CustomEvent('focusin', { bubbles: true }));
      await page.waitForChanges();

      // filter list
      input.value = 'jok';
      input.dispatchEvent(new CustomEvent('input', { bubbles: true }));
      await page.waitForChanges();
      // run debounce
      jest.runOnlyPendingTimers();
      await page.waitForChanges();

      // select option
      element.shadowRoot.querySelector('li').dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await page.waitForChanges();

      // update value
      input.dispatchEvent(new CustomEvent('blur', { bubbles: true }));
      await page.waitForChanges();

      // On blur the hasDisplayedError status change
      if (props.items && typeof props.items[0] === 'string') {
        expect(page.rootInstance.value).toEqual('joker');
      } else {
        expect(page.rootInstance.value).toMatchSnapshot();
      }
      expect(element.shadowRoot.querySelector('mg-popover').display).toEqual(false);
    });
    test('Should handle reset button', async () => {
      const page = await getPage({ ...baseProps, value: 'joker' });
      const element = page.doc.querySelector('mg-input-combobox');
      const input = element.shadowRoot.querySelector('input');
      const resetButton = element.shadowRoot.querySelector('input + mg-button');
      // Verify initial value is set
      expect(element.value).toEqual('joker');

      // add input focus spy
      const focusSpy = jest.spyOn(input, 'focus');

      // Call reset method
      resetButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await page.waitForChanges();

      // Verify value has been reset and input.focus() call
      expect(element.value).toEqual('');
      expect(focusSpy).toHaveBeenCalled();
    });
    test('Should handle element element focusin', async () => {
      const page = await getPage({ ...baseProps });
      const element = page.doc.querySelector('mg-input-combobox');
      const popover = element.shadowRoot.querySelector('mg-popover');
      const button = element.shadowRoot.querySelector('mg-button');

      button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      expect(popover.display).toEqual(true);

      element.shadowRoot.querySelector('mg-input').dispatchEvent(new MouseEvent('focusin', { bubbles: true }));
      expect(popover.display).toEqual(true);
    });
    test('Should handle filter input', async () => {
      const page = await getPage({ ...baseProps, value: 'joker' });
      const element = page.doc.querySelector('mg-input-combobox');
      const input = element.shadowRoot.querySelector('input');
      const popover = element.shadowRoot.querySelector('mg-popover');

      // popover initialize with false
      expect(popover.display).toEqual(false);

      // Call input event
      input.value = 'joke';
      input.dispatchEvent(new MouseEvent('input', { bubbles: true }));
      await page.waitForChanges();

      // run debounce
      jest.runOnlyPendingTimers();
      await page.waitForChanges();

      // Verify initial value is set and popover to be displaied
      expect(element.value).toEqual('joker');
      expect(popover.display).toEqual(true);
    });
    test('Should handle filter input with debounce', async () => {
      const page = await getPage({ ...baseProps, value: 'joker' });
      const element = page.doc.querySelector('mg-input-combobox');
      const input = element.shadowRoot.querySelector('input');
      const popover = element.shadowRoot.querySelector('mg-popover');
      const spy = jest.spyOn(page.rootInstance, 'loadingWrapper');
      // test intial loadingWrapper call times
      expect(spy).toHaveBeenCalledTimes(0);

      // popover initialize with false
      expect(popover.display).toEqual(false);

      // Call input event
      input.value = 'j';
      input.dispatchEvent(new MouseEvent('input', { bubbles: true }));
      await page.waitForChanges();
      // test debounce prevent loading before it ending
      expect(spy).toHaveBeenCalledTimes(1);

      input.value = 'jo';
      input.dispatchEvent(new MouseEvent('input', { bubbles: true }));
      await page.waitForChanges();
      input.value = 'jok';
      input.dispatchEvent(new MouseEvent('input', { bubbles: true }));
      await page.waitForChanges();
      input.value = 'joke';
      input.dispatchEvent(new MouseEvent('input', { bubbles: true }));
      await page.waitForChanges();

      // run debounce
      jest.runOnlyPendingTimers();
      await page.waitForChanges();

      // test loading was run after debounce
      expect(spy).toHaveBeenCalledTimes(2);

      // Verify initial value is set and popover to be displaied
      expect(element.value).toEqual('joker');
      expect(popover.display).toEqual(true);
    });
    test('Should handle input blur', async () => {
      const page = await getPage({ ...baseProps, value: 'joker' });
      const element = page.doc.querySelector('mg-input-combobox');
      const input = element.shadowRoot.querySelector('input');
      const popover = element.shadowRoot.querySelector('mg-popover');

      // popover initialize with false
      expect(popover.display).toEqual(false);

      // Call input blur
      input.dispatchEvent(new MouseEvent('blur', { bubbles: true }));
      await page.waitForChanges();

      expect(popover.display).toEqual(false);
      expect(input.value).toEqual('joker');

      // Call input focus
      input.dispatchEvent(new KeyboardEvent('keydown', { key: Keys.DOWN }));
      jest.runOnlyPendingTimers();
      await page.waitForChanges();

      // Verify initial value is set and popover to be displaied
      expect(popover.display).toEqual(true);

      // Call input blur
      input.dispatchEvent(new KeyboardEvent('keydown', { key: Keys.ENTER }));
      await page.waitForChanges();

      // Verify popover to be hidden
      expect(popover.display).toEqual(false);
      expect(input.value).toEqual('joker');

      // Call input focus
      input.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      jest.runOnlyPendingTimers();
      await page.waitForChanges();

      // Verify initial value is set and popover to be displaied
      expect(popover.display).toEqual(true);

      // Call input blur
      input.dispatchEvent(new KeyboardEvent('keydown', { key: Keys.ENTER }));
      await page.waitForChanges();

      // Verify popover to be hidden
      expect(popover.display).toEqual(false);
      expect(input.value).toEqual('joker');

      // Call input focus
      input.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      jest.runOnlyPendingTimers();
      await page.waitForChanges();

      // Verify initial value is set and popover to be displaied
      expect(popover.display).toEqual(true);

      // Call input blur
      input.dispatchEvent(new MouseEvent('blur', { bubbles: true }));
      await page.waitForChanges();

      // Verify popover to be hidden
      expect(popover.display).toEqual(true);
      expect(input.value).toEqual('joker');
    });
    test.each([undefined, 'joker', 'hello'])('Should handle popover display, case value %s', async value => {
      const page = await getPage({ ...baseProps, value });
      const element = page.doc.querySelector('mg-input-combobox');
      const button = element.shadowRoot.querySelector('mg-button:last-of-type');
      const popover = element.shadowRoot.querySelector('mg-popover');
      const spyScrollToIndex = jest.spyOn(page.rootInstance, 'scrollToIndex');
      // display popover
      button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await page.waitForChanges();

      expect(popover.display).toEqual(value === undefined);
      expect(spyScrollToIndex).toHaveBeenCalled();
    });
    test('Should handle filter input with not found value', async () => {
      const page = await getPage({ ...baseProps, items, value: items[2] });
      const element = page.doc.querySelector('mg-input-combobox');
      const input = element.shadowRoot.querySelector('input');
      const popover = element.shadowRoot.querySelector('mg-popover');
      const getOptions = () => Array.from(element.shadowRoot.querySelectorAll('li'));

      // popover initialize with false
      expect(popover.display).toEqual(false);
      expect(getOptions().length).toEqual(1);

      // Call input event
      input.value = '';
      input.dispatchEvent(new MouseEvent('input', { bubbles: true }));
      await page.waitForChanges();
      // run debounce
      jest.runOnlyPendingTimers();
      await page.waitForChanges();

      expect(getOptions().length).toEqual(element.items.length);
      expect(element.value).toEqual('joker');
      expect(popover.display).toEqual(true);

      // Call input event
      input.value = 'hello';
      input.dispatchEvent(new MouseEvent('input', { bubbles: true }));
      await page.waitForChanges();
      // run debounce
      jest.runOnlyPendingTimers();
      await page.waitForChanges();

      expect(getOptions().length).toEqual(0);
      expect(element.value).toEqual('joker');
    });
    test('Should handle load-more button', async () => {
      const page = await getPage({ ...baseProps, items: initArray(15) });
      const element = page.doc.querySelector('mg-input-combobox');
      const input = element.shadowRoot.querySelector('input');
      const button = element.shadowRoot.querySelector('mg-button:last-of-type');
      const getOptions = () => Array.from(element.shadowRoot.querySelectorAll('li'));

      // define spys
      const spyLoadingWrapper = jest.spyOn(page.rootInstance, 'loadingWrapper');
      const spyInputFocus = jest.spyOn(input, 'focus');
      expect(getOptions().length).toEqual(10);

      // display options
      button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await page.waitForChanges();

      // load more items
      element.shadowRoot.querySelector('.mg-c-input__load-more').dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await page.waitForChanges();

      // Verify initial value is set and popover to be displaied
      expect(spyLoadingWrapper).toHaveBeenCalledWith(expect.objectContaining({ name: 'load-more' }));
      expect(spyInputFocus).toHaveBeenCalled();
      expect(getOptions().length).toEqual(element.items.length);
    });

    test.each([
      null,
      { results: initArray(15).map(item => ({ title: item, value: item })), total: 15 },
      { results: initArray(15).map(item => ({ title: item, value: item })), total: 25, next: new URL(`${fetchurl}/next?param=value`) },
      { results: initArray(15).map(item => ({ title: item, value: item })), total: 25, next: '/next' },
      { results: initArray(15).map(item => ({ title: item, value: item })), total: 25, next: '/error' },
      { results: initArray(15).map(item => ({ title: item, value: item })), total: 25, next: '/next?param=value' },
      { results: initArray(15).map(item => ({ title: item, value: item })), total: 25, next: `${fetchurl}/next?param=value` },
    ])('Should handle load-more button with API fetch', async overrides => {
      const page = await getPage({ ...baseProps, items: undefined, fetchurl, fetchmappings }, overrides);
      const element = page.doc.querySelector('mg-input-combobox');
      const button = element.shadowRoot.querySelector('mg-button:last-of-type');
      const getOptions = () => Array.from(element.shadowRoot.querySelectorAll('li'));
      const spy = jest.spyOn(page.rootInstance.fetchError, 'emit');

      // define spys
      const spyLoadingWrapper = jest.spyOn(page.rootInstance, 'loadingWrapper');
      expect(getOptions().length).toEqual(overrides ? 15 : 0);

      // display options
      button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await page.waitForChanges();

      // load more items
      const loadMoreButton = element.shadowRoot.querySelector('.mg-c-input__load-more');

      if (!overrides) {
        expect(loadMoreButton).toBeNull();
        expect(spyLoadingWrapper).not.toHaveBeenCalled();
        expect(getOptions().length).toEqual(0);
      } else if (overrides.total === 15) {
        expect(loadMoreButton).toEqual(null);
      } else {
        const isError = typeof overrides.next === 'string' && overrides.next === '/error';
        const status = 404;
        const statusText = 'not found';
        if (isError) {
          jest.spyOn(global, 'fetch').mockResolvedValue(
            Promise.resolve({
              ok: false,
              status,
              statusText,
            } as Response),
          );
        }
        loadMoreButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        await page.waitForChanges();
        if (isError) {
          expect(spy).toHaveBeenCalledWith(expect.objectContaining({ message: `${status} - ${statusText}` }));
        }
        // Verify initial value is set and popover to be displaied
        expect(spyLoadingWrapper).toHaveBeenCalledWith(expect.objectContaining({ name: 'load-more' }));
        expect(getOptions().length).toEqual(isError ? 15 : 30);
      }
    });

    test('Should emit error when fetch API throw an error', async () => {
      const error = { message: "can't parse URL" };
      const page = await getPage({ ...baseProps, items: undefined, fetchurl, fetchmappings });
      const element = page.doc.querySelector('mg-input-combobox');
      const spy = jest.spyOn(page.rootInstance.fetchError, 'emit');

      jest.spyOn(global, 'fetch').mockRejectedValue(error);
      element.fetchurl = 'error';
      await page.waitForChanges();

      expect(spy).toHaveBeenCalledWith(error);
    });

    test('Should handle load-more with button and display mg-loader', async () => {
      const page = await getPage(
        { ...baseProps, items: undefined, fetchurl, fetchmappings },
        { results: initArray(15).map(item => ({ title: item, value: item })), total: 25, next: '/next' },
      );
      const element = page.doc.querySelector('mg-input-combobox');
      const button = element.shadowRoot.querySelector('mg-button:last-of-type');
      const getOptions = () => Array.from(element.shadowRoot.querySelectorAll('li'));
      expect(getOptions().length).toEqual(15);

      // define spys
      const spyLoadingWrapper = jest.spyOn(page.rootInstance, 'loadingWrapper');
      setUpRequestAnimationFrameMock(() => {});

      // display options
      button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await page.waitForChanges();

      // load more items
      const loadMoreButton = element.shadowRoot.querySelector('.mg-c-input__load-more');

      loadMoreButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await page.waitForChanges();
      // snapshot with loader
      expect(spyLoadingWrapper).toHaveBeenCalledWith(expect.objectContaining({ name: 'load-more' }));
      expect(element.shadowRoot.querySelector('mg-loader')).not.toEqual(null);
      expect(page.root).toMatchSnapshot();

      // flush promise
      jest.runOnlyPendingTimers();
      await page.waitForChanges();

      // Verify initial value is set and popover to be displaied
      expect(element.shadowRoot.querySelector('mg-loader')).toEqual(null);
      expect(page.root).toMatchSnapshot();
    });

    describe('keyboard', () => {
      test.each(Object.values(Keys))('Should handle input "%s" keyboard key, prevent action with ctrlKey', async key => {
        const page = await getPage({ ...baseProps, items: initArray(15) });
        const element = page.doc.querySelector('mg-input-combobox');
        const input = element.shadowRoot.querySelector('input');

        // display options
        input.dispatchEvent(new KeyboardEvent('keydown', { key, ctrlKey: true }));
        await page.waitForChanges();

        expect(page.root).toMatchSnapshot();
      });
      test.each(Object.values(Keys))('Should handle input "%s" keyboard key, prevent action with shiftKey', async key => {
        const page = await getPage({ ...baseProps, items: initArray(15) });
        const element = page.doc.querySelector('mg-input-combobox');
        const input = element.shadowRoot.querySelector('input');

        // display options
        input.dispatchEvent(new KeyboardEvent('keydown', { key, shiftKey: true }));
        await page.waitForChanges();

        expect(page.root).toMatchSnapshot();
      });
      test.each(Object.values(Keys))('Should handle input "%s" keyboard key, prevent action with disabled input', async key => {
        const page = await getPage({ ...baseProps, items: initArray(15), disabled: true });
        const element = page.doc.querySelector('mg-input-combobox');
        const input = element.shadowRoot.querySelector('input');

        // display options
        input.dispatchEvent(new KeyboardEvent('keydown', { key }));
        await page.waitForChanges();

        expect(page.root).toMatchSnapshot();
      });
      describe.each([true, false])('altKey: %s', altKey => {
        test.each([Keys.DOW, Keys.ARROWDOWN, Keys.UP, Keys.ARROWUP])('Should handle input "%s" keyboard key', async key => {
          const page = await getPage({ ...baseProps, items: initArray(15) });
          const element = page.doc.querySelector('mg-input-combobox');
          const input = element.shadowRoot.querySelector('input');

          // display options
          input.dispatchEvent(new KeyboardEvent('keydown', { key, altKey }));
          await page.waitForChanges();

          // render isloading
          jest.runOnlyPendingTimers();
          await page.waitForChanges();

          expect(page.root).toMatchSnapshot();

          // navigate throw options
          input.dispatchEvent(new KeyboardEvent('keydown', { key, altKey }));
          await page.waitForChanges();

          expect(page.root).toMatchSnapshot();
        });
      });
      test.each([Keys.DOW, Keys.ARROWDOWN, Keys.UP, Keys.ARROWUP])('Should handle input "%s" keyboard key without items', async key => {
        const page = await getPage({ ...baseProps, items: [] });
        const element = page.doc.querySelector('mg-input-combobox');
        const input = element.shadowRoot.querySelector('input');

        // display options
        input.dispatchEvent(new KeyboardEvent('keydown', { key }));
        await page.waitForChanges();

        // render isloading
        jest.runOnlyPendingTimers();
        await page.waitForChanges();

        expect(page.root).toMatchSnapshot();

        // navigate throw options
        input.dispatchEvent(new KeyboardEvent('keydown', { key }));
        await page.waitForChanges();

        expect(page.root).toMatchSnapshot();
      });
      test.each([Keys.LEFT, Keys.ARROWLEFT, Keys.HOME, Keys.RIGHT, Keys.ARROWRIGHT, Keys.END])('Should handle input "%s" keyboard key', async key => {
        const page = await getPage({ ...baseProps, items: initArray(15) });
        const element = page.doc.querySelector('mg-input-combobox');
        const input = element.shadowRoot.querySelector('input');
        input.setSelectionRange = jest.fn();

        // do nothing
        input.dispatchEvent(new KeyboardEvent('keydown', { key }));
        await page.waitForChanges();

        expect(page.root).toMatchSnapshot();

        // display options
        input.dispatchEvent(new KeyboardEvent('keydown', { key: Keys.DOWN }));
        await page.waitForChanges();

        // render isloading
        jest.runOnlyPendingTimers();
        await page.waitForChanges();

        // navigate throw input chars
        input.dispatchEvent(new KeyboardEvent('keydown', { key }));
        await page.waitForChanges();

        expect(page.root).toMatchSnapshot();

        input.value = 'hello';
        input.dispatchEvent(new CustomEvent('input', { bubbles: true }));
        await page.waitForChanges();
        // run debounce
        jest.runOnlyPendingTimers();
        await page.waitForChanges();

        // navigate throw input chars
        input.dispatchEvent(new KeyboardEvent('keydown', { key }));
        await page.waitForChanges();

        if ([Keys.HOME, Keys.END].includes(key)) {
          expect(input.setSelectionRange).toHaveBeenCalled();
        }
        expect(page.root).toMatchSnapshot();
      });
      test('Should handle input "DOWN" keyboard key and trigger load-more items', async () => {
        const key = Keys.DOWN;
        const page = await getPage({ ...baseProps, items: initArray(15) });
        const element = page.doc.querySelector('mg-input-combobox');
        const input = element.shadowRoot.querySelector('input');
        const getOptions = () => Array.from(element.shadowRoot.querySelectorAll('li'));
        expect(getOptions().length).toEqual(10);

        const spyLoadingWrapper = jest.spyOn(page.rootInstance, 'loadingWrapper');
        const spyInputFocus = jest.spyOn(input, 'focus');

        // open popover
        input.dispatchEvent(new KeyboardEvent('keydown', { key }));
        jest.runOnlyPendingTimers();
        await page.waitForChanges();

        // nvigate throw item and trigger load more
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        for (const _ of element.items) {
          input.dispatchEvent(new KeyboardEvent('keydown', { key }));
          jest.runOnlyPendingTimers();
          await page.waitForChanges();
          // render loader
          jest.runOnlyPendingTimers();
          await page.waitForChanges();
        }

        expect(spyLoadingWrapper).toHaveBeenCalledWith(expect.objectContaining({ name: 'scroll', cursor: Cursor.NEXT }));
        expect(spyLoadingWrapper).toHaveBeenCalledWith(expect.objectContaining({ name: 'load-more', cursor: Cursor.NEXT }));
        expect(spyInputFocus).toHaveBeenCalled();
        expect(getOptions().length).toEqual(element.items.length);
        expect(page.root).toMatchSnapshot();
      });
      test.each([Keys.ESC, Keys.ESCAPE])('Should handle input "%s" keyboard key', async key => {
        const page = await getPage({ ...baseProps, items: initArray(15) });
        const element = page.doc.querySelector('mg-input-combobox');
        const input = element.shadowRoot.querySelector('input');

        // do nothing
        input.dispatchEvent(new KeyboardEvent('keydown', { key }));
        await page.waitForChanges();

        expect(page.root).toMatchSnapshot();

        // display options
        input.dispatchEvent(new KeyboardEvent('keydown', { key: Keys.DOWN }));
        jest.runOnlyPendingTimers();
        await page.waitForChanges();

        // render isloading
        jest.runOnlyPendingTimers();
        await page.waitForChanges();

        // close popover and set value to first index
        input.dispatchEvent(new KeyboardEvent('keydown', { key }));
        await page.waitForChanges();
        expect(page.root).toMatchSnapshot();
      });
      test.each([Keys.TAB, Keys.ENTER])('Should handle input "%s" keyboard key', async key => {
        const page = await getPage({ ...baseProps, items: initArray(15), value: '1' });
        const element = page.doc.querySelector('mg-input-combobox');
        const input = element.shadowRoot.querySelector('input');

        // clear input
        input.dispatchEvent(new KeyboardEvent('keydown', { key }));
        await page.waitForChanges();

        expect(page.root).toMatchSnapshot();

        // display options
        input.dispatchEvent(new KeyboardEvent('keydown', { key: Keys.DOWN }));
        jest.runOnlyPendingTimers();
        await page.waitForChanges();

        // render isloading
        jest.runOnlyPendingTimers();
        await page.waitForChanges();

        // close popover and set value
        input.dispatchEvent(new KeyboardEvent('keydown', { key }));
        await page.waitForChanges();
        expect(page.root).toMatchSnapshot();
        expect(element.value).toEqual('1');
      });
      test.each([Keys.TAB, Keys.ENTER])('Should handle input "%s" keyboard key without value', async key => {
        const page = await getPage({ ...baseProps, items: [] });
        const element = page.doc.querySelector('mg-input-combobox');
        const input = element.shadowRoot.querySelector('input');

        // clear input
        input.dispatchEvent(new KeyboardEvent('keydown', { key }));
        await page.waitForChanges();

        expect(page.root).toMatchSnapshot();

        // display options
        input.dispatchEvent(new KeyboardEvent('keydown', { key: Keys.DOWN }));
        jest.runOnlyPendingTimers();
        await page.waitForChanges();

        // render isloading
        jest.runOnlyPendingTimers();
        await page.waitForChanges();

        // close popover and set value
        input.dispatchEvent(new KeyboardEvent('keydown', { key }));
        await page.waitForChanges();
        expect(page.root).toMatchSnapshot();
      });
      test('Should handle input "h" keyboard key', async () => {
        const key = 'H';
        const page = await getPage({ ...baseProps, items: initArray(15), value: '1' });
        const element = page.doc.querySelector('mg-input-combobox');
        const input = element.shadowRoot.querySelector('input');

        // clear input
        input.dispatchEvent(new KeyboardEvent('keydown', { key }));
        await page.waitForChanges();

        expect(page.root).toMatchSnapshot();

        // display options
        input.dispatchEvent(new KeyboardEvent('keydown', { key: Keys.DOWN }));
        jest.runOnlyPendingTimers();
        await page.waitForChanges();

        // render isloading
        jest.runOnlyPendingTimers();
        await page.waitForChanges();

        // reset visual focus
        input.dispatchEvent(new KeyboardEvent('keydown', { key }));
        await page.waitForChanges();
        expect(page.root).toMatchSnapshot();
      });
    });
  });
});
