import { Component, Element, h, Prop, Watch, State, Event, EventEmitter, Method } from '@stencil/core';
import { ClassList, isValidString, toString } from '@mgdis/stencil-helpers';
import { classReadonly, type TooltipPosition, classDisabled } from '../mg-input/mg-input.conf';
import { initLocales } from '../../../../locales';
import { defineEditor, type EditorType, type EditorOptionsType } from './editor';

@Component({
  tag: 'mg-input-rich-text-editor',
  styleUrls: ['./editor/editor.scss', '../../../../../node_modules/@mgdis/styles/dist/components/mg-input-rich-text-editor.css'],
  shadow: true,
})
export class MgInputRichTextEditor {
  /************
   * Internal *
   ************/

  // editor
  private editor: EditorType;
  private wrapperElement: HTMLDivElement;

  // Locales
  private messages;

  // hasDisplayedError (triggered by blur event)
  private hasDisplayedError = false;

  // Classes
  private readonly classFocus = 'mg-u-is-focused';

  /**************
   * Decorators *
   **************/

  /**
   * Get component DOM element
   */
  @Element() element: HTMLMgInputRichTextEditorElement;

  /**
   * Define the value of the editor
   * Can be either HTML string or plain text
   */
  @Prop({ mutable: true }) value = '';

  /**
   * Identifier is used for the element ID (id is a reserved prop in Stencil.js)
   */
  @Prop() identifier!: string;

  /**
   * Input label
   */
  @Prop() label!: string;

  /**
   * Define if label is displayed on top
   */
  @Prop() labelOnTop = false;

  /**
   * Define if label is visible
   */
  @Prop() labelHide = false;

  /**
   * Input placeholder.
   * It should be a word or short phrase that demonstrates the expected type of data, not a replacement for labels or help text.
   */
  @Prop() placeholder?: string;

  /**
   * Define the number of visible text lines for the control
   */
  @Prop() rows = 5;

  /**
   * Define if input is required
   */
  @Prop() required = false;

  /**
   * Define if the editor is readonly
   */
  @Prop() readonly = false;
  @Watch('readonly')
  watchReadonly(newValue: MgInputRichTextEditor['readonly']): void {
    if (newValue) this.classCollection.add(classReadonly);
    else this.classCollection.delete(classReadonly);
  }

  /**
   * Define if input is disabled
   */
  @Prop() disabled = false;
  @Watch('disabled')
  watchDisabled(newValue: MgInputRichTextEditor['disabled']): void {
    if (newValue) {
      this.classCollection.add(classDisabled);
      this.editor?.disable();
    } else {
      this.classCollection.delete(classDisabled);
      this.editor?.enable();
    }
  }

  @Watch('required')
  @Watch('readonly')
  @Watch('disabled')
  handleValidityChange(): void {
    if (this.editor !== undefined && this.editor !== null) {
      this.checkValidity();
      if (this.hasDisplayedError) {
        this.setErrorMessage();
        this.hasDisplayedError = false;
      }
    }
  }

  /**
   * Define input pattern to validate
   * Please refer to the Pattern section in the input documentation for detailed information on using regular expressions in components.
   */
  @Prop() pattern?: string;

  /**
   * Define input pattern error message
   */
  @Prop() patternErrorMessage?: string;
  @Watch('pattern')
  @Watch('patternErrorMessage')
  validatePattern(newValue: string): void {
    if (newValue !== undefined && !(isValidString(this.pattern) && isValidString(this.patternErrorMessage))) {
      throw new Error(
        `<mg-input-rich-text-editor> props "pattern" and "patternErrorMessage" must be non-empty string and paired. Passed value: "pattern='${toString(this.pattern)}'" and "patternErrorMessage='${toString(this.patternErrorMessage)}'".`,
      );
    }
  }

  /**
   * Add a tooltip message next to the input
   */
  @Prop() tooltip?: string;

  /**
   * Define tooltip position
   */
  @Prop() tooltipPosition: TooltipPosition = 'input';

  /**
   * Add a help text under the input, usually expected data format and example
   */
  @Prop() helpText?: string;

  /**
   * Editor modules configuration
   */
  @Prop() modules?: EditorOptionsType['modules'];

  /**
   * Define input valid state
   */
  @Prop({ mutable: true }) valid: boolean;

  /**
   * Define input invalid state
   */
  @Prop({ mutable: true }) invalid: boolean;

  /**
   * Component classes
   */
  @State() classCollection: ClassList = new ClassList(['mg-c-input--rich-text-editor']);

  /**
   * Error message to display
   */
  @State() errorMessage: string;

  /**
   * Emited event when checking validity
   */
  @Event({ eventName: 'input-valid' }) inputValid: EventEmitter<boolean>;

  /**
   * Emited event when value change
   */
  @Event({ eventName: 'value-change' }) valueChange: EventEmitter<string>;

  /**
   * Get editor content as HTML
   * @returns HTML content of the editor
   */
  @Method()
  async getHTML(): Promise<string> {
    return new Promise(resolve => {
      requestAnimationFrame(() => {
        resolve(this.editor.getSemanticHTML());
      });
    });
  }

  /**
   * Get editor content as plain text
   * @returns Plain text content of the editor
   */
  @Method()
  async getText(): Promise<string> {
    return new Promise(resolve => {
      requestAnimationFrame(() => {
        resolve(this.editor.getText());
      });
    });
  }

  /**
   * Display input error if it exists.
   */
  @Method()
  async displayError(): Promise<void> {
    // Use `Promise` as requested for stencil method
    // Use `requestAnimationFrame` to ensure:
    // - DOM is fully updated before validation
    // - Async operations are completed
    // - No timing issues with Stencil's render cycle
    // - Keep everything in sync both inside and outside the component
    return new Promise(resolve => {
      requestAnimationFrame(() => {
        this.checkValidity();
        this.setErrorMessage();
        this.hasDisplayedError = this.invalid;
        resolve();
      });
    });
  }

  /**
   * Set an error and display a custom error message.
   * This method can be used to set the component's error state from its context by passing a boolean value to the `valid` parameter.
   * It must be paired with an error message to display for the given context.
   * When used to set validity to `false`, you should use this method again to reset the validity to `true`.
   * @param valid - value indicating the validity
   * @param errorMessage - the error message to display
   */
  @Method()
  async setError(valid: MgInputRichTextEditor['valid'], errorMessage: string): Promise<void> {
    if (typeof valid !== 'boolean') {
      throw new Error('<mg-input-rich-text-editor> method "setError()" param "valid" must be a boolean.');
    } else if (!isValidString(errorMessage)) {
      throw new Error('<mg-input-rich-text-editor> method "setError()" param "errorMessage" must be a string.');
    } else {
      this.setValidity(valid);
      this.setErrorMessage(valid ? undefined : errorMessage);
      this.hasDisplayedError = this.invalid;
    }
  }

  /**
   * Reset value, validity and error state
   */
  @Method()
  async reset(): Promise<void> {
    if (!this.readonly) {
      this.value = '';
      this.editor.setText('');
      this.checkValidity();
      this.errorMessage = undefined;
      this.hasDisplayedError = false;
    }
  }

  /**
   * Check if the field is empty taking into account the value format
   * @returns truthy is value is invalid
   */
  private isEmpty = (): boolean => {
    const textContent = this.getTextContent();
    return !(isValidString(textContent) && textContent !== '\n');
  };

  /**
   * Extract the text without HTML tags from value
   * @returns text content
   */
  private getTextContent = (): string => this.value.replace(/<[^>]*>/g, '').trim();

  /**
   * Get pattern validity
   * @returns is pattern valid
   */
  private getPatternValidity = (): boolean => this.pattern === undefined || new RegExp(`^${this.pattern}$`, 'u').test(this.getTextContent());

  /**
   * Method to set validity values
   * @param newValue - valid new value
   */
  private setValidity(newValue: MgInputRichTextEditor['valid']) {
    const oldValidValue = this.valid;
    this.valid = newValue;
    this.invalid = !this.valid;
    if (this.valid !== oldValidValue) {
      this.inputValid.emit(this.valid);
    }
  }

  /**
   * Check if input is valid
   */
  private checkValidity = (): void => {
    this.setValidity(this.readonly || this.disabled || ((this.required ? !this.isEmpty() : true) && this.getPatternValidity()));
  };

  /**
   * Set input error message
   * @param errorMessage - errorMessage override
   */
  private setErrorMessage = (errorMessage?: string): void => {
    this.errorMessage = undefined;
    if (this.valid) return;
    else if (isValidString(errorMessage)) {
      this.errorMessage = errorMessage;
    } else if (this.required && this.isEmpty()) {
      this.errorMessage = this.messages.errors.required;
    } else if (!this.getPatternValidity()) {
      this.errorMessage = this.patternErrorMessage;
    }
  };

  /**
   * Handle focus event
   */
  private handleFocus = (): void => {
    this.classCollection.add(this.classFocus);
    this.classCollection = new ClassList(this.classCollection.classes);
  };

  /**
   * Handles the blur event on the editor
   * Checks validity and displays error messages if necessary
   */
  private handleBlur = (): void => {
    // Manage focus
    this.classCollection.delete(this.classFocus);
    this.classCollection = new ClassList(this.classCollection.classes);

    if (!this.readonly) {
      this.checkValidity();
      this.setErrorMessage();
      if (!this.valid) {
        this.hasDisplayedError = true;
      }
    }
  };

  /**
   * Handle `text-change` event
   */
  private handleTextChange = (): void => {
    // Get HTML content
    const htmlContent = this.editor.getSemanticHTML();
    this.value = htmlContent;

    // Emit the HTML content for form compatibility
    this.valueChange.emit(htmlContent);

    // Check validity but do not display the error message if the error message is already displayed
    this.checkValidity();
    if (this.hasDisplayedError) {
      this.setErrorMessage();
    }
  };

  /*************
   * Lifecycle *
   *************/

  /**
   * Check if component props are well configured on init
   * @returns timeout
   */
  componentWillLoad(): ReturnType<typeof setTimeout> {
    // Get locales
    this.messages = initLocales(this.element as unknown as HTMLElement).messages;
    this.element.style.setProperty('--mg-c-input-rich-text-editor-rows', this.rows.toString());
    // Validate
    this.validatePattern(this.pattern);
    this.validatePattern(this.patternErrorMessage);
    // Watch
    this.watchReadonly(this.readonly);
    this.watchDisabled(this.disabled);

    // Check validity when component is ready
    // return a promise to process action only in the FIRST render().
    // https://stenciljs.com/docs/component-lifecycle#componentwillload
    return setTimeout(() => {
      this.checkValidity();
    }, 0);
  }

  /**
   * add listeners and render editor element
   */
  componentDidLoad(): void {
    if (this.readonly) return;
    this.editor = defineEditor(this.wrapperElement, {
      theme: 'snow',
      modules: this.modules,
      readOnly: this.readonly || this.disabled,
      placeholder: this.placeholder,
      value: this.value,
      handleTextChange: this.handleTextChange,
      handleBlur: this.handleBlur,
      handleFocus: this.handleFocus,
    });
  }

  /**
   * Render
   * @returns HTML mg-input Element
   */
  render(): HTMLMgInputElement {
    return (
      <mg-input
        identifier={this.identifier}
        class={this.classCollection.join()}
        label={this.label}
        labelOnTop={this.labelOnTop}
        labelHide={this.labelHide}
        required={this.required}
        tooltip={this.tooltip}
        tooltipPosition={this.tooltipPosition}
        helpText={this.helpText}
        errorMessage={this.hasDisplayedError ? this.errorMessage : undefined}
      >
        {this.readonly ? (
          <div class="mg-c-input__readonly-value" innerHTML={this.value}></div>
        ) : (
          <div
            ref={el => {
              this.wrapperElement = el;
            }}
            id={this.identifier}
            class="mg-c-input__wrapper"
          >
            <div></div>
          </div>
        )}
      </mg-input>
    );
  }
}
