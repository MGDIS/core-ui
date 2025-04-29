import { Component, Event, h, Prop, EventEmitter, State, Element, Method, Watch } from '@stencil/core';
import { allItemsAreString, ClassList, getObjectValueFromKey, isValidString, nextTick, Page, Paginate, Cursor, type CursorType, toString, isObject } from '@mgdis/stencil-helpers';
import { type ActionType, type RequestMappingType, type ResponseMappingType } from './mg-input-combobox.conf';
import { type TooltipPosition, type Width, type EventType, widths, classReadonly, classDisabled } from '../mg-input/mg-input.conf';
import type { Option } from '../../../../types';
import { initLocales } from '../../../../locales';
import { Keys } from '../../../../utils/events.utils';

/**
 * Check if object is an item
 * @param item - object to check
 * @returns True if object is an item
 */
const isItem = (item: unknown): item is Option => item && typeof item === 'object' && typeof (item as Option).title === 'string' && (item as Option).value !== undefined;

/**
 * Check if objects are items
 * @param items - items to check
 * @returns True if objects are items
 */
const isItems = (items: unknown[]): items is Option[] => Array.isArray(items) && items.every(isItem);

/**
 * Check if object is valid combobox fetchmappings
 * @param value - to validate
 * @returns truthy if mapping is valid
 */
const isFetchmappings = (value: unknown): value is MgInputCombobox['fetchmappings'] => {
  const isValidRoot = isObject<Record<string, unknown>>(value) && Object.hasOwn(value, 'request') && Object.hasOwn(value, 'response');
  if (isValidRoot) {
    const { request, response } = value as MgInputCombobox['fetchmappings'];
    if ([request, response].some(property => !isObject(property))) return false;
    const isValidRequest = typeof request.filter === 'string';
    const isValidResponse =
      typeof response === 'object' &&
      typeof response.total === 'string' &&
      typeof response.items === 'string' &&
      typeof response.next === 'string' &&
      typeof response.itemTitle === 'string' &&
      typeof response.itemValue === 'string';
    return isValidRequest && isValidResponse;
  } else {
    return isValidRoot;
  }
};

/**
 * Map new URL from old url
 * @param newValue - new URL value
 * @param oldValue - previous URL value
 * @returns updated url
 */
const mapUrl = (newValue: string, oldValue: string): string => {
  if (!Boolean(newValue)) return;
  else if (URL.canParse(newValue)) {
    return newValue;
  }

  // build new URL
  const params = newValue.includes('?') && newValue.split('?').pop();
  if (Boolean(params)) {
    const { origin, pathname } = new URL(oldValue);
    return `${origin}${pathname}?${params}`;
  } else {
    return newValue;
  }
};

@Component({
  tag: 'mg-input-combobox',
  styleUrl: '../../../../../node_modules/@mgdis/styles/dist/components/mg-input-combobox.css',
  shadow: true,
})
export class MgInputCombobox {
  /************
   * Internal *
   ************/

  // Classes
  private readonly classFocus = 'mg-u-is-focused';

  // HTML selector
  private input: HTMLInputElement;
  private loadMoreElement: HTMLMgButtonElement;
  private popoverId: string;

  // Locales
  private messages;

  // hasDisplayedError (triggered by blur event)
  private hasDisplayedError = false;

  private handlerInProgress: EventType;
  private loadingAction: ActionType['name'];

  private page: Page<Option>;

  /**************
   * Decorators *
   **************/

  /**
   * Get component DOM element
   */
  @Element() element: HTMLMgInputComboboxElement;

  /**
   * Define component value
   */
  @Prop({ mutable: true, reflect: true }) value: string | Option;
  @Watch('value')
  watchValue(newValue: MgInputCombobox['value']): void {
    this.filter = this.getValueTitle();
    this.valueChange.emit(newValue);
  }

  /**
   * Define components items
   */
  @Prop() items: (string | Option)[];
  @Watch('items')
  watchItems(newValue: MgInputCombobox['items']) {
    if (Boolean(this.fetchurl) && !Boolean(newValue)) {
      // skip newValue check
      return;
    } else if (Boolean(this.fetchurl) && Boolean(newValue)) {
      throw new Error(`<mg-input-combobox> prop "items" values cannot be use with "fetchurl" prop defined. Passed value: ${toString(newValue)}.`);
    }
    // Empty options
    else if (Array.isArray(newValue) && newValue.length === 0) {
      this.options = new Paginate([]);
    }
    // String array
    else if (allItemsAreString(newValue)) {
      this.options = new Paginate(
        newValue.map(item => ({ title: item, value: item })),
        { total: newValue.length },
      );
    }
    // Object array
    else if (isItems(newValue)) {
      this.options = new Paginate(newValue, { total: newValue.length });
    } else {
      throw new Error(`<mg-input-combobox> prop "items" values must be the same type, string or Option. Passed value: ${toString(newValue)}.`);
    }
  }

  /**
   * Define items label
   * Include short description. Required for accessibility.
   * @example
   * ```
   * Countries
   * ```
   */
  @Prop() itemsLabel!: string;

  /**
   * Identifier is used for the element ID (id is a reserved prop in Stencil.js)
   */
  @Prop() identifier!: string;
  @Watch('identifier')
  watchIdentifier(newValue: MgInputCombobox['identifier']): void {
    if (Boolean(newValue)) {
      this.popoverId = `${newValue}-popover`;
      this.element.dataset.mgPopoverGuard = this.popoverId;
    }
  }

  /**
   * Input name
   * If not set the value equals the identifier
   */
  @Prop() name: string = this.identifier;

  /**
   * Input label
   */
  @Prop() label!: string;

  /**
   * Define if label is displayed on top
   */
  @Prop() labelOnTop = false;

  /**
   * Define if label is visible
   */
  @Prop() labelHide = false;

  /**
   * Define input placeholder.
   * It should be a word or short phrase that demonstrates the expected type of data, not a replacement for labels or help combobox.
   */
  @Prop() placeholder?: string;

  /**
   * Define if input is required
   */
  @Prop() required = false;

  /**
   * Define if input is readonly
   */
  @Prop() readonly = false;
  @Watch('readonly')
  watchReadonly(newValue: MgInputCombobox['readonly']): void {
    if (newValue) this.classCollection.add(classReadonly);
    else this.classCollection.delete(classReadonly);
  }

  /**
   * Define if input is disabled
   */
  @Prop() disabled = false;
  @Watch('required')
  @Watch('readonly')
  @Watch('disabled')
  watchValidityChange(newValue: boolean, _oldValue: boolean, prop: string): void {
    if (this.input === undefined) return;
    this.input[prop] = newValue;
    this.checkValidity();
    if (this.hasDisplayedError) {
      this.setErrorMessage();
      this.hasDisplayedError = false;
    }
  }

  @Watch('disabled')
  watchDisabled(newValue: MgInputCombobox['disabled']): void {
    if (newValue) {
      this.classCollection.add(classDisabled);
    } else {
      this.classCollection.delete(classDisabled);
    }
  }

  /**
   * Define input width
   */
  @Prop() mgWidth: Width = 'full';
  @Watch('mgWidth')
  watchMgWidth(newValue: MgInputCombobox['mgWidth']): void {
    // reset width class
    widths.forEach(width => {
      this.classCollection.delete(`mg-c-input--width-${width}`);
    });

    // apply new width
    if (newValue !== undefined) this.classCollection.add(`mg-c-input--width-${this.mgWidth}`);
    this.classCollection = new ClassList(this.classCollection.classes);
  }

  /**
   * Add a tooltip message next to the input
   */
  @Prop() tooltip?: string;

  /**
   * Define tooltip position
   */
  @Prop() tooltipPosition: TooltipPosition = 'input';

  /**
   * Add a help text under the input, usually expected data format and example
   */
  @Prop() helpText?: string;

  /**
   * Define API url to fetch
   * @example
   * ```
   * {
   *   url: "http://myapi.com?$select='href,name'&my-custom-param='my-custom-value'", // url to fetch
   * }
   * ```
   */
  @Prop() fetchurl?: string | URL;
  @Watch('fetchurl')
  watchFetchUrl(newValue: MgInputCombobox['fetchurl']): void {
    if (newValue && !URL.canParse(newValue)) {
      throw new Error(`<mg-input-combobox> prop "fetchurl" value must be URL or string. Passed value: ${toString(newValue)}.`);
    }
  }

  /**
   * Define fetch options object
   * Require `fetchurl` prop to be defined otherwith it will be ignored if defined
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/RequestInit}
   * @example JSON headers:
   * ```json
   * {
   *   "headers": {
   *      "authorization": "my-token"
   *   }
   * }
   * ```
   */
  @Prop() fetchoptions?: RequestInit;
  @Watch('fetchoptions')
  watchFetchOptions(newValue: MgInputCombobox['fetchoptions']): void {
    if (this.fetchurl && newValue && !isObject(newValue)) {
      throw new Error(`<mg-input-combobox> prop "fetchoptions" value must be a valid RequestInit. Passed value: ${toString(newValue)}.`);
    } else {
      new Request(this.fetchurl, newValue);
    }
  }

  /**
   * Define fetch request mappings.
   * Required with `fetchurl`
   * @example
   * ```
   * {
   *  request: {
   *     filter: 'name', // `filter` key
   *   },
   *   response: {
   *     total: 'body.data.total', // response object mapping to get `total` value
   *     items: 'body.data.results' // response object mapping to get `items` value
   *     next: 'body.next' // response object mapping to get `next` items
   *     itemTitle: 'name', // item property to map on item['title']
   *     itemValue: 'href', // item property to map on item['value']
   *   }
   * }
   * ```
   */
  @Prop() fetchmappings?: { request: RequestMappingType; response: ResponseMappingType };
  @Watch('fetchmappings')
  watchFetchMappings(newValue: MgInputCombobox['fetchmappings']): void {
    if (Boolean(this.fetchurl) && !Boolean(newValue)) {
      throw new Error(`<mg-input-combobox> prop "fetchmappings" is required with "fetchurl" prop.`);
    } else if (Boolean(newValue) && !isFetchmappings(newValue)) {
      throw new Error(
        `<mg-input-combobox> prop "fetchmappings" value must be { request: RequestMappingType, response: ResponseMappingType }. Passed value: ${toString(newValue)}.`,
      );
    }
  }

  /**
   * Define input valid state
   */
  @Prop({ mutable: true }) valid: boolean;

  /**
   * Define input invalid state
   */
  @Prop({ mutable: true }) invalid: boolean;

  /**
   * Define if items are loading
   */
  @State() isLoading: boolean;

  /**
   * Formated items for display
   */
  @State() options: Paginate<Option> = new Paginate([]);
  @Watch('options')
  watchOptions(newValue: Paginate<Option>): void {
    this.page = newValue.getPage(0, Boolean(this.filter) ? this.optionsFilter : undefined);
  }

  /**
   * Active option
   */
  @State() option: Option;

  /**
   * Option filter
   */
  @State() filter: string = '';
  @Watch('filter')
  watchFilter(newValue: MgInputCombobox['filter']): void {
    this.loadingWrapper({ name: 'load-data' });
    this.filterChange.emit(newValue);
  }

  /**
   * Component classes
   */
  @State() classCollection: ClassList = new ClassList(['mg-c-input--combobox', 'mg-c-input--has-icon', 'mg-c-input--input-append']);

  /**
   * Error message to display
   */
  @State() errorMessage: string;

  /**
   * Popover display state
   */
  @State() popoverDisplay = false;
  @Watch('popoverDisplay')
  watchPopoverDisplay(newValue: MgInputCombobox['popoverDisplay']): void {
    if (newValue) {
      this.classCollection.add(this.classFocus);
      this.input.focus();
      this.scrollToIndex(0);
    } else {
      // remove visual focus
      this.option = null;
      // reset filter with value
      this.filter = this.getValueTitle();
      this.classCollection.delete(this.classFocus);
      this.handlerInProgress = 'blur';
      this.displayError().finally(() => {
        // reset guard
        this.handlerInProgress = undefined;
      });
    }
  }

  /**
   * Emited event when value change
   */
  @Event({ eventName: 'value-change' }) valueChange: EventEmitter<HTMLMgInputComboboxElement['value']>;

  /**
   * Emited event when filter change
   */
  @Event({ eventName: 'filter-change' }) filterChange: EventEmitter<string>;

  /**
   * Emited event when `load-more` is called
   */
  @Event({ eventName: 'load-more' }) loadMore: EventEmitter<void>;

  /**
   * Emited event when checking validity
   */
  @Event({ eventName: 'input-valid' }) inputValid: EventEmitter<HTMLMgInputComboboxElement['valid']>;

  /**
   * Public method to play input focus
   */
  @Method()
  async setFocus(): Promise<void> {
    this.input.focus();
  }

  /**
   * Display input error if it exists.
   */
  @Method()
  displayError(): Promise<void> {
    // Use `Promise` as requested for stencil method
    // Use `requestAnimationFrame` to ensure:
    // - DOM is fully updated before validation
    // - Async operations are completed
    // - No timing issues with Stencil's render cycle
    // - Keep everything in sync both inside and outside the component
    return new Promise(resolve => {
      requestAnimationFrame(() => {
        this.checkValidity();
        this.setErrorMessage();
        this.hasDisplayedError = this.invalid;
        resolve();
      });
    });
  }

  /**
   * Set an error and display a custom error message.
   * This method can be used to set the component's error state from its concombobox by passing a boolean value to the `valid` parameter.
   * It must be paired with an error message to display for the given concombobox.
   * When used to set validity to `false`, you should use this method again to reset the validity to `true`.
   * @param valid - value indicating the validity
   * @param errorMessage - the error message to display
   */
  @Method()
  async setError(valid: MgInputCombobox['valid'], errorMessage: string): Promise<void> {
    if (typeof valid !== 'boolean') {
      throw new Error('<mg-input-combobox> method "setError()" param "valid" must be a boolean.');
    } else if (!isValidString(errorMessage)) {
      throw new Error('<mg-input-combobox> method "setError()" param "errorMessage" must be a string.');
    } else {
      this.setValidity(valid);
      this.setErrorMessage(valid ? undefined : errorMessage);
      this.hasDisplayedError = this.invalid;
    }
  }

  /**
   * Reset value, validity and error state
   */
  @Method()
  async reset(): Promise<void> {
    if (this.readonly) return;
    this.setValue(null);
    this.option = null;
    this.filter = '';
    this.checkValidity();
    this.errorMessage = undefined;
    this.hasDisplayedError = false;
  }

  /**
   * Handle `click` event on option
   * @param event - option element click event
   */
  private handleOptionClick = (event: MouseEvent & { target: HTMLLIElement }) => {
    this.setValue(this.options.items.find(option => option.value === event.target.id));
    this.popoverDisplay = false;
  };

  /**
   * Handle `click` event on reset button
   * @param event - click event
   */
  private handleResetButton = (event: MouseEvent): void => {
    event.stopPropagation();
    this.reset().then(() => {
      this.input.focus();
    });
  };

  /**
   * Handle `display-change` event on mg-popover
   */
  private handlePopoverDisplay = (event: CustomEvent): void => {
    this.popoverDisplay = event.detail;
  };

  /**
   * Handle input event
   */
  private handleFilterInput = (): void => {
    this.checkValidity();
    if (this.hasDisplayedError) this.setErrorMessage();
    if (!this.popoverDisplay) this.popoverDisplay = true;
    this.filter = this.input.value;
  };

  /**
   * Handle `blur` event
   */
  private handleFilterBlur = (): void => {
    // skip process if popover is displayed
    if (this.popoverDisplay) return;

    // Display Error
    this.handlerInProgress = 'blur';
    this.displayError().finally(() => {
      // reset guard
      this.handlerInProgress = undefined;
    });
  };

  /**
   * Handle `focus` event
   */
  private handleFilterFocus = (): void => {
    // ensure visual focus is always clear on focus when component isn't in loading state
    if (!this.isLoading) {
      this.option = null;
    }
  };

  /**
   * Handle load-more <mg-button> `click`
   */
  private handleLoadMoreButton = (): void => {
    this.loadingWrapper({ name: 'load-more', cursor: Cursor.NEXT }).then(() => {
      this.input.focus();
    });
  };

  /**
   * Handle `keypress` event
   * @param event - keyboard event
   */
  private handleFilterKeydown = (event: KeyboardEvent): void => {
    if (this.disabled || event.ctrlKey || event.shiftKey) return;

    let guard = false;

    // override keys actions
    switch (event.key) {
      case Keys.TAB:
      case Keys.ENTER:
        guard = event.key === Keys.ENTER;
        const option = this.option || this.options.items.find(this.isCurrentOption);
        // Sets the value to the content of the focused option in the listbox.
        if (this.popoverDisplay) this.setValue(this.page.total > 0 ? option : null);
        // Closes the popover.
        this.popoverDisplay = false;
        break;

      case Keys.DOWN:
      case Keys.ARROWDOWN:
      case Keys.UP:
      case Keys.ARROWUP:
        guard = true;
        if (this.isLoading || !(this.page.total > 0)) {
          this.popoverDisplay = true;
          break;
        }

        if (Boolean(event.altKey) && [Keys.DOWN, Keys.ARROWDOWN].includes(event.key)) {
          // Opens the popover without moving focus or changing selection.
          this.popoverDisplay = true;
          break;
        }

        // define cursor
        let cursor: CursorType;
        const isNavigationStart = this.popoverDisplay && isItem(this.option);
        if ([Keys.DOWN, Keys.ARROWDOWN].includes(event.key)) {
          // If the filter is not empty and the popover is displayed, moves visual focus to the first suggested value.
          // If the filter is empty and the popover is not displayed, opens the popover and moves visual focus to the first option.
          // Moves visual focus to the next option.
          // If visual focus is on the last option, moves visual focus to the first option.
          cursor = isNavigationStart ? Cursor.NEXT : Cursor.FIRST;
        } else if ([Keys.UP, Keys.ARROWUP].includes(event.key)) {
          // If the filter is not empty and the popover is displayed, moves visual focus to the last suggested value.
          // If the filter is empty, first opens the popover if it is not already displayed and then moves visual focus to the last option.
          // Moves visual focus to the previous option.
          // If visual focus is on the first option, moves visual focus to the last option.
          cursor = isNavigationStart ? Cursor.PREVIOUS : Cursor.LAST;
        }

        // update scroll and visual focused option in wrapper
        this.loadingWrapper({ name: 'scroll', cursor });

        // open popover
        this.popoverDisplay = true;
        break;

      case Keys.LEFT:
      case Keys.ARROWLEFT:
      case Keys.HOME:
      case Keys.RIGHT:
      case Keys.ARROWRIGHT:
      case Keys.END:
        // skip process if visual focus is not in popover
        if (!isItem(this.option)) break;
        guard = true;

        // Remove visual focus from popover options
        this.option = null;

        let index;
        if (Keys.HOME === event.key) {
          // Moves visual focus to the textbox and places the editing cursor at the beginning of the field.
          index = 0;
        } else if (Keys.END === event.key) {
          // Moves visual focus to the textbox and places the editing cursor at the end of the field.
          index = this.filter.length;
        }
        if (typeof index === 'number') {
          this.input.setSelectionRange(index, index);
        }
        break;

      case Keys.ESC:
      case Keys.ESCAPE:
        guard = true;

        if (this.popoverDisplay) {
          // If the popover is displayed, closes it.
          this.popoverDisplay = false;
        } else {
          // If the popover is not displayed, clears the filter.
          this.setValue(null);
          this.filter = '';
          // Sets visual focus on the textbox.
          this.option = null;
        }
        break;

      default:
        // Remove visual focus from popover options
        this.option = null;
        break;
    }

    if (guard) {
      event.stopPropagation();
      event.preventDefault();
    }
  };

  /**
   * Scroll to next option from cursor
   * @param index - targeted option index to scroll into
   */
  private scrollToIndex = (index: number): void => {
    this.element.shadowRoot.querySelector(`li:nth-of-type(${(index || 0) + this.page.baseIndex})`)?.scrollIntoView();
  };

  /**
   * Is option the current value
   * @param option - option to match with
   * @returns true if option is the current value
   */
  private isCurrentOption = (option: Option) => (isItem(this.value) ? this.value.value : this.value) === option.value;

  /**
   * Set value prop
   * @param newValue - slected option item
   */
  private setValue(newValue: MgInputCombobox['option'] | null): void {
    if (!isItem(newValue)) {
      this.value = '';
    } else {
      this.value = allItemsAreString(this.items || this.options.items) ? newValue.title : { ...newValue };
    }
  }

  /**
   * get value prop title
   * @returns value title
   */
  private getValueTitle = (): Option['title'] => {
    if (this.value && isItem(this.value)) return this.value.title;
    else if (typeof this.value === 'string') return this.value;
    else return '';
  };

  /**
   * Method to set validity values
   * @param newValue - valid new value
   */
  private setValidity(newValue: MgInputCombobox['valid']) {
    const oldValidValue = this.valid;
    this.valid = newValue;
    this.invalid = !this.valid;
    // We need to send valid event even if it is the same value
    if (this.handlerInProgress === undefined || (this.handlerInProgress === 'blur' && this.valid !== oldValidValue)) this.inputValid.emit(this.valid);
  }

  /**
   * Check if input is valid
   */
  private checkValidity = (): void => {
    this.setValidity(this.readonly || this.disabled || this.input.checkValidity());
  };

  /**
   * Set input error message
   * @param errorMessage - errorMessage override
   */
  private setErrorMessage = (errorMessage?: string): void => {
    // Set error message
    this.errorMessage = undefined;
    // Does have a custom error message
    if (!this.valid && errorMessage !== undefined) {
      this.errorMessage = errorMessage;
    }
    // required
    else if (!this.valid && this.input.validity.valueMissing) {
      this.errorMessage = this.messages.errors.required;
    }
  };

  /**
   * Get filtered options from `filter` input value
   * @returns filtered options
   */
  private optionsFilter = (option): boolean => (this.filter === '' ? true : option.title.toLocaleLowerCase().includes(this.filter.toLocaleLowerCase()));

  /**
   * Loading wrapper with a given action
   * @param action - wrapped loading action
   * @returns promisified action
   */
  private loadingWrapper = (action: ActionType): Promise<void> => {
    let promise;
    let index: number;

    // cache initial loading action if not defined
    if (!Boolean(this.loadingAction)) {
      this.loadingAction = action.name;
    }

    // update index
    if (Boolean(this.option) && this.loadingAction !== 'load-more') {
      index = this.page.items.findIndex(option => option.value.toString() === this.option.value.toString());
    } else if (this.loadingAction === 'load-more') {
      index = this.page.items.length - this.page.baseIndex;
    }
    // when action require a loadMore we fetch the API else we report action to next tick
    // Set "load more" if action match OR if next item not available in the current page
    if (action.name === 'load-more') {
      // wait for new element render and update scroll position
      // set component loading
      this.isLoading = true;
      promise = this.goToNextPage;
    } else if (
      action.cursor === Cursor.NEXT &&
      this.page.items.length <= this.page.total &&
      index + this.page.baseIndex === this.page.items.length &&
      index + this.page.baseIndex < this.page.total
    ) {
      // trigger load-more from button to benefit from `disabled-on-click`
      this.loadMoreElement.click();
      return;
    } else if (action.name === 'scroll') {
      promise = nextTick;
    } else {
      promise = this.updatePage;
    }

    return promise()
      .then(() => {
        // parse full items list from options
        const options = this.options.items.filter(this.optionsFilter);

        // update visual focus
        if (action.name !== 'load-data') {
          index = this.page.getIndexFromCursor(action.cursor, this.loadingAction === 'load-more' && index >= 0 ? options[index] : this.option);
        }
        this.option = options[index];

        // update scroll position
        this.scrollToIndex(index);
      })
      .finally(() => {
        // reset loading after next render
        requestAnimationFrame(() => {
          this.isLoading = false;
          this.loadingAction = undefined;
        });
      });
  };

  /**
   * Go to next page
   * @returns promise
   */
  private goToNextPage = (): Promise<void> => {
    this.loadMore.emit();
    if (Boolean(this.fetchurl)) {
      return this.getOptions(typeof this.page.next === 'string' ? this.page.next : undefined).then(nextPage => {
        if (!Boolean(nextPage)) return;
        // merge items from current page and next page
        const items = [...this.page.items, ...nextPage.items];
        // create new options pagination withe merged items
        this.options = new Paginate(items, { total: nextPage.total, next: nextPage.next, top: items.length });
      });
    } else {
      return nextTick(() => {
        if (typeof this.page.next === 'function') {
          const nextPage = this.page.next();
          this.page = new Page({
            ...nextPage,
            items: [...this.page.items, ...nextPage.items],
          });
        }
      });
    }
  };

  /**
   * Go to next page
   * @returns promise
   */
  private updatePage = async (): Promise<void> => {
    if (Boolean(this.fetchurl)) {
      return this.getOptions().then(page => {
        if (!Boolean(page)) return;
        // reset current options pagination from API response
        this.options = new Paginate(page.items, { total: page.total, next: page.next, top: page.top });
      });
    } else {
      this.page = this.options.getPage(0, this.optionsFilter);
    }
  };

  /**
   * Fetch request
   * @param url - to fetch
   * @returns new page from url
   */
  private getOptions = async (url = this.fetchurl): Promise<Pick<Page<Option>, 'items' | 'top'> & Partial<Page<Option>>> => {
    // add text filter
    const updateUrl = (typeof url === 'string' ? url : url.toString()).replaceAll(this.fetchmappings.request.filter, encodeURIComponent(this.filter));

    try {
      const response = await fetch(updateUrl, this.fetchoptions).then(response => response.json());
      if (!response) return null;
      const items = getObjectValueFromKey<Response, Option[]>(response, this.fetchmappings.response.items).map(
        (item): Option => ({
          title: getObjectValueFromKey<unknown, Option['title']>(item, this.fetchmappings.response.itemTitle),
          value: getObjectValueFromKey<unknown, Option['value']>(item, this.fetchmappings.response.itemValue),
        }),
      );
      const total = Number(getObjectValueFromKey<Response, number>(response, this.fetchmappings.response.total, 0));
      const next = mapUrl(getObjectValueFromKey<Response, string>(response, this.fetchmappings.response.next), this.fetchurl.toString());
      return { items, total, next, top: items.length };
    } catch {}
  };

  /*************
   * Lifecycle *
   *************/

  /**
   * Check if component props are well configured on init
   * @returns timeout
   */
  componentWillLoad(): ReturnType<typeof setTimeout> {
    // Get locales
    this.messages = initLocales(this.element).messages;
    // Validate
    this.watchIdentifier(this.identifier);
    this.watchItems(this.items);
    if (Boolean(this.fetchurl)) {
      this.watchFetchUrl(this.fetchurl);
      this.watchFetchOptions(this.fetchoptions);
      this.watchFetchMappings(this.fetchmappings);
      this.loadingWrapper({ name: 'load-data' });
    }
    this.watchValue(this.value);
    this.watchOptions(this.options);
    this.watchMgWidth(this.mgWidth);
    this.watchReadonly(this.readonly);
    this.watchDisabled(this.disabled);
    // Check validity when component is ready
    // return a promise to process action only in the FIRST render().
    // https://stenciljs.com/docs/component-lifecycle#componentwillload
    return setTimeout(() => {
      this.checkValidity();
    }, 0);
  }

  /**
   * Render
   * @returns HTML Element
   */
  render(): HTMLElement {
    const listId = `${this.identifier}-list`;
    const readonlyValue = this.getValueTitle();
    const withResetButton = this.value && !this.disabled;

    let popoverContent: 'list' | 'notfound' | 'notavailable';
    if (this.page?.items.length > 0) popoverContent = 'list';
    else if (this.page?.items.length === 0 && Boolean(this.filter)) popoverContent = 'notfound';
    else if (this.page?.items.length === 0) popoverContent = 'notavailable';

    return (
      <mg-input
        label={this.label}
        identifier={this.identifier}
        class={this.classCollection.classes.join(' ')}
        ariaDescribedbyIDs={popoverContent && popoverContent !== 'list' ? [popoverContent] : []}
        labelOnTop={this.labelOnTop}
        labelHide={this.labelHide}
        required={this.required}
        tooltip={this.tooltip}
        tooltipPosition={this.readonly && this.value === undefined ? 'label' : this.tooltipPosition}
        helpText={this.helpText}
        errorMessage={this.errorMessage}
      >
        {this.readonly ? (
          readonlyValue && <b class="mg-c-input__readonly-value">{readonlyValue}</b>
        ) : (
          <mg-popover
            identifier={this.popoverId}
            placement="bottom-start"
            display={this.popoverDisplay}
            arrow-hide
            style={{
              '--mg-c-input-list-width': Boolean(this.input?.offsetWidth) ? `${this.input.offsetWidth}px` : undefined,
            }}
            data-fallback-placement="bottom-end"
            onDisplay-change={this.handlePopoverDisplay}
          >
            <div class="mg-c-input__input-group-container">
              <mg-icon icon="magnifying-glass"></mg-icon>
              <input
                type="text"
                role="combobox"
                class="mg-c-input__box mg-c-input__box--width"
                value={this.filter}
                id={this.identifier}
                name={this.name}
                placeholder={this.placeholder}
                title={this.placeholder}
                disabled={this.disabled}
                required={this.required}
                autocomplete="off"
                aria-autocomplete="list"
                aria-expanded={this.popoverDisplay.toString()}
                aria-controls={listId}
                aria-invalid={(this.invalid === true).toString()}
                aria-activedescendant={Boolean(this.option?.value) ? this.option.value : typeof this.value === 'string' ? this.value : this.value?.value}
                onInput={this.handleFilterInput}
                onBlur={this.handleFilterBlur}
                onFocus={this.handleFilterFocus}
                onKeyDown={this.handleFilterKeydown}
                ref={(el: HTMLInputElement) => {
                  if (el !== null) this.input = el;
                }}
              />
              {withResetButton ? (
                <mg-button
                  class="mg-c-input__box-append mg-c-input__reset"
                  variant="flat"
                  is-icon
                  label={this.messages.general.reset}
                  aria-controls={this.identifier}
                  tabindex="-1"
                  onClick={this.handleResetButton}
                >
                  <mg-icon icon="cross"></mg-icon>
                </mg-button>
              ) : (
                <mg-button class="mg-c-input__box-append" variant="flat" is-icon label={this.itemsLabel} tabindex="-1" disabled={this.disabled}>
                  <mg-icon icon={`chevron-${this.popoverDisplay ? 'up' : 'down'}`}></mg-icon>
                </mg-button>
              )}
            </div>
            <div slot="content" class="mg-c-input__popover-container">
              {popoverContent === 'list' && [
                // eslint-disable-next-line jsx-a11y/role-supports-aria-props
                <ul key="list" class="mg-c-input__input-list" role="listbox" id={listId} aria-label={this.itemsLabel} aria-setsize={this.page.total}>
                  {this.page.items.map(option => {
                    return (
                      // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                      <li
                        role="option"
                        class={{
                          'mg-c-input__input-list-item': true,
                          'mg-c-input__input-list-item--focus-visible': this.option === option,
                          'mg-c-input__input-list-item--selected': this.isCurrentOption(option),
                        }}
                        key={option.title}
                        id={option.value.toString()}
                        aria-selected={this.isCurrentOption(option).toString()}
                        onClick={this.handleOptionClick}
                      >
                        {option.title}
                        {this.isCurrentOption(option) && <mg-icon icon="check"></mg-icon>}
                      </li>
                    );
                  })}
                </ul>,
                this.isLoading && <mg-loader key="loader" message={this.messages.input.combobox.search} class={{ 'mg-u-visually-hidden': Boolean(this.page.next) }}></mg-loader>,
                this.page.next && (
                  <mg-button
                    key="load-more"
                    variant="flat"
                    class="mg-c-input__load-more"
                    tabIndex={-1}
                    disabled={this.isLoading}
                    full-width
                    disable-on-click
                    onClick={this.handleLoadMoreButton}
                    aria-controls={listId}
                    ref={(el: HTMLMgButtonElement) => {
                      if (el !== null) this.loadMoreElement = el;
                    }}
                  >
                    <mg-icon icon="chevron-down"></mg-icon>
                    {this.messages.input.combobox.loadMore}
                  </mg-button>
                ),
              ]}
              {popoverContent === 'notfound' && (
                <p id={popoverContent} class="mg-c-input__popover-info">
                  {this.messages.input.combobox.notFound}
                </p>
              )}
              {popoverContent === 'notavailable' && (
                <p id={popoverContent} class="mg-c-input__popover-info">
                  {this.messages.input.combobox.notAvailable}
                </p>
              )}
            </div>
          </mg-popover>
        )}
      </mg-input>
    );
  }
}
