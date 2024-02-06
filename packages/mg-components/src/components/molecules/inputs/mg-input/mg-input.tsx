import { Component, h, Prop, Element, Watch } from '@stencil/core';
import { widths, Width, MgInputProps } from './mg-input.conf';
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
    if (newValue) this.classCollection.add('mg-c-input--label-on-top');
    else this.classCollection.delete('mg-c-input--label-on-top');
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
   * Defines value to display in readonly mode
   */
  @Prop() readonlyValue;
  @Watch('readonlyValue')
  validateReadonlyValue(newValue: MgInput['readonlyValue']): void {
    if (newValue === undefined) this.readonlyValue = this.value;
  }

  /**
   * Define error message to display
   */
  @Prop() errorMessage;

  /**
   * Define aria-describedby ids to link with
   */
  @Prop() ariaDescribedbyIDs;
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
      this.classCollection.add('mg-c-input--readonly');
      Array.from(this.element.children).forEach(child => {
        if (child instanceof HTMLElement && Object.values(child).includes('append-input')) child.setAttribute('hidden', 'true');
      });
    } else {
      this.classCollection.delete('mg-c-input--readonly');

      // a11y IDs
      const ariaDescribedbyIDs: Set<string> = new Set(this.ariaDescribedbyIDs);

      // Help text
      this.helpTextId = `${this.identifier}-help-text`;
      if (typeof this.helpText === 'string' && this.helpText !== '') ariaDescribedbyIDs.add(this.helpTextId);

      // Error Message
      this.helpTextErrorId = `${this.identifier}-error`;
      if (typeof this.errorMessage === 'string' && this.errorMessage !== '') ariaDescribedbyIDs.add(this.helpTextErrorId);

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
    this.validateReadonly(this.readonly);
    this.validateReadonlyValue(this.readonlyValue);
    this.validateMgWidth(this.mgWidth);
    this.validateAriaDescribedbyIDs(this.ariaDescribedbyIDs);
    this.validateClassCollection(this.classCollection);
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
    /**
     * Get tagname
     * @param isFieldset - is fieldset
     * @returns tag name
     */
    const TagName = !this.isFieldset || this.readonly ? 'div' : 'fieldset';

    return (
      <TagName class={this.classCollection.join()}>
        <div class={{ 'mg-c-input__title': true, 'mg-u-visually-hidden': this.labelHide }}>
          <mg-input-title identifier={this.identifier} readonly={this.readonly} required={this.required && !this.disabled && !this.readonly} is-legend={this.isFieldset}>
            {this.label}
          </mg-input-title>
          {!this.labelHide && this.renderTooltip()}
        </div>
        <div class="mg-c-input__input-container">
          {this.readonly
            ? [<strong>{this.readonlyValue}</strong>, <slot></slot>]
            : [
                <div class={{ 'mg-c-input__input': true, 'mg-c-input__input--has-error': this.errorMessage !== undefined }}>
                  <slot></slot>
                  {this.labelHide && this.renderTooltip()}
                </div>,
                this.helpText && <div id={this.helpTextId} class="mg-c-input__help-text" innerHTML={this.helpText}></div>,
                this.errorMessage && !this.readonly && !this.disabled && (
                  <div id={this.helpTextErrorId} class="mg-c-input__error" innerHTML={this.errorMessage} aria-live="assertive"></div>
                ),
              ]}
        </div>
      </TagName>
    );
  }
}
