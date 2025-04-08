import { Component, h, Prop, Element, Watch, Host, Listen } from '@stencil/core';
import { directions, sizes } from './mg-menu.conf';
import type { MenuSizeType, ItemMoreType } from './mg-menu.conf';
import { toString } from '@mgdis/stencil-helpers';
import { Direction } from '../../../../types';

/**
 * @slot - Menu content
 */
@Component({
  tag: 'mg-menu',
  styleUrl: '../../../../../node_modules/@mgdis/styles/dist/components/mg-menu.css',
  shadow: true,
})
export class MgMenu {
  /************
   * Internal *
   ************/

  private readonly name = 'mg-menu';

  /**************
   * Decorators *
   **************/

  /**
   * Get component DOM element
   */
  @Element() element: HTMLMgMenuElement;

  /**
   * Menu label. Include short menu description.
   * Required to define accessibility required attribute `aria-label`
   */
  @Prop() label!: string;
  @Watch('label')
  validateLabel(newValue: MgMenu['label']): void {
    if (newValue === undefined && !this.element.hasAttribute('aria-label')) {
      throw new Error(`<${this.name}> prop "label" is required. Passed value: ${toString(newValue)}.`);
    }
  }

  /**
   * Component display direction.
   */
  @Prop({ reflect: true }) direction: Direction = 'horizontal';
  @Watch('direction')
  validateDirection(newValue: MgMenu['direction']): void {
    if (![directions.VERTICAL, directions.HORIZONTAL].includes(newValue)) {
      throw new Error(`<${this.name}> prop "direction" must be one of: ${directions.HORIZONTAL}, ${directions.VERTICAL}. Passed value: ${toString(newValue)}.`);
    } else {
      this.updateMenuItems();
    }
  }

  /**
   * Customize "mg-item-more" element
   * Used with direction: 'vertical' to manage overflow
   */
  @Prop() itemmore?: ItemMoreType;
  @Watch('itemmore')
  validateItemMore(newValue: MgMenu['itemmore']): void {
    if (newValue !== undefined && this.direction !== directions.HORIZONTAL) {
      throw new Error(`<${this.name}> prop "itemmore" must be paired with direction ${directions.HORIZONTAL}.`);
    } else if (newValue !== undefined) {
      this.renderMgItemMore();
    }
  }

  /**
   * Define mg-menu size
   */
  @Prop() size: MenuSizeType = 'medium';
  @Watch('size')
  validateSize(newValue: MgMenu['size']): void {
    if (!sizes.includes(newValue)) {
      throw new Error(`<${this.name}> prop "size" must be one of: ${sizes.join(', ')}. Passed value: ${toString(newValue)}.`);
    }
  }

  /**
   * Define mg-menu-item listener when they are loaded
   * @param event - mg-item-loaded "item-loaded" custom event
   */
  @Listen('item-loaded')
  updateItemListener(event: CustomEvent & { target: HTMLMgMenuItemElement }): void {
    const itemToWatch = event.target.nodeName === 'MG-ITEM-MORE' ? event.target.shadowRoot.querySelector('mg-menu-item') : event.target;

    ['click', 'focus'].forEach(trigger => {
      itemToWatch.addEventListener(trigger, (): void => {
        const focusedItem: HTMLMgMenuItemElement = event.target.closest('mg-menu').querySelector('[data-has-focus]');
        // exit process if new focused item in the current menu children
        if (focusedItem === itemToWatch) return;

        // reset expanded on previous active menu item
        if (focusedItem !== null) focusedItem.removeAttribute('data-has-focus');

        // update focusedMenuItem with new value
        itemToWatch.setAttribute('data-has-focus', 'true');
      });
    });
  }

  /*************
   * Methods *
   *************/

  /**
   * Test if menu is a child menu
   * @returns truthy if menu is a child menu
   */
  private isChildMenu = (): boolean => this.element.closest('mg-menu-item') !== null;

  /**
   * Get menu children items
   * @returns menu children mg-menu-item
   */
  private getMenuItems = (menu = this.element): HTMLMgMenuItemElement[] => {
    const menuItems = Array.from(menu.children).filter(child => child.nodeName === 'MG-MENU-ITEM') as HTMLMgMenuItemElement[];
    const itemMoreMenuItem = menu.querySelector('mg-item-more')?.shadowRoot?.querySelector('mg-menu-item');
    if (itemMoreMenuItem !== null && itemMoreMenuItem !== undefined) {
      menuItems.push(itemMoreMenuItem);
    }
    return menuItems;
  };

  /**
   * Update menu items
   */
  private updateMenuItems = (): void => {
    this.getMenuItems().forEach(item => {
      item.dataset.styleDirection = this.direction;
    });

    // render mg-item-more to manage OverflowBehavior
    this.renderMgItemMore();
  };

  /**
   * render mg-item-more
   */
  private renderMgItemMore = (): void => {
    if (this.direction === directions.VERTICAL || (this.direction === directions.HORIZONTAL && this.isChildMenu()) || this.element.children.length <= 1) {
      return;
    }

    // Insert mg-item-more outside the mg-menu shadowdom
    let itemMoreElement = this.element.querySelector('mg-item-more');
    if (itemMoreElement === null) {
      itemMoreElement = document.createElement('mg-item-more');
      this.element.appendChild(itemMoreElement);
    }

    // update mg-item-more props
    for (const propertie in this.itemmore) {
      itemMoreElement[propertie] = this.itemmore[propertie];
    }
    if (this.itemmore?.size === undefined) itemMoreElement.size = this.size;
  };

  /*************
   * Lifecycle *
   *************/

  /**
   * Validate props
   */
  componentWillLoad(): void {
    this.validateDirection(this.direction);
    this.validateLabel(this.label);
    this.validateItemMore(this.itemmore);
    this.validateSize(this.size);
  }

  /**
   * Check if component slots configuration
   */
  componentDidLoad(): void {
    // set menu-items
    this.updateMenuItems();

    // add listener to close main menu when focus leave it
    if (!this.isChildMenu() && this.direction === directions.HORIZONTAL) {
      document.addEventListener('focusin', (event: FocusEvent & { target: HTMLElement }): void => {
        const isElementChild = (element: HTMLElement): boolean => {
          if (element === this.element) return true;
          else if (element.parentElement === null) return false;
          else return isElementChild(element.parentElement);
        };

        if (event.target.closest('mg-menu') === null || !isElementChild(event.target)) {
          const focusedItem = this.element.querySelector('[data-has-focus]');
          // reset expanded on previous active menu item
          if (focusedItem !== null) focusedItem.removeAttribute('data-has-focus');
        }
      });
    }
    // add mutation observer to improve global reactivity
    new MutationObserver(this.updateMenuItems).observe(this.element, { childList: true });
  }

  /**
   * Render
   * @returns HTML Element
   */
  render(): HTMLElement {
    return (
      <Host role="list" aria-label={this.label}>
        <slot></slot>
      </Host>
    );
  }
}
