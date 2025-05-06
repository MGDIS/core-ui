import { Component, h, Prop, State, Host, Watch, Element, Event, EventEmitter } from '@stencil/core';
import { ClassList, createID, isValideID, isValidString, nextTick, toString } from '@mgdis/core-ui-helpers/dist/stencil';
import { initLocales } from '../../../../locales';
import { directions, type MenuSizeType } from '../mg-menu/mg-menu.conf';
import { type MgMenuStatusType, Status, targets, type TargetType } from './mg-menu-item.conf';
import type { MessageType } from '../../../../locales/index.conf';
import { Direction } from '../../../../types';

/**
 * @slot - Menu item content
 * @slot image - Menu item image content
 * @slot label - Menu item label content
 * @slot information - Menu item information content
 * @slot metadata - Menu item metadata content
 */
@Component({
  tag: 'mg-menu-item',
  styleUrl: '../../../../../node_modules/@mgdis/styles/dist/components/mg-menu-item.css',
  shadow: true,
})
export class MgMenuItem {
  /************
   * Internal *
   ************/

  private readonly name = 'mg-menu-item';
  private readonly navigationButton = 'mg-c-menu-item__navigation-button';
  private messages: MessageType;
  private popoverIdentifier: string;

  /**************
   * Decorators *
   **************/

  /**
   * Get component DOM element
   */
  @Element() element: HTMLMgMenuItemElement;

  /************
   * Props *
   ************/

  /**
   * Identifier is used to control mg-popover
   */
  @Prop({ reflect: true }) identifier: string = createID('mg-menu-item');
  @Watch('identifier')
  watchIdentifier(newValue: MgMenuItem['identifier']): void {
    if (!isValideID(newValue)) {
      console.error(`<mg-menu-item> prop "identifier" value is invalid. Passed value: ${toString(newValue)}.`);
    } else {
      this.popoverIdentifier = `${this.identifier}-popover`;
    }
  }

  /**
   * Define menu-item href
   * when defined menu-item contain an anchor instead of button
   */
  @Prop() href?: string;

  /**
   * Define target type
   */
  @Prop() target?: TargetType;
  @Watch('target')
  watchTarget(newValue: MgMenuItem['target']): void {
    if (newValue && !targets.includes(newValue)) {
      throw new Error(`<mg-link> prop "target" must be one of: ${targets.join(', ')}. Passed value: ${toString(newValue)}.`);
    }
  }

  /**
   * Define menu-item status.
   */
  @Prop({ reflect: true, mutable: true }) status?: MgMenuStatusType = 'visible';
  @Watch('status')
  watchStatus(newValue: MgMenuItem['status'], oldValue?: MgMenuItem['status']): void {
    if (oldValue !== undefined) this.navigationButtonClassList.delete(`${this.navigationButton}--${oldValue}`);
    this.navigationButtonClassList.add(`${this.navigationButton}--${newValue}`);
  }

  /**
   * Define menu-item content expanded.
   */
  @Prop({ mutable: true }) expanded? = false;
  @Watch('expanded')
  watchExpanded(newValue: MgMenuItem['expanded']): void {
    if (typeof newValue !== 'boolean') {
      throw new Error(`<${this.name}> prop "expanded" must be a boolean. Passed value: ${toString(newValue)}.`);
    } else {
      this.updateExpanded(newValue);
      // when expanded all actives sub-items need to be expanded and non active closed
      Array.from(this.element.querySelectorAll('mg-menu-item')).forEach(item => {
        if (item !== this.element) item.expanded = newValue ? this.hasStatus(item, Status.ACTIVE) : false;
      });
    }
  }

  /**********
   * Events *
   *********/

  /**
   * Emited event when item is loaded
   */
  @Event({ eventName: 'item-loaded' }) itemLoaded: EventEmitter<void>;

  /**
   * Emited event when item is updated
   */
  @Event({ eventName: 'item-updated' }) itemUpdated: EventEmitter<void>;

  /**********
   * States *
   *********/

  /**
   * Define menu-item size.
   */
  @State() size: MenuSizeType = 'medium';
  @Watch('size')
  watchSize(newValue: MgMenuItem['size'], oldValue?: MgMenuItem['size']): void {
    if (oldValue !== undefined) this.navigationButtonClassList.delete(`${this.navigationButton}--size-${oldValue}`);
    this.navigationButtonClassList.add(`${this.navigationButton}--size-${newValue}`);
  }

  /**
   * Component button classes
   */
  @State() navigationButtonClassList: ClassList = new ClassList([this.navigationButton]);

  /**
   * Parent menu direction
   */
  @State() direction: Direction;
  @Watch('direction')
  validateDirection(newValue: MgMenuItem['direction'], oldValue: MgMenuItem['direction']): void {
    if (oldValue !== undefined) this.navigationButtonClassList.delete(`${this.navigationButton}--${oldValue}`);
    this.navigationButtonClassList.add(`${this.navigationButton}--${newValue}`);
    // manage all sub levels child menu-items level with data-level attribut
    Array.from(this.element.querySelectorAll('mg-menu-item')).forEach(item => {
      if (this.isDirection(directions.VERTICAL, newValue)) {
        item.dataset.level = `${(Number(item.dataset.level) || 1) + 1}`;
      } else {
        delete item.dataset.level;
      }
    });
  }

  /**
   * Does element is item-more
   */
  @State() isItemMore: boolean;

  /**
   * Does component have children.
   */
  @State() hasChildren = false;
  @Watch('hasChildren')
  validateHasChildren(newValue: boolean): void {
    if (newValue && this.element.href !== undefined) {
      throw new Error(`<${this.name}> prop "href" is unauthorizied when element is a parent.`);
    }
  }

  /**
   * Does component should display notification badge.
   */
  @State() displayNotificationBadge: boolean;

  /**
   * direction value in dataset
   * @param newValue - new direction value
   */
  // eslint-disable-next-line @stencil-community/no-unused-watch
  @Watch('data-style-direction')
  watchDataStyleDirection(newValue: Direction): void {
    this.direction = newValue;
  }

  /**
   * has focus value in dataset
   * @param newValue - new direction value
   */
  // eslint-disable-next-line @stencil-community/no-unused-watch
  @Watch('data-has-focus')
  watchDataHasFocus(newValue: string): void {
    if (!isValidString(newValue)) this.updateExpanded(Boolean(newValue));
  }

  /***********
   * Methods *
   **********/

  /**
   * Get parent menu
   * @returns parent menu
   */
  private getParentMenu = (): HTMLMgMenuElement => this.element.closest('mg-menu');

  /**
   * Does an Element have given Status
   * @param mgMenuItemElement - to parse
   * @param status - to check
   * @returns true if element with status is found
   */
  private hasStatus = (mgMenuItemElement: HTMLMgMenuItemElement, status: MgMenuItem['status']): boolean => mgMenuItemElement.status === status;

  /**
   * Condition to know if component should display a mg-popover
   * @returns truthy if component display popover
   */
  private hasPopover = (): boolean =>
    this.isDirection(directions.HORIZONTAL) &&
    ((this.isInMainMenu() && Array.from(this.element.children).some(element => element.querySelector('[slot]') === null)) || this.isItemMore) &&
    this.href === undefined;

  /**
   * Method to control if one of component children have active status
   * @returns truthy if component has active child
   */
  private hasActiveChild = (): boolean =>
    Array.from(this.element.querySelector('mg-menu')?.children || []).some(
      (element: HTMLMgMenuItemElement) => element.nodeName === 'MG-MENU-ITEM' && this.hasStatus(element, Status.ACTIVE) && !element.hasAttribute('hidden'),
    );

  /**
   * Is component an interactive item
   * @returns truthy if element is clickable
   */
  private isInteractiveItem = (): boolean => this.hasChildren || !isValidString(this.href);

  /**
   * Is component contextual direction match the given direction
   * @param direction - in parent menu
   * @param compareWith - direction to compare with. Default: `this.direction`
   * @returns true is direction match the direction propertie
   */
  private isDirection = (direction: MgMenuItem['direction'], compareWith = this.direction): boolean => direction === compareWith;

  /**
   * Does component is in main menu
   * @returns true if component is in main menu
   */
  private isInMainMenu = (): boolean => this.getParentMenu() !== null && this.element.parentElement.closest('mg-menu-item') === null;

  /**
   * Update displayNotificationBadge
   * current component notification badge have priority over the slot badge when submenu contain badge
   */
  private updateDisplayNotificationBadge = (): void => {
    const childMenu = this.element.querySelector('mg-menu');
    this.displayNotificationBadge =
      childMenu !== null && Array.from(childMenu.children).some((subItem: HTMLMgMenuItemElement) => subItem.querySelector('mg-badge') !== null && !subItem.hasAttribute('hidden'));
  };

  /**
   * Update expanded prop
   * @param newValue - expanded new value
   */
  private updateExpanded = (newValue: MgMenuItem['expanded']): void => {
    if (this.isInteractiveItem()) {
      // item is always expanded in vertical menu when has active child
      this.expanded = (this.isDirection(directions.VERTICAL) && this.hasActiveChild()) || newValue;
    }
  };

  /**
   * Update status
   * @param guard - status to exclude from process in addition to [Status.HIDDEN, Status.DISABLED] . Default: [].
   */
  private updateStatus = (guard: MgMenuItem['status'][] = []): void => {
    if (![Status.HIDDEN, Status.DISABLED, ...guard].includes(this.status)) {
      this.status = this.hasActiveChild() ? Status.ACTIVE : Status.VISIBLE;
    }
  };

  /**
   * Render popover clickoutside guard for content slot
   */
  private updatePopoverGuard(): void {
    const subItem: HTMLElement = this.element.querySelector('*:not([slot])');
    if (subItem === null) return;
    if (this.hasPopover()) subItem.dataset.mgPopoverGuard = this.popoverIdentifier;
    else delete subItem.dataset.mgPopoverGuard;
  }

  /**
   * Update slots
   * @param guard - prevent action with guard. Default: false.
   */
  private updateSlot = (guard = false): void => {
    // slot title AND metadata validation
    // add title on label AND metada slots due to text-overflow on these element
    if (Array.from(this.element.children).find(child => child.getAttribute('slot') === 'label') === undefined) {
      throw new Error(`<${this.name}> slot "label" is required.`);
    }
    ['label', 'metadata'].forEach(slot => {
      Array.from(this.element.querySelectorAll(`[slot="${slot}"]`)).forEach(element => {
        if (!isValidString(element.textContent)) throw new Error(`<${this.name}> slot "${slot}" must have text content.`);
        if ((guard && !element.hasAttribute('title')) || !guard) element.setAttribute('title', element.textContent);
      });
    });
  };

  /**
   * Update menu item
   * @param guard - prevent action with guard
   */
  private updateItem = (guard?: MgMenuItem['status'][]): void => {
    const menu = this.getParentMenu();

    // define element size
    if (menu?.size !== undefined && !this.isItemMore) this.size = menu.size;
    else if (this.isItemMore) this.size = this.element.dataset.size as MgMenuItem['size'];

    // when vertical main menu item contain an active item we force expanded
    this.updateExpanded(this.expanded);
    this.updateStatus(guard);
    this.updatePopoverGuard();
    this.updateDisplayNotificationBadge();
  };

  /************
   * Handlers *
   ************/

  /**
   * Handle interacrtive element click
   * @param event - click on element
   */
  private handleElementCLick = (event: MouseEvent): void => {
    if (this.status === Status.DISABLED) {
      event.preventDefault();
      event.stopPropagation();
    }

    // for non "poperized" menu-item we toggle expanded manualy
    this.updateExpanded(!this.expanded);

    // when item is the last clickable item we close the parent popover
    if (!this.isInteractiveItem()) {
      const closePopover = (element: HTMLMgMenuItemElement): void => {
        if (element === null) return;
        else if (element !== this.element && element.expanded && element.shadowRoot.querySelector('mg-popover') !== null) {
          element.expanded = false;
        } else {
          closePopover(element.parentElement.closest('mg-menu-item'));
        }
      };
      closePopover(this.element);
    }
  };

  /**
   * Handle popover element display-change event
   * @param event - popover display event
   */
  private handlePopoverDisplay = (event: CustomEvent): void => {
    this.updateExpanded(event.detail);
  };

  /*************
   * Lifecycle *
   *************/

  /**
   * Validate props
   */
  componentWillLoad(): void {
    // has children items that is NOT [slot='image' | 'information' | 'label' | 'metadata'] element
    // we store only matching elements
    this.hasChildren = Array.from(this.element.children).some(child => !['image', 'information', 'label', 'metadata'].includes(child.getAttribute('slot')));
    this.messages = initLocales(this.element).messages.menuItem as MessageType;
    this.isItemMore = this.element.dataset.overflowMore !== undefined;

    // watchers
    this.watchStatus(this.status);
    this.watchExpanded(this.expanded);
    this.watchTarget(this.target);
    this.watchIdentifier(this.identifier);
    this.watchSize(this.size);
  }

  /**
   * Check if component slots configuration
   * @returns timeout
   */
  componentDidLoad(): ReturnType<typeof setTimeout> {
    // validation
    this.updateSlot(true);
    // update props and states after componentDidLoad hook
    // return a promise to process action only in the FIRST render().
    // https://stenciljs.com/docs/component-lifecycle#componentwillload
    return setTimeout(() => {
      this.watchDataStyleDirection(this.element.dataset.styleDirection as Direction);
      this.watchDataHasFocus(this.element.dataset.hasFocus);
      this.updateItem([Status.ACTIVE]);

      // emit loaded event when component is fully loaded
      this.itemLoaded.emit();

      new MutationObserver(mutationsList => {
        if (mutationsList.some(mutation => ['hidden', 'status'].includes(mutation.attributeName))) this.updateStatus(this.hasChildren ? undefined : [Status.ACTIVE]);
        if (mutationsList.some(mutation => mutation.type === 'characterData')) this.updateSlot();
        if (mutationsList.some(mutation => mutation.type === 'childList')) this.updateItem();
        this.itemUpdated.emit();
      }).observe(this.element, { attributes: true, childList: true, characterData: true, subtree: true });
    }, 0);
  }

  /**
   * Emit event when component is updated
   * @returns promise process wich emit the 'item-updated' event
   */
  componentShouldUpdate(): Promise<void> {
    return nextTick(() => {
      this.itemUpdated.emit();
    });
  }

  /**
   * Render ineractive element
   * @returns HTML Element
   */
  private renderInteractiveElement(): HTMLElement {
    const TagName: string = this.href !== undefined ? 'a' : 'button';
    return (
      <TagName
        href={this.href}
        class={this.navigationButtonClassList.join()}
        tabindex={[Status.DISABLED, Status.HIDDEN].includes(this.status) ? -1 : undefined}
        disabled={this.status === Status.DISABLED}
        hidden={this.status === Status.HIDDEN}
        target={this.href !== undefined && this.target !== undefined ? this.target : undefined}
        aria-expanded={this.hasChildren && this.expanded.toString()}
        aria-current={this.status === Status.ACTIVE && 'page'}
        onClick={this.handleElementCLick}
      >
        <slot name="image"></slot>
        <div class={`${this.navigationButton}-center`}>
          <div class={`${this.navigationButton}-text-content`}>
            <slot name="label"></slot>
            {!this.displayNotificationBadge && <slot name="information"></slot>}
            {this.displayNotificationBadge && (
              <span class={`${this.navigationButton}-text-content-notification`}>
                <mg-badge label={this.messages.badgeLabel} value="!" variant="text-color" slot="information"></mg-badge>
              </span>
            )}
            {this.target === '_blank' && [
              <mg-icon key="icon-new-tab" class={`${this.navigationButton}-new-tab`} icon="arrow-up-right-square"></mg-icon>,
              <span key="a11y-new-tab" class="mg-u-visually-hidden">
                {this.messages.openNewTab}
              </span>,
            ]}
          </div>
          {this.size !== 'medium' && <slot name="metadata"></slot>}
        </div>
        {this.hasChildren && this.href === undefined && (
          <span
            class={{
              [`${this.navigationButton}-chevron`]: true,
              [`${this.navigationButton}-chevron--rotate`]: this.expanded === true,
            }}
          >
            <mg-icon icon="chevron-down"></mg-icon>
          </span>
        )}
      </TagName>
    );
  }

  /**
   * Render slot
   * @returns HTML Element
   */
  private renderSlot = (): HTMLElement => <slot></slot>;

  /**
   * Render
   * @returns HTML Element
   */
  render(): HTMLElement {
    const getContainerClasses = () => ({
      ['mg-c-menu-item__collapse-container']: true,
      ['mg-c-menu-item__collapse-container--first-level']: (this.isInMainMenu() || this.isItemMore) && this.isDirection(directions.HORIZONTAL),
    });

    return (
      <Host role={this.isItemMore ? 'presentation' : 'listitem'}>
        {this.hasPopover() ? (
          <mg-popover
            display={this.expanded}
            placement="bottom-start"
            arrowHide={true}
            onDisplay-change={this.handlePopoverDisplay}
            identifier={this.popoverIdentifier}
            data-fallback-placement="bottom-end" // use for the last element of the menu if it is placed on the right side
          >
            {this.renderInteractiveElement()}
            <div class={getContainerClasses()} slot="content">
              {this.renderSlot()}
            </div>
          </mg-popover>
        ) : (
          [
            this.renderInteractiveElement(),
            <div key="vertical-container" class={getContainerClasses()} hidden={!this.expanded}>
              {this.renderSlot()}
            </div>,
          ]
        )}
      </Host>
    );
  }
}
