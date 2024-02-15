import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { mockWindowFrames } from '../../../../../utils/unit.test.utils';
import { setupResizeObserverMock } from '@mgdis/stencil-helpers';
import { MgInputCheckbox } from '../mg-input-checkbox';
import messages from '../../../../../locales/en/messages.json';
import { CheckboxValue, checkboxTypes } from '../mg-input-checkbox.conf';
import { MgPopover } from '../../../mg-popover/mg-popover';
import { MgInputText } from '../../mg-input-text/mg-input-text';
import { MgMessage } from '../../../mg-message/mg-message';
import { MgPagination } from '../../../mg-pagination/mg-pagination';
import { MgButton } from '../../../../atoms/mg-button/mg-button';
import { MgInputCheckboxPaginated } from '../mg-input-checkbox-paginated/mg-input-checkbox-paginated';
import { MgPopoverContent } from '../../../mg-popover/mg-popover-content/mg-popover-content';
import { MgInputTitle } from '../../../../atoms/mg-input-title/mg-input-title';
import { MgInput } from '../../mg-input/mg-input';

mockWindowFrames();

const getPage = args => {
  const page = newSpecPage({
    components: [MgInputCheckbox, MgPopover, MgPopoverContent, MgInputText, MgMessage, MgPagination, MgButton, MgInputCheckboxPaginated, MgInputTitle, MgInput],
    template: () => <mg-input-checkbox {...args}></mg-input-checkbox>,
  });

  jest.runAllTimers();
  return page;
};

const getDefaultValues = (): CheckboxValue[] =>
  [
    { title: 'batman', value: true },
    { title: 'robin', value: false, disabled: true },
    { title: 'joker', value: false },
    { title: 'bane', value: null },
  ].map(item => item);

const getValues = (length?: number): CheckboxValue[] =>
  length
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
    jest.runOnlyPendingTimers();
  });

  describe.each([...checkboxTypes, undefined])('render by type %s', type => {
    let testValues: unknown[] = [
      { label: 'label', identifier: 'identifier', value: getValues(), type },
      { label: 'label', identifier: 'identifier', value: getValues(), type, readonly: true },
      { label: 'label', identifier: 'identifier', value: getValues().map(value => ({ ...value, value: true })), type, readonly: true },
      { label: 'label', identifier: 'identifier', value: getValues().map(value => ({ ...value, value: true })), type, readonly: true, inputVerticalList: true },
      { label: 'label', identifier: 'identifier', value: getValues(), type, labelOnTop: true },
      { label: 'label', identifier: 'identifier', value: getValues(), type, labelHide: true },
      { label: 'label', identifier: 'identifier', value: getValues(), type, inputVerticalList: true },
      { label: 'label', identifier: 'identifier', value: getValues(), type, required: true },
      { label: 'label', identifier: 'identifier', value: getValues(), type, required: true, readonly: true, helpText: 'Hello joker' },
      { label: 'label', identifier: 'identifier', value: getValues(), type, required: true, disabled: true, helpText: 'Hello joker' },
      { label: 'label', identifier: 'identifier', value: getValues(), type, readonly: true, labelOnTop: true, tooltip: 'Tooltip message' },
      { label: 'label', identifier: 'identifier', value: getValues(), type, disabled: true },
      { label: 'label', identifier: 'identifier', value: getValues(), type, helpText: 'Hello joker' },
      { label: 'label', identifier: 'identifier', value: getValues(), type, tooltip: 'Batman is a DC Comics license' },
      { label: 'label', identifier: 'identifier', value: getValues(), type, tooltip: 'Batman is a DC Comics license', tooltipPosition: 'label' },
      { label: 'label', identifier: 'identifier', value: getValues(), type, tooltip: 'Batman is a DC Comics license', tooltipPosition: 'input', labelOnTop: true },
    ];
    if (type === 'multi') {
      testValues = [
        ...testValues,
        ...[true, false].flatMap(displaySelectedValues =>
          [
            { label: 'label', identifier: 'identifier', value: getValues(), type: 'multi', readonly: true },
            { label: 'label', identifier: 'identifier', value: getValues(), type: 'multi', disabled: true },
            { label: 'label', identifier: 'identifier', value: getValues(), type: 'multi', helpText: 'Hello joker' },
            { label: 'label', identifier: 'identifier', value: getValues(), type: 'multi', tooltip: 'Batman is a DC Comics license' },
          ].map(args => ({ ...args, displaySelectedValues })),
        ),
      ];
    }
    test.each(testValues)('Should render with args %s:', async args => {
      const { root } = await getPage(args);
      expect(root).toMatchSnapshot();
    });

    test.each(['', ' ', undefined])('Should not render with invalid identifier property: %s', async identifier => {
      expect.assertions(1);
      try {
        await getPage({ identifier, type, value: getValues() });
      } catch (err) {
        expect(err.message).toMatch('<mg-input> prop "identifier" is required.');
      }
    });

    test.each(['', ' ', undefined])('Should not render with invalid label property: %s', async label => {
      expect.assertions(1);
      try {
        await getPage({ identifier: 'identifier', type, label, value: getValues() });
      } catch (err) {
        expect(err.message).toMatch('<mg-input> slot "title" is required and must be a <mg-input-title /> element.');
      }
    });

    test('Should not render when using labelOnTop and labelHide', async () => {
      expect.assertions(1);
      try {
        await getPage({ identifier: 'identifier', type, label: 'label', value: getValues(), labelOnTop: true, labelHide: true });
      } catch (err) {
        expect(err.message).toMatch('<mg-input> prop "labelOnTop" must not be paired with the prop "labelHide".');
      }
    });

    test.each(['blu', {}, 5, false])('Should not render with invalid tooltipPosition property: %s', async tooltipPosition => {
      expect.assertions(1);
      try {
        await getPage({ identifier: 'identifier', type, label: 'label', value: getValues(), tooltipPosition });
      } catch (err) {
        expect(err.message).toMatch('<mg-input> prop "tooltipPosition" must be one of: ');
      }
    });

    test.each([
      { identifier: 'identifier', type, label: 'label', value: undefined },
      { identifier: 'identifier', type, label: 'label', value: ['batman', 'joker', 'bane'] },
    ])('Should not render with invalid value property: %s', async args => {
      expect.assertions(1);
      try {
        await getPage(args);
      } catch (err) {
        expect(err.message).toMatch('<mg-input-checkbox> prop "value" is required and all values must be the same type, CheckboxItem.');
      }
    });

    test.each([true, false])('Should trigger events, case validity check %s', async validity => {
      const value = getValues().map((item, index) => ({ ...item, value: false, id: index, required: item.required, disabled: item.disabled, hero: 'batman' }));
      value[0].value = !validity;
      const page = await getPage({ label: 'label', type, identifier: 'identifier', helpText: 'My help text', value, required: true });
      const element = page.doc.querySelector('mg-input-checkbox');
      const allInputs = element.shadowRoot.querySelectorAll('input');
      const index = validity ? 2 : 0;
      const input = allInputs[index];

      //mock validity
      allInputs.forEach(input => {
        input.checkValidity = jest.fn(() => validity);
        Object.defineProperty(input, 'validity', {
          get: jest.fn(() => ({
            valueMissing: !validity,
          })),
        });
      });

      jest.spyOn(page.rootInstance.valueChange, 'emit');
      const inputValidSpy = jest.spyOn(page.rootInstance.inputValid, 'emit');

      input.dispatchEvent(new CustomEvent('focus', { bubbles: true }));
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot(); //Snapshot on focus

      input.checked = validity;
      input.dispatchEvent(new CustomEvent('input', { bubbles: true }));

      const emittedValue = value;
      emittedValue[index].value = input.checked;
      await page.waitForChanges();
      expect(page.rootInstance.valueChange.emit).toHaveBeenCalledWith(emittedValue);

      input.dispatchEvent(new CustomEvent('blur', { bubbles: true }));
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot(); //Snapshot on blur
      expect(inputValidSpy).toHaveBeenCalledTimes(1);
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
      const page = await getPage({ label: 'label', identifier: 'identifier', type, value: getValues(), helpText: 'My help text', required: true });

      expect(page.root).toMatchSnapshot();

      const element = page.doc.querySelector('mg-input-checkbox');
      const inputs = Array.from(element.shadowRoot.querySelectorAll('input'));

      //mock validity
      inputs.forEach(input => {
        Object.defineProperty(input, 'validity', {
          get: () => ({}),
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
        error: '<mg-input-checkbox> method "setError()" param "valid" must be a boolean',
      },
      {
        valid: undefined,
        errorMessage: 'Override error',
        error: '<mg-input-checkbox> method "setError()" param "valid" must be a boolean',
      },
      {
        valid: true,
        errorMessage: ' ',
        error: '<mg-input-checkbox> method "setError()" param "errorMessage" must be a string',
      },
      {
        valid: true,
        errorMessage: true,
        error: '<mg-input-checkbox> method "setError()" param "errorMessage" must be a string',
      },
    ])("shloud throw error with setError component's public method invalid params", async params => {
      expect.assertions(1);
      try {
        const page = await getPage({ label: 'label', identifier: 'identifier', type, value: getValues(), helpText: 'My help text', required: true });
        const element = page.doc.querySelector('mg-input-checkbox');

        await element.setError(params.valid as unknown as boolean, params.errorMessage as unknown as string);
        await page.waitForChanges();
      } catch (err) {
        expect(err.message).toMatch(params.error);
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
      expect(err.message).toMatch('<mg-input-checkbox> prop "type" must be a CheckboxType.');
    }
  });

  describe('multi search', () => {
    test('Should enable return search result and update pagination', async () => {
      const value = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21].map(item => ({
        title: `item ${item}`,
        value: false,
      }));
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
      const value = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21].map(item => ({
        title: `item ${item}`,
        value: false,
      }));
      const page = await getPage({ label: 'label', identifier: 'identifier', value });
      expect(page.root).toMatchSnapshot();

      const mgInputCheckbox = page.doc.querySelector('mg-input-checkbox');
      const mgPopover = mgInputCheckbox.shadowRoot.querySelector('mg-popover');
      const mgPagination = mgInputCheckbox.shadowRoot.querySelector('mg-pagination');
      const mgPaginationNext = mgPagination.shadowRoot.querySelector('mg-button:last-of-type');

      mgPopover.display = true;
      await page.waitForChanges();
      jest.runOnlyPendingTimers();

      expect(page.root).toMatchSnapshot();

      mgPaginationNext.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();

      mgPopover.display = false;
      await page.waitForChanges();
      jest.runOnlyPendingTimers();

      expect(page.root).toMatchSnapshot();
    });

    test('Should search and update values', async () => {
      const value = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21].map(item => ({
        title: `item ${item}`,
        value: false,
      }));
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

    test('Should navigate across paginated list with mg-pagination', async () => {
      const value = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21].map(item => ({
        title: `item ${item}`,
        value: false,
      }));
      const getResultList = (mgInputCheckbox: HTMLMgInputCheckboxElement) => Array.from(mgInputCheckbox.shadowRoot.querySelectorAll('li'));
      const page = await getPage({ label: 'label', identifier: 'identifier', value });
      expect(page.root).toMatchSnapshot();

      const mgInputCheckbox = page.doc.querySelector('mg-input-checkbox');
      const mgPopover = mgInputCheckbox.shadowRoot.querySelector('mg-popover');
      const mgPagination = mgInputCheckbox.shadowRoot.querySelector('mg-pagination');
      const mgPaginationNext = mgPagination.shadowRoot.querySelector('mg-button:last-of-type');

      mgPopover.display = true;
      await page.waitForChanges();
      jest.runOnlyPendingTimers();

      let resultList = getResultList(mgInputCheckbox);

      expect(resultList.length).toEqual(10);

      mgPaginationNext.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await page.waitForChanges();

      resultList = getResultList(mgInputCheckbox);
      expect(resultList.length).toEqual(10);
      expect(page.root).toMatchSnapshot();

      mgPaginationNext.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await page.waitForChanges();

      resultList = getResultList(mgInputCheckbox);
      expect(resultList.length).toEqual(1);
      expect(page.root).toMatchSnapshot();
    });

    test('Should update all values with mass actions', async () => {
      const value = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21].map(item => ({
        title: `item ${item}`,
        value: false,
      }));
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

      const selectAllButton = mgInputCheckbox.shadowRoot.querySelector('mg-input-checkbox-paginated:last-of-type mg-button');
      selectAllButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await page.waitForChanges();

      resultList = getResultList(mgInputCheckbox);
      expect(resultList.filter(item => item.value === 'true').length).toEqual(10);
      expect(mgInputCheckbox.value.filter(item => item.value).length).toEqual(21);
      expect(page.root).toMatchSnapshot();

      const unselectAllButton = Array.from(
        mgInputCheckbox.shadowRoot.querySelectorAll('mg-input-checkbox-paginated .mg-c-input__input-checkbox-multi-section-header mg-button:last-of-type'),
      ).find(button => button.textContent === 'Unselect all');
      unselectAllButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await page.waitForChanges();

      resultList = getResultList(mgInputCheckbox);
      expect(resultList.filter(item => item.value === 'true').length).toEqual(0);
      expect(mgInputCheckbox.value.filter(item => item.value).length).toEqual(0);
      expect(page.root).toMatchSnapshot();
    });

    test('Should toggle selected items section', async () => {
      const value = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21].map((item, index) => ({
        title: `item ${item}`,
        value: [5, 12, 13, 17].some(item => item === index),
      }));
      const page = await getPage({ label: 'label', identifier: 'identifier', value });

      const mgInputCheckbox = page.doc.querySelector('mg-input-checkbox');
      const mgPopover = mgInputCheckbox.shadowRoot.querySelector('mg-popover');

      mgPopover.display = true;
      await page.waitForChanges();
      jest.runOnlyPendingTimers();

      const sections = Array.from(mgInputCheckbox.shadowRoot.querySelectorAll('mg-input-checkbox-paginated'));

      expect(sections.length).toEqual(2);

      for (const [i, section] of sections.entries()) {
        const firstButton = section.querySelector('mg-button');
        const sectionContent = section.querySelector('.mg-c-input__input-checkbox-multi-section-content');
        expect(sectionContent).not.toHaveAttribute('hidden');

        firstButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        await page.waitForChanges();

        if (i !== 0) {
          expect(sectionContent).not.toHaveAttribute('hidden');
        } else {
          expect(sectionContent).toHaveAttribute('hidden');
        }
        expect(page.root).toMatchSnapshot();
      }
    });

    test('Should go to previous page when last item is checked', async () => {
      const value = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21].map(item => ({
        title: `item ${item}`,
        value: false,
      }));
      const page = await getPage({ label: 'label', identifier: 'identifier', value });
      const getResultList = (mgInputCheckbox: HTMLMgInputCheckboxElement) => Array.from(mgInputCheckbox.shadowRoot.querySelectorAll('input'));

      const mgInputCheckbox = page.doc.querySelector('mg-input-checkbox');
      const mgPopover = mgInputCheckbox.shadowRoot.querySelector('mg-popover');
      const mgPagination = mgInputCheckbox.shadowRoot.querySelector('mg-pagination:last-of-type');
      const mgPaginationNext = mgPagination.shadowRoot.querySelector('mg-button:last-of-type');

      mgPopover.display = true;
      await page.waitForChanges();
      jest.runOnlyPendingTimers();

      let resultList = getResultList(mgInputCheckbox);

      expect(resultList.length).toEqual(10);

      mgPaginationNext.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await page.waitForChanges();

      mgPaginationNext.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await page.waitForChanges();

      resultList = Array.from(mgInputCheckbox.shadowRoot.querySelectorAll('mg-input-checkbox-paginated:last-of-type input'));
      expect(resultList.length).toEqual(1);
      expect(page.root).toMatchSnapshot();

      const input = mgInputCheckbox.shadowRoot.querySelector('input');
      input.checkValidity = () => true;
      input.checked = true;

      input.dispatchEvent(new CustomEvent('input', { bubbles: true }));
      await page.waitForChanges();

      const firstSectionInputs = mgInputCheckbox.shadowRoot.querySelectorAll('mg-input-checkbox-paginated:first-of-type input');
      const lastSectionInputs = mgInputCheckbox.shadowRoot.querySelectorAll('mg-input-checkbox-paginated:last-of-type input');

      expect(firstSectionInputs.length).toEqual(1);
      expect(lastSectionInputs.length).toEqual(10);
      expect(page.root).toMatchSnapshot();
    });

    test('Should select all filtered values', async () => {
      const value = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21].map(item => ({
        title: `item ${item}`,
        value: false,
      }));
      const page = await getPage({ label: 'label', identifier: 'identifier', value });
      const getResultList = (mgInputCheckbox: HTMLMgInputCheckboxElement) => Array.from(mgInputCheckbox.shadowRoot.querySelectorAll('input'));

      const mgInputCheckbox = page.doc.querySelector('mg-input-checkbox');
      const mgPopover = mgInputCheckbox.shadowRoot.querySelector('mg-popover');
      const searchInput = mgInputCheckbox.shadowRoot.querySelector('mg-input-text');
      const selectAllButton = mgInputCheckbox.shadowRoot.querySelector('mg-input-checkbox-paginated:last-of-type mg-button');

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

      resultList = getResultList(mgInputCheckbox);
      expect(resultList).toHaveLength(4);
      expect(resultList.filter(item => item.value === 'true').length).toEqual(0);

      // Select All
      selectAllButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await page.waitForChanges();

      // Should have all value selected
      resultList = getResultList(mgInputCheckbox);
      expect(resultList.filter(item => item.value === 'true').length).toEqual(4);
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
});
