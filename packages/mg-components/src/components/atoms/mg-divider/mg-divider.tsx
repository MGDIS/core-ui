import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'mg-divider',
  styleUrl: '../../../../node_modules/@mgdis/styles/dist/components/mg-divider.css',
  shadow: true,
})
export class MgDivider {
  /**************
   * Decorators *
   **************/

  /**
   * Define component size
   */
  @Prop() fullWidth = false;

  /**
   * Render
   * @returns HTML Element
   */
  render(): HTMLElement {
    return (
      <div
        class={{
          'mg-c-divider': true,
          'mg-c-divider--full-width': this.fullWidth,
        }}
      ></div>
    );
  }
}
