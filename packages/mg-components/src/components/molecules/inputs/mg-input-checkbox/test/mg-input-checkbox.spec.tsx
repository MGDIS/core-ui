import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { cloneDeep, mockWindowFrames, setupResizeObserverMock } from '../../../../../utils/unit.test.utils';
import { MgInputCheckbox } from '../mg-input-checkbox';
import messages from '../../../../../locales/en/messages.json';
import { CheckboxValue, checkboxTypes } from '../mg-input-checkbox.conf';
import { MgPopover } from '../../../mg-popover/mg-popover';
import { MgInputText } from '../../mg-input-text/mg-input-text';
import { MgMessage } from '../../../mg-message/mg-message';
import { MgPagination } from '../../../mg-pagination/mg-pagination';
import { MgButton } from '../../../../atoms/mg-button/mg-button';
import { MgInputCheckboxPaginated } from '../mg-input-checkbox-paginated/mg-input-checkbox-paginated';

mockWindowFrames();

const getPage = args => {
  const page = newSpecPage({
    components: [MgInputCheckbox, MgPopover, MgInputText, MgMessage, MgPagination, MgButton, MgInputCheckboxPaginated],
    template: () => <mg-input-checkbox {...args}></mg-input-checkbox>,
  });

  jest.runAllTimers();
  return page;
};

describe('mg-input-checkbox', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    setupResizeObserverMock({
      observe: () => null,
      disconnect: () => null,
    });
  });

  afterEach(() => jest.runOnlyPendingTimers());

  const items: CheckboxValue[] = [
    { title: 'batman', value: true },
    { title: 'robin', value: false, disabled: true },
    { title: 'joker', value: false },
    { title: 'bane', value: null },
  ];

  describe.each(checkboxTypes)('render by type %s', type => {
    let testValues: unknown[] = [
      { label: 'label', identifier: 'identifier', value: cloneDeep(items), type },
      { label: 'label', identifier: 'identifier', value: cloneDeep(items), type, readonly: true },
      { label: 'label', identifier: 'identifier', value: cloneDeep(items), type, labelOnTop: true },
      { label: 'label', identifier: 'identifier', value: cloneDeep(items), type, labelHide: true },
      { label: 'label', identifier: 'identifier', value: cloneDeep(items), type, inputVerticalList: true },
      { label: 'label', identifier: 'identifier', value: cloneDeep(items), type, required: true },
      { label: 'label', identifier: 'identifier', value: cloneDeep(items), type, required: true, readonly: true, helpText: 'Hello joker' },
      { label: 'label', identifier: 'identifier', value: cloneDeep(items), type, required: true, disabled: true, helpText: 'Hello joker' },
      { label: 'label', identifier: 'identifier', value: cloneDeep(items), type, readonly: true, labelOnTop: true, tooltip: 'Tooltip message' },
      { label: 'label', identifier: 'identifier', value: cloneDeep(items), type, disabled: true },
      { label: 'label', identifier: 'identifier', value: cloneDeep(items), type, helpText: 'Hello joker' },
      { label: 'label', identifier: 'identifier', value: cloneDeep(items), type, tooltip: 'Batman is a DC Comics license' },
    ];
    if (type === 'multi') {
      testValues = [
        ...testValues,
        ...[true, false].flatMap(displaySelectedValues =>
          [
            { label: 'label', identifier: 'identifier', value: cloneDeep(items), type: 'multi', readonly: true },
            { label: 'label', identifier: 'identifier', value: cloneDeep(items), type: 'multi', disabled: true },
            { label: 'label', identifier: 'identifier', value: cloneDeep(items), type: 'multi', helpText: 'Hello joker' },
            { label: 'label', identifier: 'identifier', value: cloneDeep(items), type: 'multi', tooltip: 'Batman is a DC Comics license' },
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
        await getPage({ identifier, type, value: cloneDeep(items) });
      } catch (err) {
        expect(err.message).toMatch('<mg-input> prop "identifier" is required.');
      }
    });

    test.each(['', ' ', undefined])('Should not render with invalid label property: %s', async label => {
      expect.assertions(1);
      try {
        await getPage({ identifier: 'identifier', type, label, value: cloneDeep(items) });
      } catch (err) {
        expect(err.message).toMatch('<mg-input> prop "label" is required.');
      }
    });

    test('Should not render when using labelOnTop and labelHide: %s', async () => {
      expect.assertions(1);
      try {
        await getPage({ identifier: 'identifier', type, label: 'label', value: cloneDeep(items), labelOnTop: true, labelHide: true });
      } catch (err) {
        expect(err.message).toMatch('<mg-input> prop "labelOnTop" must not be paired with the prop "labelHide".');
      }
    });

    test('Should not render with invalid value property: %s', async () => {
      expect.assertions(1);
      try {
        await getPage({ identifier: 'identifier', type, label: 'label', value: ['batman', 'joker', 'bane'] });
      } catch (err) {
        expect(err.message).toMatch('<mg-input-checkbox> prop "value" is required and all values must be the same type, CheckboxItem.');
      }
    });

    test.each([true, false])('Should trigger events, case validity check %s', async validity => {
      const value = items.map(item => ({ ...item, value: false }));
      if (!validity) value[0].value = true;
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
    });

    describe.each(['readonly', 'disabled'])('validity, case next state is %s', nextState => {
      test.each([
        { validity: true, valueMissing: false },
        { validity: false, valueMissing: true },
        { validity: false, valueMissing: false },
      ])('validity (%s), valueMissing (%s)', async ({ validity, valueMissing }) => {
        const value = items.map((item, index) => ({ ...item, value: !valueMissing && index === 1 }));
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

    test("display error with displayError component's public method", async () => {
      const value = cloneDeep(items);
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

    test.each(['fr', 'xx'])('Should render component with locale: %s', async lang => {
      const value = cloneDeep(items);
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

    test('should enable "displaySearchInput" when value list is greater than 10', async () => {
      const value = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(item => ({
        title: `item ${item}`,
        value: false,
      }));
      const { root } = await getPage({ label: 'label', identifier: 'identifier', value, type });
      expect(root).toMatchSnapshot();
    });
  });

  describe('navigation', () => {
    test('should NOT manage keyboard "tab" navigation on "checkbox" type', async () => {
      const page = await getPage({ label: 'label', identifier: 'identifier', value: cloneDeep(items), type: 'checkbox', tooltip: 'Tooltip message' });
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
        value: [1, 2, 3, 4, 5, 6, 7, 8, 9].map(item => ({
          title: `item ${item}`,
          value: false,
        })),
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

    test('should manage keyboard "shift+tab" navigation on "multi" type', async () => {
      const page = await getPage({
        label: 'label',
        identifier: 'identifier',
        value: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(item => ({
          title: `item ${item}`,
          value: false,
        })),
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
      await getPage({ identifier: 'identifier', type, label: 'label', value: cloneDeep(items) });
    } catch (err) {
      expect(err.message).toMatch('<mg-input-checkbox> prop "type" must be a CheckboxType.');
    }
  });

  test.each([undefined, 'checkbox'])('Should not render with invalid displaySelectedValues and type configuration', async type => {
    expect.assertions(1);
    try {
      await getPage({ label: 'label', identifier: 'identifier', type, value: cloneDeep(items), displaySelectedValues: true });
    } catch (err) {
      expect(err.message).toMatch('<mg-input-checkbox> prop "displaySelectedValues" can only be used with prop type "multi".');
    }
  });

  describe('multi search', () => {
    test('should enable return search result and update pagination', async () => {
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

    test('should search and update values', async () => {
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

    test('should navigate across paginated list with mg-pagination', async () => {
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

    test('should update all values with mass actions', async () => {
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
        mgInputCheckbox.shadowRoot.querySelectorAll('mg-input-checkbox-paginated .mg-input__input-checkbox-multi-section-header mg-button:last-of-type'),
      ).find(button => button.textContent === 'Unselect all');
      unselectAllButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await page.waitForChanges();

      resultList = getResultList(mgInputCheckbox);
      expect(resultList.filter(item => item.value === 'true').length).toEqual(0);
      expect(mgInputCheckbox.value.filter(item => item.value).length).toEqual(0);
      expect(page.root).toMatchSnapshot();
    });

    test('should toggle selected items section', async () => {
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
        const sectionContent = section.querySelector('.mg-input__input-checkbox-multi-section-content');
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

    test('should go to previous page when last item is checked', async () => {
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
  });
});
