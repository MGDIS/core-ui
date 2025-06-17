import { Component, h, Prop } from '@stencil/core';

/**
 * @slot - Card content
 */
@Component({
  tag: 'mg-card',
  styleUrl: '../../../../node_modules/@mgdis/styles/dist/components/mg-card.css',
  shadow: true,
})
export class MgCard {
  /**
   * Hide the box-shadow style (default: false)
   */
  @Prop() hideShadow = false;

  /**
   * Determines whether the card should display a box shadow.
   * @returns `true` if the `hideShadow` property is not set to `true`.
   */
  private get hasBoxShadow(): boolean {
    return !this.hideShadow;
  }

  /*************
   * Lifecycle *
   *************/

  /**
   * Render
   * @returns HTML Element
   */
  render(): HTMLElement {
    return (
      <div class={`mg-c-card${this.hasBoxShadow ? ' mg-c-card--shadow' : ''}`}>
        <slot></slot>
      </div>
    );
  }
}
