import { isValidString } from '@mgdis/core-ui-helpers/dist/utils';
import { Jodit } from 'jodit';
// Import Jodit plugins
import 'jodit/esm/plugins/select/select.js';
import 'jodit/esm/plugins/resizer/resizer.js';
import 'jodit/esm/plugins/table/table.js';
import 'jodit/esm/plugins/select-cells/select-cells.js';
import 'jodit/esm/plugins/resize-cells/resize-cells.js';
import 'jodit/esm/plugins/table-keyboard-navigation/table-keyboard-navigation.js';
import 'jodit/esm/plugins/inline-popup/inline-popup.js';
import 'jodit/esm/plugins/clean-html/clean-html.js';
import 'jodit/esm/plugins/delete/delete.js';
import 'jodit/esm/plugins/file/file.js';
import 'jodit/esm/plugins/print/print.js';
import 'jodit/esm/plugins/source/source.js';
// Import editor types
import type { DefineEditorConfig, IJodit } from './editor.conf';

const DEFAULT_ROWS = 5;

/**
 * Calculate Jodit editor min-height from rows.
 * Uses CSS variables --mg-b-font-size and --mg-b-line-height to compute height.
 * @param rows - Number of rows
 * @returns Calculated height in pixels (wysiwyg area + toolbar height of 40px + 2px borders)
 * @throws If required CSS variables (--mg-b-font-size, --mg-b-line-height) are missing
 */
export const calculateEditorHeightFromRows = (rows: number): number => {
  const root = document.documentElement;
  const computedStyle = getComputedStyle(root);

  const fontSizeValue = computedStyle.getPropertyValue('--mg-b-font-size').trim();
  const lineHeightValue = computedStyle.getPropertyValue('--mg-b-line-height').trim();

  if (fontSizeValue === '') {
    throw new Error('mg-input-rich-text-editor: CSS variable --mg-b-font-size is not defined.');
  }
  if (lineHeightValue === '') {
    throw new Error('mg-input-rich-text-editor: CSS variable --mg-b-line-height is not defined.');
  }

  const fontSizeRem = parseFloat(fontSizeValue.replace('rem', ''));
  const lineHeight = parseFloat(lineHeightValue);

  const htmlFontSize = parseFloat(getComputedStyle(root).fontSize);

  const fontSizePx = fontSizeRem * htmlFontSize;
  const lineHeightPx = fontSizePx * lineHeight;

  const paddingVertical = 0.8 * htmlFontSize;

  const contentHeight = lineHeightPx * rows;
  const wysiwygHeight = contentHeight + paddingVertical * 2;

  const toolbarHeight = 40;
  const borderHeight = 2;
  const totalHeight = wysiwygHeight + toolbarHeight + borderHeight;

  return Math.round(totalHeight);
};

/**
 * Configures Jodit editor
 * @param element - Component element (HTMLMgInputRichTextEditorElement)
 * @param editorElement - Textarea element for the editor
 * @param config - Editor configuration options
 * @returns Configured Jodit editor instance
 */
export const defineEditor = (element: HTMLMgInputRichTextEditorElement, editorElement: HTMLTextAreaElement, config: DefineEditorConfig): IJodit => {
  const { value, modules, readOnly, disabled, placeholder, rows = DEFAULT_ROWS, handleTextChange, handleFocus, handleBlur } = config;
  const editorHeight = calculateEditorHeightFromRows(rows);

  // Configure Jodit
  // Note: Using Record<string, unknown> to avoid TypeScript complexity issues with Jodit's deeply nested Config type
  // The actual configuration follows Jodit's Config interface from jodit/esm/types
  const joditConfig: Record<string, unknown> = {
    readonly: readOnly === true,
    // When readOnly (readonly or disabled), disable ALL toolbar buttons including plugin buttons (print, source).
    // By default Jodit keeps source, print, fullsize, about, dots active in read-only mode.
    // Set to [] so that when setReadOnly(true) is called (now or later), no toolbar buttons stay active.
    activeButtonsInReadOnly: [],
    placeholder: placeholder || '', // Avoid `Type something...` placeholder by default
    // Set tabIndex to 0 to enable keyboard navigation with Tab key when enabled
    // When disabled, use -1 to exclude the editor from Tab navigation
    tabIndex: disabled === true ? -1 : 0,
    buttons: modules,
    // Disable features we don't want
    showXPathInStatusbar: false,
    showCharsCounter: false,
    showWordsCounter: false,
    toolbarAdaptive: false,
    // Configure source editor mode
    sourceEditor: 'area',
    // This ensures tooltips and popups are created inside the component's shadow root
    shadowRoot: element.shadowRoot,
    // Provide ownerDocument and ownerWindow to ensure Jodit uses the correct context
    ownerDocument: element.shadowRoot.ownerDocument,
    ownerWindow: window,
    // Prevent fullscreen from breaking component's shadow root isolation
    globalFullSize: false,
    // Set min-height based on editorHeight (calculated from rows property, includes wysiwyg + toolbar + borders)
    minHeight: `${editorHeight}px`,
    // Resizer configuration
    allowResizeTags: new Set(['img', 'table']),
    resizer: {
      showSize: true,
      hideSizeTimeout: 1000,
      useAspectRatio: new Set(['img']), // Preserve aspect ratio for images only
      forImageChangeAttributes: true,
      min_width: 10,
      min_height: 10,
    },
    // Inline toolbar configuration
    toolbarInline: true,
    tableAllowCellSelection: true,
    popup: {
      a: Jodit.atom(['link', 'unlink', 'delete']),
    },
  };

  // Initialize Jodit editor
  const joditInstance = Jodit.make(editorElement, joditConfig);

  // Add custom classes
  // These classes are added to Jodit's DOM elements for styling purposes
  const wrapperElement = editorElement.parentElement as HTMLDivElement;
  const addCustomClass = (selector: string, className: string): void => {
    wrapperElement.querySelector(selector).classList.add(className);
  };

  /**
   * Helpers for Jodit toolbar accessibility.
   * @returns Toolbar element or null if not found
   */
  const getJoditToolbarElement = (): HTMLElement | null => wrapperElement.querySelector('.jodit-toolbar__box');

  /**
   * Get the WYSIWYG editor element.
   * @returns WYSIWYG element or null if not found
   */
  const getJoditWysiwygElement = (): HTMLElement | null => wrapperElement.querySelector('.jodit-wysiwyg');

  /**
   * Get focusable toolbar buttons.
   * @returns Array of focusable toolbar buttons
   */
  const getFocusableToolbarButtons = (toolbarEl: HTMLElement | null): HTMLButtonElement[] | null => {
    if (toolbarEl === null) return null;

    // Find all buttons within the toolbar, excluding disabled ones
    const buttons = Array.from(toolbarEl.querySelectorAll<HTMLButtonElement>('button:not([disabled])'));

    // Filter out buttons that are not visible or are in popups/dropdowns
    return buttons.filter(button => {
      const isVisible = button.offsetParent !== null;
      const isInToolbar = toolbarEl.contains(button);
      // Exclude buttons in popups or dropdowns (they have their own navigation)
      const isInPopup = button.closest('.jodit-popup, .jodit-dropdown') !== null;
      return isVisible && isInToolbar && !isInPopup;
    });
  };

  addCustomClass('.jodit-container', 'mg-c-input__container');
  addCustomClass('.jodit-toolbar__box', 'mg-c-input__toolbar-box');
  addCustomClass('.jodit-workplace', 'mg-c-input__workplace');
  addCustomClass('.jodit-wysiwyg', 'mg-c-input__wysiwyg');

  // Improve toolbar accessibility
  // Add ARIA attributes and keyboard navigation to the toolbar container for better screen reader support
  const toolbarElement = getJoditToolbarElement();
  if (toolbarElement !== null) {
    // Set role="toolbar" to identify this as a toolbar widget
    // This helps screen readers understand the toolbar's purpose and enables proper keyboard navigation
    toolbarElement.setAttribute('role', 'toolbar');
    toolbarElement.setAttribute('aria-label', 'Text formatting toolbar');

    /**
     * Handle keyboard navigation within the toolbar
     * Implements ARIA toolbar pattern: ArrowLeft/Right for navigation, Home/End for first/last
     */
    const handleToolbarKeyDown = (event: KeyboardEvent & { target: HTMLElement }): void => {
      // Only handle keys when focus is within the toolbar
      const target = event.target;
      if (!toolbarElement.contains(target) || target.tagName !== 'BUTTON') {
        return;
      }

      const buttons = getFocusableToolbarButtons(toolbarElement);
      if (buttons === null || buttons.length === 0) return;

      const currentIndex = buttons.indexOf(target as HTMLButtonElement);
      if (currentIndex === -1) return;

      let targetIndex = currentIndex;

      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          event.stopPropagation();
          // Move to previous button, wrap to last if at first
          targetIndex = currentIndex > 0 ? currentIndex - 1 : buttons.length - 1;
          buttons[targetIndex].focus();
          break;

        case 'ArrowRight':
          event.preventDefault();
          event.stopPropagation();
          // Move to next button, wrap to first if at last
          targetIndex = currentIndex < buttons.length - 1 ? currentIndex + 1 : 0;
          buttons[targetIndex].focus();
          break;

        case 'Home':
          event.preventDefault();
          event.stopPropagation();
          // Move to first button
          buttons[0].focus();
          break;

        case 'End':
          event.preventDefault();
          event.stopPropagation();
          // Move to last button
          buttons[buttons.length - 1].focus();
          break;

        case 'Tab':
          // Allow Tab to work normally (exit toolbar)
          break;

        default:
          // Let other keys work normally (Enter, Space, etc.)
          return;
      }
    };

    /**
     * Hide SVG icons from screen readers in toolbar buttons.
     * Toolbar buttons already have aria-label, so SVG icons are purely decorative.
     * Without aria-hidden, VoiceOver announces them as images.
     */
    const hideToolbarSvgsFromScreenReaders = (): void => {
      toolbarElement.querySelectorAll('svg').forEach(svg => {
        svg.setAttribute('aria-hidden', 'true');
      });
    };

    // Hide SVG icons from screen readers on first render
    hideToolbarSvgsFromScreenReaders();

    // Set up event listeners for keyboard navigation
    toolbarElement.addEventListener('keydown', handleToolbarKeyDown, true);

    // Hide SVGs when toolbar content changes (buttons can be added/removed dynamically)
    const toolbarObserver = new MutationObserver(() => {
      hideToolbarSvgsFromScreenReaders();
    });

    toolbarObserver.observe(toolbarElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['disabled'],
    });
  }

  // Transfer accessibility attributes from the hidden textarea to the WYSIWYG editor
  // The textarea is hidden by Jodit (display: none), so its aria-describedby is not accessible.
  // We need to transfer it to the actual editable element (.jodit-wysiwyg) so screen readers
  // can properly announce help text and error messages.
  if (getJoditWysiwygElement() !== null) {
    const wysiwygElement = getJoditWysiwygElement();
    if (wysiwygElement !== null) {
      // mg-input sets aria-describedby on the textarea in its componentDidLoad (child runs before parent)
      const ariaDescribedBy = editorElement.getAttribute('aria-describedby');
      if (ariaDescribedBy !== null) {
        wysiwygElement.setAttribute('aria-describedby', ariaDescribedBy);
      }

      // Also set role="textbox" and aria-multiline="true" for proper screen reader support
      wysiwygElement.setAttribute('role', 'textbox');
      wysiwygElement.setAttribute('aria-multiline', 'true');

      // Sync disabled state for screen readers (aria-disabled only when true, omitted otherwise)
      if (disabled === true) {
        wysiwygElement.setAttribute('aria-disabled', 'true');
      } else {
        wysiwygElement.removeAttribute('aria-disabled');
      }

      // Associate the editor with the label for screen readers and label click
      const identifier = element.identifier;
      if (identifier !== '') {
        wrapperElement.removeAttribute('id');
        wysiwygElement.id = identifier;

        // Make label click focus the editor like a native input.
        const titleId = `${identifier}-title`;
        const titleElement = element.shadowRoot.querySelector<HTMLElement>('mg-input-title');

        if (titleElement !== null && titleElement !== undefined) {
          if (titleElement.id !== titleId) {
            titleElement.id = titleId;
          }

          titleElement.addEventListener('click', () => {
            joditInstance.focus();
          });
        }

        // Link to the label for screen readers
        wysiwygElement.setAttribute('aria-labelledby', titleId);
      }

      // Set up a MutationObserver to sync aria-describedby changes from textarea to wysiwyg
      // This handles dynamic updates when error messages appear/disappear
      const observer = new MutationObserver(() => {
        const updatedAriaDescribedBy = editorElement.getAttribute('aria-describedby');
        if (updatedAriaDescribedBy !== null) {
          wysiwygElement.setAttribute('aria-describedby', updatedAriaDescribedBy);
        } else {
          wysiwygElement.removeAttribute('aria-describedby');
        }
      });

      observer.observe(editorElement, {
        attributes: true,
        attributeFilter: ['aria-describedby'],
      });

      // Set up Shift+Tab interception on the wysiwyg element (contenteditable)
      // This intercepts Shift+Tab from the editor to redirect to the first toolbar button
      const handleWysiwygShiftTab = (event: KeyboardEvent): void => {
        // Only handle Shift+Tab (backward navigation)
        if (event.key !== 'Tab' || !event.shiftKey) {
          return;
        }

        const buttons = getFocusableToolbarButtons(getJoditToolbarElement());

        if (buttons !== null && buttons.length > 0) {
          // Prevent default Tab behavior to intercept navigation
          event.preventDefault();
          event.stopPropagation();

          // Focus first toolbar button directly
          buttons[0].focus();
        }
      };

      // Listen for keydown events directly on the wysiwyg element
      wysiwygElement.addEventListener('keydown', handleWysiwygShiftTab, true);
    }
  }

  // Set initial value
  if (isValidString(value)) {
    joditInstance.value = value;
  }

  // Set up event listeners
  joditInstance.events.on('change', handleTextChange);
  joditInstance.events.on('focus', handleFocus);
  joditInstance.events.on('blur', handleBlur);

  // Return the Jodit instance directly
  return joditInstance;
};
