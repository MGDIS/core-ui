import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgInputRadio } from '../mg-input-radio';
import { RadioOption } from '../mg-input-radio.conf';
import messages from '../../../../../locales/en/messages.json';
import { MgInput } from '../../mg-input/mg-input';
import { MgInputTitle } from '../../../../atoms/internals/mg-input-title/mg-input-title';
import { tooltipPositions } from '../../mg-input/mg-input.conf';
import { setUpRequestAnimationFrameMock, toString } from '@mgdis/core-ui-helpers/dist/stencil';

const getPage = args => {
  const page = newSpecPage({
    components: [MgInputRadio, MgInput, MgInputTitle],
    template: () => <mg-input-radio {...args}></mg-input-radio>,
  });

  jest.runAllTimers();
  setUpRequestAnimationFrameMock(jest.runOnlyPendingTimers);

  return page;
};

describe('mg-input-radio', () => {
  beforeEach(() => jest.useFakeTimers({ legacyFakeTimers: true }));
  afterEach(() => {
    jest.runOnlyPendingTimers();
  });
  test.each([
    { items: ['batman', 'robin', 'joker', 'bane'] },
    {
      items: [
        { title: 'batman', value: 'u' },
        { title: 'robin', value: 'i' },
        { title: 'joker', value: 'o' },
        { title: 'bane', value: 'a' },
      ],
    },
    {
      items: [
        { title: 'batman', value: 1 },
        { title: 'robin', value: 2 },
        { title: 'joker', value: 3 },
        { title: 'bane', value: 4 },
      ],
    },
    {
      items: [
        { title: 'batman', value: true },
        { title: 'robin', value: false },
        { title: 'joker', value: false },
        { title: 'bane', value: false },
      ],
    },
    {
      items: [
        { title: 'batman', value: 1 },
        { title: 'robin', value: 2 },
        { title: 'joker', value: 3 },
        { title: 'bane', value: 4 },
      ],
      readonly: true,
      value: 2,
    },
    { items: ['batman', 'robin', 'joker', 'bane'], labelOnTop: true },
    { items: ['batman', 'robin', 'joker', 'bane'], labelHide: true },
    { items: ['batman', 'robin', 'joker', 'bane'], inputVerticalList: true },
    { items: ['batman', 'robin', 'joker', 'bane'], required: true, helpText: 'My help text', value: 'batman' },
    { items: ['batman', 'robin', 'joker', 'bane'], required: true, readonly: true, helpText: 'My help text', value: 'batman' },
    { items: ['batman', 'robin', 'joker', 'bane'], required: true, disabled: true, helpText: 'My help text', value: 'batman' },
    { items: ['batman', 'robin', 'joker', 'bane'], readonly: true },
    { items: ['batman', 'robin', 'joker', 'bane'], readonly: true, tooltip: 'tooltip', tooltipPosition: 'input' },
    { items: ['batman', 'robin', 'joker', 'bane'], readonly: true, tooltip: 'tooltip', tooltipPosition: 'input', value: 'bane' },
    { items: ['batman', 'robin', 'joker', 'bane'], readonly: true, labelOnTop: true, tooltip: 'Tooltip message' },
    { items: ['batman', 'robin', 'joker', 'bane'], disabled: true },
    { items: ['batman', 'robin', 'joker', 'bane'], helpText: 'Hello joker' },
    { items: ['batman', 'robin', 'joker', 'bane'], tooltip: 'My Tooltip Message' },
    { items: ['batman', 'robin', 'joker', 'bane'], tooltip: 'My Tooltip Message', labelOnTop: true },
    { items: ['batman', 'robin', 'joker', 'bane'], tooltip: 'My Tooltip Message', tooltipPosition: 'label' },
    { items: ['batman', 'robin', 'joker', 'bane'], tooltip: 'My Tooltip Message', tooltipPosition: 'input', labelOnTop: true },
  ])('Should render with args %s:', async args => {
    const { root } = await getPage({ label: 'label', identifier: 'identifier', ...args });
    expect(root).toMatchSnapshot();
  });

  test.each(['', ' ', undefined])('Should not render with invalid identifier property: %s', async identifier => {
    expect.assertions(1);
    try {
      await getPage({ identifier, items: ['batman', 'robin', 'joker', 'bane'] });
    } catch (err) {
      expect(err.message).toEqual(`<mg-input> prop "identifier" is required and must be a string. Passed value: ${identifier}.`);
    }
  });

  test('Should log an error with invalid "identifier" property', async () => {
    const identifier = '{{batman}}';
    const spy = jest.spyOn(console, 'error');

    await getPage({ identifier, label: 'test', items: ['batman', 'robin', 'joker', 'bane'] });
    expect(spy).toHaveBeenCalledWith(`<mg-input> prop "identifier" value is invalid. Passed value: ${identifier}.`);
  });

  test.each(['', ' ', undefined])('Should throw error with invalid label property: %s', async label => {
    expect.assertions(1);
    try {
      await getPage({ identifier: 'identifier', label, items: ['batman', 'robin', 'joker', 'bane'] });
    } catch (err) {
      expect(err.message).toEqual(`<mg-input> prop "label" is required and must be a string. Passed value: ${label}.`);
    }
  });

  test('Should throw an error with labelOnTop & labelHide set to true', async () => {
    expect.assertions(1);
    try {
      await getPage({ identifier: 'identifier', label: 'batman', labelOnTop: true, labelHide: true, items: ['batman', 'joker'] });
    } catch (err) {
      expect(err.message).toEqual('<mg-input> prop "labelOnTop" must not be paired with the prop "labelHide".');
    }
  });

  test.each(['blu', {}, 5, false])('Should not render with invalid tooltipPosition property: %s', async tooltipPosition => {
    expect.assertions(1);
    try {
      await getPage({ identifier: 'identifier', label: 'label', items: ['batman', 'joker'], tooltipPosition });
    } catch (err) {
      expect(err.message).toEqual(`<mg-input> prop "tooltipPosition" must be one of: ${tooltipPositions.join(', ')}. Passed value: ${toString(tooltipPosition)}.`);
    }
  });

  test.each([[['batman']], [[{ title: 'batman', value: 'u' }]]])('Should throw an error with less than 2 items, case %s', async items => {
    expect.assertions(1);
    try {
      await getPage({ identifier: 'identifier', label: 'batman', labelOnTop: true, labelHide: true, items });
    } catch (err) {
      expect(err.message).toEqual(`<mg-input-radio> prop "items" require at least 2 items. Passed value: ${toString(items)}.`);
    }
  });

  test.each([
    [['batman', { title: 'batman', value: 'batman' }]],
    [['batman', { batman: 'batman' }]],
    [[true, false]],
    [[1, 2, 3]],
    [[true, 1, 'batman']],
    [[{ title: 'batman', value: 'batman' }, { batman: 'batman' }]],
    [
      [
        { title: 'batman', value: undefined },
        { title: 'batman', value: 'test' },
      ],
    ],
  ])('Should throw error with invalid items property: %s', async items => {
    expect.assertions(1);
    try {
      await getPage({ label: 'Label', items });
    } catch (err) {
      expect(err.message).toEqual(`<mg-input-radio> prop "items" is required and all items must be the same type, string or RadioOption. Passed value: ${toString(items)}.`);
    }
  });

  test.each([
    { items: ['batman', 'robin', 'joker', 'bane'], selectedIndex: 3 },
    {
      items: [
        { title: 'batman', value: 'u' },
        { title: 'robin', value: 'i' },
        { title: 'joker', value: 'o' },
        { title: 'bane', value: 'a' },
      ],
      selectedIndex: 2,
    },
    {
      items: [
        { title: 'batman', value: 1 },
        { title: 'robin', value: 2 },
        { title: 'joker', value: 3 },
        { title: 'bane', value: 4 },
      ],
      selectedIndex: 1,
    },
    {
      items: [
        { title: 'batman', value: true },
        { title: 'robin', value: false },
      ],
      selectedIndex: 0,
    },
    {
      items: [
        { title: 'batman', value: { name: 'Batman' } },
        { title: 'robin', value: { name: 'Robin' } },
      ],
      selectedIndex: 1,
    },
  ])('Should trigger events for items (%s) with selectedIndex (%s)', async ({ items, selectedIndex }) => {
    const args = { label: 'label', items, identifier: 'identifier', helpText: 'My help text' };
    const page = await getPage(args);

    const element = page.doc.querySelector('mg-input-radio');
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

    input.value = selectedIndex.toString();
    input.dispatchEvent(new CustomEvent('input', { bubbles: true }));
    await page.waitForChanges();
    const expectedEmitValue = typeof items[selectedIndex] === 'object' ? (items[selectedIndex] as RadioOption).value : items[selectedIndex];
    expect(page.rootInstance.valueChange.emit).toHaveBeenCalledWith(expectedEmitValue);

    input.dispatchEvent(new CustomEvent('blur', { bubbles: true }));
    await page.waitForChanges();
    expect(inputValidSpy).toHaveBeenCalledTimes(1);
  });

  describe.each(['readonly', 'disabled'])('validity, case next state is %s', nextState => {
    test.each([
      { validity: true, valueMissing: false },
      { validity: false, valueMissing: true },
    ])('validity (%s), valueMissing (%s)', async ({ validity, valueMissing }) => {
      const args = { label: 'label', items: ['batman', 'robin', 'joker', 'bane'], identifier: 'identifier', patternErrorMessage: 'Non' };
      const page = await getPage(args);

      const element = page.doc.querySelector('mg-input-radio');
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

  test("display error with displayError component's public method", async () => {
    const page = await getPage({ label: 'label', identifier: 'identifier', items: ['batman', 'robin', 'joker', 'bane'], helpText: 'My help text', required: true });

    expect(page.root).toMatchSnapshot();

    const element = page.doc.querySelector('mg-input-radio');
    const allInputs = element.shadowRoot.querySelectorAll('input');

    //mock validity
    allInputs.forEach(input => {
      input.checkValidity = jest.fn(() => false);
      Object.defineProperty(input, 'validity', {
        get: jest.fn(() => ({
          valueMissing: true,
        })),
      });
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
    const page = await getPage({ label: 'label', identifier: 'identifier', items: ['batman', 'robin', 'joker', 'bane'], required: true });

    expect(page.root).toMatchSnapshot();

    const element = page.doc.querySelector('mg-input-radio');
    const allInputs = element.shadowRoot.querySelectorAll('input');

    //mock validity
    allInputs.forEach(input => {
      input.checkValidity = jest.fn(() => false);
      Object.defineProperty(input, 'validity', {
        get: jest.fn(() => ({
          valueMissing: true,
        })),
      });
    });

    await element.setError(params.valid, params.errorMessage);

    await page.waitForChanges();

    expect(page.root).toMatchSnapshot();
  });

  test.each([
    {
      valid: '',
      errorMessage: 'Override error',
      error: '<mg-input-radio> method "setError()" param "valid" must be a boolean.',
    },
    {
      valid: undefined,
      errorMessage: 'Override error',
      error: '<mg-input-radio> method "setError()" param "valid" must be a boolean.',
    },
    {
      valid: true,
      errorMessage: ' ',
      error: '<mg-input-radio> method "setError()" param "errorMessage" must be a string.',
    },
    {
      valid: true,
      errorMessage: true,
      error: '<mg-input-radio> method "setError()" param "errorMessage" must be a string.',
    },
  ])("shloud throw error with setError component's public method invalid params", async params => {
    expect.assertions(1);
    try {
      const page = await getPage({ label: 'label', identifier: 'identifier', items: ['batman', 'robin', 'joker', 'bane'], required: true });
      const element = page.doc.querySelector('mg-input-radio');

      await element.setError(params.valid as unknown as boolean, params.errorMessage as unknown as string);
      await page.waitForChanges();
    } catch (err) {
      expect(err.message).toEqual(params.error);
    }
  });

  test.each(['fr', 'xx'])('display error message with locale: %s', async lang => {
    const page = await getPage({ label: 'label', identifier: 'identifier', items: ['batman', 'robin', 'joker', 'bane'], helpText: 'My help text', required: true, lang });
    const element = page.doc.querySelector('mg-input-radio');
    const allInputs = element.shadowRoot.querySelectorAll('input');

    //mock validity
    allInputs.forEach(input => {
      input.checkValidity = jest.fn(() => false);
      Object.defineProperty(input, 'validity', {
        get: jest.fn(() => ({
          valueMissing: true,
        })),
      });
    });

    await element.displayError();

    await page.waitForChanges();

    expect(page.root).toMatchSnapshot();
  });

  test('Should remove error on input when required change dynamically', async () => {
    const page = await getPage({
      label: 'label',
      identifier: 'identifier',
      items: ['batman', 'robin'],
      required: true,
    });
    const element = page.doc.querySelector('mg-input-radio');
    const allInputs = element.shadowRoot.querySelectorAll('input');

    //mock validity
    allInputs[0].checkValidity = jest
      .fn()
      .mockReturnValueOnce(false) //1
      .mockReturnValueOnce(false) //1
      .mockReturnValueOnce(true) //2
      .mockReturnValueOnce(true) //2
      .mockReturnValueOnce(false) //3
      .mockReturnValueOnce(false); //3
    allInputs[1].checkValidity = jest.fn().mockReturnValueOnce(true).mockReturnValueOnce(true); //2
    Object.defineProperty(allInputs[0], 'validity', {
      get: jest
        .fn()
        .mockReturnValueOnce({
          valueMissing: true, //1
        })
        .mockReturnValueOnce({
          valueMissing: false, //2
        })
        .mockReturnValueOnce({
          valueMissing: true, //3
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
        items: ['batman', 'robin', 'joker', 'bane'],
      });
      const element = page.doc.querySelector('mg-input-radio');
      const input = element.shadowRoot.querySelector('input');

      // Simulate selecting a value
      input.value = '0'; // Select first option
      input.dispatchEvent(new CustomEvent('input', { bubbles: true }));
      await page.waitForChanges();

      // Verify value is set
      expect(element.value).toEqual('batman');

      // Call reset method
      await element.reset();
      await page.waitForChanges();

      // Verify value is reset
      expect(element.value).toBeUndefined();
    });

    test('Should reset error message when error is displayed', async () => {
      const page = await getPage({
        label: 'label',
        identifier: 'identifier',
        items: ['batman', 'robin', 'joker', 'bane'],
      });
      const element = page.doc.querySelector('mg-input-radio');

      // Set an error message
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

    test('Should not reset value when readonly', async () => {
      // Initialise with readonly and a value
      const page = await getPage({
        label: 'label',
        identifier: 'identifier',
        items: ['batman', 'robin', 'joker', 'bane'],
        readonly: true,
        value: 'batman',
      });
      const element = page.doc.querySelector('mg-input-radio');

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
