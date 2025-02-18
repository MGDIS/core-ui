import { Component, Element, Event, h, Prop, EventEmitter, State, Watch, Method } from '@stencil/core';
import { ClassList, allItemsAreString, isValidString, toString } from '@mgdis/stencil-helpers';
import { RadioOption } from './mg-input-radio.conf';
import { type EventType, classReadonly, type TooltipPosition, classDisabled, classFieldset } from '../mg-input/mg-input.conf';
import { initLocales } from '../../../../locales';

/**
 * type Option validation function
 * @param option - radio option
 * @returns radio option type is valid
 */
const isOption = (option: unknown): option is RadioOption =>
  typeof option === 'object' && typeof (option as RadioOption).title === 'string' && (option as RadioOption).value !== undefined;

@Component({
  tag: 'mg-input-radio',
  styleUrl: '../../../../../node_modules/@mgdis/styles/dist/components/mg-input-radio.css',
  shadow: true,
})
export class MgInputRadio {
  /************
   * Internal *
   ************/

  // HTML selector
  private inputs: HTMLInputElement[] = [];

  // classes
  private readonly classVerticalList = 'mg-c-input--vertical-list';

  // Locales
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
  @Element() element: HTMLMgInputRadioElement;

  /**
   * Component value
   */
  @Prop({ mutable: true }) value: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  @Watch('value')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  watchValue(newValue: any): void {
    if (allItemsAreString(this.items) && typeof newValue === 'string') {
      this.readonlyValue = newValue;
    } else if (Array.isArray(this.items) && this.items.every(isOption)) {
      this.readonlyValue = this.items.find(item => item.value === newValue)?.title;
    } else {
      this.readonlyValue = null;
    }
    this.valueChange.emit(newValue);
  }

  /**
   * Items are the possible options to select
   */
  @Prop() items!: string[] | RadioOption[];
  @Watch('items')
  validateItems(newValue: string[] | RadioOption[]): void {
    // Validate if items have required min length
    if (typeof newValue === 'object' && newValue.length < 2) {
      throw new Error(`<mg-input-radio> prop "items" require at least 2 items. Passed value: ${toString(newValue)}.`);
    }
    // String array
    else if (allItemsAreString(newValue as string[])) {
      this.options = newValue.map(item => ({ title: item, value: item, disabled: this.disabled }));
    }
    // Object array
    else if (newValue && (newValue as RadioOption[]).every(item => isOption(item))) {
      this.options = newValue as RadioOption[];
    } else {
      throw new Error(`<mg-input-radio> prop "items" is required and all items must be the same type, string or RadioOption. Passed value: ${toString(newValue)}.`);
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
   * Define if inputs are display verticaly
   */
  @Prop() inputVerticalList = false;
  @Watch('inputVerticalList')
  watchInputVerticalList(newValue: MgInputRadio['inputVerticalList']): void {
    if (newValue) this.classCollection.add(this.classVerticalList);
    else this.classCollection.delete(this.classVerticalList);
  }

  /**
   * Define if input is required
   */
  @Prop() required = false;

  /**
   * Define if input is readonly
   */
  @Prop() readonly = false;
  @Watch('readonly')
  watchReadonly(newValue: MgInputRadio['readonly']): void {
    if (newValue) this.classCollection.add(classReadonly);
    else this.classCollection.delete(classReadonly);
  }
  /**
   * Define if input is disabled
   */
  @Prop() disabled = false;
  @Watch('required')
  @Watch('readonly')
  @Watch('disabled')
  handleValidityChange(newValue: boolean, _oldValue: boolean, prop: string): void {
    this.inputs.forEach(input => {
      input[prop] = newValue;
    });
    this.checkValidity();
    if (this.hasDisplayedError) {
      this.setErrorMessage();
      this.hasDisplayedError = false;
    }
  }

  @Watch('disabled')
  watchDisabled(newValue: MgInputRadio['disabled']): void {
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
  @State() classCollection: ClassList = new ClassList(['mg-c-input--radio', classFieldset]);

  /**
   * Error message to display
   */
  @State() errorMessage: string;

  /**
   * Formated items for display
   */
  @State() options: RadioOption[];

  /**
   * Value to display in readonly mode
   */
  @State() readonlyValue: string;

  /**
   * Emitted event when value change
   */
  @Event({ eventName: 'value-change' }) valueChange: EventEmitter<HTMLMgInputRadioElement['value']>;

  /**
   * Emited event when checking validity
   */
  @Event({ eventName: 'input-valid' }) inputValid: EventEmitter<HTMLMgInputRadioElement['valid']>;

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
  async setError(valid: MgInputRadio['valid'], errorMessage: string): Promise<void> {
    if (typeof valid !== 'boolean') {
      throw new Error('<mg-input-radio> method "setError()" param "valid" must be a boolean.');
    } else if (!isValidString(errorMessage)) {
      throw new Error('<mg-input-radio> method "setError()" param "errorMessage" must be a string.');
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
      this.value = undefined;
      this.checkValidity();
      this.errorMessage = undefined;
      this.hasDisplayedError = false;
    }
  }

  /**
   * Method to set validity values
   * @param newValue - valid new value
   */
  private setValidity(newValue: MgInputRadio['valid']) {
    const oldValidValue = this.valid;
    this.valid = newValue;
    this.invalid = !this.valid;
    // We need to send valid event even if it is the same value
    if (this.handlerInProgress === undefined || (this.handlerInProgress === 'blur' && this.valid !== oldValidValue)) this.inputValid.emit(this.valid);
  }

  /**
   * Handle input event
   * @param event - input event
   */
  private handleInput = (event: InputEvent & { target: HTMLInputElement }) => {
    this.checkValidity();
    this.value = this.options[event.target.value].value;
  };

  /**
   * Handle blur event
   */
  private handleBlur = (): void => {
    this.handlerInProgress = 'blur';
    this.checkValidity();
    this.setErrorMessage();
    // reset guard
    this.handlerInProgress = undefined;
  };

  /**
   * Check if input is valid
   */
  private checkValidity = (): void => {
    this.setValidity(this.readonly || this.disabled || this.getInvalidElement() === undefined);
  };

  /**
   * Set input error message
   * @param errorMessage - errorMessage override
   */
  private setErrorMessage = (errorMessage?: string): void => {
    const invalidElement = this.getInvalidElement();

    // Set error message
    this.errorMessage = undefined;
    if (!this.valid) {
      if (errorMessage !== undefined) {
        this.errorMessage = errorMessage;
      } else if (invalidElement.validity.valueMissing) {
        this.errorMessage = this.messages.errors.required;
      }
    }
  };

  /**
   * get invalid element
   * @returns element
   */
  private getInvalidElement = (): HTMLInputElement => this.inputs.find((input: HTMLInputElement) => !input.disabled && !input.readOnly && !input.checkValidity());

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
    // Validate
    this.validateItems(this.items);
    this.watchInputVerticalList(this.inputVerticalList);
    this.watchReadonly(this.readonly);
    this.watchDisabled(this.disabled);
    this.watchValue(this.value);
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
        tooltipPosition={this.readonly && !this.value ? 'label' : this.tooltipPosition}
        helpText={this.helpText}
        errorMessage={this.errorMessage}
      >
        {this.readonly ? (
          this.readonlyValue && <b class="mg-c-input__readonly-value">{this.readonlyValue}</b>
        ) : (
          <ul class="mg-c-input__input-group-container" role="list">
            {this.options.map((input, index) => (
              <li key={input.title} class={{ 'mg-c-input__input-group': true, 'mg-c-input__input-group--disabled': this.disabled || input.disabled }}>
                <input
                  type="radio"
                  id={this.identifier + '_' + index}
                  name={this.identifier}
                  value={index}
                  checked={JSON.stringify(this.value) === JSON.stringify(this.options[index].value)}
                  disabled={this.disabled || input.disabled}
                  required={this.required}
                  onBlur={this.handleBlur}
                  onInput={this.handleInput}
                  ref={(el: HTMLInputElement) => {
                    if (el !== null) this.inputs[index] = el;
                  }}
                />
                <label htmlFor={this.identifier + '_' + index}>{input.title}</label>
              </li>
            ))}
          </ul>
        )}
      </mg-input>
    );
  }
}
