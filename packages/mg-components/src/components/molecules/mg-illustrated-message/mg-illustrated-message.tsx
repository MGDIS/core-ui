import { Component, Element, h, Prop } from '@stencil/core';
import { isTagName } from '@mgdis/stencil-helpers';

/*
 * @slot illustration - Illustration content
 * @slot title - Title content
 * @slot details - Details content
 */
@Component({
  tag: 'mg-illustrated-message',
  styleUrl: '../../../../node_modules/@mgdis/styles/dist/components/mg-illustrated-message.css',
  shadow: true,
})
export class MgIllustratedMessage {
  /**************
   * Decorators *
   **************/

  /**
   * Get component DOM element
   */
  @Element() element: HTMLMgIllustratedMessageElement;

  /**
   * Define illustration size
   */
  @Prop() size: 'regular' | 'small' = 'regular';

  /**
   * Define component orientation
   */
  @Prop() direction: 'vertical' | 'horizontal' = 'vertical';

  /*************
   * Lifecycle *
   *************/

  /**
   * Check if component props are well configured on init
   */
  componentDidLoad(): void {
    const headingTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
    const slottedIllustrations = this.element.querySelectorAll('[slot="illustration"]');

    if (!isTagName(this.element.querySelector('[slot="title"]'), headingTags)) {
      throw new Error(`<mg-illustrated-message> Slotted title must be a heading: ${headingTags.join(', ')}`);
    } else if (slottedIllustrations.length !== 1) {
      throw new Error('<mg-illustrated-message> Slotted illustration must be present and unique.');
    }

    slottedIllustrations[0].setAttribute('aria-hidden', 'true');
  }

  /**
   * Render
   * @returns HTML Element
   */
  render(): HTMLElement {
    return (
      <div
        class={{
          'mg-c-illustrated-message': true,
          'mg-c-illustrated-message--horizontal': this.direction === 'horizontal',
        }}
      >
        <div
          class={{
            'mg-c-illustrated-message__illustration': true,
            'mg-c-illustrated-message__illustration--small': this.size === 'small',
          }}
        >
          <slot name="illustration"></slot>
        </div>
        <div class="mg-c-illustrated-message__slots">
          <div class="mg-c-illustrated-message__title">
            <slot name="title"></slot>
          </div>
          <div class="mg-c-illustrated-message__details">
            <slot name="details"></slot>
          </div>
        </div>
      </div>
    );
  }
}
