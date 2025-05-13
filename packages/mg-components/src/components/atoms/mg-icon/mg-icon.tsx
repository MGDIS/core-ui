import { Component, Prop, Watch, State, Element } from '@stencil/core';
import { type IconType, sizes, type IconSizeType, variants, type IconVariantType, variantStyles, type IconVariantStyleType } from './mg-icon.conf';
import { ClassList, toString } from '@mgdis/core-ui-helpers/dist/utils';
import { icons } from '../../../assets/icons';

@Component({
  tag: 'mg-icon',
  styleUrl: '../../../../node_modules/@mgdis/styles/dist/components/mg-icon.css',
  shadow: true,
})
export class MgIcon {
  private svg: SVGSVGElement;

  /**
   * Icon HTML Element
   */
  @Element() element: HTMLMgIconElement;

  /**
   * Icon to display.
   */
  @Prop() icon!: IconType;
  @Watch('icon')
  validateIcon(newValue: MgIcon['icon'], oldValue?: MgIcon['icon']): void {
    if (!Object.keys(icons).includes(newValue)) {
      throw new Error(`<mg-icon> prop "icon" must be one of: ${Object.keys(icons).join(', ')}. Passed value: ${toString(newValue)}.`);
    } else {
      if (oldValue !== undefined) {
        this.classCollection.delete(`mg-c-icon--${oldValue}`);
      }
      this.classCollection.add(`mg-c-icon--${newValue}`);
      this.renderIcon(newValue);
    }
  }

  /**
   * Define icon size
   */
  @Prop() size: IconSizeType = 'medium';
  @Watch('size')
  validateSize(newValue: MgIcon['size'], oldValue?: MgIcon['size']): void {
    // When removing size attribute, it is set to null
    if (newValue === null) {
      newValue = 'medium';
    }
    if (!sizes.includes(newValue)) {
      throw new Error(`<mg-icon> prop "size" must be one of: ${sizes.join(', ')}. Passed value: ${toString(newValue)}.`);
    } else {
      if (oldValue !== undefined) {
        this.classCollection.delete(`mg-c-icon--size-${oldValue}`);
      }
      this.classCollection.add(`mg-c-icon--size-${newValue}`);
    }
  }

  /**
   * Define icon variant color
   */
  @Prop() variant?: IconVariantType;
  @Watch('variant')
  validateVariant(newValue: MgIcon['variant'], oldValue?: MgIcon['variant']): void {
    if (newValue !== undefined) {
      if (!variants.includes(newValue)) throw new Error(`<mg-icon> prop "variant" must be one of: ${variants.join(', ')}. Passed value: ${toString(newValue)}.`);
      else {
        this.setDefaultVariantStyle();
        if (oldValue !== undefined) this.classCollection.delete(`mg-c-icon--variant-${oldValue}`);
        this.classCollection.add(`mg-c-icon--variant-${newValue}`);
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
    if (newValue !== undefined) {
      if (!variantStyles.includes(newValue)) throw new Error(`<mg-icon> prop "variantStyle" must be one of: ${variantStyles.join(', ')}. Passed value: ${toString(newValue)}.`);
      else {
        if (oldValue !== undefined) this.classCollection.delete(`mg-c-icon--variant-style-${oldValue}`);
        this.classCollection.add(`mg-c-icon--variant-style-${newValue}`);
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
      this.classCollection.add('mg-c-icon--spin');
    } else {
      this.classCollection.delete('mg-c-icon--spin');
    }
  }

  /**
   * Component classes
   */
  @State() classCollection: ClassList = new ClassList(['mg-c-icon']);

  /**
   * Method to set default varianStyle props
   * needeed has stencil doesn't know that props is mutated when updated in prop watcher
   */
  private setDefaultVariantStyle = (): void => {
    if (this.variantStyle === undefined) this.variantStyle = 'background';
  };

  /**
   * Render icon in shadowroot
   * @param icon - icon to render
   */
  private renderIcon = (icon: IconType): void => {
    // Remove existing SVG from ShadowRoot
    this.element.shadowRoot.querySelector('svg')?.remove();

    // Append new SVG to ShadowRoot
    const svgContainer = document.createElement('div');
    svgContainer.innerHTML = icons[icon];
    this.element.shadowRoot.append(svgContainer.firstChild);
    svgContainer.remove();

    // update svg attributes
    this.svg = this.element.shadowRoot.querySelector('svg');
    this.svg.setAttribute('aria-hidden', 'true');
    this.svg.setAttribute('focusable', 'false');
    this.svg.setAttribute('class', this.classCollection.join());
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
    // render icon
    this.renderIcon(this.icon);
  }

  /**
   * update html when component trigger changes
   */
  componentWillUpdate() {
    this.svg.setAttribute('class', this.classCollection.join());
  }
}
