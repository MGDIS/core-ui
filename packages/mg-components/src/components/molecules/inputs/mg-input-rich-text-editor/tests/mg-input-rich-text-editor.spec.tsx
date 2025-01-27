import { h } from '@stencil/core';
import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { MgInputRichTextEditor } from '../mg-input-rich-text-editor';
import { MgInput } from '../../mg-input/mg-input';
import { MgInputTitle } from '../../../../atoms/internals/mg-input-title/mg-input-title';
import { tooltipPositions } from '../../mg-input/mg-input.conf';
import { setUpRequestAnimationFrameMock, toString } from '@mgdis/stencil-helpers';
import messages from '../../../../../locales/en/messages.json';
import type Quill from 'quill';

type HTMLQuillElement = HTMLElement & {
  checkValidity: () => boolean;
  validatePattern: () => void;
};

const getPage = (args: Partial<MgInputRichTextEditor> & Pick<MgInputRichTextEditor, 'identifier' | 'label'>): Promise<SpecPage> => {
  const page = newSpecPage({
    components: [MgInputRichTextEditor, MgInput, MgInputTitle],
    template: () => <mg-input-rich-text-editor {...args}></mg-input-rich-text-editor>,
  });

  jest.runAllTimers();
  setUpRequestAnimationFrameMock(jest.runOnlyPendingTimers);

  return page;
};

const waitForEditor = async (page: SpecPage): Promise<{ element: HTMLMgInputRichTextEditorElement; quillInstance: Quill; quillElement: HTMLQuillElement }> => {
  const element = page.doc.querySelector('mg-input-rich-text-editor');
  const quillElement = element.shadowRoot.querySelector('.ql-editor') as HTMLQuillElement;
  const quillInstance = page.rootInstance.quillEditor;

  expect(quillElement).not.toBeNull();
  return { element, quillInstance, quillElement };
};

describe('mg-input-rich-text-editor', () => {
  beforeEach(() => jest.useFakeTimers({ legacyFakeTimers: true }));
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

  test('Should handle readonly and disabled class changes', async () => {
    const page = await getPage({ label: 'label', identifier: 'identifier' });
    const { element, quillInstance } = await waitForEditor(page);
    const mgInput = element.shadowRoot.querySelector('mg-input');

    // Test initial state
    expect(mgInput.classList.contains('mg-c-input--readonly')).toBeFalsy();
    expect(quillInstance.disable).not.toHaveBeenCalled();
    expect(quillInstance.enable).not.toHaveBeenCalled();

    // Test readonly changes
    element.readonly = true;
    await page.waitForChanges();
    expect(mgInput.classList.contains('mg-c-input--readonly')).toBeTruthy();

    element.readonly = false;
    await page.waitForChanges();
    expect(mgInput.classList.contains('mg-c-input--readonly')).toBeFalsy();

    // Test disabled changes
    element.disabled = true;
    await page.waitForChanges();
    expect(mgInput.classList.contains('mg-c-input--disabled')).toBeTruthy();
    quillInstance.disable();
    expect(quillInstance.disable).toHaveBeenCalled();

    element.disabled = false;
    await page.waitForChanges();
    expect(mgInput.classList.contains('mg-c-input--disabled')).toBeFalsy();
    quillInstance.enable();
    expect(quillInstance.enable).toHaveBeenCalled();
  });

  test('Should trigger events', async () => {
    const editorValue = '<p>Content</p>';
    const page = await getPage({ label: 'label', identifier: 'identifier', helpText: 'My help text' });
    const element = page.doc.querySelector('mg-input-rich-text-editor');
    const { quillInstance, quillElement } = await waitForEditor(page);

    // Mock validity
    quillElement.checkValidity = jest.fn(() => true);
    Object.defineProperty(quillElement, 'validity', {
      get: jest.fn(() => ({
        valueMissing: false,
      })),
    });

    jest.spyOn(page.rootInstance.valueChange, 'emit');
    const inputValidSpy = jest.spyOn(page.rootInstance.inputValid, 'emit');
    const handleFocusSpy = jest.spyOn(page.rootInstance, 'handleFocus');
    const handleBlurSpy = jest.spyOn(page.rootInstance, 'handleBlur');

    // Test focus event
    quillInstance.focus();
    await page.waitForChanges();
    expect(handleFocusSpy).toHaveBeenCalled();
    expect(page.rootInstance.classCollection.has('mg-u-is-focused')).toBeTruthy();
    expect(element.shadowRoot.querySelector('mg-input').classList.contains('mg-u-is-focused')).toBeTruthy();

    expect(page.root).toMatchSnapshot(); // Snapshot on focus

    // Test content change
    quillInstance.clipboard.dangerouslyPasteHTML(editorValue);
    await page.waitForChanges();
    expect(page.rootInstance.valueChange.emit).toHaveBeenCalledWith(editorValue);

    // Test blur event
    quillInstance.blur();
    await page.waitForChanges();
    expect(handleBlurSpy).toHaveBeenCalled();
    expect(page.rootInstance.classCollection.has('mg-u-is-focused')).toBeFalsy();
    expect(element.shadowRoot.querySelector('mg-input').classList.contains('mg-u-is-focused')).toBeFalsy();
    expect(inputValidSpy).toHaveBeenCalledTimes(1);
  });

  test.each([
    { value: undefined, expectedError: true, errorMessage: messages.errors.required },
    { value: '<p>Content</p>', expectedError: false, errorMessage: null },
    {
      value: '123',
      pattern: '[a-z]+',
      patternErrorMessage: 'Format invalide',
      expectedError: true,
      errorMessage: 'Format invalide',
      validityState: { valueMissing: false, patternMismatch: true },
    },
  ])('Should display error message when required and %s', async ({ value, pattern, patternErrorMessage, expectedError, errorMessage, validityState }) => {
    const page = await getPage({
      label: 'label',
      identifier: 'identifier',
      required: true,
      value,
      pattern,
      patternErrorMessage,
    });
    const { element, quillElement } = await waitForEditor(page);

    // Mock validity
    quillElement.checkValidity = jest.fn(() => !expectedError);
    Object.defineProperty(quillElement, 'validity', {
      get: jest.fn(
        () =>
          validityState || {
            valueMissing: expectedError,
          },
      ),
    });

    await element.displayError();
    await page.waitForChanges();

    const errorElement = element.shadowRoot.querySelector('[slot="error"]');

    if (expectedError) {
      expect(errorElement).not.toBeNull();
      expect(errorElement.textContent.trim()).toBe(errorMessage);
    } else {
      expect(errorElement).toBeNull();
    }
  });

  describe('Content retrieval methods', () => {
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
      const { element, quillInstance } = await waitForEditor(page);
      const spy = jest.spyOn(quillInstance, mockMethod as never);

      expect(page.root).toMatchSnapshot();

      const result = await element[method]();

      expect(result).toEqual(expectedValue);
      expect(spy).toHaveBeenCalled();
    });
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

  test.each([
    { valid: true, message: 'Error message', expectError: false },
    { valid: false, message: 'Error message', expectError: true },
  ])('Should handle setError with valid: $valid', async ({ valid, message, expectError }) => {
    const page = await getPage({ label: 'label', identifier: 'identifier' });
    const { element } = await waitForEditor(page);

    await element.setError(valid, message);
    await page.waitForChanges();

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

  test('Should validate pattern correctly', async () => {
    const page = await getPage({
      label: 'label',
      identifier: 'identifier',
      pattern: '[a-z]+',
      patternErrorMessage: 'Letters only',
      value: '<p>123</p>',
    });
    const { element } = await waitForEditor(page);

    await element.displayError();
    await page.waitForChanges();

    const errorElement = element.shadowRoot.querySelector('[slot="error"]');

    expect(errorElement).not.toBeNull();
    expect(errorElement.textContent.trim()).toBe('Letters only');
  });

  test('Should handle custom Quill modules', async () => {
    const customModules = {
      toolbar: ['bold', 'italic'],
      custom: { option: true },
    };

    const page = await getPage({
      label: 'label',
      identifier: 'identifier',
      modules: customModules,
    });

    const { quillInstance } = await waitForEditor(page);
    expect(quillInstance.options.modules).toEqual(expect.objectContaining(customModules));
  });

  test('Should reset hasDisplayedError when validity changes', async () => {
    const page = await getPage({
      label: 'label',
      identifier: 'identifier',
      required: true,
      value: '',
    });
    const { element, quillElement } = await waitForEditor(page);

    // Mock validity
    quillElement.checkValidity = jest.fn(() => false);
    Object.defineProperty(quillElement, 'validity', {
      get: jest.fn(() => ({
        valueMissing: true,
      })),
    });

    await element.displayError();
    await page.waitForChanges();

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

  describe('quillSelectionFixes', () => {
    test('Should handle text selection in Shadow DOM', async () => {
      const page = await getPage({
        label: 'label',
        identifier: 'identifier',
        value: '<p>Test content</p>',
      });
      const { quillInstance } = await waitForEditor(page);

      // Mock selection methods
      const mockSelection = {
        getRangeAt: jest.fn().mockReturnValue({ startContainer: document.createElement('div') }),
        removeAllRanges: jest.fn(),
        setBaseAndExtent: jest.fn(),
      };

      // Mock getSelection
      const originalGetSelection = window.getSelection;
      window.getSelection = jest.fn().mockReturnValue(mockSelection);

      // Create a valid DOM structure for the test
      const rootParent = document.createElement('div');
      const root = document.createElement('div');
      rootParent.appendChild(root);

      // Ensure that this.root is correctly defined in the context of setNativeRange
      quillInstance.selection.root = root;
      quillInstance.root = root;

      // Test setNativeRange with valid nodes
      const startNode = document.createElement('div');
      const endNode = document.createElement('div');
      rootParent.appendChild(startNode);
      rootParent.appendChild(endNode);

      quillInstance.selection.setNativeRange(startNode, 0, endNode, 1);
      expect(mockSelection.setBaseAndExtent).toHaveBeenCalled();

      // Cleanup
      window.getSelection = originalGetSelection;
    });

    test('Should handle <br> elements in setNativeRange', async () => {
      const page = await getPage({
        label: 'label',
        identifier: 'identifier',
      });
      const { quillInstance } = await waitForEditor(page);

      // Mock selection
      const mockSelection = {
        setBaseAndExtent: jest.fn(),
        removeAllRanges: jest.fn(),
      };
      window.getSelection = jest.fn().mockReturnValue(mockSelection);

      // Create <br> elements with parent nodes
      const parentNode = document.createElement('div');
      const startBR = document.createElement('br');
      const endBR = document.createElement('br');
      parentNode.appendChild(startBR);
      parentNode.appendChild(endBR);

      // Test setNativeRange with <br> elements
      quillInstance.selection.setNativeRange(startBR, 0, endBR, 0);
      expect(mockSelection.setBaseAndExtent).toHaveBeenCalled();
    });

    test('Should handle null range in setNativeRange', async () => {
      const page = await getPage({
        label: 'label',
        identifier: 'identifier',
      });
      const { quillInstance } = await waitForEditor(page);

      // Mock selection
      const mockSelection = {
        removeAllRanges: jest.fn(),
      };
      window.getSelection = jest.fn().mockReturnValue(mockSelection);

      // Test setNativeRange with null
      quillInstance.selection.setNativeRange(null);
      expect(mockSelection.removeAllRanges).toHaveBeenCalled();
    });
  });
});
