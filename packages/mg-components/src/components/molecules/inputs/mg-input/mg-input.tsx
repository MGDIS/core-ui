import { Component, h, Prop, Element, Watch, Host } from '@stencil/core';
import { widths, Width, MgInputProps, tooltipPositions } from './mg-input.conf';
import { ClassList, isValidString } from '@mgdis/stencil-helpers';

@Component({
  tag: 'mg-input',
  styleUrl: '../../../../../node_modules/@mgdis/styles/dist/components/mg-input.css',
  shadow: true,
})
export class MgInput implements MgInputProps {
  /************
   * Internal *
   ************/

  // HTML selector
  private helpTextId: string;
  private helpTextErrorId: string;

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
  validateIdentifier(newValue: MgInput['identifier']): void {
    if (!isValidString(newValue)) throw new Error('<mg-input> prop "identifier" is required.');
  }

  /**
   * Define if mg-input is a fieldset
   */
  @Prop() isFieldset = false;

  /**
   * Input label
   */
  @Prop() label!: string;
  @Watch('label')
  validateLabel(newValue: MgInput['label']): void {
    if (!isValidString(newValue)) throw new Error('<mg-input> prop "label" is required.');
  }

  /**
   * Define if label is displayed on top
   */
  @Prop() labelOnTop: boolean;
  @Watch('labelOnTop')
  validateLabelOnTop(newValue: MgInput['labelOnTop']): void {
    if (newValue) this.classCollection.add(this.classLabelOnTop);
    else this.classCollection.delete(this.classLabelOnTop);
  }

  /**
   * Define if label is visible
   */
  @Prop() labelHide = false;
  @Watch('labelHide')
  @Watch('labelOnTop')
  validateLabelConfig(): void {
    if (this.labelHide && this.labelOnTop) throw new Error('<mg-input> prop "labelOnTop" must not be paired with the prop "labelHide".');
  }

  /**
   * Define values
   */
  @Prop() value;

  /**
   *
   */
  @Prop() tooltipPosition;
  @Watch('tooltipPosition')
  validateTooltipPosition(newValue: MgInput['tooltipPosition']) {
    if (!tooltipPositions.includes(newValue)) throw new Error(`<mg-input> prop "tooltipPosition" must be one of: ${tooltipPositions.join(', ')}`);
  }

  /**
   * Defines value to display in readonly mode
   */
  @Prop({ mutable: true }) readonlyValue;
  @Watch('readonlyValue')
  validateReadonlyValue(newValue: MgInput['readonlyValue']): void {
    if (newValue === undefined) this.readonlyValue = this.value;
  }

  /**
   * Define error message to display
   */
  @Prop() errorMessage;
  @Watch('errorMessage')
  validateErrorMessage(newValue: MgInput['errorMessage']): void {
    if (newValue) this.classCollection.add(this.classHasError);
    else this.classCollection.delete(this.classHasError);
  }

  /**
   * Define aria-describedby ids to link with
   */
  @Prop({ mutable: true }) ariaDescribedbyIDs;
  @Watch('ariaDescribedbyIDs')
  validateAriaDescribedbyIDs(newValue: MgInput['ariaDescribedbyIDs']): void {
    this.applyAriadescribedBy(Array.from(this.element.children), newValue);
  }

  /**
   * Define if input is required
   */
  @Prop() required = false;

  /**
   * Define if input is readonly
   */
  @Prop() readonly = false;
  @Watch('readonly')
  validateReadonly(newValue: MgInput['readonly']): void {
    if (newValue) {
      this.classCollection.add(this.classReadonly);
    } else {
      this.classCollection.delete(this.classReadonly);

      // a11y IDs
      const ariaDescribedbyIDs: Set<string> = new Set(this.ariaDescribedbyIDs);

      // Help text
      this.helpTextId = `${this.identifier}-help-text`;
      if (isValidString(this.helpText)) ariaDescribedbyIDs.add(this.helpTextId);

      // Error Message
      this.helpTextErrorId = `${this.identifier}-error`;
      if (isValidString(this.errorMessage)) ariaDescribedbyIDs.add(this.helpTextErrorId);

      // apply IDs
      this.ariaDescribedbyIDs = ariaDescribedbyIDs;
    }
  }

  /**
   * Define if input is disabled
   */
  @Prop() disabled = false;

  /**
   * Add a tooltip message next to the input
   */
  @Prop() tooltip: string;

  /**
   * Add a help text under the input, usually expected data format and example
   */
  @Prop() helpText: string;

  /**
   * Define input width
   */
  @Prop() mgWidth: Width = 'full';
  @Watch('mgWidth')
  validateMgWidth(newValue: MgInput['mgWidth']): void {
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
  validateClassCollection(newValue: MgInput['classCollection']): void {
    if (!newValue.has('mg-c-input')) this.classCollection.add('mg-c-input');
  }

  /************
   * Methods *
   ************/

  /**
   * Apply in all input child node the aria-describedby attribute
   * @param children - Represent scoped elements
   * @param ariaDescribedbyIDs - List of IDs
   * @param utils - Stencil.js utils
   * @returns Children with aria-describedby attribute
   */
  private applyAriadescribedBy = (children: Element[], ariaDescribedbyIDs: Set<string>): void => {
    children.map(child => {
      if (['input', 'select', 'textarea'].includes(child.tagName)) {
        child.setAttribute('aria-describedby', [...ariaDescribedbyIDs].join(' '));
      }

      // we recursively apply ariadescribedBy attributes to child input nodes if exists
      this.applyAriadescribedBy(Array.from(child.children), ariaDescribedbyIDs);
    });
  };

  /*************
   * Lifecycle *
   *************/

  /**
   * Check if component props are well configured on init
   * @returns timeout
   */
  componentWillLoad(): void {
    //Check required properties
    this.validateIdentifier(this.identifier);
    this.validateLabelOnTop(this.labelOnTop);
    this.validateLabelConfig();
    this.validateLabel(this.label);
    this.validateReadonly(this.readonly);
    this.validateReadonlyValue(this.readonlyValue);
    this.validateTooltipPosition(this.tooltipPosition);
    this.validateMgWidth(this.mgWidth);
    this.validateAriaDescribedbyIDs(this.ariaDescribedbyIDs);
    this.validateClassCollection(this.classCollection);
    this.validateErrorMessage(this.errorMessage);
  }

  /**
   * Get tooltip node
   * @returns mg-tooltip
   */
  private renderTooltip = (): HTMLMgTooltipElement =>
    this.tooltip &&
    !this.readonly && (
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
      <Host class={this.classCollection.join()} role={this.isFieldset && !this.readonly && 'group'} >
        <div class={{ 'mg-c-input__title': true, 'mg-u-visually-hidden': this.labelHide }}>
          <mg-input-title identifier={this.identifier} readonly={this.readonly} required={this.required && !this.disabled && !this.readonly} is-legend={this.isFieldset}>
            {this.label}
          </mg-input-title>
          {(this.tooltipPosition === 'label' || this.labelOnTop) && !this.labelHide && this.renderTooltip()}
        </div>
        <div class="mg-c-input__input-container">
          {this.readonly ? (
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
            )
          ) : (
            [
              <div class="mg-c-input__input">
                <slot></slot>
                {!this.labelOnTop && (this.tooltipPosition === 'input' || this.labelHide) && this.renderTooltip()}
              </div>,
              this.helpText && <div id={this.helpTextId} class="mg-c-input__help-text" innerHTML={this.helpText}></div>,
              this.errorMessage && !this.readonly && !this.disabled && (
                <div id={this.helpTextErrorId} class="mg-c-input__error" innerHTML={this.errorMessage} aria-live="assertive"></div>
              ),
            ]
          )}
        </div>
      </Host>
    );
  }
}
