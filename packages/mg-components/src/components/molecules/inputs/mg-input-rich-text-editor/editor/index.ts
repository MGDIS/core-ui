import { isValidString } from '@mgdis/core-ui-helpers/stencil';
import Quill, { type QuillOptions } from 'quill';

export type EditorOptionsType = QuillOptions & {
  value: string;
  handleTextChange: () => void;
  handleFocus: () => void;
  handleBlur: () => void;
};

export type EditorType = Quill;

type ExtendSelection = Selection & { getComposedRanges?: (root: Node) => Range[] };

type ExtendedShadowRoot = ShadowRoot & { getSelection(): ExtendSelection };

interface IdefineEditor {
  (wrapperElement: HTMLElement, config: EditorOptionsType): EditorType;
}

/**
 * HTML element type guard
 * @param element - element to test
 * @returns truthy if element is an HTMLElement
 */
const isHtmlElement = (element: unknown): element is HTMLElement => Boolean((element as HTMLElement).tagName);

/**
 * Implements the range API properly in Native Shadow
 * @param rootNode - root node
 * @returns selection
 */
const getNativeRange = (rootNode: ExtendedShadowRoot | Document) => {
  try {
    if (typeof (document.createElement('div').attachShadow({ mode: 'open' }) as ExtendedShadowRoot).getSelection === 'function') {
      // In Chromium, the shadow root has a getSelection function which returns the range
      return rootNode.getSelection().getRangeAt(0);
    }
    const selection: ExtendSelection = window.getSelection();
    // Webkit range retrieval is done with getComposedRanges (see: https://bugs.webkit.org/show_bug.cgi?id=163921)
    if (typeof selection.getComposedRanges === 'function') {
      return selection.getComposedRanges(rootNode)[0];
    }
    // Gecko implements the range API properly in Native Shadow: https://developer.mozilla.org/en-US/docs/Web/API/Selection/getRangeAt
    return selection.getRangeAt(0);
  } catch {
    return null;
  }
};

/**
 * Quill overrides to support shadow dom
 * https://github.com/slab/quill/issues/2961#issuecomment-1775999845
 * @param editor - Quill instance
 */
const setQuillOverrides = (editor: EditorType): void => {
  const getRootNode = () => editor.root.getRootNode() as ExtendedShadowRoot;

  // Original implementation uses document.active element but with an imlplementation in web-component with shadow root we need compare with it.
  editor.selection.hasFocus = () => getRootNode().activeElement === editor.root;

  // Original implementation uses document.getSelection which does not work in Native Shadow.
  // Replace document.getSelection with shadow dom equivalent (different for each browser)
  editor.selection.getNativeRange = () => {
    const nativeRange = getNativeRange(getRootNode());
    return Boolean(nativeRange) ? editor.selection.normalizeNative(nativeRange) : null;
  };

  // Original implementation relies on Selection.addRange to programatically set the range, which does not work in Webkit with Native Shadow. Selection.addRange works fine in Chromium and Gecko.
  editor.selection.setNativeRange = (startContainer, startOffset, endContainer = startContainer, endOffset = startOffset, force = false) => {
    if ([startContainer?.parentNode, editor.root.parentNode, endContainer?.parentNode].some(node => node == null)) {
      return;
    }

    const selection = window.getSelection();

    if (!editor.selection.hasFocus()) editor.root.focus();

    const native = (editor.selection.getNativeRange() || {}).native;
    if (
      !Boolean(native) ||
      force ||
      startContainer !== native.startContainer ||
      startOffset !== native.startOffset ||
      endContainer !== native.endContainer ||
      endOffset !== native.endOffset
    ) {
      if (isHtmlElement(startContainer) && startContainer.tagName === 'BR') {
        startOffset = [].indexOf.call(startContainer.parentNode.childNodes, startContainer);
        startContainer = startContainer.parentNode;
      }
      if (isHtmlElement(endContainer) && endContainer.tagName === 'BR') {
        endOffset = [].indexOf.call(endContainer.parentNode.childNodes, endContainer);
        endContainer = endContainer.parentNode;
      }

      selection.setBaseAndExtent(startContainer, startOffset, endContainer, endOffset);
    }
  };

  // Subscribe to selection change separately, because emitter in Quill doesn't catch this event in Shadow DOM
  document.addEventListener('selectionchange', () => {
    editor.selection.update();
  });
};

/**
 * Fixes for handling text selection in Quill when used within the Shadow DOM.
 * - Fixes focus detection
 * - Adapts native range handling to work with the Shadow DOM
 * - Correctly manages text selection across Shadow DOM boundaries
 * - Sets up selection change events
 * @returns Quill instance
 */
export const defineEditor: IdefineEditor = (wrapperElement, { value, modules, readOnly, placeholder, handleTextChange, handleFocus, handleBlur }) => {
  const toolbarOptions = {
    toolbar: [['bold', 'italic', 'underline'], [{ list: 'ordered' }, { list: 'bullet' }], ['link'], ['clean']],
  };
  const editor = new Quill(wrapperElement.querySelector('div'), {
    theme: 'snow',
    modules: modules || toolbarOptions,
    readOnly,
    placeholder,
  });

  if (isValidString(value) && /<[a-z][\s\S]*>/i.test(value)) {
    editor.clipboard.dangerouslyPasteHTML(value);
  } else if (isValidString(value)) {
    editor.setText(value);
  }

  const editorContent = wrapperElement.querySelector('.ql-editor');
  editorContent.addEventListener('focus', handleFocus);
  editorContent.addEventListener('blur', handleBlur);

  // Add an event listener for the text-change event
  editor.on('text-change', handleTextChange);

  setQuillOverrides(editor);

  return editor;
};
