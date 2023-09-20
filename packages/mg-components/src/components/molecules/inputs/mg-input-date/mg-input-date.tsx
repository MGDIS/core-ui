import { Component, Element, Event, EventEmitter, h, Prop, State, Watch, Method } from '@stencil/core';
import { MgInput } from '../MgInput';
import { InputError } from './mg-input-date.conf';
import { ClassList } from '../../../../utils/components.utils';
import { localeDate, dateRegExp } from '../../../../utils/locale.utils';
import { initLocales } from '../../../../locales';

@Component({
  tag: 'mg-input-date',
  styleUrl: './mg-input-date.scss',
  shadow: true,
})
export class MgInputDate {
  /************
   * Internal *
   ************/

  // HTML selector
  private input: HTMLInputElement;

  // Locales
  private messages;
  private locale: string;

  // hasDisplayedError (triggered by blur event)
  private hasDisplayedError = false;

  /**************
   * Decorators *
   **************/

  /**
   * Get component DOM element
   */
  @Element() element: HTMLMgInputDateElement;

  /**
   * Component value
   */
  @Prop({ mutable: true, reflect: true }) value: string;
  @Watch('value')
  validateValue(newValue: string): void {
    // When the input is not fully completed or has been cleared, the value becomes an empty string.
    if (newValue === '') newValue = null;
    if (newValue !== undefined && newValue !== null && (typeof newValue !== 'string' || !dateRegExp.test(newValue))) {
      throw new Error("<mg-input-date> props 'value' doesn't match pattern: yyyy-mm-dd");
    } else {
      this.valueChange.emit(newValue);
    }
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
   * Add a tooltip message next to the input
   */
  @Prop() tooltip: string;

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
   * Define input minimum date
   * format: yyyy-mm-dd
   */
  @Prop() min: string;

  /**
   * Define input maximum date
   * format: yyyy-mm-dd
   */
  @Prop() max: string;
  @Watch('min')
  @Watch('max')
  validateMinMax(newValue: string): void {
    if (newValue?.length === 0 || (newValue?.length > 0 && !(typeof newValue === 'string' && dateRegExp.test(newValue)))) {
      throw new Error("<mg-input-date> props 'min/max' doesn't match pattern: yyyy-mm-dd");
    }
  }

  /**
   * Component classes
   */
  @State() classCollection: ClassList = new ClassList(['mg-input--date']);

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
  async setError(valid: MgInputDate['valid'], errorMessage: string): Promise<void> {
    if (typeof valid !== 'boolean') {
      throw new Error('<mg-input-date> method "setError()" param "valid" must be a boolean');
    } else if (typeof errorMessage !== 'string' || errorMessage.trim() === '') {
      throw new Error('<mg-input-date> method "setError()" param "errorMessage" must be a string');
    } else {
      this.setValidity(valid);
      this.setErrorMessage(errorMessage);
      this.hasDisplayedError = this.invalid;
    }
  }

  /**
   * Method to set validity values
   * @param newValue - valid new value
   */
  private setValidity(newValue: MgInputDate['valid']) {
    this.valid = newValue;
    this.invalid = !this.valid;
    // We need to send valid event even if it is the same value
    this.inputValid.emit(this.valid);
  }

  /**
   * Handle input event
   */
  private handleInput = (): void => {
    this.checkValidity();
    if (this.hasDisplayedError) {
      this.setErrorMessage();
    }
    this.value = this.input.value;
  };

  /**
   * Handle blur event
   */
  private handleBlur = (): void => {
    this.displayError();
  };

  /**
   * Check if input is valid
   */
  private checkValidity = (): void => {
    this.setValidity(this.readonly || this.disabled || (this.input?.checkValidity !== undefined ? this.input.checkValidity() : true));
  };

  /**
   * get input error code
   * @returns error code
   */
  private getInputError = (): null | InputError => {
    let inputError = null;

    // required
    if (this.input.validity.valueMissing) {
      inputError = InputError.REQUIRED;
    }
    // min & max
    else if ((this.input.validity.rangeUnderflow || this.input.validity.rangeOverflow) && this.min?.length > 0 && this.max?.length > 0) {
      inputError = InputError.MINMAX;
    }
    // min
    else if (this.input.validity.rangeUnderflow) {
      inputError = InputError.MIN;
    }
    //max
    else if (this.input.validity.rangeOverflow) {
      inputError = InputError.MAX;
    }

    return inputError;
  };

  /**
   * Check input errors
   * @param errorMessage - errorMessage override
   */
  private setErrorMessage = (errorMessage?: string): void => {
    // Set error message
    this.errorMessage = undefined;
    if (!this.valid) {
      const inputError = this.getInputError();
      if (errorMessage !== undefined) {
        this.errorMessage = errorMessage;
      }
      // required
      else if (inputError === InputError.REQUIRED) {
        this.errorMessage = this.messages.errors[inputError];
      }
      // min, max & minMax
      else if ([InputError.MIN, InputError.MAX, InputError.MINMAX].includes(inputError)) {
        this.errorMessage = this.messages.errors.date[inputError].replace('{min}', localeDate(this.min, this.locale)).replace('{max}', localeDate(this.max, this.locale));
      }
      // wrong date format
      // element.validity.badInput is default error message
      else {
        this.errorMessage = this.messages.errors.date.badInput.replace('{min}', this.min?.length > 0 ? localeDate(this.min, this.locale) : localeDate('1900-01-01', this.locale));
      }
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
    const locales = initLocales(this.element);
    this.locale = locales.locale;
    this.messages = locales.messages;
    // Validate
    this.validateValue(this.value);
    this.validateMinMax(this.min);
    this.validateMinMax(this.max);
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
        ariaDescribedbyIDs={[]}
        label={this.label}
        labelOnTop={this.labelOnTop}
        labelHide={this.labelHide}
        required={this.required}
        readonly={this.readonly}
        mgWidth={undefined}
        disabled={this.disabled}
        value={this.value}
        readonlyValue={localeDate(this.value, this.locale)}
        tooltip={this.tooltip}
        helpText={this.helpText}
        errorMessage={this.errorMessage}
        isFieldset={false}
      >
        <input
          type="date"
          class="mg-input__box"
          min={this.min}
          max={this.max}
          value={this.value}
          id={this.identifier}
          name={this.name}
          disabled={this.disabled}
          required={this.required}
          onInput={this.handleInput}
          onBlur={this.handleBlur}
          ref={(el: HTMLInputElement) => {
            if (el !== null) this.input = el;
          }}
        />
      </MgInput>
    );
  }
}
