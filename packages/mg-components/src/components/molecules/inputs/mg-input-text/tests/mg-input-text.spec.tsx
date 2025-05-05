import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgInputText } from '../mg-input-text';
import { MgButton } from '../../../../atoms/mg-button/mg-button';
import { MgIcon } from '../../../../atoms/mg-icon/mg-icon';
import messages from '../../../../../locales/en/messages.json';
import { MgInput } from '../../mg-input/mg-input';
import { MgInputTitle } from '../../../../atoms/internals/mg-input-title/mg-input-title';
import { tooltipPositions } from '../../mg-input/mg-input.conf';
import { setUpRequestAnimationFrameMock, toString } from '@mgdis/core-ui-helpers/stencil';
import { helpTextTypes, textTypes } from '../mg-input-text.conf';

const getPage = (args, content?) => {
  const page = newSpecPage({
    components: [MgInputText, MgButton, MgIcon, MgInput, MgInputTitle],
    template: () => <mg-input-text {...args}>{content}</mg-input-text>,
  });

  jest.runAllTimers();
  setUpRequestAnimationFrameMock(jest.runOnlyPendingTimers);

  return page;
};

describe('mg-input-text', () => {
  beforeEach(() => jest.useFakeTimers({ legacyFakeTimers: true }));
  afterEach(() => {
    jest.runOnlyPendingTimers();
  });
  test.each([
    {},
    { labelHide: true },
    { labelOnTop: true },
    { readonly: true },
    { type: 'search' },
    { type: 'search', icon: 'magnifying-glass' },
    { datalistoptions: ['batman', 'robin', 'joker'] },
    {
      datalistoptions: [
        { title: 'batman', value: '1' },
        { title: 'robin', value: '2' },
        { title: 'joker', value: '3' },
      ],
    },
    { readonly: true, labelOnTop: true, tooltip: 'Tooltip message', tooltipPosition: 'input' },
    { readonly: true, labelOnTop: true, tooltip: 'Tooltip message', tooltipPosition: 'input', value: 'batman' },
    { readonly: true, value: 'blu' },
    { required: true, value: 'blu', helpText: 'My help text' },
    { required: true, readonly: true, value: 'blu', helpText: 'My help text' },
    { required: true, disabled: true, value: 'blu', helpText: 'My help text' },
    { tooltip: 'My Tooltip Message' },
    { tooltip: 'My Tooltip Message', labelOnTop: true },
    { tooltip: 'My Tooltip Message', tooltipPosition: 'label' },
    { tooltip: 'My Tooltip Message', tooltipPosition: 'input', labelOnTop: true },
    { characterLeftHide: true },
  ])('Should render with args %s:', async args => {
    const { root } = await getPage({ label: 'label', identifier: 'identifier', ...args });
    expect(root).toMatchSnapshot();
  });

  describe.each([false, true])('readonly %s', readonly => {
    test.each([
      <mg-button slot="append-input" label="search">
        <mg-icon icon="magnifying-glass"></mg-icon> Search
      </mg-button>,
      <span slot="append-input">test</span>,
      [
        <mg-button is-icon slot="append-input" label="cancel">
          <mg-icon icon="cross"></mg-icon>
        </mg-button>,
        <mg-button is-icon slot="append-input" label="validate">
          <mg-icon icon="check"></mg-icon>
        </mg-button>,
      ],
    ])('Should render with slot.', async slot => {
      const args = { label: 'label', identifier: 'identifier', type: 'search', readonly, value: 'blu' };

      const page = await getPage(args, slot);
      expect(page.root).toMatchSnapshot();
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

  test.each([
    { batman: undefined },
    [undefined, 'batman'],
    [{ title: 'batman' }, { title: 'robin', value: '2' }, { title: 'joker', value: '3' }],
    [{ value: '1' }, { title: 'robin', value: '2' }, { title: 'joker', value: '3' }],
  ])('Should not render with invalid datalistoptions property: %s', async datalistoptions => {
    expect.assertions(1);
    try {
      await getPage({ identifier: 'identifier', label: 'comics', datalistoptions });
    } catch (err) {
      expect(err.message).toEqual(`<mg-input-text> prop "datalistoptions" values must be the same type, string or OptionType. Passed value: ${toString(datalistoptions)}.`);
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
      expect(err.message).toEqual(`<mg-input> prop "tooltipPosition" must be one of: ${tooltipPositions.join(', ')}. Passed value: ${toString(tooltipPosition)}.`);
    }
  });

  test.each(['', ' ', null, undefined])('Should throw an error when pattern is used with invalid patternErrorMessage: %s', async patternErrorMessage => {
    expect.assertions(1);
    try {
      await getPage({ identifier: 'identifier', label: 'blu', pattern: '[a-z]*', patternErrorMessage });
    } catch (err) {
      expect(err.message).toEqual(
        `<mg-input-text> props "pattern" and "patternErrorMessage" must be non-empty string and paired. Passed value: "pattern='[a-z]*'" and "patternErrorMessage='${patternErrorMessage}'".`,
      );
    }
  });

  test.each(['', ' ', 'blu'])('Should not render with invalid type property: %s', async type => {
    expect.assertions(1);
    try {
      await getPage({ identifier: 'identifier', label: 'blu', type });
    } catch (err) {
      expect(err.message).toEqual(`<mg-input-text> prop "type" must be one of the following values: ${textTypes.join(', ')}. Passed value: ${type}.`);
    }
  });

  test.each(['', ' ', null, undefined])('Should throw an error when patternErrorMessage is used with invalid pattern: %s', async pattern => {
    expect.assertions(1);
    try {
      await getPage({ identifier: 'identifier', label: 'blu', pattern, patternErrorMessage: 'pattern error message' });
    } catch (err) {
      expect(err.message).toEqual(
        `<mg-input-text> props "pattern" and "patternErrorMessage" must be non-empty string and paired. Passed value: "pattern='${pattern}'" and "patternErrorMessage='pattern error message'".`,
      );
    }
  });

  test.each(helpTextTypes)('Should not throw an error when patternErrorMessage is not defined with pattern and type %s', async type => {
    const page = await getPage({ identifier: 'identifier', label: 'blu', pattern: 'blu', type });
    expect(page.root).toMatchSnapshot();
  });

  test.each(['Blu', 'Bla', 'Bli', 'Blo'])('Should trigger events, case title: %s', async inputValue => {
    const isDatalist = inputValue !== 'Blu';
    const datalistoptions = isDatalist
      ? [
          { title: 'Blu', value: '1' },
          { title: 'Bla', value: '2' },
          { title: 'Blo', value: inputValue === 'Blo' ? { object: { hello: 'world' } } : '3' },
          { title: 'Ble', value: inputValue === 'Ble' ? null : '4' },
        ]
      : undefined;
    const args = { label: 'label', identifier: 'identifier', helpText: 'My help text', datalistoptions };
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
    expect(page.rootInstance.valueChange.emit).toHaveBeenCalledWith(
      ['Bla', 'Blo', 'Ble'].includes(inputValue) ? datalistoptions.find(option => option.title === inputValue).value : inputValue,
    );

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
      error: '<mg-input-text> method "setError()" param "valid" must be a boolean.',
    },
    {
      valid: undefined,
      errorMessage: 'Override error',
      error: '<mg-input-text> method "setError()" param "valid" must be a boolean.',
    },
    {
      valid: true,
      errorMessage: ' ',
      error: '<mg-input-text> method "setError()" param "errorMessage" must be a string.',
    },
    {
      valid: true,
      errorMessage: true,
      error: '<mg-input-text> method "setError()" param "errorMessage" must be a string.',
    },
  ])("shloud throw error with setError component's public method invalid params", async params => {
    expect.assertions(1);
    try {
      const page = await getPage({ label: 'label', identifier: 'identifier', required: true });
      const element = page.doc.querySelector('mg-input-text');

      await element.setError(params.valid as unknown as boolean, params.errorMessage as unknown as string);
      await page.waitForChanges();
    } catch (err) {
      expect(err.message).toEqual(params.error);
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

  describe('reset method', () => {
    test('Should reset value', async () => {
      const page = await getPage({
        label: 'label',
        identifier: 'identifier',
      });
      const element = page.doc.querySelector('mg-input-text');
      const input = element.shadowRoot.querySelector('input');

      // Simulate input with invalid value
      input.value = 'Chase';
      input.dispatchEvent(new CustomEvent('input', { bubbles: true }));
      await page.waitForChanges();

      // Verify initial value is set
      expect(element.value).toEqual('Chase');

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
      const element = page.doc.querySelector('mg-input-text');

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
        label: 'label',
        identifier: 'identifier',
        readonly: true,
        value: 'Chase',
      });
      const element = page.doc.querySelector('mg-input-text');

      // Capture initial value
      const initialValue = element.value;

      // Try to reset
      await element.reset();
      await page.waitForChanges();

      // Verify value remains unchanged
      expect(element.value).toEqual(initialValue);
    });
  });

  describe('types with helptext', () => {
    test.each(helpTextTypes)('Should render with type: %s', async type => {
      const page = await getPage({ label: 'label', identifier: 'identifier', type });

      // Snapshot with help text
      expect(page.root).toMatchSnapshot();

      const element = page.doc.querySelector('mg-input-text');
      const input = element.shadowRoot.querySelector('input');

      //mock validity
      input.checkValidity = jest.fn(() => false);
      Object.defineProperty(input, 'validity', {
        get: jest.fn(() => ({
          typeMismatch: true,
        })),
      });

      // Enter invalid value
      input.value = 'blu';
      input.dispatchEvent(new CustomEvent('blur', { bubbles: true }));
      await page.waitForChanges();

      // Snapshot with error message
      expect(page.root).toMatchSnapshot();
    });

    test('Should display patternMismatch mesage with type and pattern', async () => {
      const page = await getPage({
        label: 'label',
        identifier: 'identifier',
        type: 'email',
        pattern:
          /^[a-zA-Z0-9!#$%&'*+\/=?^_`\{\|\}~\-]+(?:\.[a-zA-Z0-9!#$%&'*+\/=?^_`\{\|\}~\-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-]*[a-zA-Z0-9])?$/
            .source, // From https://gitlab.mgdis.fr/core/core-back/core/-/blob/master/packages/validators/src/email/email.ts#L10
      });

      // Snapshot with help text
      expect(page.root).toMatchSnapshot();

      const element = page.doc.querySelector('mg-input-text');
      const input = element.shadowRoot.querySelector('input');

      //mock validity
      input.checkValidity = jest.fn(() => false);
      Object.defineProperty(input, 'validity', {
        get: jest.fn(() => ({
          patternMismatch: true,
        })),
      });

      // Enter invalid value
      input.value = 'blu@blo';
      input.dispatchEvent(new CustomEvent('blur', { bubbles: true }));
      await page.waitForChanges();

      // Snapshot with error message
      expect(page.root).toMatchSnapshot();
    });
  });
});
