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
    this.root.parentNode = container;
    this.root.dispatchEvent = jest.fn();

    this.selection = {
      hasFocus: jest.fn().mockReturnValue(false),
      getNativeRange: jest.fn(() => null),
      normalizeNative: jest.fn(range => range),
      setNativeRange: jest.fn(),
    };

    this._content = '';

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
    this.getText = jest.fn(() => this._content.replace(/<[^>]*>/g, ''));

    // Add focus method
    this.focus = jest.fn(() => {
      this.root.focus();
      container.dispatchEvent(new CustomEvent('focus', { bubbles: true, composed: true }));
    });

    // Add blur method
    this.blur = jest.fn(() => {
      this.root.blur();
      container.dispatchEvent(new CustomEvent('blur', { bubbles: true, composed: true }));
    });
  }

  /**
   * Attaches an event handler to the editor
   * @param event - The event name ('text-change', etc.)
   * @param handler - The callback function to execute
   */
  on = jest.fn((event, handler) => {
    if (event === 'text-change') {
      this._textChangeHandler = handler;
    }
  });

  /**
   * Attaches a one-time event handler
   * @param event - The event name
   * @param handler - The callback function to execute
   */
  once = jest.fn();

  /**
   * Enables the editor for editing
   */
  enable = jest.fn();

  /**
   * Disables the editor to prevent editing
   */
  disable = jest.fn();

  /**
   * Sets editor contents with plain text
   * @param text - The text to insert
   */
  setText = jest.fn(text => {
    this._content = text;
    this._delta = { ops: [{ insert: text }, { insert: '\n' }] };
  });
};

module.exports = {
  __esModule: true,
  default: Quill,
};
