import { Component, h } from '@stencil/core';

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
   * Lifecycle *
   *************/

  /**
   * Render
   * @returns HTML Element
   */
  render(): HTMLElement {
    return (
      <div class="mg-c-card">
        <slot></slot>
      </div>
    );
  }
}
