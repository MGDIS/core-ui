import { Component, h, Prop, State, Watch } from '@stencil/core';
import { variants, BadgeVariantType } from './mg-badge.conf';
import { ClassList } from '../../../utils/components.utils';
@Component({
  tag: 'mg-badge',
  styleUrl: '../../../../node_modules/@mgdis/styles/dist/components/mg-badge.css',
  shadow: true,
})
export class MgBadge {
  /************
   * Internal *
   ************/

  // Classes
  private readonly classOutline = `mg-c-badge--outline`;

  /**************
   * Decorators *
   **************/

  /**
   * Badge value
   */
  @Prop() value!: string | number;
  @Watch('value')
  validateValue(newValue: MgBadge['value']): void {
    if (`${newValue}`.match(/^(\d+\+*|[?*!a-z])$/i) === null) {
      throw new Error('<mg-badge> prop "value" must be integer or ponctuation character.');
    }
  }

  /**
   * Badge label. Include short description.
   * Required for accessibility
   */
  @Prop() label!: string;
  @Watch('label')
  validateLabel(newValue: MgBadge['label']): void {
    if (typeof newValue !== 'string' || newValue.trim() === '') {
      throw new Error('<mg-badge> prop "label" is required.');
    }
  }

  /**
   * Define button variant
   */
  @Prop() variant?: BadgeVariantType = variants[0]; // info
  @Watch('variant')
  validateVariant(newValue: MgBadge['variant'], oldValue?: MgBadge['variant']): void {
    if (!variants.includes(newValue)) {
      throw new Error(`<mg-badge> prop "variant" must be one of: ${variants.join(', ')}.`);
    } else {
      if (oldValue !== undefined) {
        this.classCollection.delete(`mg-c-badge--${oldValue}`);
      }
      this.classCollection.add(`mg-c-badge--${newValue}`);
    }
  }

  /**
   * Define if button is using outline style
   */
  @Prop() outline: boolean;
  @Watch('outline')
  validateOutline(newValue: MgBadge['outline']): void {
    if (newValue) this.classCollection.add(this.classOutline);
    else this.classCollection.delete(this.classOutline);
  }

  /**
   * Component classes
   */
  @State() classCollection: ClassList = new ClassList(['mg-c-badge']);

  /**
   * Check if props are well configured on init
   */
  componentWillLoad(): void {
    this.validateValue(this.value);
    this.validateLabel(this.label);
    this.validateVariant(this.variant);
    this.validateOutline(this.outline);
  }

  /**
   * Render
   * @returns HTML Element
   */
  render(): HTMLElement {
    return (
      <span class={this.classCollection.join()}>
        <span class="mg-c-badge__value">{this.value}</span>
        <span class="mg-u-visually-hidden">{this.label}</span>
      </span>
    );
  }
}
