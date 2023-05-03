import { Component, h, Prop, State, Watch } from '@stencil/core';
import { ClassList } from '../../../utils/components.utils';
import { type VariantStyleType, variantStyles, type VariantType, variants } from './mg-card.conf';

@Component({
  tag: 'mg-card',
  styleUrl: 'mg-card.scss',
  shadow: true,
})
export class MgCard {
  /*************
   * Private *
   *************/

  private readonly name = 'mg-card';
  private readonly baseClass = this.name;

  /*************
   * Decorators *
   *************/

  /**
   * Define variant prop
   * Default: undefined
   */
  @Prop() variant: undefined | VariantType;
  @Watch('variant')
  validateVariant(newValue: MgCard['variant'], oldValue?: MgCard['variant']) {
    if (newValue && !variants.includes(newValue)) throw new Error(`<${this.name}> prop "variant" must match VariantType type.`);
    if (Boolean(newValue)) {
      this.setDefaultVariantStyle();
      this.classList.add(`${this.baseClass}--${newValue}`);
    }
    if (Boolean(oldValue)) this.classList.delete(`${this.baseClass}--${oldValue}`);
  }

  /**
   * Define variantStyle prop
   * Default: undefined
   */
  @Prop({ mutable: true }) variantStyle: undefined | VariantStyleType;
  @Watch('variantStyle')
  validateVariantStyle(newValue: MgCard['variantStyle'], oldValue?: MgCard['variantStyle']) {
    if (newValue && !variantStyles.includes(newValue)) throw new Error(`<${this.name}> prop "variantStyle" must match VariantStyleType type.`);
    else if (Boolean(newValue) && !variants.includes(this.variant))
      throw new Error(`<${this.name}> prop "variantStyle" must be paired with ${JSON.stringify(variants)} "variant" prop.`);
    if (Boolean(newValue)) this.classList.add(`${this.baseClass}--${newValue}`);
    if (Boolean(oldValue)) this.classList.delete(`${this.baseClass}--${oldValue}`);
  }

  /**
   * Component classes
   */
  @State() classList: ClassList = new ClassList([this.baseClass]);

  /**
   * Methode to set default varianStyle props
   * needeed has stencil doesn't know that props is mutated when updated in prop watcher
   * @returns {void}
   */
  private setDefaultVariantStyle = (): void => {
    if (this.variantStyle === undefined) this.variantStyle = 'bar-left';
  };

  /*************
   * Lifecycle *
   *************/

  /**
   * Check if props are well configured on init
   * @returns {void}
   */
  componentWillLoad(): void {
    this.validateVariant(this.variant);
    this.validateVariantStyle(this.variantStyle);
  }

  /**
   * Render
   * @returns {HTMLElement} HTML Element
   */
  render(): HTMLElement {
    return (
      <div class={this.classList.join()}>
        {this.variantStyle?.startsWith('bar-') && <span class="mg-card__bar"></span>}
        <slot></slot>
      </div>
    );
  }
}
