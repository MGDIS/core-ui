const Quill = class {
  constructor(container, options = {}) {
    this.container = container;
    this.options = options;

    // Create the editor DOM structure
    const editor = document.createElement('div');
    editor.className = 'ql-editor';
    container.appendChild(editor);

    this.root = editor;
    this.root.innerHTML = '';
    this.root.getRootNode = () => ({ activeElement: null });
    this.root.focus = jest.fn();
    this.root.blur = jest.fn();
    this.root.parentNode = container;
    this.root.dispatchEvent = jest.fn();

    this.selection = {
      hasFocus: jest.fn().mockReturnValue(false),
      getNativeRange: jest.fn(() => null),
      normalizeNative: jest.fn(range => range),
      setNativeRange: jest.fn(),
    };

    this._content = '';
    this._delta = { ops: [] };

    this.clipboard = {
      dangerouslyPasteHTML: jest.fn(html => {
        this._content = html;
        this.root.innerHTML = html;
        this.root.dispatchEvent(new Event('text-change'));
      }),
    };

    this.editor = {
      getLength: jest.fn().mockReturnValue(0),
    };

    // Add content retrieval methods
    this.getSemanticHTML = jest.fn(() => this._content);
    this.getContents = jest.fn(() => this._delta);
    this.getText = jest.fn(() => this._content.replace(/<[^>]*>/g, ''));
  }

  on = jest.fn((event, handler) => {
    if (event === 'text-change') {
      this._textChangeHandler = handler;
    }
  });
  once = jest.fn();
  enable = jest.fn();
  disable = jest.fn();
  setContents = jest.fn(delta => {
    this._delta = delta;
    this._content = JSON.stringify(delta);
  });
  setText = jest.fn(text => {
    this._content = text;
    this._delta = { ops: [{ insert: text }, { insert: '\n' }] };
  });
};

module.exports = {
  __esModule: true,
  default: Quill,
};
