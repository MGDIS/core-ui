import { Component, Event, h, Prop, EventEmitter, State, Element, Method, Watch } from '@stencil/core';
import { allItemsAreString, ClassList, isValidString, toString } from '@mgdis/core-ui-helpers/dist/utils';
import { helpTextTypes, type OptionType, type TextType, textTypes } from './mg-input-text.conf';
import { type TooltipPosition, type Width, type EventType, widths, classReadonly, classDisabled } from '../mg-input/mg-input.conf';
import { initLocales } from '../../../../locales';
import { IconType } from '../../../../components';

/**
 * Check if object is an option
 * @param option - object to validate
 * @returns true id object is an option
 */

const isOption = (option: unknown): option is OptionType =>
  typeof option === 'object' && typeof (option as OptionType).title === 'string' && (option as OptionType).value !== undefined;

/**
 * Check if datalist options are well structured.
 * @param options - Datalist options to check.
 * @returns True if datalist is well structured.
 */
const isDatalistOptions = (options: unknown[]): options is string[] => allItemsAreString(options) || (Array.isArray(options) && options.every(isOption));

/**
 * @slot append-input - Content to display next to the input
 */
@Component({
  tag: 'mg-input-text',
  styleUrl: '../../../../../node_modules/@mgdis/styles/dist/components/mg-input-text.css',
  shadow: true,
})
export class MgInputText {
  /************
   * Internal *
   ************/

  // Classes
  private readonly classFocus = 'mg-u-is-focused';
  private readonly classIsInputGroupAppend = 'mg-c-input--is-input-group-append';
  private readonly classHasIcon = 'mg-c-input--has-icon';
  private readonly classHasButtonsGroupAppend = 'mg-c-input--has-buttons-group-append';
  private readonly classIsAppendInputSlotContent = 'mg-c-input--is-append-input-slot-content';

  // IDs
  private characterLeftId: string;
  private datalistId: string;
  private slotContent: string;

  // HTML selector
  private input: HTMLInputElement;

  // Locales
  private messages;

  // hasDisplayedError (triggered by blur event)
  private hasDisplayedError = false;
  private customErrorMessage: { lock: boolean; message?: string } = { lock: false };
  private handlerInProgress: EventType;

  /**************
   * Decorators *
   **************/

  /**
   * Get component DOM element
   */
  @Element() element: HTMLMgInputTextElement;

  /**
   * Component value
   */
  @Prop({ mutable: true, reflect: true }) value: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  @Watch('value')
  handleValue(newValue: string): void {
    if (this.datalistoptions?.every(isOption)) {
      this.valueChange.emit(this.datalistoptions.find(option => option.title === newValue)?.value || newValue);
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
  @Prop() labelOnTop = false;

  /**
   * Define if label is visible
   */
  @Prop() labelHide = false;

  /**
   * Input type
   */
  @Prop() type: TextType = 'text';
  @Watch('type')
  validateType(newValue: TextType): void {
    if (!textTypes.includes(newValue)) {
      throw new Error(`<mg-input-text> prop "type" must be one of the following values: ${textTypes.join(', ')}. Passed value: ${newValue}.`);
    }
  }

  /**
   * Input icon
   */
  @Prop() icon?: IconType;
  @Watch('icon')
  validateIcon(newValue: string): void {
    if (newValue !== undefined) {
      this.classCollection.add(this.classHasIcon);
    } else {
      this.classCollection.delete(this.classHasIcon);
    }
  }

  /**
   * Input placeholder.
   * It should be a word or short phrase that demonstrates the expected type of data, not a replacement for labels or help text.
   */
  @Prop() placeholder?: string;

  /**
   * Define datalist options
   */
  @Prop() datalistoptions: string[] | OptionType[];
  @Watch('datalistoptions')
  validateDatalistoptions(newValue: MgInputText['datalistoptions']) {
    if (Boolean(newValue) && !isDatalistOptions(newValue)) {
      throw new Error(`<mg-input-text> prop "datalistoptions" values must be the same type, string or OptionType. Passed value: ${toString(newValue)}.`);
    }
  }

  /**
   * Input max length
   */
  @Prop() maxlength = 400;

  /**
   * Define if input is required
   */
  @Prop() required = false;

  /**
   * Define if input is readonly
   */
  @Prop() readonly = false;
  @Watch('readonly')
  watchReadonly(newValue: MgInputText['readonly']): void {
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
  watchDisabled(newValue: MgInputText['disabled']): void {
    if (newValue) this.classCollection.add(classDisabled);
    else this.classCollection.delete(classDisabled);
  }

  /**
   * Define input width
   */
  @Prop() mgWidth: Width = 'full';
  @Watch('mgWidth')
  watchMgWidth(newValue: MgInputText['mgWidth']): void {
    // reset width class
    widths.forEach(width => {
      this.classCollection.delete(`mg-c-input--width-${width}`);
    });
    // apply new width
    if (newValue !== undefined) this.classCollection.add(`mg-c-input--width-${this.mgWidth}`);
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
  watchPattern(): void {
    this.validatePattern();
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
   * Define if component should display character left
   */
  @Prop() characterLeftHide = false;

  /**
   * Add a help text under the input, usually expected data format and example
   */
  @Prop({ mutable: true }) helpText?: string;
  @Watch('helpText')
  watchHelpText(newValue: string): void {
    if (!isValidString(newValue) && (helpTextTypes as unknown as string).includes(this.type)) {
      this.helpText = this.messages.input.text.helpText[this.type];
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
  @State() classCollection: ClassList = new ClassList(['mg-c-input--text']);

  /**
   * Error message to display
   */
  @State() errorMessage: string;

  /**
   * Emited event when value change
   */
  @Event({ eventName: 'value-change' }) valueChange: EventEmitter<HTMLMgInputTextElement['value']>;

  /**
   * Emited event when checking validity
   */
  @Event({ eventName: 'input-valid' }) inputValid: EventEmitter<HTMLMgInputTextElement['valid']>;

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
  async setError(valid: MgInputText['valid'], errorMessage?: string, errorMessageLock = false): Promise<void> {
    if (typeof valid !== 'boolean') {
      throw new Error('<mg-input-text> method "setError()" param "valid" must be a boolean.');
    } else if (errorMessage !== undefined && !isValidString(errorMessage)) {
      throw new Error('<mg-input-text> method "setError()" param "errorMessage" must be a string.');
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
      this.value = '';
      // Use `Promise` as requested for stencil method
      // Use `requestAnimationFrame` to ensure:
      // - DOM is fully updated before validation
      // - Async operations are completed
      // - No timing issues with Stencil's render cycle
      // - Keep everything in sync both inside and outside the component
      return new Promise(resolve => {
        requestAnimationFrame(() => {
          // unlock validity check by reseting customErrorMessage
          this.customErrorMessage = {
            lock: false,
            message: undefined,
          };
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
  private setValidity(newValue: MgInputText['valid']) {
    const oldValue = this.valid;
    if (!this.customErrorMessage.lock || (this.customErrorMessage.lock && this.customErrorMessage.message !== undefined)) {
      this.valid = newValue;
    }
    this.invalid = !this.valid;
    // We need to send valid event even if it is the same value
    if (this.handlerInProgress === undefined || (this.handlerInProgress === 'blur' && this.valid !== oldValue)) this.inputValid.emit(this.valid);
  }

  /**
   * Validate pattern configuration
   */
  private validatePattern = (): void => {
    if (
      (this.pattern !== undefined || this.patternErrorMessage !== undefined) && // At least one is defined
      (!isValidString(this.pattern) || (!(helpTextTypes as unknown as string).includes(this.type) && !isValidString(this.patternErrorMessage))) // Both must be defined
    ) {
      throw new Error(
        `<mg-input-text> props "pattern" and "patternErrorMessage" must be non-empty string and paired. Passed value: "pattern='${this.pattern}'" and "patternErrorMessage='${this.patternErrorMessage}'".`,
      );
    }
  };

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
    this.handlerInProgress = 'blur';
    this.displayError().finally(() => {
      // reset guard
      this.handlerInProgress = undefined;
    });
  };

  /**
   * Check if input is valid
   */
  private checkValidity = (): void => {
    this.setValidity(this.readonly || this.disabled || this.input.checkValidity());
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
      // Does not match type (email, emails, tel, url, etc.)
      else if (this.input.validity.typeMismatch) {
        this.errorMessage = this.messages.input.text.errors.typeMismatch[this.type];
      }
      // Does not match pattern
      else if (this.input.validity.patternMismatch) {
        this.errorMessage = this.patternErrorMessage ?? this.messages.input.text.errors.typeMismatch[this.type];
      }
      // required
      else if (this.input.validity.valueMissing) {
        this.errorMessage = this.messages.errors.required;
      }
    }
  };

  /**
   * Validate append slot
   */
  private validateAppendSlot = (): void => {
    const slotAppendInput: HTMLSlotElement[] = Array.from(this.element.querySelectorAll('[slot="append-input"]'));

    if (slotAppendInput.length === 1) {
      if (slotAppendInput[0].nodeName === 'MG-BUTTON') {
        this.classCollection.add(this.classIsInputGroupAppend);
      } else {
        this.classCollection.add(this.classIsAppendInputSlotContent);
        this.slotContent = slotAppendInput[0].textContent;
      }
    } else if (slotAppendInput.filter(slot => slot.nodeName === 'MG-BUTTON').length > 1) {
      this.classCollection.add(this.classIsInputGroupAppend);
      this.classCollection.add(this.classHasButtonsGroupAppend);
    }
  };

  /**
   * Method to control datalist display condition
   * @returns true if display condition success
   */
  private hasDatalist = (): boolean => isDatalistOptions(this.datalistoptions) && this.datalistoptions.length > 0;

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
    this.datalistId = `${this.identifier}-datalist`;
    // Validate
    this.validateIcon(this.icon);
    this.validateDatalistoptions(this.datalistoptions);
    this.watchPattern();
    this.validateAppendSlot();
    this.watchMgWidth(this.mgWidth);
    this.watchReadonly(this.readonly);
    this.watchDisabled(this.disabled);
    this.validateType(this.type);
    this.watchHelpText(this.helpText);
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
        <b>{this.value}</b>
        {this.slotContent}
      </span>
    ) : (
      <b class="mg-c-input__readonly-value">{this.value}</b>
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
        ariaDescribedbyIDs={this.characterLeftId}
        labelOnTop={this.labelOnTop}
        labelHide={this.labelHide}
        required={this.required}
        tooltip={this.tooltip}
        tooltipPosition={this.readonly && this.value === undefined ? 'label' : this.tooltipPosition}
        helpText={this.helpText}
        errorMessage={this.errorMessage}
      >
        {this.readonly
          ? this.value && this.renderReadonly()
          : [
              <div
                key="input"
                class="mg-c-input__with-character-left"
                style={{
                  '--mg-c-character-left-message-length': (!this.characterLeftHide ? this.maxlength.toString().length * 2 + 1 : 0).toString(),
                }}
              >
                {this.icon !== undefined && <mg-icon icon={this.icon}></mg-icon>}
                <input
                  type={this.type === 'emails' ? 'email' : this.type}
                  multiple={this.type === 'emails'}
                  class="mg-c-input__box mg-c-input__box--width"
                  value={this.value}
                  id={this.identifier}
                  list={this.hasDatalist() ? this.datalistId : undefined}
                  autocomplete={this.hasDatalist() ? 'off' : undefined}
                  name={this.name}
                  placeholder={this.placeholder}
                  title={this.placeholder}
                  maxlength={this.maxlength}
                  disabled={this.disabled}
                  required={this.required}
                  aria-invalid={(this.invalid === true).toString()}
                  pattern={this.pattern}
                  onInput={this.handleInput}
                  onFocus={this.handleFocus}
                  onBlur={this.handleBlur}
                  ref={(el: HTMLInputElement) => {
                    if (el !== null) this.input = el;
                  }}
                />
                {this.hasDatalist() && (
                  <datalist id={this.datalistId}>
                    {this.datalistoptions.map(option => (
                      <option value={isOption(option) ? option.title : option} key={option}></option>
                    ))}
                  </datalist>
                )}
                {!this.characterLeftHide && this.maxlength > 0 && (
                  <mg-character-left identifier={this.characterLeftId} characters={this.value} maxlength={this.maxlength}></mg-character-left>
                )}
              </div>,
              <slot key="slot" name="append-input"></slot>,
            ]}
      </mg-input>
    );
  }
}
