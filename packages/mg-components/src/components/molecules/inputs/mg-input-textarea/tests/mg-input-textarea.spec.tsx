import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgInputTextarea } from '../mg-input-textarea';
import messages from '../../../../../locales/en/messages.json';
import { MgInput } from '../../mg-input/mg-input';
import { MgInputTitle } from '../../../../atoms/internals/mg-input-title/mg-input-title';
import { tooltipPositions } from '../../mg-input/mg-input.conf';

const getPage = args => {
  const page = newSpecPage({
    components: [MgInputTextarea, MgInput, MgInputTitle],
    template: () => <mg-input-textarea {...args}></mg-input-textarea>,
  });

  jest.runAllTimers();

  return page;
};

describe('mg-input-textarea', () => {
  beforeEach(() => jest.useFakeTimers({ legacyFakeTimers: true }));
  afterEach(() => {
    jest.runOnlyPendingTimers();
  });
  test.each([
    {},
    { labelHide: true },
    { labelOnTop: true },
    { readonly: true },
    { readonly: true, labelOnTop: true, tooltip: 'Tooltip message' },
    { readonly: true, value: 'blu' },
    { readonly: true, tooltip: 'Tooltip message', tooltipPosition: 'input', value: 'blu' },
    { readonly: true, tooltip: 'Tooltip message', tooltipPosition: 'input' },
    { required: true, value: 'blu', helpText: 'My help text' },
    { required: true, readonly: true, value: 'blu', helpText: 'My help text' },
    { required: true, disabled: true, value: 'blu', helpText: 'My help text' },
    { tooltip: 'My Tooltip Message' },
    { tooltip: 'My Tooltip Message', labelOnTop: true },
    { tooltip: 'My Tooltip Message', tooltipPosition: 'label' },
    { tooltip: 'My Tooltip Message', tooltipPosition: 'input', labelOnTop: true },
    { resizable: 'both' },
    { resizable: 'vertical' },
    { resizable: 'horizontal' },
    { characterLeftHide: true },
  ])('Should render with args %s:', async args => {
    const { root } = await getPage({ label: 'label', identifier: 'identifier', ...args });
    expect(root).toMatchSnapshot();
  });

  test.each(['', ' ', undefined])('Should not render with invalid identifier property: %s', async identifier => {
    expect.assertions(1);
    try {
      await getPage({ identifier });
    } catch (err) {
      expect(err.message).toEqual(`<mg-input> prop "identifier" is required and must be a string. Passed value: ${identifier}.`);
    }
  });

  test.each(['', ' ', undefined])('Should throw error with invalid label property: %s', async label => {
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
      expect(err.message).toEqual(`<mg-input> prop "tooltipPosition" must be one of: ${tooltipPositions.join(', ')}. Passed value: ${tooltipPosition}.`);
    }
  });

  test.each(['', ' ', null, undefined])('Should throw an error when pattern is used with patternErrorMessage: %s', async patternErrorMessage => {
    expect.assertions(1);
    try {
      await getPage({ identifier: 'identifier', label: 'blu', pattern: '[a-z]*', patternErrorMessage });
    } catch (err) {
      expect(err.message).toEqual(
        `<mg-input-textarea> props "pattern" and "patternErrorMessage" must be non-empty string and paired. Passed value: "pattern='[a-z]*'" and "patternErrorMessage='${patternErrorMessage}'".`,
      );
    }
  });

  test.each(['', ' ', null, undefined])('Should throw an error when patternErrorMessage is used with invalid pattern: %s', async pattern => {
    expect.assertions(1);
    try {
      await getPage({ identifier: 'identifier', label: 'blu', pattern, patternErrorMessage: 'pattern error message' });
    } catch (err) {
      expect(err.message).toEqual(
        `<mg-input-textarea> props "pattern" and "patternErrorMessage" must be non-empty string and paired. Passed value: "pattern='${pattern}'" and "patternErrorMessage='pattern error message'".`,
      );
    }
  });

  test('Should trigger events', async () => {
    const inputValue = 'Blu';
    const args = { label: 'label', identifier: 'identifier', helpText: 'My help text' };
    const page = await getPage(args);

    const element = page.doc.querySelector('mg-input-textarea');
    const input = element.shadowRoot.querySelector('textarea');

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
    expect(page.rootInstance.classCollection.has('mg-u-is-focused')).toEqual(true);

    expect(page.root).toMatchSnapshot(); //Snapshot on focus

    input.value = inputValue;
    input.dispatchEvent(new CustomEvent('input', { bubbles: true }));
    await page.waitForChanges();
    expect(page.rootInstance.valueChange.emit).toHaveBeenCalledWith(inputValue);

    input.dispatchEvent(new CustomEvent('blur', { bubbles: true }));
    await page.waitForChanges();
    expect(page.rootInstance.classCollection.has('mg-u-is-focused')).toEqual(false);
    expect(inputValidSpy).toHaveBeenCalledTimes(1);
  });

  describe.each(['readonly', 'disabled'])('validity, case next state is %s', nextState => {
    test.each([
      { validity: true, valueMissing: false },
      { validity: false, valueMissing: true },
      { validity: false, valueMissing: false, value: 'Blu', pattern: '[a-z]*', patternErrorMessage: 'Non' },
    ])('validity (%s), valueMissing (%s)', async ({ validity, valueMissing, value, pattern, patternErrorMessage }) => {
      const args = { label: 'label', identifier: 'identifier', value, pattern, patternErrorMessage };
      const page = await getPage(args);

      const element = page.doc.querySelector('mg-input-textarea');
      const input = element.shadowRoot.querySelector('textarea');

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
      } else if (pattern !== undefined) {
        expect(page.rootInstance.errorMessage).toEqual(patternErrorMessage);
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

  test("display error with displayError component's public method", async () => {
    const page = await getPage({ label: 'label', identifier: 'identifier', required: true });

    expect(page.root).toMatchSnapshot();

    const element = page.doc.querySelector('mg-input-textarea');
    const input = element.shadowRoot.querySelector('textarea');

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

    const element = page.doc.querySelector('mg-input-textarea');
    const input = element.shadowRoot.querySelector('textarea');

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
      error: '<mg-input-textarea> method "setError()" param "valid" must be a boolean.',
    },
    {
      valid: undefined,
      errorMessage: 'Override error',
      error: '<mg-input-textarea> method "setError()" param "valid" must be a boolean.',
    },
    {
      valid: true,
      errorMessage: ' ',
      error: '<mg-input-textarea> method "setError()" param "errorMessage" must be a string.',
    },
    {
      valid: true,
      errorMessage: true,
      error: '<mg-input-textarea> method "setError()" param "errorMessage" must be a string.',
    },
  ])("shloud throw error with setError component's public method invalid params", async params => {
    expect.assertions(1);
    try {
      const page = await getPage({ label: 'label', identifier: 'identifier', required: true });
      const element = page.doc.querySelector('mg-input-textarea');

      await element.setError(params.valid as unknown as boolean, params.errorMessage as unknown as string);
      await page.waitForChanges();
    } catch (err) {
      expect(err.message).toEqual(params.error);
    }
  });

  test.each(['fr', 'xx'])('display error message with locale: %s', async lang => {
    const page = await getPage({ label: 'label', identifier: 'identifier', required: true, lang });
    const element = page.doc.querySelector('mg-input-textarea');
    const input = element.shadowRoot.querySelector('textarea');

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
    const element = page.doc.querySelector('mg-input-textarea');
    const input = element.shadowRoot.querySelector('textarea');

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
    const element = page.doc.querySelector('mg-input-textarea');
    const input = element.shadowRoot.querySelector('textarea');

    //mock validity
    input.checkValidity = jest.fn().mockReturnValueOnce(false).mockReturnValueOnce(true).mockReturnValueOnce(true);
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

  test('Should update mg-width', async () => {
    const page = await getPage({ label: 'label', identifier: 'identifier' });
    const element = page.doc.querySelector('mg-input-textarea');

    element.mgWidth = 2;
    await page.waitForChanges();

    expect(page.root).toMatchSnapshot();

    element.mgWidth = 4;
    await page.waitForChanges();

    expect(page.root).toMatchSnapshot();

    element.mgWidth = 16;
    await page.waitForChanges();

    expect(page.root).toMatchSnapshot();

    expect(page.root).toMatchSnapshot();
  });
});
