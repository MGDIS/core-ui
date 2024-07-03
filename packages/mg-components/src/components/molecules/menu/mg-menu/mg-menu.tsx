import { Component, h, Prop, State, Element, Watch, Host } from '@stencil/core';
import { Direction, sizes } from './mg-menu.conf';
import type { MenuSizeType, ItemMoreType, DirectionType } from './mg-menu.conf';

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
    if (newValue === undefined && !this.element.getAttribute('aria-label')) {
      throw new Error(`<${this.name}> prop "label" is required.`);
    }
  }

  /**
   * Component display direction.
   */
  @Prop({ reflect: true }) direction: DirectionType = Direction.HORIZONTAL;
  @Watch('direction')
  validateDirection(newValue: MgMenu['direction']): void {
    if (![Direction.VERTICAL, Direction.HORIZONTAL].includes(newValue)) {
      throw new Error(`<${this.name}> prop "direction" must be one of: ${Direction.HORIZONTAL}, ${Direction.VERTICAL}.`);
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
    } else if (newValue) {
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
      throw new Error(`<${this.name}> prop "size" must be one of: ${sizes.join(', ')}.`);
    }
  }

  /**
   * is this menu a child menu. Used for conditional render.
   */
  @State() isChildMenu: boolean;

  /*************
   * Methods *
   *************/

  /**
   * Close matching menu-item
   * @param item - menu-item to close
   * @param condition - addionnal condition
   */
  private closeMenuItem = (item: HTMLMgMenuItemElement, condition: boolean): void => {
    if (!this.isChildMenu && condition) {
      item.expanded = false;
    }
  };

  /**
   * get mg-item-more child mg-menu-item element
   * @returns mg-menu-item element
   */
  private getItemMoreMenuItem = (): HTMLMgMenuItemElement => this.itemMoreElement?.shadowRoot?.querySelector('mg-menu-item');

  /**
   * Set item listend
   * @param item - mg-menu-item element
   * @param index - number
   */
  private setItemListener = (item: HTMLMgMenuItemElement, index: MgMenu['focusedMenuItem']): void => {
    ['click', 'focus'].forEach(trigger => {
      item.shadowRoot.querySelector('button,a').addEventListener(trigger, () => {
        this.focusedMenuItem = index;
        // reset expanded on previous active menu item
        (this.getItemMoreMenuItem() ? [...this.menuItems, this.getItemMoreMenuItem()] : this.menuItems).forEach((item, index) => {
          this.closeMenuItem(item, index !== this.focusedMenuItem);
        });
      });
    });
  };

  /**
   * Store menu-items on component init and add listeners
   */
  private initMenuItemsListeners = (): void => {
    // add listeners on menu item and edit index
    this.menuItems.forEach((item, index) => {
      this.setItemListener(item, index);
    });
  };

  /**
   * Handle item-loaded event on mg-item-more element
   */
  private handleItemLoaded = (): void => {
    this.setItemListener(this.getItemMoreMenuItem(), this.menuItems.length);
  };

  /**
   * render mg-item-more
   */
  private renderMgItemMore = (): void => {
    if (this.direction !== Direction.HORIZONTAL || this.isChildMenu || this.element.children.length <= 1) {
      return;
    }

    // Insert mg-item-more outside the mg-menu shadowdom
    if (!this.itemMoreElement) {
      this.itemMoreElement = document.createElement('mg-item-more');
      this.itemMoreElement.addEventListener('item-loaded', this.handleItemLoaded);
      this.element.appendChild(this.itemMoreElement);
    }

    // update mg-item-more props
    for (const attribute in this.itemmore) {
      const newValue = this.itemmore[attribute];
      // to improve rendering we use HTML attributes as much as possible
      if (['string', 'number'].includes(typeof newValue)) {
        this.itemMoreElement.setAttribute(attribute, newValue);
      } else {
        this.itemMoreElement[attribute] = newValue;
      }
    }
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
   * @returns timeout
   */
  componentDidLoad(): ReturnType<typeof setTimeout> {
    // update props and states after componentDidLoad hook
    // return a promise to process action only in the FIRST render().
    // https://stenciljs.com/docs/component-lifecycle#componentwillload
    return setTimeout(() => {
      // store all menu-items
      this.menuItems = Array.from(this.element.children).filter(child => child.nodeName === 'MG-MENU-ITEM') as HTMLMgMenuItemElement[];
      this.isChildMenu = this.element.closest('mg-menu-item') !== null;

      // add mg-item-more to manage OverflowBehavior
      // when all props, states and DOM are already rendered we can render the mg-item-more
      this.renderMgItemMore();
      // then use mutation observer on children to improve reactivity
      new MutationObserver(() => {
        this.renderMgItemMore();
      }).observe(this.element, { childList: true });
    });
  }

  /**
   * Add listeners to items
   */
  componentDidRender(): void {
    this.initMenuItemsListeners();
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
