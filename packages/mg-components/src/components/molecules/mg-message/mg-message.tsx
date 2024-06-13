import { Component, Element, h, Prop, State, Watch } from '@stencil/core';
import { ClassList } from '@mgdis/stencil-helpers';
import { variants, variantStyles, VariantStyleType, VariantType } from './mg-message.conf';
import { type MgIcon } from '../../atoms/mg-icon/mg-icon';

/*
 * @slot - Message content
 * @slot actions - Actions content
 */
@Component({
  tag: 'mg-message',
  styleUrl: '../../../../node_modules/@mgdis/styles/dist/components/mg-message.css',
  shadow: true,
})
export class MgMessage {
  /************
   * Internal *
   ************/

  private readonly classBase = 'mg-c-message';

  /**************
   * Decorators *
   **************/

  /**
   * Get component DOM element
   */
  @Element() element: HTMLMgMessageElement;

  /**
   * Define variant
   */
  @Prop() variant: undefined | VariantType = 'info';
  @Watch('variant')
  watchVariant(newValue: MgMessage['variant'], oldValue?: MgMessage['variant']): void {
    if (!variants.includes(newValue)) {
      throw new Error(`<mg-message> prop "variant" must be one of: ${variants.join(', ')}`);
    } else {
      if (newValue) this.classCollection.add(`${this.classBase}--${newValue}`);
      if (oldValue) this.classCollection.delete(`${this.classBase}--${oldValue}`);
    }
  }

  /**
   * Define variant style
   */
  @Prop() variantStyle: undefined | VariantStyleType = 'bar-left';
  @Watch('variantStyle')
  watchVariantStyle(newValue: MgMessage['variantStyle'], oldValue?: MgMessage['variantStyle']): void {
    if (!variantStyles.includes(newValue)) {
      throw new Error(`<mg-message> prop "variantStyle" must be one of: ${variantStyles.join(', ')}`);
    } else {
      if (newValue) this.classCollection.add(`${this.classBase}--${newValue}`);
      if (oldValue) this.classCollection.delete(`${this.classBase}--${oldValue}`);
    }
  }

  /**
   * Component classes
   */
  @State() classCollection: ClassList = new ClassList(['mg-c-message']);

  /**
   * Define if component is using actions slot
   */
  @State() hasActions = false;

  /**
   * Get icon corresponding to variant
   * @returns icon
   */
  private getIcon = (): MgIcon['icon'] => {
    switch (this.variant) {
      case 'info':
        return 'info-circle';
      case 'warning':
        return 'exclamation-triangle';
      case 'success':
        return 'check-circle';
      case 'danger':
        return 'exclamation-circle';
      default:
        break;
    }
  };

  /*************
   * Lifecycle *
   *************/

  /**
   * Check if component props are well configured on init
   */
  componentWillLoad(): void {
    // Validate
    this.watchVariant(this.variant);
    this.watchVariantStyle(this.variantStyle);
    // Check if close button is an can be activated
    this.hasActions = this.element.querySelector('[slot="actions"]') !== null;
  }

  /**
   * Render
   * @returns HTML Element
   */
  render(): HTMLElement {
    return (
      <div class={this.classCollection.join()}>
        <mg-card>
          {this.variantStyle.startsWith('bar-') && <span class="mg-c-message__bar"></span>}
          <span class="mg-c-message__icon">
            <mg-icon icon={this.getIcon()}></mg-icon>
          </span>
          <div class="mg-c-message__content">
            <span class="mg-c-message__content-slot">
              <slot></slot>
            </span>
            {this.hasActions && <span class="mg-c-message__content-separator"></span>}
            {this.hasActions && (
              <span class="mg-c-message__content-actions-slot">
                <slot name="actions"></slot>
              </span>
            )}
          </div>
        </mg-card>
      </div>
    );
  }
}
