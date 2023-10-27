import { Component, Element, Event, EventEmitter, h, Method, Prop, State, Watch } from '@stencil/core';
import { createID, ClassList } from '../../../utils/components.utils';
import { initLocales } from '../../../locales';
import { HTMLMgInputsElement } from '../inputs/MgInput.conf';

@Component({
  tag: 'mg-form',
  styleUrl: '../../../../node_modules/@mgdis/styles/dist/components/mg-form.css',
  shadow: true,
})
export class MgForm {
  /************
   * Internal *
   ************/

  private mgInputs: HTMLMgInputsElement[];
  private mgButtons: HTMLMgButtonElement[];

  // Classes
  private readonly classAllRequired = 'mg-c-form--all-required';

  // HTML selector
  private form: HTMLFormElement;

  // Locales
  private messages;

  /**************
   * Decorators *
   **************/

  /**
   * Get component DOM element
   */
  @Element() element: HTMLMgFormElement;

  /**
   * Identifier is used for the element ID (id is a reserved prop in Stencil.js)
   * If not set, it will be created.
   */
  @Prop() identifier: string = createID('mg-form');

  /**
   * Input name
   * If not set the value equals the identifier
   */
  @Prop() name: string = this.identifier;

  /**
   * Define if form is readonly
   */
  @Prop() readonly = false;

  /**
   * Define if form is disabled
   */
  @Prop() disabled = false;
  @Watch('readonly')
  @Watch('disabled')
  handleAttributeChange(): void {
    this.setMgInputs();
    this.setRequiredMessage();
  }

  /**
   * Define form valid state
   */
  @Prop({ mutable: true }) valid: boolean;

  /**
   * Define form invalid state
   */
  @Prop({ mutable: true }) invalid: boolean;

  /**
   * Component classes
   */
  @State() classCollection: ClassList = new ClassList(['mg-c-form']);

  /**
   * Required message
   */
  @State() requiredMessage: string;

  /**
   * Emitted event on form validity check
   * Tells if form is valid or not
   */
  @Event({ eventName: 'form-valid' }) formValid: EventEmitter<boolean>;

  /**
   * Emitted event on form submit
   */
  @Event({ eventName: 'form-submit' }) formSubmit: EventEmitter<boolean>;

  /**
   * Display input error if it exists.
   */
  @Method()
  async displayError(): Promise<void> {
    if (!this.readonly) {
      this.mgInputs.forEach(input => {
        input.displayError && input.displayError();
      });
      this.checkValidity();
    }
  }

  /**
   * Define required message based on mg-inputs required elements
   */
  private setRequiredMessage = (): void => {
    // init required message
    this.requiredMessage = null;
    this.classCollection.delete(this.classAllRequired);
    // If the form is disabled or readonly none of them are required
    // Check if all fields are not editable (readonly or disabled)
    const isEditable = input => !(input.disabled || input.readonly);
    const isMgInputToggle = input => input.nodeName === 'MG-INPUT-TOGGLE';
    if (!this.disabled && !this.readonly && this.mgInputs.some(input => isEditable(input) && !isMgInputToggle(input))) {
      // Get editable inputs
      const editableInputs: HTMLMgInputsElement[] = this.mgInputs.filter(isEditable);
      // Get required inputs
      // mg-input-toggle can not be required
      const requiredInputs: HTMLMgInputsElement[] = editableInputs.filter(input => !isMgInputToggle(input) && input.required);
      // All inputs are required
      if (
        [requiredInputs.length, editableInputs.length].every(length => length === 1) ||
        (requiredInputs.length > 1 && requiredInputs.length === editableInputs.filter(input => !isMgInputToggle(input)).length)
      ) {
        this.requiredMessage = this.getRequiredMessageBasedOnCount(requiredInputs, 'allRequiredSingle', 'allRequired');
        this.classCollection.add(this.classAllRequired);
      }
      // Some fields are required
      else if (requiredInputs.length > 0) {
        this.requiredMessage = this.getRequiredMessageBasedOnCount(requiredInputs, 'requiredSingle', 'required');
      }
    }
  };

  /**
   * Returns a required message based on the count of required inputs.
   * @param requiredInputs - An array of required input elements.
   * @param keySingle - The key for the singular message format.
   * @param keyPlural - The key for the plural message format.
   * @returns The appropriate required message based on the count of required inputs.
   */
  private getRequiredMessageBasedOnCount = (requiredInputs: HTMLMgInputsElement[], keySingle: string, keyPlural: string) =>
    this.messages.form[requiredInputs.length === 1 ? keySingle : keyPlural];

  /**
   * Check if form is valid
   */
  private checkValidity = (): void => {
    // Update required on input event
    this.setRequiredMessage();

    this.valid = !this.mgInputs.some(input => input.invalid);
    this.invalid = !this.valid;
    // We need to send valid event if it is the same value
    this.formValid.emit(this.valid);
  };

  /**
   * Handle Form Submit
   * @param event - submit event
   */
  private handleFormSubmit = (event: SubmitEvent): void => {
    event.preventDefault();
    this.formSubmit.emit();
  };

  /**
   * Set mgInputs
   */
  private setMgInputs = (): void => {
    // Get slotted mgInputs
    this.mgInputs = Array.from(this.element.querySelectorAll('*')).filter((node: Node) => node.nodeName.startsWith('MG-INPUT-')) as HTMLMgInputsElement[];
    // Set inputs readonly or disabled based on form configuration
    // Othewise listen to events
    this.mgInputs.forEach(input => {
      if (this.readonly) input.readonly = true;
      else if (this.disabled) input.disabled = true;
      else input.addEventListener('input-valid', this.checkValidity);
    });
  };

  /*************
   * Lifecycle *
   *************/

  /**
   * Check if component props are well configured on init
   */
  componentWillLoad(): void {
    // Get locales
    this.messages = initLocales(this.element).messages;

    // Get slotted mgButtons
    this.mgButtons = Array.from(this.element.querySelectorAll('mg-button'));

    // Set button form identifier
    this.mgButtons.forEach(mgButton => {
      mgButton.setAttribute('form', this.identifier);
    });

    // Set mgInputs
    this.setMgInputs();

    // Define required message
    this.setRequiredMessage();

    // Check validity when slotted mgInputs are ready
    Promise.all(
      this.mgInputs.map(async input => {
        try {
          await input.componentOnReady();
        } catch {} // prevent error with VueJS first render
      }),
    ).then(() => {
      this.checkValidity();
    });
  }

  /**
   * Add slot listeners
   */
  componentDidLoad(): void {
    this.mgButtons.forEach(mgButton => {
      // submit buttons should trigger form submition;
      if (['submit', null].includes(mgButton.getAttribute('type'))) {
        mgButton.addEventListener('click', () => {
          this.form.dispatchEvent(new SubmitEvent('submit', { bubbles: true, cancelable: true }));
        });
      }
    });
    // Update mgInputs when mgForm content change
    new MutationObserver(() => {
      this.setMgInputs();
    }).observe(this.element, { childList: true });
  }

  /**
   * Render
   * @returns HTML Element
   */
  render(): HTMLElement {
    return (
      <form class={this.classCollection.join()} id={this.identifier} name={this.name} ref={(el: HTMLFormElement) => (this.form = el)} onSubmit={this.handleFormSubmit}>
        {this.requiredMessage && <p innerHTML={this.requiredMessage}></p>}
        <slot></slot>
        {!this.readonly && !this.disabled && <slot name="actions"></slot>}
      </form>
    );
  }
}
