import { Component, h, Prop, Watch, State } from '@stencil/core';
import { icons, sizes, variants, IconVariantType, IconSizeType, IconVariantStyleType, variantStyles } from './mg-icon.conf';
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
    if (!Object.keys(icons).includes(newValue)) throw new Error(`<mg-icon> prop "icon" must be one of: ${Object.keys(icons).join(', ')}`);
    else {
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
    if (!sizes.includes(newValue)) throw new Error(`<mg-icon> prop "size" must be one of: ${sizes.join(', ')}`);
    else {
      if (oldValue !== undefined) this.classList.delete(`mg-icon--size-${oldValue}`);
      this.classList.add(`mg-icon--size-${newValue}`);
    }
  }

  /**
   * Define icon variant color
   */
  @Prop() variant: IconVariantType;
  @Watch('variant')
  validateVariant(newValue: MgIcon['variant'], oldValue?: MgIcon['variant']): void {
    if (Boolean(newValue)) {
      if (!variants.includes(newValue)) throw new Error(`<mg-icon> prop "variant" must be one of: ${variants.join(', ')}`);
      else {
        if (this.variantStyle === undefined) this.variantStyle = 'background';
        if (oldValue !== undefined) this.classList.delete(`mg-icon--variant-${oldValue}`);
        this.classList.add(`mg-icon--variant-${newValue}`);
      }
    }
  }

  /**
   * Define icon color variant style
   * Add a color to the icon based on variant color with given style
   * 'full': Used to set a circular background with variant soft color and icon variant color
   * 'background': Used to set a circular background with variant soft color
   * 'icon': Used to set a color only to the icon
   */
  @Prop({ mutable: true }) variantStyle: IconVariantStyleType;
  @Watch('variantStyle')
  validateVariantStyle(newValue: MgIcon['variantStyle'], oldValue?: MgIcon['variantStyle']): void {
    if (Boolean(newValue)) {
      if (!variantStyles.includes(newValue)) throw new Error(`<mg-icon> prop "variantStyle" must be one of: ${variantStyles.join(', ')}`);
      else {
        if (oldValue !== undefined) this.classList.delete(`mg-icon--variant-style-${oldValue}`);
        this.classList.add(`mg-icon--variant-style-${newValue}`);
      }
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
    this.validateVariantStyle(this.variantStyle);
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
