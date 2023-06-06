import { Component, h, Prop, Watch, State } from '@stencil/core';
import { sizes, variants, IconVariantType, IconSizeType, IconVariantStyleType, variantStyles } from './mg-icon.conf';
import { ClassList } from '../../../utils/components.utils';
import iconList from '@mgdis/img/dist/icons/index.json';
import sprite from '@mgdis/img/dist/icons/sprite.svg';

@Component({
  tag: 'mg-icon',
  styleUrl: 'mg-icon.scss',
  shadow: true,
})
export class MgIcon {
  /**
   * Icon to display.
   */
  @Prop() icon!: string;
  @Watch('icon')
  validateIcon(newValue: MgIcon['icon'], oldValue?: MgIcon['icon']): void {
    if (!iconList.includes(newValue)) throw new Error(`<mg-icon> prop "icon" must be one of: ${iconList.join(', ')}`);
    else {
      if (oldValue !== undefined) this.classCollection.delete(`mg-icon--${oldValue}`);
      this.classCollection.add(`mg-icon--${newValue}`);
    }
  }

  /**
   * Define icon size
   */
  @Prop() size: IconSizeType = 'regular';
  @Watch('size')
  validateSize(newValue: MgIcon['size'], oldValue?: MgIcon['size']): void {
    if (!sizes.includes(newValue)) throw new Error(`<mg-icon> prop "size" must be one of: ${sizes.join(', ')}`);
    else {
      if (oldValue !== undefined) this.classCollection.delete(`mg-icon--size-${oldValue}`);
      this.classCollection.add(`mg-icon--size-${newValue}`);
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
        this.setDefaultVariantStyle();
        if (oldValue !== undefined) this.classCollection.delete(`mg-icon--variant-${oldValue}`);
        this.classCollection.add(`mg-icon--variant-${newValue}`);
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
        if (oldValue !== undefined) this.classCollection.delete(`mg-icon--variant-style-${oldValue}`);
        this.classCollection.add(`mg-icon--variant-style-${newValue}`);
      }
    }
  }

  /**
   * Make the icon spin
   */
  @Prop() spin = false;
  @Watch('spin')
  handleSpin(newValue: MgIcon['spin']): void {
    if (newValue) {
      this.classCollection.add('mg-icon--spin');
      this.classCollection.add('mg-a11y-animation');
    } else {
      this.classCollection.delete('mg-icon--spin');
      this.classCollection.delete('mg-a11y-animation');
    }
  }

  /**
   * Component classes
   */
  @State() classCollection: ClassList = new ClassList(['mg-icon']);

  /**
   * Method to set default varianStyle props
   * needeed has stencil doesn't know that props is mutated when updated in prop watcher
   */
  private setDefaultVariantStyle = (): void => {
    if (this.variantStyle === undefined) this.variantStyle = 'background';
  };

  /**
   * Check if props are well configured on init
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
   * @returns HTML Element
   */
  render(): HTMLElement {
    return (
      <svg class={this.classCollection.join()} aria-hidden="true" focusable="false" viewBox="0 0 16 16">
        <use xlinkHref={`${sprite}#${this.icon}`}></use>
      </svg>
    );
  }
}
