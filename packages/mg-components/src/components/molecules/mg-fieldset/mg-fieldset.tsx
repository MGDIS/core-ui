import { Component, Element, h, Method, Prop, State, Watch } from '@stencil/core';
import { ClassList, isValidString } from '@mgdis/core-ui-helpers/dist/utils';
import { classReadonly, HTMLMgInputsElement, isMgInputFile, labelHeading } from '../inputs/mg-input/mg-input.conf';

@Component({
  tag: 'mg-fieldset',
  shadow: true,
})
export class MgFieldset {
  /************
   * Internal *
   ************/

  // HTML selector
  private mgInputs: (HTMLMgInputsElement & { disabled: boolean })[];

  /**************
   * Decorators *
   **************/

  /**
   * Get component DOM element
   */
  @Element() element: HTMLMgFieldsetElement;

  /**
   * Identifier is used for the element ID (id is a reserved prop in Stencil.js)
   */
  @Prop() identifier!: string;

  /**
   * Fieldset name
   * If not set the value equals the identifier
   */
  @Prop() name: string = this.identifier;

  /**
   * Fieldset legend
   */
  @Prop() legend!: string;

  /**
   * Define if legend is visible
   */
  @Prop() legendHide = false;

  /**
   * Define legend heading, use to define legend with associated semantic
   */
  @Prop() legendHeading?: labelHeading;

  /**
   * Define if legend border is visible.
   */
  @Prop() legendBorderDisplay = false;
  @Watch('legendBorderDisplay')
  watchLegendBorderDisplay(newValue: MgFieldset['legendBorderDisplay']): void {
    if (newValue && !isValidString(this.legendHeading)) {
      throw new Error('<mg-fieldset> prop "legendBorderDisplay" must not be paired with the prop "legendHeading".');
    }
  }

  /**
   * Define if inputs are readonly
   */
  @Prop() readonly = false;
  @Watch('readonly')
  watchReadonly(newValue: MgFieldset['readonly']): void {
    if (newValue) {
      this.classCollection.add(classReadonly);
    } else {
      this.classCollection.delete(classReadonly);
    }
  }

  /**
   * Define if inputs are disabled
   */
  @Prop() disabled = false;
  @Watch('readonly')
  @Watch('disabled')
  handleAttributeChange(): void {
    this.setMgInputs();
  }

  /**
   * Add a tooltip message next to the fieldset
   */
  @Prop() tooltip?: string;

  /**
   * Add a help text under the fieldset, usually expected data format and example
   */
  @Prop() helpText?: string;

  /**
   * Define custom error message to display
   */
  @State() errorMessage?: string;

  /**
   * Define fieldset valid state
   */
  @State() valid: boolean;

  /**
   * Component classes
   */
  @State() classCollection: ClassList = new ClassList(['mg-c-input--fieldset']);

  /**
   * Component is not a candidate for constraint validation.
   * You can use this method to define the `errorMessage` and set the `valid` state to `false`.
   * @param errorMessage - error message to display. Use a valid `string` to define an error or `undefined` to delete the error
   */
  @Method()
  async setCustomValidity(errorMessage?: string): Promise<void> {
    if (isValidString(errorMessage)) {
      this.errorMessage = errorMessage;
    } else {
      this.errorMessage = undefined;
    }
    this.checkValidity();
  }

  /**
   * Display inputs error if it exists.
   */
  @Method()
  async displayError(): Promise<void> {
    if (!this.readonly) {
      this.mgInputs.forEach(input => {
        input.displayError();
      });
    }
  }

  /**
   * Check if fieldset is valid
   */
  private checkValidity = (): void => {
    this.valid = !(this.mgInputs.some(input => input.invalid) || this.errorMessage?.length > 0);
  };

  /**
   * Set mgInputs
   */
  private setMgInputs = (): void => {
    // Get slotted mgInputs
    this.mgInputs = Array.from(this.element.querySelectorAll('*')).filter((node: Node) => node.nodeName.startsWith('MG-INPUT')) as (HTMLMgInputsElement & { disabled: boolean })[];
    // Set inputs readonly or disabled based on form configuration
    // Othewise listen to events
    this.mgInputs.forEach(input => {
      if (this.readonly && !isMgInputFile(input)) {
        input.readonly = true;
      } else if (this.disabled) {
        input.disabled = true;
      } else {
        input.addEventListener('input-valid', this.checkValidity);
      }
    });
  };

  /*************
   * Lifecycle *
   *************/

  /**
   * Check if component props are well configured on init
   */
  componentWillLoad(): void {
    this.watchReadonly(this.readonly);
    this.watchLegendBorderDisplay(this.legendBorderDisplay);
    this.setMgInputs();
  }

  /**
   * Add slot listeners
   */
  componentDidLoad(): void {
    // Update mgInputs when mgForm content change
    const observerOptions = { childList: true, subtree: true };
    new MutationObserver(mutations => {
      if (mutations.some(mutation => Object.keys(observerOptions).includes(mutation.type))) {
        this.setMgInputs();
      }
    }).observe(this.element, observerOptions);
  }

  /**
   * Render
   * @returns HTML Element
   */
  render(): HTMLElement {
    return (
      <mg-input
        label={this.legend}
        identifier={this.identifier}
        class={this.classCollection.join()}
        labelOnTop={!this.legendHide}
        labelHeading={this.legendHeading}
        labelBorderDisplay={this.legendHeading && this.legendBorderDisplay}
        labelHide={this.legendHide}
        inputsOnBottom={this.legendHeading !== undefined}
        tooltip={this.tooltip}
        tooltipPosition={'label'}
        helpText={this.helpText}
        errorMessage={!this.valid && isValidString(this.errorMessage) ? this.errorMessage : undefined}
      >
        <span class="mg-c-input__input-group">
          <slot></slot>
        </span>
      </mg-input>
    );
  }
}
