import { Component, Element, Event, h, Prop, EventEmitter, State, Method, Watch } from '@stencil/core';
import { MgInput } from '../MgInput';
import { Width } from '../MgInput.conf';
import { ClassList } from '../../../../utils/components.utils';
import { initLocales } from '../../../../locales';

@Component({
  tag: 'mg-input-textarea',
  styleUrl: 'mg-input-textarea.scss',
  shadow: true,
})
export class MgInputTextarea {
  /************
   * Internal *
   ************/

  // Classes
  private classFocus = 'is-focused';
  private classHasDisplayCharacterLeft = 'mg-input--has-display-character-left';

  // IDs
  private characterLeftId;

  // HTML selector
  private input: HTMLTextAreaElement;

  // Locales
  private messages;

  // hasDisplayedError (triggered by blur event)
  private hasDisplayedError = false;

  /**************
   * Decorators *
   **************/

  /**
   * Get component DOM element
   */
  @Element() element: HTMLMgInputTextareaElement;

  /**
   * Component value
   */
  @Prop({ mutable: true, reflect: true }) value: string;
  @Watch('value')
  handleValue(newValue: string): void {
    this.checkValidity();
    this.valueChange.emit(newValue);
  }

  /**
   * Identifier is used for the element ID (id is a reserved prop in Stencil.js)
   */
  @Prop() identifier!: string;

  /**
   * Input name
   * If not set the value equals the identifier
   */
  @Prop() name: string = this.identifier;

  /**
   * Input label
   */
  @Prop() label!: string;

  /**
   * Define if label is displayed on top
   */
  @Prop() labelOnTop: boolean;

  /**
   * Define if label is visible
   */
  @Prop() labelHide = false;

  /**
   * Input placeholder.
   * It should be a word or short phrase that demonstrates the expected type of data, not a replacement for labels or help text.
   */
  @Prop() placeholder: string;

  /**
   * Input max length
   */
  @Prop() maxlength = 4000;

  /**
   * Define if input is required
   */
  @Prop() required = false;

  /**
   * Define if input is readonly
   */
  @Prop() readonly = false;

  /**
   * Define if input is disabled
   */
  @Prop() disabled = false;
  @Watch('required')
  @Watch('readonly')
  @Watch('disabled')
  handleValidityChange(newValue: boolean, _oldValue: boolean, prop: string): void {
    if (this.input !== undefined) {
      this.input[prop] = newValue;
      this.checkValidity();
      if (this.hasDisplayedError) {
        this.setErrorMessage();
        this.hasDisplayedError = false;
      }
    }
  }

  /**
   * Define input width
   */
  @Prop() mgWidth: Width = 'full';

  /**
   * Define input pattern to validate
   */
  @Prop() pattern: string;

  /**
   * Define input pattern error message
   */
  @Prop() patternErrorMessage: string;

  /**
   * Define the number of visible text lines for the control
   */
  @Prop() rows = 3;

  /**
   * Add a tooltip message next to the input
   */
  @Prop() tooltip: string;

  /**
   * Define if component should display character left
   */
  @Prop() displayCharacterLeft = true;
  @Watch('displayCharacterLeft')
  validateDisplayCharacterLeft(newValue: boolean): void {
    if (newValue) {
      this.classCollection.add(this.classHasDisplayCharacterLeft);
    } else {
      this.classCollection.delete(this.classHasDisplayCharacterLeft);
    }
  }

  /**
   * Add a help text under the input, usually expected data format and example
   */
  @Prop() helpText: string;

  /**
   * Define input valid state
   */
  @Prop({ mutable: true }) valid: boolean;

  /**
   * Define input invalid state
   */
  @Prop({ mutable: true }) invalid: boolean;

  /**
   * Define if input is resizable
   */
  @Prop() resizable: 'none' | 'both' | 'horizontal' | 'vertical' = 'none';

  /**
   * Component classes
   */
  @State() classCollection: ClassList = new ClassList(['mg-input--textarea']);

  /**
   * Error message to display
   */
  @State() errorMessage: string;

  /**
   * Emited event when value change
   */
  @Event({ eventName: 'value-change' }) valueChange: EventEmitter<string>;

  /**
   * Emited event when checking validity
   */
  @Event({ eventName: 'input-valid' }) inputValid: EventEmitter<boolean>;

  /**
   * Public method to display errors
   */
  @Method()
  async displayError(): Promise<void> {
    this.checkValidity();
    this.setErrorMessage();
    this.hasDisplayedError = this.invalid;
  }

  /**
   * Public method to set error and display custom error message
   * @param valid - valid value
   * @param errorMessage - error message to display
   */
  @Method()
  async setError(valid: MgInputTextarea['valid'], errorMessage: string): Promise<void> {
    if (typeof valid !== 'boolean') {
      throw new Error('<mg-input-textarea> method "setError()" param "valid" must be a boolean');
    } else if (typeof errorMessage !== 'string' || errorMessage.trim() === '') {
      throw new Error('<mg-input-textarea> method "setError()" param "errorMessage" must be a string');
    } else {
      this.setValidity(valid);
      this.setErrorMessage(valid ? undefined : errorMessage);
      this.hasDisplayedError = this.invalid;
    }
  }

  /**
   * Method to set validity values
   * @param newValue - valid new value
   */
  private setValidity(newValue: MgInputTextarea['valid']) {
    this.valid = newValue;
    this.invalid = !this.valid;
    // We need to send valid event even if it is the same value
    this.inputValid.emit(this.valid);
  }
  /**
   * Handle input event
   */
  private handleInput = (): void => {
    if (this.hasDisplayedError) {
      this.checkValidity();
      this.setErrorMessage();
    }
    this.value = this.input.value;
  };

  /**
   * Handle focus event
   */
  private handleFocus = (): void => {
    this.classCollection.add(this.classFocus);
    this.classCollection = new ClassList(this.classCollection.classes);
  };

  /**
   * Handle blur event
   */
  private handleBlur = (): void => {
    // Manage focus
    this.classCollection.delete(this.classFocus);
    this.classCollection = new ClassList(this.classCollection.classes);
    // Display Error
    this.displayError();
  };

  /**
   * Get pattern validity
   * Pattern is not defined on textarea field: https://developer.mozilla.org/fr/docs/Web/HTML/Element/Textarea
   * @returns is pattern valid
   */
  private getPatternValidity = (): boolean => this.pattern === undefined || new RegExp(`^${this.pattern}$`, 'u').test(this.value);

  /**
   * Check if input is valid
   */
  private checkValidity = (): void => {
    this.setValidity(this.readonly || this.disabled || (this.input?.checkValidity !== undefined && this.input.checkValidity() && this.getPatternValidity()));
  };

  /**
   * Set input error message
   * @param errorMessage - errorMessage override
   */
  private setErrorMessage = (errorMessage?: string): void => {
    // Set error message
    this.errorMessage = undefined;
    // Does not match pattern
    if (!this.valid) {
      if (errorMessage !== undefined) {
        this.errorMessage = errorMessage;
      } else if (!this.getPatternValidity()) {
        this.errorMessage = this.patternErrorMessage;
      }
      // required
      else if (this.input.validity.valueMissing) {
        this.errorMessage = this.messages.errors.required;
      }
    }
  };

  /**
   * Validate pattern configuration
   */
  private validatePattern = (): void => {
    if (
      this.pattern !== undefined &&
      typeof this.pattern === 'string' &&
      this.pattern !== '' &&
      (this.patternErrorMessage === undefined || typeof this.patternErrorMessage !== 'string' || this.patternErrorMessage === '')
    ) {
      throw new Error('<mg-input-textarea> prop "pattern" must be paired with the prop "patternErrorMessage"');
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
    this.messages = initLocales(this.element).messages;
    this.characterLeftId = `${this.identifier}-character-left`;
    // Validate
    this.validateDisplayCharacterLeft(this.displayCharacterLeft);
    this.validatePattern();
    // Check validity when component is ready
    // return a promise to process action only in the FIRST render().
    // https://stenciljs.com/docs/component-lifecycle#componentwillload
    return setTimeout(() => {
      this.checkValidity();
    }, 0);
  }

  /**
   * Render
   * @returns HTML Element
   */
  render(): HTMLElement {
    return (
      <MgInput
        identifier={this.identifier}
        classCollection={this.classCollection}
        ariaDescribedbyIDs={[this.characterLeftId]}
        label={this.label}
        labelOnTop={this.labelOnTop}
        labelHide={this.labelHide}
        required={this.required}
        readonly={this.readonly}
        mgWidth={this.mgWidth}
        disabled={this.disabled}
        value={this.value}
        readonlyValue={undefined}
        tooltip={this.tooltip}
        helpText={this.helpText}
        errorMessage={this.errorMessage}
        isFieldset={false}
      >
        <div class="mg-input__with-character-left">
          <textarea
            class={{
              'mg-input__box': true,
              'mg-input__box--resizable': this.resizable === 'both',
              'mg-input__box--resizable-horizontal': this.resizable === 'horizontal',
              'mg-input__box--resizable-vertical': this.resizable === 'vertical',
            }}
            value={this.value}
            id={this.identifier}
            name={this.name}
            placeholder={this.placeholder}
            title={this.placeholder}
            rows={this.rows}
            maxlength={this.maxlength}
            disabled={this.disabled}
            required={this.required}
            onInput={this.handleInput}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            ref={(el: HTMLTextAreaElement) => {
              if (el !== null) this.input = el;
            }}
          ></textarea>
          {this.displayCharacterLeft && this.maxlength > 0 && (
            <mg-character-left identifier={this.characterLeftId} characters={this.value} maxlength={this.maxlength}></mg-character-left>
          )}
        </div>
      </MgInput>
    );
  }
}
