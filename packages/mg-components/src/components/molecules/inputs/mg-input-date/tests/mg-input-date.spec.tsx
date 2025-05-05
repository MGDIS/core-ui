import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgInputDate } from '../mg-input-date';
import messages from '../../../../../locales/en/messages.json';
import { localeDate, setUpRequestAnimationFrameMock, toString } from '@mgdis/core-ui-helpers/stencil';
import { MgInput } from '../../mg-input/mg-input';
import { MgInputTitle } from '../../../../atoms/internals/mg-input-title/mg-input-title';
import { tooltipPositions } from '../../mg-input/mg-input.conf';

const getPage = args => {
  const page = newSpecPage({
    components: [MgInputDate, MgInput, MgInputTitle],
    template: () => <mg-input-date {...args}></mg-input-date>,
  });
  jest.runAllTimers();
  setUpRequestAnimationFrameMock(jest.runOnlyPendingTimers);
  return page;
};

const date = {
  first: '2021-01-01',
  middle: '2022-01-01',
  last: '2023-01-01',
};

const rangeUnderflow = ({ value, min }: HTMLInputElement): boolean => [value, min].every(attr => Boolean(attr)) && new Date(value) < new Date(min);
const rangeOverflow = ({ value, max }: HTMLInputElement): boolean => [value, max].every(attr => Boolean(attr)) && new Date(value) > new Date(max);
const checkValidityFromRange = (input: HTMLInputElement): boolean => !(rangeUnderflow(input) || rangeOverflow(input));

describe('mg-input-date', () => {
  beforeEach(() => jest.useFakeTimers({ legacyFakeTimers: true }));
  afterEach(() => {
    jest.runOnlyPendingTimers();
  });
  /**
   * Snapshots
   */
  test.each([
    {},
    { labelHide: true },
    { labelOnTop: true },
    { readonly: true },
    { readonly: true, labelOnTop: true, tooltip: 'Tooltip message' },
    { readonly: true, value: '2022-06-02' },
    { readonly: true, tooltip: 'tooltip', tooltipPosition: 'input' },
    { readonly: true, tooltip: 'tooltip', tooltipPosition: 'input', value: '2022-06-02' },
    { required: true, value: '2022-06-02', helpText: 'My help text' },
    { required: true, readonly: true, value: '2022-06-02', helpText: 'My help text' },
    { required: true, disabled: true, value: '2022-06-02', helpText: 'My help text' },
    { helpText: 'My help text use pattern {pattern} for date: {date}. {defaultHelpText}' },
    { tooltip: 'My Tooltip Message' },
    { tooltip: 'My Tooltip Message', labelOnTop: true },
    { tooltip: 'My Tooltip Message', tooltipPosition: 'label' },
    { tooltip: 'My Tooltip Message', tooltipPosition: 'input', labelOnTop: true },
    { readonly: true, value: '2022-06-02', lang: 'fr' },
    { readonly: true, value: '2022-06-02', lang: 'xx' },
  ])('Should render with args %s:', async args => {
    const { root } = await getPage({ label: 'label', identifier: 'identifier', ...args });
    expect(root).toMatchSnapshot();
  });

  /**
   * Test
   */

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

  test.each(['', ' ', undefined])('Should throw an error with invalid label property: %s', async label => {
    expect.assertions(1);
    try {
      await getPage({ identifier: 'identifier', label });
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

  test.each([' ', new Date('31-12-2022')])('Should throw an error with invalid value property: %s', async value => {
    expect.assertions(1);
    try {
      await getPage({ identifier: 'identifier', label: 'label', value });
    } catch (err) {
      expect(err.message).toEqual(`<mg-input-date> props 'value' must be a valid string. Passed value: ${toString(value)}.`);
    }
  });

  test('Should emit null value when receive an empty string', async () => {
    const args = { label: 'label', identifier: 'identifier', helpText: 'My help text' };
    const page = await getPage(args);

    const element = page.doc.querySelector('mg-input-date');
    const input = element.shadowRoot.querySelector('input');

    //mock validity
    input.checkValidity = jest.fn(() => true);
    Object.defineProperty(input, 'validity', {
      get: () => ({
        valueMissing: false,
        badInput: false,
        rangeUnderflow: false,
        rangeOverflow: false,
      }),
    });

    jest.spyOn(page.rootInstance.valueChange, 'emit');

    input.dispatchEvent(new CustomEvent('focus', { bubbles: true }));
    await page.waitForChanges();

    input.value = '';
    input.dispatchEvent(new CustomEvent('input', { bubbles: true }));
    await page.waitForChanges();
    const emittedValue = null;
    expect(page.rootInstance.valueChange.emit).toHaveBeenCalledWith(emittedValue);

    // update value with blank string must trigger only one `value-change` event
    element.value = emittedValue;
    await page.waitForChanges();

    expect(page.rootInstance.valueChange.emit).toHaveBeenCalledTimes(1);
  });

  test('Should display a badInput message on a required field with a non-existing date', async () => {
    const args = { label: 'label', identifier: 'identifier', required: true };
    const page = await getPage(args);

    const element = page.doc.querySelector('mg-input-date');
    const input = element.shadowRoot.querySelector('input');

    //mock validity
    input.checkValidity = jest.fn(() => false);
    Object.defineProperty(input, 'validity', {
      get: () => ({
        valueMissing: true,
        badInput: true,
        rangeUnderflow: false,
        rangeOverflow: false,
      }),
    });

    input.dispatchEvent(new CustomEvent('blur', { bubbles: true }));
    await page.waitForChanges();

    expect(page.root).toMatchSnapshot();
  });

  test('Should trigger events', async () => {
    const inputValue = '2021-10-14';
    const args = { label: 'label', identifier: 'identifier', helpText: 'My help text' };
    const page = await getPage(args);

    const element = page.doc.querySelector('mg-input-date');
    const input = element.shadowRoot.querySelector('input');

    //mock validity
    input.checkValidity = jest.fn(() => true);
    Object.defineProperty(input, 'validity', {
      get: () => ({
        valueMissing: false,
        badInput: false,
        rangeUnderflow: false,
        rangeOverflow: false,
      }),
    });

    jest.spyOn(page.rootInstance.valueChange, 'emit');
    const inputValidSpy = jest.spyOn(page.rootInstance.inputValid, 'emit');

    input.dispatchEvent(new CustomEvent('focus', { bubbles: true }));
    await page.waitForChanges();

    expect(page.root).toMatchSnapshot(); //Snapshot on focus

    input.value = inputValue;
    input.dispatchEvent(new CustomEvent('input', { bubbles: true }));
    await page.waitForChanges();
    expect(page.rootInstance.valueChange.emit).toHaveBeenCalledWith(inputValue);

    input.dispatchEvent(new CustomEvent('blur', { bubbles: true }));
    await page.waitForChanges();
    expect(inputValidSpy).toHaveBeenCalledTimes(1);
  });

  test.each(['Delete', 'Backspace'])('Should override %s keyboard event', async key => {
    const page = await getPage({ label: 'label', identifier: 'identifier', value: '2021-10-14' });

    const element = page.doc.querySelector('mg-input-date');
    const input = element.shadowRoot.querySelector('input');

    //mock validity
    input.checkValidity = jest.fn(() => true);
    Object.defineProperty(input, 'validity', {
      get: () => ({
        valueMissing: false,
        badInput: false,
        rangeUnderflow: false,
        rangeOverflow: false,
      }),
    });

    const inputValidSpy = jest.spyOn(page.rootInstance.inputValid, 'emit');
    const spyInputEvent = jest.spyOn(element, 'oninput');

    input.dispatchEvent(new CustomEvent('focus', { bubbles: true }));
    await page.waitForChanges();

    expect(page.root).toMatchSnapshot(); //Snapshot on focus

    input.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key }));
    await page.waitForChanges();

    input.dispatchEvent(new CustomEvent('blur', { bubbles: true }));
    await page.waitForChanges();

    expect(input.checkValidity).toHaveBeenCalledTimes(2);
    expect(inputValidSpy).toHaveBeenCalledTimes(1);
    expect(inputValidSpy).toHaveBeenCalledWith(true);
    expect(input.value).toEqual('');
    expect(spyInputEvent).not.toHaveBeenCalled();
  });

  test('Should override keyboard event even if display error', async () => {
    const page = await getPage({ label: 'label', identifier: 'identifier', value: '20212-10-14' });

    const element = page.doc.querySelector('mg-input-date');
    const input = element.shadowRoot.querySelector('input');

    //mock validity
    input.checkValidity = jest.fn(() => true);
    Object.defineProperty(input, 'validity', {
      get: () => ({
        valueMissing: false,
        badInput: false,
        rangeUnderflow: false,
        rangeOverflow: false,
      }),
    });

    input.dispatchEvent(new CustomEvent('blur', { bubbles: true }));
    await page.waitForChanges();

    expect(page.root).toMatchSnapshot(); //Snapshot on focus

    input.dispatchEvent(new CustomEvent('focus', { bubbles: true }));
    await page.waitForChanges();

    input.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'Delete' }));
    await page.waitForChanges();

    input.dispatchEvent(new CustomEvent('blur', { bubbles: true }));
    await page.waitForChanges();

    expect(page.root).toMatchSnapshot(); // No error should be display
  });

  describe.each(['readonly', 'disabled'])('validity, case next state is %s', nextState => {
    test.each([
      { validity: true, valueMissing: false, badInput: false },
      { validity: false, valueMissing: true, badInput: false },
      { validity: false, valueMissing: false, badInput: true },
      { validity: false, valueMissing: false, badInput: true, min: date.first },
    ])('validity (%s)', async ({ validity, valueMissing, badInput, min }) => {
      const args = { label: 'label', identifier: 'identifier', min };
      const page = await getPage(args);

      const element = page.doc.querySelector('mg-input-date');
      const input = element.shadowRoot.querySelector('input');

      //mock validity
      input.checkValidity = jest.fn(() => validity);
      Object.defineProperty(input, 'validity', {
        get: () => ({
          valueMissing,
          badInput,
          rangeUnderflow: rangeUnderflow(input),
          rangeOverflow: rangeOverflow(input),
        }),
      });

      input.dispatchEvent(new CustomEvent('blur', { bubbles: true }));
      await page.waitForChanges();

      if (validity) {
        expect(page.rootInstance.errorMessage).toBeUndefined();
      } else if (valueMissing) {
        expect(page.rootInstance.errorMessage).toEqual(messages.errors.required);
      } else if (badInput) {
        expect(page.rootInstance.errorMessage).toEqual(
          messages.input.date.error.badInput
            .replace('{pattern}', '<span aria-hidden="true">mm/dd/yyyy</span><span class="mg-u-visually-hidden">m m / d d / y y y y</span>')
            .replace('{date}', '12/24/2025'),
        );
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

  describe('validity, case update min/max prop value', () => {
    test.each([
      {
        value: '2024-03-01',
        min: '2024-02-01',
        next: '2024-01-01',
      },
      {
        value: '2024-01-01',
        min: '2024-02-01',
        next: '2024-01-01',
      },
      {
        value: '2024-01-01',
        max: '2024-02-01',
        next: '2024-03-01',
      },
      {
        value: '2024-03-01',
        max: '2024-02-01',
        next: '2024-03-01',
      },
    ])('value (%s)', async ({ min, max, value, next }) => {
      const page = await getPage({ label: 'label', identifier: 'identifier', value });

      const element = page.doc.querySelector('mg-input-date');
      const input = element.shadowRoot.querySelector('input');

      //mock validity
      input.checkValidity = jest.fn(() => checkValidityFromRange(input));
      Object.defineProperty(input, 'validity', {
        get: () => ({
          rangeUnderflow: rangeUnderflow(input),
          rangeOverflow: rangeOverflow(input),
        }),
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

  test.each([
    {
      args: { readonly: true },
      expected: undefined,
    },
    {
      args: { helpText: undefined },
      expected: 'Expected format: <span aria-hidden="true">mm/dd/yyyy</span><span class="mg-u-visually-hidden">m m / d d / y y y y</span> (ex: 12/24/2025)',
    },
    {
      args: { min: '2023-01-01' },
      expected:
        'Expected format: <span aria-hidden="true">mm/dd/yyyy</span><span class="mg-u-visually-hidden">m m / d d / y y y y</span> (ex: 12/24/2025)<br>The date must be after 1/1/2023',
    },
    {
      args: { max: '2026-12-31' },
      expected:
        'Expected format: <span aria-hidden="true">mm/dd/yyyy</span><span class="mg-u-visually-hidden">m m / d d / y y y y</span> (ex: 12/24/2025)<br>The date must be before 12/31/2026',
    },
    {
      args: { min: '2023-01-01', max: '2026-12-31' },
      expected:
        'Expected format: <span aria-hidden="true">mm/dd/yyyy</span><span class="mg-u-visually-hidden">m m / d d / y y y y</span> (ex: 12/24/2025)<br>The date must be between 1/1/2023 and 12/31/2026',
    },
    {
      args: { helpText: 'Custom help text', min: '2023-01-01' },
      expected: 'Custom help text<br>The date must be after 1/1/2023',
    },
    {
      args: { helpText: 'Custom help text', max: '2026-12-31' },
      expected: 'Custom help text<br>The date must be before 12/31/2026',
    },
    {
      args: { helpText: 'Custom help text', min: '2023-01-01', max: '2026-12-31' },
      expected: 'Custom help text<br>The date must be between 1/1/2023 and 12/31/2026',
    },
    {
      args: { helpText: "Texte d'aide personnalisé", min: '2023-01-01', max: '2026-12-31', lang: 'fr' },
      expected: "Texte d'aide personnalisé<br>La date doit être comprise entre le 1/1/2023 et le 12/31/2026",
    },
  ])('Should format help text with args: $args', async ({ args, expected }) => {
    const page = await getPage({ label: 'label', identifier: 'identifier', ...args });
    const element = page.doc.querySelector('mg-input-date');

    // Verify the formatted help text
    const helpText = element.shadowRoot.querySelector('[slot="help-text"]');

    if (expected === undefined) {
      expect(helpText).toBeNull();
    } else {
      expect(helpText.innerHTML.replace(/\s+/g, ' ')).toBe(expected.replace(/\s+/g, ' '));
    }
  });

  test.each([2020, '2021', '31-12-2022', '2022-02-24T08:01:44.460Z'])('Should display error with invalid value, case value="%s"', async value => {
    const page = await getPage({ label: 'label', identifier: 'identifier' });

    const element = page.doc.querySelector('mg-input-date');
    const input = element.shadowRoot.querySelector('input');

    //mock validity
    input.checkValidity = jest.fn(() => checkValidityFromRange(input));
    Object.defineProperty(input, 'validity', {
      get: () => ({
        rangeUnderflow: rangeUnderflow(input),
        rangeOverflow: rangeOverflow(input),
      }),
    });

    jest.runOnlyPendingTimers();

    expect(element.valid).toEqual(true);
    expect(page.root).toMatchSnapshot(); // no error displayed

    input.value = value as string;
    input.dispatchEvent(new CustomEvent('input', { bubbles: true }));
    await page.waitForChanges();

    input.dispatchEvent(new CustomEvent('blur', { bubbles: true }));
    await page.waitForChanges();

    expect(element.valid).toEqual(false);
    expect(page.root).toMatchSnapshot(); // error displayed
  });

  test.each([
    { min: date.middle, max: undefined, value: date.first },
    { min: undefined, max: date.middle, value: date.last },
    { min: date.middle, max: date.last, value: date.first },
    { min: date.first, max: date.middle, value: date.last },
  ])('Should return error when value does not match min and max setting (%s)', async args => {
    const page = await getPage({ label: 'label', identifier: 'identifier', ...args });

    const element = page.doc.querySelector('mg-input-date');
    const input = element.shadowRoot.querySelector('input');

    //mock validity
    input.checkValidity = jest.fn(() => checkValidityFromRange(input));
    Object.defineProperty(input, 'validity', {
      get: () => ({
        rangeUnderflow: rangeUnderflow(input),
        rangeOverflow: rangeOverflow(input),
      }),
    });

    jest.runOnlyPendingTimers();

    input.dispatchEvent(new CustomEvent('blur', { bubbles: true }));
    await page.waitForChanges();

    if (args.min !== undefined && args.max === undefined) {
      expect(page.rootInstance.errorMessage).toEqual(messages.input.date.helpText.min.replace('{min}', localeDate(date.middle, 'en')));
    } else if (args.min === undefined && args.max !== undefined) {
      expect(page.rootInstance.errorMessage).toEqual(messages.input.date.helpText.max.replace('{max}', localeDate(date.middle, 'en')));
    } else if (args.min !== undefined && args.max !== undefined && args.value === date.first) {
      expect(page.rootInstance.errorMessage).toEqual(
        messages.input.date.helpText.minMax.replace('{min}', localeDate(date.middle, 'en')).replace('{max}', localeDate(date.last, 'en')),
      );
    } else if (args.min !== undefined && args.max !== undefined && args.value === date.last) {
      expect(page.rootInstance.errorMessage).toEqual(
        messages.input.date.helpText.minMax.replace('{min}', localeDate(date.first, 'en')).replace('{max}', localeDate(date.middle, 'en')),
      );
    }

    expect(page.rootInstance.valid).toEqual(false);
    expect(page.rootInstance.invalid).toEqual(true);
  });
  test.each([
    { min: '2022/01/01', max: undefined },
    { min: '01/01/2022', max: undefined },
    { min: '2022', max: undefined },
    { min: undefined, max: '2022/01/01' },
    { min: undefined, max: '01/01/2022' },
    { min: undefined, max: '2022' },
  ])('Should return error when value does not match min and max setting (%s)', async minMax => {
    expect.assertions(1);
    try {
      await getPage({
        label: 'label',
        identifier: 'identifier',
        ...minMax,
      });
    } catch (err) {
      expect(err.message).toEqual(`<mg-input-date> props 'min/max' doesn't match pattern: 'yyyy-mm-dd'. Passed value: ${minMax.max ?? minMax.min}.`);
    }
  });

  test("display error with displayError component's public method", async () => {
    const page = await getPage({ label: 'label', identifier: 'identifier', required: true });

    expect(page.root).toMatchSnapshot();

    const element = page.doc.querySelector('mg-input-date');
    const input = element.shadowRoot.querySelector('input');

    //mock validity
    input.checkValidity = jest.fn(() => false);
    Object.defineProperty(input, 'validity', {
      get: () => ({
        valueMissing: true,
        rangeUnderflow: false,
        rangeOverflow: false,
      }),
    });

    await element.displayError();

    await page.waitForChanges();

    expect(page.root).toMatchSnapshot();
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

    const element = page.doc.querySelector('mg-input-date');
    const input = element.shadowRoot.querySelector('input');

    //mock validity
    Object.defineProperty(input, 'validity', {
      get: () => ({
        valueMissing: false,
        badInput: false,
        rangeUnderflow: false,
        rangeOverflow: false,
      }),
    });

    await element.setError(params.valid, params.errorMessage);

    await page.waitForChanges();

    expect(page.root).toMatchSnapshot();
  });

  test.each([
    {
      valid: '',
      errorMessage: 'Override error',
      error: '<mg-input-date> method "setError()" param "valid" must be a boolean.',
    },
    {
      valid: undefined,
      errorMessage: 'Override error',
      error: '<mg-input-date> method "setError()" param "valid" must be a boolean.',
    },
    {
      valid: true,
      errorMessage: ' ',
      error: '<mg-input-date> method "setError()" param "errorMessage" must be a string.',
    },
    {
      valid: true,
      errorMessage: true,
      error: '<mg-input-date> method "setError()" param "errorMessage" must be a string.',
    },
  ])("shloud throw error with setError component's public method invalid params", async params => {
    expect.assertions(1);
    try {
      const page = await getPage({ label: 'label', identifier: 'identifier', required: true });
      const element = page.doc.querySelector('mg-input-date');

      await element.setError(params.valid as unknown as boolean, params.errorMessage as unknown as string);
      await page.waitForChanges();
    } catch (err) {
      expect(err.message).toEqual(params.error);
    }
  });

  test.each(['fr', 'xx'])('display error message with locale: %s', async lang => {
    const page = await getPage({ label: 'label', identifier: 'identifier', required: true, lang });
    const element = page.doc.querySelector('mg-input-date');
    const input = element.shadowRoot.querySelector('input');

    //mock validity
    input.checkValidity = jest.fn(() => false);
    Object.defineProperty(input, 'validity', {
      get: () => ({
        valueMissing: true,
        rangeUnderflow: false,
        rangeOverflow: false,
      }),
    });

    await element.displayError();

    await page.waitForChanges();

    expect(page.root).toMatchSnapshot();
  });

  test('Should remove error on input', async () => {
    const page = await getPage({ label: 'label', identifier: 'identifier', required: true });
    const element = page.doc.querySelector('mg-input-date');
    const input = element.shadowRoot.querySelector('input');

    //mock validity
    input.checkValidity = jest.fn().mockReturnValueOnce(false).mockReturnValueOnce(true).mockReturnValueOnce(true);
    Object.defineProperty(input, 'validity', {
      get: jest
        .fn()
        .mockReturnValueOnce({
          valueMissing: true,
          rangeUnderflow: false,
          rangeOverflow: false,
        })
        .mockReturnValueOnce({
          valueMissing: true,
          rangeUnderflow: false,
          rangeOverflow: false,
        })
        .mockReturnValueOnce({
          valueMissing: false,
          rangeUnderflow: false,
          rangeOverflow: false,
        })
        .mockReturnValueOnce({
          valueMissing: false,
          rangeUnderflow: false,
          rangeOverflow: false,
        }),
    });

    await element.displayError();
    await page.waitForChanges();

    expect(page.rootInstance.hasDisplayedError).toEqual(true);
    expect(page.rootInstance.errorMessage).toEqual(messages.errors.required);

    input.value = '1982-06-02';
    input.dispatchEvent(new CustomEvent('input', { bubbles: true }));
    await page.waitForChanges();

    expect(page.rootInstance.hasDisplayedError).toEqual(true);

    input.dispatchEvent(new CustomEvent('blur', { bubbles: true }));
    await page.waitForChanges();

    expect(page.rootInstance.hasDisplayedError).toEqual(false);
    expect(page.rootInstance.errorMessage).toBeUndefined();
  });

  test('Should remove error on input when required change dynamically', async () => {
    const page = await getPage({ label: 'label', identifier: 'identifier', required: true });
    const element = page.doc.querySelector('mg-input-date');
    const input = element.shadowRoot.querySelector('input');

    //mock validity
    input.checkValidity = jest.fn().mockReturnValueOnce(false).mockReturnValueOnce(true).mockReturnValueOnce(true);
    Object.defineProperty(input, 'validity', {
      get: jest
        .fn()
        .mockReturnValueOnce({
          valueMissing: true,
          rangeUnderflow: false,
          rangeOverflow: false,
        })
        .mockReturnValueOnce({
          valueMissing: true,
          rangeUnderflow: false,
          rangeOverflow: false,
        })
        .mockReturnValueOnce({
          valueMissing: false,
          rangeUnderflow: false,
          rangeOverflow: false,
        })
        .mockReturnValueOnce({
          valueMissing: false,
          rangeUnderflow: false,
          rangeOverflow: false,
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

  describe('reset method', () => {
    test('Should reset value', async () => {
      const page = await getPage({
        label: 'label',
        identifier: 'identifier',
      });
      const element = page.doc.querySelector('mg-input-date');
      const input = element.shadowRoot.querySelector('input');

      // Set a value
      input.value = '2024-12-24';
      input.dispatchEvent(new CustomEvent('input', { bubbles: true }));
      await page.waitForChanges();

      // Verify initial value
      expect(element.value).toEqual('2024-12-24');

      // Reset input
      await element.reset();
      await page.waitForChanges();

      // Verify value has been reset
      expect(element.value).toEqual(null);
    });

    test('Should reset error message when error is displayed', async () => {
      const page = await getPage({
        label: 'label',
        identifier: 'identifier',
      });
      const element = page.doc.querySelector('mg-input-date');
      const input = element.shadowRoot.querySelector('input');

      // Mock validity
      input.checkValidity = jest.fn(() => false);
      Object.defineProperty(input, 'validity', {
        get: () => ({
          valueMissing: true,
          rangeUnderflow: false,
          rangeOverflow: false,
        }),
      });

      // Set error message
      await element.setError(false, "Message d'erreur de test");
      await page.waitForChanges();

      // Verify initial error state
      expect(page.root).toMatchSnapshot();

      // Reset input
      await element.reset();
      await page.waitForChanges();

      // Verify reset state
      expect(page.root).toMatchSnapshot();
    });

    test('Should not reset when input is readonly', async () => {
      const page = await getPage({
        label: 'label',
        identifier: 'identifier',
        value: '2024-12-24',
        readonly: true,
      });
      const element = page.doc.querySelector('mg-input-date');

      // Capture initial value
      const initialValue = element.value;

      // Try to reset
      await element.reset();
      await page.waitForChanges();

      // Verify value remains unchanged
      expect(element.value).toEqual(initialValue);
    });
  });
});
