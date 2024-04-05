import { Component, h, Prop, State, Watch } from '@stencil/core';
import { ClassList } from '@mgdis/stencil-helpers';
import { type VariantStyleType, variantStyles, type VariantType, variants } from './mg-card.conf';

/**
 * @slot - Card content
 */
@Component({
  tag: 'mg-card',
  styleUrl: '../../../../node_modules/@mgdis/styles/dist/components/mg-card.css',
  shadow: true,
})
export class MgCard {
  /*************
   * Private *
   *************/

  private readonly name = 'mg-card';
  private readonly classBase = 'mg-c-card';

  /*************
   * Decorators *
   *************/

  /**
   * Define variant prop
   */
  @Prop() variant: undefined | VariantType;
  @Watch('variant')
  validateVariant(newValue: MgCard['variant'], oldValue?: MgCard['variant']) {
    if (newValue && !variants.includes(newValue)) throw new Error(`<${this.name}> prop "variant" must match VariantType type.`);
    if (newValue) {
      this.setDefaultVariantStyle();
      this.classCollection.add(`${this.classBase}--${newValue}`);
    }
    if (oldValue) this.classCollection.delete(`${this.classBase}--${oldValue}`);
  }

  /**
   * Define variantStyle prop
   */
  @Prop({ mutable: true }) variantStyle: undefined | VariantStyleType;
  @Watch('variantStyle')
  validateVariantStyle(newValue: MgCard['variantStyle'], oldValue?: MgCard['variantStyle']) {
    if (newValue && !variantStyles.includes(newValue)) throw new Error(`<${this.name}> prop "variantStyle" must match VariantStyleType type.`);
    else if (Boolean(newValue) && !variants.includes(this.variant))
      throw new Error(`<${this.name}> prop "variantStyle" must be paired with ${JSON.stringify(variants)} "variant" prop.`);
    if (newValue) this.classCollection.add(`${this.classBase}--${newValue}`);
    if (oldValue) this.classCollection.delete(`${this.classBase}--${oldValue}`);
  }

  /**
   * Component classes
   */
  @State() classCollection: ClassList = new ClassList([this.classBase]);

  /**
   * Method to set default varianStyle props
   * needeed has stencil doesn't know that props is mutated when updated in prop watcher
   */
  private setDefaultVariantStyle = (): void => {
    if (this.variantStyle === undefined) this.variantStyle = 'bar-left';
  };

  /*************
   * Lifecycle *
   *************/

  /**
   * Check if props are well configured on init
   */
  componentWillLoad(): void {
    this.validateVariant(this.variant);
    this.validateVariantStyle(this.variantStyle);
  }

  /**
   * Render
   * @returns HTML Element
   */
  render(): HTMLElement {
    return (
      <div class={this.classCollection.join()}>
        {this.variantStyle?.startsWith('bar-') && <span class="mg-c-card__bar"></span>}
        <slot></slot>
      </div>
    );
  }
}
