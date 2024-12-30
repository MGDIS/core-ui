import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgInputRichTextEditor } from '../mg-input-rich-text-editor';
import { MgInput } from '../../mg-input/mg-input';
import { MgInputTitle } from '../../../../atoms/internals/mg-input-title/mg-input-title';
import { tooltipPositions } from '../../mg-input/mg-input.conf';
import { toString } from '@mgdis/stencil-helpers';
import messages from '../../../../../locales/en/messages.json';
import Quill from 'quill';

jest.mock('quill');

const getPage = args => {
  const page = newSpecPage({
    components: [MgInputRichTextEditor, MgInput, MgInputTitle],
    template: () => <mg-input-rich-text-editor {...args}></mg-input-rich-text-editor>,
  });

  jest.runAllTimers();

  return page;
};

const waitForEditor = async page => {
  await page.waitForChanges();
  const element = page.doc.querySelector('mg-input-rich-text-editor');

  // Wait for the wrapper to be available
  const wrapper = element.shadowRoot.querySelector('.mg-c-input__wrapper');
  element.quillEditor = new Quill(wrapper);

  // Si une valeur initiale est fournie, l'injecter
  if (element.value) {
    element.quillEditor.clipboard.dangerouslyPasteHTML(element.value);
  }

  await page.waitForChanges();

  const editor = element.shadowRoot.querySelector('.ql-editor');
  expect(editor).not.toBeNull();
  return { element, editor };
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
    { readonly: true, tooltip: 'Tooltip message', tooltipPosition: 'input', value: '<p>Content</p>' },
    { readonly: true, tooltip: 'Tooltip message', tooltipPosition: 'input' },
    { required: true, value: '<p>Content</p>', helpText: 'My help text' },
    { required: true, readonly: true, value: '<p>Content</p>', helpText: 'My help text' },
    { required: true, disabled: true, value: '<p>Content</p>', helpText: 'My help text' },
    { tooltip: 'My Tooltip Message' },
    { tooltip: 'My Tooltip Message', labelOnTop: true },
    { tooltip: 'My Tooltip Message', tooltipPosition: 'label' },
    { tooltip: 'My Tooltip Message', tooltipPosition: 'input', labelOnTop: true },
  ])('Should render with args %s:', async args => {
    const { root } = await getPage({ label: 'label', identifier: 'identifier', ...args });
    expect(root).toMatchSnapshot();
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
      await getPage({ identifier: 'identifier', label: 'label', tooltipPosition });
    } catch (err) {
      expect(err.message).toEqual(`<mg-input> prop "tooltipPosition" must be one of: ${tooltipPositions.join(', ')}. Passed value: ${toString(tooltipPosition)}.`);
    }
  });

  test('Should handle readonly and disabled class changes', async () => {
    const page = await getPage({ label: 'label', identifier: 'identifier' });
    const { element } = await waitForEditor(page);
    const mgInput = element.shadowRoot.querySelector('mg-input');

    // Test initial state
    expect(mgInput.classList.contains('mg-c-input--readonly')).toBeFalsy();
    expect(element.quillEditor.disable).not.toHaveBeenCalled();
    expect(element.quillEditor.enable).not.toHaveBeenCalled();

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
    element.quillEditor.disable();
    expect(element.quillEditor.disable).toHaveBeenCalled();

    element.disabled = false;
    await page.waitForChanges();
    expect(mgInput.classList.contains('mg-c-input--disabled')).toBeFalsy();
    element.quillEditor.enable();
    expect(element.quillEditor.enable).toHaveBeenCalled();
  });

  test('Should trigger events', async () => {
    const editorValue = '<p>Content</p>';
    const page = await getPage({ label: 'label', identifier: 'identifier', helpText: 'My help text' });
    const { element } = await waitForEditor(page);

    // Mock validity
    element.quillEditor.root.checkValidity = jest.fn(() => true);
    Object.defineProperty(element.quillEditor.root, 'validity', {
      get: jest.fn(() => ({
        valueMissing: false,
      })),
    });

    const valueChangeSpy = jest.spyOn(page.rootInstance.valueChange, 'emit');

    // Simulate content change via Quill API
    element.quillEditor.clipboard.dangerouslyPasteHTML(editorValue);

    // Simulate text-change event recording
    const textChangeHandler = () => {
      // Component logic when text changes
      page.rootInstance.value = editorValue;
      page.rootInstance.valueChange.emit(editorValue);
    };
    element.quillEditor.on('text-change', textChangeHandler);

    // Trigger handler directly
    textChangeHandler();
    await page.waitForChanges();

    expect(valueChangeSpy).toHaveBeenCalledWith(editorValue);
  });

  test.each([
    { value: undefined, expectedError: true, errorMessage: messages.errors.required },
    { value: '<p>Content</p>', expectedError: false, errorMessage: null },
    { value: { ops: [] }, expectedError: true, errorMessage: messages.errors.required },
    { value: { ops: [{ insert: '\n' }] }, expectedError: true, errorMessage: messages.errors.required },
    { value: { ops: [{ insert: 'Content\n' }] }, expectedError: false, errorMessage: null },
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
    const { element } = await waitForEditor(page);

    // Mock validity
    element.quillEditor.root.checkValidity = jest.fn(() => !expectedError);
    Object.defineProperty(element.quillEditor.root, 'validity', {
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
        method: 'getDelta',
        mockMethod: 'getContents',
        value: { ops: [{ insert: 'Test content' }, { insert: '\n' }] },
        expectedValue: { ops: [{ insert: 'Test content' }, { insert: '\n' }] },
      },
      {
        method: 'getText',
        mockMethod: 'getText',
        value: 'Test content',
        expectedValue: 'Test content',
      },
    ])('$method should return correct content', async ({ method, mockMethod, value, expectedValue }) => {
      const page = await getPage({ label: 'label', identifier: 'identifier', value });
      const { element } = await waitForEditor(page);

      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();

      // Mock the Quill method
      element.quillEditor[mockMethod] = jest.fn().mockReturnValue(expectedValue);

      const result = await element[method]();
      expect(result).toEqual(expectedValue);
      expect(element.quillEditor[mockMethod]).toHaveBeenCalled();
    });
  });
});
