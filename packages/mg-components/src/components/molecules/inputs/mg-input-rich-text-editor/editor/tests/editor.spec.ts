// Mock Jodit module, plugins, and getComputedStyle - MUST be before any imports
import { setupJoditMock, getJoditPluginPaths, setupGetComputedStyleMock } from './jodit.mock';
jest.mock('jodit', () => setupJoditMock());
getJoditPluginPaths().forEach(pluginPath => {
  jest.mock(pluginPath, () => ({}));
});
setupGetComputedStyleMock();

import { setupMutationObserverMock } from '@mgdis/core-ui-helpers/dist/tests';
import { DEFAULT_MODULES } from '../../mg-input-rich-text-editor.conf';

describe('editor', () => {
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

  describe('rowsToEditorHeight', () => {
    test('Should throw error when --mg-b-font-size is not defined', async () => {
      const { rowsToEditorHeight } = await import('..');

      const mockedGetComputedStyle = globalThis.getComputedStyle;
      globalThis.getComputedStyle = () =>
        ({
          fontSize: '16px',
          getPropertyValue: (name: string) => {
            if (name === '--mg-b-font-size') return '';
            if (name === '--mg-b-line-height') return '1.5';
            return '';
          },
        }) as unknown as CSSStyleDeclaration;

      expect(() => rowsToEditorHeight(5)).toThrow('mg-input-rich-text-editor: CSS variable --mg-b-font-size is not defined.');

      globalThis.getComputedStyle = mockedGetComputedStyle;
    });

    test('Should throw error when --mg-b-line-height is not defined', async () => {
      const { rowsToEditorHeight } = await import('..');

      const mockedGetComputedStyle = globalThis.getComputedStyle;
      globalThis.getComputedStyle = () =>
        ({
          fontSize: '16px',
          getPropertyValue: (name: string) => {
            if (name === '--mg-b-font-size') return '1rem';
            if (name === '--mg-b-line-height') return '';
            return '';
          },
        }) as unknown as CSSStyleDeclaration;

      expect(() => rowsToEditorHeight(5)).toThrow('mg-input-rich-text-editor: CSS variable --mg-b-line-height is not defined.');

      globalThis.getComputedStyle = mockedGetComputedStyle;
    });
  });

  describe('defineEditor', () => {
    test('Should handle element in ShadowRoot', async () => {
      // Import defineEditor to test it directly
      const { defineEditor } = await import('..');

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
      const { defineEditor } = await import('..');

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
      const { defineEditor } = await import('..');

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

      const { defineEditor } = await import('..');

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
      const { defineEditor } = await import('..');

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

      jest.runOnlyPendingTimers();

      // Spy on .focus() to verify navigation (JSDOM detached elements don't update document.activeElement)
      const focusSpy1 = jest.spyOn(button1, 'focus');
      const focusSpy2 = jest.spyOn(button2, 'focus');
      const focusSpy3 = jest.spyOn(button3, 'focus');

      // Test ArrowRight navigation: button1 → button2
      const arrowRightEvent = new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, cancelable: true });
      Object.defineProperty(arrowRightEvent, 'target', { value: button1, configurable: true });
      button1.dispatchEvent(arrowRightEvent);
      expect(focusSpy2).toHaveBeenCalledTimes(1);

      // Test ArrowLeft navigation: button2 → button1
      const arrowLeftEvent = new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true, cancelable: true });
      Object.defineProperty(arrowLeftEvent, 'target', { value: button2, configurable: true });
      button2.dispatchEvent(arrowLeftEvent);
      expect(focusSpy1).toHaveBeenCalledTimes(1);

      // Test Home key: button3 → button1
      const homeEvent = new KeyboardEvent('keydown', { key: 'Home', bubbles: true, cancelable: true });
      Object.defineProperty(homeEvent, 'target', { value: button3, configurable: true });
      button3.dispatchEvent(homeEvent);
      expect(focusSpy1).toHaveBeenCalledTimes(2);

      // Test End key: button1 → button3
      const endEvent = new KeyboardEvent('keydown', { key: 'End', bubbles: true, cancelable: true });
      Object.defineProperty(endEvent, 'target', { value: button1, configurable: true });
      button1.dispatchEvent(endEvent);
      expect(focusSpy3).toHaveBeenCalledTimes(1);

      // Test ArrowLeft from first button (wrap to last): button1 → button3
      const arrowLeftFromFirst = new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true, cancelable: true });
      Object.defineProperty(arrowLeftFromFirst, 'target', { value: button1, configurable: true });
      button1.dispatchEvent(arrowLeftFromFirst);
      expect(focusSpy3).toHaveBeenCalledTimes(2);

      // Test ArrowRight from last button (wrap to first): button3 → button1
      const arrowRightFromLast = new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, cancelable: true });
      Object.defineProperty(arrowRightFromLast, 'target', { value: button3, configurable: true });
      button3.dispatchEvent(arrowRightFromLast);
      expect(focusSpy1).toHaveBeenCalledTimes(3);
    });

    test('Should handle Shift+Tab from wysiwyg to toolbar', async () => {
      const { defineEditor } = await import('..');

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

      jest.runOnlyPendingTimers();

      // Spy on .focus() to verify focus is moved to first toolbar button
      const focusSpy = jest.spyOn(button1, 'focus');

      // Simulate Shift+Tab from wysiwyg
      const shiftTabEvent = new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, bubbles: true, cancelable: true });
      Object.defineProperty(shiftTabEvent, 'target', { value: wysiwygElement, configurable: true });
      wysiwygElement.dispatchEvent(shiftTabEvent);

      // First toolbar button should receive focus
      expect(focusSpy).toHaveBeenCalledTimes(1);
    });

    test('Should handle title element click to focus editor', async () => {
      const { defineEditor } = await import('..');

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
      const { defineEditor } = await import('..');

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
      const { defineEditor } = await import('..');

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

      const focusSpy = jest.spyOn(button1, 'focus');

      // Dispatch keydown from toolbar (div) so target is toolbar - handler returns early
      const keydownEvent = new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, cancelable: true });
      toolbarElement.dispatchEvent(keydownEvent);

      // Handler returns early (target is not a button), no focus moved
      expect(focusSpy).not.toHaveBeenCalled();
    });

    test('Should handle other keys in toolbar without preventing default', async () => {
      const { defineEditor } = await import('..');

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

    test('Should not intercept keydown when not Shift+Tab on wysiwyg', async () => {
      const { defineEditor } = await import('..');

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

      // Spy on .focus() to verify no focus is moved
      const focusSpy = jest.spyOn(button1, 'focus');

      // Dispatch Tab without shift - handler returns early
      const tabOnlyEvent = new KeyboardEvent('keydown', { key: 'Tab', shiftKey: false, bubbles: true, cancelable: true });
      wysiwygElement.dispatchEvent(tabOnlyEvent);

      // First button should not receive focus (handler returns early for non Shift+Tab)
      expect(focusSpy).not.toHaveBeenCalled();
    });

    test('Should handle Shift+Tab on wysiwyg when toolbar is removed', async () => {
      const { defineEditor } = await import('..');

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

    test('Should not navigate when keydown target is button in popup', async () => {
      const { defineEditor } = await import('..');

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

      // button1 is focusable; button2 is inside popup so getFocusableToolbarButtons excludes it
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

      const focusSpy = jest.spyOn(button1, 'focus');

      // Dispatch keydown from button2 (in popup) - target is not in focusable buttons, handler returns early
      const keydownEvent = new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, cancelable: true });
      button2.dispatchEvent(keydownEvent);

      // Handler returns early, no focus moved
      expect(focusSpy).not.toHaveBeenCalled();
    });

    test('Should not prevent keydown when getToolbarButtons returns empty', async () => {
      const { defineEditor } = await import('..');

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
      const preventDefaultSpy = jest.spyOn(keydownEvent, 'preventDefault');
      popupButton.dispatchEvent(keydownEvent);

      // Handler returns early (no focusable buttons outside popup), no preventDefault called
      expect(preventDefaultSpy).not.toHaveBeenCalled();
    });

    test('Should complete when wysiwyg element is removed after init', async () => {
      const { defineEditor } = await import('..');

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
      const { defineEditor } = await import('..');

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
      const { defineEditor } = await import('..');

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

    test('Should set aria-hidden on toolbar SVG icons for screen reader accessibility', async () => {
      const callbacks: Array<(mutations: MutationRecord[], observer: MutationObserver) => void> = [];
      const mockObserver = { disconnect: () => null, observe: () => null, takeRecords: () => [] } as MutationObserver;

      setupMutationObserverMock({
        observe: function () {
          callbacks.push(this.cb);
        },
        disconnect: () => null,
        takeRecords: () => [],
      });

      const { defineEditor } = await import('..');

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

      // Create toolbar buttons with SVG icons (simulating Jodit's toolbar structure)
      const button1 = document.createElement('button');
      const svg1 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      button1.appendChild(svg1);

      const button2 = document.createElement('button');
      const svg2 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      button2.appendChild(svg2);

      toolbarElement.appendChild(button1);
      toolbarElement.appendChild(button2);

      // SVGs should not have aria-hidden yet (added dynamically after init)
      expect(svg1.getAttribute('aria-hidden')).toBeNull();
      expect(svg2.getAttribute('aria-hidden')).toBeNull();

      // Trigger MutationObserver callback (simulates toolbar content change)
      const mutation = { type: 'childList' } as unknown as MutationRecord;
      callbacks.forEach(cb => cb([mutation], mockObserver));

      // SVGs should now have aria-hidden="true"
      expect(svg1.getAttribute('aria-hidden')).toBe('true');
      expect(svg2.getAttribute('aria-hidden')).toBe('true');
    });
  });
});
