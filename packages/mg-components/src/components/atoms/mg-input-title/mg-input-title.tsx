import { Component, h, Prop, State, Watch } from '@stencil/core';
import { isValidString } from '../../../utils/components.utils';

@Component({
  tag: 'mg-input-title',
  styleUrl: '../../../../node_modules/@mgdis/styles/dist/components/mg-input-title.css',
  scoped: true,
})
export class MgInputTitle {
  /**
   * Label input id
   */
  @Prop() identifier!: string;
  @Watch('identifier')
  validateIdentifier(newValue: MgInputTitle['identifier']): void {
    if (!isValidString(newValue)) {
      throw new Error('<mg-input-title> prop "identifier" is required.');
    }
  }

  /**
   * Define `legend|label` element id
   */
  @Prop() titleId: string;

  /**
   * If input is required an asterisk is added at the end of the label
   */
  @Prop() required: boolean;

  /**
   * If input is required an asterisk is added at the end of the label
   */
  @Prop() readonly: boolean;

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
    const TagName = this.readonly ? 'span' : this.tagName;
    // \u00A0 represent a &nbsp;
    return (
      <TagName class="mg-c-input-title" htmlFor={this.isLegend ? undefined : this.identifier} id={this.titleId}>
        <slot></slot>
        {this.required && (
          <span class="mg-c-input-title__required">
            &nbsp;<span class="mg-u-is-asterisk">*</span>
          </span>
        )}
      </TagName>
    );
  }
}
