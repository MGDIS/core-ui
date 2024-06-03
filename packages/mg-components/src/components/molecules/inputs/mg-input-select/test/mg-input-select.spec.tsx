import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgInputSelect } from '../mg-input-select';
import { SelectOption } from '../mg-input-select.conf';
import messages from '../../../../../locales/en/messages.json';
import { MgInput } from '../../mg-input/mg-input';
import { MgInputTitle } from '../../../../atoms/internals/mg-input-title/mg-input-title';

const getPage = args => {
  const page = newSpecPage({
    components: [MgInputSelect, MgInput, MgInputTitle],
    template: () => <mg-input-select {...args}></mg-input-select>,
  });

  jest.runAllTimers();

  return page;
};

describe('mg-input-select', () => {
  beforeEach(() => {
    jest.useFakeTimers({ legacyFakeTimers: true });
  });
  afterEach(() => {
    jest.runOnlyPendingTimers();
  });
  test.each([
    { items: [] },
    { items: ['blu', 'bli', 'blo', 'bla'] },
    { items: ['blu', 'bli', 'blo', 'bla'], labelHide: true },
    {
      items: [
        { title: 'blu', value: 'u' },
        { title: 'bli', value: 'i' },
        { title: 'blo', value: 'o' },
        { title: 'bla', value: 'a' },
      ],
    },
    {
      items: [
        { title: 'blu', value: 'u', group: 'blu' },
        { title: 'bli', value: 'i', group: 'blu' },
        { title: 'blo', value: 'o', group: 'blo' },
        { title: 'bla', value: 'a' },
      ],
    },
    {
      items: [
        { title: 'blu', value: 'u' },
        { title: 'bli', value: 'i' },
        { title: 'blo', value: 'o' },
        { title: 'bla', value: 'a' },
      ],
      readonly: true,
      value: 'o',
    },
    { items: ['blu', 'bli', 'blo', 'bla'], labelOnTop: true },
    { items: ['blu', 'bli', 'blo', 'bla'], readonly: true },
    { items: ['blu', 'bli', 'blo', 'bla'], readonly: true, labelOnTop: true, tooltip: 'Tooltip message', tooltipPosition: 'input' },
    { items: ['blu', 'bli', 'blo', 'bla'], readonly: true, labelOnTop: true, tooltip: 'Tooltip message', tooltipPosition: 'input', value: 'blu' },
    { items: ['blu', 'bli', 'blo', 'bla'], required: true, helpText: 'My help text', value: 'blu' },
    { items: ['blu', 'bli', 'blo', 'bla'], required: true, readonly: true, helpText: 'My help text', value: 'blu' },
    { items: ['blu', 'bli', 'blo', 'bla'], required: true, disabled: true, helpText: 'My help text', value: 'blu' },
    { items: ['blu', 'bli', 'blo', 'bla'], tooltip: 'My Tooltip Message' },
    { items: ['blu', 'bli', 'blo', 'bla'], tooltip: 'My Tooltip Message', labelOnTop: true },
    { items: ['blu', 'bli', 'blo', 'bla'], tooltip: 'My Tooltip Message', tooltipPosition: 'label' },
    { items: ['blu', 'bli', 'blo', 'bla'], tooltip: 'My Tooltip Message', tooltipPosition: 'input', labelOnTop: true },
    { items: ['blu', 'bli', 'blo', 'bla'], placeholder: 'placeholder' },
    { items: ['blu', 'bli', 'blo', 'bla'], placeholder: 'placeholder', placeholderHide: true },
    { items: ['blu', 'bli', 'blo', 'bla'], placeholder: 'placeholder', placeholderDisabled: true },
    { items: ['blu', 'bli', 'blo', 'bla'], placeholder: 'placeholder', placeholderDisabled: true, value: 'ble' },
  ])('Should render with args %s:', async args => {
    const { root } = await getPage({ label: 'label', identifier: 'identifier', ...args });
    expect(root).toMatchSnapshot();
  });

  test.each(['', ' ', undefined])('Should not render with invalid identifier property: %s', async identifier => {
    expect.assertions(1);
    try {
      await getPage({ identifier, items: ['blu', 'bli', 'blo', 'bla'] });
    } catch (err) {
      expect(err.message).toMatch('<mg-input> prop "identifier" is required.');
    }
  });

  test.each(['', ' ', undefined])('Should throw error with invalid label property: %s', async label => {
    expect.assertions(1);
    try {
      await getPage({ identifier: 'identifier', label, items: ['blu', 'bli', 'blo', 'bla'] });
    } catch (err) {
      expect(err.message).toMatch('<mg-input> prop "label" is required.');
    }
  });

  test('Should throw an error with labelOnTop & labelHide set to true', async () => {
    expect.assertions(1);
    try {
      await getPage({ identifier: 'identifier', label: 'batman', labelOnTop: true, labelHide: true, items: ['batman', 'joker'] });
    } catch (err) {
      expect(err.message).toMatch('<mg-input> prop "labelOnTop" must not be paired with the prop "labelHide"');
    }
  });

  test.each(['blu', {}, 5, false])('Should not render with invalid tooltipPosition property: %s', async tooltipPosition => {
    expect.assertions(1);
    try {
      await getPage({ identifier: 'identifier', label: 'label', items: ['batman', 'joker'], tooltipPosition });
    } catch (err) {
      expect(err.message).toMatch('<mg-input> prop "tooltipPosition" must be one of: ');
    }
  });

  test.each([[['blu', { title: 'blu', value: 'blu' }]], [['blu', { blu: 'blu' }]], [[{ title: 'blu', value: 'blu' }, { blu: 'blu' }]]])(
    'Should throw error with invalid items property: %s',
    async items => {
      expect.assertions(1);
      try {
        await getPage({ label: 'Label', items });
      } catch (err) {
        expect(err.message).toMatch('<mg-input-select> prop "items" is required, can be an empty Array or all items must be the same type: string or Option.');
      }
    },
  );

  test.each([
    { items: ['batman', 'robin', 'joker', 'bane'], selectedOption: '' },
    { items: ['batman', 'robin', 'joker', 'bane'], selectedOption: 3 },
    {
      items: [
        { title: 'batman', value: 'u' },
        { title: 'robin', value: 'i' },
        { title: 'joker', value: 'o' },
        { title: 'bane', value: 'a' },
      ],
      selectedOption: 2,
    },
    {
      items: [
        { title: 'batman', value: 1 },
        { title: 'robin', value: 2 },
        { title: 'joker', value: 3 },
        { title: 'bane', value: 4 },
      ],
      selectedOption: 1,
    },
    {
      items: [
        { title: 'batman', value: true },
        { title: 'robin', value: false },
      ],
      selectedOption: 0,
    },
    {
      items: [
        { title: 'blu', value: undefined },
        { title: 'bli', value: 42 },
      ],
      selectedOption: 0,
    },
    {
      items: [
        { title: 'batman', value: { name: 'Batman' } },
        { title: 'robin', value: { name: 'Robin' } },
      ],
      selectedOption: 1,
    },
    {
      items: [
        { title: 'Batman', value: { name: 'Batman', group: 'Heroes' } },
        { title: 'Robin', value: { name: 'Robin', group: 'Heroes' } },
        { title: 'Joker', value: { name: 'Joker', group: 'Super Vilains' } },
        { title: 'Bane', value: { name: 'Bane', group: 'Super Vilains' } },
      ],
      selectedOption: 2,
    },
  ])('Should trigger events for (%s)', async ({ items, selectedOption }) => {
    const args = { label: 'label', items, identifier: 'identifier', helpText: 'My help text', value: 'blu' };
    const page = await getPage(args);

    const element = page.doc.querySelector('mg-input-select');
    const input = element.shadowRoot.querySelector('select');

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

    input.value = items[selectedOption]?.title || items[selectedOption] || selectedOption;
    input.dispatchEvent(new CustomEvent('input', { bubbles: true }));
    await page.waitForChanges();
    const expectedEmitValue = selectedOption !== '' ? (typeof items[selectedOption] === 'object' ? (items[selectedOption] as SelectOption).value : items[selectedOption]) : null;
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
      const args = { label: 'label', items: ['blu', 'bli', 'blo', 'bla'], identifier: 'identifier', patternErrorMessage: 'Non' };
      const page = await getPage(args);

      const element = page.doc.querySelector('mg-input-select');
      const input = element.shadowRoot.querySelector('select');

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
    const page = await getPage({ label: 'label', items: ['batman', 'robin', 'joker', 'bane'], identifier: 'identifier', required: true });

    expect(page.root).toMatchSnapshot();

    const element = page.doc.querySelector('mg-input-select');
    const input = element.shadowRoot.querySelector('select');

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
    const page = await getPage({ label: 'label', identifier: 'identifier', items: ['batman', 'robin', 'joker', 'bane'], required: true });

    expect(page.root).toMatchSnapshot();

    const element = page.doc.querySelector('mg-input-select');
    const input = element.shadowRoot.querySelector('select');

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
      error: '<mg-input-select> method "setError()" param "valid" must be a boolean',
    },
    {
      valid: undefined,
      errorMessage: 'Override error',
      error: '<mg-input-select> method "setError()" param "valid" must be a boolean',
    },
    {
      valid: true,
      errorMessage: ' ',
      error: '<mg-input-select> method "setError()" param "errorMessage" must be a string',
    },
    {
      valid: true,
      errorMessage: true,
      error: '<mg-input-select> method "setError()" param "errorMessage" must be a string',
    },
  ])("shloud throw error with setError component's public method invalid params", async params => {
    expect.assertions(1);
    try {
      const page = await getPage({ label: 'label', identifier: 'identifier', items: ['batman', 'robin', 'joker', 'bane'], required: true });
      const element = page.doc.querySelector('mg-input-select');

      await element.setError(params.valid as unknown as boolean, params.errorMessage as unknown as string);
      await page.waitForChanges();
    } catch (err) {
      expect(err.message).toMatch(params.error);
    }
  });

  test.each(['fr', 'xx'])('display error message with locale: %s', async lang => {
    const page = await getPage({ label: 'label', items: ['batman', 'robin', 'joker', 'bane'], identifier: 'identifier', required: true, lang });
    const element = page.doc.querySelector('mg-input-select');
    const input = element.shadowRoot.querySelector('select');

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
    const page = await getPage({ label: 'label', items: ['batman', 'robin', 'joker', 'bane'], identifier: 'identifier', required: true });
    const element = page.doc.querySelector('mg-input-select');
    const input = element.shadowRoot.querySelector('select');

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

    input.value = 'batman';
    input.dispatchEvent(new CustomEvent('input', { bubbles: true }));
    await page.waitForChanges();

    expect(page.rootInstance.hasDisplayedError).toEqual(true);
    expect(page.rootInstance.errorMessage).toBeUndefined();

    input.dispatchEvent(new CustomEvent('blur', { bubbles: true }));
    await page.waitForChanges();

    expect(page.rootInstance.hasDisplayedError).toEqual(false);
  });

  test('Should remove error on input when required change dynamically', async () => {
    const page = await getPage({ label: 'label', items: ['batman', 'robin', 'joker', 'bane'], identifier: 'identifier', required: true });
    const element = page.doc.querySelector('mg-input-select');
    const input = element.shadowRoot.querySelector('select');

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

  test.each([[['batman']], [[{ title: 'batman', value: 'b' }]]])('Should not update value with invalid input value: %s', async items => {
    const page = await getPage({ identifier: 'identifier', label: 'batman', items });
    const element = page.doc.querySelector('mg-input-select');
    const input = element.shadowRoot.querySelector('select');

    input.checkValidity = jest.fn().mockReturnValueOnce(true);
    jest.spyOn(page.rootInstance.inputValid, 'emit');

    input.value = 'hello';
    input.dispatchEvent(new CustomEvent('input', { bubbles: true }));

    await page.waitForChanges();

    expect(element.value).toBe('hello');
    expect(page.rootInstance.inputValid.emit).toHaveBeenCalledWith(false);
  });

  test('Should update mg-width', async () => {
    const page = await getPage({ label: 'label', identifier: 'identifier', items: ['blu', 'bli', 'blo', 'bla'], mgWidth: undefined });
    const element = page.doc.querySelector('mg-input-select');

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
