import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgInputText } from '../mg-input-text';
import { MgButton } from '../../../../atoms/mg-button/mg-button';
import { MgIcon } from '../../../../atoms/mg-icon/mg-icon';
import messages from '../../../../../locales/en/messages.json';
import { MgInput } from '../../mg-input/mg-input';
import { MgInputTitle } from '../../../../atoms/mg-input-title/mg-input-title';

const getPage = (args, content?) => {
  const page = newSpecPage({
    components: [MgInputText, MgButton, MgIcon, MgInput, MgInputTitle],
    template: () => <mg-input-text {...args}>{content}</mg-input-text>,
  });

  jest.runAllTimers();

  return page;
};

describe('mg-input-text', () => {
  beforeEach(() => jest.useFakeTimers({ legacyFakeTimers: true }));
  afterEach(() => {
    jest.runOnlyPendingTimers();
  });
  test.each([
    { label: 'label', identifier: 'identifier' },
    { label: 'label', identifier: 'identifier', labelHide: true },
    { label: 'label', identifier: 'identifier', labelOnTop: true },
    { label: 'label', identifier: 'identifier', readonly: true },
    { label: 'label', identifier: 'identifier', type: 'search' },
    { label: 'label', identifier: 'identifier', type: 'search', icon: 'magnifying-glass' },
    { label: 'label', identifier: 'identifier', datalistoptions: ['batman', 'robin', 'joker'] },
    { label: 'label', identifier: 'identifier', readonly: true, labelOnTop: true, tooltip: 'Tooltip message' },
    { label: 'label', identifier: 'identifier', readonly: true, value: 'blu' },
    { label: 'label', identifier: 'identifier', required: true, value: 'blu', helpText: 'My help text' },
    { label: 'label', identifier: 'identifier', required: true, readonly: true, value: 'blu', helpText: 'My help text' },
    { label: 'label', identifier: 'identifier', required: true, disabled: true, value: 'blu', helpText: 'My help text' },
    { label: 'label', identifier: 'identifier', tooltip: 'My Tooltip Message' },
    { label: 'label', identifier: 'identifier', tooltip: 'My Tooltip Message', labelOnTop: true },
    { label: 'label', identifier: 'identifier', tooltip: 'My Tooltip Message', tooltipPosition: 'label' },
    { label: 'label', identifier: 'identifier', tooltip: 'My Tooltip Message', tooltipPosition: 'input', labelOnTop: true },
    { label: 'label', identifier: 'identifier', displayCharacterLeft: false },
  ])('Should render with args %s:', async args => {
    const { root } = await getPage(args);
    expect(root).toMatchSnapshot();
  });

  test.each([
    <mg-button slot="append-input" label="search" identifier="identifier">
      <mg-icon icon="magnifying-glass"></mg-icon> Search
    </mg-button>,
    <span slot="append-input">test</span>,
    [
      <mg-button is-icon slot="append-input" label="cancel" identifier="identifier-cancel">
        <mg-icon icon="cross"></mg-icon>
      </mg-button>,
      <mg-button is-icon slot="append-input" label="validate" identifier="identifier-validate">
        <mg-icon icon="check"></mg-icon>
      </mg-button>,
    ],
  ])('Should render with slot.', async slot => {
    const args = { label: 'label', identifier: 'identifier', type: 'search' };

    const page = await getPage(args, slot);
    expect(page.root).toMatchSnapshot();
  });

  test.each(['', ' ', undefined])('Should not render with invalid identifier property: %s', async identifier => {
    expect.assertions(1);
    try {
      await getPage({ identifier });
    } catch (err) {
      expect(err.message).toMatch('<mg-input> prop "identifier" is required.');
    }
  });

  test.each([{ batman: undefined }, [undefined, 'batman']])('Should not render with invalid datalistoptions property: %s', async datalistoptions => {
    expect.assertions(1);
    try {
      await getPage({ identifier: 'identifier', label: 'comics', datalistoptions });
    } catch (err) {
      expect(err.message).toMatch('<mg-input-text> prop "datalistoptions" values must be the same type, string.');
    }
  });

  test.each(['', ' ', undefined])('Should throw error with invalid label property: %s', async label => {
    expect.assertions(1);
    try {
      await getPage({ identifier: 'identifier', label });
    } catch (err) {
      expect(err.message).toMatch('<mg-input> prop "label" is required.');
    }
  });

  test('Should throw an error with labelOnTop & labelHide set to true', async () => {
    expect.assertions(1);
    try {
      await getPage({ identifier: 'identifier', label: 'batman', labelOnTop: true, labelHide: true });
    } catch (err) {
      expect(err.message).toMatch('<mg-input> prop "labelOnTop" must not be paired with the prop "labelHide"');
    }
  });

  test.each(['blu', {}, 5, false])('Should not render with invalid tooltipPosition property: %s', async tooltipPosition => {
    expect.assertions(1);
    try {
      await getPage({ identifier: 'identifier', label: 'label', tooltipPosition });
    } catch (err) {
      expect(err.message).toMatch('<mg-input> prop "tooltipPosition" must be one of: ');
    }
  });

  test.each(['', ' ', null, undefined])('Should throw an error when pattern is used with invalid patternErrorMessage: %s', async patternErrorMessage => {
    expect.assertions(1);
    try {
      await getPage({ identifier: 'identifier', label: 'blu', pattern: '[a-z]*', patternErrorMessage });
    } catch (err) {
      expect(err.message).toMatch('<mg-input-text> props "pattern" and "patternErrorMessage" must be non-empty string and paired.');
    }
  });

  test.each(['', ' ', null, undefined])('Should throw an error when patternErrorMessage is used with invalid pattern: %s', async pattern => {
    expect.assertions(1);
    try {
      await getPage({ identifier: 'identifier', label: 'blu', pattern, patternErrorMessage: 'pattern error message' });
    } catch (err) {
      expect(err.message).toMatch('<mg-input-text> props "pattern" and "patternErrorMessage" must be non-empty string and paired.');
    }
  });

  test('Should trigger events', async () => {
    const inputValue = 'Blu';
    const args = { label: 'label', identifier: 'identifier', helpText: 'My help text' };
    const page = await getPage(args);

    const element = page.doc.querySelector('mg-input-text');
    const input = element.shadowRoot.querySelector('input');

    //mock validity
    input.checkValidity = jest.fn(() => true);
    Object.defineProperty(input, 'validity', {
      get: jest.fn(() => ({
        valueMissing: false,
        patternMismatch: false,
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
      { validity: true, valueMissing: false, patternMismatch: false },
      { validity: false, valueMissing: true, patternMismatch: false },
      { validity: false, valueMissing: false, patternMismatch: true },
    ])('validity (%s), valueMissing (%s), patternMismatch (%s)', async ({ validity, valueMissing, patternMismatch }) => {
      const args = { label: 'label', identifier: 'identifier', pattern: '[a-z]*', patternErrorMessage: 'Non' };
      const page = await getPage(args);

      const element = page.doc.querySelector('mg-input-text');
      const input = element.shadowRoot.querySelector('input');

      //mock validity
      input.checkValidity = jest.fn(() => validity);
      Object.defineProperty(input, 'validity', {
        get: jest.fn(() => ({
          valueMissing,
          patternMismatch,
        })),
      });

      input.dispatchEvent(new CustomEvent('blur', { bubbles: true }));
      await page.waitForChanges();

      if (validity) {
        expect(page.rootInstance.errorMessage).toBeUndefined();
      } else if (valueMissing) {
        expect(page.rootInstance.errorMessage).toEqual(messages.errors.required);
      } else if (patternMismatch) {
        expect(page.rootInstance.errorMessage).toEqual(args.patternErrorMessage);
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

    test("should trigger input focus method with setFocus component's public method", async () => {
      const page = await getPage({ label: 'label', identifier: 'identifier' });
      const element = page.doc.querySelector('mg-input-text');
      const input = element.shadowRoot.querySelector('input');

      input.focus = jest.fn();

      await element.setFocus();

      await page.waitForChanges();

      expect(input.focus).toHaveBeenCalled();
    });
  });

  test("display error with displayError component's public method", async () => {
    const page = await getPage({ label: 'label', identifier: 'identifier', required: true });

    expect(page.root).toMatchSnapshot();

    const element = page.doc.querySelector('mg-input-text');
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

    const element = page.doc.querySelector('mg-input-text');
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
      error: '<mg-input-text> method "setError()" param "valid" must be a boolean',
    },
    {
      valid: undefined,
      errorMessage: 'Override error',
      error: '<mg-input-text> method "setError()" param "valid" must be a boolean',
    },
    {
      valid: true,
      errorMessage: ' ',
      error: '<mg-input-text> method "setError()" param "errorMessage" must be a string',
    },
    {
      valid: true,
      errorMessage: true,
      error: '<mg-input-text> method "setError()" param "errorMessage" must be a string',
    },
  ])("shloud throw error with setError component's public method invalid params", async params => {
    expect.assertions(1);
    try {
      const page = await getPage({ label: 'label', identifier: 'identifier', required: true });
      const element = page.doc.querySelector('mg-input-text');

      await element.setError(params.valid as unknown as boolean, params.errorMessage as unknown as string);
      await page.waitForChanges();
    } catch (err) {
      expect(err.message).toMatch(params.error);
    }
  });

  test.each(['fr', 'xx'])('display error message with locale: %s', async lang => {
    const page = await getPage({ label: 'label', identifier: 'identifier', required: true, lang });
    const element = page.doc.querySelector('mg-input-text');
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
    const element = page.doc.querySelector('mg-input-text');
    const input = element.shadowRoot.querySelector('input');

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

    input.value = 'blu';
    input.dispatchEvent(new CustomEvent('input', { bubbles: true }));
    await page.waitForChanges();

    // Error message should disapear but we keep the hasDisplayedError status
    expect(page.rootInstance.hasDisplayedError).toEqual(true);
    expect(page.rootInstance.errorMessage).toBeUndefined();

    input.dispatchEvent(new CustomEvent('blur', { bubbles: true }));
    await page.waitForChanges();

    // On blur the hasDisplayedError status change
    expect(page.rootInstance.hasDisplayedError).toEqual(false);
  });

  test('Should remove error on input when required change dynamically', async () => {
    const page = await getPage({ label: 'label', identifier: 'identifier', required: true });
    const element = page.doc.querySelector('mg-input-text');
    const input = element.shadowRoot.querySelector('input');

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
    const element = page.doc.querySelector('mg-input-text');

    element.mgWidth = 2;
    await page.waitForChanges();

    expect(page.root).toMatchSnapshot();

    element.mgWidth = 4;
    await page.waitForChanges();

    expect(page.root).toMatchSnapshot();

    element.mgWidth = 16;
    await page.waitForChanges();

    expect(page.root).toMatchSnapshot();
  });
});
