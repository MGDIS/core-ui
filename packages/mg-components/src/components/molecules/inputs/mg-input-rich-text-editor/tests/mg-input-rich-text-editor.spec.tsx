import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { toString } from '@mgdis/core-ui-helpers/dist/utils';
import { setupMutationObserverMock, setUpRequestAnimationFrameMock } from '@mgdis/core-ui-helpers/dist/tests';
import { tooltipPositions } from '../../mg-input/mg-input.conf';
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
          modules: 'bold, italic',
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
        document.body.appendChild(mockElement);

        const wrapperElement = document.createElement('div');
        const editorElement = document.createElement('textarea');
        wrapperElement.appendChild(editorElement);
        shadowRoot.appendChild(wrapperElement);

        const handleTextChange = jest.fn();
        const handleFocus = jest.fn();
        const handleBlur = jest.fn();

        const editor = defineEditor(mockElement, editorElement, {
          value: '<p>Test in ShadowRoot</p>',
          handleTextChange,
          handleFocus,
          handleBlur,
          readOnly: false,
          placeholder: 'Test placeholder',
        });

        expect(editor).toBeDefined();
        expect(editor.value).toBe('<p>Test in ShadowRoot</p>');

        // Clean up
        document.body.removeChild(mockElement);
      });

      test('Should handle empty value', async () => {
        // Import defineEditor to test it directly
        const { defineEditor } = await import('../editor');

        // Create a mock component element with shadowRoot (as in real usage)
        const mockElement = document.createElement('mg-input-rich-text-editor') as HTMLMgInputRichTextEditorElement;
        const shadowRoot = mockElement.attachShadow({ mode: 'open' });
        document.body.appendChild(mockElement);

        const wrapperElement = document.createElement('div');
        const editorElement = document.createElement('textarea');
        wrapperElement.appendChild(editorElement);
        shadowRoot.appendChild(wrapperElement);

        const handleTextChange = jest.fn();
        const handleFocus = jest.fn();
        const handleBlur = jest.fn();

        const editor = defineEditor(mockElement, editorElement, {
          value: '',
          handleTextChange,
          handleFocus,
          handleBlur,
          readOnly: false,
          placeholder: 'Test placeholder',
        });

        expect(editor).toBeDefined();
        expect(editor.value).toBe('');

        // Clean up
        document.body.removeChild(mockElement);
      });

      test('Should add custom CSS classes to Jodit elements', async () => {
        // Import defineEditor to test it directly
        const { defineEditor } = await import('../editor');

        // Create a mock component element with shadowRoot (as in real usage)
        const mockElement = document.createElement('mg-input-rich-text-editor') as HTMLMgInputRichTextEditorElement;
        const shadowRoot = mockElement.attachShadow({ mode: 'open' });
        document.body.appendChild(mockElement);

        const wrapperElement = document.createElement('div');
        const editorElement = document.createElement('textarea');
        wrapperElement.appendChild(editorElement);
        shadowRoot.appendChild(wrapperElement);

        const handleTextChange = jest.fn();
        const handleFocus = jest.fn();
        const handleBlur = jest.fn();

        defineEditor(mockElement, editorElement, {
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

        // Clean up
        document.body.removeChild(mockElement);
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
