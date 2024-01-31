import { Component, h, Prop, Element, Host, Watch, State } from '@stencil/core';
import { initLocales } from '../../../locales';
import { OverflowBehavior } from '../../../utils/behaviors.utils';
import { Direction } from '../menu/mg-menu/mg-menu.conf';
import type { IconType, MessageType, SizeType, SlotLabelType } from './mg-item-more.conf';
import { isValidString } from '@mgdis/stencil-helpers';

@Component({
  tag: 'mg-item-more',
  styleUrl: '../../../../node_modules/@mgdis/styles/dist/components/mg-item-more.css',
  shadow: true,
})
export class MgItemMore {
  /************
   * Internal *
   ************/
  private readonly name = 'mg-item-more';
  private messages: MessageType;
  private parentMenuItems: HTMLMgMenuItemElement[];
  private moreElementMenuItem: HTMLMgMenuItemElement;
  private overflowBehavior: OverflowBehavior;
  private canRenderMgMenuItemOverflowElement = true;

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
  @Prop() icon: IconType = { icon: 'ellipsis-vertical' };
  @Watch('icon')
  validateIcon(newValue: MgItemMore['icon']): void {
    if (typeof newValue !== 'object' || (typeof newValue === 'object' && typeof newValue.icon !== 'string'))
      throw new Error(`<${this.name}> prop "icon" must match MgItemMore['icon'] type.`);
  }

  /**
   * Define slot label element
   */
  @Prop() slotlabel: SlotLabelType = { display: false };
  @Watch('slotlabel')
  validateSlotLabel(newValue: MgItemMore['slotlabel']): void {
    if (typeof newValue !== 'object' || (typeof newValue === 'object' && typeof newValue.display !== 'boolean'))
      throw new Error(`<${this.name}> prop "slotlabel" must match MgItemMore['slotlabel'] type.`);
    else if (typeof newValue.label !== 'string') this.slotlabel.label = this.messages.moreLabel;
  }

  /**
   * Define component child menu size.
   */
  @Prop() size: SizeType;
  @Watch('size')
  validateSize(newValue: MgItemMore['size']): void {
    if (newValue && typeof newValue !== 'string') throw new Error(`<${this.name}> prop "size" must match MgItemMore['size'] type.`);
  }

  /**
   * Define component parent menu.
   */
  @State() parentMenu: HTMLMgMenuElement;

  /***********
   * Methods *
   ***********/

  /**
   * render mg-item-more overflow element
   * @returns mg-item-more element
   */
  private renderMgMenuItemOverflowElement = (): HTMLMgItemMoreElement => {
    // create menu items proxy element from item clones
    this.parentMenuItems.forEach((child: HTMLMgMenuItemElement) => {
      this.moreElementMenuItem.querySelector('mg-menu').appendChild(child.cloneNode(true));
    });

    const allMenuItem = Array.from(this.parentMenu.querySelectorAll('mg-menu-item:not([data-overflow-more])'));

    Array.from(this.moreElementMenuItem.querySelectorAll('mg-menu-item:not([data-overflow-more])')).forEach((proxy, index) => {
      // manage click on proxy to mirror it on initial element
      proxy.addEventListener('click', () => {
        // be carefull to use element.click() method instead of dispatchEvent to ensure bubbles outside shadowDom
        const navElement = allMenuItem[index].shadowRoot.querySelector('a, button');
        if (navElement instanceof HTMLButtonElement || navElement instanceof HTMLAnchorElement) navElement.click();
      });

      // add id suffix to prevent duplicate key. default html id is: '';
      if (isValidString(proxy.id)) proxy.id = `${proxy.id}-proxy`;

      // manage status change miror in proxy
      allMenuItem[index].addEventListener('status-change', (event: CustomEvent) => {
        proxy.setAttribute('status', event.detail);
      });
    });

    return this.element;
  };

  /*************
   * Lifecycle *
   *************/

  /**
   * Set variables and validate props
   */
  componentWillLoad(): void {
    // init variables
    this.messages = (initLocales(this.element).messages as { plusMenu: MessageType }).plusMenu;

    // validate props
    this.validateIcon(this.icon);
    this.validateSlotLabel(this.slotlabel);
    this.validateSize(this.size);
  }

  /**
   * Ensure parent DOM is fully rendered with timeout method before parse elements
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
    if (this.parentMenu && this.canRenderMgMenuItemOverflowElement) {
      this.parentMenuItems = Array.from(this.parentMenu.children).filter(item => item.nodeName === 'MG-MENU-ITEM') as HTMLMgMenuItemElement[];
      this.overflowBehavior = new OverflowBehavior(this.parentMenu, this.renderMgMenuItemOverflowElement);
      this.canRenderMgMenuItemOverflowElement = false;
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
    return (
      <Host role="listitem">
        {this.parentMenu && (
          <mg-menu-item
            data-overflow-more
            data-size={this.parentMenu.size}
            ref={el => {
              if (el) this.moreElementMenuItem = el;
            }}
          >
            <mg-icon icon={this.icon.icon} slot="image"></mg-icon>
            <span class={{ 'mg-u-visually-hidden': !this.slotlabel.display }} slot="label">
              {this.slotlabel.label}
            </span>
            <mg-menu direction={Direction.VERTICAL} label={this.messages.moreLabel} size={this.size}></mg-menu>
          </mg-menu-item>
        )}
      </Host>
    );
  }
}
