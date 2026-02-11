// Mock Jodit module and plugins - MUST be before any imports
import { setupJoditMock, getJoditPluginPaths } from '../editor/jodit.mock';
jest.mock('jodit', () => setupJoditMock());
getJoditPluginPaths().forEach(pluginPath => {
  jest.mock(pluginPath, () => ({}));
});

import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { toString } from '@mgdis/core-ui-helpers/dist/utils';
import { setupMutationObserverMock, setUpRequestAnimationFrameMock } from '@mgdis/core-ui-helpers/dist/tests';
import { tooltipPositions } from '../../mg-input/mg-input.conf';
import { DEFAULT_MODULES } from '../mg-input-rich-text-editor.conf';
import { MgInputRichTextEditor } from '../mg-input-rich-text-editor';
import { MgInput } from '../../mg-input/mg-input';
import { MgInputTitle } from '../../../../atoms/internals/mg-input-title/mg-input-title';
import messages from '../../../../../locales/en/messages.json';
import type { IJodit, ButtonsOption } from '../editor/editor.conf';

type HTMLinput = HTMLElement & {
  checkValidity: () => boolean;
};

const getPage = async (args: Partial<MgInputRichTextEditor> & Pick<MgInputRichTextEditor, 'identifier' | 'label'>) => {
  const page = await newSpecPage({
    components: [MgInputRichTextEditor, MgInput, MgInputTitle],
    template: () => <mg-input-rich-text-editor {...args}></mg-input-rich-text-editor>,
  });

  jest.runAllTimers();
  setUpRequestAnimationFrameMock(jest.runOnlyPendingTimers);

  return page;
};

const waitForEditor = async (page): Promise<{ element: HTMLMgInputRichTextEditorElement; editor: IJodit; input: HTMLinput }> => {
  const element = page.doc.querySelector('mg-input-rich-text-editor');
  const editor = page.rootInstance.editor;

  // Jodit creates a textarea that gets transformed into an editor
  // We can access the editor element via the Jodit instance or find it in the DOM
  const wrapper = element.shadowRoot.querySelector(`#${element.identifier}`) as HTMLElement;
  // Try to find the textarea (initial element) or the Jodit editor element
  const textarea = wrapper?.querySelector('textarea');
  const joditContainer = wrapper?.querySelector('.jodit-container') as HTMLElement;
  const joditEditor = joditContainer?.querySelector('.jodit-wysiwyg') as HTMLElement;
  // Use the first available element: textarea, jodit editor, or wrapper itself
  const input = (textarea || joditEditor || wrapper) as unknown as HTMLinput;

  if (element.readonly) {
    expect(input).toBeNull();
  } else {
    expect(input).not.toBeNull();
  }
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

    test('Should throw error when modules prop is invalid (empty array)', async () => {
      await expect(getPage({ identifier: 'identifier', label: 'label', modules: [] as never })).rejects.toThrow(
        '<mg-input-rich-text-editor> prop "modules" must be a non-empty array of strings.',
      );
    });

    test('Should throw error when modules prop is invalid (array with non-string)', async () => {
      await expect(getPage({ identifier: 'identifier', label: 'label', modules: ['bold', 123] as never })).rejects.toThrow(
        '<mg-input-rich-text-editor> prop "modules" must be a non-empty array of strings.',
      );
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

        // Mock editor method (only used for disabled prop)
        if (prop === 'disabled') {
          editor.setReadOnly = jest.fn();
        }

        await element.displayError();
        await page.waitForChanges();
        jest.runOnlyPendingTimers();

        // Test initial state
        expect(mgInput.classList.contains(`mg-c-input--${prop}`)).toBeFalsy();
        if (prop === 'disabled') {
          expect(editor.setReadOnly).not.toHaveBeenCalled();
        }

        // Test prop changes
        element[prop] = true;
        await page.waitForChanges();
        expect(mgInput.classList.contains(`mg-c-input--${prop}`)).toBeTruthy();
        if (prop === 'disabled') {
          expect(editor.setReadOnly).toHaveBeenCalledWith(true);
        }

        element[prop] = false;
        await page.waitForChanges();
        expect(mgInput.classList.contains(`mg-c-input--${prop}`)).toBeFalsy();
        if (prop === 'disabled') {
          expect(editor.setReadOnly).toHaveBeenCalledWith(false);
        }
      });
    });
  });

  describe('Methods', () => {
    test.each([
      {
        method: 'getEditorHTML',
        value: '<p>Test content</p>',
        expectedValue: '<p>Test content</p>',
      },
      {
        method: 'getEditorText',
        value: 'Test content',
        expectedValue: 'Test content',
      },
    ])('$method should return correct content', async ({ method, value, expectedValue }) => {
      const page = await getPage({ label: 'label', identifier: 'identifier', value });
      const { element } = await waitForEditor(page);

      expect(page.root).toMatchSnapshot();

      const result = await element[method]();

      expect(result).toEqual(expectedValue);
    });

    test('getEditorText should return empty string when editor contains only images', async () => {
      const page = await getPage({ label: 'label', identifier: 'identifier', value: '<img src="test.jpg">' });
      const { element } = await waitForEditor(page);

      // When editor contains only images, getText() returns empty string
      const result = await element.getEditorText();
      expect(result).toEqual('');
    });

    test.each([
      { value: undefined, valid: true },
      { value: undefined, required: true, valid: false, errorMessage: messages.errors.required },
      { value: '<p>Content</p>', required: true, valid: true, errorMessage: null },
      {
        value: '123',
        pattern: '[a-z]+',
        patternErrorMessage: 'Format invalide',
        valid: false,
        errorMessage: 'Format invalide',
        validityState: { valueMissing: false, patternMismatch: true },
      },
      {
        value: 'bad input',
        valid: false,
        errorMessage: undefined,
        validityState: { badInput: true },
      },
    ])('Should display error message when required and %s', async ({ value, required, pattern, patternErrorMessage, valid, errorMessage, validityState }) => {
      const page = await getPage({
        label: 'label',
        identifier: 'identifier',
        required,
        value,
        pattern,
        patternErrorMessage,
      });
      const { element } = await waitForEditor(page);

      await element.displayError();
      await page.waitForChanges();
      jest.runOnlyPendingTimers();

      const errorElement = element.shadowRoot.querySelector('[slot="error"]');

      if (!valid && !validityState?.badInput) {
        expect(errorElement).not.toBeNull();
        expect(errorElement.textContent.trim()).toBe(errorMessage);
      } else {
        expect(errorElement).toBeNull();
      }
    });

    describe.each([true, false])('Should return validity with isValid method, readonly: %s', required => {
      test.each([true, false].flatMap(valid => [true, false].map(lock => ({ valid, lock }))))(
        "Should display override error with setError component's public method (%s)",
        async ({ valid, lock }) => {
          const getErrorMessage = (element: HTMLMgInputRichTextEditorElement) => element.shadowRoot.querySelector('#identifier-error')?.textContent;

          const customErrorMessage = 'Override error';
          const page = await getPage({ label: 'label', identifier: 'identifier', required });
          const { element, input } = await waitForEditor(page);

          expect(page.root).toMatchSnapshot();

          // Mock validity
          let currentValidity = valid;
          input.checkValidity = jest.fn(() => currentValidity);
          Object.defineProperty(input, 'validity', {
            get: () => ({
              valueMissing: !currentValidity,
            }),
            configurable: true,
          });

          await element.setError(valid, customErrorMessage, lock);
          await page.waitForChanges();

          input.dispatchEvent(new CustomEvent('blur', { bubbles: true }));
          await page.waitForChanges();

          currentValidity = false;
          input.checkValidity = jest.fn(() => currentValidity);
          input.dispatchEvent(new CustomEvent('blur', { bubbles: true }));
          await page.waitForChanges();

          if (lock && !valid) {
            expect(getErrorMessage(element)).toEqual(customErrorMessage);
          } else if (valid) {
            expect(getErrorMessage(element)).toEqual(undefined);
          } else {
            const errorMsg = getErrorMessage(element);
            expect(errorMsg).toBeDefined();
            expect(['Override error', 'This field is required.']).toContain(errorMsg);
          }
          expect(page.root).toMatchSnapshot();

          // Mock validity
          currentValidity = true;
          element.value = 'batman';
          input.checkValidity = jest.fn(() => currentValidity);
          Object.defineProperty(input, 'validity', {
            get: () => ({
              valueMissing: !currentValidity,
            }),
            configurable: true,
          });
          input.dispatchEvent(new CustomEvent('blur', { bubbles: true }));
          await page.waitForChanges();

          if (lock && !valid) {
            expect(getErrorMessage(element)).toEqual(customErrorMessage);
          } else {
            const errorMsg = getErrorMessage(element);
            if (valid) {
              expect(errorMsg).toEqual(undefined);
            } else {
              expect([undefined, customErrorMessage]).toContain(errorMsg);
            }
          }
        },
      );
    });

    test.each([
      [null, 'error message'],
      [undefined, 'error message'],
      [true, ''],
      [true, ' '],
      [true, null],
    ])('Should throw error when setError called with invalid arguments: %s, %s', async (valid, errorMessage) => {
      const page = await getPage({ label: 'label', identifier: 'identifier' });
      const { element } = await waitForEditor(page);

      await expect(element.setError(valid as boolean | null | undefined, errorMessage as string | null | undefined)).rejects.toThrow();
    });

    test.each([true, false])("should trigger input focus method with setFocus() component's public method, readonly %s", async readonly => {
      const page = await getPage({
        label: 'label',
        identifier: 'identifier',
        readonly,
      });
      const { element, editor } = await waitForEditor(page);

      if (editor !== undefined) editor.focus = jest.fn();

      await element.setFocus();

      await page.waitForChanges();

      if (readonly) {
        expect(editor).toBeUndefined();
      } else {
        expect(editor.focus).toHaveBeenCalled();
      }
    });

    test('Should reset editor content and validity state', async () => {
      const page = await getPage({
        label: 'label',
        identifier: 'identifier',
        value: '<p>Initial content</p>',
      });
      const { element } = await waitForEditor(page);

      const requestAnimationFrameSpy = jest.spyOn(global, 'requestAnimationFrame');
      // Call reset method
      await element.reset();
      await page.waitForChanges();

      expect(requestAnimationFrameSpy).toHaveBeenCalled();
      const errorElement = element.shadowRoot.querySelector('[slot="error"]');

      expect(element.value).toBe('');
      expect(errorElement).toBeNull();
    });

    test('Should not trigger reset content when component is readonly', async () => {
      const value = '<p>Initial content</p>';
      const page = await getPage({
        label: 'label',
        identifier: 'identifier',
        value,
        readonly: true,
      });
      const { element } = await waitForEditor(page);

      const requestAnimationFrameSpy = jest.spyOn(global, 'requestAnimationFrame');
      // Call reset method
      await element.reset();
      await page.waitForChanges();

      expect(requestAnimationFrameSpy).not.toHaveBeenCalled();
      expect(element.value).toEqual(value);
    });

    test('Should reset hasDisplayedError when validity changes', async () => {
      const page = await getPage({
        label: 'label',
        identifier: 'identifier',
        required: true,
        value: '',
      });
      const { element } = await waitForEditor(page);

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

    test('Should display locked custom error message when setError is called with lock', async () => {
      const page = await getPage({
        label: 'label',
        identifier: 'identifier',
        required: true,
        value: '',
      });
      const { element, input } = await waitForEditor(page);

      const customErrorMessage = 'Locked custom error';

      // Mock validity
      input.checkValidity = jest.fn(() => false);
      Object.defineProperty(input, 'validity', {
        get: jest.fn(() => ({
          valueMissing: true,
        })),
      });

      // Set error with lock
      await element.setError(false, customErrorMessage, true);
      await page.waitForChanges();

      // Verify locked custom error is displayed
      let errorElement = element.shadowRoot.querySelector('[slot="error"]');
      expect(errorElement).not.toBeNull();
      expect(errorElement.textContent.trim()).toBe(customErrorMessage);

      // Trigger blur event - locked error should remain
      const { editor } = await waitForEditor(page);
      editor.events.fire('blur');
      await page.waitForChanges();

      // Verify locked custom error is still displayed (not replaced by required error)
      errorElement = element.shadowRoot.querySelector('[slot="error"]');
      expect(errorElement).not.toBeNull();
      expect(errorElement.textContent.trim()).toBe(customErrorMessage);
    });

    test('Should not update validity when locked error message exists and trying to set valid to true', async () => {
      const page = await getPage({
        label: 'label',
        identifier: 'identifier',
        required: false,
        value: '<p>Content</p>',
      });
      const { element } = await waitForEditor(page);

      const customErrorMessage = 'Locked custom error';

      // Set error with lock
      await element.setError(false, customErrorMessage, true);
      await page.waitForChanges();

      // Verify error is displayed and valid is false
      expect(element.valid).toBe(false);
      let errorElement = element.shadowRoot.querySelector('[slot="error"]');
      expect(errorElement).not.toBeNull();
      expect(errorElement.textContent.trim()).toBe(customErrorMessage);

      // Try to set valid to true via checkValidity when readonly is true (which should not update because error is locked)
      element.readonly = true;
      await page.waitForChanges();

      // Trigger checkValidity by calling displayError
      // When readonly is true, checkValidity should call setValidity(true), but it should not update because error is locked
      await element.displayError();
      await page.waitForChanges();
      jest.runOnlyPendingTimers();

      // Verify that valid is still false because the error is locked
      expect(element.valid).toBe(false);
      errorElement = element.shadowRoot.querySelector('[slot="error"]');
      expect(errorElement).not.toBeNull();
      expect(errorElement.textContent.trim()).toBe(customErrorMessage);
    });
  });

  describe('Events', () => {
    test.each([true, false])('Should manage focus and blur events', async validity => {
      const page = await getPage({ label: 'label', identifier: 'identifier', helpText: 'My help text', required: !validity });
      const { editor } = await waitForEditor(page);

      jest.spyOn(page.rootInstance.valueChange, 'emit');

      // Test focus event via Jodit editor
      editor.events.fire('focus');
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();

      // Test blur event via Jodit editor
      editor.events.fire('blur');
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();
    });

    test('Should handle blur event when readonly is false and field is invalid', async () => {
      const page = await getPage({ label: 'label', identifier: 'identifier', required: true, readonly: false });
      const { editor, input } = await waitForEditor(page);

      // Mock validity to return false (invalid)
      input.checkValidity = jest.fn(() => false);
      Object.defineProperty(input, 'validity', {
        get: jest.fn(() => ({
          valueMissing: true,
        })),
      });

      // Trigger blur event via Jodit editor
      editor.events.fire('blur');
      await page.waitForChanges();

      // Verify that hasDisplayedError is set to true when field is invalid
      const errorElement = page.rootInstance.element.shadowRoot.querySelector('[slot="error"]');
      expect(errorElement).not.toBeNull();
      expect(errorElement.textContent.trim()).toBe(messages.errors.required);
    });

    test('Should handle blur event when readonly is true', async () => {
      const page = await getPage({ label: 'label', identifier: 'identifier', required: true, readonly: true });
      const { element } = await waitForEditor(page);

      // When readonly is true, editor is undefined but the component should still render
      expect(element).not.toBeNull();
      expect(element.shadowRoot.querySelector('mg-input')).not.toBeNull();
    });

    test.each([true, false])('Should handle text-change event', async validity => {
      const page = await getPage({
        label: 'label',
        identifier: 'identifier',
        required: !validity,
      });
      const { editor, element } = await waitForEditor(page);

      await element.displayError();
      await page.waitForChanges();
      jest.runOnlyPendingTimers();

      // Spy on relevant methods
      const valueChangeSpy = jest.spyOn(page.rootInstance.valueChange, 'emit');
      const checkValiditySpy = jest.spyOn(page.rootInstance, 'checkValidity');

      // Simulate text change
      const htmlContent = '<p>Test content</p>';
      Object.defineProperty(editor, 'value', {
        get: () => htmlContent,
        configurable: true,
      });

      // Trigger change event using Jodit's events API
      editor.events.fire('change');
      await page.waitForChanges();

      // Verify that value has been updated
      expect(page.rootInstance.value).toBe(htmlContent);

      // Verify that valueChange event has been emitted
      expect(valueChangeSpy).toHaveBeenCalledWith(htmlContent);

      // Verify that checkValidity has been called
      expect(checkValiditySpy).toHaveBeenCalled();
    });

    test('Should render with interactive helpText', async () => {
      const page = await getPage({ label: 'label', identifier: 'identifier', helpText: '<a href="#">My help text</a>' });
      const { input, element } = await waitForEditor(page);
      expect(page.root).toMatchSnapshot();

      // Mock focus event on input
      input.dispatchEvent(new CustomEvent('focus', { bubbles: true }));
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();

      // Add event listeners to link and document
      const helpTextLink = element.shadowRoot.querySelector('a');
      const helpTextLinkClick = jest.fn();
      const documentClick = jest.fn();
      helpTextLink.addEventListener('click', helpTextLinkClick);
      page.doc.addEventListener('click', documentClick);

      // Mock blur event on link click
      input.dispatchEvent(new CustomEvent('blur', { bubbles: true }));
      await page.waitForChanges();
      // Mock link click
      helpTextLink.click();
      await page.waitForChanges();

      expect(helpTextLinkClick).toHaveBeenCalled();
      expect(documentClick).toHaveBeenCalled();
      expect(page.root).toMatchSnapshot();
    });
  });

  describe('Editor', () => {
    describe('Configuration', () => {
      test('Should handle custom editor modules', async () => {
        const customModules = ['bold', 'italic'] as ButtonsOption;

        const page = await getPage({
          label: 'label',
          identifier: 'identifier',
          modules: customModules,
        });

        const { editor } = await waitForEditor(page);
        expect(editor.options.buttons).toEqual(customModules);
      });
    });

    describe('Wrapper methods', () => {
      test('Should call setReadOnly(false) to enable the editor', async () => {
        const page = await getPage({
          label: 'label',
          identifier: 'identifier',
        });

        const { editor } = await waitForEditor(page);

        // Spy on setReadOnly before calling it
        const setReadOnlySpy = jest.spyOn(editor, 'setReadOnly');

        // Call setReadOnly(false) to enable the editor
        editor.setReadOnly(false);

        expect(setReadOnlySpy).toHaveBeenCalledWith(false);
        setReadOnlySpy.mockRestore();
      });

      test('Should call setReadOnly(true) to disable the editor', async () => {
        const page = await getPage({
          label: 'label',
          identifier: 'identifier',
        });

        const { editor } = await waitForEditor(page);

        // Spy on setReadOnly before calling it
        const setReadOnlySpy = jest.spyOn(editor, 'setReadOnly');

        // Call setReadOnly(true) to disable the editor
        editor.setReadOnly(true);

        expect(setReadOnlySpy).toHaveBeenCalledWith(true);
        setReadOnlySpy.mockRestore();
      });

      test('editor.editor.textContent should return correct text content', async () => {
        const page = await getPage({ label: 'label', identifier: 'identifier', value: '<img src="test.jpg">' });
        const { editor } = await waitForEditor(page);

        // Test textContent extraction
        // When editor.value contains only an image, textContent should be empty
        const result = editor.editor.textContent.trim();
        expect(result).toEqual('');

        // Test with empty value
        editor.value = '';
        const resultEmpty = editor.editor.textContent.trim();
        expect(resultEmpty).toEqual('');

        // Test with value that has only whitespace
        editor.value = '   ';
        const resultWhitespace = editor.editor.textContent.trim();
        expect(resultWhitespace).toEqual('');

        // Test with value that has actual text content
        editor.value = '<p>Test content</p>';
        const resultWithContent = editor.editor.textContent.trim();
        expect(resultWithContent).toEqual('Test content');
      });
    });

    describe('defineEditor', () => {
      test('Should handle element in ShadowRoot', async () => {
        // Import defineEditor to test it directly
        const { defineEditor } = await import('../editor');

        // Create a mock component element with shadowRoot
        const mockElement = document.createElement('mg-input-rich-text-editor') as HTMLMgInputRichTextEditorElement;
        const shadowRoot = mockElement.attachShadow({ mode: 'open' });

        const wrapperElement = document.createElement('div');
        const editorElement = document.createElement('textarea');
        wrapperElement.appendChild(editorElement);
        shadowRoot.appendChild(wrapperElement);

        const handleTextChange = jest.fn();
        const handleFocus = jest.fn();
        const handleBlur = jest.fn();

        const editor = defineEditor(mockElement, editorElement, {
          modules: DEFAULT_MODULES,
          value: '<p>Test in ShadowRoot</p>',
          handleTextChange,
          handleFocus,
          handleBlur,
          readOnly: false,
          placeholder: 'Test placeholder',
        });

        expect(editor).toBeDefined();
        expect(editor.value).toBe('<p>Test in ShadowRoot</p>');
      });

      test('Should handle empty value', async () => {
        // Import defineEditor to test it directly
        const { defineEditor } = await import('../editor');

        // Create a mock component element with shadowRoot
        const mockElement = document.createElement('mg-input-rich-text-editor') as HTMLMgInputRichTextEditorElement;
        const shadowRoot = mockElement.attachShadow({ mode: 'open' });

        const wrapperElement = document.createElement('div');
        const editorElement = document.createElement('textarea');
        wrapperElement.appendChild(editorElement);
        shadowRoot.appendChild(wrapperElement);

        const handleTextChange = jest.fn();
        const handleFocus = jest.fn();
        const handleBlur = jest.fn();

        const editor = defineEditor(mockElement, editorElement, {
          modules: DEFAULT_MODULES,
          value: '',
          handleTextChange,
          handleFocus,
          handleBlur,
          readOnly: false,
          placeholder: 'Test placeholder',
        });

        expect(editor).toBeDefined();
        expect(editor.value).toBe('');
      });

      test('Should add custom CSS classes to Jodit elements', async () => {
        // Import defineEditor to test it directly
        const { defineEditor } = await import('../editor');

        // Create a mock component element with shadowRoot
        const mockElement = document.createElement('mg-input-rich-text-editor') as HTMLMgInputRichTextEditorElement;
        const shadowRoot = mockElement.attachShadow({ mode: 'open' });

        const wrapperElement = document.createElement('div');
        const editorElement = document.createElement('textarea');
        wrapperElement.appendChild(editorElement);
        shadowRoot.appendChild(wrapperElement);

        const handleTextChange = jest.fn();
        const handleFocus = jest.fn();
        const handleBlur = jest.fn();

        defineEditor(mockElement, editorElement, {
          modules: DEFAULT_MODULES,
          value: '<p>Test</p>',
          handleTextChange,
          handleFocus,
          handleBlur,
          readOnly: false,
          placeholder: 'Test placeholder',
        });

        // Verify that custom classes are added to Jodit elements
        expect(wrapperElement.querySelector('.jodit-container')?.classList.contains('mg-c-input__container')).toBe(true);
        expect(wrapperElement.querySelector('.jodit-toolbar__box')?.classList.contains('mg-c-input__toolbar-box')).toBe(true);
        expect(wrapperElement.querySelector('.jodit-workplace')?.classList.contains('mg-c-input__workplace')).toBe(true);
        expect(wrapperElement.querySelector('.jodit-wysiwyg')?.classList.contains('mg-c-input__wysiwyg')).toBe(true);
      });

      test('Should sync aria-describedby changes from textarea to wysiwyg element', async () => {
        const callbacks: Array<(mutations: MutationRecord[], observer: MutationObserver) => void> = [];
        const mockObserver = { disconnect: () => null, observe: () => null, takeRecords: () => [] } as MutationObserver;

        setupMutationObserverMock({
          observe: function () {
            callbacks.push(this.cb);
          },
          disconnect: () => null,
          takeRecords: () => [],
        });

        const { defineEditor } = await import('../editor');

        const mockElement = document.createElement('mg-input-rich-text-editor') as HTMLMgInputRichTextEditorElement;
        const shadowRoot = mockElement.attachShadow({ mode: 'open' });
        const wrapperElement = document.createElement('div');
        wrapperElement.id = 'test-identifier';
        const editorElement = document.createElement('textarea');
        wrapperElement.appendChild(editorElement);
        shadowRoot.appendChild(wrapperElement);

        defineEditor(mockElement, editorElement, {
          modules: DEFAULT_MODULES,
          value: '<p>Test</p>',
          handleTextChange: jest.fn(),
          handleFocus: jest.fn(),
          handleBlur: jest.fn(),
          readOnly: false,
          placeholder: 'Test placeholder',
        });
        jest.runOnlyPendingTimers();

        const wysiwygElement = wrapperElement.querySelector('.jodit-wysiwyg') as HTMLElement;
        expect(wysiwygElement).not.toBeNull();

        editorElement.setAttribute('aria-describedby', 'help-text-2');

        const mutation = {
          type: 'attributes',
          attributeName: 'aria-describedby',
          target: editorElement,
        } as unknown as MutationRecord;

        callbacks.forEach(cb => cb([mutation], mockObserver));

        expect(wysiwygElement.getAttribute('aria-describedby')).toBe('help-text-2');
      });

      test('Should handle toolbar keyboard navigation (ArrowLeft, ArrowRight, Home, End)', async () => {
        const { defineEditor } = await import('../editor');

        const mockElement = document.createElement('mg-input-rich-text-editor') as HTMLMgInputRichTextEditorElement;
        const shadowRoot = mockElement.attachShadow({ mode: 'open' });

        const wrapperElement = document.createElement('div');
        const editorElement = document.createElement('textarea');
        wrapperElement.appendChild(editorElement);
        shadowRoot.appendChild(wrapperElement);

        const handleTextChange = jest.fn();
        const handleFocus = jest.fn();
        const handleBlur = jest.fn();

        defineEditor(mockElement, editorElement, {
          modules: DEFAULT_MODULES,
          value: '<p>Test</p>',
          handleTextChange,
          handleFocus,
          handleBlur,
          readOnly: false,
          placeholder: 'Test placeholder',
        });

        jest.runOnlyPendingTimers();

        // Jodit mock creates the DOM structure, find the toolbar
        const toolbarElement = wrapperElement.querySelector('.jodit-toolbar__box') as HTMLElement;
        expect(toolbarElement).not.toBeNull();

        // Create toolbar buttons (Jodit mock doesn't create buttons, so we add them)
        const button1 = document.createElement('button');
        button1.textContent = 'Bold';
        Object.defineProperty(button1, 'offsetParent', { value: {}, configurable: true });
        const button2 = document.createElement('button');
        button2.textContent = 'Italic';
        Object.defineProperty(button2, 'offsetParent', { value: {}, configurable: true });
        const button3 = document.createElement('button');
        button3.textContent = 'Underline';
        Object.defineProperty(button3, 'offsetParent', { value: {}, configurable: true });

        toolbarElement.appendChild(button1);
        toolbarElement.appendChild(button2);
        toolbarElement.appendChild(button3);

        // Wait for accessibility setup
        jest.runOnlyPendingTimers();

        // Test ArrowRight navigation (dispatch from button so event.target is the button; detached elements don't receive focus so assert tabindex)
        const arrowRightEvent = new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, cancelable: true });
        Object.defineProperty(arrowRightEvent, 'target', { value: button1, configurable: true });
        button1.dispatchEvent(arrowRightEvent);
        expect(button2.getAttribute('tabindex')).toBe('0');
        expect(button1.getAttribute('tabindex')).toBe('-1');

        // Test ArrowLeft navigation
        const arrowLeftEvent = new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true, cancelable: true });
        Object.defineProperty(arrowLeftEvent, 'target', { value: button2, configurable: true });
        button2.dispatchEvent(arrowLeftEvent);
        expect(button1.getAttribute('tabindex')).toBe('0');
        expect(button2.getAttribute('tabindex')).toBe('-1');

        // Test Home key
        const homeEvent = new KeyboardEvent('keydown', { key: 'Home', bubbles: true, cancelable: true });
        Object.defineProperty(homeEvent, 'target', { value: button3, configurable: true });
        button3.dispatchEvent(homeEvent);
        expect(button1.getAttribute('tabindex')).toBe('0');
        expect(button3.getAttribute('tabindex')).toBe('-1');

        // Test End key
        const endEvent = new KeyboardEvent('keydown', { key: 'End', bubbles: true, cancelable: true });
        Object.defineProperty(endEvent, 'target', { value: button1, configurable: true });
        button1.dispatchEvent(endEvent);
        expect(button3.getAttribute('tabindex')).toBe('0');
        expect(button1.getAttribute('tabindex')).toBe('-1');

        // Test ArrowLeft from first button (wrap to last)
        const arrowLeftFromFirst = new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true, cancelable: true });
        button1.dispatchEvent(arrowLeftFromFirst);
        expect(button3.getAttribute('tabindex')).toBe('0');
        expect(button1.getAttribute('tabindex')).toBe('-1');

        // Test ArrowRight from last button (wrap to first)
        const arrowRightFromLast = new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, cancelable: true });
        button3.dispatchEvent(arrowRightFromLast);
        expect(button1.getAttribute('tabindex')).toBe('0');
        expect(button3.getAttribute('tabindex')).toBe('-1');
      });

      test('Should handle toolbar focus events and roving tabindex', async () => {
        const { defineEditor } = await import('../editor');

        const mockElement = document.createElement('mg-input-rich-text-editor') as HTMLMgInputRichTextEditorElement;
        const shadowRoot = mockElement.attachShadow({ mode: 'open' });

        const wrapperElement = document.createElement('div');
        const editorElement = document.createElement('textarea');
        wrapperElement.appendChild(editorElement);
        shadowRoot.appendChild(wrapperElement);

        const handleTextChange = jest.fn();
        const handleFocus = jest.fn();
        const handleBlur = jest.fn();

        defineEditor(mockElement, editorElement, {
          modules: DEFAULT_MODULES,
          value: '<p>Test</p>',
          handleTextChange,
          handleFocus,
          handleBlur,
          readOnly: false,
          placeholder: 'Test placeholder',
        });

        jest.runOnlyPendingTimers();

        // Jodit mock creates the DOM structure
        const toolbarElement = wrapperElement.querySelector('.jodit-toolbar__box') as HTMLElement;
        const wysiwygElement = wrapperElement.querySelector('.jodit-wysiwyg') as HTMLElement;
        expect(toolbarElement).not.toBeNull();
        expect(wysiwygElement).not.toBeNull();

        // Create toolbar buttons
        const button1 = document.createElement('button');
        button1.textContent = 'Bold';
        Object.defineProperty(button1, 'offsetParent', { value: {}, configurable: true });
        const button2 = document.createElement('button');
        button2.textContent = 'Italic';
        Object.defineProperty(button2, 'offsetParent', { value: {}, configurable: true });

        toolbarElement.appendChild(button1);
        toolbarElement.appendChild(button2);

        // Wait for accessibility setup
        jest.runOnlyPendingTimers();

        // Test focusin event activates roving tabindex (dispatch from button so event.target is the button)
        const focusInEvent = new FocusEvent('focusin', { bubbles: true });
        button2.dispatchEvent(focusInEvent);

        // After focus, button2 should have tabindex="0" and button1 should have tabindex="-1"
        expect(button2.getAttribute('tabindex')).toBe('0');
        expect(button1.getAttribute('tabindex')).toBe('-1');

        // Test focusout event resets roving tabindex when moving to wysiwyg
        const focusOutEvent = new FocusEvent('focusout', { bubbles: true });
        Object.defineProperty(focusOutEvent, 'target', { value: button2, configurable: true });
        Object.defineProperty(focusOutEvent, 'relatedTarget', { value: wysiwygElement, configurable: true });
        toolbarElement.dispatchEvent(focusOutEvent);

        // After focusout, all buttons should have tabindex="-1"
        expect(button1.getAttribute('tabindex')).toBe('-1');
        expect(button2.getAttribute('tabindex')).toBe('-1');
      });

      test('Should filter toolbar buttons correctly (visible, in toolbar, not in popup)', async () => {
        const { defineEditor } = await import('../editor');

        const mockElement = document.createElement('mg-input-rich-text-editor') as HTMLMgInputRichTextEditorElement;
        const shadowRoot = mockElement.attachShadow({ mode: 'open' });

        const wrapperElement = document.createElement('div');
        const editorElement = document.createElement('textarea');
        wrapperElement.appendChild(editorElement);
        shadowRoot.appendChild(wrapperElement);

        const handleTextChange = jest.fn();
        const handleFocus = jest.fn();
        const handleBlur = jest.fn();

        defineEditor(mockElement, editorElement, {
          modules: DEFAULT_MODULES,
          value: '<p>Test</p>',
          handleTextChange,
          handleFocus,
          handleBlur,
          readOnly: false,
          placeholder: 'Test placeholder',
        });

        jest.runOnlyPendingTimers();

        // Jodit mock creates the DOM structure
        const toolbarElement = wrapperElement.querySelector('.jodit-toolbar__box') as HTMLElement;
        expect(toolbarElement).not.toBeNull();

        // Create visible button
        const visibleButton = document.createElement('button');
        visibleButton.textContent = 'Bold';
        Object.defineProperty(visibleButton, 'offsetParent', { value: {}, configurable: true });

        // Create hidden button (offsetParent is null)
        const hiddenButton = document.createElement('button');
        hiddenButton.textContent = 'Hidden';
        hiddenButton.style.display = 'none';
        Object.defineProperty(hiddenButton, 'offsetParent', { value: null, configurable: true });

        // Create button in popup
        const popup = document.createElement('div');
        popup.className = 'jodit-popup';
        const popupButton = document.createElement('button');
        popupButton.textContent = 'Popup';
        Object.defineProperty(popupButton, 'offsetParent', { value: {}, configurable: true });
        popup.appendChild(popupButton);

        toolbarElement.appendChild(visibleButton);
        toolbarElement.appendChild(hiddenButton);
        toolbarElement.appendChild(popup);

        // Wait for accessibility setup
        jest.runOnlyPendingTimers();

        // Only visibleButton should be focusable (not hidden, not in popup); dispatch from button so event.target is the button
        const focusInEvent = new FocusEvent('focusin', { bubbles: true });
        visibleButton.dispatchEvent(focusInEvent);

        expect(visibleButton.getAttribute('tabindex')).toBe('0');
        // Hidden button and popup button should not have tabindex="0"
        expect(hiddenButton.getAttribute('tabindex')).not.toBe('0');
        expect(popupButton.getAttribute('tabindex')).not.toBe('0');
      });

      test('Should handle Shift+Tab from wysiwyg to toolbar', async () => {
        const { defineEditor } = await import('../editor');

        const mockElement = document.createElement('mg-input-rich-text-editor') as HTMLMgInputRichTextEditorElement;
        const shadowRoot = mockElement.attachShadow({ mode: 'open' });

        const wrapperElement = document.createElement('div');
        const editorElement = document.createElement('textarea');
        wrapperElement.appendChild(editorElement);
        shadowRoot.appendChild(wrapperElement);

        const handleTextChange = jest.fn();
        const handleFocus = jest.fn();
        const handleBlur = jest.fn();

        defineEditor(mockElement, editorElement, {
          modules: DEFAULT_MODULES,
          value: '<p>Test</p>',
          handleTextChange,
          handleFocus,
          handleBlur,
          readOnly: false,
          placeholder: 'Test placeholder',
        });

        jest.runOnlyPendingTimers();

        // Jodit mock creates the DOM structure
        const toolbarElement = wrapperElement.querySelector('.jodit-toolbar__box') as HTMLElement;
        const wysiwygElement = wrapperElement.querySelector('.jodit-wysiwyg') as HTMLElement;
        expect(toolbarElement).not.toBeNull();
        expect(wysiwygElement).not.toBeNull();

        // Create toolbar button
        const button1 = document.createElement('button');
        button1.textContent = 'Bold';
        Object.defineProperty(button1, 'offsetParent', { value: {}, configurable: true });
        toolbarElement.appendChild(button1);

        // Wait for accessibility setup
        jest.runOnlyPendingTimers();

        // Simulate Shift+Tab from wysiwyg
        const shiftTabEvent = new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, bubbles: true, cancelable: true });
        Object.defineProperty(shiftTabEvent, 'target', { value: wysiwygElement, configurable: true });
        wysiwygElement.dispatchEvent(shiftTabEvent);

        // First button should have tabindex="0" (detached elements don't receive focus in JSDOM so we don't assert activeElement)
        expect(button1.getAttribute('tabindex')).toBe('0');
      });

      test('Should handle title element click to focus editor', async () => {
        const { defineEditor } = await import('../editor');

        const mockElement = document.createElement('mg-input-rich-text-editor') as HTMLMgInputRichTextEditorElement;
        Object.defineProperty(mockElement, 'identifier', { value: 'test-id', configurable: true });
        const shadowRoot = mockElement.attachShadow({ mode: 'open' });

        const wrapperElement = document.createElement('div');
        const editorElement = document.createElement('textarea');
        wrapperElement.appendChild(editorElement);
        shadowRoot.appendChild(wrapperElement);

        const titleElement = document.createElement('mg-input-title');
        titleElement.textContent = 'Label';
        shadowRoot.appendChild(titleElement);

        const handleTextChange = jest.fn();
        const handleFocus = jest.fn();
        const handleBlur = jest.fn();

        const editor = defineEditor(mockElement, editorElement, {
          modules: DEFAULT_MODULES,
          value: '<p>Test</p>',
          handleTextChange,
          handleFocus,
          handleBlur,
          readOnly: false,
          placeholder: 'Test placeholder',
        });

        jest.runOnlyPendingTimers();

        // Mock editor.focus
        editor.focus = jest.fn();

        // Simulate click on title element
        titleElement.dispatchEvent(new MouseEvent('click', { bubbles: true }));

        // Editor should be focused
        expect(editor.focus).toHaveBeenCalled();
      });

      test('Should handle Tab key in toolbar without preventing default', async () => {
        const { defineEditor } = await import('../editor');

        const mockElement = document.createElement('mg-input-rich-text-editor') as HTMLMgInputRichTextEditorElement;
        const shadowRoot = mockElement.attachShadow({ mode: 'open' });

        const wrapperElement = document.createElement('div');
        const editorElement = document.createElement('textarea');
        wrapperElement.appendChild(editorElement);
        shadowRoot.appendChild(wrapperElement);

        const handleTextChange = jest.fn();
        const handleFocus = jest.fn();
        const handleBlur = jest.fn();

        defineEditor(mockElement, editorElement, {
          modules: DEFAULT_MODULES,
          value: '<p>Test</p>',
          handleTextChange,
          handleFocus,
          handleBlur,
          readOnly: false,
          placeholder: 'Test placeholder',
        });

        jest.runOnlyPendingTimers();

        // Jodit mock creates the DOM structure
        const toolbarElement = wrapperElement.querySelector('.jodit-toolbar__box') as HTMLElement;
        expect(toolbarElement).not.toBeNull();

        // Create toolbar button
        const button1 = document.createElement('button');
        button1.textContent = 'Bold';
        Object.defineProperty(button1, 'offsetParent', { value: {}, configurable: true });
        toolbarElement.appendChild(button1);

        // Wait for accessibility setup
        jest.runOnlyPendingTimers();

        // Test Tab key - dispatch from button so handler receives target=button and does not prevent default
        const tabEvent = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true });
        const preventDefaultSpy = jest.spyOn(tabEvent, 'preventDefault');
        button1.dispatchEvent(tabEvent);

        // Tab should not be prevented (normal Tab behavior)
        expect(preventDefaultSpy).not.toHaveBeenCalled();
      });

      test('Should not handle keydown when target is not a button', async () => {
        const { defineEditor } = await import('../editor');

        const mockElement = document.createElement('mg-input-rich-text-editor') as HTMLMgInputRichTextEditorElement;
        const shadowRoot = mockElement.attachShadow({ mode: 'open' });

        const wrapperElement = document.createElement('div');
        const editorElement = document.createElement('textarea');
        wrapperElement.appendChild(editorElement);
        shadowRoot.appendChild(wrapperElement);

        const handleTextChange = jest.fn();
        const handleFocus = jest.fn();
        const handleBlur = jest.fn();

        defineEditor(mockElement, editorElement, {
          modules: DEFAULT_MODULES,
          value: '<p>Test</p>',
          handleTextChange,
          handleFocus,
          handleBlur,
          readOnly: false,
          placeholder: 'Test placeholder',
        });

        jest.runOnlyPendingTimers();

        const toolbarElement = wrapperElement.querySelector('.jodit-toolbar__box') as HTMLElement;
        expect(toolbarElement).not.toBeNull();

        const button1 = document.createElement('button');
        button1.textContent = 'Bold';
        Object.defineProperty(button1, 'offsetParent', { value: {}, configurable: true });
        toolbarElement.appendChild(button1);

        jest.runOnlyPendingTimers();

        // Dispatch keydown from toolbar (div) so target is toolbar - handler returns early
        const keydownEvent = new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, cancelable: true });
        toolbarElement.dispatchEvent(keydownEvent);

        // Button tabindex should be unchanged (handler did not run)
        expect(button1.getAttribute('tabindex')).not.toBe('0');
      });

      test('Should handle other keys in toolbar without preventing default', async () => {
        const { defineEditor } = await import('../editor');

        const mockElement = document.createElement('mg-input-rich-text-editor') as HTMLMgInputRichTextEditorElement;
        const shadowRoot = mockElement.attachShadow({ mode: 'open' });

        const wrapperElement = document.createElement('div');
        const editorElement = document.createElement('textarea');
        wrapperElement.appendChild(editorElement);
        shadowRoot.appendChild(wrapperElement);

        const handleTextChange = jest.fn();
        const handleFocus = jest.fn();
        const handleBlur = jest.fn();

        defineEditor(mockElement, editorElement, {
          modules: DEFAULT_MODULES,
          value: '<p>Test</p>',
          handleTextChange,
          handleFocus,
          handleBlur,
          readOnly: false,
          placeholder: 'Test placeholder',
        });

        jest.runOnlyPendingTimers();

        // Jodit mock creates the DOM structure
        const toolbarElement = wrapperElement.querySelector('.jodit-toolbar__box') as HTMLElement;
        expect(toolbarElement).not.toBeNull();

        // Create toolbar button
        const button1 = document.createElement('button');
        button1.textContent = 'Bold';
        Object.defineProperty(button1, 'offsetParent', { value: {}, configurable: true });
        toolbarElement.appendChild(button1);

        // Wait for accessibility setup
        jest.runOnlyPendingTimers();

        // Test Enter key - dispatch from button so handler receives target=button and does not prevent default
        const enterEvent = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true });
        const preventDefaultSpy = jest.spyOn(enterEvent, 'preventDefault');
        button1.dispatchEvent(enterEvent);

        // Enter should not be prevented (normal behavior)
        expect(preventDefaultSpy).not.toHaveBeenCalled();
      });

      test('Should not activate roving tabindex when focusin target is not a button', async () => {
        const { defineEditor } = await import('../editor');

        const mockElement = document.createElement('mg-input-rich-text-editor') as HTMLMgInputRichTextEditorElement;
        const shadowRoot = mockElement.attachShadow({ mode: 'open' });

        const wrapperElement = document.createElement('div');
        const editorElement = document.createElement('textarea');
        wrapperElement.appendChild(editorElement);
        shadowRoot.appendChild(wrapperElement);

        const handleTextChange = jest.fn();
        const handleFocus = jest.fn();
        const handleBlur = jest.fn();

        defineEditor(mockElement, editorElement, {
          modules: DEFAULT_MODULES,
          value: '<p>Test</p>',
          handleTextChange,
          handleFocus,
          handleBlur,
          readOnly: false,
          placeholder: 'Test placeholder',
        });

        jest.runOnlyPendingTimers();

        const toolbarElement = wrapperElement.querySelector('.jodit-toolbar__box') as HTMLElement;
        expect(toolbarElement).not.toBeNull();

        const button1 = document.createElement('button');
        button1.textContent = 'Bold';
        Object.defineProperty(button1, 'offsetParent', { value: {}, configurable: true });
        toolbarElement.appendChild(button1);

        jest.runOnlyPendingTimers();

        // Dispatch focusin from toolbar (div) so target is toolbar - handler returns early when target is not a button
        const focusInEvent = new FocusEvent('focusin', { bubbles: true });
        toolbarElement.dispatchEvent(focusInEvent);

        // No button should get tabindex="0" (handler returned early when target is not a button)
        expect(button1.getAttribute('tabindex')).not.toBe('0');
      });

      test('Should not intercept keydown when not Shift+Tab on wysiwyg', async () => {
        const { defineEditor } = await import('../editor');

        const mockElement = document.createElement('mg-input-rich-text-editor') as HTMLMgInputRichTextEditorElement;
        const shadowRoot = mockElement.attachShadow({ mode: 'open' });

        const wrapperElement = document.createElement('div');
        const editorElement = document.createElement('textarea');
        wrapperElement.appendChild(editorElement);
        shadowRoot.appendChild(wrapperElement);

        const handleTextChange = jest.fn();
        const handleFocus = jest.fn();
        const handleBlur = jest.fn();

        defineEditor(mockElement, editorElement, {
          modules: DEFAULT_MODULES,
          value: '<p>Test</p>',
          handleTextChange,
          handleFocus,
          handleBlur,
          readOnly: false,
          placeholder: 'Test placeholder',
        });

        jest.runOnlyPendingTimers();

        const toolbarElement = wrapperElement.querySelector('.jodit-toolbar__box') as HTMLElement;
        const wysiwygElement = wrapperElement.querySelector('.jodit-wysiwyg') as HTMLElement;
        expect(wysiwygElement).not.toBeNull();

        const button1 = document.createElement('button');
        button1.textContent = 'Bold';
        Object.defineProperty(button1, 'offsetParent', { value: {}, configurable: true });
        toolbarElement.appendChild(button1);

        jest.runOnlyPendingTimers();

        // Dispatch Tab without shift - handler returns early
        const tabOnlyEvent = new KeyboardEvent('keydown', { key: 'Tab', shiftKey: false, bubbles: true, cancelable: true });
        wysiwygElement.dispatchEvent(tabOnlyEvent);

        // First button should not have tabindex="0" (handler did not run, so button stays at "-1" from init)
        expect(button1.getAttribute('tabindex')).not.toBe('0');
      });

      test('Should handle Shift+Tab on wysiwyg when toolbar is removed', async () => {
        const { defineEditor } = await import('../editor');

        const mockElement = document.createElement('mg-input-rich-text-editor') as HTMLMgInputRichTextEditorElement;
        const shadowRoot = mockElement.attachShadow({ mode: 'open' });

        const wrapperElement = document.createElement('div');
        const editorElement = document.createElement('textarea');
        wrapperElement.appendChild(editorElement);
        shadowRoot.appendChild(wrapperElement);

        const handleTextChange = jest.fn();
        const handleFocus = jest.fn();
        const handleBlur = jest.fn();

        defineEditor(mockElement, editorElement, {
          modules: DEFAULT_MODULES,
          value: '<p>Test</p>',
          handleTextChange,
          handleFocus,
          handleBlur,
          readOnly: false,
          placeholder: 'Test placeholder',
        });

        jest.runOnlyPendingTimers();

        const toolbarElement = wrapperElement.querySelector('.jodit-toolbar__box') as HTMLElement;
        const wysiwygElement = wrapperElement.querySelector('.jodit-wysiwyg') as HTMLElement;
        expect(toolbarElement).not.toBeNull();

        // Remove toolbar so getJoditToolbarElement() returns null when handleWysiwygShiftTab runs
        toolbarElement.remove();

        // Dispatch Shift+Tab on wysiwyg - handler calls getFocusableToolbarButtons(null)
        const shiftTabEvent = new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, bubbles: true, cancelable: true });
        wysiwygElement.dispatchEvent(shiftTabEvent);

        // No error, handler returns early because buttons.length === 0
        expect(wysiwygElement).toBeDefined();
      });

      test('Should not update roving tabindex when keydown target is button in popup (not in getToolbarButtons)', async () => {
        const { defineEditor } = await import('../editor');

        const mockElement = document.createElement('mg-input-rich-text-editor') as HTMLMgInputRichTextEditorElement;
        const shadowRoot = mockElement.attachShadow({ mode: 'open' });

        const wrapperElement = document.createElement('div');
        const editorElement = document.createElement('textarea');
        wrapperElement.appendChild(editorElement);
        shadowRoot.appendChild(wrapperElement);

        const handleTextChange = jest.fn();
        const handleFocus = jest.fn();
        const handleBlur = jest.fn();

        defineEditor(mockElement, editorElement, {
          modules: DEFAULT_MODULES,
          value: '<p>Test</p>',
          handleTextChange,
          handleFocus,
          handleBlur,
          readOnly: false,
          placeholder: 'Test placeholder',
        });

        jest.runOnlyPendingTimers();

        const toolbarElement = wrapperElement.querySelector('.jodit-toolbar__box') as HTMLElement;
        expect(toolbarElement).not.toBeNull();

        // button1 is focusable; button2 is inside popup so getFocusableToolbarButtons excludes it -> getToolbarButtons() returns [button1]
        const button1 = document.createElement('button');
        button1.textContent = 'Bold';
        Object.defineProperty(button1, 'offsetParent', { value: {}, configurable: true });
        const popup = document.createElement('div');
        popup.className = 'jodit-popup';
        const button2 = document.createElement('button');
        button2.textContent = 'In popup';
        Object.defineProperty(button2, 'offsetParent', { value: {}, configurable: true });
        popup.appendChild(button2);
        toolbarElement.appendChild(button1);
        toolbarElement.appendChild(popup);

        jest.runOnlyPendingTimers();

        const tabindexBefore = button1.getAttribute('tabindex');

        // Dispatch keydown from button2 (in popup) - target is not in getToolbarButtons, handler returns early
        const keydownEvent = new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, cancelable: true });
        button2.dispatchEvent(keydownEvent);

        // Handler returns early, so button1 tabindex unchanged
        expect(button1.getAttribute('tabindex')).toBe(tabindexBefore);
      });

      test('Should not set tabindex when focusin target is button in popup', async () => {
        const { defineEditor } = await import('../editor');

        const mockElement = document.createElement('mg-input-rich-text-editor') as HTMLMgInputRichTextEditorElement;
        const shadowRoot = mockElement.attachShadow({ mode: 'open' });

        const wrapperElement = document.createElement('div');
        const editorElement = document.createElement('textarea');
        wrapperElement.appendChild(editorElement);
        shadowRoot.appendChild(wrapperElement);

        const handleTextChange = jest.fn();
        const handleFocus = jest.fn();
        const handleBlur = jest.fn();

        defineEditor(mockElement, editorElement, {
          modules: DEFAULT_MODULES,
          value: '<p>Test</p>',
          handleTextChange,
          handleFocus,
          handleBlur,
          readOnly: false,
          placeholder: 'Test placeholder',
        });

        jest.runOnlyPendingTimers();

        const toolbarElement = wrapperElement.querySelector('.jodit-toolbar__box') as HTMLElement;
        expect(toolbarElement).not.toBeNull();

        // Only button inside popup - getFocusableToolbarButtons excludes it, getToolbarButtons() returns []
        const popup = document.createElement('div');
        popup.className = 'jodit-popup';
        const popupButton = document.createElement('button');
        popupButton.textContent = 'In popup';
        Object.defineProperty(popupButton, 'offsetParent', { value: {}, configurable: true });
        popup.appendChild(popupButton);
        toolbarElement.appendChild(popup);

        jest.runOnlyPendingTimers();

        const focusInEvent = new FocusEvent('focusin', { bubbles: true });
        popupButton.dispatchEvent(focusInEvent);

        // Handler returns early (buttons.length === 0), popup button never gets tabindex set
        expect(popupButton.getAttribute('tabindex')).toBeNull();
      });

      test('Should set first toolbar button to tabindex 0 when focusin target is button in popup', async () => {
        const { defineEditor } = await import('../editor');

        const mockElement = document.createElement('mg-input-rich-text-editor') as HTMLMgInputRichTextEditorElement;
        const shadowRoot = mockElement.attachShadow({ mode: 'open' });
        const wrapperElement = document.createElement('div');
        const editorElement = document.createElement('textarea');
        wrapperElement.appendChild(editorElement);
        shadowRoot.appendChild(wrapperElement);

        defineEditor(mockElement, editorElement, {
          modules: DEFAULT_MODULES,
          value: '<p>Test</p>',
          handleTextChange: jest.fn(),
          handleFocus: jest.fn(),
          handleBlur: jest.fn(),
          readOnly: false,
          placeholder: 'Test placeholder',
        });
        jest.runOnlyPendingTimers();

        const toolbarElement = wrapperElement.querySelector('.jodit-toolbar__box') as HTMLElement;
        expect(toolbarElement).not.toBeNull();

        const button1 = document.createElement('button');
        button1.textContent = 'Bold';
        Object.defineProperty(button1, 'offsetParent', { value: {}, configurable: true });
        toolbarElement.appendChild(button1);

        const popup = document.createElement('div');
        popup.className = 'jodit-popup';
        const popupButton = document.createElement('button');
        popupButton.textContent = 'In popup';
        Object.defineProperty(popupButton, 'offsetParent', { value: {}, configurable: true });
        popup.appendChild(popupButton);
        toolbarElement.appendChild(popup);

        jest.runOnlyPendingTimers();

        const focusInEvent = new FocusEvent('focusin', { bubbles: true });
        popupButton.dispatchEvent(focusInEvent);

        expect(button1.getAttribute('tabindex')).toBe('0');
      });

      test('Should not prevent keydown when getToolbarButtons returns empty', async () => {
        const { defineEditor } = await import('../editor');

        const mockElement = document.createElement('mg-input-rich-text-editor') as HTMLMgInputRichTextEditorElement;
        const shadowRoot = mockElement.attachShadow({ mode: 'open' });

        const wrapperElement = document.createElement('div');
        const editorElement = document.createElement('textarea');
        wrapperElement.appendChild(editorElement);
        shadowRoot.appendChild(wrapperElement);

        const handleTextChange = jest.fn();
        const handleFocus = jest.fn();
        const handleBlur = jest.fn();

        defineEditor(mockElement, editorElement, {
          modules: DEFAULT_MODULES,
          value: '<p>Test</p>',
          handleTextChange,
          handleFocus,
          handleBlur,
          readOnly: false,
          placeholder: 'Test placeholder',
        });

        jest.runOnlyPendingTimers();

        const toolbarElement = wrapperElement.querySelector('.jodit-toolbar__box') as HTMLElement;
        expect(toolbarElement).not.toBeNull();

        // Only button inside popup - getToolbarButtons() returns [], handler returns early
        const popup = document.createElement('div');
        popup.className = 'jodit-popup';
        const popupButton = document.createElement('button');
        popupButton.textContent = 'In popup';
        Object.defineProperty(popupButton, 'offsetParent', { value: {}, configurable: true });
        popup.appendChild(popupButton);
        toolbarElement.appendChild(popup);

        jest.runOnlyPendingTimers();

        const keydownEvent = new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, cancelable: true });
        popupButton.dispatchEvent(keydownEvent);

        expect(popupButton.getAttribute('tabindex')).toBeNull();
      });

      test('Should complete when wysiwyg element is removed after init', async () => {
        const { defineEditor } = await import('../editor');

        const mockElement = document.createElement('mg-input-rich-text-editor') as HTMLMgInputRichTextEditorElement;
        const shadowRoot = mockElement.attachShadow({ mode: 'open' });
        const wrapperElement = document.createElement('div');
        const editorElement = document.createElement('textarea');
        wrapperElement.appendChild(editorElement);
        shadowRoot.appendChild(wrapperElement);

        defineEditor(mockElement, editorElement, {
          modules: DEFAULT_MODULES,
          value: '<p>Test</p>',
          handleTextChange: jest.fn(),
          handleFocus: jest.fn(),
          handleBlur: jest.fn(),
          readOnly: false,
          placeholder: 'Test placeholder',
        });

        const wysiwygElement = wrapperElement.querySelector('.jodit-wysiwyg');
        wysiwygElement?.remove();
        jest.runOnlyPendingTimers();

        expect(wrapperElement.querySelector('.jodit-wysiwyg')).toBeNull();
      });

      test('Should set wysiwyg id when identifier is set and no mg-input-title in shadow', async () => {
        const { defineEditor } = await import('../editor');

        const mockElement = document.createElement('mg-input-rich-text-editor') as HTMLMgInputRichTextEditorElement;
        mockElement.identifier = 'test-id';
        const shadowRoot = mockElement.attachShadow({ mode: 'open' });
        const wrapperElement = document.createElement('div');
        const editorElement = document.createElement('textarea');
        wrapperElement.appendChild(editorElement);
        shadowRoot.appendChild(wrapperElement);

        defineEditor(mockElement, editorElement, {
          modules: DEFAULT_MODULES,
          value: '<p>Test</p>',
          handleTextChange: jest.fn(),
          handleFocus: jest.fn(),
          handleBlur: jest.fn(),
          readOnly: false,
          placeholder: 'Test placeholder',
        });
        jest.runOnlyPendingTimers();

        const wysiwygElement = wrapperElement.querySelector('.jodit-wysiwyg') as HTMLElement;
        expect(wysiwygElement).not.toBeNull();
        expect(wysiwygElement.id).toBe('test-id');
        expect(mockElement.shadowRoot.querySelector('mg-input-title')).toBeNull();
      });

      test('Should set titleElement id and click listener when mg-input-title is in shadow', async () => {
        const { defineEditor } = await import('../editor');

        const mockElement = document.createElement('mg-input-rich-text-editor') as HTMLMgInputRichTextEditorElement;
        mockElement.identifier = 'test-id';
        const shadowRoot = mockElement.attachShadow({ mode: 'open' });
        const wrapperElement = document.createElement('div');
        const editorElement = document.createElement('textarea');
        wrapperElement.appendChild(editorElement);
        shadowRoot.appendChild(wrapperElement);
        const titleElement = document.createElement('mg-input-title') as HTMLElement;
        shadowRoot.appendChild(titleElement);

        defineEditor(mockElement, editorElement, {
          modules: DEFAULT_MODULES,
          value: '<p>Test</p>',
          handleTextChange: jest.fn(),
          handleFocus: jest.fn(),
          handleBlur: jest.fn(),
          readOnly: false,
          placeholder: 'Test placeholder',
        });
        jest.runOnlyPendingTimers();

        expect(titleElement.id).toBe('test-id-title');
      });

      test('Should set wysiwyg id and expose mg-input-title when component mounts with identifier', async () => {
        const page = await getPage({ label: 'Label', identifier: 'editor-id' });
        const { element } = await waitForEditor(page);

        const wysiwygElement = element.shadowRoot.querySelector('#editor-id') as HTMLElement;
        expect(wysiwygElement).not.toBeNull();
        expect(wysiwygElement.classList.contains('jodit-wysiwyg')).toBe(true);
        expect(wysiwygElement.id).toBe('editor-id');
        expect(element.shadowRoot.querySelector('mg-input-title')).not.toBeNull();
      });

      test('Should activate roving tabindex when focusin target is toolbar button', async () => {
        const { defineEditor } = await import('../editor');

        const mockElement = document.createElement('mg-input-rich-text-editor') as HTMLMgInputRichTextEditorElement;
        const shadowRoot = mockElement.attachShadow({ mode: 'open' });

        const wrapperElement = document.createElement('div');
        const editorElement = document.createElement('textarea');
        wrapperElement.appendChild(editorElement);
        shadowRoot.appendChild(wrapperElement);

        const handleTextChange = jest.fn();
        const handleFocus = jest.fn();
        const handleBlur = jest.fn();

        defineEditor(mockElement, editorElement, {
          modules: DEFAULT_MODULES,
          value: '<p>Test</p>',
          handleTextChange,
          handleFocus,
          handleBlur,
          readOnly: false,
          placeholder: 'Test placeholder',
        });

        jest.runOnlyPendingTimers();

        const toolbarElement = wrapperElement.querySelector('.jodit-toolbar__box') as HTMLElement;
        expect(toolbarElement).not.toBeNull();

        const button1 = document.createElement('button');
        button1.textContent = 'Bold';
        Object.defineProperty(button1, 'offsetParent', { value: {}, configurable: true });
        const button2 = document.createElement('button');
        button2.textContent = 'Disabled';
        button2.disabled = true;
        Object.defineProperty(button2, 'offsetParent', { value: {}, configurable: true });
        toolbarElement.appendChild(button1);
        toolbarElement.appendChild(button2);

        jest.runOnlyPendingTimers();

        // Dispatch focusin from button1 - activateRovingTabindex(button1) sets tabindex
        const focusInEvent = new FocusEvent('focusin', { bubbles: true });
        button1.dispatchEvent(focusInEvent);

        expect(button1.getAttribute('tabindex')).toBe('0');
        expect(button2.getAttribute('tabindex')).toBe('-1');
      });
    });
  });

  describe('Sanitization', () => {
    test('getEditorHTML should sanitize HTML content by default', async () => {
      const page = await getPage({
        label: 'label',
        identifier: 'identifier',
        value: '<p>Test</p><script>alert("xss")</script>',
      });
      const { element } = await waitForEditor(page);

      const result = await element.getEditorHTML();

      // Script tags should be removed
      expect(result).not.toContain('<script>');
      expect(result).toContain('<p>Test</p>');
    });

    test('getEditorHTML should remove disallowed tags when sanitizerDisallowTags is set', async () => {
      const page = await getPage({
        label: 'label',
        identifier: 'identifier',
        sanitizerDisallowTags: 'img,script',
        value: '<p>Test</p><img src="test.jpg"><script>alert("xss")</script>',
      });
      const { element } = await waitForEditor(page);

      const result = await element.getEditorHTML();

      // img and script tags should be removed
      expect(result).not.toContain('<img');
      expect(result).not.toContain('<script>');
      expect(result).toContain('<p>Test</p>');
    });

    test('getEditorHTML should remove disallowed attributes when sanitizerDisallowAttributes is set', async () => {
      const page = await getPage({
        label: 'label',
        identifier: 'identifier',
        sanitizerDisallowAttributes: '*:style;a:target',
        value: '<p style="color: red">Test</p><a href="#" target="_blank">Link</a>',
      });
      const { element } = await waitForEditor(page);

      const result = await element.getEditorHTML();

      // style attribute should be removed from all tags
      expect(result).not.toContain('style="color: red"');
      // target attribute should be removed from <a> tags
      expect(result).not.toContain('target="_blank"');
      // But href should remain
      expect(result).toContain('href="#');
      expect(result).toContain('<p>Test</p>');
    });

    test('getEditorHTML should handle both disallowTags and disallowAttributes together', async () => {
      const page = await getPage({
        label: 'label',
        identifier: 'identifier',
        sanitizerDisallowTags: 'img',
        sanitizerDisallowAttributes: '*:style',
        value: '<p style="color: red">Test</p><img src="test.jpg" style="width: 100px">',
      });
      const { element } = await waitForEditor(page);

      const result = await element.getEditorHTML();

      // img tag should be removed
      expect(result).not.toContain('<img');
      // style attributes should be removed
      expect(result).not.toContain('style=');
      expect(result).toContain('<p>Test</p>');
    });

    test('getEditorHTML should throw error when sanitizerDisallowTags is empty string', async () => {
      await expect(
        getPage({
          label: 'label',
          identifier: 'identifier',
          sanitizerDisallowTags: '',
          value: '<p>Test</p><img src="test.jpg">',
        }),
      ).rejects.toThrow('prop "sanitizerDisallowTags" must be a string');
    });

    test('getEditorHTML should throw error when sanitizerDisallowAttributes is empty string', async () => {
      await expect(
        getPage({
          label: 'label',
          identifier: 'identifier',
          sanitizerDisallowAttributes: '',
          value: '<p style="color: red">Test</p>',
        }),
      ).rejects.toThrow('prop "sanitizerDisallowAttributes" must be a string');
    });

    test('value-change event should emit sanitized HTML', async () => {
      const page = await getPage({
        label: 'label',
        identifier: 'identifier',
        sanitizerDisallowTags: 'script',
      });
      const { element, editor } = await waitForEditor(page);

      const valueChangeSpy = jest.fn();
      element.addEventListener('value-change', valueChangeSpy);

      // Simulate editor content change with unsafe HTML
      editor.value = '<p>Test</p><script>alert("xss")</script>';
      editor.events.fire('change');

      await page.waitForChanges();
      jest.runOnlyPendingTimers();

      // The emitted value should be sanitized
      expect(valueChangeSpy).toHaveBeenCalled();
      const emittedValue = valueChangeSpy.mock.calls[0][0].detail;
      expect(emittedValue).not.toContain('<script>');
      expect(emittedValue).toContain('<p>Test</p>');
    });

    test('Initial value should be sanitized when sanitizerDisallowTags is set', async () => {
      const page = await getPage({
        label: 'label',
        identifier: 'identifier',
        sanitizerDisallowTags: 'img',
        value: '<p>Test</p><img src="test.jpg">',
      });
      const { element } = await waitForEditor(page);

      // The initial value should be sanitized
      const result = await element.getEditorHTML();
      expect(result).not.toContain('<img');
      expect(result).toContain('<p>Test</p>');
    });

    test('getEditorHTML should handle sanitizerDisallowAttributes with spaces and edge cases', async () => {
      const page = await getPage({
        label: 'label',
        identifier: 'identifier',
        sanitizerDisallowAttributes: ' * : style ; a : target , href ',
        value: '<p style="color: red">Test</p><a href="#" target="_blank">Link</a>',
      });
      const { element } = await waitForEditor(page);

      const result = await element.getEditorHTML();

      // Should handle spaces correctly
      expect(result).not.toContain('style=');
      expect(result).not.toContain('target=');
      expect(result).not.toContain('href=');
      expect(result).toContain('<p>Test</p>');
    });

    test('getEditorHTML should handle sanitizerDisallowAttributes with empty parts between semicolons', async () => {
      const page = await getPage({
        label: 'label',
        identifier: 'identifier',
        sanitizerDisallowAttributes: '*:style;;a:target; ;img:alt',
        value: '<p style="color: red">Test</p><a href="#" target="_blank">Link</a><img src="test.jpg" alt="test">',
      });
      const { element } = await waitForEditor(page);

      const result = await element.getEditorHTML();

      // Empty parts between semicolons should be ignored
      expect(result).not.toContain('style=');
      expect(result).not.toContain('target=');
      expect(result).not.toContain('alt=');
      expect(result).toContain('<p>Test</p>');
    });

    test('getEditorHTML should ignore invalid sanitizerDisallowAttributes format', async () => {
      const page = await getPage({
        label: 'label',
        identifier: 'identifier',
        sanitizerDisallowAttributes: 'invalid-format;:;another-invalid',
        value: '<p style="color: red">Test</p>',
      });
      const { element } = await waitForEditor(page);

      const result = await element.getEditorHTML();

      // Invalid format should be ignored, so style should remain
      expect(result).toContain('style=');
      expect(result).toContain('<p');
    });

    test('getEditorHTML should reinitialize sanitizer when sanitizerDisallowTags changes after initialization', async () => {
      const page = await getPage({
        label: 'label',
        identifier: 'identifier',
        value: '<p>Test</p><img src="test.jpg">',
      });
      const { element } = await waitForEditor(page);

      // Initially, img should be present
      let result = await element.getEditorHTML();
      expect(result).toContain('<img');

      // Change sanitizerDisallowTags prop after initialization
      element.sanitizerDisallowTags = 'img';
      await page.waitForChanges();
      jest.runOnlyPendingTimers();

      // Now img should be removed
      result = await element.getEditorHTML();
      expect(result).not.toContain('<img');
      expect(result).toContain('<p>Test</p>');
    });

    test('getEditorHTML should reinitialize sanitizer when sanitizerDisallowAttributes changes after initialization', async () => {
      const page = await getPage({
        label: 'label',
        identifier: 'identifier',
        value: '<p style="color: red">Test</p>',
      });
      const { element } = await waitForEditor(page);

      // Initially, style should be present
      let result = await element.getEditorHTML();
      expect(result).toContain('style=');

      // Change sanitizerDisallowAttributes prop after initialization
      element.sanitizerDisallowAttributes = '*:style';
      await page.waitForChanges();
      jest.runOnlyPendingTimers();

      // Now style should be removed
      result = await element.getEditorHTML();
      expect(result).not.toContain('style=');
      expect(result).toContain('<p>Test</p>');
    });
  });
});
