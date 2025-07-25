import { Component, h, Prop, Element, Watch, Host, State } from '@stencil/core';
import { isObject, isValideID, isValidString, toString } from '@mgdis/core-ui-helpers/dist/utils';
import { tooltipPositions, type TooltipPosition, classFieldset, classReadonly, classDisabled, classVerticalList, type ErrorMessageDetailsType } from './mg-input.conf';
import { initLocales } from '../../../../locales';

const isValidErrorMessageType = (msg: unknown): msg is ErrorMessageDetailsType => isObject(msg) && ['summary', 'details'].every(key => typeof msg[key] === 'string');

/**
 * @slot - Input content
 */
@Component({
  tag: 'mg-input',
  styleUrl: '../../../../../node_modules/@mgdis/styles/dist/components/mg-input.css',
  shadow: true,
})
export class MgInput {
  /************
   * Internal *
   ************/

  // Locales
  private messages;

  // HTML selectors
  private helpTextId: string;
  private helpTextErrorId: string;
  private readonly slotLabel = 'label';
  private readonly slotError = 'error';
  private readonly slotSummary = 'summary';
  private readonly slotDetails = 'details';
  private readonly slotHelpText = 'help-text';

  // slots elements
  private errorMessageSlotElement: HTMLElement | undefined;
  private helptextMessageSlotElement: HTMLElement | undefined;

  // style
  private readonly classInput = 'mg-c-input';
  private readonly classHasError = 'mg-c-input--has-error';
  private readonly classLabelOnTop = 'mg-c-input--label-on-top';

  /**************
   * Decorators *
   **************/

  /**
   * Get component DOM element
   */
  @Element() element: HTMLMgInputElement;

  /**
   * Identifier is used for the element ID (id is a reserved prop in Stencil.js)
   */
  @Prop() identifier!: string;
  @Watch('identifier')
  watchIdentifier(newValue: MgInput['identifier']): void {
    if (!isValidString(newValue)) {
      throw new Error(`<mg-input> prop "identifier" is required and must be a string. Passed value: ${toString(newValue)}.`);
    } else if (!isValideID(newValue)) {
      console.error(`<mg-input> prop "identifier" value is invalid. Passed value: ${toString(newValue)}.`);
    } else {
      this.helpTextId = `${this.identifier}-help-text`;
      this.helpTextErrorId = `${this.identifier}-error`;
    }
  }

  /**
   * Define input label
   */
  @Prop() label!: string;

  /**
   * Define if label is displayed on top
   */
  @Prop() labelOnTop = false;
  @Watch('labelOnTop')
  watchLabelOnTop(newValue: MgInput['labelOnTop']): void {
    if (newValue) {
      this.element.classList.add(this.classLabelOnTop);
    } else {
      this.element.classList.remove(this.classLabelOnTop);
    }
  }

  /**
   * Define if label is visible
   */
  @Prop() labelHide: boolean = false;
  @Watch('labelHide')
  @Watch('labelOnTop')
  watchLabelConfig(): void {
    if (this.labelHide && this.labelOnTop) {
      throw new Error('<mg-input> prop "labelOnTop" must not be paired with the prop "labelHide".');
    }
  }

  /**
   * Add a tooltip message next to the input
   */
  @Prop() tooltip?: string;

  /**
   * Define tooltip position
   */
  @Prop() tooltipPosition: TooltipPosition = 'input';
  @Watch('tooltipPosition')
  watchTooltipPosition(newValue: MgInput['tooltipPosition']) {
    if (!tooltipPositions.includes(newValue)) {
      throw new Error(`<mg-input> prop "tooltipPosition" must be one of: ${tooltipPositions.join(', ')}. Passed value: ${toString(newValue)}.`);
    }
  }

  /**
   * Define if input is required
   */
  @Prop() required: boolean = false;

  /**
   * Define error message to display
   */
  @Prop() errorMessage?: string | ErrorMessageDetailsType;
  @Watch('errorMessage')
  watchErrorMessage(newValue: MgInput['errorMessage']): void {
    if (isValidString(newValue) || isValidErrorMessageType(newValue)) {
      this.element.classList.add(this.classHasError);
    } else {
      this.element.classList.remove(this.classHasError);
    }
    // update error message slot
    this.renderErrorMessageSlot();
  }

  /**
   * Define help text to display
   */
  @Prop() helpText?: string;
  @Watch('helpText')
  watchHelpText(newValue: MgInput['helpText']): void {
    if (newValue && !this.isReadonly) {
      this.renderHelpText();
    } else {
      this.helptextMessageSlotElement?.remove();
      this.helptextMessageSlotElement = undefined;
    }
  }

  /**
   * Define aria-describedby ids to link with
   */
  @Prop({ mutable: true }) ariaDescribedbyIDs?: string[] | string = [];
  @Watch('identifier')
  @Watch('errorMessage')
  @Watch('helpText')
  @Watch('ariaDescribedbyIDs')
  watchAriaDescribedbyIDs(): void {
    if (this.isReadonly) {
      return;
    } else if (typeof this.ariaDescribedbyIDs === 'string') {
      this.ariaDescribedbyIDs = this.ariaDescribedbyIDs.split(' ');
      return;
    } else if (!(Array.isArray(this.ariaDescribedbyIDs) && this.ariaDescribedbyIDs.every(entry => typeof entry === 'string'))) {
      this.ariaDescribedbyIDs = [];
      return;
    }

    // a11y IDs
    const ariaDescribedbyIDs = new Set(this.ariaDescribedbyIDs);
    // Help text
    if (this.helpText !== undefined) {
      this.renderHelpText();
      ariaDescribedbyIDs.add(this.helpTextId);
    }

    // Error Message
    if (this.errorMessage !== undefined) {
      this.renderErrorMessageSlot();
      ariaDescribedbyIDs.add(this.helpTextErrorId);
    }

    this.element.querySelectorAll('input,select,textarea,[role="switch"]').forEach(element => {
      if (ariaDescribedbyIDs.size > 0) {
        element.setAttribute('aria-describedby', Array.from(ariaDescribedbyIDs).join(' '));
      } else {
        element.removeAttribute('aria-describedby');
      }
    });
  }

  /**
   * Component classes
   */
  // eslint-disable-next-line @stencil-community/no-unused-watch
  @Watch('class')
  watchClass(): void {
    if (!this.element.classList.contains(this.classInput)) {
      this.element.classList.add(this.classInput);
    }
    this.isFieldset = this.element.classList.contains(classFieldset);
    this.isReadonly = this.element.classList.contains(classReadonly);
    this.isDisabled = this.element.classList.contains(classDisabled);
    this.isVerticalList = this.element.classList.contains(classVerticalList);
  }

  /**
   * Element is fieldset
   */
  @State() isFieldset: boolean = false;

  /**
   * Element is readonly
   */
  @State() isReadonly: boolean = false;

  /**
   * Element is disabled
   */
  @State() isDisabled: boolean = false;

  /**
   * Element is disabled
   */
  @State() isVerticalList: boolean = false;

  /**
   * Trigger label update
   */
  // eslint-disable-next-line @stencil-community/no-unused-watch
  @Watch('class')
  @Watch('label')
  @Watch('required')
  @Watch('isReadonly')
  @Watch('isFieldset')
  watchLabel(): void {
    if (!isValidString(this.label)) {
      throw new Error(`<mg-input> prop "label" is required and must be a string. Passed value: ${toString(this.label)}.`);
    } else {
      this.watchAriaDescribedbyIDs();
      this.renderLabel();
    }
  }

  /************
   * Methods *
   ************/

  /**
   * Render input label
   */
  private renderLabel(): void {
    let labelSlotElement: HTMLMgInputTitleElement = this.element.querySelector(`[slot=${this.slotLabel}]`);

    // first remove previous labelslot if exist
    labelSlotElement?.remove();

    // create title element
    labelSlotElement = document.createElement('mg-input-title');
    [
      ['slot', this.slotLabel],
      ['identifier', this.identifier],
      ['readonly', this.isReadonly.toString()],
      ['required', ((this.required && !this.isDisabled) || false).toString()],
      ['is-legend', this.isFieldset.toString()],
    ].forEach(([attr, val]) => {
      labelSlotElement.setAttribute(attr, val);
    });

    // create label element
    const label = document.createElement('span');
    label.classList.add('mg-c-input-title__text');
    label.textContent = this.label;

    labelSlotElement.appendChild(label);
    this.element.appendChild(labelSlotElement);
  }

  /**
   * Render error message details element
   */
  private renderErrorDetailsMessage = (message: ErrorMessageDetailsType): void => {
    // remove error slot if it is NOT a MG-DETAIL
    if (this.errorMessageSlotElement?.nodeName !== 'MG-DETAILS') {
      this.errorMessageSlotElement?.remove();
    }
    // create OR update error summary
    let summarySlotElement = this.element.querySelector(`[slot=${this.slotError}] [slot=${this.slotSummary}]`);
    if (summarySlotElement === null) {
      summarySlotElement = document.createElement('span');
      summarySlotElement.setAttribute('slot', this.slotSummary);
    }
    summarySlotElement.innerHTML = message.summary;

    // create OR update error details
    let detailsSlotElement = this.element.querySelector(`[slot=${this.slotError}] [slot=${this.slotDetails}]`);
    if (detailsSlotElement === null) {
      detailsSlotElement = document.createElement('p');
      detailsSlotElement.setAttribute('slot', this.slotDetails);
      detailsSlotElement.classList.add('mg-c-input__error-details');
    }
    detailsSlotElement.innerHTML = message.details;

    // create error mg-details
    let mgDetails: HTMLMgDetailsElement = this.element.querySelector(`mg-details[slot=${this.slotError}]`);
    if (mgDetails === null) {
      mgDetails = document.createElement('mg-details');
      mgDetails.classList.add('mg-c-input__error');
      mgDetails.toggleClosed = this.messages.details.toggleClosed;
      mgDetails.toggleOpened = this.messages.details.toggleOpened;
      mgDetails.hideSummary = true;
      mgDetails.appendChild(summarySlotElement);
      mgDetails.appendChild(detailsSlotElement);
      this.element.appendChild(mgDetails);
    }
    this.errorMessageSlotElement = mgDetails;
  };

  /**
   * Render error message element
   */
  private renderErrorStringMessage(message: string): void {
    // remove error slot if it is a MG-DETAIL
    if (this.errorMessageSlotElement?.nodeName === 'MG-DETAILS') {
      this.errorMessageSlotElement.remove();
    }
    // create element if it does NOT exist
    else if (this.errorMessageSlotElement === null) {
      this.errorMessageSlotElement = document.createElement('div');
      this.element.appendChild(this.errorMessageSlotElement);
    }
    this.errorMessageSlotElement.innerHTML = message;
  }

  /**
   * Render error message slot element
   */
  private renderErrorMessageSlot(): void {
    this.errorMessageSlotElement = this.element.querySelector(`[slot=${this.slotError}]`);
    if (this.errorMessage !== undefined) {
      if (typeof this.errorMessage === 'string') {
        this.renderErrorStringMessage(this.errorMessage);
      } else {
        this.renderErrorDetailsMessage(this.errorMessage);
      }
      this.errorMessageSlotElement.setAttribute('slot', this.slotError);
      this.errorMessageSlotElement.setAttribute('id', this.helpTextErrorId);
    } else {
      this.errorMessageSlotElement?.remove();
      this.errorMessageSlotElement = undefined;
    }
  }

  /**
   * Render help text message
   */
  private renderHelpText(): void {
    this.helptextMessageSlotElement = this.element.querySelector(`[slot=${this.slotHelpText}]`);
    if (this.helptextMessageSlotElement === null) {
      this.helptextMessageSlotElement = document.createElement('div');
      this.helptextMessageSlotElement.setAttribute('slot', this.slotHelpText);
      this.element.appendChild(this.helptextMessageSlotElement);
    }
    this.helptextMessageSlotElement.setAttribute('id', this.helpTextId);
    this.helptextMessageSlotElement.innerHTML = this.helpText;
  }

  /*************
   * Lifecycle *
   *************/

  /**
   * Check if component props are well configured on init
   */
  componentWillLoad(): void {
    // Get locales
    this.messages = initLocales(this.element).messages;

    // Validate
    this.watchIdentifier(this.identifier);
    this.watchLabel();
    this.watchClass();
    this.watchLabelOnTop(this.labelOnTop);
    this.watchLabelConfig();
    this.watchTooltipPosition(this.tooltipPosition);
    this.watchHelpText(this.helpText);
    this.watchErrorMessage(this.errorMessage);
  }

  /**
   * Validate slots
   */
  componentDidLoad(): void {
    this.watchAriaDescribedbyIDs();
    if (!this.isReadonly && !this.isFieldset && this.element.querySelector(`#${this.identifier}`) === null) {
      throw new Error(`<mg-input> "identifier" prop has no target for id: ${this.identifier}. Add an id to the targeted input.`);
    }
  }

  /**
   * Get tooltip node
   * @returns mg-tooltip
   */
  private renderTooltip = (): HTMLMgTooltipElement => (
    <mg-tooltip identifier={`${this.identifier}-tooltip`} message={this.tooltip}>
      <mg-icon icon="info-circle"></mg-icon>
    </mg-tooltip>
  );

  /**
   * Render
   * @returns HTML Element
   */
  render(): HTMLElement {
    const isGroup = this.isFieldset && !this.isReadonly;
    return (
      <Host class={this.element.classList.toString()} role={isGroup ? 'group' : undefined} aria-labelledby={isGroup ? `${this.identifier}-title` : undefined}>
        <div class={{ 'mg-c-input__title': true, 'mg-u-visually-hidden': this.labelHide }}>
          <slot name={this.slotLabel}></slot>
          {this.tooltip && (this.tooltipPosition === 'label' || this.labelOnTop) && !this.labelHide && this.renderTooltip()}
        </div>
        <div class="mg-c-input__input-container">
          <div class="mg-c-input__input">
            <slot></slot>
            {this.tooltip && !this.labelOnTop && (this.tooltipPosition === 'input' || this.labelHide) && this.renderTooltip()}
          </div>
          {this.helptextMessageSlotElement && (
            <div class="mg-c-input__help-text">
              <slot name={this.slotHelpText}></slot>
            </div>
          )}
          {!this.isDisabled && this.errorMessage && (
            <div class="mg-c-input__error" aria-live="assertive">
              <slot name={this.slotError}></slot>
            </div>
          )}
        </div>
      </Host>
    );
  }
}
