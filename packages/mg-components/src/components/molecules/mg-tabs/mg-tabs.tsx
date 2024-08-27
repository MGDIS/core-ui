import { Component, Event, EventEmitter, h, Prop, State, Element, Watch } from '@stencil/core';
import { createID, ClassList, allItemsAreString, isValidString, nextTick, toString } from '@mgdis/stencil-helpers';
import { TabItem, sizes, Status, SizeType } from './mg-tabs.conf';

/**
 * type TabItem validation function
 * @param tab - tab item
 * @returns tab item type is valid
 */
const isTabItem = (tab: unknown): tab is TabItem => typeof tab === 'object' && typeof (tab as TabItem).label === 'string';

/**
 * @slot tab_content-n - Tab content, where `n` represents the position of the tab content. It starts at 1.
 */
@Component({
  tag: 'mg-tabs',
  styleUrl: '../../../../node_modules/@mgdis/styles/dist/components/mg-tabs.css',
  shadow: true,
})
export class MgTabs {
  /************
   * Internal *
   ************/

  // classes
  private readonly tabPanel = 'panel';
  private readonly buttonTabBaseClass = 'mg-c-tabs__navigation-button';

  // variables
  private tabFocus: number;
  private startIndex = 1;

  /**************
   * Decorators *
   **************/

  /**
   * Get component DOM element
   */
  @Element() element: HTMLMgTabsElement;

  /**
   * Identifier is used for the element ID (id is a reserved prop in Stencil.js)
   * If not set, it will be created.
   */
  @Prop() identifier: string = createID('mg-tabs');

  /**
   * Tabs label. Include short tabs description.
   * Required for accessibility
   */
  @Prop() label!: string;
  @Watch('label')
  validateLabel(newValue: MgTabs['label']): void {
    if (!isValidString(newValue)) {
      throw new Error(`<mg-tabs> prop "label" is required and must be a string. Passed value: ${toString(newValue)}.`);
    }
  }

  /**
   * Define tabs size
   */
  @Prop() size: SizeType = 'medium';
  @Watch('size')
  validateSize(newValue: MgTabs['size']): void {
    if (!sizes.includes(newValue)) {
      throw new Error(`<mg-tabs> prop "size" must be one of: ${sizes.join(', ')}. Passed value: ${toString(newValue)}.`);
    }
    this.classCollection.add(`mg-c-tabs--size-${this.size}`);
  }

  /**
   * Tabs items
   */
  @Prop() items!: string[] | TabItem[];
  @Watch('items')
  validateItems(newValue: MgTabs['items']): void {
    // String array
    if (allItemsAreString(newValue)) this.tabs = newValue.map(item => ({ label: item, status: Status.VISIBLE }));
    // Object array
    else if (Array.isArray(newValue) && newValue.length > 0 && newValue.every(isTabItem)) this.tabs = newValue;
    else throw new Error(`<mg-tabs> prop "items" is required and all items must be the same type: TabItem. Passed value: ${toString(newValue)}.`);
  }

  /**
   * Active tab number
   */
  @Prop({ reflect: true, mutable: true }) activeTab: number;
  @Watch('activeTab')
  validateActiveTab(newValue: MgTabs['activeTab']): void {
    // when `active-tab` is undefined we set default value by searching an item with `Status.ACTIVE` or we use the `startIndex` has fallback value
    // after setting new value to `active-tab` the validate will be triggered again with the updated value and process the tab update
    if (newValue === undefined) {
      this.activeTab = this.tabs.some(tab => this.tabHasStatus(tab, Status.ACTIVE))
        ? this.getTabItemIndex(this.tabs.findIndex(tab => this.tabHasStatus(tab, Status.ACTIVE)))
        : this.startIndex;
    } else if (typeof newValue === 'number' && newValue >= this.startIndex && newValue <= this.tabs.length && this.isActivableTab(this.tabs[newValue - this.startIndex])) {
      // if new 'active-tab' is activable we update tab status to ACTIVE and toggle past ACTIVE to VISIBLE
      this.tabs.forEach((tab, index) => {
        const isNewActiveTab = index === newValue - this.startIndex;
        // reset active tabs
        if (this.tabHasStatus(tab, Status.ACTIVE) && !isNewActiveTab) tab.status = Status.VISIBLE;
        // set active tab from given tab key
        else if (this.isActivableTab(tab) && isNewActiveTab) tab.status = Status.ACTIVE;
      });
      // emit change active tab key event
      this.activeTabChange.emit(newValue);
    } else {
      throw new Error(
        `<mg-tabs> prop "activeTab" must be a number between ${this.startIndex} and ${this.tabs.length} and new value must be "activable". Passed value: ${toString(newValue)}.`,
      );
    }
  }

  /**
   * Component tabs
   */
  @State() tabs: TabItem[] = [];

  /**
   * Component classes
   */
  @State() classCollection: ClassList = new ClassList(['mg-c-tabs']);

  /**
   * Emited event when active tab change
   */
  @Event({ eventName: 'active-tab-change' }) activeTabChange: EventEmitter<HTMLMgTabsElement['activeTab']>;

  /**
   * Validate that new tab status can be `Status.ACTIVE`
   * @param tab - tab item
   * @returns true when tab match condition to get a `Status.ACTIVE`
   */
  private isActivableTab = (tab: TabItem): boolean => [undefined, Status.ACTIVE, Status.VISIBLE].includes(tab.status);

  /**
   * Method to know if given tab has the given status
   * @param tab - item tab key to set to ACTIVE status
   * @param status - status to valide
   * @returns status comparaison
   */
  private tabHasStatus = (tab: TabItem, status: TabItem['status']): boolean => tab.status === status;

  /**
   * Method to get element id from index
   * @param element - to get id
   * @param index - to generate id
   * @returns generated element id
   */
  private getElementId = (element: string, index: number): string => `${element}-${this.getTabItemIndex(index)}`;

  /**
   * Method to get tab item index
   * @param index - to get
   * @returns index
   */
  private getTabItemIndex = (index: number): number => index + this.startIndex;

  /**
   * Handle click events on tabs
   * @param event - mouse event
   */
  private handleClick = (event: MouseEvent & { currentTarget: HTMLElement }): void => {
    const tabId = event.currentTarget.dataset.index;
    if (!this.isActivableTab(this.tabs[Number(tabId) - this.startIndex])) {
      event.preventDefault();
    } else {
      this.activeTab = Number(tabId);
      this.tabFocus = undefined;
    }
  };

  /**
   * get navigation button class from given status
   * @param status - button tab status
   * @returns button class/selector variant
   */
  private getNavigationButtonClass = (status: TabItem['status']): string => `${this.buttonTabBaseClass}--${status}`;

  /**
   * Handle keyboard event on tabs
   * @param event - mouse event
   */
  private handleKeydown = (event: KeyboardEvent & { target: HTMLElement }): void => {
    const parent = event.target.parentElement;
    if (['ArrowRight', 'ArrowLeft'].includes(event.key)) {
      this.tabFocus = Number(event.target.dataset.index);
      parent.querySelector(`[data-index="${this.tabFocus}"]`).setAttribute('tabindex', '-1');

      // Move right
      if (event.key === 'ArrowRight') {
        this.tabFocus++;
        // If we're at the end, go to the start
        if (this.tabFocus > this.tabs.length) this.tabFocus = this.startIndex;
        // Move left
      } else if (event.key === 'ArrowLeft') {
        this.tabFocus--;
        // If we're at the start, move to the end
        if (this.tabFocus < this.startIndex) this.tabFocus = this.tabs.length;
      }

      const parentButtonElement: HTMLButtonElement = parent.querySelector(`[data-index="${this.tabFocus}"]`);
      // if focus item is ['hidden'] we recursively repeat action
      if (this.tabHasStatus(this.tabs[this.tabFocus - 1], Status.HIDDEN)) {
        parentButtonElement.dispatchEvent(new KeyboardEvent('keydown', { key: event.key, bubbles: true }));
        // else run focus methods on tabFocus element
      } else {
        parentButtonElement.setAttribute('tabindex', '0');
        parentButtonElement.focus();
      }
    } else if (event.key === 'Tab') {
      this.resetFocus();
    }
  };

  /**
   * Reset focus on document click
   * @param event - mouse event
   */
  private handleDocumentClick = (event: MouseEvent & { target: HTMLElement }): void => {
    if (event.target.closest('mg-tabs') !== this.element) this.resetFocus();
  };

  /**
   * Method to reset focus behavior
   */
  private resetFocus = (): void => {
    // update asynchronously tabindex to prevent get focus on new tabindex at then end of event process
    nextTick(() => {
      this.tabFocus = undefined;
      Array.from(this.element.shadowRoot.querySelectorAll('[data-index]')).forEach((tab, index) => {
        tab.setAttribute('tabindex', this.activeTab - this.startIndex !== index ? '-1' : '0');
      });
    });
  };

  /**
   * Validate slots setting
   */
  private validateSlots = (): void => {
    const slots = Array.from(this.element.children).filter(slot => slot.getAttribute('slot')?.includes('tab_content-'));
    if (slots.length !== this.tabs.length) throw new Error('<mg-tabs> Must have slots counts equal to tabs count.');
  };

  /*************
   * Lifecycle *
   *************/

  /**
   * Check if component props are well configured on init
   */
  componentWillLoad(): void {
    // Check tabs format
    this.validateLabel(this.label);
    this.validateItems(this.items);
    this.validateActiveTab(this.activeTab);
    this.validateSize(this.size);
    this.validateSlots();
  }

  /**
   * add listners
   */
  componentDidLoad(): void {
    document.addEventListener('click', this.handleDocumentClick, false);
  }

  /**
   * remove listeners
   */
  disconnectedCallback(): void {
    document.removeEventListener('keydown', this.handleDocumentClick);
  }

  /**
   * Render
   * @returns HTML Element
   */
  render(): HTMLElement {
    return (
      <div class={this.classCollection.join()}>
        <header role="tablist" aria-label={this.label} class="mg-c-tabs__header">
          {this.tabs.map((tab, index) => (
            <button
              key={tab.label}
              role="tab"
              id={this.getElementId(this.identifier, index)}
              class={{
                [`${this.buttonTabBaseClass}`]: true,
                [`${this.buttonTabBaseClass}--horizontal`]: true,
                [`${this.getNavigationButtonClass(Status.ACTIVE)}`]: this.tabHasStatus(tab, Status.ACTIVE),
                [`${this.getNavigationButtonClass(Status.DISABLED)}`]: this.tabHasStatus(tab, Status.DISABLED),
                [`${this.getNavigationButtonClass(Status.HIDDEN)}`]: this.tabHasStatus(tab, Status.HIDDEN),
              }}
              tabindex={this.tabHasStatus(tab, Status.ACTIVE) ? 0 : -1}
              aria-selected={this.tabHasStatus(tab, Status.ACTIVE).toString()}
              aria-controls={this.getElementId(this.tabPanel, index)}
              aria-disabled={this.tabHasStatus(tab, Status.DISABLED)}
              onClick={this.handleClick}
              onKeyDown={this.handleKeydown}
              data-index={this.getTabItemIndex(index)}
            >
              {tab.icon !== undefined && <mg-icon icon={tab.icon}></mg-icon>}
              {tab.label}
              {tab.badge !== undefined && <mg-badge variant="text-color" value={tab.badge.value} label={tab.badge.label} outline={tab.badge.role === 'information'}></mg-badge>}
            </button>
          ))}
        </header>
        {this.tabs.map((tab, index) => (
          <article
            key={tab.label}
            role="tabpanel"
            id={this.getElementId(this.tabPanel, index)}
            hidden={!this.tabHasStatus(tab, Status.ACTIVE)}
            aria-labelledby={this.getElementId(this.identifier, index)}
            tabindex={this.tabHasStatus(tab, Status.ACTIVE) ? 0 : -1}
            class="mg-c-tabs__content-container"
          >
            <slot name={this.getElementId('tab_content', index)}></slot>
          </article>
        ))}
      </div>
    );
  }
}
