import { Component, h, Prop, Element, Watch, Host, State } from '@stencil/core';
import { isValidString, isValideID, toString } from '@mgdis/core-ui-helpers/dist/utils';
import { normalizeBooleanAttributes } from '@mgdis/core-ui-helpers/dist/stencil';
import { tooltipPositions, type TooltipPosition, classFieldset, classReadonly, classDisabled, classVerticalList, labelHeadings, labelHeading } from './mg-input.conf';

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

  // HTML selectors
  private helpTextId: string;
  private helpTextErrorId: string;
  private readonly slotLabel = 'label';
  private readonly slotError = 'error';
  private readonly slotHelpText = 'help-text';
  // Block-level elements that cannot be nested inside a <p>.
  // helpText/errorMessage are injected via innerHTML and may contain HTML: when block content
  // is detected we fall back to <div> to keep the markup valid (RGAA 8.2), otherwise we use a
  // semantic <p> for the (textual) message (RGAA 8.9).
  private readonly blockLevelContentRegExp =
    /<(address|article|aside|blockquote|details|dialog|div|dl|fieldset|figure|figcaption|footer|form|h[1-6]|header|hr|main|nav|ol|p|pre|section|table|ul)[\s/>]/i;

  // slots elements
  private errorMessageSlotElement: HTMLElement;
  private helptextMessageSlotElement: HTMLElement;

  // style
  private readonly classInput = 'mg-c-input';
  private readonly classHasError = 'mg-c-input--has-error';
  private readonly classLabelOnTop = 'mg-c-input--label-on-top';
  private readonly classHasHeading = 'mg-c-input--has-heading';
  private readonly classLabelBorderDisplay = 'mg-c-input--label-border-display';
  private readonly classInputsOnBottom = 'mg-c-input--inputs-on-bottom';

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
   * Define label heading, use to define label with associated semantic
   * You must pair this mode with `labelOnTop`and `fieldset` class
   */
  @Prop({ mutable: true }) labelHeading?: labelHeading;
  @Watch('labelHeading')
  watchlabelHeading(newValue: MgInput['labelHeading']): void {
    if (this.isFieldset && this.labelOnTop && labelHeadings.includes(newValue)) {
      this.element.classList.add(this.classHasHeading);
    } else {
      if ((!this.isFieldset && newValue !== undefined) || typeof newValue === 'string') {
        throw new Error(`<mg-input> prop "labelHeading" must be used with a fieldset and be one of: ${labelHeadings.join(', ')}. Passed value: ${toString(newValue)}.`);
      }
      this.labelHeading = undefined;
      this.element.classList.remove(this.classHasHeading);
    }
  }

  /**
   * Define if label border is visible
   * You must pair this mode with `labelOnTop`and `fieldset` class
   */
  @Prop() labelBorderDisplay: boolean = false;
  @Watch('labelBorderDisplay')
  watchLabelBorderDisplay(newValue: MgInput['labelBorderDisplay']): void {
    if (this.isFieldset && this.labelOnTop && newValue) {
      this.element.classList.add(this.classLabelBorderDisplay);
    } else {
      this.element.classList.remove(this.classLabelBorderDisplay);
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
  @Prop() errorMessage?: string;
  @Watch('errorMessage')
  watchErrorMessage(newValue: MgInput['errorMessage']): void {
    if (newValue !== undefined) {
      this.element.classList.add(this.classHasError);
      this.renderErrorMessage();
    } else {
      this.element.classList.remove(this.classHasError);
      this.errorMessageSlotElement?.remove();
      this.errorMessageSlotElement = undefined;
    }
  }

  /**
   * Define help text to display
   */
  @Prop() helpText?: string;
  @Watch('helpText')
  watchHelpText(newValue: MgInput['helpText']): void {
    if (isValidString(newValue) && !this.isReadonly) {
      this.renderHelpText();
    } else {
      this.helptextMessageSlotElement?.remove();
      this.helptextMessageSlotElement = undefined;
    }
  }

  /**
   * Display inputs after help-text and error message
   */
  @Prop() inputsOnBottom? = false;
  @Watch('inputsOnBottom')
  watchInputsOnBottom(newValue: MgInput['inputsOnBottom']): void {
    if (newValue) {
      this.element.classList.add(this.classInputsOnBottom);
    } else {
      this.element.classList.remove(this.classInputsOnBottom);
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
    if (isValidString(this.helpText)) {
      this.renderHelpText();
      if (!ariaDescribedbyIDs.has(this.helpTextId)) ariaDescribedbyIDs.add(this.helpTextId);
    }

    // Error Message
    if (isValidString(this.errorMessage)) {
      this.renderErrorMessage();
      if (!ariaDescribedbyIDs.has(this.helpTextErrorId)) ariaDescribedbyIDs.add(this.helpTextErrorId);
    }

    const inputs = this.element.querySelectorAll('input,select,textarea,[role="switch"]');
    inputs.forEach((element: HTMLElement) => {
      this.updateElementAriaDescribedby(element, ariaDescribedbyIDs);
    });

    // use timeout to await for legend render for componentWillLoad hook
    setTimeout(() => {
      const legend = this.element.querySelector('legend');
      if (legend !== null) {
        this.updateElementAriaDescribedby(legend, ariaDescribedbyIDs);
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
   * Update element aria-describedby
   * @param element - element to update
   * @param ariaDescribedbyIDs - ariaDescribedbyIDs references
   */
  private updateElementAriaDescribedby = (element: HTMLElement, ariaDescribedbyIDs: Set<string>): void => {
    if (ariaDescribedbyIDs.size > 0) {
      element.setAttribute('aria-describedby', Array.from(ariaDescribedbyIDs).join(' '));
    } else {
      element.removeAttribute('aria-describedby');
    }
  };

  /**
   * Render input label
   */
  private renderLabel(): void {
    let labelSlotElement: HTMLMgInputTitleElement = this.element.querySelector(`[slot=${this.slotLabel}]`);

    // first remove previous labelslot if exist
    labelSlotElement?.remove();

    // create title element
    labelSlotElement = document.createElement('mg-input-title');
    labelSlotElement.setAttribute('slot', this.slotLabel);
    labelSlotElement.setAttribute('identifier', this.identifier);
    // Set boolean props via property assignment to honour HTML attribute-presence semantics: an
    // attribute set to "false" would now be normalized to `true` by mg-input-title's helper.
    labelSlotElement.readonly = this.isReadonly;
    labelSlotElement.required = (this.required && !this.isDisabled) || false;
    labelSlotElement.isLegend = this.isFieldset;

    // create label element
    if (labelHeadings.includes(this.labelHeading)) {
      let label = this.element.shadowRoot.querySelector(this.labelHeading);
      if (label === null) {
        label = document.createElement(this.labelHeading);
        label.classList.add('mg-c-input-title__text');
        labelSlotElement.appendChild(label);
      }
      label.textContent = this.label;
    } else {
      labelSlotElement.textContent = this.label;
    }
    this.element.appendChild(labelSlotElement);

    // update aria-describedby
    this.watchAriaDescribedbyIDs();
  }

  /**
   * Get the semantic tag name for a slotted message.
   * Phrasing (textual/inline) content uses <p> (RGAA 8.9); block-level content falls back to
   * <div> to avoid invalid nesting such as <p><p>…</p></p> (RGAA 8.2).
   * @param content - the HTML content that will be injected in the slot
   * @returns the tag name to use
   */
  private getSlotMessageTagName(content: string): 'p' | 'div' {
    return this.blockLevelContentRegExp.test(content) ? 'div' : 'p';
  }

  /**
   * Get the existing slotted element or (re)create it with the expected tag.
   * The element is recreated when its current tag no longer matches the expected one
   * (e.g. the content switched from text to block HTML), keeping the slot id and position.
   * @param slot - the slot name
   * @param tagName - the expected tag name
   * @returns the slotted element
   */
  private getSlotMessageElement(slot: string, tagName: 'p' | 'div'): HTMLElement {
    let slotElement = this.element.querySelector<HTMLElement>(`[slot=${slot}]`);
    if (slotElement !== null && slotElement.tagName.toLowerCase() !== tagName) {
      slotElement.remove();
      slotElement = null;
    }
    if (slotElement === null) {
      slotElement = document.createElement(tagName);
      slotElement.setAttribute('slot', slot);
      this.element.appendChild(slotElement);
    }
    return slotElement;
  }

  /**
   * Render error message
   */
  private renderErrorMessage(): void {
    this.errorMessageSlotElement = this.getSlotMessageElement(this.slotError, this.getSlotMessageTagName(this.errorMessage));
    this.errorMessageSlotElement.setAttribute('id', this.helpTextErrorId);
    this.errorMessageSlotElement.innerHTML = this.errorMessage;
  }

  /**
   * Render help text message
   */
  private renderHelpText(): void {
    this.helptextMessageSlotElement = this.getSlotMessageElement(this.slotHelpText, this.getSlotMessageTagName(this.helpText));
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
    normalizeBooleanAttributes(this);
    this.watchIdentifier(this.identifier);
    this.watchLabel();
    this.watchClass();
    this.watchLabelOnTop(this.labelOnTop);
    this.watchLabelConfig();
    this.watchTooltipPosition(this.tooltipPosition);
    this.watchHelpText(this.helpText);
    this.watchErrorMessage(this.errorMessage);
    this.watchInputsOnBottom(this.inputsOnBottom);
    this.watchlabelHeading(this.labelHeading);
    this.watchLabelBorderDisplay(this.labelBorderDisplay);
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
   * Get input container element
   * @returns ordered elements
   */
  private inputContainerElements = (): HTMLElement[] => {
    const elements = [
      this.helptextMessageSlotElement && (
        <div class="mg-c-input__help-text">
          <slot name={this.slotHelpText}></slot>
        </div>
      ),
      !this.isDisabled && this.errorMessage && (
        <div class="mg-c-input__error" aria-live="assertive">
          <slot name={this.slotError}></slot>
        </div>
      ),
    ];
    const inputSlot = (
      <div class="mg-c-input__input">
        <slot></slot>
        {this.tooltip && !this.labelOnTop && (this.tooltipPosition === 'input' || this.labelHide) && this.renderTooltip()}
      </div>
    );
    if (this.inputsOnBottom) {
      return [...elements, inputSlot];
    } else {
      return [inputSlot, ...elements];
    }
  };

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
        <div class="mg-c-input__input-container">{this.inputContainerElements()}</div>
      </Host>
    );
  }
}
