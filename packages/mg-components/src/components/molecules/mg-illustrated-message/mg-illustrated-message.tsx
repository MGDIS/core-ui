import { Component, Element, h, Prop, State, Watch } from '@stencil/core';
import { ClassList, isTagName, toString } from '@mgdis/core-ui-helpers/dist/stencil';
import { directions, type IllustratedMessageDirectionType, type IllustratedMessageSizeType, sizes } from './mg-illustrated-message.conf';

/**
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
  @Prop() size: IllustratedMessageSizeType = 'medium';
  @Watch('size')
  watchSize(newValue: IllustratedMessageSizeType, oldValue?: IllustratedMessageSizeType): void {
    if (!sizes.includes(newValue)) {
      throw new Error(`<mg-illustrated-message> prop "size" must be one of: ${sizes.join(', ')}. Passed value: ${toString(newValue)}.`);
    } else {
      if (oldValue !== undefined) {
        this.classCollection.delete(`mg-c-illustrated-message--size-${oldValue}`);
      }
      this.classCollection.add(`mg-c-illustrated-message--size-${newValue}`);
    }
  }

  /**
   * Define component orientation
   */
  @Prop() direction: IllustratedMessageDirectionType = 'vertical';
  @Watch('direction')
  watchDirection(newValue: IllustratedMessageDirectionType, oldValue?: IllustratedMessageDirectionType): void {
    if (newValue !== undefined && !directions.includes(newValue)) {
      throw new Error(`<mg-illustrated-message> prop "direction" must be one of: ${directions.join(', ')}. Passed value: ${toString(newValue)}.`);
    } else if (newValue === 'horizontal') {
      this.classCollection.add('mg-c-illustrated-message--direction-horizontal');
    } else if (oldValue === 'horizontal') {
      this.classCollection.delete('mg-c-illustrated-message--direction-horizontal');
    }
  }

  /**
   * Component classes
   */
  @State() classCollection: ClassList = new ClassList(['mg-c-illustrated-message']);

  /***********
   * Methods *
   ***********/

  /**
   * Validate slots
   */
  private validateSlots(): void {
    const headingTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
    const slottedTitle = this.element.querySelector('[slot="title"]');
    const slottedIllustrations = this.element.querySelectorAll('[slot="illustration"]');
    const slottedDetails = this.element.querySelectorAll('[slot="details"]');

    if (slottedDetails.length === 0 && slottedTitle === null) {
      throw new Error('<mg-illustrated-message> Slot "title" or "details" must be present.');
    } else if (slottedTitle !== null && !isTagName(slottedTitle, headingTags)) {
      throw new Error(`<mg-illustrated-message> Slotted title must be a heading: ${headingTags.join(', ')}.`);
    } else if (slottedIllustrations.length !== 1) {
      throw new Error('<mg-illustrated-message> Slotted illustration must be present and unique.');
    }

    slottedIllustrations[0].setAttribute('aria-hidden', 'true');
  }

  /*************
   * Lifecycle *
   *************/

  /**
   * Check if component props are well configured on init
   */
  componentWillLoad(): void {
    this.watchDirection(this.direction);
    this.watchSize(this.size);
    this.validateSlots();
  }

  /**
   * Render
   * @returns HTML Element
   */
  render(): HTMLElement {
    return (
      <div class={this.classCollection.join()}>
        <div class="mg-c-illustrated-message__illustration">
          <slot name="illustration"></slot>
        </div>
        <div class="mg-c-illustrated-message__slots">
          <slot name="title"></slot>
          <slot name="details"></slot>
        </div>
      </div>
    );
  }
}
