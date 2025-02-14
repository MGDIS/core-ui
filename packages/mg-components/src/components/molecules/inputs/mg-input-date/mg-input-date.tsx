import { Component, Element, Event, EventEmitter, h, Prop, State, Watch, Method } from '@stencil/core';
import { ClassList, isValidString, localeDate, dateRegExp, dateToString, getLocaleDatePattern, toString } from '@mgdis/stencil-helpers';
import { type InputDateError } from './mg-input-date.conf';
import { type EventType, classReadonly, type TooltipPosition, classDisabled } from '../mg-input/mg-input.conf';
import { initLocales } from '../../../../locales';

@Component({
  tag: 'mg-input-date',
  styleUrl: '../../../../../node_modules/@mgdis/styles/dist/components/mg-input-date.css',
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
  private systemLocale: string;

  // hasDisplayedError (triggered by blur event)
  private hasDisplayedError = false;
  private handlerInProgress: EventType;

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
  validateValue(newValue: MgInputDate['value']): void {
    // When the input is not fully completed or has been cleared, the value becomes an empty string.
    if (['', undefined].includes(newValue)) {
      // need to force value update to `null` to prevent extra render
      // - `''` is not a valide value
      // - `undefined` is not allowed in CustomEvent['detail']
      this.value = null;
    } else if (newValue && !isValidString(newValue)) {
      // check value validity
      throw new Error(`<mg-input-date> props 'value' must be a valid string. Passed value: ${toString(newValue)}.`);
    } else if (newValue === null || this.isValidPattern(newValue)) {
      this.valueChange.emit(newValue);
    } else {
      console.error("<mg-input-date> props 'value' doesn't match pattern: 'yyyy-mm-dd'.");
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
   * Define if input is required
   */
  @Prop() required = false;

  /**
   * Define if input is readonly
   */
  @Prop() readonly = false;
  @Watch('readonly')
  watchReadonly(newValue: MgInputDate['readonly']): void {
    if (newValue) this.classCollection.add(classReadonly);
    else this.classCollection.delete(classReadonly);
  }

  /**
   * Define input minimum date
   * format: yyyy-mm-dd
   */
  @Prop() min?: string;

  /**
   * Define input maximum date
   * format: yyyy-mm-dd
   */
  @Prop() max?: string = '9999-12-31';
  @Watch('min')
  @Watch('max')
  validateMinMax(newValue: string): void {
    if (newValue && !this.isValidPattern(newValue)) {
      throw new Error(`<mg-input-date> props 'min/max' doesn't match pattern: 'yyyy-mm-dd'. Passed value: ${toString(newValue)}.`);
    }
  }

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
  watchDisabled(newValue: MgInputDate['disabled']): void {
    if (newValue) this.classCollection.add(classDisabled);
    else this.classCollection.delete(classDisabled);
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
   * Available string variables:
   *  - `{pattern}`: render innerHTML pattern based on system
   *  - `{date}`: render innerText date with a pattern base format.
   *  - `{defaultHelpText}`: render default `helpText` usefull to concat helpText local with your custom text.
   * ex: `Input use {pattern} pattern` as `helpText` prop value will be render as `Input use mm/dd/yyyy pattern`
   */
  @Prop() helpText?: string;

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
  @State() classCollection: ClassList = new ClassList(['mg-c-input--date']);

  /**
   * Error message to display
   */
  @State() errorMessage: string;

  /**
   * Emited event when value change
   */
  @Event({ eventName: 'value-change' }) valueChange: EventEmitter<HTMLMgInputDateElement['value']>;

  /**
   * Emited event when checking validity
   */
  @Event({ eventName: 'input-valid' }) inputValid: EventEmitter<HTMLMgInputDateElement['valid']>;

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
  async setError(valid: MgInputDate['valid'], errorMessage: string): Promise<void> {
    if (typeof valid !== 'boolean') {
      throw new Error('<mg-input-date> method "setError()" param "valid" must be a boolean.');
    } else if (!isValidString(errorMessage)) {
      throw new Error('<mg-input-date> method "setError()" param "errorMessage" must be a string.');
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
      this.value = null;
      this.checkValidity();
      this.invalid = false;
      this.errorMessage = undefined;
      this.hasDisplayedError = false;
    }
  }

  /**
   * Method to validate date pattern string
   * @param value - value to test
   * @returns truthy when value match the pattern
   */
  private isValidPattern = (value: string): boolean => isValidString(value) && dateRegExp.test(value);

  /**
   * Format help text to display
   * @param helpText - help text format
   * @returns formated pattern help text. Ex: Format attendu : jj/mm/aaaa (ex : 20/12/2020)
   */
  private formatHelpText = (helpText: string): string => {
    const defaultHelpTextVariable = '{defaultHelpText}';
    let text = isValidString(helpText) ? helpText : this.messages.input.date.helpText;
    if (text.includes(defaultHelpTextVariable)) text = text.replace(defaultHelpTextVariable, this.formatHelpText(this.messages.input.date.helpText));

    return text.replace('{pattern}', this.renderPattern()).replace('{date}', localeDate(dateToString(new Date('2023-12-24')), this.systemLocale));
  };

  /**
   * Method to set validity values
   * @param newValue - valid new value
   */
  private setValidity(newValue: MgInputDate['valid']) {
    const oldValidValue = this.valid;
    this.valid = newValue;
    this.invalid = !this.valid;
    // We need to send valid event even if it is the same value
    if (this.handlerInProgress === undefined || (this.handlerInProgress === 'blur' && this.valid !== oldValidValue)) this.inputValid.emit(this.valid);
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
    this.handlerInProgress = 'blur';
    this.displayError().finally(() => {
      // reset guard
      this.handlerInProgress = undefined;
    });
  };

  /**
   * Handle keydown event
   * @param event - input keydown event
   */
  private handleKeyDown = (event: KeyboardEvent): void => {
    // bypass the native "Delete" action wich trigger an "input" event with "checkValidty() => false" with a falsy badInput = true,
    // when we reset the field we need to test a blank value.
    if (['Delete', 'Backspace'].includes(event.key)) {
      event.preventDefault();
      this.value = null;
      this.checkValidity();
      if (this.hasDisplayedError) {
        this.setErrorMessage();
      }
    }
  };

  /**
   * Check if input is valid
   */
  private checkValidity = (): void => {
    this.setValidity(this.readonly || this.disabled || (this.input.checkValidity() && (this.value === null || this.isValidPattern(this.value))));
  };

  /**
   * get input error code
   * @returns error code
   */
  private getInputError = (): null | InputDateError => {
    let inputError: InputDateError = null;

    // bad input or pattern
    if (this.input.validity.badInput || (this.value && !this.isValidPattern(this.value))) {
      inputError = 'badInput';
    }
    // required
    else if (this.input.validity.valueMissing) {
      inputError = 'required';
    }
    // min & max
    else if ((this.input.validity.rangeUnderflow || this.input.validity.rangeOverflow) && this.min?.length > 0 && this.max !== '9999-12-31') {
      inputError = 'minMax';
    }
    // min
    else if (this.input.validity.rangeUnderflow) {
      inputError = 'min';
    }
    // max
    else if (this.input.validity.rangeOverflow) {
      inputError = 'max';
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
      else if (inputError === 'required') {
        this.errorMessage = this.messages.errors[inputError];
      }
      // min, max & minMax
      else if (['min', 'max', 'minMax'].includes(inputError)) {
        this.errorMessage = this.messages.errors.date[inputError]
          .replace('{min}', localeDate(this.min, this.systemLocale))
          .replace('{max}', localeDate(this.max, this.systemLocale));
      }
      // wrong date format
      // element.validity.badInput is default error message
      else {
        this.errorMessage = this.messages.errors.date.badInput.replace('{pattern}', this.renderPattern());
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

    // as a native input use the OS locale to define the date pattern
    // we need to get this locale to define the displayed pattern
    this.systemLocale = Intl.DateTimeFormat().resolvedOptions().locale;

    // Validate
    this.validateValue(this.value);
    this.validateMinMax(this.min);
    this.validateMinMax(this.max);
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
   * Render pattern
   * @returns translated html pattern
   */
  private renderPattern = (): string => {
    let patternLocal = getLocaleDatePattern(this.systemLocale);
    for (const key in this.messages.input.date.pattern) {
      patternLocal = patternLocal.replace(key, this.messages.input.date.pattern[key]);
    }

    return `<span aria-hidden="true">${patternLocal}</span><span class="mg-u-visually-hidden">${[...patternLocal].join(' ')}</span>`;
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
        ariaDescribedbyIDs={[]}
        labelOnTop={this.labelOnTop}
        labelHide={this.labelHide}
        required={this.required}
        tooltip={this.tooltip}
        tooltipPosition={this.readonly && this.value === null ? 'label' : this.tooltipPosition}
        helpText={this.formatHelpText(this.helpText)}
        errorMessage={this.errorMessage}
      >
        {this.readonly ? (
          this.value && <b class="mg-c-input__readonly-value">{localeDate(this.value, this.locale)}</b>
        ) : (
          <input
            type="date"
            class="mg-c-input__box"
            min={this.min}
            max={this.max}
            value={this.value}
            id={this.identifier}
            name={this.name}
            disabled={this.disabled}
            required={this.required}
            aria-invalid={(this.invalid === true).toString()}
            onInput={this.handleInput}
            onBlur={this.handleBlur}
            onKeyDown={this.handleKeyDown}
            ref={(el: HTMLInputElement) => {
              if (el !== null) this.input = el;
            }}
          />
        )}
      </mg-input>
    );
  }
}
