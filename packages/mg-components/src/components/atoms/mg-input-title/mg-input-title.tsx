import { Component, h, Prop, State, Watch } from '@stencil/core';

@Component({
  tag: 'mg-input-title',
  styleUrl: 'mg-input-title.scss',
  scoped: true,
})
export class MgInputTitle {
  /**
   * Label input id
   */
  @Prop() identifier!: string;
  @Watch('identifier')
  validateIdentifier(newValue: string): void {
    if (typeof newValue !== 'string' || newValue.trim() === '') {
      throw new Error('<mg-input-title> prop "identifier" is required.');
    }
  }

  /**
   * If input is required an asterisk is added at the end of the label
   */
  @Prop() required: boolean;

  /**
   * Switch from label to fieldset sementic
   */
  @Prop() isLegend = false;
  @Watch('isLegend')
  validateIsLegend(newValue: MgInputTitle['isLegend']) {
    this.tagName = newValue ? 'legend' : 'label';
  }

  /**
   * Component parent tagname
   */
  @State() tagName = 'label';

  /*************
   * Lifecycle *
   *************/

  /**
   * Init tag name
   */
  componentWillLoad(): void {
    this.validateIdentifier(this.identifier);
    this.validateIsLegend(this.isLegend);
  }

  /**
   * Render
   * @returns HTML element
   */
  render(): HTMLElement {
    const TagName = this.tagName;
    // \u00A0 represent a &nbsp;
    return (
      <TagName class="mg-input-title" htmlFor={this.isLegend ? undefined : this.identifier}>
        <slot></slot>
        {this.required && (
          <span class="mg-input-title__required">
            &nbsp;<span class="is-asterisk">*</span>
          </span>
        )}
      </TagName>
    );
  }
}
