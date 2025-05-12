import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { localeNumber, localeUnit, setUpRequestAnimationFrameMock, toString } from '@mgdis/stencil-helpers';
import { MgInputNumeric } from '../mg-input-numeric';
import { MgButton } from '../../../../atoms/mg-button/mg-button';
import { MgIcon } from '../../../../atoms/mg-icon/mg-icon';
import messages from '../../../../../locales/en/messages.json';
import { formats, types } from '../mg-input-numeric.conf';
import { MgInput } from '../../mg-input/mg-input';
import { MgInputTitle } from '../../../../atoms/internals/mg-input-title/mg-input-title';
import { tooltipPositions } from '../../mg-input/mg-input.conf';

const getPage = (args, slot?) => {
  const page = newSpecPage({
    components: [MgInputNumeric, MgButton, MgIcon, MgInput, MgInputTitle],
    template: () => <mg-input-numeric {...args}>{slot}</mg-input-numeric>,
  });
  jest.runAllTimers();
  setUpRequestAnimationFrameMock(jest.runOnlyPendingTimers);
  return page;
};

describe('mg-input-numeric', () => {
  beforeEach(() => jest.useFakeTimers({ legacyFakeTimers: true }));
  afterEach(() => {
    jest.runOnlyPendingTimers();
  });
  describe.each(types)('type %s', type => {
    test.each([
      {},
      { labelHide: true },
      { labelOnTop: true },
      { readonly: true },
      { readonly: true, labelOnTop: true, tooltip: 'Tooltip message' },
      { readonly: true, value: '1234567890' },
      { readonly: true, value: '1234567890' },
      { readonly: true, tooltip: 'tooltip', tooltipPosition: 'input' },
      { disabled: true, tooltip: 'tooltip', tooltipPosition: 'input', value: '1234567890' },
      { required: true, value: '1234567890', helpText: 'My help text' },
      { required: true, readonly: true, value: '1234567890', helpText: 'My help text' },
      { required: true, disabled: true, value: '1234567890', helpText: 'My help text' },
      { tooltip: 'My Tooltip Message' },
      { tooltip: 'My Tooltip Message', labelOnTop: true },
      { tooltip: 'My Tooltip Message', tooltipPosition: 'label' },
      { tooltip: 'My Tooltip Message', tooltipPosition: 'input', labelOnTop: true },
      { value: '1234567890', currency: 'EUR' },
      { value: '1234567890', lang: 'fr' },
      { value: '1234567890', lang: 'xx' },
      { readonly: true, value: '1234567890', lang: 'fr' },
      { readonly: true, value: '1234567890', lang: 'xx' },
    ])('Should render with args %s:', async args => {
      const { root } = await getPage({ label: 'label', identifier: 'identifier', type, ...args });
      expect(root).toMatchSnapshot();
    });

    describe.each(formats)('Format %s', format => {
      test.each([
        {
          args: {
            // Add default unit for 'unit' format tests
            ...(format === 'unit' ? { unit: 'meter', unitDisplay: 'short' } : {}),
          },
        },
        {
          args: {
            readonly: true,
            // Add default unit for 'unit' format tests
            ...(format === 'unit' ? { unit: 'meter', unitDisplay: 'short' } : {}),
          },
        },
      ])('args %s', async ({ args }) => {
        const { root } = await getPage({
          ...args,
          label: 'label',
          identifier: 'identifier',
          type,
          format,
          value: '1234567890',
        });
        expect(root).toMatchSnapshot();
      });
    });

    test('Should update display value when value props change', async () => {
      const page = await getPage({ label: 'label', identifier: 'identifier', type });
      const element = page.doc.querySelector('mg-input-numeric');

      expect(page.root).toMatchSnapshot();

      element.value = '10';
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();
    });

    describe.each([false, true])('readonly %s', readonly => {
      test.each([
        <mg-button slot="append-input" label="search">
          <mg-icon icon="calculator"></mg-icon> Calculate
        </mg-button>,
        <span slot="append-input">km</span>,
      ])('Should render with slot', async slot => {
        const args = { label: 'label', identifier: 'identifier', type, readonly, value: 3 };
        const { root } = await getPage(args, slot);
        expect(root).toMatchSnapshot();
      });
    });

    test.each(['', ' ', undefined])('Should not render with invalid identifier property: %s', async identifier => {
      expect.assertions(1);
      try {
        await getPage({ identifier });
      } catch (err) {
        expect(err.message).toEqual(`<mg-input> prop "identifier" is required and must be a string. Passed value: ${identifier}.`);
      }
    });

    test('Should log an error with invalid "identifier" property', async () => {
      const identifier = '{{batman}}';
      const spy = jest.spyOn(console, 'error');
      expect.assertions(1);

      try {
        await getPage({ identifier, label: 'test' });
      } catch {
        expect(spy).toHaveBeenCalledWith(`<mg-input> prop "identifier" value is invalid. Passed value: ${identifier}.`);
      }
    });

    test.each(['', ' ', undefined])('Should throw error with invalid label property: %s', async label => {
      expect.assertions(1);
      try {
        await getPage({ identifier: 'identifier', label, type });
      } catch (err) {
        expect(err.message).toEqual(`<mg-input> prop "label" is required and must be a string. Passed value: ${label}.`);
      }
    });

    test('Should throw an error with labelOnTop & labelHide set to true', async () => {
      expect.assertions(1);
      try {
        await getPage({ identifier: 'identifier', label: 'batman', labelOnTop: true, labelHide: true });
      } catch (err) {
        expect(err.message).toEqual('<mg-input> prop "labelOnTop" must not be paired with the prop "labelHide".');
      }
    });

    test.each(['blu', {}, 5, false])('Should not render with invalid tooltipPosition property: %s', async tooltipPosition => {
      expect.assertions(1);
      try {
        await getPage({ identifier: 'identifier', label: 'label', tooltipPosition });
      } catch (err) {
        expect(err.message).toEqual(`<mg-input> prop "tooltipPosition" must be one of: ${tooltipPositions.join(', ')}. Passed value: ${toString(tooltipPosition)}.`);
      }
    });

    test('Should throw an error with non positive integer length value', async () => {
      expect.assertions(1);
      try {
        await getPage({ identifier: 'identifier', label: 'label', integerLength: 0 });
      } catch (err) {
        expect(err.message).toEqual(`<mg-input-numeric> prop "integer-length" must be a positive number. Passed value: 0.`);
      }
    });

    test('Should throw an error with non positive decimal length value', async () => {
      expect.assertions(1);
      try {
        await getPage({ identifier: 'identifier', label: 'label', decimalLength: 0 });
      } catch (err) {
        expect(err.message).toEqual(`<mg-input-numeric> prop "decimal-length" must be a positive number, consider using prop "type" to "integer" instead. Passed value: 0.`);
      }
    });

    test('Should throw an error with unknown format value', async () => {
      expect.assertions(1);
      try {
        await getPage({ identifier: 'identifier', label: 'label', format: 'blu' });
      } catch (err) {
        expect(err.message).toEqual(`<mg-input-numeric> prop "format" must be one of: ${formats.join(', ')}. Passed value: blu.`);
      }
    });

    test('Should trigger events', async () => {
      const inputValue = '1234567890';
      const args = { label: 'label', identifier: 'identifier', type, helpText: 'My help text' };
      const page = await getPage(args);

      const element = page.doc.querySelector('mg-input-numeric');
      const input = element.shadowRoot.querySelector('input');

      //mock validity
      input.checkValidity = jest.fn(() => true);
      Object.defineProperty(input, 'validity', {
        get: jest.fn(() => ({
          valueMissing: false,
        })),
      });

      jest.spyOn(page.rootInstance.valueChange, 'emit');
      const inputValidSpy = jest.spyOn(page.rootInstance.inputValid, 'emit');

      input.dispatchEvent(new CustomEvent('focus', { bubbles: true }));
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot(); //Snapshot on focus

      input.value = inputValue;
      input.dispatchEvent(new CustomEvent('input', { bubbles: true }));
      await page.waitForChanges();
      expect(page.rootInstance.valueChange.emit).toHaveBeenCalledWith(parseFloat(inputValue));

      input.dispatchEvent(new CustomEvent('blur', { bubbles: true }));
      await page.waitForChanges();
      expect(inputValidSpy).toHaveBeenCalledTimes(1);
    });

    test.each([{ min: 0.1, max: 0.1 }, { min: 0.1 }, { max: 0.1 }])('Should keep validity on input update', async ({ min, max }) => {
      const inputValue = max > 0 ? '1' : '0';
      const page = await getPage({ label: 'label', identifier: 'identifier', type, min, max });

      const element = page.doc.querySelector('mg-input-numeric');
      const input = element.shadowRoot.querySelector('input');

      //mock validity
      const rangeUnderflow = () => min === undefined || Number(input.value) >= Number(element.min);
      const rangeOverflow = () => max === undefined || Number(input.value) <= Number(element.max);
      input.checkValidity = jest.fn(() => rangeUnderflow() && rangeOverflow());
      Object.defineProperty(input, 'validity', {
        get: jest.fn(() => ({
          rangeUnderflow: rangeUnderflow(),
          rangeOverflow: rangeOverflow(),
        })),
      });

      jest.spyOn(page.rootInstance.valueChange, 'emit');
      const inputValidSpy = jest.spyOn(page.rootInstance.inputValid, 'emit');

      input.dispatchEvent(new CustomEvent('focus', { bubbles: true }));
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot(); //Snapshot on focus

      input.value = inputValue;
      input.dispatchEvent(new CustomEvent('input', { bubbles: true }));
      await page.waitForChanges();
      expect(element.valid).toEqual(false);
      expect(page.rootInstance.valueChange.emit).toHaveBeenCalledWith(parseFloat(inputValue));

      input.dispatchEvent(new CustomEvent('blur', { bubbles: true }));
      await page.waitForChanges();
      expect(inputValidSpy).toHaveBeenCalledTimes(1);
      expect(element.valid).toEqual(false);
    });

    describe.each(['readonly', 'disabled'])('validity, case next state is %s', nextState => {
      test.each([
        { validity: true, valueMissing: false },
        { validity: false, valueMissing: true },
      ])('validity (%s)', async ({ validity, valueMissing }) => {
        const args = { label: 'label', identifier: 'identifier', type };
        const page = await getPage(args);

        const element = page.doc.querySelector('mg-input-numeric');
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

    test.each([
      { label: 'label', identifier: 'identifier', type, min: 10, max: undefined, value: 5 },
      { label: 'label', identifier: 'identifier', type, min: undefined, max: 10, value: 20 },
      { label: 'label', identifier: 'identifier', type, min: 10, max: 20, value: 5 },
      { label: 'label', identifier: 'identifier', type, min: 10, max: 20, value: 25 },
      { label: 'label', identifier: 'identifier', type, min: 10.5, max: undefined, value: 5 },
      { label: 'label', identifier: 'identifier', type, min: undefined, max: 10.5, value: 20 },
      { label: 'label', identifier: 'identifier', type, min: 10.5, max: 20.5, value: 5 },
      { label: 'label', identifier: 'identifier', type, min: 10.5, max: 20.5, value: 25 },
    ])('Should return error when value does not match min and max setting (%s)', async args => {
      const page = await getPage(args);
      const element = page.doc.querySelector('mg-input-numeric');
      const input = element.shadowRoot.querySelector('input');

      input.checkValidity = jest.fn(() => true);

      input.dispatchEvent(new CustomEvent('blur', { bubbles: true }));
      await page.waitForChanges();

      const hasDecimals = [args.min, args.max].some(val => val !== undefined && !Number.isInteger(val));
      const decimalLeft = type === 'decimal' && hasDecimals ? 2 : 0;

      if (args.min !== undefined && args.max === undefined) {
        expect(page.rootInstance.errorMessage).toEqual(
          messages.input.numeric.helpText.min.replace('{min}', localeNumber(args.min, 'en', decimalLeft)).replace('{max}', localeNumber(args.max, 'en', decimalLeft)),
        );
      } else if (args.min === undefined && args.max !== undefined) {
        expect(page.rootInstance.errorMessage).toEqual(
          messages.input.numeric.helpText.max.replace('{min}', localeNumber(args.min, 'en', decimalLeft)).replace('{max}', localeNumber(args.max, 'en', decimalLeft)),
        );
      } else if (args.min !== undefined && args.max !== undefined) {
        expect(page.rootInstance.errorMessage).toEqual(
          messages.input.numeric.helpText.minMax.replace('{min}', localeNumber(args.min, 'en', decimalLeft)).replace('{max}', localeNumber(args.max, 'en', decimalLeft)),
        );
      }

      expect(page.rootInstance.valid).toEqual(false);
      expect(page.rootInstance.invalid).toEqual(true);

      // as nullish value is a '' we set a null value with ''
      input.value = '';
      input.dispatchEvent(new CustomEvent('input', { bubbles: true }));
      await page.waitForChanges();

      input.dispatchEvent(new CustomEvent('blur', { bubbles: true }));
      await page.waitForChanges();

      expect(page.rootInstance.valid).toEqual(true);
      expect(page.rootInstance.invalid).toEqual(false);
    });

    test('Should filter entered value', async () => {
      const inputValue = '1';
      const args = { label: 'label', identifier: 'identifier', type, helpText: 'My help text' };
      const page = await getPage(args);

      const element = page.doc.querySelector('mg-input-numeric');
      const input = element.shadowRoot.querySelector('input');

      //mock validity
      input.checkValidity = jest.fn(() => true);

      jest.spyOn(page.rootInstance.valueChange, 'emit');

      input.value = 'a';
      input.dispatchEvent(new CustomEvent('input', { bubbles: true }));
      await page.waitForChanges();
      expect(page.rootInstance.valueChange.emit).toHaveBeenCalledWith(null);

      input.value = inputValue;
      input.dispatchEvent(new CustomEvent('input', { bubbles: true }));
      await page.waitForChanges();
      expect(page.rootInstance.valueChange.emit).toHaveBeenCalledWith(parseFloat(inputValue));

      input.value = `${inputValue}a`;
      input.dispatchEvent(new CustomEvent('input', { bubbles: true }));
      await page.waitForChanges();
      expect(page.rootInstance.valueChange.emit).toHaveBeenCalledWith(parseFloat(inputValue));
    });

    test("display error with displayError component's public method", async () => {
      const page = await getPage({ label: 'label', identifier: 'identifier', required: true });

      expect(page.root).toMatchSnapshot();

      const element = page.doc.querySelector('mg-input-numeric');
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
    const page = await getPage({ label: 'label', identifier: 'identifier', required: true });

    expect(page.root).toMatchSnapshot();

    const element = page.doc.querySelector('mg-input-numeric');
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
      error: '<mg-input-numeric> method "setError()" param "valid" must be a boolean.',
    },
    {
      valid: undefined,
      errorMessage: 'Override error',
      error: '<mg-input-numeric> method "setError()" param "valid" must be a boolean.',
    },
    {
      valid: true,
      errorMessage: ' ',
      error: '<mg-input-numeric> method "setError()" param "errorMessage" must be a string.',
    },
    {
      valid: true,
      errorMessage: true,
      error: '<mg-input-numeric> method "setError()" param "errorMessage" must be a string.',
    },
  ])("shloud throw error with setError component's public method invalid params", async params => {
    expect.assertions(1);
    try {
      const page = await getPage({ label: 'label', identifier: 'identifier', required: true });
      const element = page.doc.querySelector('mg-input-numeric');

      await element.setError(params.valid as unknown as boolean, params.errorMessage as unknown as string);
      await page.waitForChanges();
    } catch (err) {
      expect(err.message).toEqual(params.error);
    }
  });

  test.each(['', 'blu'])('Should throw error with invalid type property: %s', async type => {
    expect.assertions(1);
    try {
      await getPage({ identifier: 'identifier', label: 'Blu', type });
    } catch (err) {
      expect(err.message).toEqual(`<mg-input-numeric> prop "type" must be one of: ${types.join(', ')}. Passed value: ${type}.`);
    }
  });

  test.each(['fr', 'xx'])('display error message with locale: %s', async lang => {
    const page = await getPage({ label: 'label', identifier: 'identifier', required: true, lang });
    const element = page.doc.querySelector('mg-input-numeric');
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

  test('Should remove error on input', async () => {
    const page = await getPage({ label: 'label', identifier: 'identifier', required: true });
    const element = page.doc.querySelector('mg-input-numeric');
    const input = element.shadowRoot.querySelector('input');

    //mock validity
    input.checkValidity = jest.fn().mockReturnValueOnce(false).mockReturnValueOnce(false).mockReturnValueOnce(true).mockReturnValueOnce(true);
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

    input.value = 'blu';
    input.dispatchEvent(new CustomEvent('input', { bubbles: true }));
    await page.waitForChanges();

    expect(page.rootInstance.hasDisplayedError).toEqual(true);
    expect(page.rootInstance.errorMessage).toBeUndefined();

    input.dispatchEvent(new CustomEvent('blur', { bubbles: true }));
    await page.waitForChanges();

    expect(page.rootInstance.hasDisplayedError).toEqual(false);
  });

  test('Should remove error on input when required change dynamically', async () => {
    const page = await getPage({ label: 'label', identifier: 'identifier', required: true });
    const element = page.doc.querySelector('mg-input-numeric');
    const input = element.shadowRoot.querySelector('input');

    //mock validity
    input.checkValidity = jest.fn().mockReturnValueOnce(false).mockReturnValueOnce(false).mockReturnValueOnce(true).mockReturnValueOnce(true);
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

  test.each([
    { value: '-', expected: '' },
    { value: '-5', expected: '-5.00' },
    { value: '-0', expected: '-0.00' },
    { value: '-0,', expected: '-0.00' },
    { value: '-0,0', expected: '-0.00' },
    { value: '-0,00', expected: '-0.00' },
  ])('Should manage negative number', async ({ value, expected }) => {
    const args = { label: 'label', identifier: 'identifier' };
    const page = await getPage(args);

    const element = page.doc.querySelector('mg-input-numeric');
    const input = element.shadowRoot.querySelector('input');

    input.checkValidity = jest.fn(() => true);

    input.value = value;
    input.dispatchEvent(new CustomEvent('input', { bubbles: true }));
    await page.waitForChanges();

    input.dispatchEvent(new CustomEvent('blur', { bubbles: true }));
    await page.waitForChanges();

    expect(input.value).toEqual(expected);
    expect(page.rootInstance.valid).toEqual(true);
    expect(page.rootInstance.invalid).toEqual(false);
  });

  describe('validity, case update min/max prop value', () => {
    test.each([
      {
        value: 3,
        min: 2,
        next: 1,
      },
      {
        value: 1,
        min: 2,
        next: 1,
      },
      {
        value: 1,
        max: 2,
        next: 3,
      },
      {
        value: 3,
        max: 2,
        next: 3,
      },
    ])('value %s', async ({ min, max, value, next }) => {
      const page = await getPage({ label: 'label', identifier: 'identifier', value });

      const element = page.doc.querySelector('mg-input-numeric');
      const input = element.shadowRoot.querySelector('input');

      //mock validity
      const rangeUnderflow = () => min === undefined || Number(input.value) >= Number(element.min);
      const rangeOverflow = () => max === undefined || Number(input.value) <= Number(element.max);
      input.checkValidity = jest.fn(() => rangeUnderflow() && rangeOverflow());
      Object.defineProperty(input, 'validity', {
        get: jest.fn(() => ({
          rangeUnderflow: rangeUnderflow(),
          rangeOverflow: rangeOverflow(),
        })),
      });

      jest.runOnlyPendingTimers();

      expect(element.valid).toEqual(true);
      expect(page.root).toMatchSnapshot(); // no error displayed

      input.dispatchEvent(new CustomEvent('blur', { bubbles: true }));
      await page.waitForChanges();

      expect(element.valid).toEqual(true);
      expect(page.root).toMatchSnapshot(); // no error displayed

      if (min !== undefined) element.min = min;
      if (max !== undefined) element.max = max;
      input.dispatchEvent(new CustomEvent('blur', { bubbles: true }));
      await page.waitForChanges();

      expect(element.valid).toEqual(input.checkValidity());
      expect(page.root).toMatchSnapshot(); // error displayed if !element.valid

      if (min !== undefined) element.min = next;
      if (max !== undefined) element.max = next;
      await page.waitForChanges();

      expect(element.valid).toEqual(true);
      expect(page.root).toMatchSnapshot(); // no error displayed
    });
  });

  test('Should update mg-width', async () => {
    const page = await getPage({ label: 'label', identifier: 'identifier' });
    const element = page.doc.querySelector('mg-input-numeric');

    element.mgWidth = 2;
    await page.waitForChanges();

    expect(page.root).toMatchSnapshot();

    element.mgWidth = 4;
    await page.waitForChanges();

    expect(page.root).toMatchSnapshot();

    element.mgWidth = 16;
    await page.waitForChanges();

    expect(page.root).toMatchSnapshot();

    element.mgWidth = 'full';
    await page.waitForChanges();

    expect(page.root).toMatchSnapshot();
  });

  describe('reset method', () => {
    test('Should reset value', async () => {
      const page = await getPage({
        label: 'label',
        identifier: 'identifier',
      });
      const element = page.doc.querySelector('mg-input-numeric');
      const input = element.shadowRoot.querySelector('input');

      // Set a value
      input.value = '5';
      input.dispatchEvent(new CustomEvent('input', { bubbles: true }));
      await page.waitForChanges();

      // Verify initial state
      expect(element.value).toEqual('5');

      // Call reset method
      await element.reset();
      await page.waitForChanges();

      // Verify value has been reset
      expect(element.value).toEqual('');
    });

    test('Should reset error message when error is displayed', async () => {
      const page = await getPage({
        label: 'label',
        identifier: 'identifier',
      });
      const element = page.doc.querySelector('mg-input-numeric');

      // Set error message
      await element.setError(false, "Message d'erreur de test");
      await page.waitForChanges();

      // Verify initial state
      expect(page.root).toMatchSnapshot();

      // Call reset method
      await element.reset();
      await page.waitForChanges();

      // Verify reset state
      expect(page.root).toMatchSnapshot();
    });

    test('Should not reset when readonly', async () => {
      const page = await getPage({
        label: 'label',
        identifier: 'identifier',
        readonly: true,
        value: '42',
      });
      const element = page.doc.querySelector('mg-input-numeric');

      // Capture initial value
      const initialValue = element.value;

      // Try to reset
      await element.reset();
      await page.waitForChanges();

      // Verify value remains unchanged
      expect(element.value).toEqual(initialValue);
    });
  });

  test.each([
    { value: '42', lang: 'fr' },
    { value: '42', lang: 'en' },
    { value: '123.45', lang: 'fr' },
    { value: '123.45', lang: 'en' },
    { value: '0.42', lang: 'fr' },
    { value: '0.42', lang: 'en' },
  ])('Should format percentage value correctly for locale %s', async ({ value, lang }) => {
    const page = await getPage({
      label: 'label',
      identifier: 'identifier',
      value,
      lang,
      format: 'percent',
    });

    const element = page.doc.querySelector('mg-input-numeric');
    const input = element.shadowRoot.querySelector('input');

    input.dispatchEvent(new CustomEvent('blur', { bubbles: true }));
    await page.waitForChanges();

    // Format according to locale
    const number = localeNumber(parseFloat(value), lang, 2);
    const expectedValue = lang === 'fr' ? `${number} %` : `${number}%`;

    // Normalize spaces before comparison
    expect(input.value.replace(/\s/g, ' ')).toBe(expectedValue.replace(/\s/g, ' '));
  });

  describe('localeUnit', () => {
    test.each([
      // Length units tests
      [1000, 'fr', 'meter', 'short', 2, '1 000,00 m'],
      [1000, 'fr', 'meter', 'long', 2, '1 000,00 mètres'],
      [1000, 'fr', 'meter', 'narrow', 2, '1 000,00m'],

      // Volume units tests
      [25.5, 'fr', 'liter', 'short', 1, '25,5 l'],
      [25.5, 'fr', 'liter', 'long', 1, '25,5 litres'],
      [25.5, 'fr', 'liter', 'narrow', 1, '25,5l'],

      // Mass units tests
      [500, 'fr', 'kilogram', 'short', 0, '500 kg'],
      [500, 'fr', 'kilogram', 'long', 0, '500 kilogrammes'],
      [500, 'fr', 'kilogram', 'narrow', 0, '500kg'],

      // Tests with English locale
      [1000, 'en', 'meter', 'short', 2, '1,000.00 m'],
      [25.5, 'en', 'liter', 'long', 1, '25.5 liters'],
      [500, 'en', 'kilogram', 'narrow', 0, '500kg'],
    ])('Should format %s %s with unit %s in %s display with %s decimals', (value, locale, unit, unitDisplay, decimals, expected) => {
      const result = localeUnit(value, locale, unit, unitDisplay as Intl.NumberFormatOptions['unitDisplay'], decimals);
      // Normalize spaces before comparison
      expect(result.replace(/\s/g, ' ')).toBe(expected.replace(/\s/g, ' '));
    });

    test('Should throw error with invalid unit', () => {
      type Unit = 'meter' | 'liter' | 'kilogram';
      expect(() => {
        localeUnit(100, 'fr', 'invalidUnit' as Unit, 'short', 2);
      }).toThrow();
    });
  });

  test.each([
    // Test with custom helpText
    {
      args: { helpText: 'Custom help text' },
      expected: 'Custom help text',
    },
    // Tests with min only
    {
      args: { min: 10 },
      expected: 'The value must be greater than or equal to 10',
    },
    {
      args: { min: 10, format: 'currency', currency: 'EUR' },
      expected: 'The value must be greater than or equal to 10',
    },
    {
      args: { min: 10, format: 'percent' },
      expected: 'The value must be greater than or equal to 10',
    },
    // Tests with max only
    {
      args: { max: 100 },
      expected: 'The value must be less than or equal to 100',
    },
    {
      args: { max: 100, format: 'currency', currency: 'EUR' },
      expected: 'The value must be less than or equal to 100',
    },
    {
      args: { max: 100, format: 'percent' },
      expected: 'The value must be less than or equal to 100',
    },
    // Tests with min and max
    {
      args: { min: 10, max: 100 },
      expected: 'The value must be between 10 and 100',
    },
    {
      args: { min: 10, max: 100, format: 'currency', currency: 'EUR' },
      expected: 'The value must be between 10 and 100',
    },
    {
      args: { min: 10, max: 100, format: 'percent' },
      expected: 'The value must be between 10 and 100',
    },
    // Tests with readonly or disabled
    {
      args: { min: 10, max: 100, readonly: true },
      expected: '',
    },
    {
      args: { min: 10, max: 100, disabled: true },
      expected: 'The value must be between 10 and 100',
    },
    // Tests with different locales
    {
      args: { min: 10, max: 100, lang: 'fr' },
      expected: 'La valeur doit être comprise entre 10 et 100',
    },
    {
      args: { min: 10, max: 100, format: 'currency', currency: 'EUR', lang: 'fr' },
      expected: 'La valeur doit être comprise entre 10 et 100',
    },
    {
      args: { min: 10, max: 100, format: 'percent', lang: 'fr' },
      expected: 'La valeur doit être comprise entre 10 et 100',
    },
    // Test with both custom helpText and min/max
    {
      args: { helpText: 'Custom help text', min: 10, max: 100 },
      expected: 'Custom help text<br>The value must be between 10 and 100',
    },
    {
      args: { helpText: "Texte d'aide personnalisé", min: 10, max: 100, lang: 'fr' },
      expected: "Texte d'aide personnalisé<br>La valeur doit être comprise entre 10 et 100",
    },
  ])('Should format help text with args: $args', async ({ args, expected }) => {
    const page = await getPage({
      label: 'label',
      identifier: 'identifier',
      ...args,
    });
    const element = page.doc.querySelector('mg-input-numeric');

    // Verify the formatted help text using the slot content
    const helpText = element.shadowRoot.querySelector('[slot="help-text"]');

    if (args.readonly) {
      expect(helpText).toBeNull();
    } else {
      expect(helpText.innerHTML.replace(/\s+/g, ' ')).toBe(expected.replace(/\s+/g, ' '));
    }
  });
});
