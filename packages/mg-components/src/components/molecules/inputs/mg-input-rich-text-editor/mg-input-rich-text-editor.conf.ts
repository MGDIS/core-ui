import { Delta as QuillDelta } from 'quill/dist/quill.js';

export type RichTextEditorValue = string | QuillDelta;

export const defaultModules = {
  toolbar: {
    container: [['bold', 'italic', 'underline'], [{ list: 'ordered' }, { list: 'bullet' }], ['link'], ['clean']],
  },
};
