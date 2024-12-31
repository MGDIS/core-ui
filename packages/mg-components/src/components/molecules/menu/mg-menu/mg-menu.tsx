import { Component, h, Prop, Element, Watch, Host } from '@stencil/core';
import { Direction, sizes } from './mg-menu.conf';
import type { MenuSizeType, ItemMoreType, DirectionType } from './mg-menu.conf';
import { toString } from '@mgdis/stencil-helpers';

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
  private menuItems: HTMLMgMenuItemElement[] = [];
  private focusedMenuItem = 0;
  private itemMoreElement: HTMLMgItemMoreElement;

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
  @Prop({ reflect: true }) direction: DirectionType = Direction.HORIZONTAL;
  @Watch('direction')
  validateDirection(newValue: MgMenu['direction']): void {
    if (![Direction.VERTICAL, Direction.HORIZONTAL].includes(newValue)) {
      throw new Error(`<${this.name}> prop "direction" must be one of: ${Direction.HORIZONTAL}, ${Direction.VERTICAL}. Passed value: ${toString(newValue)}.`);
    } else {
      this.setMenuItems();
    }
  }

  /**
   * Customize "mg-item-more" element
   * Used with direction: 'vertical' to manage overflow
   */
  @Prop() itemmore?: ItemMoreType;
  @Watch('itemmore')
  validateItemMore(newValue: MgMenu['itemmore']): void {
    if (newValue !== undefined && this.direction !== Direction.HORIZONTAL) {
      throw new Error(`<${this.name}> prop "itemmore" must be paired with direction ${Direction.HORIZONTAL}.`);
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

  /*************
   * Methods *
   *************/

  /**
   * Test if menu is a child menu
   * @returns truthy if menu is a child menu
   */
  private isChildMenu = (): boolean => this.element.closest('mg-menu-item') !== null;

  /**
   * Set item listend
   * @param item - mg-menu-item element
   * @param index - number
   */
  private setItemListener = (item: HTMLMgMenuItemElement, index: MgMenu['focusedMenuItem']): void => {
    const interactiveElement = item.shadowRoot.querySelector('button,a');
    // disable menu
    if(!interactiveElement) return;

    ['click', 'focus'].forEach(trigger => {
      interactiveElement.addEventListener(trigger, () => {
        this.focusedMenuItem = index;
        // reset expanded on previous active menu item
        const itemMoreMenuItem = this.itemMoreElement?.shadowRoot?.querySelector('mg-menu-item');
        (![null, undefined].includes(itemMoreMenuItem) ? [...this.menuItems, itemMoreMenuItem] : this.menuItems).forEach((item, index) => {
          if (!this.isChildMenu() && index !== this.focusedMenuItem) item.expanded = false;
        });
      });
    });
  };

  /**
   * Set menu items
   */
  private setMenuItems = (): void => {
    this.menuItems = Array.from(this.element.children).filter(child => child.nodeName === 'MG-MENU-ITEM') as HTMLMgMenuItemElement[];
    this.menuItems.forEach((item, index) => {
      item.dataset.styleDirection = this.direction
      this.setItemListener(item, index);
    })

    // render mg-item-more to manage OverflowBehavior
    this.renderMgItemMore();
  }

  /**
   * render mg-item-more
   */
  private renderMgItemMore = (): void => {
    if (this.direction === Direction.VERTICAL || this.direction === Direction.HORIZONTAL && this.isChildMenu() || this.element.children.length <= 1) {
      return;
    }

    // Insert mg-item-more outside the mg-menu shadowdom
    if (this.itemMoreElement === undefined) {
      this.itemMoreElement = document.createElement('mg-item-more');
      this.element.appendChild(this.itemMoreElement);
      this.itemMoreElement.addEventListener('item-loaded', () => {
        this.setItemListener(this.itemMoreElement.shadowRoot.querySelector('mg-menu-item'), this.menuItems.length);
      })
    }

    // update mg-item-more props
    for (const propertie in this.itemmore) {
      this.itemMoreElement[propertie] = this.itemmore[propertie];
    }
    if (this.itemmore?.size === undefined) this.itemMoreElement.size = this.size;
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
    this.setMenuItems();

    // add mutation observer to improve global reactivity
    new MutationObserver(() => {
      this.setMenuItems();
    }).observe(this.element, { childList: true });
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
