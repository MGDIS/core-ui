import { Component, h, Prop, Watch, State } from '@stencil/core';
import { icons, sizes, variants, IconVariantType, IconSizeType } from './mg-icon.conf';
import { ClassList } from '../../../utils/components.utils';

@Component({
  tag: 'mg-icon',
  styleUrl: 'mg-icon.scss',
  shadow: true,
})
export class MgIcon {
  /**
   * Icon to display. Required.
   */
  @Prop() icon!: string;
  @Watch('icon')
  validateIcon(newValue: MgIcon['icon'], oldValue?: MgIcon['icon']): void {
    if (!Object.keys(icons).includes(newValue)) {
      throw new Error(`<mg-icon> prop "icon" must be one of: ${Object.keys(icons).join(', ')}`);
    } else {
      if (oldValue !== undefined) this.classList.delete(`mg-icon--${oldValue}`);
      this.classList.add(`mg-icon--${newValue}`);
    }
  }

  /**
   * Define icon size
   * Default: 'regular'
   */
  @Prop() size: IconSizeType = 'regular';
  @Watch('size')
  validateSize(newValue: MgIcon['size'], oldValue?: MgIcon['size']): void {
    if (!sizes.includes(newValue)) {
      throw new Error(`<mg-icon> prop "size" must be one of: ${sizes.join(', ')}`);
    } else {
      if (oldValue !== undefined) {
        this.classList.delete(`mg-icon--size-${oldValue}`);
      }
      this.classList.add(`mg-icon--size-${newValue}`);
    }
  }

  /**
   * Define icon variant
   * Used to set a background to the icon with a circular shape and a specified color
   */
  @Prop() variant?: IconVariantType;
  @Watch('variant')
  validateVariant(newValue: MgIcon['variant'], oldValue?: MgIcon['variant']): void {
    if (newValue !== undefined && !variants.includes(newValue)) {
      throw new Error(`<mg-icon> prop "variant" must be one of: ${variants.join(', ')}`);
    } else if (newValue !== undefined) {
      if (oldValue !== undefined) {
        this.classList.delete(`mg-icon--variant-${oldValue}`);
      }
      this.classList.add(`mg-icon--variant-${newValue}`);
    }
  }

  /**
   * Define icon color variant
   * Add a color to the icon based on variant color
   */
  @Prop() iconVariant: IconVariantType;
  @Watch('iconVariant')
  validateIconVariant(newValue: MgIcon['iconVariant'], oldValue?: MgIcon['iconVariant']): void {
    if (newValue !== undefined && !variants.includes(newValue)) throw new Error(`<mg-icon> prop "iconVariant" must be one of: ${variants.join(', ')}`);
    else if (Boolean(this.variant) && Boolean(newValue) && newValue !== this.variant)
      throw new Error(`<mg-icon> prop "iconVariant" must be the same as "variant" props when variant is defined.`);
    else if (Boolean(newValue)) {
      if (Boolean(oldValue)) this.classList.delete(`mg-icon--icon-variant-${oldValue}`);
      this.classList.add(`mg-icon--icon-variant-${newValue}`);
    }
  }

  /**
   * Make the icon spin
   * Default: false
   */
  @Prop() spin = false;
  @Watch('spin')
  handleSpin(newValue: MgIcon['spin']): void {
    if (newValue) {
      this.classList.add('mg-icon--spin');
      this.classList.add('mg-a11y-animation');
    } else {
      this.classList.delete('mg-icon--spin');
      this.classList.delete('mg-a11y-animation');
    }
  }

  /**
   * Component classes
   */
  @State() classList: ClassList = new ClassList(['mg-icon']);

  /**
   * getIcon
   *
   * @returns {HTMLElement} icon html
   */
  private getIcon = (): HTMLElement => icons[this.icon]();

  /**
   * Check if props are well configured on init
   *
   * @returns {void}
   */
  componentWillLoad(): void {
    this.validateIcon(this.icon);
    this.validateSize(this.size);
    this.validateVariant(this.variant);
    this.validateIconVariant(this.iconVariant);
    this.handleSpin(this.spin);
  }

  /**
   * Render component
   *
   * @returns {HTMLElement} HTML Element
   */
  render(): HTMLElement {
    return (
      <svg class={this.classList.join()} aria-hidden="true" focusable="false" viewBox="0 0 16 16">
        {this.getIcon()}
      </svg>
    );
  }
}
