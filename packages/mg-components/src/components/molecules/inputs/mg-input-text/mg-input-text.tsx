import { Component, Event, h, Prop, EventEmitter, State, Element, Method, Watch } from '@stencil/core';
import { ClassList, isValidString } from '@mgdis/stencil-helpers';
import { TextType } from './mg-input-text.conf';
import { type TooltipPosition, type Width, Handler } from '../mg-input/mg-input.conf';
import { initLocales } from '../../../../locales';

const isDatalistOption = (options: unknown[]): options is string[] => Array.isArray(options) && options.every(option => typeof option === 'string');

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

  // IDs
  private characterLeftId;
  private datalistId;

  // HTML selector
  private input: HTMLInputElement;

  // Locales
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
  @Element() element: HTMLMgInputTextElement;

  /**
   * Component value
   */
  @Prop({ mutable: true, reflect: true }) value: string;
  @Watch('value')
  handleValue(newValue: string): void {
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
   * Input type
   */
  @Prop() type: TextType = 'text';

  /**
   * Input icon
   */
  @Prop() icon: string;
  @Watch('icon')
  validateIcon(newValue: string): void {
    if (newValue !== undefined) {
      this.classCollection.add(this.classHasIcon);
    } else {
      this.classCollection.delete(this.classHasIcon);
    }
  }

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
   * Define datalist options
   */
  @Prop() datalistoptions: string[];
  @Watch('datalistoptions')
  validateDatalistoptions(newValue: MgInputText['datalistoptions']) {
    if (Boolean(newValue) && !isDatalistOption(newValue)) {
      throw new Error('<mg-input-text> prop "datalistoptions" values must be the same type, string.');
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
   * Please refer to the Pattern section in the input documentation for detailed information on using regular expressions in components.
   */
  @Prop() pattern: string;

  /**
   * Define input pattern error message
   */
  @Prop() patternErrorMessage: string;
  @Watch('pattern')
  @Watch('patternErrorMessage')
  validatePattern(newValue: string): void {
    if (newValue !== undefined && !(isValidString(this.pattern) && isValidString(this.patternErrorMessage))) {
      throw new Error('<mg-input-text> props "pattern" and "patternErrorMessage" must be non-empty string and paired.');
    }
  }

  /**
   * Add a tooltip message next to the input
   */
  @Prop() tooltip: string;

  /**
   * Define tooltip position
   */
  @Prop() tooltipPosition: TooltipPosition = 'input';

  /**
   * Define if component should display character left
   */
  @Prop() displayCharacterLeft = true;

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
   * Public method to play input focus
   */
  @Method()
  async setFocus(): Promise<void> {
    this.input.focus();
  }

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
  async setError(valid: MgInputText['valid'], errorMessage: string): Promise<void> {
    if (typeof valid !== 'boolean') {
      throw new Error('<mg-input-text> method "setError()" param "valid" must be a boolean');
    } else if (!isValidString(errorMessage)) {
      throw new Error('<mg-input-text> method "setError()" param "errorMessage" must be a string');
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
  private setValidity(newValue: MgInputText['valid']) {
    const oldValidValue = this.valid;
    this.valid = newValue;
    this.invalid = !this.valid;
    // We need to send valid event even if it is the same value
    if (this.handlerInProgress === undefined || (this.handlerInProgress === Handler.BLUR && this.valid !== oldValidValue)) this.inputValid.emit(this.valid);
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
    this.handlerInProgress = Handler.BLUR;
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
   * @param errorMessage - errorMessage override
   */
  private setErrorMessage = (errorMessage?: string): void => {
    // Set error message
    this.errorMessage = undefined;
    // Does have a custom error message
    if (!this.valid && errorMessage !== undefined) {
      this.errorMessage = errorMessage;
    }
    // Does not match pattern
    else if (!this.valid && this.input.validity.patternMismatch) {
      this.errorMessage = this.patternErrorMessage;
    }
    // required
    else if (!this.valid && this.input.validity.valueMissing) {
      this.errorMessage = this.messages.errors.required;
    }
  };

  /**
   * Validate append slot
   */
  private validateAppendSlot = (): void => {
    const slotAppendInput: HTMLSlotElement[] = Array.from(this.element.querySelectorAll('[slot="append-input"]'));

    if (slotAppendInput.length === 1) {
      this.classCollection.add(slotAppendInput[0].nodeName === 'MG-BUTTON' ? this.classIsInputGroupAppend : 'mg-c-input--is-append-input-slot-content');
    } else if (slotAppendInput.filter(slot => slot.nodeName === 'MG-BUTTON').length > 1) {
      this.classCollection.add(this.classIsInputGroupAppend);
      this.classCollection.add('mg-c-input--has-buttons-group-append');
    }
  };

  /**
   * Method to control datalist display condition
   * @returns true if display condition success
   */
  private hasDatalist = (): boolean => isDatalistOption(this.datalistoptions) && this.datalistoptions.length > 0;

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
    this.validatePattern(this.pattern);
    this.validatePattern(this.patternErrorMessage);
    this.validateAppendSlot();
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
        classCollection={this.classCollection}
        ariaDescribedbyIDs={[this.characterLeftId]}
        labelOnTop={this.labelOnTop}
        labelHide={this.labelHide}
        required={this.required}
        readonly={this.readonly}
        mgWidth={this.mgWidth}
        disabled={this.disabled}
        readonlyValue={this.value}
        tooltip={this.tooltip}
        tooltipPosition={this.tooltipPosition}
        helpText={this.helpText}
        errorMessage={this.errorMessage}
      >
        <div
          class="mg-c-input__with-character-left"
          style={{
            '--mg-character-left-message-length': (this.displayCharacterLeft
              ? (this.maxlength - (this.value || '').length).toString().length + this.maxlength.toString().length + 1
              : 0
            ).toString(),
          }}
        >
          {this.icon !== undefined && <mg-icon icon={this.icon}></mg-icon>}
          <input
            type={this.type}
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
                <option value={option} key={option}></option>
              ))}
            </datalist>
          )}
          {this.displayCharacterLeft && this.maxlength > 0 && (
            <mg-character-left identifier={this.characterLeftId} characters={this.value} maxlength={this.maxlength}></mg-character-left>
          )}
        </div>
        <slot name="append-input"></slot>
      </mg-input>
    );
  }
}
