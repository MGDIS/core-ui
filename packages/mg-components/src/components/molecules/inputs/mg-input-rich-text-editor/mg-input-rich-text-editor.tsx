import { Component, Element, h, Prop, Watch, State, Event, EventEmitter, Method } from '@stencil/core';
import { ClassList, isValidString, toString } from '@mgdis/stencil-helpers';
import { classReadonly, type TooltipPosition } from '../mg-input/mg-input.conf';
import { initLocales } from '../../../../locales';
import Quill from 'quill';

@Component({
  tag: 'mg-input-rich-text-editor',
  styleUrls: ['../../../../../node_modules/quill/dist/quill.snow.css', '../../../../../node_modules/@mgdis/styles/dist/components/mg-input-rich-text-editor.css'],
  shadow: true,
})
export class MgInputRichTextEditor {
  /************
   * Internal *
   ************/

  private quillEditor: Quill;
  private wrapperElement: HTMLDivElement;
  private editorElement: HTMLDivElement;
  // private toolbarElement: HTMLDivElement;

  private hasDisplayedError = false;

  private messages;

  /**************
   * Decorators *
   **************/

  /**
   * Get component DOM element
   */
  @Element() element: HTMLMgInputRichTextEditorElement;

  /**
   * Component classes
   */
  private classCollection: ClassList = new ClassList(['mg-c-input--rich-text-editor']);

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
   * Define the initial value of the editor
   */
  @Prop() value: string = '';

  /**
   * Input label
   */
  @Prop() label!: string;

  /**
   * Define if label is displayed on top
   */
  @Prop() labelOnTop?: boolean;

  /**
   * Define if label is visible
   */
  @Prop() labelHide = false;

  /**
   * Identifier is used for the element ID (id is a reserved prop in Stencil.js)
   */
  @Prop() identifier!: string;

  /**
   * Input placeholder.
   * It should be a word or short phrase that demonstrates the expected type of data, not a replacement for labels or help text.
   */
  @Prop() placeholder?: string;

  /**
   * Add a tooltip message next to the input
   */
  @Prop() tooltip?: string;

  /**
   * Define tooltip position
   */
  @Prop() tooltipPosition: TooltipPosition = 'input';

  /**
   * Define the number of visible text lines for the control
   */
  @Prop() rows = 3;

  /**
   * Add a help text under the input, usually expected data format and example
   */
  @Prop() helpText?: string;

  /**
   * Define input pattern to validate
   * Please refer to the Pattern section in the input documentation for detailed information on using regular expressions in components.
   */
  @Prop() pattern?: string;

  /**
   * Quill modules configuration
   */
  @Prop() modules?: Record<string, unknown>;
  private defaultModules = {
    toolbar: {
      container: [['bold', 'italic', 'underline'], [{ list: 'ordered' }, { list: 'bullet' }], ['link'], ['clean']],
    },
  };

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
   * Get pattern validity
   * @returns is pattern valid
   */
  private getPatternValidity = (): boolean => this.pattern === undefined || new RegExp(`^${this.pattern}$`, 'u').test(this.value);

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
    // Check if field is required and empty
    const isEmpty = this.value === undefined || this.value.trim() === '';
    const isValid = this.readonly || ((!this.required || !isEmpty) && this.getPatternValidity());
    this.setValidity(isValid);
  };

  /**
   * Set input error message
   * @param errorMessage - errorMessage override
   */
  private setErrorMessage = (errorMessage?: string): void => {
    this.errorMessage = undefined;
    if (!this.valid) {
      if (typeof errorMessage === 'string' && errorMessage.length > 0) {
        this.errorMessage = errorMessage;
      } else if (!this.getPatternValidity()) {
        this.errorMessage = this.patternErrorMessage;
      } else if (this.required && (this.value === undefined || this.value.trim() === '')) {
        this.errorMessage = this.messages.errors.required;
      }
    }
  };

  /**
   * Handles the blur event on the editor
   * Checks validity and displays error messages if necessary
   */
  private handleBlur = (): void => {
    if (!this.readonly) {
      this.checkValidity();
      this.setErrorMessage();
      if (!this.valid) {
        this.hasDisplayedError = true;
      }
    }
  };

  /**
   * Define input valid state
   */
  @Prop({ mutable: true }) valid: boolean;

  /**
   * Define input invalid state
   */
  @Prop({ mutable: true }) invalid: boolean;

  /**
   * Error message to display
   */
  @State() errorMessage: string;

  /**
   * Emited event when checking validity
   */
  @Event({ eventName: 'input-valid' }) inputValid: EventEmitter<boolean>;

  /**
   * Display input error if it exists.
   */
  @Method()
  async displayError(): Promise<void> {
    this.checkValidity();
    this.setErrorMessage();
    this.hasDisplayedError = this.invalid;
  }

  /*************
   * Lifecycle *
   *************/

  /**
   * Check if component props are well configured on init
   */
  componentWillLoad(): void {
    this.messages = initLocales(this.element).messages;
    this.element.style.setProperty('--mg-c-input-rich-text-editor-rows', this.rows.toString());

    if (!this.modules) {
      this.modules = this.defaultModules;
    }
  }

  componentDidLoad(): void {
    this.editorElement = document.createElement('div');
    this.wrapperElement.append(this.editorElement);

    this.quillEditor = new Quill(this.editorElement, {
      theme: 'snow',
      modules: this.modules,
      readOnly: this.readonly,
      placeholder: this.placeholder,
    });

    if (typeof this.value === 'string' && this.value.length > 0) {
      this.quillEditor.setContents([{ insert: this.value }, { insert: '\n' }]);
    }

    const editorContent = this.element.shadowRoot.querySelector('.ql-editor');
    editorContent?.addEventListener('blur', this.handleBlur);

    // Add an event listener for the text-change event
    this.quillEditor.on('text-change', () => {
      console.log('Text changed');
      this.value = this.quillEditor.getSemanticHTML();
      this.checkValidity();
      this.setErrorMessage();
    });
  }

  /**
   * Render
   * @returns HTML Element
   */
  render(): HTMLElement {
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
        <div ref={el => (this.wrapperElement = el)} id={this.identifier} class="mg-c-input__wrapper" />
      </mg-input>
    );
  }
}
