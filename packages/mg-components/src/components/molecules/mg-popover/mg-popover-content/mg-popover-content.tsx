import { Component, Element, Host, h, Prop, EventEmitter, Event, State } from '@stencil/core';
import { isTagName, ClassList } from '../../../../utils/components.utils';
import { initLocales } from '../../../../locales';

@Component({
  tag: 'mg-popover-content',
  styleUrl: '../../../../../node_modules/@mgdis/styles/dist/components/mg-popover-content.css',
  shadow: true,
})
export class MgPopoverContent {
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
  @Element() element: HTMLMgPopoverContentElement;

  /**
   * Define if popover has a cross button
   */
  @Prop() closeButton = false;

  /**
   * Component classes
   */
  @State() classCollection: ClassList = new ClassList(['mg-popover-content']);

  /**
   * Emited event when close button is clicked
   */
  @Event({ eventName: 'hide-content' }) hideContent: EventEmitter<string>;

  /**
   * Handle action for close button
   */
  private handleCloseButton = (): void => {
    this.hideContent.emit();
  };

  /*************
   * Lifecycle *
   *************/

  /**
   * Check if component props are valide
   */
  componentWillLoad(): void {
    // Get locales
    this.messages = initLocales(this.element).messages;
  }

  /**
   * Check if component slots are valide
   */
  componentDidLoad(): void {
    const headingTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

    const slottedTitleElement = this.element.querySelector('[slot="title"]');
    if (slottedTitleElement && !isTagName(slottedTitleElement, headingTags)) {
      throw new Error(`<mg-popover> Slotted title must be a heading: ${headingTags.join(', ')}`);
    }
  }

  /**
   * Render
   * @returns HTML Element
   */
  render(): HTMLElement {
    return (
      <Host>
        <mg-card class={this.classCollection.join()}>
          {this.closeButton && (
            <mg-button is-icon variant="flat" label={this.messages.general.close} onClick={this.handleCloseButton}>
              <mg-icon icon="cross"></mg-icon>
            </mg-button>
          )}
          <div class="mg-popover-content__title">
            <slot name="title"></slot>
          </div>
          <slot name="content"></slot>
        </mg-card>
        <slot name="arrow"></slot>
      </Host>
    );
  }
}
