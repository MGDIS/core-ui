import { Component, Element, Event, h, Prop, EventEmitter, State, Watch, Method } from '@stencil/core';
import { ClassList, isValidString, localeCurrency, localeNumber } from '@mgdis/stencil-helpers';
import { types, InputError, type NumericType, type Format, formats } from './mg-input-numeric.conf';
import { type TooltipPosition, type Width, Handler, classReadonly, classDisabled, widths } from '../mg-input/mg-input.conf';
import { initLocales } from '../../../../locales/';

/**
 * @slot append-input - Content to display next to the input
 */
@Component({
  tag: 'mg-input-numeric',
  styleUrl: '../../../../../node_modules/@mgdis/styles/dist/components/mg-input-numeric.css',
  shadow: true,
})
export class MgInputNumeric {
  /************
   * Internal *
   ************/

  // Manage different values
  private storedValue: string;
  private numericValue: number;
  private readonlyValue: string;
  private slotContent: string;

  // HTML selector
  private input: HTMLInputElement;

  // Locales
  private locale: string;
  private messages;

  // hasDisplayedError (triggered by blur event)
  private hasDisplayedError = false;
  private handlerInProgress: Handler;

  /**************
   * Decorators *
   **************/

  /**
   * Get component DOM element
   */
  @Element() element: HTMLMgInputNumericElement;

  /**
   * Component value
   */
  @Prop({ mutable: true, reflect: true }) value: string;
  @Watch('value')
  validateValue(newValue: MgInputNumeric['value']): void {
    // has input value is always render as string we get a stringified value or a '' for nullish value, so we test string type
    if (typeof newValue === 'string') {
      // Split number and decimal
      const [integer, decimal = ''] = newValue.replace('-', '').split(/[.,]/);
      // Regex
      const regex = this.type === 'integer' ? /^-?\d+$/ : /^-?\d+(?:[.,]\d*)?$/;
      // Filter input
      if (this.isValidValue(newValue, regex, integer, decimal)) {
        this.storedValue = newValue;
      } else {
        newValue = this.handleInvalidValue();
      }
      // Set value and input value
      this.updateValues(newValue);
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
  @Prop() labelOnTop?: boolean;

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
   * Define if input is required
   */
  @Prop() required = false;

  /**
   * Define if input is readonly
   */
  @Prop() readonly = false;
  @Watch('readonly')
  watchReadonly(newValue: MgInputNumeric['readonly']): void {
    if (newValue) this.classCollection.add(classReadonly);
    else this.classCollection.delete(classReadonly);
  }

  /**
   * Maximum value
   */
  @Prop() max?: number;

  /**
   * Minimum value
   */
  @Prop() min?: number;

  /**
   * Define if input is disabled
   */
  @Prop() disabled = false;
  @Watch('required')
  @Watch('readonly')
  @Watch('disabled')
  @Watch('min')
  @Watch('max')
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

  @Watch('disabled')
  watchDisabled(newValue: MgInputNumeric['disabled']): void {
    if (newValue) this.classCollection.add(classDisabled);
    else this.classCollection.delete(classDisabled);
  }

  /**
   * Define input width
   */
  @Prop() mgWidth?: Width;
  @Watch('mgWidth')
  watchMgWidth(newValue: MgInputNumeric['mgWidth']): void {
    // reset width class
    widths.forEach(width => {
      this.classCollection.delete(`mg-c-input--width-${width}`);
    });

    // apply new width
    if (newValue) this.classCollection.add(`mg-c-input--width-${this.mgWidth}`);
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
   * Define numeric type
   */
  @Prop() type: NumericType = 'decimal';
  @Watch('type')
  validateType(newValue: MgInputNumeric['type']): void {
    if (!types.includes(newValue)) {
      throw new Error(`<mg-input-numeric> prop "type" must be one of: ${types.join(', ')}`);
    }
  }

  /**
   * Set local formatting.
   * Numbers are formatted based on the locale.
   */
  @Prop() format: Format = 'number';
  @Watch('format')
  watchFormat(newValue: MgInputNumeric['format']): void {
    if (!formats.includes(newValue)) {
      throw new Error(`<mg-input-numeric> prop "format" must be one of: ${formats.join(', ')}`);
    }
  }

  /**
   * Define currency
   */
  @Prop() currency = 'USD';

  /**
   * Override integer length
   * integer is the number before the decimal point
   */
  @Prop() integerLength = 13;
  @Watch('integerLength')
  validateIntegerLength(newValue: MgInputNumeric['integerLength']): void {
    if (newValue < 1) {
      throw new Error(`<mg-input-numeric> prop "integer-length" must be a positive number.`);
    }
  }

  /**
   * Override decimal length
   * decimal is the number after the decimal point
   */
  @Prop() decimalLength = 2;
  @Watch('decimalLength')
  validateDecimalLength(newValue: MgInputNumeric['decimalLength']): void {
    if (newValue < 1) {
      throw new Error(`<mg-input-numeric> prop "decimal-length" must be a positive number, consider using prop "type" to "integer" instead.`);
    }
  }

  /**
   * Define input pattern to validate
   */
  @Prop({ mutable: true }) valid: boolean;

  /**
   * Define input pattern error message
   */
  @Prop({ mutable: true }) invalid: boolean;

  /**
   * Component classes
   */
  @State() classCollection: ClassList = new ClassList(['mg-c-input--numeric']);

  /**
   * Error message to display
   */
  @State() errorMessage: string;

  /**
   * Define if input has focus
   */
  @State() hasFocus: boolean;

  /**
   * Emited event when value change
   */
  @Event({ eventName: 'value-change' }) valueChange: EventEmitter<number>;

  /**
   * Emited event when checking validity
   */
  @Event({ eventName: 'input-valid' }) inputValid: EventEmitter<HTMLMgInputNumericElement['valid']>;

  /**
   * Display input error if it exists.
   */
  @Method()
  async displayError(): Promise<void> {
    this.checkValidity();
    this.setErrorMessage();
    this.hasDisplayedError = this.invalid;
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
  async setError(valid: MgInputNumeric['valid'], errorMessage: string): Promise<void> {
    if (typeof valid !== 'boolean') {
      throw new Error('<mg-input-numeric> method "setError()" param "valid" must be a boolean');
    } else if (!isValidString(errorMessage)) {
      throw new Error('<mg-input-numeric> method "setError()" param "errorMessage" must be a string');
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
  private setValidity(newValue: MgInputNumeric['valid']) {
    const oldValidValue = this.valid;
    this.valid = newValue;
    this.invalid = !this.valid;
    // We need to send valid event even if it is the same value
    if (this.handlerInProgress === undefined || (this.handlerInProgress === Handler.BLUR && this.valid !== oldValidValue)) this.inputValid.emit(this.valid);
  }

  /**
   * Checks if the given value is valid according to the defined rules.
   * @param value - The input value to validate.
   * @param regex - The regular expression for validation.
   * @param integer - The integer part of the value.
   * @param decimal - The decimal part of the value.
   * @returns Returns true if the value is valid, otherwise false.
   */
  private isValidValue(value: string, regex: RegExp, integer: string, decimal: string): boolean {
    return (
      ['', '-'].includes(value) || (regex.exec(value) !== null && integer.length <= this.integerLength && decimal.length <= (this.type === 'integer' ? 0 : this.decimalLength))
    );
  }

  /**
   * Handles invalid input values and returns a corrected value.
   * @returns The corrected value.
   */
  private handleInvalidValue(): string | null {
    return this.storedValue ?? null;
  }

  /**
   * Updates the component values based on the validated input value.
   * @param newValue - The validated input value.
   */
  private updateValues(newValue: string | null): void {
    this.value = newValue;
    if (this.input !== undefined) this.input.value = this.value;

    this.numericValue = !['', null].includes(this.value) ? parseFloat(this.value.replace(',', '.')) : null;
    this.valueChange.emit(this.numericValue);

    this.readonlyValue = this.numericValue !== null ? this.formatValue(this.numericValue) : '';
  }

  /**
   * Displayed value in input
   * Change on focus/blur
   * @returns display value
   */
  private displayValue(): MgInputNumeric['value'] | MgInputNumeric['readonlyValue'] {
    return this.hasFocus ? this.value : this.readonlyValue;
  }

  /**
   * Handle input event
   */
  private handleInput = (): void => {
    // Check validity
    this.checkValidity();
    if (this.hasDisplayedError) {
      this.setErrorMessage();
    }
    this.value = this.input.value;
  };

  /**
   * Handle focus event
   */
  private handleFocus = (): void => {
    this.hasFocus = true;
  };

  /**
   * Handle blur event
   */
  private handleBlur = (): void => {
    if (this.value === '-') this.value = '';
    // Display Error
    this.handlerInProgress = Handler.BLUR;
    this.displayError().finally(() => {
      // reset guard
      this.handlerInProgress = undefined;
      this.hasFocus = false;
    });
  };

  /**
   * Check if input is valid
   */
  private checkValidity = (): void => {
    this.setValidity(this.readonly || this.disabled || this.getInputError() === null);
  };

  /**
   * Set input error message
   * @param errorMessage - errorMessage override
   */
  private setErrorMessage = (errorMessage?: string): void => {
    // Set error message
    this.errorMessage = undefined;
    if (!this.valid) {
      const inputError = this.getInputError();
      if (errorMessage !== undefined) {
        this.errorMessage = errorMessage;
      } else if (inputError === InputError.REQUIRED) {
        this.errorMessage = this.messages.errors[inputError];
      } else {
        this.errorMessage = this.messages.errors.numeric[inputError].replace('{min}', `${this.formatValue(this.min)}`).replace('{max}', `${this.formatValue(this.max)}`);
      }
    }
  };

  /**
   * Get input error code
   * @returns error code
   */
  private getInputError = (): null | InputError => {
    let inputError = null;
    const hasNotEmptyValues = (toControl: number[]) => !toControl.some(value => [null, undefined].includes(value));

    // required
    if (!this.input.checkValidity() && this.input.validity.valueMissing) {
      inputError = InputError.REQUIRED;
    }
    // Min & Max
    else if (hasNotEmptyValues([this.min, this.numericValue]) && this.numericValue < this.min && this.max === undefined) {
      // Only a min value is set
      inputError = InputError.MIN;
    } else if (hasNotEmptyValues([this.max, this.numericValue]) && this.numericValue > this.max && this.min === undefined) {
      // Only a max value is set
      inputError = InputError.MAX;
    } else if (hasNotEmptyValues([this.min, this.max, this.numericValue]) && (this.numericValue < this.min || this.numericValue > this.max)) {
      // both min and max values are set
      inputError = InputError.MINMAX;
    }
    return inputError;
  };

  /**
   * Format value based on type
   * @param value - value to format
   * @returns formated local value
   */
  private formatValue = (value: number): string => {
    switch (this.format) {
      case 'number':
        return localeNumber(value, this.locale, this.type === 'decimal' ? this.decimalLength : undefined);
      case 'currency':
        return localeCurrency(value, this.locale, this.currency);
      case 'none':
        return value.toString();
    }
  };

  /**
   * Validate append slot
   */
  private validateAppendSlot = (): void => {
    const slotAppendInput: HTMLSlotElement = this.element.querySelector('[slot="append-input"]');
    if (slotAppendInput !== null) {
      if (slotAppendInput.nodeName === 'MG-BUTTON') {
        this.classCollection.add('mg-c-input--is-input-group-append');
      } else {
        this.classCollection.add('mg-c-input--is-append-input-slot-content');
        this.slotContent = slotAppendInput.textContent;
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
    // Validate component config
    this.watchFormat(this.format);
    this.validateType(this.type);
    this.validateIntegerLength(this.integerLength);
    this.validateDecimalLength(this.decimalLength);
    // validate value
    this.validateValue(this.value);
    this.validateAppendSlot();
    this.watchReadonly(this.readonly);
    this.watchDisabled(this.disabled);
    this.watchMgWidth(this.mgWidth);
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
      <mg-input
        label={this.label}
        identifier={this.identifier}
        class={this.classCollection.join()}
        ariaDescribedbyIDs={[]}
        labelOnTop={this.labelOnTop}
        labelHide={this.labelHide}
        required={this.required}
        tooltip={this.tooltip}
        tooltipPosition={this.tooltipPosition}
        helpText={this.helpText}
        errorMessage={this.errorMessage}
      >
        {this.readonly
          ? this.readonlyValue && [<b>{this.readonlyValue}</b>, this.slotContent !== undefined ? this.slotContent : '']
          : [
              <input
                type="text"
                class="mg-c-input__box mg-c-input__box--width"
                value={this.displayValue()}
                id={this.identifier}
                name={this.name}
                placeholder={this.placeholder}
                title={this.placeholder}
                disabled={this.disabled}
                required={this.required}
                aria-invalid={(this.invalid === true).toString()}
                onInput={this.handleInput}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                ref={(el: HTMLInputElement) => {
                  if (el !== null) this.input = el;
                }}
              />,
              <slot name="append-input"></slot>,
            ]}
      </mg-input>
    );
  }
}
