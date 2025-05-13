import { Component, h, Element, Prop, Watch, State, Host } from '@stencil/core';
import { createID, toString } from '@mgdis/core-ui-helpers/dist/utils';
import { Status } from '../menus/mg-menu-item/mg-menu-item.conf';
import { directions } from '../menus/mg-menu/mg-menu.conf';
import { initLocales } from '../../../locales';
import type { MessageType } from '../../../locales/index.conf';
import type { MgActionMoreItemType, MgActionMoreButtonType, MgActionMoreIconType, MgActionMoreDividerType } from './mg-action-more.conf';

/**
 * MgActionMore['items'] type guard
 * @param prop - commponent items prop
 * @returns return true if type is valid
 */
const isMgActionMoreItems = (prop: unknown): prop is MgActionMoreItemType[] => {
  const items = prop as MgActionMoreItemType[];
  return (
    typeof items === 'object' &&
    items.every(item => (typeof item === 'object' && typeof item.label === 'string' && typeof item.mouseEventHandler === 'function') || isMgActionMoreDivider(item))
  );
};

/**
 * MgActionMoreDividerType type guard
 * @param item - component item
 * @returns return true if type is valid
 */
const isMgActionMoreDivider = (item: unknown): item is MgActionMoreDividerType => typeof item === 'object' && (item as MgActionMoreDividerType).isDivider;

/**
 * MgActionMore['button'] type guard
 * @param prop - commponent button prop
 * @returns return true if type is valid
 */
const isMgActionMoreButton = (prop: unknown): prop is MgActionMoreButtonType => {
  const button = prop as MgActionMoreButtonType;
  return typeof button === 'object' && typeof button.variant === 'string' && typeof button.isIcon === 'boolean';
};

/**
 * MgActionMore['icon'] type guard
 * @param prop - commponent icon prop
 * @returns return true if type is valid
 */
const isMgActionMoreIcon = (prop: unknown): prop is MgActionMoreIconType => {
  const icon = prop as MgActionMoreIconType;
  return typeof icon === 'object' && typeof icon.icon === 'string';
};

@Component({
  tag: 'mg-action-more',
  styleUrl: '../../../../node_modules/@mgdis/styles/dist/components/mg-action-more.css',
  shadow: true,
})
export class MgActionMore {
  /************
   * Internal *
   ************/

  private readonly name = 'mg-action-more';
  private readonly classBase = 'mg-c-action-more';
  private readonly mgPopoverIdentifier = createID(this.name);
  private messages: MessageType;

  /**************
   * Decorators *
   **************/

  /**
   * Get component DOM element
   */
  @Element() element: HTMLMgActionMoreElement;

  /**
   * Define the menu-items elements
   */
  @Prop() items!: (MgActionMoreItemType | MgActionMoreDividerType)[];
  @Watch('items')
  validateItems(newValue: MgActionMore['items']): void {
    if (!isMgActionMoreItems(newValue)) {
      throw new Error(
        `<${this.name}> prop "items" is required and all values must be the same type, MgActionMoreItemType or MgActionMoreDividerType. Passed value: ${toString(newValue)}.`,
      );
    } else if (isMgActionMoreItems(newValue) && newValue.length > 0 && (isMgActionMoreDivider(newValue[0]) || isMgActionMoreDivider(newValue[newValue.length - 1]))) {
      throw new Error(`<${this.name}> prop "items" can’t have a divider at the beginning or the end of the array. Passed value: ${toString(newValue)}.`);
    }
  }

  /**
   * Define displayed icon
   */
  @Prop({ mutable: true }) icon?: MgActionMoreIconType;
  @Watch('icon')
  validateIcon(newValue: MgActionMore['icon']): void {
    if (newValue && !isMgActionMoreIcon(newValue)) {
      throw new Error(`<${this.name}> prop "icon" must match MgActionMoreIconType. Passed value: ${toString(newValue)}.`);
    } else if (newValue?.icon === undefined && Boolean(this.button.isIcon)) {
      this.icon = { icon: 'ellipsis' };
    }
  }

  /**
   * Define button properties
   */
  @Prop() button?: MgActionMoreButtonType = { variant: 'flat', isIcon: true };
  @Watch('button')
  validateButton(newValue: MgActionMore['button']): void {
    if (newValue && !isMgActionMoreButton(newValue)) {
      throw new Error(`<${this.name}> prop "button" must match MgActionMoreButtonType. Passed value: ${toString(newValue)}.`);
    }
  }

  /**
   * Define if chevron is display
   */
  @Prop() displayChevron = false;
  @Watch('displayChevron')
  validateDisplayChevron(newValue: MgActionMore['displayChevron']): void {
    if (newValue && this.button.isIcon === true) {
      throw new Error(`<${this.name}> prop "displayChevron" can't be used with a 'button" prop "isIcon" attribute.`);
    }
  }
  /**
   * Menu expanded state
   */
  @State() expanded = false;

  /************
   * Methods *
   ***********/

  /**
   * Toggle expanded props
   */
  private toggleExpanded = (): void => {
    this.expanded = !this.expanded;
  };

  /**
   * Handle popover display change value
   * @param event - display change updated value
   */
  private handleDisplayChange = (event: CustomEvent): void => {
    this.expanded = event.detail;
  };

  /**
   * Button click handler
   */
  private handleButton = (): void => {
    this.toggleExpanded();
  };

  /**
   * Item click handler
   * @param event - click event
   * @param customHandler - item['mouseEventHandler']
   */
  private handleItemClick = (event: MouseEvent, customHandler: MgActionMoreItemType['mouseEventHandler']) => {
    this.expanded = false;
    customHandler(event);
  };

  /*************
   * Lifecycle *
   *************/

  /**
   * Validate props
   */
  componentWillLoad(): void {
    this.messages = initLocales(this.element).messages.actionMore as MessageType;
    this.validateItems(this.items);
    this.validateButton(this.button);
    this.validateIcon(this.icon);
    this.validateDisplayChevron(this.displayChevron);
  }

  /**
   * Render
   * @returns HTML Element
   */
  render(): HTMLElement {
    const buttonLabel = this.button.label || this.messages.label;
    const buttonContent = [buttonLabel];

    if (!this.button.isIcon && this.displayChevron) {
      buttonContent.push(
        <span
          class={{
            [`${this.classBase}__chevron`]: true,
            [`${this.classBase}__chevron--rotate`]: this.expanded === true,
          }}
        >
          <mg-icon icon="chevron-down"></mg-icon>
        </span>,
      );
    }

    return (
      <Host data-mg-popover-guard={this.mgPopoverIdentifier}>
        <span class={this.classBase}>
          <mg-popover identifier={this.mgPopoverIdentifier} display={this.expanded} onDisplay-change={this.handleDisplayChange}>
            <mg-button variant={this.button.variant} isIcon={this.button.isIcon} disabled={this.button.disabled} type="button" label={buttonLabel} onClick={this.handleButton}>
              {this.icon && <mg-icon {...this.icon}></mg-icon>}
              {!this.button.isIcon && buttonContent}
            </mg-button>
            <div slot="content">
              <mg-menu direction={directions.VERTICAL} label={this.messages.label}>
                {this.items.map(item =>
                  isMgActionMoreDivider(item) ? (
                    <mg-divider class="mg-c-action-more__divider" key="divider" full-width></mg-divider>
                  ) : (
                    <mg-menu-item
                      key={item.label}
                      status={item.status || Status.VISIBLE}
                      target={item.target}
                      href={item.href}
                      // eslint-disable-next-line react/jsx-no-bind
                      onClick={e => this.handleItemClick(e, item.mouseEventHandler)}
                    >
                      {item.icon?.icon && <mg-icon icon={item.icon.icon} variant={item.icon.variant} variantStyle={item.icon.variantStyle} slot="image"></mg-icon>}
                      <span slot="label">{item.label}</span>
                      {item.badge?.label && <mg-badge label={item.badge.label} value={item.badge.value} slot="information" variant="text-color"></mg-badge>}
                    </mg-menu-item>
                  ),
                )}
              </mg-menu>
            </div>
          </mg-popover>
        </span>
      </Host>
    );
  }
}
