import { Component, Event, h, Prop, EventEmitter, State, Element, Method, Watch } from '@stencil/core';
import { allItemsAreString, ClassList, getObjectValueFromKey, isValidString, nextTick, Page, Paginate, Cursor, type CursorType, toString } from '@mgdis/stencil-helpers';
import { type ActionType, type ItemType, type RequestMappingType, type ResponsMappingType } from './mg-input-combobox.conf';
import { type TooltipPosition, type Width, type EventType, widths, classReadonly, classDisabled } from '../mg-input/mg-input.conf';
import { initLocales } from '../../../../locales';
import { Keys } from '../../../../utils/events.utils';

/**
 * Check if object is an item
 * @param item - object to check
 * @returns True if object is an item
 */
const isItem = (item: unknown): item is ItemType => item && typeof item === 'object' && typeof (item as ItemType).title === 'string' && (item as ItemType).value !== undefined;

/**
 * Check if objects are items
 * @param items - items to check
 * @returns True if objects are items
 */
const isItems = (items: unknown[]): items is ItemType[] => Array.isArray(items) && items.every(isItem);

/**
 * Check if object is valid combobox fetchmappings
 * @param value - to validate
 * @returns truthy if mapping is valid
 */
const isFetchmappings = (value: unknown): value is MgInputCombobox['fetchmappings'] => {
  const isValidRoot = typeof value === 'object' && Object.hasOwn(value, 'request') && !Object.hasOwn(value, 'response');
  if (isValidRoot) {
    const { request, response } = value as MgInputCombobox['fetchmappings'];
    const isValidRequest = typeof request === 'object' && typeof request.filter === 'string';
    const isValidResponse =
      typeof response === 'object' &&
      typeof response.total === 'string' &&
      typeof response.items === 'string' &&
      typeof response.next === 'string' &&
      typeof response.itemTitle === 'string' &&
      typeof response.itemValue === 'string';
    return isValidRequest && isValidResponse;
  } else {
    return !isValidRoot;
  }
};

/**
 * Map new URL from old url
 * @param newValue - new URL value
 * @param oldValue - previous URL value
 * @returns updated url
 */
const mapUrl = (newValue: string, oldValue: string): string => {
  if (!newValue) return;
  else if (URL.canParse(newValue)) {
    return newValue;
  }

  // build new URL
  const params = newValue.split('?').pop();
  if (params) {
    const { origin, pathname } = new URL(oldValue);
    return `${origin}${pathname}?${params}`;
  } else {
    throw new Error("Cannot parse 'newValue' url");
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
  private popoverId: string;

  // Locales
  private messages;

  // hasDisplayedError (triggered by blur event)
  private hasDisplayedError = false;

  private handlerInProgress: EventType;

  private page: Page<ItemType>;

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
  @Prop({ mutable: true, reflect: true }) value: string | ItemType;
  @Watch('value')
  watchValue(newValue: string): void {
    this.filter = this.getValueTitle();
    this.valueChange.emit(newValue);
  }

  /**
   * Define components items
   */
  @Prop() items: (string | ItemType)[];
  @Watch('items')
  watchItems(newValue: MgInputCombobox['items']) {
    if (this.fetchurl && newValue) {
      throw new Error(`<mg-input-combobox> prop "items" values cannot be use with "fetchurl" prop defined. Passed value: ${toString(newValue)}.`);
    }
    // Empty options
    else if (Array.isArray(newValue) && newValue.length === 0) {
      this.options = new Paginate([]);
    }
    // String array
    else if (allItemsAreString(newValue)) {
      this.options = new Paginate(newValue.map(item => ({ title: item, value: item })));
    }
    // Object array
    else if (isItems(newValue)) {
      this.options = new Paginate(newValue);
    } else {
      throw new Error(`<mg-input-combobox> prop "items" values must be the same type, string or ItemType. Passed value: ${toString(newValue)}.`);
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
    if (newValue) {
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
  @Prop() labelOnTop?: boolean;

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
    if (newValue) this.classCollection.add(classDisabled);
    else this.classCollection.delete(classDisabled);
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
   * Define input valid state
   */
  @Prop({ mutable: true }) valid: boolean;

  /**
   * Define input invalid state
   */
  @Prop({ mutable: true }) invalid: boolean;

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
    if (typeof newValue !== 'string' || !URL.canParse(newValue)) {
      throw new Error(`<mg-input-combobox> prop "fetchurl" value must be URL or string. Passed value: ${toString(newValue)}.`);
    }
  }

  /**
   * Define fetch options object
   * Require `fetchurl` prop to be defined otherwith it will be ignored if defined
   * @description https://developer.mozilla.org/en-US/docs/Web/API/RequestInit
   * @example
   * ```
   * {
   *   headers: {
   *      authorization: 'my-token'
   *   },
   * }
   */
  @Prop() fetchoptions?: RequestInit;
  @Watch('fetchoptions')
  watchFetchOptions(newValue: MgInputCombobox['fetchoptions']): void {
    if (this.fetchurl && newValue) {
      try {
        // test if newValue is a valid RequestInit from the Request constuctor
        new Request(this.fetchurl, newValue);
      } catch {
        throw new Error(`<mg-input-combobox> prop "fetchmappings" value must be RequestInit. Passed value: ${toString(newValue)}.`);
      }
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
  @Prop() fetchmappings?: { request: RequestMappingType; response: ResponsMappingType };
  @Watch('fetchmappings')
  watchFetchMappings(newValue: MgInputCombobox['fetchmappings']): void {
    if (this.fetchurl && !newValue) {
      throw new Error(`<mg-input-combobox> prop "fetchmappings" is required with "fetchurl" prop.`);
    } else if (newValue && !isFetchmappings(newValue)) {
      throw new Error(`<mg-input-combobox> prop "fetchmappings" value must be { request: RequestMappingType, response: ResponsMappingType }. Passed value: ${toString(newValue)}.`);
    }
  }

  /**
   * Define if items are loading
   */
  @State() isLoading: boolean;

  /**
   * Formated items for display
   */
  @State() options: Paginate<ItemType> = new Paginate([]);
  @Watch('options')
  watchOptions(newValue: Paginate<ItemType>): void {
    this.page = newValue.getPage(0, this.filter ? this.optionsFilter : undefined);
  }

  /**
   * Active option
   */
  @State() option: ItemType;

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
  @State() classCollection: ClassList = new ClassList(['mg-c-input--combobox', 'mg-c-input--has-icon']);

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
    // ensure visual focus is always clear on focus
    this.option = null;
    // scroll after option reset
    if (!this.popoverDisplay) this.scrollToIndex(0);
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
        // Sets the value to the content of the focused option in the listbox.
        if (this.popoverDisplay) this.setValue(this.page.total ? this.option : null);
        // Sets visual focus on the textbox.
        this.option = null;
        // Closes the popover.
        this.popoverDisplay = false;
        break;

      case Keys.DOWN:
      case Keys.ARROWDOWN:
      case Keys.UP:
      case Keys.ARROWUP:
        guard = true;
        if (this.isLoading || !this.page.total) break;

        if (Boolean(event.altKey) && [Keys.DOWN, Keys.ARROWDOWN].includes(event.key)) {
          // Opens the popover without moving focus or changing selection.
          this.popoverDisplay = true;
          break;
        }

        // define cursor
        let cursor: CursorType;
        const isNavigationStart = this.popoverDisplay && this.option;
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
        if (!this.option) break;
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
        if (index) this.input.setSelectionRange(index, index);
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
   * Handle load-more <mg-button> `click`
   */
  private handleLoadMoreButton = (): void => {
    this.loadingWrapper({ name: 'load-more' });
  };

  /**
   * Scroll to next option from cursor
   * @param index - targeted option index to scroll into
   */
  private scrollToIndex = (index: number = 0): void => {
    this.element.shadowRoot.querySelector(`li:nth-of-type(${index + this.page.baseIndex})`)?.scrollIntoView();
  };

  /**
   * Set value prop
   * @param newValue - slected option item
   */
  private setValue(newValue: MgInputCombobox['option'] | null): void {
    if (isItem(newValue)) {
      this.value = allItemsAreString(this.options.items) ? newValue.title : { ...newValue };
    } else {
      this.value = newValue;
    }
  }

  /**
   * get value prop title
   * @returns value title
   */
  private getValueTitle = (): ItemType['title'] => {
    if (this.value && isItem(this.value)) return this.value.title;
    else if (typeof this.value === 'string') return this.value;
    else return null;
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
  private optionsFilter = (option): boolean => (this.input?.value ? option.title.toLocaleLowerCase().includes((this.filter || this.getValueTitle())?.toLocaleLowerCase()) : true);

  /**
   * Loading wrapper with a given action
   * @param action - wrapped loading action
   */
  private loadingWrapper = (action: ActionType): void => {
    // wait for new element render and update scroll position
    // set component loading
    this.isLoading = true;

    let promise;
    // when action require a loadMore we fetch the API else we report action to next tick
    // Set "load more" if action match OR if next item not available in the current page
    if (action.name === 'scroll' && !this.fetchurl) {
      promise = nextTick;
    } else if (
      action.name === 'load-more' ||
      (action.cursor === Cursor.NEXT &&
        this.page.items.findIndex(option => option.value.toString() === this.option.value.toString()) + this.page.baseIndex >= this.page.items.length)
    ) {
      promise = this.goToNextPage;
    } else {
      promise = this.updatePage;
    }

    promise()
      .then(() => {
        let index: number;
        // parse full items list from options
        const options = this.options.items.filter(this.optionsFilter);
        if (action.name === 'scroll') {
          // update visual focus for keyboard nagivation
          index = this.page.getIndexFromCursor(action.cursor, this.option);
          // update scroll position
          this.option = options[index];
        } else {
          // update next index for nagivation
          index = this.page.getIndexFromCursor(Cursor.LAST) - this.page.top;
        }

        this.scrollToIndex(index);
      })
      .finally(() => {
        // reset loading after next render
        setTimeout(() => {
          this.isLoading = false;
        });
      });
  };

  /**
   * Go to next page
   * @returns promise
   */
  private goToNextPage = (): Promise<void> => {
    this.loadMore.emit();
    if (this.fetchurl) {
      return this.getOptions(typeof this.page.next === 'string' ? this.page.next : undefined).then(nextPage => {
        if (!nextPage) return;
        this.page = new Page({
          ...nextPage,
          items: [...this.page.items, ...nextPage.items],
        });
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
    if (this.fetchurl) {
      return this.getOptions().then(page => {
        this.options = new Paginate(page.items, { total: page.total, next: page.next });
        this.page = this.options.getPage();
      });
    } else {
      this.page = this.options.getPage(0, this.optionsFilter);
    }
  };

  /**
   * Fetch request
   * @param url - to fetch
   */
  private getOptions = async (url = this.fetchurl): Promise<Pick<Page<ItemType>, 'items' | 'top'> & Partial<Page<ItemType>>> => {
    // add text filter
    const updateUrl = (typeof url === 'string' ? url : url.toString()).replaceAll(this.fetchmappings.request.filter, encodeURIComponent(this.filter));

    try {
      const response = await fetch(updateUrl, this.fetchoptions).then(response => response.json());
      const items = getObjectValueFromKey<Response, ItemType[]>(response, this.fetchmappings.response.items).map(
        (item): ItemType => ({
          title: getObjectValueFromKey<unknown, ItemType['title']>(item, this.fetchmappings.response.itemTitle),
          value: getObjectValueFromKey<unknown, ItemType['value']>(item, this.fetchmappings.response.itemValue),
        }),
      );
      const total = getObjectValueFromKey<Response, number>(response, this.fetchmappings.response.total);
      const next = mapUrl(getObjectValueFromKey<Response, string>(response, this.fetchmappings.response.next), this.fetchurl.toString());
      return { items, total, next, top: this.page?.top };
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
    if (this.fetchurl) {
      this.watchFetchUrl(this.fetchurl);
      this.watchFetchOptions(this.fetchoptions);
      this.watchFetchMappings(this.fetchmappings);
      this.loadingWrapper({ name: 'load-data' });
    } else {
      this.watchItems(this.items);
    }
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
   * Add event listener
   */
  componentDidLoad(): void {
    this.element.shadowRoot.addEventListener('focusin', (event: FocusEvent & { target: HTMLElement }) => {
      if (!event.target.closest('mg-popover')) this.popoverDisplay = false;
    });
  }

  /**
   * Render
   * @returns HTML Element
   */
  render(): HTMLElement {
    const listId = `${this.identifier}-list`;
    const readonlyValue = this.getValueTitle();
    const withResetButton = this.value && !this.disabled;

    let classes = this.classCollection.classes;
    if (withResetButton) classes = [...this.classCollection.classes, 'mg-c-input--input-append'];

    let popoverContent: 'list' | 'notfound' | 'notavailable';
    if (this.page?.items.length) popoverContent = 'list';
    else if (!this.page?.items.length && this.filter) popoverContent = 'notfound';
    else if (!this.page?.items.length) popoverContent = 'notavailable';

    return (
      <mg-input
        label={this.label}
        identifier={this.identifier}
        class={classes.join(' ')}
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
              '--mg-c-input-list-width': this.input?.offsetWidth && this.mgWidth === 'full' ? `${this.input.offsetWidth}px` : undefined,
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
                autoComplete={'false'}
                aria-autocomplete="list"
                aria-expanded={this.popoverDisplay.toString()}
                aria-controls={listId}
                aria-invalid={(this.invalid === true).toString()}
                aria-activedescendant={this.option?.value ? this.option?.value : typeof this.value === 'string' ? this.value : this.value?.value}
                onInput={this.handleFilterInput}
                onBlur={this.handleFilterBlur}
                onFocus={this.handleFilterFocus}
                onKeyDown={this.handleFilterKeydown}
                ref={(el: HTMLInputElement) => {
                  if (el !== null) this.input = el;
                }}
              />
              {withResetButton && (
                <mg-button
                  class="mg-c-input__box-append"
                  variant="flat"
                  is-icon
                  label={this.messages.general.reset}
                  aria-expanded={this.popoverDisplay.toString()}
                  aria-controls={listId}
                  onClick={this.handleResetButton}
                >
                  <mg-icon icon="cross"></mg-icon>
                </mg-button>
              )}
              <mg-button variant="secondary" is-icon label={this.itemsLabel} tabindex="-1" disabled={this.disabled}>
                <mg-icon icon={`chevron-${this.popoverDisplay ? 'up' : 'down'}`}></mg-icon>
              </mg-button>
            </div>
            <div slot="content" class="mg-c-input__popover-container">
              {popoverContent === 'list' && [
                // eslint-disable-next-line jsx-a11y/role-supports-aria-props
                <ul key="list" class="mg-c-input__input-list" role="listbox" id={listId} aria-label={this.itemsLabel} aria-setsize={this.page.total}>
                  {this.page.items.map(option => {
                    const isSelected = (isItem(this.value) ? this.value.value : this.value) === option.value;
                    return (
                      // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                      <li
                        role="option"
                        class={{
                          'mg-c-input__input-list-item': true,
                          'mg-c-input__input-list-item--focus-visible': this.option === option,
                          'mg-c-input__input-list-item--selected': isSelected,
                        }}
                        key={option.title}
                        id={option.value.toString()}
                        aria-selected={isSelected.toString()}
                        onClick={this.handleOptionClick}
                      >
                        {option.title}
                        {isSelected && <mg-icon icon="check"></mg-icon>}
                      </li>
                    );
                  })}
                </ul>,
                this.isLoading && <mg-loader key="loader" message={this.messages.input.combobox.search} class={{ 'mg-u-visually-hidden': Boolean(this.page.next) }}></mg-loader>,
                this.page.next && (
                  <mg-button
                    key="load-more"
                    variant="secondary"
                    class="mg-c-input__load-more"
                    tabIndex={-1}
                    disabled={this.isLoading}
                    fullWidth
                    disableOnClick
                    onClick={this.handleLoadMoreButton}
                    aria-controls={listId}
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
