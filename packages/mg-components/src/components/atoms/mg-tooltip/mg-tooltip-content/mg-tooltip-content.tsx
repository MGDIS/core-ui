import { Component, h, Host, Prop } from '@stencil/core';

/**
 * @internal
 */
@Component({
  tag: 'mg-tooltip-content',
  styleUrl: '../../../../../node_modules/@mgdis/styles/dist/components/mg-tooltip-content.css',
  shadow: true,
})
export class MgTooltipContent {
  /**
   * Displayed message in the tooltip
   */
  @Prop() message!: string;

  /*************
   * Lifecycle *
   *************/

  /**
   * Render
   * @returns HTML Element
   */
  render(): HTMLElement {
    return (
      <Host role="tooltip">
        <span innerHTML={this.message} class="mg-tooltip-content__message"></span>
        <slot name="arrow"></slot>
      </Host>
    );
  }
}
