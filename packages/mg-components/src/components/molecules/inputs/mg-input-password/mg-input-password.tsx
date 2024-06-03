import { Component, Element, Event, h, Prop, EventEmitter, State, Method, Watch } from '@stencil/core';
import { ClassList, isValidString } from '@mgdis/stencil-helpers';
import { type TooltipPosition, type Width, Handler, classReadonly, classDisabled, widths } from '../mg-input/mg-input.conf';
import { initLocales } from '../../../../locales';

@Component({
  tag: 'mg-input-password',
  styleUrl: '../../../../../node_modules/@mgdis/styles/dist/components/mg-input-password.css',
  shadow: true,
})
export class MgInputPassword {
  /************
   * Internal *
   ************/

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
  @Element() element: HTMLMgInputPasswordElement;

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
  watchReadonly(newValue: MgInputPassword['readonly']): void {
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
  watchDisabled(newValue: MgInputPassword['disabled']): void {
    if (newValue) this.classCollection.add(classDisabled);
    else this.classCollection.delete(classDisabled);
  }

  /**
   * Define input width
   */
  @Prop() mgWidth: Width = 'full';
  @Watch('mgWidth')
  watchMgWidth(newValue: MgInputPassword['mgWidth']): void {
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
  @State() classCollection: ClassList = new ClassList(['mg-c-input--password']);

  /**
   * Error message to display
   */
  @State() errorMessage: string;

  /**
   * Indicates if password is displayed or not
   */
  @State() displayPassword = false;

  /**
   * Emited event when value change
   */
  @Event({ eventName: 'value-change' }) valueChange: EventEmitter<HTMLMgInputPasswordElement['value']>;

  /**
   * Emited event when checking validity
   */
  @Event({ eventName: 'input-valid' }) inputValid: EventEmitter<HTMLMgInputPasswordElement['valid']>;

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
  async setError(valid: MgInputPassword['valid'], errorMessage: string): Promise<void> {
    if (typeof valid !== 'boolean') {
      throw new Error('<mg-input-password> method "setError()" param "valid" must be a boolean');
    } else if (!isValidString(errorMessage)) {
      throw new Error('<mg-input-password> method "setError()" param "errorMessage" must be a string');
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
  private setValidity(newValue: MgInputPassword['valid']) {
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
   * Handle blur event
   */
  private handleBlur = (): void => {
    this.handlerInProgress = Handler.BLUR;
    this.displayError().finally(() => {
      // reset guard
      this.handlerInProgress = undefined;
    });
  };

  /**
   * Toggle display-pasword value
   */
  private toggleDisplayPassword = (): void => {
    this.displayPassword = !this.displayPassword;
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
    if (!this.valid) {
      if (errorMessage !== undefined) {
        this.errorMessage = errorMessage;
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
        tooltipPosition={this.readonly && !this.value ? 'label' : this.tooltipPosition}
        helpText={this.helpText}
        errorMessage={this.errorMessage}
      >
        {this.readonly ? (
          this.value !== undefined && <b>{'•'.repeat(this.value.length)}</b>
        ) : (
          <span class="mg-c-input__input-group">
            <input
              type={this.displayPassword ? 'text' : 'password'}
              class="mg-c-input__box mg-c-input__box--width"
              value={this.value}
              id={this.identifier}
              name={this.name}
              placeholder={this.placeholder}
              title={this.placeholder}
              disabled={this.disabled}
              required={this.required}
              aria-invalid={(this.invalid === true).toString()}
              onInput={this.handleInput}
              onBlur={this.handleBlur}
              ref={(el: HTMLInputElement) => {
                if (el !== null) this.input = el;
              }}
            />
            <mg-button
              label={this.messages.input.password[this.displayPassword ? 'hide' : 'display']}
              disabled={this.disabled}
              variant="flat"
              class="mg-c-input__append-button"
              is-icon
              onClick={this.toggleDisplayPassword}
              aria-controls={this.identifier}
            >
              <mg-icon icon={this.displayPassword ? 'eye-slash' : 'eye'}></mg-icon>
            </mg-button>
          </span>
        )}
      </mg-input>
    );
  }
}
