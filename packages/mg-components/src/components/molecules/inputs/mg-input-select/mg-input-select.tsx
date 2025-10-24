import { Component, Element, Event, h, Prop, State, EventEmitter, Watch, Method } from '@stencil/core';
import { ClassList, allItemsAreString, isValidString, toString } from '@mgdis/core-ui-helpers/dist/utils';
import { SelectOption, OptGroup } from './mg-input-select.conf';
import { type TooltipPosition, type Width, type EventType, classReadonly, classDisabled, widths } from '../mg-input/mg-input.conf';
import { initLocales } from '../../../../locales';

/**
 * Check if item is a well configured option
 * @param option - select option
 * @returns select option type is valid
 */
const isOption = (option: unknown): option is SelectOption => typeof option === 'object' && typeof (option as SelectOption).title === 'string';

/**
 * Check if items[] is SelectOption
 * @param items - select option
 * @returns select option array type is valid
 */
const allItemsAreOptions = (items: unknown[]): items is SelectOption[] => Array.isArray(items) && items.every(item => isOption(item));

/**
 * Check if item is a well configured optgroup
 * @param optgroup - select option
 * @returns select optgroup type is valid
 */
const isOptGroup = (optgroup: unknown): optgroup is OptGroup =>
  typeof optgroup === 'object' && typeof (optgroup as OptGroup).group === 'string' && allItemsAreOptions((optgroup as OptGroup).options);

/**
 * Group options
 * @param acc - reduce accumulator
 * @param item - item to add
 * @returns grouped options
 */
const groupOptions = (acc: (SelectOption | OptGroup)[], { group, title, value, disabled }: SelectOption): (SelectOption | OptGroup)[] => {
  if (group !== undefined) {
    // Check if group is already created
    const optGroup: OptGroup = (acc as OptGroup[]).find(grp => grp.group === group);
    // Add to group
    if (optGroup !== undefined) {
      optGroup.options.push({ title, value, disabled });
    }
    // Create group
    else {
      acc.push({ group, options: [{ title, value, disabled }] });
    }
  } else {
    acc.push({ title, value, disabled });
  }
  return acc;
};

@Component({
  tag: 'mg-input-select',
  styleUrl: '../../../../../node_modules/@mgdis/styles/dist/components/mg-input-select.css',
  shadow: true,
})
export class MgInputSelect {
  /************
   * Internal *
   ************/

  // HTML selector
  private input: HTMLSelectElement;

  // Locales
  private messages;

  // hasDisplayedError (triggered by blur event)
  private hasDisplayedError = false;
  private handlerInProgress: EventType;
  private customErrorMessage: { lock: boolean; message?: string } = { lock: false };

  /**************
   * Decorators *
   **************/

  /**
   * Get component DOM element
   */
  @Element() element: HTMLMgInputSelectElement;

  /**
   * Component value
   */
  @Prop({ mutable: true }) value: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  @Watch('value')
  validateValue(newValue: MgInputSelect['value']): void {
    setTimeout(() => {
      this.checkValidity();
      if (this.hasDisplayedError) {
        this.setErrorMessage();
      }
    }, 0);
    this.valueChange.emit(newValue);
  }

  /**
   * Items are the possible options to select
   */
  @Prop() items!: (string | SelectOption)[];
  @Watch('items')
  validateItems(newValue: MgInputSelect['items']): void {
    // Empty options
    if (newValue.length === 0) {
      this.options = [];
    }
    // String array
    else if (allItemsAreString(newValue)) {
      if (typeof this.value === 'string') {
        this.valueExist = newValue.includes(this.value);
      }
      this.options = newValue.map(item => ({ title: item, value: item }));
    }
    // Object array
    else if (allItemsAreOptions(newValue)) {
      this.valueExist = newValue.map(item => item.value).includes(this.value);
      // Grouped object options
      if (newValue.some(item => Boolean(item.group))) {
        this.options = newValue.reduce(groupOptions, []);
      }
      // Standart object options
      else {
        this.options = newValue;
      }
    } else {
      throw new Error(
        `<mg-input-select> prop "items" is required, can be an empty Array or all items must be the same type: string or Option. Passed value: ${toString(newValue)}.`,
      );
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
  @Prop() name = this.identifier;

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
  @Prop({ mutable: true }) placeholder: string;

  /**
   * Option to remove placeholder
   */
  @Prop() placeholderHide = false;

  /**
   * Option to disable placeholder
   */
  @Prop() placeholderDisabled = false;

  /**
   * Define if input is required
   */
  @Prop() required = false;

  /**
   * Define if input is readonly
   */
  @Prop() readonly = false;
  @Watch('readonly')
  watchReadonly(newValue: MgInputSelect['readonly']): void {
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
  watchDisabled(newValue: MgInputSelect['disabled']): void {
    if (newValue) this.classCollection.add(classDisabled);
    else this.classCollection.delete(classDisabled);
  }

  /**
   * Define input width
   */
  @Prop({ reflect: true }) mgWidth: Width;
  @Watch('mgWidth')
  watchMgWidth(newValue: MgInputSelect['mgWidth']): void {
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
  @State() classCollection: ClassList = new ClassList(['mg-c-input--select']);

  /**
   * Error message to display
   */
  @State() errorMessage: string;

  /**
   * Formated items for display
   */
  @State() options: (SelectOption | OptGroup)[];

  /**
   * Does value match any item option
   */
  @State() valueExist: boolean;

  /**
   * Emited event when value change
   */
  @Event({ eventName: 'value-change' }) valueChange: EventEmitter<HTMLMgInputCheckboxElement['value']>;

  /**
   * Emited event when checking validity
   */
  @Event({ eventName: 'input-valid' }) inputValid: EventEmitter<HTMLMgInputCheckboxElement['valid']>;

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
   * @param errorMessageLock - lock the error message and validity state
   */
  @Method()
  async setError(valid: MgInputSelect['valid'], errorMessage?: string, errorMessageLock = false): Promise<void> {
    if (typeof valid !== 'boolean') {
      throw new Error('<mg-input-select> method "setError()" param "valid" must be a boolean.');
    } else if (errorMessage !== undefined && !isValidString(errorMessage)) {
      throw new Error('<mg-input-select> method "setError()" param "errorMessage" must be a string.');
    } else {
      this.customErrorMessage = {
        lock: valid ? false : errorMessageLock,
        message: valid ? undefined : errorMessage,
      };
      this.setValidity(valid);
      this.setErrorMessage(true);
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
      // Use `Promise` as requested for stencil method
      // Use `requestAnimationFrame` to ensure:
      // - DOM is fully updated before validation
      // - Async operations are completed
      // - No timing issues with Stencil's render cycle
      // - Keep everything in sync both inside and outside the component
      return new Promise(resolve => {
        requestAnimationFrame(() => {
          // unlock validity check by reseting customErrorMessage
          this.customErrorMessage = { lock: false };
          this.checkValidity();
          this.errorMessage = undefined;
          this.hasDisplayedError = false;
          resolve();
        });
      });
    }
  }

  /**
   * Method to get readonly value from value
   * @returns readonly value
   */
  private getReadonlyValue = (): string | null => {
    if (allItemsAreString(this.items) && typeof this.value === 'string') {
      return this.items.find(item => item === this.value);
    } else if (allItemsAreOptions(this.items)) {
      return this.items.find(item => item.value === this.value)?.title;
    } else {
      return null;
    }
  };

  /**
   * Method to set validity values
   * @param newValue - valid new value
   */
  private setValidity(newValue: MgInputSelect['valid']) {
    const oldValue = this.valid;
    if (!this.customErrorMessage.lock || (this.customErrorMessage.lock && this.customErrorMessage.message !== undefined)) {
      this.valid = newValue;
    }
    this.invalid = !this.valid;
    // We need to send valid event even if it is the same value
    if (this.handlerInProgress === undefined || (this.handlerInProgress === 'blur' && this.valid !== oldValue)) {
      this.inputValid.emit(this.valid);
    }
  }

  /**
   * Handle input event
   */
  private handleInput = (): void => {
    if (this.input.value === '') {
      this.value = null;
    } else if (allItemsAreString(this.items) && this.items.includes(this.input.value)) {
      this.value = this.input.value;
    } else if (allItemsAreOptions(this.items) && typeof this.input.value === 'string' && this.items.some(this.isInputValue)) {
      this.value = this.items.find(this.isInputValue).value;
    } else {
      // Add the unknown input.value to the options array as a disabled option before setting it as the new value
      this.options.push({ title: this.input.value, value: this.input.value, disabled: true });
      this.value = this.input.value;
    }
    if (this.hasDisplayedError) {
      this.setErrorMessage();
    }
  };

  /**
   * Method to compare item.title with input.value
   * @param item - item to compare with
   * @returns truthy if input.value is an item
   */
  private isInputValue = (item: SelectOption): boolean => item.title === this.input?.value;

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
   * Input value is disabled
   * @returns truthy if input value is disabled
   */
  private isDisabledValue = (): boolean => allItemsAreOptions(this.options) && this.options.find(this.isInputValue)?.disabled === true;

  /**
   * Check if input is valid
   */
  private checkValidity = (): void => {
    this.setValidity(!this.isDisabledValue() && (this.readonly || this.disabled || this.input.checkValidity()));
  };

  /**
   * Set input error message
   * @param fromSetErrorContext - context come from `setError` method
   */
  private setErrorMessage = (fromSetErrorContext = false): void => {
    // Set error message
    this.errorMessage = undefined;
    if (!this.valid) {
      // Does have a new custom error message OR does have a custom error message locked
      if (fromSetErrorContext || (this.customErrorMessage.lock && this.customErrorMessage.message !== undefined)) {
        this.errorMessage = this.customErrorMessage.message;
      }
      // required
      else if (this.input.validity.valueMissing) {
        this.errorMessage = this.messages.errors.required;
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
    this.messages = initLocales(this.element).messages;
    // Validate
    this.validateItems(this.items);
    this.validateValue(this.value);
    this.watchMgWidth(this.mgWidth);
    this.watchReadonly(this.readonly);
    this.watchDisabled(this.disabled);
    // Set default placeholder
    if (this.placeholder === undefined || this.placeholder === '') {
      this.placeholder = this.messages.input.select.placeholder;
    }
    // Check validity when component is ready
    // return a promise to process action only in the FIRST render().
    // https://stenciljs.com/docs/component-lifecycle#componentwillload
    return setTimeout(() => {
      this.checkValidity();
    }, 0);
  }

  /**
   * Render option
   * @param option - to render
   * @returns render option
   */
  private renderOption = (option: SelectOption): HTMLElement => (
    <option key={option.title} value={option.title} selected={JSON.stringify(this.value) === JSON.stringify(option.value)} disabled={option.disabled}>
      {option.title}
    </option>
  );

  /**
   * Render
   * @returns HTML Element
   */
  render(): HTMLElement {
    const readonlyValue = this.getReadonlyValue();
    return (
      <mg-input
        label={this.label}
        identifier={this.identifier}
        class={this.classCollection.join()}
        labelOnTop={this.labelOnTop}
        labelHide={this.labelHide}
        required={this.required}
        tooltip={this.tooltip}
        tooltipPosition={this.readonly && readonlyValue === null ? 'label' : this.tooltipPosition}
        helpText={this.helpText}
        errorMessage={this.errorMessage}
      >
        {this.readonly ? (
          readonlyValue && <b class="mg-c-input__readonly-value">{readonlyValue}</b>
        ) : (
          <select
            class="mg-c-input__box"
            id={this.identifier}
            name={this.name}
            title={this.placeholder}
            disabled={this.disabled}
            required={this.required}
            aria-invalid={(this.invalid === true).toString()}
            onInput={this.handleInput}
            onBlur={this.handleBlur}
            ref={(el: HTMLSelectElement) => {
              if (el !== null) this.input = el;
            }}
          >
            {(!this.placeholderHide || !this.valueExist) && ( // In case passed value does not match any option we display the placeholder
              <option value="" disabled={this.placeholderDisabled && this.valueExist}>
                {this.placeholder}
              </option>
            )}
            {this.options.map(option =>
              isOptGroup(option) ? (
                <optgroup label={option.group} key={option.group}>
                  {option.options.map(this.renderOption)}
                </optgroup>
              ) : (
                isOption(option) && this.renderOption(option)
              ),
            )}
          </select>
        )}
      </mg-input>
    );
  }
}
