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

/**
 * Configures Jodit editor
 * @param element - Component element (HTMLMgInputRichTextEditorElement)
 * @param editorElement - Textarea element for the editor
 * @param config - Editor configuration options
 * @returns Configured Jodit editor instance
 */
export const defineEditor = (element: HTMLMgInputRichTextEditorElement, editorElement: HTMLTextAreaElement, config: DefineEditorConfig): IJodit => {
  const { value, modules, readOnly, placeholder, editorHeight, handleTextChange, handleFocus, handleBlur } = config;
  // Get the shadow root directly from the component element
  const shadowRoot = element.shadowRoot;

  // Get the owner document from the shadow root
  const ownerDocument = shadowRoot.ownerDocument;
  // Shadow DOM shares the same window as the main document
  const ownerWindow = window;

  // Configure Jodit
  // Using default toolbar configuration or custom modules if provided
  // Note: Using Record<string, unknown> to avoid TypeScript complexity issues with Jodit's deeply nested Config type
  // The actual configuration follows Jodit's Config interface from jodit/esm/types
  const joditConfig: Record<string, unknown> = {
    readonly: readOnly === true,
    placeholder: placeholder || '', // Avoid `Type something...` placeholder by default
    // Set tabIndex to 0 to enable keyboard navigation with Tab key
    // Default is -1 which prevents the editor from receiving focus via Tab navigation
    tabIndex: 0,
    buttons: modules || [
      'bold',
      'italic',
      'underline',
      'strikethrough',
      'eraser',
      '|',
      'ul',
      'ol',
      '|',
      'superscript',
      'subscript',
      '|',
      'brush',
      '|',
      'link',
      'image',
      'file',
      '|',
      'table',
      '|',
      'undo',
      'redo',
      '|',
      'print',
      '|',
      'source',
    ],
    // Disable features we don't want
    showXPathInStatusbar: false,
    showCharsCounter: false,
    showWordsCounter: false,
    toolbarAdaptive: false,
    // Configure source editor mode
    sourceEditor: 'area',
    // This ensures tooltips and popups are created inside the component's shadow root
    shadowRoot: shadowRoot,
    // Provide ownerDocument and ownerWindow to ensure Jodit uses the correct context
    ownerDocument: ownerDocument,
    ownerWindow: ownerWindow,
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

  addCustomClass('.jodit-container', 'mg-c-input__container');
  addCustomClass('.jodit-toolbar__box', 'mg-c-input__toolbar-box');
  addCustomClass('.jodit-workplace', 'mg-c-input__workplace');
  addCustomClass('.jodit-wysiwyg', 'mg-c-input__wysiwyg');

  // Improve toolbar accessibility
  // Add ARIA attributes and keyboard navigation to the toolbar container for better screen reader support
  const toolbarElement = wrapperElement.querySelector('.jodit-toolbar__box') as HTMLElement;
  if (toolbarElement !== null) {
    // Use requestAnimationFrame to ensure Jodit has finished rendering the toolbar
    requestAnimationFrame(() => {
      // Set role="toolbar" to identify this as a toolbar widget
      // This helps screen readers understand the toolbar's purpose and enables proper keyboard navigation
      toolbarElement.setAttribute('role', 'toolbar');
    });
  }

  // Transfer accessibility attributes from the hidden textarea to the WYSIWYG editor
  // The textarea is hidden by Jodit (display: none), so its aria-describedby is not accessible.
  // We need to transfer it to the actual editable element (.jodit-wysiwyg) so screen readers
  // can properly announce help text and error messages.
  const wysiwygElement = wrapperElement.querySelector('.jodit-wysiwyg') as HTMLElement;
  if (wysiwygElement !== null) {
    // Use requestAnimationFrame to ensure mg-input has finished adding aria-describedby to the textarea
    requestAnimationFrame(() => {
      const ariaDescribedBy = editorElement.getAttribute('aria-describedby');
      if (ariaDescribedBy !== null) {
        wysiwygElement.setAttribute('aria-describedby', ariaDescribedBy);
      }

      // Also set role="textbox" and aria-multiline="true" for proper screen reader support
      wysiwygElement.setAttribute('role', 'textbox');
      wysiwygElement.setAttribute('aria-multiline', 'true');

      // Associate the editor with the label
      // The label uses htmlFor pointing to the identifier. Since the textarea doesn't have an id
      // (and is hidden anyway), we set the identifier as id on the wysiwyg element so the label works.
      // We get the identifier from the wrapper div's id attribute.
      const identifier = wrapperElement.id;
      if (identifier !== '') {
        wysiwygElement.id = identifier;
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
    });
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
