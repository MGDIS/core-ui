const QuillMock = class QuillMock {
  /**
   * Define options
   */
  options;
  /**
   * Define editor
   */
  editorElement;
  /**
   * Define fireOn mocl call
   */
  fireOn = null
  #content: string;

  constructor(editor: HTMLElement, options = {}) {
    editor.appendChild(document.createElement('div'));
    editor.className = 'ql-editor';
    this.editorElement = editor;
    this.options = options;
  }

  /**
   * Content getter
   * @returns content
   */
  private get content(): string {
    return this.#content
  }
  /**
   * Content setter
   * @param newValue - new #content value
   */
  private set content(newValue: QuillMock['content']) {
    this.#content = newValue;
    this.editorElement.innerHTML = newValue;
  }

  /**
   * root node getter
   * @returns root element
   */
  get root(): Partial<ShadowRoot> & { focus: () => void; getSelection: () => QuillMock['editorElement'] } {
    let activeElement;
    return {
      getRootNode: () => this.root as Node,
      parentNode: this.editorElement?.parentNode,
      focus: jest.fn(() => {
        activeElement = this.root;
      }),
      activeElement,
      getSelection: jest.fn().mockReturnValue(this.editorElement)
    }
  };

  /**
   * Define selection
   */
  selection = {
    hasFocus: jest.fn(),
    getNativeRange: jest.fn(),
    normalizeNative: jest.fn(),
    setNativeRange: jest.fn(),
    setBaseAndExtent: jest.fn(),
    getComposedRanges: jest.fn(() => [{}]),
    getRangeAt: jest.fn(),
    update: jest.fn(),
    root: this.root,
  };

  /**
   * Define clipboard
   */
  clipboard = {
    dangerouslyPasteHTML: jest.fn((newValue) => {
      this.content = newValue;
    }),
  };

  /**
  * Handle event
  * @param eventName - eventName
  * @param callback - callback to run
  */
  on = jest.fn((_eventName, callback) => {
    this.fireOn = callback;
  })

  /**
  * Sets editor contents with plain text
  * @param newValue - The text to insert
  */
  setText = jest.fn(newValue => {
    this.content = newValue;
    return {};
  });

  /**
   * Get html from content
   */
  getSemanticHTML = jest.fn(() => this.content);

  /**
   * Get html from content
   */
  getText = jest.fn(() => this.content.replace(/<[^>]*>/g, ''));

  /**
   * Enables the editor for editing
   */
  enable = jest.fn();

  /**
   * Disables the editor to prevent editing
   */
  disable = jest.fn();
};

module.exports = {
  __esModule: true,
  default: QuillMock,
};
