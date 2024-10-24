import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { localeNumber, toString } from '@mgdis/stencil-helpers';
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
      test.each([{}, { readonly: true }])('args %s', async args => {
        const { root } = await getPage({ ...args, label: 'label', identifier: 'identifier', type, format, value: '1234567890' });
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
    ])('Should return error when value does not match min and max setting (%s)', async args => {
      const page = await getPage(args);
      const decimalLeft = type === 'decimal' ? 2 : undefined;

      const element = page.doc.querySelector('mg-input-numeric');
      const input = element.shadowRoot.querySelector('input');

      input.checkValidity = jest.fn(() => true);

      input.dispatchEvent(new CustomEvent('blur', { bubbles: true }));
      await page.waitForChanges();

      if (args.min !== undefined && args.max === undefined) {
        expect(page.rootInstance.errorMessage).toEqual(
          messages.errors.numeric.min.replace('{min}', localeNumber(args.min, 'en', decimalLeft)).replace('{max}', localeNumber(args.max, 'en', decimalLeft)),
        );
      } else if (args.min === undefined && args.max !== undefined) {
        expect(page.rootInstance.errorMessage).toEqual(
          messages.errors.numeric.max.replace('{min}', localeNumber(args.min, 'en', decimalLeft)).replace('{max}', localeNumber(args.max, 'en', decimalLeft)),
        );
      } else if (args.min !== undefined && args.max !== undefined) {
        expect(page.rootInstance.errorMessage).toEqual(
          messages.errors.numeric.minMax.replace('{min}', localeNumber(args.min, 'en', decimalLeft)).replace('{max}', localeNumber(args.max, 'en', decimalLeft)),
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

  it('should manage negative number', async () => {
    const args = { label: 'label', identifier: 'identifier' };
    const page = await getPage(args);

    const element = page.doc.querySelector('mg-input-numeric');
    const input = element.shadowRoot.querySelector('input');

    input.checkValidity = jest.fn(() => true);

    /**
     * update input value
     * @param value - to update input with
     */
    const updateInputValue = async (value: string): Promise<void> => {
      input.value = value;
      input.dispatchEvent(new CustomEvent('input', { bubbles: true }));
      await page.waitForChanges();

      input.dispatchEvent(new CustomEvent('blur', { bubbles: true }));
      await page.waitForChanges();
    };

    for await (const newValue of ['-', '-5']) {
      await updateInputValue(newValue);
      expect(input.value).toEqual(newValue === '-' ? '' : '-5.00');
      expect(page.rootInstance.valid).toEqual(true);
      expect(page.rootInstance.invalid).toEqual(false);
    }
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
});
