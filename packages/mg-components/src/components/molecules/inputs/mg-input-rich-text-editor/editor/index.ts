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

  // Get the owner document from the shadow root or fallback to global
  const ownerDocument = shadowRoot !== null ? shadowRoot.ownerDocument : document;
  // Shadow DOM shares the same window as the main document
  const ownerWindow = window;

  // Configure Jodit
  // Using default toolbar configuration or custom modules if provided
  // Note: Using Record<string, unknown> to avoid TypeScript complexity issues with Jodit's deeply nested Config type
  // The actual configuration follows Jodit's Config interface from jodit/esm/types
  const joditConfig: Record<string, unknown> = {
    readonly: readOnly || false,
    placeholder: placeholder || '',
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
  const joditInstance = Jodit.make(editorElement, joditConfig as Parameters<typeof Jodit.make>[1]);

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
