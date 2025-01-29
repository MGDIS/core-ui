import type Quill from 'quill';

/**
 * Interface for the HTML element of the Quill editor
 */
export type HTMLQuillElement = HTMLElement & {
  checkValidity: () => boolean;
  validatePattern: () => void;
};

/**
 * Interface extending Quill for testing purposes
 */
export interface QuillMock extends Quill {
  _textChangeHandler: () => void;
}

export const defaultModules = {
  toolbar: {
    container: [['bold', 'italic', 'underline'], [{ list: 'ordered' }, { list: 'bullet' }], ['link'], ['clean']],
  },
};
