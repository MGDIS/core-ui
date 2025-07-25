import { Component, Element, Event, h, Prop, EventEmitter, State, Watch, Method } from '@stencil/core';
import { ClassList, isValidString, toString } from '@mgdis/core-ui-helpers/dist/utils';
import { localeCurrency, localeNumber, localePercent, localeUnit } from '@mgdis/core-ui-helpers/dist/locale';
import { types, type InputNumericError, type NumericType, type Format, formats } from './mg-input-numeric.conf';
import { type TooltipPosition, type Width, type EventType, classReadonly, classDisabled, widths } from '../mg-input/mg-input.conf';
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
  private handlerInProgress: EventType;

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
      // Check if integer value starts with '0' (leading zero)
      if (newValue.startsWith('0') && parseInt(newValue, 10) > 0) {
        // Remove leading zero
        newValue = newValue.substring(1);
      }
      // Split number and decimal
      const [integer, decimal = ''] = newValue.replace('-', '').split(/[.,]/);
      // Regex
      const regex = this.type === 'integer' ? /^(?!-?0\d)-?\d+$/ : /^(?!-?0\d)-?\d+(?:[.,]\d*)?$/;
      // Filter input
      if (this.isValidValue(newValue, regex, integer, decimal)) {
        this.storedValue = newValue;
      } else {
        newValue = this.storedValue ?? null;
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
    if (newValue !== undefined) this.classCollection.add(`mg-c-input--width-${this.mgWidth}`);
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
      throw new Error(`<mg-input-numeric> prop "type" must be one of: ${types.join(', ')}. Passed value: ${toString(newValue)}.`);
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
      throw new Error(`<mg-input-numeric> prop "format" must be one of: ${formats.join(', ')}. Passed value: ${toString(newValue)}.`);
    }
  }

  /**
   * Define currency
   */
  @Prop() currency = 'EUR';

  /**
   * Define unit symbol (km, L, etc.)
   */
  @Prop() unit?: Intl.NumberFormatOptions['unit'];

  /**
   * Define unit display format ('short', 'long', 'narrow')
   */
  @Prop() unitDisplay: Intl.NumberFormatOptions['unitDisplay'] = 'short';

  /**
   * Override integer length
   * integer is the number before the decimal point
   */
  @Prop() integerLength = 13;
  @Watch('integerLength')
  validateIntegerLength(newValue: MgInputNumeric['integerLength']): void {
    if (newValue < 1) {
      throw new Error(`<mg-input-numeric> prop "integer-length" must be a positive number. Passed value: ${toString(newValue)}.`);
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
      throw new Error(`<mg-input-numeric> prop "decimal-length" must be a positive number, consider using prop "type" to "integer" instead. Passed value: ${toString(newValue)}.`);
    }
  }

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
   * Set focus on input.
   */
  @Method()
  async setFocus(): Promise<void> {
    this.input?.focus();
  }

  /**
   * Display input error if it exists.
   */
  @Method()
  displayError(): Promise<void> {
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
  async setError(valid: MgInputNumeric['valid'], errorMessage: string): Promise<void> {
    if (typeof valid !== 'boolean') {
      throw new Error('<mg-input-numeric> method "setError()" param "valid" must be a boolean.');
    } else if (!isValidString(errorMessage)) {
      throw new Error('<mg-input-numeric> method "setError()" param "errorMessage" must be a string.');
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
      // Use `Promise` as requested for stencil method
      // Use `requestAnimationFrame` to ensure:
      // - DOM is fully updated before validation
      // - Async operations are completed
      // - No timing issues with Stencil's render cycle
      // - Keep everything in sync both inside and outside the component
      return new Promise(resolve => {
        requestAnimationFrame(() => {
          this.checkValidity();
          this.errorMessage = undefined;
          this.hasDisplayedError = false;
          resolve();
        });
      });
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
    if (this.handlerInProgress === undefined || (this.handlerInProgress === 'blur' && this.valid !== oldValidValue)) this.inputValid.emit(this.valid);
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
   * Updates the component values based on the validated input value.
   * @param newValue - The validated input value.
   */
  private updateValues(newValue: string | null): void {
    this.value = newValue;

    if (this.input !== undefined) {
      this.input.value = this.value;
    }

    this.numericValue = !['', null].includes(this.value) && !isNaN(parseFloat(this.value)) ? parseFloat(this.value.replace(',', '.')) : null;

    if (newValue === null || (newValue === this.storedValue && !Object.is(this.numericValue, -0))) {
      this.valueChange.emit(this.numericValue);
    }

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
    this.value = this.input.value;
    // Check validity
    this.checkValidity();
    if (this.hasDisplayedError) {
      this.setErrorMessage();
    }
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
    this.handlerInProgress = 'blur';
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
   * Format min/max value for error message
   * @param value - value to format
   * @returns formatted value according to locale
   */
  private formatErrorValue = (value: number): string => localeNumber(value, this.locale, !Number.isInteger(value) && this.type === 'decimal' ? this.decimalLength : 0);

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
      } else if (inputError === 'required') {
        this.errorMessage = this.messages.errors[inputError];
      } else {
        const formattedMin = this.formatErrorValue(this.min);
        const formattedMax = this.formatErrorValue(this.max);
        this.errorMessage = this.messages.input.numeric.helpText[inputError].replace('{min}', formattedMin).replace('{max}', formattedMax);
      }
    }
  };

  /**
   * Get input error code
   * @returns error code
   */
  private getInputError = (): null | InputNumericError => {
    const hasNotEmptyValues = (toControl: number[]) => !toControl.some(value => [null, undefined].includes(value));

    // required
    if (!this.input.checkValidity() && this.input.validity.valueMissing) {
      return 'required';
    }

    // Only a min value is set
    if (hasNotEmptyValues([this.min, this.numericValue]) && this.numericValue < this.min && this.max === undefined) {
      return 'min';
    }

    // Only a max value is set
    if (hasNotEmptyValues([this.max, this.numericValue]) && this.numericValue > this.max && this.min === undefined) {
      return 'max';
    }

    // both min and max values are set
    if (hasNotEmptyValues([this.min, this.max, this.numericValue]) && (this.numericValue < this.min || this.numericValue > this.max)) {
      return 'minMax';
    }

    return null;
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
      case 'percent':
        return localePercent(value / 100, this.locale, this.type === 'decimal' ? this.decimalLength : undefined);
      case 'unit':
        return localeUnit(value, this.locale, this.unit, this.unitDisplay, this.type === 'decimal' ? this.decimalLength : undefined);
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

  /**
   * Format help text to display
   * @param helpText - help text format
   * @returns formatted help text with range information if applicable
   */
  private formatHelpText = (helpText: string): string => {
    // If the component is in readonly mode, return undefined because the message will not be rendered
    if (this.readonly) {
      return undefined;
    }

    // If a custom helpText is provided, store it but don't return it directly
    const text = isValidString(helpText) ? helpText : undefined;

    // If neither min nor max are defined, and there's no custom helpText,
    // we can return undefined as there's no message to display
    if (this.min === undefined && this.max === undefined && text === undefined) {
      return undefined;
    }

    // Generate range message based on available constraints
    let rangeMessage: string;
    if (this.min !== undefined && this.max !== undefined) {
      rangeMessage = this.messages.input.numeric.helpText.minMax.replace('{min}', this.formatErrorValue(this.min)).replace('{max}', this.formatErrorValue(this.max));
    } else if (this.min !== undefined) {
      rangeMessage = this.messages.input.numeric.helpText.min.replace('{min}', this.formatErrorValue(this.min));
    } else if (this.max !== undefined) {
      rangeMessage = this.messages.input.numeric.helpText.max.replace('{max}', this.formatErrorValue(this.max));
    }

    // Combine custom helpText with range message if both exist
    if (text !== undefined && rangeMessage !== undefined) {
      return `${text}<br>${rangeMessage}`;
    }

    // Return either custom helpText or range message
    return text || rangeMessage;
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
   * Renders the readonly content of the input component.
   * @returns The readonly content element.
   */
  private renderReadonly = (): HTMLElement => {
    return this.slotContent !== undefined ? (
      <span class="mg-c-input__readonly-value">
        <b>{this.readonlyValue}</b>
        {this.slotContent}
      </span>
    ) : (
      <b class="mg-c-input__readonly-value">{this.readonlyValue}</b>
    );
  };

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
        labelOnTop={this.labelOnTop}
        labelHide={this.labelHide}
        required={this.required}
        tooltip={this.tooltip}
        tooltipPosition={this.readonly && this.value === undefined ? 'label' : this.tooltipPosition}
        helpText={this.formatHelpText(this.helpText)}
        errorMessage={this.errorMessage}
      >
        {this.readonly
          ? this.readonlyValue && this.renderReadonly()
          : [
              <input
                key="input"
                type="text"
                class="mg-c-input__box mg-c-input__box--width"
                value={this.displayValue()}
                id={this.identifier}
                name={this.name}
                placeholder={this.placeholder}
                title={this.placeholder}
                disabled={this.disabled}
                required={this.required}
                autocomplete="off"
                aria-invalid={(this.invalid === true).toString()}
                onInput={this.handleInput}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                ref={(el: HTMLInputElement) => {
                  if (el !== null) this.input = el;
                }}
              />,
              <slot key="slot" name="append-input"></slot>,
            ]}
      </mg-input>
    );
  }
}
