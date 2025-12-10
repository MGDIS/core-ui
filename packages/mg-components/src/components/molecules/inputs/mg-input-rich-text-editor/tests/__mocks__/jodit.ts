/**
 * Mock for Jodit editor for Jest tests
 * This mock simulates the Jodit API used in the component
 */

// Mock types for Jodit
export type ButtonsOption = string | Array<string | { name: string; [key: string]: unknown }>;

export interface IJodit {
  value: string;
  options: { buttons?: ButtonsOption; [key: string]: unknown };
  events: {
    on: (event: string, handler: () => void) => void;
    fire: (event: string) => void;
    off: (event: string, handler: () => void) => void;
  };
  setReadOnly: (readonly: boolean) => void;
  focus: () => void;
  editor: HTMLElement;
}

// Export other types that might be needed
// These types are exported for compatibility but parameters are not used
// @ts-expect-error - Type parameters are unused but needed for type compatibility
// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/ban-types
export type IControlType<T = unknown, U = unknown> = unknown;
// @ts-expect-error - Type parameter is unused but needed for type compatibility
// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/ban-types
export type IViewBased<T = unknown> = unknown;
export type IViewOptions = unknown;
// @ts-expect-error - Type parameter is unused but needed for type compatibility
// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/ban-types
export type IFileBrowser<T = unknown> = unknown;
export type IFileBrowserOptions = unknown;
export type IToolbarButton = unknown;

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
class MockJodit implements Partial<IJodit> {
  /** Editor value */
  private _value = '';
  /** Editor options */
  public options: { buttons?: ButtonsOption; [key: string]: unknown } = {};
  /** Event emitter */
  public events = new MockEventEmitter();
  private _element: HTMLElement;
  private _editorElement: HTMLElement;

  constructor(element: HTMLElement, config?: Record<string, unknown>) {
    this._element = element;
    this.options = { ...config };
    // Store initial value if provided
    if (config?.value !== undefined && config?.value !== null) {
      this._value = config.value as string;
    }

    // Create Jodit DOM structure to match real Jodit behavior
    const wrapperElement = element.parentElement;
    if (wrapperElement !== null) {
      // Create .jodit-container
      const container = document.createElement('div');
      container.className = 'jodit-container';
      wrapperElement.appendChild(container);

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
      if (this._value !== '') {
        this._editorElement.innerHTML = this._value;
      }
    } else {
      // Fallback: create a simple editor element if parentElement is not available
      // This should not happen in normal usage, but ensures the mock doesn't break
      this._editorElement = document.createElement('div');
      if (this._value !== '') {
        this._editorElement.innerHTML = this._value;
      }
    }
  }

  get value(): string {
    return this._value;
  }

  set value(newValue: string) {
    this._value = newValue;
    // Synchronize editor element content with value
    this._editorElement.innerHTML = newValue;
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
}

// Mock Jodit class
export class Jodit {
  static make(element: HTMLElement, config?: Record<string, unknown>): MockJodit {
    return new MockJodit(element, config);
  }

  static atom<T>(items: T[]): T[] {
    return items;
  }
}

// Export default for compatibility with Jodit imports and plugins
export default Jodit;
