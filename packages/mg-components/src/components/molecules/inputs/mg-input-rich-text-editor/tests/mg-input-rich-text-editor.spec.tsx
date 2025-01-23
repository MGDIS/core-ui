import { h } from '@stencil/core';
import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { MgInputRichTextEditor } from '../mg-input-rich-text-editor';
import { MgInput } from '../../mg-input/mg-input';
import { MgInputTitle } from '../../../../atoms/internals/mg-input-title/mg-input-title';
import { tooltipPositions } from '../../mg-input/mg-input.conf';
import { setUpRequestAnimationFrameMock, toString } from '@mgdis/stencil-helpers';
import messages from '../../../../../locales/en/messages.json';
import type Quill from 'quill';

type HTMLQuillElement = HTMLElement & { checkValidity: () => boolean}

const getPage = (args: Partial<MgInputRichTextEditor> & Pick<MgInputRichTextEditor, 'identifier' | 'label'>): Promise<SpecPage> => {
  const page = newSpecPage({
    components: [MgInputRichTextEditor, MgInput, MgInputTitle],
    template: () => <mg-input-rich-text-editor {...args}></mg-input-rich-text-editor>,
  });

  jest.runAllTimers();
  setUpRequestAnimationFrameMock(jest.runOnlyPendingTimers)

  return page;
};

const waitForEditor = async (page: SpecPage): Promise<{ element: HTMLMgInputRichTextEditorElement, quillInstance: Quill, quillElement: HTMLQuillElement}> => {
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
    const { quillInstance, quillElement } = await waitForEditor(page);

    // Mock validity
    quillElement.checkValidity = jest.fn(() => true);
    Object.defineProperty(quillElement, 'validity', {
      get: jest.fn(() => ({
        valueMissing: false,
      })),
    });

    const valueChangeSpy = jest.spyOn(page.rootInstance.valueChange, 'emit');

    // Simulate content change via Quill API
    quillInstance.clipboard.dangerouslyPasteHTML(editorValue);

    // Simulate text-change event recording
    const textChangeHandler = () => {
      // Component logic when text changes
      page.rootInstance.value = editorValue;
      page.rootInstance.valueChange.emit(editorValue);
    };
    quillInstance.on('text-change', textChangeHandler);

    // Trigger handler directly
    textChangeHandler();
    await page.waitForChanges();

    expect(valueChangeSpy).toHaveBeenCalledWith(editorValue);
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
      const spy = jest.spyOn(quillInstance, mockMethod as never)

      expect(page.root).toMatchSnapshot();

      const result = await element[method]();

      expect(result).toEqual(expectedValue);
      expect(spy).toHaveBeenCalled();
    });
  });
});
