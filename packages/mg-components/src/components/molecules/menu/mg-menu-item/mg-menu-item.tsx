import { Component, h, Prop, State, Host, Watch, Element, Event, EventEmitter } from '@stencil/core';
import { ClassList, createID, isValidString } from '../../../../utils/components.utils';
import { initLocales } from '../../../../locales';
import { Direction } from '../mg-menu/mg-menu.conf';
import { Status } from './mg-menu-item.conf';
import type { MessageType } from '../../mg-item-more/mg-item-more.conf';
import type { MenuSizeType } from '../mg-menu/mg-menu.conf';
import type { DirectionType } from './mg-menu-item.conf';
import type { MgPopover } from '../../mg-popover/mg-popover';

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
  private badgeLabel: string;

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
  @Prop() identifier = createID('mg-menu-item');

  /**
   * Define menu-item href
   * when defined menu-item contain an anchor instead of button
   */
  @Prop() href: string;

  /**
   * Define menu-item status.
   */
  @Prop({ reflect: true, mutable: true }) status: Status = Status.VISIBLE;
  @Watch('status')
  validateStatus(newValue: MgMenuItem['status'], oldValue?: MgMenuItem['status']): void {
    if (oldValue !== undefined) {
      this.navigationButtonClassList.delete(`${this.navigationButton}--${oldValue}`);
    }
    this.navigationButtonClassList.add(`${this.navigationButton}--${newValue}`);
    this.statusChange.emit(newValue);
  }

  /**
   * Define menu-item content expanded.
   */
  @Prop({ mutable: true }) expanded = false;
  @Watch('expanded')
  validateExpanded(newValue: MgMenuItem['expanded']): void {
    if (typeof newValue !== 'boolean') throw new Error(`<${this.name}> prop "expanded" must be a boolean.`);

    // if menu-item has sub-menu we have to apply some updates:
    if (this.hasChildren) {
      const subItems = Array.from(this.element.querySelectorAll(this.name));
      if (!newValue) {
        // - when main menu item is NOT expanded we need NOT expanded sub-items and NOT expanded sub-content
        subItems.forEach(item => {
          item.expanded = false;
        });
      } else if (this.element.querySelector(`${this.name}[status="${Status.ACTIVE}"]`) !== null) {
        // - when expanded and contain an active item parents are expended too
        subItems.forEach(item => {
          if (this.hasStatus(item, Status.ACTIVE)) {
            item.expanded = true;
          }
        });
      }
    }
  }

  /**********
   * Events *
   *********/

  /**
   * Emited event when status change
   */
  @Event({ eventName: 'status-change' }) statusChange: EventEmitter<MgMenuItem['status']>;

  /**
   * Emited event when item is loaded
   */
  @Event({ eventName: 'item-loaded' }) itemLoaded: EventEmitter<void>;

  /**********
   * States *
   *********/

  /**
   * Define menu-item size.
   */
  @State() size: MenuSizeType = 'regular';
  @Watch('size')
  validateSize(newValue: MgMenuItem['size'], oldValue?: MgMenuItem['size']): void {
    this.navigationButtonClassList.delete(`${this.navigationButton}--size-${oldValue}`);
    this.navigationButtonClassList.add(`${this.navigationButton}--size-${newValue}`);
  }

  /**
   * Component button classes
   */
  @State() navigationButtonClassList: ClassList = new ClassList([this.navigationButton]);

  /**
   * Parent menu direction
   */
  @State() direction: DirectionType;
  @Watch('direction')
  validateDirection(newValue: MgMenuItem['direction']): void {
    // manage menu items style depending to parent menu horientation
    this.element.setAttribute(`data-style-direction-${newValue}`, '');
    this.navigationButtonClassList.add(`${this.navigationButton}--${newValue}`);
    // manage all sub levels child menu-items level with data-level attribut
    if (this.isDirection(Direction.VERTICAL, newValue)) {
      Array.from(this.element.querySelectorAll('mg-menu-item')).forEach(item => {
        item.dataset.level = `${(Number(item.dataset.level) || 1) + 1}`;
      });
    }
  }

  /**
   * Does component is in main menu
   */
  @State() isInMainMenu: boolean;

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

  /***********
   * Methods *
   **********/

  /**
   * Toggle expanded prop value
   */
  private toggleExpanded = (): void => {
    this.expanded = !this.expanded;
  };

  /**
   * Does an Element have given Status
   * @param mgMenuItemElement - to parse
   * @param status - to check
   * @returns true if element with status is found
   */
  private hasStatus = (mgMenuItemElement: HTMLMgMenuItemElement, status: MgMenuItem['status']): boolean => mgMenuItemElement.status === status;

  /**
   * Is component contextual direction match the given direction
   * @param direction - in parent menu
   * @param compareWith - direction to compare with. Default: `this.direction`
   * @returns true is direction match the direction propertie
   */
  private isDirection = (direction: MgMenuItem['direction'], compareWith = this.direction): boolean => direction === compareWith;

  /**
   * Update displayNotificationBadge
   * current component notification badge have priority over the slot badge when submenu contain badge
   */
  private updateDisplayNotificationBadge = (): void => {
    const childMenu = this.element.querySelector('mg-menu');
    this.displayNotificationBadge =
      childMenu !== null &&
      Array.from(childMenu.children).some((subItem: HTMLMgMenuItemElement) => subItem.querySelector('mg-badge') !== null && subItem.getAttribute('hidden') === null);
  };

  /**
   * Method to control if one of component children have active status
   * @returns truthy if component has active child
   */
  private hasActiveChild = (): boolean =>
    Array.from(this.element.querySelector('mg-menu')?.children || []).some(
      (element: HTMLMgMenuItemElement) => element.nodeName === 'MG-MENU-ITEM' && this.hasStatus(element, Status.ACTIVE) && element.getAttribute('hidden') === null,
    );

  /**
   * Validate slots
   * @param guard - prevent action with guard. Default: false.
   */
  private validateSlot = (guard = false): void => {
    // slot title AND metadata validation
    // add title on label AND metada slots due to text-overflow on these element
    if (Array.from(this.element.children).find(child => child.getAttribute('slot') === 'label') === undefined) throw new Error(`<${this.name}> slot "label" is required.`);
    ['label', 'metadata'].forEach(slot => {
      Array.from(this.element.querySelectorAll(`[slot="${slot}"]`)).forEach(element => {
        if (!isValidString(element.textContent)) throw new Error(`<${this.name}> slot "${slot}" must have text content.`);
        if ((guard && element.getAttribute('title') === null) || !guard) element.setAttribute('title', element.textContent);
      });
    });
  };

  /**
   * Update status
   * @param guard - status to exclude from process in addition to [Status.HIDDEN, Status.DISABLED] . Default: [].
   */
  private updateStatus = (guard = []): void => {
    if (![Status.HIDDEN, Status.DISABLED, ...guard].includes(this.status)) {
      this.status = this.hasActiveChild() ? Status.ACTIVE : Status.VISIBLE;
    }
  };

  /**
   * Init event-listeners
   */
  private initListeners = (): void => {
    // manage first sub-level menu-items
    Array.from(this.element.querySelector('mg-menu')?.children || []).forEach(item => {
      if (item.nodeName === 'MG-MENU-ITEM') {
        // manage child menu listener
        item.addEventListener('status-change', () => {
          this.updateStatus();
        });
      }
    });
  };

  /**
   * Get mg-popover identifier
   * @returns generated mg-popover identifier
   */
  private getPopoverIdentifier = (): MgPopover['identifier'] => `${this.identifier}-popover`;

  /**
   * Render popover clickoutside guard for content slot
   */
  private updatePopoverGuard(): void {
    if (this.displayPopover())
      Array.from(this.element.children)
        .filter((child: HTMLElement) => child.getAttribute('slot') === null && child.nodeName !== 'MG-MENU' && Boolean(child.dataset))
        .forEach((slot: HTMLElement) => (slot.dataset.mgPopoverGuard = this.getPopoverIdentifier()));
  }

  /**
   * Condition to know if component should display a mg-popover
   * @returns truthy if component display popover
   */
  private displayPopover = (): boolean => this.isDirection(Direction.HORIZONTAL) && this.hasChildren && this.href === undefined;

  /************
   * Handlers *
   ************/

  /**
   * Handle interacrtive element click
   * @param event - click on element
   */
  private handleElementCLick = (event: MouseEvent): void => {
    if ((this.hasChildren && !this.isInMainMenu) || this.status === Status.DISABLED) {
      event.preventDefault();
      event.stopPropagation();
    }

    // toggle expanded when mg-menu-item has child items
    if (this.hasChildren) this.toggleExpanded();
  };

  /**
   * Handle popover element display-change event
   * @param event - popover display event
   */
  private handlePopoverDisplay = (event: CustomEvent): void => {
    this.expanded = event.detail;
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
    this.badgeLabel = (initLocales(this.element).messages as { plusMenu: MessageType }).plusMenu.badgeLabel;
    this.isItemMore = this.element.dataset.overflowMore !== undefined;

    // Validate props
    this.validateStatus(this.status);
    this.validateExpanded(this.expanded);

    // Validate states
    this.validateSize(this.size);
  }

  /**
   * Check if component slots configuration
   * @returns timeout
   */
  componentDidLoad(): ReturnType<typeof setTimeout> {
    // validation
    this.validateSlot(true);

    // update props and states after componentDidLoad hook
    // return a promise to process action only in the FIRST render().
    // https://stenciljs.com/docs/component-lifecycle#componentwillload
    return setTimeout(() => {
      // define menu-item context states
      const menu = this.element.closest('mg-menu');
      this.direction = this.isItemMore || menu === null ? Direction.HORIZONTAL : menu.direction;
      this.isInMainMenu = menu !== null && this.element.parentElement.closest('mg-menu-item') === null;
      if (menu?.size !== undefined) this.size = menu.size;

      if (this.isItemMore) this.size = this.element.dataset.size as MgMenuItem['size'];

      // when main menu item contain an active item it will get the active style
      // AND if item is in vertical menu it will be expanded
      if (this.hasActiveChild() && this.isInMainMenu) this.expanded = this.isDirection(Direction.VERTICAL);

      this.updateStatus([Status.ACTIVE]);
      this.updateDisplayNotificationBadge();
      this.updatePopoverGuard();

      // manage child dom changes with mutationObserver and listzners
      this.initListeners();

      // emit loaded event when component is fully loaded
      this.itemLoaded.emit();

      new MutationObserver(mutationsList => {
        if (mutationsList.some(mutation => mutation.attributeName === 'hidden')) this.updateStatus();
        if (mutationsList.some(mutation => mutation.type === 'characterData')) this.validateSlot();
        this.updateDisplayNotificationBadge();
      }).observe(this.element, { attributes: true, childList: true, characterData: true, subtree: true });
    }, 0);
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
                <mg-badge label={this.badgeLabel} value="!" variant="text-color" slot="information"></mg-badge>
              </span>
            )}
          </div>
          {this.size !== 'regular' && <slot name="metadata"></slot>}
        </div>
        {this.hasChildren && this.href === undefined && (
          <span
            class={{
              [`${this.navigationButton}-chevron`]: true,
              [`${this.navigationButton}-chevron--rotate`]: this.expanded === true,
            }}
          >
            <mg-icon icon="chevron-down" size="small"></mg-icon>
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
      ['mg-c-menu-item__collapse-container--first-level']: (this.isInMainMenu || this.isItemMore) && this.isDirection(Direction.HORIZONTAL),
    });

    return (
      <Host role={this.isItemMore ? 'presentation' : 'listitem'}>
        {this.displayPopover() ? (
          <mg-popover display={this.expanded} placement="bottom-start" arrowHide={true} onDisplay-change={this.handlePopoverDisplay} identifier={this.getPopoverIdentifier()}>
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
