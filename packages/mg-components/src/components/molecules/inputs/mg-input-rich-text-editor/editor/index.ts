import { isValidString } from '@mgdis/core-ui-helpers/dist/utils';
import { Jodit } from 'jodit';
// Import Jodit plugins
import './jodit-plugins';
// Import Jodit types
import type { IJodit, ButtonsOption } from 'jodit/esm/types';

/**
 * Editor options type extending Jodit configuration
 */
export type EditorOptionsType = {
  value: string;
  name?: string;
  readOnly?: boolean;
  placeholder?: string;
  modules?: ButtonsOption;
  editorHeight?: number;
  handleTextChange: () => void;
  handleFocus: () => void;
  handleBlur: () => void;
};

/**
 * Editor interface matching the component's expectations
 * This wrapper ensures compatibility with the component while using Jodit internally
 */
export interface EditorInterface {
  /**
   * Get editor content as plain text
   * @returns Plain text content
   */
  getText(): string;

  /**
   * Set focus on the editor
   */
  focus(): void;

  /**
   * Enable the editor
   */
  enable(): void;

  /**
   * Disable the editor
   */
  disable(): void;
}

/**
 * Editor type - Jodit instance wrapped with EditorInterface
 */
export type EditorType = IJodit & EditorInterface;

/**
 * Interface for the defineEditor function
 */
interface IdefineEditor {
  (wrapperElement: HTMLElement, config: EditorOptionsType): EditorType;
}

/**
 * Creates a wrapper around Jodit instance to match the expected EditorInterface
 * @param joditInstance - Jodit instance
 * @returns Editor instance with all required methods
 */
const createEditorWrapper = (joditInstance: IJodit): EditorType => {
  const editor = joditInstance as EditorType;

  /**
   * Get editor content as plain text
   * Uses Jodit's editor element textContent property to extract plain text
   * @returns Plain text content
   */
  editor.getText = (): string => {
    return editor.editor.textContent.trim();
  };

  /**
   * Enable the editor
   * Sets readonly to false
   */
  editor.enable = (): void => {
    editor.setReadOnly(false);
  };

  /**
   * Disable the editor
   * Sets readonly to true
   */
  editor.disable = (): void => {
    editor.setReadOnly(true);
  };

  return editor;
};

/**
 * Configures Jodit editor
 * @param wrapperElement - Container element for the editor
 * @param config - Editor configuration options
 * @returns Configured Jodit editor instance
 */
export const defineEditor: IdefineEditor = (wrapperElement, { value, name, modules, readOnly, placeholder, editorHeight, handleTextChange, handleFocus, handleBlur }) => {
  // Get the shadow root if the element is inside a Shadow DOM
  const shadowRoot = wrapperElement.getRootNode() instanceof ShadowRoot ? (wrapperElement.getRootNode() as ShadowRoot) : null;

  // Get the owner document from the shadow root or fallback to global
  const ownerDocument = shadowRoot !== null ? shadowRoot.ownerDocument : document;
  // Shadow DOM shares the same window as the main document
  const ownerWindow = window;

  // Create textarea element for Jodit editor using the correct document
  const editorElement = ownerDocument.createElement('textarea');

  // Set name attribute for form integration
  if (name !== undefined) {
    editorElement.setAttribute('name', name);
  }

  // Append textarea to wrapper
  wrapperElement.appendChild(editorElement);

  // Configure Jodit
  // Using default toolbar configuration or custom modules if provided
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

  // Create and return the wrapped editor instance
  return createEditorWrapper(joditInstance);
};
