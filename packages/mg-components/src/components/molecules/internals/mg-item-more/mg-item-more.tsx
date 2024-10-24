import { Component, h, Prop, Element, Host, Watch, State } from '@stencil/core';
import { isValidString, nextTick, toString } from '@mgdis/stencil-helpers';
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
  private parentMenuItems: HTMLMgMenuItemElement[];
  private moreElementMenuItem: HTMLMgMenuItemElement;
  private overflowBehavior: OverflowBehavior;

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

  /**
   * Set proxy element properties and listeners
   * @param proxified - element to proxify from
   */
  private setProxyElement = (proxified: HTMLMgMenuItemElement): void => {
    const proxy: HTMLMgMenuItemElement = this.moreElementMenuItem.querySelector(`[identifier="${proxified.identifier}"]`);
    // eslint-disable-next-line @stencil-community/strict-boolean-conditions
    if (!proxy) {
      return;
    }

    // remove proxy id to prevent duplicate key. default html id is: '';
    if (isValidString(proxy.id)) proxy.id = '';

    const proxyClickHandler = (): void => {
      this.parentMenu
        .querySelector(`[identifier="${proxy.identifier}"]`)
        .shadowRoot.querySelector('a, button')
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    };

    // Watch the `item-updated` event to keep element needeed properties and innerHTML in sync between the proxified and the proxy elements
    const updateProxy = (element: HTMLMgMenuItemElement): void => {
      for (const key in element) {
        if (['identifier', 'href', 'targer', 'status', 'expanded'].includes(key)) element[key] ? proxy.setAttribute(key, element[key]) : proxy.removeAttribute(key);
      }

      proxy.innerHTML = element.innerHTML;
      // When `href` is updated we need to wait the full component re-render before update its handler
      setTimeout(() => {
        const interactiveElement = proxy.shadowRoot.querySelector('a, button');
        interactiveElement?.removeEventListener('click', proxyClickHandler);
        interactiveElement?.addEventListener('click', proxyClickHandler);
      });
    };

    updateProxy(proxified);

    proxified.addEventListener('item-updated', event => {
      updateProxy(event.target);
    });

    // update click event listener on proxy item and mirror the event on the main menu element
    // we need to wait mg-menu-item to be loaded to ensure the shadowroot is rendered
    proxy.addEventListener('item-loaded', () => {
      updateProxy(proxified);
    });
  };

  /***********
   * Methods *
   ***********/

  /**
   * render mg-item-more overflow element
   * @returns mg-item-more element
   */
  private renderMgMenuItemOverflowElement = (): HTMLMgItemMoreElement => {
    this.parentMenuItems.forEach((child: HTMLMgMenuItemElement) => {
      // create item-more menu items element from main menu-items clones
      this.moreElementMenuItem.querySelector('mg-menu').appendChild(child.cloneNode(true));

      // we need to get all `mg-menu-item` linked to the cloned one to set mirror process
      nextTick(() => {
        this.setProxyElement(child);
        if (child.querySelector('mg-menu') !== null) {
          child.querySelectorAll('mg-menu-item').forEach(this.setProxyElement);
        }
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
      this.parentMenuItems = Array.from(this.parentMenu.children).filter(item => item.nodeName === 'MG-MENU-ITEM') as HTMLMgMenuItemElement[];
      this.overflowBehavior = new OverflowBehavior(this.parentMenu, this.renderMgMenuItemOverflowElement);
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
            identifier="mg-item-more"
            ref={el => {
              if (el !== null) {
                this.moreElementMenuItem = el;
              }
            }}
          >
            <mg-icon icon={this.icon.icon} size={this.size} slot="image"></mg-icon>
            <span class={{ 'mg-u-visually-hidden': !this.slotlabel.display }} slot="label">
              {this.slotlabel.label}
            </span>
            <mg-menu direction={Direction.VERTICAL} label={this.messages.menuLabel} size={this.size}></mg-menu>
          </mg-menu-item>
        )}
      </Host>
    );
  }
}
