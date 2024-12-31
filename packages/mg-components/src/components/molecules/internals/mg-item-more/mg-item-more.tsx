import { Component, h, Prop, Element, Host, Watch, State } from '@stencil/core';
import { toString } from '@mgdis/stencil-helpers';
// import { isValidString, nextTick, toString } from '@mgdis/stencil-helpers';
import type { IconType, SizeType, SlotLabelType } from './mg-item-more.conf';
import type { MessageType } from '../../../../locales/index.conf';
import { OverflowBehavior } from '../../../../utils/behaviors.utils';
import { Direction, sizes } from '../../menu/mg-menu/mg-menu.conf';
import { initLocales } from '../../../../locales';

/**
 * @internal
 */
@Component({
  tag: 'mg-item-more',
  styleUrl: '../../../../../node_modules/@mgdis/styles/dist/components/mg-item-more.css',
  shadow: true,
})
export class MgItemMore {
  /************
   * Internal *
   ************/
  private readonly name = 'mg-item-more';
  private messages: MessageType;
  private overflowBehavior: OverflowBehavior;
  private itemMoreContainer: HTMLMgMenuElement

  /**************
   * Decorators *
   **************/

  /**
   * Get component DOM element
   */
  @Element() element: HTMLMgItemMoreElement;

  /**
   * Define icon
   */
  @Prop() icon?: IconType = { icon: 'ellipsis-vertical' };
  @Watch('icon')
  validateIcon(newValue: MgItemMore['icon']): void {
    if (typeof newValue !== 'object' || (typeof newValue === 'object' && typeof newValue.icon !== 'string'))
      throw new Error(`<${this.name}> prop "icon" must match MgItemMore['icon'] type. Passed value: ${toString(newValue)}.`);
  }

  /**
   * Define slot label element
   */
  @Prop() slotlabel?: SlotLabelType = { display: false };
  @Watch('slotlabel')
  validateSlotLabel(newValue: MgItemMore['slotlabel']): void {
    if (typeof newValue !== 'object' || (typeof newValue === 'object' && typeof newValue.display !== 'boolean'))
      throw new Error(`<${this.name}> prop "slotlabel" must match MgItemMore['slotlabel'] type. Passed value: ${toString(newValue)}.`);
    else if (typeof newValue.label !== 'string') this.slotlabel.label = this.messages.menuLabel;
  }

  /**
   * Define component child menu size.
   */
  @Prop() size?: SizeType;
  @Watch('size')
  validateSize(newValue: MgItemMore['size']): void {
    if (newValue && !sizes.includes(newValue)) throw new Error(`<${this.name}> prop "size" must match MgItemMore['size'] type. Passed value: ${toString(newValue)}.`);
  }

  /**
   * Define component parent menu.
   */
  @State() parentMenu: HTMLMgMenuElement;

  /*************
   * Lifecycle *
   *************/

  /**
   * Set variables and validate props
   */
  componentWillLoad(): void {
    // init variables
    this.messages = initLocales(this.element).messages.itemMore as MessageType;

    // validate props
    this.validateIcon(this.icon);
    this.validateSlotLabel(this.slotlabel);
    this.validateSize(this.size);
  }

  /**
   * Ensure parent DOM is fully rendered with timeout method before parse elements
   * @returns timeout
   */
  componentDidLoad(): ReturnType<typeof setTimeout> {
    // ensure parent menu is fully rendered
    return setTimeout(() => {
      this.parentMenu = this.element.closest('mg-menu');
    });
  }

  /**
   * Set OverflowBehavior when parentMenu state is upate AND defined
   */
  componentDidUpdate(): void {
    if (this.parentMenu && this.overflowBehavior === undefined) {
      this.overflowBehavior = new OverflowBehavior(this.parentMenu, this.element, this.itemMoreContainer);
    }
  }

  /**
   * Disconnect overflow ResizeObserver
   */
  disconnectedCallback(): void {
    this.overflowBehavior?.disconnect();
  }

  /**
   * Render
   * @returns HTML Element
   */
  render(): HTMLElement {
    const menuItemIdentifier = "mg-item-more"
    return (
      <Host role="listitem" data-mg-popover-guard={`${menuItemIdentifier}-popover`}>
        {this.parentMenu && (
          <mg-menu-item
            data-overflow-more
            data-size={this.parentMenu.size}
            data-style-direction={Direction.HORIZONTAL}
            identifier={menuItemIdentifier}
          >
            <mg-icon icon={this.icon.icon} size={this.size} slot="image"></mg-icon>
            <span class={{ 'mg-u-visually-hidden': !this.slotlabel.display }} slot="label">
              {this.slotlabel.label}
            </span>
            <mg-menu direction={Direction.VERTICAL} label={this.messages.menuLabel} size={this.size} ref={(ref) => {if (ref !== null) this.itemMoreContainer = ref}}></mg-menu>
          </mg-menu-item>
        )}
      </Host>
    );
  }
}
