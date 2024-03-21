import { Component, h, Prop, State, Watch, Element } from '@stencil/core';
import { TagVariantType, variants } from './mg-tag.conf';
import { ClassList, isValidString } from '@mgdis/stencil-helpers';
@Component({
  tag: 'mg-tag',
  styleUrl: '../../../../node_modules/@mgdis/styles/dist/components/mg-tag.css',
  shadow: true,
})
export class MgTag {
  /************
   * Internal *
   ************/

  // Classes
  private readonly classOutline = 'mg-c-tag--outline';
  private readonly classSoft = 'mg-c-tag--soft';

  /**************
   * Decorators *
   **************/

  /**
   * Get component DOM element
   */
  @Element() element: HTMLMgTagElement;

  /**
   * Define tag variant
   */
  @Prop() variant: TagVariantType = variants[0]; // primary
  @Watch('variant')
  validateVariant(newValue: MgTag['variant'], oldValue?: MgTag['variant']): void {
    if (!variants.includes(newValue)) {
      throw new Error(`<mg-tag> prop "variant" must be one of: ${variants.join(', ')}.`);
    } else {
      if (oldValue !== undefined) {
        this.classCollection.delete(`mg-c-tag--${oldValue}`);
      }
      this.classCollection.add(`mg-c-tag--${newValue}`);
    }
  }

  /**
   * Define if tag is using outline style
   */
  @Prop() outline?: boolean;
  @Watch('outline')
  validateOutline(newValue: MgTag['outline']): void {
    if (newValue) this.classCollection.add(this.classOutline);
    else this.classCollection.delete(this.classOutline);
  }

  /**
   * Define if tag is using soft style
   */
  @Prop() soft?: boolean;
  @Watch('soft')
  validateSoft(newValue: MgTag['soft']): void {
    // usage validation
    if (newValue && this.outline) throw new Error('<mg-tag> prop "soft" can NOT be used with prop "outline".');

    // apply class
    if (newValue) this.classCollection.add(this.classSoft);
    else this.classCollection.delete(this.classSoft);
  }

  /**
   * Component classes
   */
  @State() classCollection: ClassList = new ClassList(['mg-c-tag']);

  /*************
   * Methods *
   *************/

  /**
   * Validate the given textContent
   * @param textContent - html element textContent property
   */
  private validateTextContent(textContent: string): void {
    if (!isValidString(textContent)) throw new Error('<mg-tag> slot must contain a text content.');
  }

  /*************
   * Lifecycle *
   *************/

  /**
   * Check if props are well configured on init
   */
  componentWillLoad(): void {
    this.validateVariant(this.variant);
    this.validateOutline(this.outline);
    this.validateSoft(this.soft);
    this.validateTextContent(this.element.textContent);
  }

  /**
   * Render
   * @returns HTML Element
   */
  render(): HTMLElement {
    return (
      <span class={this.classCollection.join()}>
        <slot></slot>
      </span>
    );
  }
}
