import { Component, Element, Event, h, Prop, EventEmitter, State, Method, Watch } from '@stencil/core';
import { ClassList, isValidString, toString } from '@mgdis/stencil-helpers';
import { type TooltipPosition, type Width, type EventType, widths, classReadonly, classDisabled } from '../mg-input/mg-input.conf';
import { initLocales } from '../../../../locales';

@Component({
  tag: 'mg-input-textarea',
  styleUrl: '../../../../../node_modules/@mgdis/styles/dist/components/mg-input-textarea.css',
  shadow: true,
})
export class MgInputTextarea {
  /************
   * Internal *
   ************/

  // Classes
  private readonly classFocus = 'mg-u-is-focused';
  private readonly classDisplayCharacterLeft = 'mg-c-input--display-character-left';

  // IDs
  private characterLeftId;

  // HTML selector
  private input: HTMLTextAreaElement;

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
  @Watch('readonly')
  watchReadonly(newValue: MgInputTextarea['readonly']): void {
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
  validateDisabled(newValue: MgInputTextarea['disabled']): void {
    if (newValue) this.classCollection.add(classDisabled);
    else this.classCollection.delete(classDisabled);
  }

  /**
   * Define input width
   */
  @Prop() mgWidth: Width = 'full';
  @Watch('mgWidth')
  watchMgWidth(newValue: MgInputTextarea['mgWidth']): void {
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
  validatePattern(newValue: string): void {
    if (newValue !== undefined && !(isValidString(this.pattern) && isValidString(this.patternErrorMessage))) {
      throw new Error(
        `<mg-input-textarea> props "pattern" and "patternErrorMessage" must be non-empty string and paired. Passed value: "pattern='${toString(this.pattern)}'" and "patternErrorMessage='${toString(this.patternErrorMessage)}'".`,
      );
    }
  }

  /**
   * Define the number of visible text lines for the control
   */
  @Prop() rows = 3;

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
  @Watch('characterLeftHide')
  validatecharacterLeftHide(newValue: boolean): void {
    if (newValue) {
      this.classCollection.delete(this.classDisplayCharacterLeft);
    } else {
      this.classCollection.add(this.classDisplayCharacterLeft);
    }
  }

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
   * Define if input is resizable
   */
  @Prop() resizable: 'none' | 'both' | 'horizontal' | 'vertical' = 'none';

  /**
   * Component classes
   */
  @State() classCollection: ClassList = new ClassList(['mg-c-input--textarea']);

  /**
   * Error message to display
   */
  @State() errorMessage: string;

  /**
   * Emited event when value change
   */
  @Event({ eventName: 'value-change' }) valueChange: EventEmitter<HTMLMgInputTextareaElement['value']>;

  /**
   * Emited event when checking validity
   */
  @Event({ eventName: 'input-valid' }) inputValid: EventEmitter<HTMLMgInputTextareaElement['valid']>;

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
  async setError(valid: MgInputTextarea['valid'], errorMessage: string): Promise<void> {
    if (typeof valid !== 'boolean') {
      throw new Error('<mg-input-textarea> method "setError()" param "valid" must be a boolean.');
    } else if (!isValidString(errorMessage)) {
      throw new Error('<mg-input-textarea> method "setError()" param "errorMessage" must be a string.');
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
    this.handlerInProgress = 'blur';
    this.displayError().finally(() => {
      // reset guard
      this.handlerInProgress = undefined;
    });
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
    this.setValidity(this.readonly || this.disabled || (this.input.checkValidity() && this.getPatternValidity()));
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
    this.validatecharacterLeftHide(this.characterLeftHide);
    this.validatePattern(this.pattern);
    this.validatePattern(this.patternErrorMessage);
    this.watchMgWidth(this.mgWidth);
    this.watchReadonly(this.readonly);
    this.validateDisabled(this.disabled);

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
        ariaDescribedbyIDs={[this.characterLeftId]}
        labelOnTop={this.labelOnTop}
        labelHide={this.labelHide}
        required={this.required}
        tooltip={this.tooltip}
        tooltipPosition={this.readonly && this.value === undefined ? 'label' : this.tooltipPosition}
        helpText={this.helpText}
        errorMessage={this.errorMessage}
      >
        {this.readonly ? (
          this.value && <b class="mg-c-input__readonly-value">{this.value}</b>
        ) : (
          <div class="mg-c-input__with-character-left">
            <textarea
              class={{
                'mg-c-input__box': true,
                'mg-c-input__box--width': true,
                'mg-c-input__box--resizable': this.resizable === 'both',
                'mg-c-input__box--resizable-horizontal': this.resizable === 'horizontal',
                'mg-c-input__box--resizable-vertical': this.resizable === 'vertical',
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
              aria-invalid={(this.invalid === true).toString()}
              onInput={this.handleInput}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              ref={(el: HTMLTextAreaElement) => {
                if (el !== null) this.input = el;
              }}
            ></textarea>
            {!this.characterLeftHide && this.maxlength > 0 && (
              <mg-character-left identifier={this.characterLeftId} characters={this.value} maxlength={this.maxlength}></mg-character-left>
            )}
          </div>
        )}
      </mg-input>
    );
  }
}
