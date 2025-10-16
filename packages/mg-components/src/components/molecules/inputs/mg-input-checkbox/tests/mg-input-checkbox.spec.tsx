import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { mockWindowFrames } from '../../../../../utils/unit.test.utils';
import { setUpRequestAnimationFrameMock, setupResizeObserverMock } from '@mgdis/core-ui-helpers/dist/tests';
import { toString } from '@mgdis/core-ui-helpers/dist/utils';
import { MgInputCheckbox } from '../mg-input-checkbox';
import messages from '../../../../../locales/en/messages.json';
import { CheckboxValue, checkboxTypes } from '../mg-input-checkbox.conf';
import { MgPopover } from '../../../mg-popover/mg-popover';
import { MgInputText } from '../../mg-input-text/mg-input-text';
import { MgMessage } from '../../../mg-message/mg-message';
import { MgButton } from '../../../../atoms/mg-button/mg-button';
import { MgInputCheckboxPaginated } from '../mg-input-checkbox-paginated/mg-input-checkbox-paginated';
import { MgPopoverContent } from '../../../mg-popover/mg-popover-content/mg-popover-content';
import { MgInputTitle } from '../../../../atoms/internals/mg-input-title/mg-input-title';
import { MgInput } from '../../mg-input/mg-input';
import { tooltipPositions } from '../../mg-input/mg-input.conf';
import { MgTabs } from '../../../mg-tabs/mg-tabs';

mockWindowFrames();

const getPage = async args => {
  const page = await newSpecPage({
    components: [MgInputCheckbox, MgPopover, MgPopoverContent, MgInputText, MgMessage, MgTabs, MgButton, MgInputCheckboxPaginated, MgInputTitle, MgInput],
    template: () => <mg-input-checkbox {...args}></mg-input-checkbox>,
  });

  jest.runAllTimers();
  setUpRequestAnimationFrameMock(jest.runOnlyPendingTimers);
  return page;
};

const getDefaultValues = (): CheckboxValue[] => [
  { title: 'batman', value: true },
  { title: 'robin', value: false, disabled: true },
  { title: 'joker', value: false },
  { title: 'bane', value: null },
];

const getValues = (length?: number): CheckboxValue[] =>
  length > 0
    ? Array.from({ length }, (_, index) => ({
        title: `item ${index + 1}`,
        value: false,
      }))
    : getDefaultValues();

describe('mg-input-checkbox', () => {
  beforeEach(() => {
    jest.useFakeTimers({ legacyFakeTimers: true });
    setupResizeObserverMock({
      observe: () => null,
      disconnect: () => null,
    });
  });

  afterEach(() => {
    jest.runAllTimers();
  });

  describe.each([...checkboxTypes, undefined])('render by type %s', type => {
    let testValues: Partial<MgInputCheckbox>[] = [
      { value: getValues(), type },
      { value: getValues(), type, readonly: true },
      { value: getValues(), type, readonly: true, tooltip: 'tooltip', tooltipPosition: 'input' },
      { value: getValues().map(value => ({ ...value, value: true })), type, readonly: true, tooltip: 'tooltip', tooltipPosition: 'input' },
      { value: getValues().map(value => ({ ...value, value: true })), type, readonly: true },
      { value: getValues().map(value => ({ ...value, value: true })), type, readonly: true, inputVerticalList: true },
      { value: getValues(), type, labelOnTop: true },
      { value: getValues(), type, labelHide: true },
      { value: getValues(), type, inputVerticalList: true },
      { value: getValues(), type, required: true },
      { value: getValues(), type, required: true, readonly: true, helpText: 'Hello joker' },
      { value: getValues(), type, required: true, disabled: true, helpText: 'Hello joker' },
      { value: getValues(), type, readonly: true, labelOnTop: true, tooltip: 'Tooltip message' },
      { value: getValues(), type, disabled: true },
      { value: getValues(), type, helpText: 'Hello joker' },
      { value: getValues(), type, tooltip: 'Batman is a DC Comics license' },
      { value: getValues(), type, tooltip: 'Batman is a DC Comics license', tooltipPosition: 'label' },
      { value: getValues(), type, tooltip: 'Batman is a DC Comics license', tooltipPosition: 'input', labelOnTop: true },
    ];
    if (type === 'multi') {
      testValues = [
        ...testValues,
        ...[true, false].flatMap(displaySelectedValues =>
          [
            { value: getValues(), type: 'multi' as MgInputCheckbox['type'], readonly: true },
            { value: getValues(), type: 'multi' as MgInputCheckbox['type'], disabled: true },
            { value: getValues(), type: 'multi' as MgInputCheckbox['type'], helpText: 'Hello joker' },
            { value: getValues(), type: 'multi' as MgInputCheckbox['type'], tooltip: 'Batman is a DC Comics license' },
          ].map(args => ({ ...args, displaySelectedValues })),
        ),
      ];
    }

    test.each(testValues)('Should render with args %s:', async args => {
      const { root } = await getPage({ label: 'label', identifier: 'identifier', ...args });
      expect(root).toMatchSnapshot();
    });

    test.each(['', ' ', undefined])('Should not render with invalid identifier property: %s', async identifier => {
      expect.assertions(1);
      try {
        await getPage({ identifier, type, value: getValues() });
      } catch (err) {
        expect(err.message).toEqual(`<mg-input> prop "identifier" is required and must be a string. Passed value: ${identifier}.`);
      }
    });

    test.each(['', ' ', undefined])('Should not render with invalid label property: %s', async label => {
      expect.assertions(1);
      try {
        await getPage({ identifier: 'identifier', type, label, value: getValues() });
      } catch (err) {
        expect(err.message).toEqual(`<mg-input> prop "label" is required and must be a string. Passed value: ${label}.`);
      }
    });

    test('Should not render when using labelOnTop and labelHide', async () => {
      expect.assertions(1);
      try {
        await getPage({ identifier: 'identifier', type, label: 'label', value: getValues(), labelOnTop: true, labelHide: true });
      } catch (err) {
        expect(err.message).toEqual('<mg-input> prop "labelOnTop" must not be paired with the prop "labelHide".');
      }
    });

    test.each(['blu', {}, 5, false])('Should not render with invalid tooltipPosition property: %s', async tooltipPosition => {
      expect.assertions(1);
      try {
        await getPage({ identifier: 'identifier', type, label: 'label', value: getValues(), tooltipPosition });
      } catch (err) {
        expect(err.message).toEqual(`<mg-input> prop "tooltipPosition" must be one of: ${tooltipPositions.join(', ')}. Passed value: ${toString(tooltipPosition)}.`);
      }
    });

    test.each([undefined, ['batman', 'joker', 'bane']])('Should not render with invalid value property: %s', async value => {
      expect.assertions(1);
      try {
        await getPage({ identifier: 'identifier', type, label: 'label', value });
      } catch (err) {
        expect(err.message).toEqual(`<mg-input-checkbox> prop "value" is required and all values must be the same type, CheckboxItem. Passed value: ${toString(value)}.`);
      }
    });

    test.each([true, false])('Should trigger events, case validity check %s', async validity => {
      const value = getValues().map((item, index) => ({ ...item, value: index === 0 ? !validity : false }));
      const page = await getPage({ label: 'label', type, identifier: 'identifier', value, required: true });
      const element = page.doc.querySelector('mg-input-checkbox');
      const allInputs: HTMLInputElement[] = Array.from(element.shadowRoot.querySelectorAll('input'));

      // define spys
      jest.spyOn(page.rootInstance.valueChange, 'emit');
      jest.spyOn(page.rootInstance.inputValid, 'emit');

      // define validity mock
      const validityState = input => ({
        valueMissing: !Boolean(input.value),
      });

      allInputs.forEach(input => {
        input.checkValidity = jest.fn(() => {
          return !Object.values(validityState(input)).some(val => val);
        });
        Object.defineProperty(input, 'validity', {
          get: jest.fn(() => validityState(input)),
        });
      });

      // trigger 'focus' event
      const index = validity ? 2 : 0;
      const input = allInputs[index];
      input.dispatchEvent(new CustomEvent('focus', { bubbles: true }));

      await page.waitForChanges();

      expect(element.valid).toEqual(!validity);
      expect(page.rootInstance.inputValid.emit).not.toHaveBeenCalled();
      expect(page.root).toMatchSnapshot(); //Snapshot on focus

      // update input and trigger 'input' validity must be toggled
      input.checked = validity;
      input.dispatchEvent(new CustomEvent('input', { bubbles: true }));

      await page.waitForChanges();

      expect(element.valid).toEqual(validity);
      expect(page.rootInstance.inputValid.emit).toHaveBeenCalledWith(validity);
      const emittedValue = value.map((val, i) => ({
        ...val,
        value: i !== index ? val.value : input.checked,
      }));
      expect(page.rootInstance.valueChange.emit).toHaveBeenCalledWith(emittedValue);

      // trigger 'blur' without validity update
      input.dispatchEvent(new CustomEvent('blur', { bubbles: true }));

      await page.waitForChanges();

      expect(element.valid).toEqual(validity);
      expect(page.rootInstance.inputValid.emit).toHaveBeenCalledTimes(1);
      expect(page.rootInstance.valueChange.emit).toHaveBeenCalledTimes(1);
      expect(page.root).toMatchSnapshot(); //Snapshot on blur
    });

    describe.each(['readonly', 'disabled'])('validity, case next state is %s', nextState => {
      test.each([
        { validity: true, valueMissing: false },
        { validity: false, valueMissing: true },
        { validity: false, valueMissing: false },
      ])('validity (%s), valueMissing (%s)', async ({ validity, valueMissing }) => {
        const value = getValues().map((item, index) => ({ ...item, value: !valueMissing && index === 1 }));
        const args = { label: 'label', identifier: 'identifier', type, value, helpText: 'My help text', required: true };
        const page = await getPage(args);
        const element = page.doc.querySelector('mg-input-checkbox');
        const allInputs = element.shadowRoot.querySelectorAll('input');
        const input = allInputs[0];

        //mock validity
        allInputs.forEach(input => {
          input.checkValidity = jest.fn(() => validity);
          Object.defineProperty(input, 'validity', {
            get: jest.fn(() => ({
              valueMissing,
            })),
          });
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

    test('Should display error message on value change', async () => {
      const value = getValues().map((props, index) => ({ ...props, value: index === 0 }));
      const args = { label: 'label', identifier: 'identifier', type, value, helpText: 'My help text', required: true };
      const page = await getPage(args);

      expect(page.root).toMatchSnapshot();

      const element = page.doc.querySelector('mg-input-checkbox');
      const allInputs = element.shadowRoot.querySelectorAll('input');
      const input = allInputs[0];
      const spyInputValidEvent = jest.spyOn(page.rootInstance.inputValid, 'emit');
      const spyValueChangeEvent = jest.spyOn(page.rootInstance.valueChange, 'emit');

      const checkValidity = jest.fn(() => false);

      //mock validity
      allInputs.forEach(input => {
        input.checkValidity = checkValidity;
        Object.defineProperty(input, 'validity', {
          get: jest.fn(() => ({
            valueMissing: true,
          })),
        });
      });

      input.checked = false;
      input.dispatchEvent(new CustomEvent('input', { bubbles: true }));
      await page.waitForChanges();

      expect(page.rootInstance.valid).toEqual(false);
      expect(page.rootInstance.invalid).toEqual(true);
      expect(spyInputValidEvent).toHaveBeenLastCalledWith(false);
      expect(spyValueChangeEvent).toHaveBeenLastCalledWith(getValues().map(props => ({ ...props, value: false })));
      expect(page.root).toMatchSnapshot(); //Snapshot with readonly/disabled TRUE
    });

    test.each([true, false].flatMap(valid => [true, false].map(lock => ({ valid, lock }))))(
      "should display override error with setError component's public method (%s)",
      async ({ valid, lock }) => {
        const getErrorMessage = (element: HTMLMgInputCheckboxElement) => element.shadowRoot.querySelector('#identifier-error')?.textContent;

        const customErrorMessage = 'Override error';
        const page = await getPage({
          label: 'label',
          identifier: 'identifier',
          type,
          value: getValues().map(item => ({ ...item, value: false })),
          helpText: 'My help text',
          required: true,
        });

        expect(page.root).toMatchSnapshot();

        const element = page.doc.querySelector('mg-input-checkbox');
        const inputs = Array.from(element.shadowRoot.querySelectorAll('input'));

        //mock validity
        inputs.forEach(input => {
          Object.defineProperty(input, 'validity', {
            get: () => ({ valueMissing: true }),
          });
        });

        await element.setError(valid, customErrorMessage, lock);

        await page.waitForChanges();

        if (valid) {
          expect(getErrorMessage(element)).toEqual(undefined);
        } else {
          expect(getErrorMessage(element)).toEqual(customErrorMessage);
        }
        expect(page.root).toMatchSnapshot();

        inputs[0].dispatchEvent(new CustomEvent('blur', { bubbles: true }));
        await page.waitForChanges();

        if (lock) {
          if (valid) {
            expect(getErrorMessage(element)).toEqual(undefined);
          } else {
            expect(getErrorMessage(element)).toEqual(customErrorMessage);
          }
        } else {
          expect(getErrorMessage(element)).toEqual('This field is required.');
        }
        expect(page.root).toMatchSnapshot();
      },
    );

    test.each([
      {
        valid: '',
        errorMessage: 'Override error',
        error: '<mg-input-checkbox> method "setError()" param "valid" must be a boolean.',
      },
      {
        valid: undefined,
        errorMessage: 'Override error',
        error: '<mg-input-checkbox> method "setError()" param "valid" must be a boolean.',
      },
      {
        valid: true,
        errorMessage: ' ',
        error: '<mg-input-checkbox> method "setError()" param "errorMessage" must be a string.',
      },
      {
        valid: true,
        errorMessage: true,
        error: '<mg-input-checkbox> method "setError()" param "errorMessage" must be a string.',
      },
    ])("shloud throw error with setError component's public method invalid params", async params => {
      expect.assertions(1);
      try {
        const page = await getPage({ label: 'label', identifier: 'identifier', type, value: getValues(), helpText: 'My help text', required: true });
        const element = page.doc.querySelector('mg-input-checkbox');

        await element.setError(params.valid as unknown as boolean, params.errorMessage as unknown as string);
        await page.waitForChanges();
      } catch (err) {
        expect(err.message).toEqual(params.error);
      }
    });

    test("display error with displayError component's public method", async () => {
      const value = getValues();
      value[0].value = false;
      const page = await getPage({ label: 'label', identifier: 'identifier', type, value, helpText: 'My help text', required: true });

      expect(page.root).toMatchSnapshot();

      const element = page.doc.querySelector('mg-input-checkbox');
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

    test.each(['fr', 'xx'])('Should render component error with locale: %s', async lang => {
      const value = getValues();
      value[0].value = false;
      const page = await getPage({ label: 'label', identifier: 'identifier', type, value, helpText: 'My help text', required: true, lang });
      const element = page.doc.querySelector('mg-input-checkbox');
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

    test.each([[[true, false].flatMap(value => getValues(11).map(item => ({ ...item, value })))]])('Should render component with locale "fr"', async value => {
      const page = await getPage({ label: 'label', identifier: 'identifier', value, lang: 'fr' });

      expect(page.root).toMatchSnapshot();
    });

    test('Should remove error on input when required change dynamically', async () => {
      const page = await getPage({
        label: 'label',
        identifier: 'identifier',
        value: [
          { title: 'batman', value: false },
          { title: 'robin', value: false },
        ],
        required: true,
        type,
      });
      const element = page.doc.querySelector('mg-input-checkbox');
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

    test('Should enable "displaySearchInput" when value list is greater than 10', async () => {
      const { root } = await getPage({ label: 'label', identifier: 'identifier', value: getValues(11), type });
      expect(root).toMatchSnapshot();
    });

    test.each([
      {
        selectButtonMessage: 'select button message',
        value: getValues(2),
      },
      {
        editButtonMessage: 'edit button message',
        value: getValues(2).map((item, i) => {
          if (i === 0) item.value = true;
          return item;
        }),
      },
      {
        showButtonMessage: 'show button message',
        value: getValues(2),
        disabled: true,
      },
    ])('Should render with custom locales: %s', async ({ value, disabled, selectButtonMessage, editButtonMessage, showButtonMessage }) => {
      const { root } = await getPage({
        label: 'label',
        identifier: 'identifier',
        value,
        type,
        selectButtonMessage,
        editButtonMessage,
        showButtonMessage,
        disabled,
      });
      expect(root).toMatchSnapshot();
    });
  });

  describe.each(['disabled', 'readonly', 'required'])('prop: %s', (propName: string) => {
    test(`Should update inputs with props update`, async () => {
      const propValue = false;
      const page = await getPage({ label: 'label', identifier: 'identifier', [propName]: propValue, value: getDefaultValues() });
      const checkbox = page.doc.querySelector('mg-input-checkbox');
      expect(page.root).toMatchSnapshot();

      checkbox[propName] = !propValue;
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();

      checkbox[propName] = propValue;
      await page.waitForChanges();

      if (propName !== 'readonly') {
        const disabledInputLabel = checkbox.shadowRoot.querySelector('.mg-c-input__input-group--disabled > label');
        expect(disabledInputLabel.textContent).toEqual('robin');
      }
      expect(page.root).toMatchSnapshot();
    });
  });

  test('Should log an error with invalid "identifier" property', async () => {
    const identifier = '{{batman}}';
    const spy = jest.spyOn(console, 'error');
    expect.assertions(1);

    try {
      await getPage({ identifier, type: 'multi', label: 'label', value: getValues() });
    } catch {
      expect(spy).toHaveBeenCalledWith(`<mg-input> prop "identifier" value is invalid. Passed value: ${identifier}.`);
    }
  });

  describe('navigation', () => {
    test('Should NOT manage keyboard "tab" navigation on "checkbox" type', async () => {
      const page = await getPage({ label: 'label', identifier: 'identifier', value: getValues(), type: 'checkbox', tooltip: 'Tooltip message' });
      const element = page.doc.querySelector('mg-input-checkbox');
      const allInputs = Array.from(element.shadowRoot.querySelectorAll('input'));

      allInputs.forEach(input => input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' })));
      jest.runOnlyPendingTimers();
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();

      allInputs[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }));
      jest.runOnlyPendingTimers();
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();
    });

    test('Should render error when uncheck from label click', async () => {
      const page = await getPage({ label: 'label', identifier: 'identifier', value: getValues(), type: 'checkbox', tooltip: 'Tooltip message', required: true });
      const element = page.doc.querySelector('mg-input-checkbox');
      const allInputs = Array.from(element.shadowRoot.querySelectorAll('input'));
      const label = element.shadowRoot.querySelector('label');
      const input = allInputs[0];

      //mock validity
      allInputs.forEach(input => {
        input.checkValidity = jest.fn(() => false);
        Object.defineProperty(input, 'validity', {
          get: jest.fn(() => ({
            valueMissing: true,
          })),
        });
      });

      // mock trigger input click when label is clicked
      label.addEventListener('click', () => {
        input.checked = !input.checked;
        input.dispatchEvent(new CustomEvent('input', { bubbles: true }));
        // when input change from a label "click" event a "blur" event is emit
        input.dispatchEvent(new MouseEvent('blur', { bubbles: true }));
      });

      expect(page.root).toMatchSnapshot(); //Snapshot initial

      label.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      await page.waitForChanges();

      expect(input.value).toEqual('false');
      expect(page.root).toMatchSnapshot(); //Snapshot on click

      input.dispatchEvent(new CustomEvent('blur', { bubbles: true }));
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot(); //Snapshot on blur
    });

    test.each(['next', 'prev'])('should manage keyboard "tab" navigation on "multi" type', async direction => {
      const page = await getPage({
        label: 'label',
        identifier: 'identifier',
        value: getValues(9),
        type: 'multi',
        tooltip: 'Tooltip message',
      });
      const element = page.doc.querySelector('mg-input-checkbox');
      const allInputs = Array.from(element.shadowRoot.querySelectorAll('input'));
      const button = element.shadowRoot.querySelector('mg-button');
      const popover = element.shadowRoot.querySelector('mg-popover');

      button.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      jest.runOnlyPendingTimers();
      await page.waitForChanges();

      expect(popover.display).toEqual(true);

      if (direction === 'next') for await (const input of allInputs) input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }));
      else if (direction === 'prev') allInputs[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true }));
      jest.runOnlyPendingTimers();
      await page.waitForChanges();

      expect(popover.display).toEqual(false);
    });

    test('Should manage keyboard "shift+tab" navigation on "multi" type', async () => {
      const page = await getPage({
        label: 'label',
        identifier: 'identifier',
        value: getValues(11),
        type: 'multi',
        tooltip: 'Tooltip message',
      });
      const element = page.doc.querySelector('mg-input-checkbox');
      const searchInput = element.shadowRoot.querySelector('mg-input-text').shadowRoot.querySelector('input');
      const button = element.shadowRoot.querySelector('mg-button');
      const popover = element.shadowRoot.querySelector('mg-popover');

      button.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      jest.runOnlyPendingTimers();
      await page.waitForChanges();

      expect(popover.display).toEqual(true);

      searchInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true }));
      jest.runOnlyPendingTimers();
      await page.waitForChanges();

      expect(popover.display).toEqual(false);
    });
  });

  test.each([' ', 'batman'])('Should not render with invalid type property: %s', async type => {
    expect.assertions(1);
    try {
      await getPage({ identifier: 'identifier', type, label: 'label', value: getValues() });
    } catch (err) {
      expect(err.message).toEqual(`<mg-input-checkbox> prop "type" must be a CheckboxType. Passed value: ${type}.`);
    }
  });

  describe('multi search', () => {
    test('Should enable return search result and update pagination', async () => {
      const value = getValues(21);
      const getResultList = (mgInputCheckbox: HTMLMgInputCheckboxElement) => Array.from(mgInputCheckbox.shadowRoot.querySelectorAll('li'));
      const page = await getPage({ label: 'label', identifier: 'identifier', value });
      expect(page.root).toMatchSnapshot();

      const mgInputCheckbox = page.doc.querySelector('mg-input-checkbox');
      const mgPopover = mgInputCheckbox.shadowRoot.querySelector('mg-popover');
      const searchInput = mgInputCheckbox.shadowRoot.querySelector('mg-input-text');

      mgPopover.display = true;
      await page.waitForChanges();
      jest.runOnlyPendingTimers();

      let resultList = getResultList(mgInputCheckbox);

      expect(resultList.length).toEqual(10);

      searchInput.dispatchEvent(new CustomEvent('value-change', { detail: '2' }));
      await page.waitForChanges();

      resultList = getResultList(mgInputCheckbox);
      expect(resultList.length).toEqual(4);
      expect(page.root).toMatchSnapshot();

      searchInput.dispatchEvent(new CustomEvent('value-change', { detail: '11' }));
      await page.waitForChanges();

      resultList = getResultList(mgInputCheckbox);
      expect(resultList.length).toEqual(1);
      expect(page.root).toMatchSnapshot();

      searchInput.dispatchEvent(new CustomEvent('value-change', { detail: '111' }));
      await page.waitForChanges();

      resultList = getResultList(mgInputCheckbox);
      expect(resultList.length).toEqual(0);
      expect(page.root).toMatchSnapshot();

      mgPopover.display = false;
      await page.waitForChanges();
      jest.runOnlyPendingTimers();

      expect(searchInput.value).toEqual('');
      expect(page.root).toMatchSnapshot();
    });

    test('Should reset pagination when popover is closed', async () => {
      const value = getValues(21);
      const page = await getPage({ label: 'label', identifier: 'identifier', value });
      expect(page.root).toMatchSnapshot();

      const mgInputCheckbox = page.doc.querySelector('mg-input-checkbox');
      const mgPopover = mgInputCheckbox.shadowRoot.querySelector('mg-popover');
      const loadmoreButton = mgInputCheckbox.shadowRoot.querySelector('mg-input-checkbox-paginated mg-button.mg-c-input__load-more');

      mgPopover.display = true;
      await page.waitForChanges();
      jest.runOnlyPendingTimers();

      expect(page.root).toMatchSnapshot();

      loadmoreButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();

      mgPopover.display = false;
      await page.waitForChanges();
      jest.runOnlyPendingTimers();

      expect(page.root).toMatchSnapshot();
    });

    test('Should search and update values', async () => {
      const value = getValues(21);
      const page = await getPage({ label: 'label', identifier: 'identifier', value });
      expect(page.root).toMatchSnapshot();

      const mgInputCheckbox = page.doc.querySelector('mg-input-checkbox');
      const mgPopover = mgInputCheckbox.shadowRoot.querySelector('mg-popover');
      const searchInput = mgInputCheckbox.shadowRoot.querySelector('mg-input-text');

      mgPopover.display = true;
      await page.waitForChanges();
      jest.runOnlyPendingTimers();

      searchInput.dispatchEvent(new CustomEvent('value-change', { detail: '2' }));
      await page.waitForChanges();

      const input = mgInputCheckbox.shadowRoot.querySelector('input');
      input.checkValidity = () => true;
      input.checked = true;

      input.dispatchEvent(new CustomEvent('input', { bubbles: true }));
      await page.waitForChanges();

      expect(mgInputCheckbox.value.find(item => item.value)).toHaveProperty('title', 'item 2');
      expect(page.root).toMatchSnapshot();

      mgPopover.display = false;
      await page.waitForChanges();
      jest.runOnlyPendingTimers();

      expect(page.root).toMatchSnapshot();
    });

    test('Should load-more items when button is clicked', async () => {
      const value = getValues(21);
      const getResultList = (mgInputCheckbox: HTMLMgInputCheckboxElement) => Array.from(mgInputCheckbox.shadowRoot.querySelectorAll('li'));
      const page = await getPage({ label: 'label', identifier: 'identifier', value });
      expect(page.root).toMatchSnapshot();

      const mgInputCheckbox = page.doc.querySelector('mg-input-checkbox');
      const mgPopover = mgInputCheckbox.shadowRoot.querySelector('mg-popover');
      const loadMoreButton = mgInputCheckbox.shadowRoot.querySelector('mg-input-checkbox-paginated:first-of-type mg-button.mg-c-input__load-more');

      mgPopover.display = true;
      await page.waitForChanges();
      jest.runOnlyPendingTimers();

      let resultList = getResultList(mgInputCheckbox);

      expect(resultList.length).toEqual(10);

      loadMoreButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await page.waitForChanges();

      resultList = getResultList(mgInputCheckbox);
      expect(resultList.length).toEqual(20);
      expect(page.root).toMatchSnapshot();

      loadMoreButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await page.waitForChanges();

      resultList = getResultList(mgInputCheckbox);
      expect(resultList.length).toEqual(21);
      expect(page.root).toMatchSnapshot();
    });

    test('Should update all values with mass actions', async () => {
      const value = getValues(21);
      const getResultList = (mgInputCheckbox: HTMLMgInputCheckboxElement) => Array.from(mgInputCheckbox.shadowRoot.querySelectorAll('input'));
      const page = await getPage({ label: 'label', identifier: 'identifier', value });
      expect(page.root).toMatchSnapshot();

      const mgInputCheckbox = page.doc.querySelector('mg-input-checkbox');
      const mgPopover = mgInputCheckbox.shadowRoot.querySelector('mg-popover');

      mgPopover.display = true;
      await page.waitForChanges();
      jest.runOnlyPendingTimers();

      let resultList = getResultList(mgInputCheckbox);

      expect(resultList.filter(item => item.value === 'true').length).toEqual(0);
      expect(mgInputCheckbox.value.filter(item => item.value).length).toEqual(0);
      expect(page.root).toMatchSnapshot();

      const selectAllButton = mgInputCheckbox.shadowRoot.querySelector('mg-input-checkbox-paginated:first-of-type mg-button');
      selectAllButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await page.waitForChanges();

      resultList = getResultList(mgInputCheckbox);
      expect(resultList.filter(item => item.value === 'true').length).toEqual(10);
      expect(mgInputCheckbox.value.filter(item => item.value).length).toEqual(21);
      expect(page.root).toMatchSnapshot();

      const unselectAllButton = mgInputCheckbox.shadowRoot.querySelector('mg-input-checkbox-paginated:last-of-type mg-button');
      unselectAllButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await page.waitForChanges();

      resultList = getResultList(mgInputCheckbox);
      expect(resultList.filter(item => item.value === 'true').length).toEqual(0);
      expect(mgInputCheckbox.value.filter(item => item.value).length).toEqual(0);
      expect(page.root).toMatchSnapshot();
    });

    test('Should select all filtered values', async () => {
      const value = getValues(21);
      const page = await getPage({ label: 'label', identifier: 'identifier', value });
      const getResultList = (mgInputCheckbox: HTMLMgInputCheckboxElement) => Array.from(mgInputCheckbox.shadowRoot.querySelectorAll('input'));

      const mgInputCheckbox = page.doc.querySelector('mg-input-checkbox');
      const mgPopover = mgInputCheckbox.shadowRoot.querySelector('mg-popover');
      const searchInput = mgInputCheckbox.shadowRoot.querySelector('mg-input-text');
      const selectAllButton = mgInputCheckbox.shadowRoot.querySelector('mg-input-checkbox-paginated:first-of-type mg-button');

      const valueChangeSpy = jest.spyOn(page.rootInstance.valueChange, 'emit');

      mgPopover.display = true;
      await page.waitForChanges();
      jest.runOnlyPendingTimers();

      let resultList = getResultList(mgInputCheckbox);

      // Should not have any value selected
      expect(resultList.filter(item => item.value === 'true').length).toEqual(0);
      expect(mgInputCheckbox.value.filter(item => item.value).length).toEqual(0);
      expect(page.root).toMatchSnapshot();

      // Filter
      searchInput.dispatchEvent(new CustomEvent('value-change', { detail: '2' }));
      await page.waitForChanges();

      expect(valueChangeSpy).not.toHaveBeenCalled(); // Ensure search input event propagation is stopped

      resultList = getResultList(mgInputCheckbox);
      expect(resultList).toHaveLength(4);
      expect(resultList.filter(item => item.value === 'true').length).toEqual(0);

      // Select All
      selectAllButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await page.waitForChanges();

      expect(valueChangeSpy).toHaveBeenCalledTimes(1);

      // Should have all value selected
      resultList = getResultList(mgInputCheckbox);
      expect(resultList.filter(item => item.value === 'true').length).toEqual(4);
      expect(page.root).toMatchSnapshot();
    });

    test('Should not update disabled values on mass action', async () => {
      const value = getValues(21).map((item, i) => ({
        ...item,
        disabled: [1, 2, 3, 4].includes(i),
        value: [1, 2].includes(i),
      }));
      const page = await getPage({ label: 'label', identifier: 'identifier', value });
      const getResultList = (mgInputCheckbox: HTMLMgInputCheckboxElement) => Array.from(mgInputCheckbox.shadowRoot.querySelectorAll('input'));

      const mgInputCheckbox = page.doc.querySelector('mg-input-checkbox');
      const mgPopover = mgInputCheckbox.shadowRoot.querySelector('mg-popover');
      let unselectAllButton = mgInputCheckbox.shadowRoot.querySelector('mg-input-checkbox-paginated:last-of-type mg-tootlip mg-button');
      let selectAllButton = mgInputCheckbox.shadowRoot.querySelector('mg-input-checkbox-paginated:first-of-type mg-button');

      const valueChangeSpy = jest.spyOn(page.rootInstance.valueChange, 'emit');

      mgPopover.display = true;
      await page.waitForChanges();
      jest.runOnlyPendingTimers();

      let resultList = getResultList(mgInputCheckbox);

      // Should not have display Unselect All button since all selected values are disabled
      expect(unselectAllButton).toBeNull();
      expect(selectAllButton).toBeDefined();
      expect(resultList.filter(item => item.value === 'true').length).toEqual(2);
      expect(page.root).toMatchSnapshot();

      // Select All
      selectAllButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await page.waitForChanges();

      unselectAllButton = mgInputCheckbox.shadowRoot.querySelector('mg-input-checkbox-paginated:last-of-type mg-tootlip mg-button');
      selectAllButton = mgInputCheckbox.shadowRoot.querySelector('mg-input-checkbox-paginated:first-of-type mg-button');
      resultList = getResultList(mgInputCheckbox);

      // Should not have display Select All button since all unselected values are disabled
      expect(unselectAllButton).toBeDefined();
      expect(selectAllButton).toBeNull();
      expect(valueChangeSpy).toHaveBeenCalledTimes(1);
      expect(resultList.filter(item => item.value === 'true').length).toEqual(10);

      expect(page.root).toMatchSnapshot();
    });
  });

  describe('mode auto', () => {
    test('Should define the type and display search depending on the value length', async () => {
      const page = await getPage({ label: 'label', identifier: 'identifier', value: getValues(3) });
      expect(page.root).toMatchSnapshot();

      const mgInputCheckbox = page.doc.querySelector('mg-input-checkbox');
      jest.runOnlyPendingTimers();

      for (const value of [6, 11, 7, 2]) {
        mgInputCheckbox.value = getValues(value);
        await page.waitForChanges();
        jest.runOnlyPendingTimers();

        expect(page.root).toMatchSnapshot();
      }
    });
  });

  test.each([true, false])("should trigger input focus method with setFocus() component's public method, readonly %s", async readonly => {
    const page = await getPage({ label: 'label', identifier: 'identifier', value: getValues(3), readonly });
    const element = page.doc.querySelector('mg-input-checkbox');
    const input = element.shadowRoot.querySelector('input');

    if (input !== null) input.focus = jest.fn();

    await element.setFocus();

    await page.waitForChanges();

    if (readonly) {
      expect(input).toBeNull();
    } else {
      expect(input.focus).toHaveBeenCalled();
    }
  });

  describe('reset method', () => {
    test('Should reset invalid input', async () => {
      // Initial setup with two checkboxes
      const value = [
        { title: 'Chase', value: false },
        { title: 'Marshall', value: false },
      ];
      const page = await getPage({ label: 'label', identifier: 'identifier', value });
      const element = page.doc.querySelector('mg-input-checkbox');
      const allInputs = element.shadowRoot.querySelectorAll('input');
      const input = allInputs[0];

      // Check first checkbox
      input.checked = true;
      input.dispatchEvent(new CustomEvent('input', { bubbles: true }));
      await page.waitForChanges();

      // Verify initial value
      expect(element.value).toEqual([
        { title: 'Chase', value: true },
        { title: 'Marshall', value: false },
      ]);

      const requestAnimationFrameSpy = jest.spyOn(global, 'requestAnimationFrame');
      // Call reset method
      await element.reset();
      await page.waitForChanges();

      expect(requestAnimationFrameSpy).toHaveBeenCalled();
      // Verify value has been reset
      expect(element.value).toEqual([
        { title: 'Chase', value: false },
        { title: 'Marshall', value: false },
      ]);
    });

    test.each([true, false])('Should reset displayed error, lock %s', async lock => {
      // Initial setup with two checkboxes
      const value = [
        { title: 'Chase', value: false },
        { title: 'Marshall', value: false },
      ];
      const page = await getPage({ label: 'label', identifier: 'identifier', value });
      const element = page.doc.querySelector('mg-input-checkbox');

      // Set error message
      await element.setError(false, "Message d'erreur de test", lock);
      await page.waitForChanges();

      // Verify initial state
      expect(page.root).toMatchSnapshot();

      const requestAnimationFrameSpy = jest.spyOn(global, 'requestAnimationFrame');
      // Call reset method
      await element.reset();
      await page.waitForChanges();

      expect(requestAnimationFrameSpy).toHaveBeenCalled();
      // Verify reset state
      expect(element.shadowRoot.querySelector('#identifier-error')?.textContent).toEqual(undefined);
      expect(page.root).toMatchSnapshot();
    });

    test('Should not reset value when readonly', async () => {
      // Initial setup with two checkboxes in readonly mode
      const value = [
        { title: 'Chase', value: true },
        { title: 'Marshall', value: false },
      ];
      const page = await getPage({ label: 'label', identifier: 'identifier', value, readonly: true });
      const element = page.doc.querySelector('mg-input-checkbox');

      // Capture initial value
      const initialValue = element.value;

      const requestAnimationFrameSpy = jest.spyOn(global, 'requestAnimationFrame');
      // Try to reset
      await element.reset();
      await page.waitForChanges();

      expect(requestAnimationFrameSpy).not.toHaveBeenCalled();
      // Verify value remains unchanged
      expect(element.value).toEqual(initialValue);
    });
  });
});
