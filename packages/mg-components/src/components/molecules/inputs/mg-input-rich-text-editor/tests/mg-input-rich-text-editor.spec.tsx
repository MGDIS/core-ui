import { h } from '@stencil/core';
import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { setupMutationObserverMock, setUpRequestAnimationFrameMock, toString } from '@mgdis/core-ui-helpers/stencil';
import { tooltipPositions } from '../../mg-input/mg-input.conf';
import messages from '../../../../../locales/en/messages.json';
import { type EditorType } from '../editor';
import { MgInputRichTextEditor } from '../mg-input-rich-text-editor';
import { MgInput } from '../../mg-input/mg-input';
import { MgInputTitle } from '../../../../atoms/internals/mg-input-title/mg-input-title';

type EditorTypeMock = EditorType & { editorElement: HTMLElement; selection: Selection & { setBaseAndExtent: () => void; getComposedRanges: () => void }; fireOn: () => void };

type HTMLinput = HTMLElement & {
  checkValidity: () => boolean;
  validatePattern: () => void;
};

const getPage = async (args: Partial<MgInputRichTextEditor> & Pick<MgInputRichTextEditor, 'identifier' | 'label'>): Promise<SpecPage> => {
  const page = await newSpecPage({
    components: [MgInputRichTextEditor, MgInput, MgInputTitle],
    template: () => <mg-input-rich-text-editor {...args}></mg-input-rich-text-editor>,
  });

  jest.runAllTimers();
  setUpRequestAnimationFrameMock(jest.runOnlyPendingTimers);

  return page;
};

const waitForEditor = async (page: SpecPage): Promise<{ element: HTMLMgInputRichTextEditorElement; editor: EditorTypeMock; input: HTMLinput }> => {
  const element = page.doc.querySelector('mg-input-rich-text-editor');
  const input = element.shadowRoot.querySelector('.ql-editor') as HTMLinput;
  const editor = page.rootInstance.editor;

  expect(input).not.toBeNull();
  return { element, editor, input };
};

describe('mg-input-rich-text-editor', () => {
  beforeEach(() => {
    jest.useFakeTimers({ legacyFakeTimers: true });
    setupMutationObserverMock({
      observe: function () {
        return null;
      },
      disconnect: function () {
        return null;
      },
      takeRecords: () => [],
    });
  });
  afterEach(() => {
    jest.runOnlyPendingTimers();
  });

  test.each([
    {},
    { labelHide: true },
    { labelOnTop: true },
    { readonly: true },
    { readonly: true, labelOnTop: true, tooltip: 'Tooltip message' },
    { readonly: true, value: '<p>Content</p>' },
    { readonly: true, value: 'Content' },
    { readonly: true, tooltip: 'Tooltip message', tooltipPosition: 'input' as MgInputRichTextEditor['tooltipPosition'], value: '<p>Content</p>' },
    { readonly: true, tooltip: 'Tooltip message', tooltipPosition: 'input' as MgInputRichTextEditor['tooltipPosition'] },
    { required: true, value: '<p>Content</p>', helpText: 'My help text' },
    { required: true, readonly: true, value: '<p>Content</p>', helpText: 'My help text' },
    { required: true, disabled: true, value: '<p>Content</p>', helpText: 'My help text' },
    { tooltip: 'My Tooltip Message' },
    { tooltip: 'My Tooltip Message', labelOnTop: true },
    { tooltip: 'My Tooltip Message', tooltipPosition: 'label' as MgInputRichTextEditor['tooltipPosition'] },
    { tooltip: 'My Tooltip Message', tooltipPosition: 'input' as MgInputRichTextEditor['tooltipPosition'], labelOnTop: true },
  ])('Should render with args %s:', async args => {
    const { root } = await getPage({ label: 'label', identifier: 'identifier', ...args });
    expect(root).toMatchSnapshot();
  });

  describe('errors', () => {
    test.each(['', ' ', undefined])('Should not render with invalid identifier property: %s', async identifier => {
      expect.assertions(1);
      try {
        await getPage({ identifier } as MgInputRichTextEditor);
      } catch (err) {
        expect(err.message).toEqual(`<mg-input> prop "identifier" is required and must be a string. Passed value: ${identifier}.`);
      }
    });

    test('Should log an error with invalid "identifier" property', async () => {
      const identifier = '{{chase}}';
      const spy = jest.spyOn(console, 'error');
      expect.assertions(1);

      try {
        await getPage({ identifier, label: 'test' });
      } catch {
        expect(spy).toHaveBeenCalledWith(`<mg-input> prop "identifier" value is invalid. Passed value: ${identifier}.`);
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

    test.each(['', ' ', null, undefined])('Should throw an error when pattern is used with invalid patternErrorMessage: %s', async patternErrorMessage => {
      expect.assertions(1);
      try {
        await getPage({ identifier: 'identifier', label: 'blu', pattern: '[a-z]*', patternErrorMessage });
      } catch (err) {
        expect(err.message).toEqual(
          `<mg-input-rich-text-editor> props "pattern" and "patternErrorMessage" must be non-empty string and paired. Passed value: "pattern='[a-z]*'" and "patternErrorMessage='${patternErrorMessage}'".`,
        );
      }
    });

    test.each(['', ' ', null, undefined])('Should throw an error when patternErrorMessage is used with invalid pattern: %s', async pattern => {
      expect.assertions(1);
      try {
        await getPage({ identifier: 'identifier', label: 'blu', pattern, patternErrorMessage: 'pattern error message' });
      } catch (err) {
        expect(err.message).toEqual(
          `<mg-input-rich-text-editor> props "pattern" and "patternErrorMessage" must be non-empty string and paired. Passed value: "pattern='${pattern}'" and "patternErrorMessage='pattern error message'".`,
        );
      }
    });

    test('Should throw an error with labelOnTop & labelHide set to true', async () => {
      expect.assertions(1);
      try {
        await getPage({ identifier: 'identifier', label: 'chase', labelOnTop: true, labelHide: true });
      } catch (err) {
        expect(err.message).toEqual('<mg-input> prop "labelOnTop" must not be paired with the prop "labelHide".');
      }
    });

    test.each(['blu', {}, 5, false])('Should not render with invalid tooltipPosition property: %s', async tooltipPosition => {
      expect.assertions(1);
      try {
        await getPage({ identifier: 'identifier', label: 'label', tooltipPosition } as MgInputRichTextEditor);
      } catch (err) {
        expect(err.message).toEqual(`<mg-input> prop "tooltipPosition" must be one of: ${tooltipPositions.join(', ')}. Passed value: ${toString(tooltipPosition)}.`);
      }
    });
  });

  describe('style', () => {
    describe.each([true, false])('with error', error => {
      test.each(['disabled', 'readonly'])('Should update %s class', async prop => {
        const page = await getPage({ label: 'label', identifier: 'identifier', required: error });
        const { element, editor, input } = await waitForEditor(page);
        const mgInput = element.shadowRoot.querySelector('mg-input');

        // Mock validity
        input.checkValidity = jest.fn(() => error);
        Object.defineProperty(input, 'validity', {
          get: jest.fn(() => ({
            valueMissing: !error,
          })),
        });

        await element.displayError();
        await page.waitForChanges();
        jest.runOnlyPendingTimers();

        // Test initial state
        expect(mgInput.classList.contains(`mg-c-input--${prop}`)).toBeFalsy();
        expect(editor.disable).not.toHaveBeenCalled();
        expect(editor.enable).not.toHaveBeenCalled();

        // Test readonly changes
        element[prop] = true;
        await page.waitForChanges();
        expect(mgInput.classList.contains(`mg-c-input--${prop}`)).toBeTruthy();

        element[prop] = false;
        await page.waitForChanges();
        expect(mgInput.classList.contains(`mg-c-input--${prop}`)).toBeFalsy();
      });
    });
  });

  describe('Methods', () => {
    test.each([
      {
        method: 'getHTML',
        mockMethod: 'getSemanticHTML',
        value: '<p>Test content</p>',
        expectedValue: '<p>Test content</p>',
      },
      {
        method: 'getText',
        mockMethod: 'getText',
        value: 'Test content',
        expectedValue: 'Test content',
      },
    ])('$method should return correct content', async ({ method, mockMethod, value, expectedValue }) => {
      const page = await getPage({ label: 'label', identifier: 'identifier', value });
      const { element, editor } = await waitForEditor(page);
      const spy = jest.spyOn(editor, mockMethod as never);

      expect(page.root).toMatchSnapshot();

      const result = await element[method]();
      jest.runOnlyPendingTimers();

      expect(result).toEqual(expectedValue);
      expect(spy).toHaveBeenCalled();
    });

    test.each([
      { value: undefined, valid: false, errorMessage: messages.errors.required },
      { value: '<p>Content</p>', valid: true, errorMessage: null },
      {
        value: '123',
        pattern: '[a-z]+',
        patternErrorMessage: 'Format invalide',
        valid: false,
        errorMessage: 'Format invalide',
        validityState: { valueMissing: false, patternMismatch: true },
      },
    ])('Should display error message when required and %s', async ({ value, pattern, patternErrorMessage, valid, errorMessage, validityState }) => {
      const page = await getPage({
        label: 'label',
        identifier: 'identifier',
        required: true,
        value,
        pattern,
        patternErrorMessage,
      });
      const { element, input } = await waitForEditor(page);

      // Mock validity
      input.checkValidity = jest.fn(() => valid);
      Object.defineProperty(input, 'validity', {
        get: jest.fn(
          () =>
            validityState || {
              valueMissing: !valid,
            },
        ),
      });

      await element.displayError();
      await page.waitForChanges();
      jest.runOnlyPendingTimers();

      const errorElement = element.shadowRoot.querySelector('[slot="error"]');

      if (!valid) {
        expect(errorElement).not.toBeNull();
        expect(errorElement.textContent.trim()).toBe(errorMessage);
      } else {
        expect(errorElement).toBeNull();
      }
    });

    test.each([
      { valid: true, message: 'Error message', expectError: false },
      { valid: false, message: 'Error message', expectError: true },
    ])('Should handle setError with valid: $valid', async ({ valid, message, expectError }) => {
      const page = await getPage({ label: 'label', identifier: 'identifier' });
      const { element } = await waitForEditor(page);

      await element.setError(valid, message);
      await page.waitForChanges();
      jest.runOnlyPendingTimers();

      const errorElement = element.shadowRoot.querySelector('[slot="error"]');
      if (expectError) {
        expect(errorElement).not.toBeNull();
        expect(errorElement.textContent.trim()).toBe(message);
      } else {
        expect(errorElement).toBeNull();
      }
    });

    test.each([
      [null, 'error message'],
      [undefined, 'error message'],
      [true, ''],
      [true, ' '],
      [true, null],
      [true, undefined],
    ])('Should throw error when setError called with invalid arguments: %s, %s', async (valid, errorMessage) => {
      const page = await getPage({ label: 'label', identifier: 'identifier' });
      const { element } = await waitForEditor(page);

      await expect(element.setError(valid as boolean | null | undefined, errorMessage as string | null | undefined)).rejects.toThrow();
    });

    test('Should reset editor content and validity state', async () => {
      const page = await getPage({
        label: 'label',
        identifier: 'identifier',
        value: '<p>Initial content</p>',
      });
      const { element } = await waitForEditor(page);

      // Call reset method
      await element.reset();
      await page.waitForChanges();

      const errorElement = element.shadowRoot.querySelector('[slot="error"]');

      expect(element.value).toBe('');
      expect(errorElement).toBeNull();
    });

    test('Should reset hasDisplayedError when validity changes', async () => {
      const page = await getPage({
        label: 'label',
        identifier: 'identifier',
        required: true,
        value: '',
      });
      const { element, input } = await waitForEditor(page);

      // Mock validity
      input.checkValidity = jest.fn(() => false);
      Object.defineProperty(input, 'validity', {
        get: jest.fn(() => ({
          valueMissing: true,
        })),
      });

      await element.displayError();
      await page.waitForChanges();
      jest.runOnlyPendingTimers();

      // Verify error is displayed
      let errorElement = element.shadowRoot.querySelector('[slot="error"]');
      expect(errorElement).not.toBeNull();
      expect(errorElement.textContent.trim()).toBe(messages.errors.required);

      // Change required property to trigger handleValidityChange
      element.required = false;
      await page.waitForChanges();

      // Verify error message has been cleared
      errorElement = element.shadowRoot.querySelector('[slot="error"]');
      expect(errorElement).toBeNull();
    });
  });

  describe('Events', () => {
    test.each([true, false])('Should manage focus and blur events', async validity => {
      const page = await getPage({ label: 'label', identifier: 'identifier', helpText: 'My help text', required: !validity });
      const { input } = await waitForEditor(page);

      // Mock validity
      input.checkValidity = jest.fn(() => validity);
      Object.defineProperty(input, 'validity', {
        get: jest.fn(() => ({
          valueMissing: !validity,
        })),
      });

      jest.spyOn(page.rootInstance.valueChange, 'emit');

      // Test focus event
      input.dispatchEvent(new CustomEvent('focus', { bubbles: true }));
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot(); // Snapshot on focus

      // Test blur event
      input.dispatchEvent(new CustomEvent('blur', { bubbles: true }));
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot(); // Snapshot on focus
    });

    test.each([true, false])('Should handle text-change event', async validity => {
      const page = await getPage({
        label: 'label',
        identifier: 'identifier',
        required: !validity,
      });
      const { editor, input, element } = await waitForEditor(page);

      // Mock validity
      input.checkValidity = jest.fn(() => validity);
      Object.defineProperty(input, 'validity', {
        get: jest.fn(() => ({
          valueMissing: !validity,
        })),
      });

      await element.displayError();
      await page.waitForChanges();
      jest.runOnlyPendingTimers();

      // Spy on relevant methods
      const valueChangeSpy = jest.spyOn(page.rootInstance.valueChange, 'emit');
      const checkValiditySpy = jest.spyOn(page.rootInstance, 'checkValidity');

      // Simulate text change
      const htmlContent = '<p>Test content</p>';
      jest.spyOn(editor, 'getSemanticHTML').mockReturnValue(htmlContent);

      // Trigger text-change event using stored handler
      editor.fireOn();
      await page.waitForChanges();

      // Verify that value has been updated
      expect(page.rootInstance.value).toBe(htmlContent);

      // Verify that valueChange event has been emitted
      expect(valueChangeSpy).toHaveBeenCalledWith(htmlContent);

      // Verify that checkValidity has been called
      expect(checkValiditySpy).toHaveBeenCalled();
    });
  });

  describe('Editor', () => {
    test('Should handle custom editor modules', async () => {
      const customModules = {
        toolbar: ['bold', 'italic'],
        custom: { option: true },
      };

      const page = await getPage({
        label: 'label',
        identifier: 'identifier',
        modules: customModules,
      });

      const { editor } = await waitForEditor(page);
      expect(editor.options.modules).toEqual(expect.objectContaining(customModules));
    });
  });

  describe('Editor polyfills', () => {
    test('Should handle text selection in Shadow DOM', async () => {
      const page = await getPage({
        label: 'label',
        identifier: 'identifier',
        value: '<p>Test content</p>',
      });
      const { editor } = await waitForEditor(page);

      // Mock selection methods
      const mockSelection = {
        getRangeAt: jest.fn().mockReturnValue({ startContainer: document.createElement('div') }),
        removeAllRanges: jest.fn(),
        setBaseAndExtent: jest.fn(),
      };

      // Mock getSelection
      window.getSelection = jest.fn().mockReturnValue(mockSelection);

      // Create a valid DOM structure for the test
      const rootParent = document.createElement('div');
      const root = document.createElement('div');
      rootParent.appendChild(root);

      // Test setNativeRange with valid nodes
      const startContainer = document.createElement('div');
      const endContainer = document.createElement('div');
      rootParent.appendChild(startContainer);
      rootParent.appendChild(endContainer);

      editor.selection.setNativeRange(startContainer, 0, endContainer, 1);
      expect(mockSelection.setBaseAndExtent).toHaveBeenCalled();
    });

    test.each([true, false])('Should handle text selection in Shadow DOM from native element', async hasNativeRange => {
      const page = await getPage({
        label: 'label',
        identifier: 'identifier',
        value: '<p>Test content</p>',
      });
      const { editor } = await waitForEditor(page);

      // Mock selection methods
      const mockSelection = {
        getRangeAt: jest.fn().mockReturnValue({ startContainer: document.createElement('div') }),
        removeAllRanges: jest.fn(),
        setBaseAndExtent: jest.fn(),
      };

      // Mock getSelection
      window.getSelection = jest.fn().mockReturnValue(mockSelection);

      // Create a valid DOM structure for the test
      const rootParent = document.createElement('div');
      const root = document.createElement('div');
      rootParent.appendChild(root);

      // Test setNativeRange with valid nodes
      const startOffset = 0;
      const endOffset = 1;
      const startContainer = document.createElement('div');
      const endContainer = document.createElement('div');
      rootParent.appendChild(startContainer);
      rootParent.appendChild(endContainer);

      Object.defineProperty(editor.selection, 'getNativeRange', {
        get() {
          return jest.fn().mockReturnValue(
            hasNativeRange
              ? {
                  native: {
                    startContainer,
                    startOffset,
                    endContainer,
                    endOffset,
                  },
                }
              : null,
          );
        },
      });

      editor.selection.setNativeRange(startContainer, startOffset, endContainer, endOffset);
      if (hasNativeRange) {
        expect(mockSelection.setBaseAndExtent).not.toHaveBeenCalled();
      } else {
        expect(mockSelection.setBaseAndExtent).toHaveBeenCalled();
      }
    });

    test('Should NOT handle with undefined getNativeRange value', async () => {
      const page = await getPage({
        label: 'label',
        identifier: 'identifier',
        value: '<p>Test content</p>',
      });
      const { editor } = await waitForEditor(page);

      // Mock selection methods
      const mockSelection = {
        getRangeAt: jest.fn().mockReturnValue(null),
        removeAllRanges: jest.fn(),
        setBaseAndExtent: jest.fn(),
      };

      // Mock getSelection
      window.getSelection = jest.fn().mockReturnValue(mockSelection);

      // Create a valid DOM structure for the test
      const rootParent = document.createElement('div');
      const root = document.createElement('div');
      rootParent.appendChild(root);

      editor.selection.setNativeRange(null, 0);
      expect(mockSelection.setBaseAndExtent).not.toHaveBeenCalled();
    });

    test.each(['startContainer', 'rootNode', 'endContainer'])('Should prevent trigger setNativeRange with %s null', async nullValue => {
      const page = await getPage({
        label: 'label',
        identifier: 'identifier',
      });
      const { editor } = await waitForEditor(page);

      // Mocks
      window.getSelection = jest.fn().mockReturnValue(editor.selection);
      if (nullValue === 'rootNode') {
        Object.defineProperty(editor.editorElement, 'parentNode', {
          get: () => null,
        });
      }

      // Create <br> elements with parent nodes
      const parentNode = document.createElement('div');
      const startBR = document.createElement('br');
      const endBR = document.createElement('br');
      if (nullValue !== 'startContainer') parentNode.appendChild(startBR);
      if (nullValue !== 'endContainer') parentNode.appendChild(endBR);

      // Test setNativeRange with <br> elements
      editor.selection.setNativeRange(startBR, 0, endBR, 0);
      expect(editor.selection.setBaseAndExtent).not.toHaveBeenCalled();
    });

    test.each([[['br', 'br']], [['br', 'div']], [['div', 'br']], [['div', 'div']]])('Should handle %s elements in setNativeRange', async ([startTagName, endTagName]) => {
      const page = await getPage({
        label: 'label',
        identifier: 'identifier',
      });
      const { editor } = await waitForEditor(page);

      // Mock selection
      window.getSelection = jest.fn().mockReturnValue(editor.selection);

      // Create nested nodes
      const parentNode = document.createElement('div');
      const startContainer = document.createElement(startTagName);
      const endContainer = document.createElement(endTagName);
      parentNode.appendChild(startContainer);
      parentNode.appendChild(endContainer);

      // define focus
      editor.selection.setNativeRange(startContainer, 0, endContainer, 0);
      expect(editor.selection.setBaseAndExtent).toHaveBeenCalledTimes(1);

      // skip focus step
      editor.selection.setNativeRange(startContainer, 0, endContainer, 0);
      expect(editor.selection.setBaseAndExtent).toHaveBeenCalledTimes(2);
    });

    test('Should handle `selectionchange` event', async () => {
      const page = await getPage({
        label: 'label',
        identifier: 'identifier',
      });
      const { editor } = await waitForEditor(page);

      document.dispatchEvent(new CustomEvent('selectionchange', { bubbles: true }));

      expect(editor.selection.update).toHaveBeenCalled();
    });

    test.each(['chrome', 'firefox', 'safari', 'error'])('Should implement %s getNativeRange polyfill', async browser => {
      const page = await getPage({
        label: 'label',
        identifier: 'identifier',
      });
      const { editor } = await waitForEditor(page);

      // Mock
      (editor.editorElement as HTMLElement & { getRangeAt: () => void }).getRangeAt = jest.fn();
      window.getSelection = jest.fn();
      if (browser === 'chrome') {
        (editor.editorElement as HTMLElement & { getRangeAt: () => void }).getRangeAt = jest.fn();
        (window.getSelection as jest.Mock).mockReturnValue(editor.editorElement);
      }

      let attachShadowSpy;
      if (browser === 'firefox') {
        attachShadowSpy = jest.spyOn(Object.getPrototypeOf(global.HTMLElement).prototype, 'attachShadow').mockReturnValue({
          getSelection: 'not_a_function',
        } as unknown as ShadowRoot);

        (window.getSelection as jest.Mock).mockReturnValue(editor.selection);
      }

      if (browser === 'safari') {
        attachShadowSpy = jest.spyOn(Object.getPrototypeOf(global.HTMLElement).prototype, 'attachShadow').mockReturnValue({
          getSelection: 'not_a_function',
        } as unknown as ShadowRoot);

        (window.getSelection as jest.Mock).mockReturnValue(editor.selection);
        delete editor.selection.getComposedRanges;
      }

      editor.selection.getNativeRange();

      if (browser === 'chrome') {
        expect((editor.editorElement as HTMLElement & { getSelection: () => Selection }).getSelection().getRangeAt).toHaveBeenCalledWith(0);
      } else if (browser === 'firefox') {
        expect(editor.selection.getComposedRanges).toHaveBeenCalled();
        attachShadowSpy.mockRestore();
      } else if (browser === 'safari') {
        expect(editor.selection.getRangeAt).toHaveBeenCalled();
        attachShadowSpy.mockRestore();
      } else if (browser === 'error') {
        expect.assertions(1);
      }
    });
  });
});
