import { Component, Element, h, Prop, Watch } from '@stencil/core';
import { initLocales } from '../../../locales';
import { isValidString } from '@mgdis/stencil-helpers';

@Component({
  tag: 'mg-loader',
  styleUrl: '../../../../node_modules/@mgdis/styles/dist/components/mg-loader.css',
  shadow: true,
})
export class MgLoader {
  /************
   * Internal *
   ************/

  // Locales
  private messages;

  /**************
   * Decorators *
   **************/

  /**
   * Get component DOM element
   */
  @Element() element: HTMLMgLoaderElement;

  /**
   * Override loader message
   */
  @Prop() message?: string;
  @Watch('message')
  watchMessage(newValue: MgLoader['message']): void {
    if (newValue && !isValidString(newValue)) throw new Error('<mg-loader> prop "message" must be a valid string.');
  }

  /**
   * Hide message
   */
  @Prop() messageHide?: boolean;

  /*************
   * Lifecycle *
   *************/

  /**
   * Check if component props are well configured on init
   */
  componentWillLoad(): void {
    // Get locales
    this.messages = initLocales(this.element).messages;

    // validate props
    this.watchMessage(this.message);
  }

  /**
   * Render
   * @returns HTML Element
   */
  render(): HTMLElement {
    return (
      <div class="mg-c-loader" aria-live="polite">
        <mg-icon icon="loader" spin></mg-icon>
        <span class={{ 'mg-u-visually-hidden': this.messageHide }}>{this.message || this.messages.loader.inProgess}</span>
      </div>
    );
  }
}
