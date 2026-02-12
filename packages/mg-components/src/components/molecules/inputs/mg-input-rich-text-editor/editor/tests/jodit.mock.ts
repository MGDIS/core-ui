/* istanbul ignore file */

/**
 * Mock getComputedStyle globally to return CSS variables required by calculateEditorHeightFromRows.
 * JSDOM does not support CSS custom properties via getComputedStyle, so we override it.
 *
 * Must be called at module level (before any test runs) to ensure the mock is applied.
 * @example
 * ```
 * setupGetComputedStyleMock();
 * ```
 */
export const setupGetComputedStyleMock = (): void => {
  const originalGetComputedStyle = globalThis.getComputedStyle;
  globalThis.getComputedStyle = (...args: Parameters<typeof getComputedStyle>): CSSStyleDeclaration => {
    const result = originalGetComputedStyle(...args);
    return {
      ...result,
      fontSize: '16px',
      getPropertyValue: (name: string) => {
        if (name === '--mg-b-font-size') return '1rem';
        if (name === '--mg-b-line-height') return '1.5';
        return result.getPropertyValue(name);
      },
    } as unknown as CSSStyleDeclaration;
  };
};

/**
 * List of Jodit plugins that need to be mocked
 * @returns Array of plugin paths to mock
 */
export const getJoditPluginPaths = (): string[] => [
  'jodit/esm/plugins/select/select.js',
  'jodit/esm/plugins/resizer/resizer.js',
  'jodit/esm/plugins/table/table.js',
  'jodit/esm/plugins/select-cells/select-cells.js',
  'jodit/esm/plugins/resize-cells/resize-cells.js',
  'jodit/esm/plugins/table-keyboard-navigation/table-keyboard-navigation.js',
  'jodit/esm/plugins/inline-popup/inline-popup.js',
  'jodit/esm/plugins/clean-html/clean-html.js',
  'jodit/esm/plugins/delete/delete.js',
  'jodit/esm/plugins/file/file.js',
  'jodit/esm/plugins/print/print.js',
  'jodit/esm/plugins/source/source.js',
];

/**
 * Utility function that returns a mock factory for the `jodit` module. Recommended to use with `jest.mock()` at the module level.
 * @returns Mock factory function for Jodit module
 * @example
 * ```
 * // At the top of your test file
 * jest.mock('jodit', () => setupJoditMock());
 * getJoditPluginPaths().forEach(pluginPath => {
 *   jest.mock(pluginPath, () => ({}));
 * });
 * ```
 */
export const setupJoditMock = () => {
  // Mock event emitter
  class MockEventEmitter {
    private listeners: Map<string, Array<() => void>> = new Map();

    on(event: string, handler: () => void): void {
      if (!this.listeners.has(event)) {
        this.listeners.set(event, []);
      }
      this.listeners.get(event)?.push(handler);
    }

    fire(event: string): void {
      const handlers = this.listeners.get(event) || [];
      handlers.forEach(handler => handler());
    }

    off(event: string, handler: () => void): void {
      const handlers = this.listeners.get(event);
      if (handlers !== undefined) {
        const index = handlers.indexOf(handler);
        if (index > -1) {
          handlers.splice(index, 1);
        }
      }
    }
  }

  // Mock Jodit instance
  class MockJodit {
    /** Editor value */
    private _value = '';
    /** Editor options */
    public options = {} as Record<string, unknown> & { buttons?: unknown };
    /** Event emitter */
    public events = new MockEventEmitter() as unknown as {
      on: (event: string, handler: () => void) => void;
      fire: (event: string) => void;
      off: (event: string, handler: () => void) => void;
    };
    private _element: HTMLElement;
    private _editorElement: HTMLElement;
    private _container: HTMLElement;

    constructor(element: HTMLElement, config?: Record<string, unknown>) {
      this._element = element;
      this.options = { ...config };
      // Store initial value if provided
      if (config?.value !== undefined && config?.value !== null) {
        this._value = config.value as string;
      }

      // Create Jodit DOM structure to match real Jodit behavior
      const wrapperElement = element.parentElement ?? document.body;
      // Create .jodit-container
      this._container = document.createElement('div');
      this._container.className = 'jodit-container';
      wrapperElement.appendChild(this._container);
      const container = this._container;

      // Create .jodit-toolbar__box
      const toolbarBox = document.createElement('div');
      toolbarBox.className = 'jodit-toolbar__box';
      container.appendChild(toolbarBox);

      // Create .jodit-workplace
      const workplace = document.createElement('div');
      workplace.className = 'jodit-workplace';
      container.appendChild(workplace);

      // Create .jodit-wysiwyg
      const wysiwyg = document.createElement('div');
      wysiwyg.className = 'jodit-wysiwyg';
      workplace.appendChild(wysiwyg);

      // Set the editor element to the wysiwyg element
      this._editorElement = wysiwyg;
      // Synchronize editor element content with initial value
      this._syncEditorContent();
    }

    /**
     * Synchronize editor element content with value
     * This ensures getText() works correctly by using editor.textContent
     */
    private _syncEditorContent(): void {
      this._editorElement.innerHTML = this._value;
    }

    get value(): string {
      return this._value;
    }

    set value(newValue: string) {
      this._value = newValue;
      // Synchronize editor element content with value
      // This ensures getText() works correctly by using editor.textContent
      this._syncEditorContent();
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setReadOnly(_readonly: boolean): void {
      // Mock implementation - readonly state is not used in tests
    }

    focus(): void {
      // Mock focus implementation
      if (this._element !== null && this._element !== undefined) {
        this._element.focus();
      }
    }

    get editor(): HTMLElement {
      return this._editorElement;
    }

    get container(): HTMLElement {
      return this._container;
    }
  }

  // Mock Jodit class
  class Jodit {
    static make(element: HTMLElement, config?: Record<string, unknown>) {
      return new MockJodit(element, config) as unknown as {
        value: string;
        options: Record<string, unknown>;
        events: { on: (event: string, handler: () => void) => void; fire: (event: string) => void; off: (event: string, handler: () => void) => void };
        setReadOnly: (readonly: boolean) => void;
        focus: () => void;
        editor: HTMLElement;
        container: HTMLElement;
      };
    }

    static atom<T>(items: T[]): T[] {
      return items;
    }
  }

  // Return mock factory
  return {
    Jodit,
    default: Jodit,
  };
};
