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
   * Hide the box-shadow style
   */
  @Prop() hideShadow = false;

  /**
   * Define the border radius size
   */
  @Prop() radius: 'small' | 'medium' | 'large' = 'large';

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
    const classes = ['mg-c-card'];
    if (this.hasBoxShadow) classes.push('mg-c-card--shadow');
    if (this.radius !== 'large') classes.push(`mg-c-card--radius-${this.radius}`);

    return (
      <div class={classes.join(' ')}>
        <slot></slot>
      </div>
    );
  }
}
