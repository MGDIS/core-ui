import { Component, h, Prop, Element, Watch, Host, State } from '@stencil/core';
import { ClassList, isValidString } from '@mgdis/stencil-helpers';
import { widths, type Width, tooltipPositions, type TooltipPosition, type InputType, inputTypes } from './mg-input.conf';

@Component({
  tag: 'mg-input',
  styleUrl: '../../../../../node_modules/@mgdis/styles/dist/components/mg-input.css',
  shadow: true,
})
export class MgInput {
  /************
   * Internal *
   ************/

  // HTML selector
  private legendId: string;
  private helpTextId: string;
  private helpTextErrorId: string;
  private readonly slotLabel = 'label';
  private readonly slotError = 'error';
  private readonly slotHelpText = 'help-text';

  // slots elements
  private labelSlotElement: HTMLMgInputTitleElement;
  private errorMessageSlotElement: HTMLElement;
  private helptextMessageSlotElement: HTMLElement;

  // style
  private readonly classHasError = 'mg-c-input--has-error';
  private readonly classLabelOnTop = 'mg-c-input--label-on-top';
  private readonly classReadonly = 'mg-c-input--readonly';

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
      throw new Error('<mg-input> prop "identifier" is required.');
    } else {
      this.helpTextId = `${this.identifier}-help-text`;
      this.helpTextErrorId = `${this.identifier}-error`;
      this.legendId = `${this.identifier}-title`;
    }
  }

  /**
   * Define input label
   */
  @Prop() label!: string;

  /**
   * Define if label is displayed on top
   */
  @Prop() labelOnTop: boolean;
  @Watch('labelOnTop')
  watchLabelOnTop(newValue: MgInput['labelOnTop']): void {
    if (newValue) {
      this.classCollection.add(this.classLabelOnTop);
    } else {
      this.classCollection.delete(this.classLabelOnTop);
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
   * Define values
   */
  @Prop() value: string;

  /**
   * Defines value to display in readonly mode
   */
  @Prop({ mutable: true }) readonlyValue: string | string[];
  @Watch('readonlyValue')
  watchReadonlyValue(newValue: MgInput['readonlyValue']): void {
    if (newValue === undefined) {
      this.readonlyValue = this.value;
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
  @Watch('tooltipPosition')
  watchTooltipPosition(newValue: MgInput['tooltipPosition']) {
    if (!tooltipPositions.includes(newValue)) {
      throw new Error(`<mg-input> prop "tooltipPosition" must be one of: ${tooltipPositions.join(', ')}`);
    }
  }

  /**
   * Define if input is required
   */
  @Prop() required: boolean = false;

  /**
   * Define if input is readonly
   */
  @Prop() readonly: boolean = false;
  @Watch('readonly')
  watchReadonly(newValue: MgInput['readonly']): void {
    if (newValue) {
      this.classCollection.add(this.classReadonly);
    } else {
      this.classCollection.delete(this.classReadonly);
    }
  }

  /**
   * Define if input is disabled
   */
  @Prop() disabled: boolean = false;
  @Watch('disabled')
  @Watch('readonly')
  @Watch('label')
  watchLabel(): void {
    if (!isValidString(this.label)) {
      throw new Error('<mg-input> prop "label" is required.');
    } else {
      this.renderLabel();
    }
  }
  /**
   * Define error message to display
   */
  @Prop() errorMessage: string;
  @Watch('errorMessage')
  watchErrorMessage(newValue: MgInput['errorMessage']): void {
    if (newValue) {
      this.classCollection.add(this.classHasError);
      this.renderErrorMessage();
    } else {
      this.classCollection.delete(this.classHasError);
      this.errorMessageSlotElement?.remove();
      this.errorMessageSlotElement = undefined;
    }
  }

  /**
   * Define help text to display
   */
  @Prop() helpText: string;
  @Watch('helpText')
  watchHelpText(newValue: MgInput['helpText']): void {
    if (newValue) {
      this.renderHelpText();
    } else {
      this.helptextMessageSlotElement?.remove();
      this.helptextMessageSlotElement = undefined;
    }
  }

  /**
   * Define aria-describedby ids to link with
   */
  @Prop() ariaDescribedbyIDs: string[];
  @Watch('identifier')
  @Watch('errorMessage')
  @Watch('helpText')
  @Watch('ariaDescribedbyIDs')
  watchAriaDescribedbyIDs(): void {
    // a11y IDs
    const ariaDescribedbyIDs = new Set(this.ariaDescribedbyIDs);
    // Help text
    if (this.helpText) {
      this.renderHelpText();
      if (!ariaDescribedbyIDs.has(this.helpTextId)) ariaDescribedbyIDs.add(this.helpTextId);
    }

    // Error Message
    if (this.errorMessage) {
      this.renderErrorMessage();
      if (!ariaDescribedbyIDs.has(this.helpTextErrorId)) ariaDescribedbyIDs.add(this.helpTextErrorId);
    }

    this.element.querySelectorAll(['input', 'select', 'textarea', '[role="switch"]'].join(', ')).forEach(element => {
      element.setAttribute('aria-describedby', Array.from(ariaDescribedbyIDs).join(' '));
    });
  }

  /**
   * Define input width
   */
  @Prop() mgWidth: Width;
  @Watch('mgWidth')
  watchMgWidth(newValue: MgInput['mgWidth']): void {
    // reset width class
    widths.forEach(width => {
      this.classCollection.delete(`mg-c-input--width-${width}`);
    });

    // apply new width
    if (newValue) this.classCollection.add(`mg-c-input--width-${this.mgWidth}`);
  }

  /**
   * Component classes
   */
  @Prop() classCollection: ClassList = new ClassList(['mg-c-input']);
  @Watch('classCollection')
  watchClassCollection(newValue: MgInput['classCollection']): void {
    if (!newValue.has('mg-c-input')) {
      this.classCollection.add('mg-c-input');
    }
  }

  /**
   * Define component type
   */
  @State() type: InputType = 'input';
  @Watch('type')
  watchType(newValue: MgInput['type']): void {
    inputTypes.forEach(className => {
      this.classCollection.delete(`mg-c-input--${className}`);
    });
    this.classCollection.add(`mg-c-input--${newValue}`);
    this.renderLabel();
  }

  /************
   * Methods *
   ************/

  /**
   * Set attributes on agiven HTML Element
   * @param element - element to update
   * @param attributes - attributes to apply
   */
  private setElement = (element: HTMLElement, attributes: [string, string][]): void => {
    attributes.forEach(([key, val]) => {
      element.setAttribute(key, val);
    });
  };

  /**
   * Render input label
   */
  private renderLabel(): void {
    this.labelSlotElement = this.element.querySelector(`[slot=${this.slotLabel}]`);
    const labelTextClass = 'mg-c-input-title__text';
    const labelAttributes: [string, string][] = [
      ['slot', this.slotLabel],
      ['identifier', this.identifier.toString()],
      ['readonly', this.readonly.toString()],
      ['required', ((this.required && !this.disabled) || false).toString()],
      ['is-legend', (this.type === 'fieldset').toString()],
    ];
    if (!this.labelSlotElement) {
      this.labelSlotElement = document.createElement('mg-input-title');
      this.setElement(this.labelSlotElement, labelAttributes);
      const label = document.createElement('span');
      label.classList.add(labelTextClass);
      this.labelSlotElement.appendChild(label);
      this.element.appendChild(this.labelSlotElement);
    }

    this.setElement(this.labelSlotElement, labelAttributes);
    this.labelSlotElement.getElementsByClassName(labelTextClass)[0].textContent = this.label;
  }

  /**
   * Render error message
   */
  private renderErrorMessage(): void {
    this.errorMessageSlotElement = this.element.querySelector(`[slot=${this.slotError}]`);
    if (!this.errorMessageSlotElement) {
      this.errorMessageSlotElement = document.createElement('div');
      this.errorMessageSlotElement.setAttribute('slot', this.slotError);
      this.element.appendChild(this.errorMessageSlotElement);
    }
    this.errorMessageSlotElement.setAttribute('id', this.helpTextErrorId);
    this.errorMessageSlotElement.innerHTML = this.errorMessage;
  }

  /**
   * Render help text message
   */
  private renderHelpText(): void {
    this.helptextMessageSlotElement = this.element.querySelector(`[slot=${this.slotHelpText}]`);
    if (!this.helptextMessageSlotElement) {
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
    //Check required properties
    this.watchIdentifier(this.identifier);
    this.watchLabel();
    this.watchLabelOnTop(this.labelOnTop);
    this.watchLabelConfig();
    this.watchReadonly(this.readonly);
    this.watchReadonlyValue(this.readonlyValue);
    this.watchTooltipPosition(this.tooltipPosition);
    this.watchMgWidth(this.mgWidth);
    this.watchClassCollection(this.classCollection);
    this.watchErrorMessage(this.errorMessage);
    this.watchHelpText(this.helpText);
    this.type = (this.element.dataset.inputType as InputType) || 'input';
  }

  /**
   * Validate slots
   */
  componentDidLoad(): void {
    this.watchAriaDescribedbyIDs();
    if (!this.readonly) {
      if (this.type === 'fieldset') {
        this.labelSlotElement.querySelector('legend').setAttribute('id', this.legendId);
      } else {
        if (!this.element.querySelector(`#${this.identifier}`)) {
          throw new Error(`<mg-input> "identifier" prop has no target for id: ${this.identifier}. Add an id to the targeted input.`);
        }
      }
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
    return (
      <Host
        class={this.classCollection.join()}
        role={this.type === 'fieldset' && !this.readonly && 'group'}
        aria-labelledby={this.type === 'fieldset' && `${this.identifier}-title`}
      >
        <div class={{ 'mg-c-input__title': true, 'mg-u-visually-hidden': this.labelHide }}>
          <slot name={this.slotLabel}></slot>
          {this.tooltip && !this.readonly && (this.tooltipPosition === 'label' || this.labelOnTop) && !this.labelHide && this.renderTooltip()}
        </div>
        <div class="mg-c-input__input-container">
          {this.readonly
            ? [
                Array.isArray(this.readonlyValue) ? (
                  <ul>
                    {this.readonlyValue.map(value => (
                      <li key={value}>
                        <strong>{value}</strong>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <strong>{this.readonlyValue}</strong>
                ),
                <slot></slot>,
              ]
            : [
                <div class="mg-c-input__input">
                  <slot></slot>
                  {this.tooltip && !this.readonly && !this.labelOnTop && (this.tooltipPosition === 'input' || this.labelHide) && this.renderTooltip()}
                </div>,
                this.helpText && (
                  <div class="mg-c-input__help-text">
                    <slot name={this.slotHelpText}></slot>
                  </div>
                ),
                !this.disabled && this.errorMessage && (
                  <div class="mg-c-input__error" aria-live="assertive">
                    <slot name={this.slotError}></slot>
                  </div>
                ),
              ]}
        </div>
      </Host>
    );
  }
}
