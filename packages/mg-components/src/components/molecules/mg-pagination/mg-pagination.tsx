import { Component, Element, h, Prop, Watch, Event, EventEmitter, Host } from '@stencil/core';
import { createID, isValideID, isValidString, toString } from '@mgdis/core-ui-helpers/dist/utils';
import { NavigationAction, type PaginationMessagesType } from './mg-pagination.conf';
import { initLocales } from './../../../locales';

/**
 * Range generator
 *
 * ```
 * start by get the range length, add "+ 1" to include last value, ex: Math.ceil((3 + 1 - 1) / 1) => 3
 * then with Array(Math.ceil...) we get the final array with empty values, ex: Array(Math.ceil(2 + 1 - 1) / 1)) => [empty, empty, empty]
 * then with Array(Math.ceil...).keys() we get the Array Iterator from empty values
 * then with Array.from(Array(...)) we get the complete array with "index" values instead of "empty" values
 * ex: Array.from(Array(Math.ceil((2 + 1 - 1) / 1) || 1).keys()) => [0, 1, 2]
 * finaly we map values from "start" range and apply the "step" coefficiant,
 * ex: Array.from(Array(Math.ceil((2 + 1 - 1) / 1) || 1).keys()).map(x => 1 + x * 1) => [1, 2, 3]
 * ```
 *
 * range(1, 1) = [1]
 * range(1, 5) = [1, 2, 3, 4, 5]
 * range(10, 20, 2) = [10, 12, 14, 16, 18, 20]
 * @param start - start range
 * @param end - start end
 * @param step - step size
 * @returns range numbers
 */
const range = (start: number, end: number, step = 1): number[] => Array.from(Array(Math.ceil((end + 1 - start) / step)).keys()).map(x => start + x * step);

@Component({
  tag: 'mg-pagination',
  styleUrl: '../../../../node_modules/@mgdis/styles/dist/components/mg-pagination.css',
  shadow: true,
})
export class MgPagination {
  /************
   * Internal *
   ************/

  // Locales
  private localesMessages;

  /**************
   * Decorators *
   **************/

  /**
   * Get component DOM element
   */
  @Element() element: HTMLMgPaginationElement;

  /**
   * Identifier is used for the element ID (id is a reserved prop in Stencil.js)
   * If not set, it will be created.
   */
  @Prop() identifier: string = createID('mg-pagination');
  @Watch('identifier')
  watchIdentifier(newValue: MgPagination['identifier']): void {
    if (!isValideID(newValue)) {
      console.error(`<mg-pagination> prop "identifier" value is invalid. Passed value: ${toString(newValue)}.`);
    }
  }

  /**
   * Panignation label. Is a short description.
   * Customize default value can be usefull to improve accessibility
   */
  @Prop({ mutable: true }) label: string;

  /**
   * Hide navigation label
   */
  @Prop() hideNavigationLabels = false;

  /**
   * Hide select input
   */
  @Prop() hidePageCount = false;

  /**
   * Component total pages
   */
  @Prop() totalPages = 1;
  @Watch('totalPages')
  validateTotalPages(newValue: number): void {
    if (newValue < 1) {
      throw new Error(`<mg-pagination> prop "totalPages" must be greater than 0. Passed value: ${toString(newValue)}.`);
    }
  }

  /**
   * Component current page
   */
  @Prop({ reflect: true, mutable: true }) currentPage = 1;
  @Watch('currentPage')
  validateCurrentPage(newValue: number): void {
    if (newValue < 1) {
      throw new Error(`<mg-pagination> prop "currentPage" must be greater than 0. Passed value: ${toString(newValue)}.`);
    } else if (newValue > this.totalPages) {
      throw new Error('<mg-pagination> prop "currentPage" can not be greater than total page.');
    }
    this.currentPageChange.emit(newValue);
  }

  /**
   * Define locales messages overrides
   */
  @Prop() messages: PaginationMessagesType;
  @Watch('messages')
  watchPaginationMessages(newValue: MgPagination['messages']): void {
    if (Boolean(newValue) && (typeof newValue !== 'object' || !['next', 'previous', 'nextLabel', 'previousLabel'].every(key => isValidString(newValue[key])))) {
      throw new Error('<mg-pagination> prop "messages" must be a valid "PaginationMessagesType".');
    }
  }

  /**
   * Emmited event when current page change
   */
  @Event({ eventName: 'current-page-change' }) currentPageChange: EventEmitter<number>;

  /**
   * Change current page from target
   * @param target - target page
   */
  private goToPage = (target: number): void => {
    this.currentPage = target;
  };

  /************
   * Handlers *
   ************/

  /**
   * select handler
   * @param event - value change event
   */
  private handleSelect = (event: InputEvent & { target: HTMLInputElement }): void => {
    const to = Number(event.target.value);
    this.goToPage(to > 0 ? to : 1);
  };

  /**
   * Go to 'previous/next' page button handler
   * @param action - navigation action
   * @param disabled - button disable state
   */
  private handleGoToPage = (action: string, disabled: boolean): void => {
    !disabled && this.goToPage(action === NavigationAction.NEXT ? this.currentPage + 1 : this.currentPage - 1);
  };

  /*************
   * Lifecycle *
   *************/

  /**
   * Check if props are well configured on init
   */
  componentWillLoad(): void {
    // Get locales
    this.localesMessages = initLocales(this.element).messages;
    // Validate
    this.watchIdentifier(this.identifier);
    this.validateTotalPages(this.totalPages);
    this.validateCurrentPage(this.currentPage);
    this.watchPaginationMessages(this.messages);
    // Set default label
    if (this.label === undefined || this.label === '') {
      this.label = this.localesMessages.pagination.label;
    }
  }

  /**
   * Render
   * @returns HTML Element
   */
  render(): HTMLElement {
    const navigationMessages = {
      next: this.messages?.next ?? this.localesMessages.general.next,
      previous: this.messages?.previous ?? this.localesMessages.general.previous,
      nextLabel: this.messages?.nextLabel ?? this.localesMessages.pagination.nextLabel,
      previousLabel: this.messages?.previousLabel ?? this.localesMessages.pagination.previousLabel,
    };
    const navigationActionButton = (disabled: boolean, action: string) => {
      return (
        <mg-button
          label={navigationMessages[`${action}Label`]}
          // eslint-disable-next-line react/jsx-no-bind
          onClick={() => this.handleGoToPage(action, disabled)}
          disabled={disabled}
          variant="flat"
          isIcon={this.hideNavigationLabels}
        >
          {action === NavigationAction.PREVIOUS && <mg-icon icon="chevron-left"></mg-icon>}
          {!this.hideNavigationLabels && navigationMessages[action]}
          {action === NavigationAction.NEXT && <mg-icon icon="chevron-right"></mg-icon>}
        </mg-button>
      );
    };

    return (
      <Host hidden={this.totalPages < 2}>
        <nav role="navigation" aria-label={this.label} id={this.identifier} class={{ 'mg-c-pagination': true, 'mg-c-pagination--hide-page-count': this.hidePageCount }}>
          {navigationActionButton(this.currentPage <= 1, NavigationAction.PREVIOUS)}
          {!this.hidePageCount && (
            <div class="mg-c-pagination__page-count">
              <mg-input-select
                identifier={`${this.identifier}-select`}
                items={range(1, this.totalPages).map(page => page.toString())}
                label={this.localesMessages.pagination.selectPage}
                label-hide={true}
                on-value-change={this.handleSelect}
                value={this.currentPage.toString()}
                placeholder-hide
              ></mg-input-select>
              <span class="mg-u-visually-hidden">
                {this.localesMessages.pagination.page} {this.currentPage}
              </span>
              / {this.totalPages} {this.totalPages > 1 ? this.localesMessages.pagination.pages : this.localesMessages.pagination.page}
            </div>
          )}
          {navigationActionButton(this.currentPage >= this.totalPages, NavigationAction.NEXT)}
        </nav>
      </Host>
    );
  }
}
