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

  describe('calculateEditorHeightFromRows', () => {
    test('Should throw error when --mg-b-font-size is not defined', async () => {
      const { calculateEditorHeightFromRows } = await import('..');

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

      expect(() => calculateEditorHeightFromRows(5)).toThrow('mg-input-rich-text-editor: CSS variable --mg-b-font-size is not defined.');

      globalThis.getComputedStyle = mockedGetComputedStyle;
    });

    test('Should throw error when --mg-b-line-height is not defined', async () => {
      const { calculateEditorHeightFromRows } = await import('..');

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

      expect(() => calculateEditorHeightFromRows(5)).toThrow('mg-input-rich-text-editor: CSS variable --mg-b-line-height is not defined.');

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

      // Dispatch keydown from toolbar (div) so target is toolbar - handler returns early
      const keydownEvent = new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, cancelable: true });
      toolbarElement.dispatchEvent(keydownEvent);

      // Button tabindex should be unchanged (handler did not run)
      expect(button1.getAttribute('tabindex')).not.toBe('0');
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

    test('Should not activate roving tabindex when focusin target is not a button', async () => {
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

      // Dispatch focusin from toolbar (div) so target is toolbar - handler returns early when target is not a button
      const focusInEvent = new FocusEvent('focusin', { bubbles: true });
      toolbarElement.dispatchEvent(focusInEvent);

      // No button should get tabindex="0" (handler returned early when target is not a button)
      expect(button1.getAttribute('tabindex')).not.toBe('0');
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

      // Dispatch Tab without shift - handler returns early
      const tabOnlyEvent = new KeyboardEvent('keydown', { key: 'Tab', shiftKey: false, bubbles: true, cancelable: true });
      wysiwygElement.dispatchEvent(tabOnlyEvent);

      // First button should not have tabindex="0" (handler did not run, so button stays at "-1" from init)
      expect(button1.getAttribute('tabindex')).not.toBe('0');
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

    test('Should not update roving tabindex when keydown target is button in popup (not in getToolbarButtons)', async () => {
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
      popupButton.dispatchEvent(keydownEvent);

      expect(popupButton.getAttribute('tabindex')).toBeNull();
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

    test('Should activate roving tabindex when focusin target is toolbar button', async () => {
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
