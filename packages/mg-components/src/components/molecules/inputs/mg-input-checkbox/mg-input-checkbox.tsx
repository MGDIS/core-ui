/* eslint-disable jsx-a11y/no-redundant-roles */
import { Component, Element, Event, h, Prop, EventEmitter, State, Watch, Method } from '@stencil/core';
import { MgInput } from '../MgInput';
import { ClassList } from '../../../../utils/components.utils';
import { initLocales } from '../../../../locales';
import { CheckboxItem, CheckboxType, CheckboxValue, checkboxTypes, SearchValueType } from './mg-input-checkbox.conf';

/**
 * type CheckboxItem validation function
 * @param items - Checkbox item
 * @returns match item type
 */
const isCheckboxItems = (items: unknown): items is CheckboxItem[] =>
  Array.isArray(items) &&
  items.every(item => typeof item === 'object' && typeof item.title === 'string' && (item.value === null || typeof item.value === 'boolean') && item.value !== undefined);

@Component({
  tag: 'mg-input-checkbox',
  styleUrl: 'mg-input-checkbox.scss',
  shadow: true,
})
export class MgInputCheckbox {
  /************
   * Internal *
   ************/

  // HTML selector
  private inputs: HTMLInputElement[] = [];
  private mgPopover: HTMLMgPopoverElement;

  // Locales
  private messages;

  // hasDisplayedError (triggered by blur event)
  private hasDisplayedError = false;

  // style
  private baseClassName = 'mg-input--checkbox';

  private multiStart = 5;
  private searchStart = 10;
  private searchOffset = 10;

  /**************
   * Decorators *
   **************/

  /**
   * Get component DOM element
   */
  @Element() element: HTMLMgInputCheckboxElement;

  /**
   * Component value
   * If item.value is `null`, checkbox will be indeterminate by default
   */
  @Prop({ mutable: true }) value!: CheckboxValue[];
  @Watch('value')
  validateValue(newValue: MgInputCheckbox['value']): void {
    if (isCheckboxItems(newValue)) {
      this.checkboxItems = newValue.map((item, index) => ({
        id: `${this.identifier}_${index}`,
        title: item.title,
        value: item.value,
        disabled: item.disabled,
      }));
      this.valueChange.emit(newValue);
    } else {
      throw new Error('<mg-input-checkbox> prop "value" is required and all values must be the same type, CheckboxItem.');
    }
  }

  /**
   * Define checkbox type
   */
  @Prop({ mutable: true }) type: CheckboxType = checkboxTypes[0];
  @Watch('type')
  validateType(newValue: MgInputCheckbox['type']): void {
    if (!checkboxTypes.includes(newValue)) {
      throw new Error('<mg-input-checkbox> prop "type" must be a CheckboxType.');
    } else {
      const className = `${this.baseClassName}-multi`;
      if (newValue === 'multi') {
        this.classCollection.add(className);
        this.element.dataset.mgPopoverGuard = this.getMgPopoverIdentifier();
      } else this.classCollection.delete(className);
    }
  }

  /**
   * Identifier is used for the element ID (id is a reserved prop in Stencil.js)
   */
  @Prop() identifier!: string;

  /**
   * Input name
   * If not set the value equals the identifier
   */
  @Prop() name = this.identifier;

  /**
   * Input label
   */
  @Prop() label!: string;

  /**
   * Define if label is displayed on top
   */
  @Prop() labelOnTop: boolean;

  /**
   * Define if label is visible
   */
  @Prop() labelHide = false;

  /**
   * Define if inputs are display verticaly
   */
  @Prop() inputVerticalList = false;

  /**
   * Define if input is required
   */
  @Prop() required = false;

  /**
   * Define if input is readonly
   */
  @Prop() readonly = false;

  /**
   * Display selected values list in "multi" type
   */
  @Prop() displaySelectedValues: boolean;
  @Watch('displaySelectedValues')
  validateDisplaySelectedValues(newValue: MgInputCheckbox['displaySelectedValues']): void {
    if (newValue !== undefined && this.type !== 'multi') throw new Error('<mg-input-checkbox> prop "displaySelectedValues" can only be used with prop type "multi".');
  }
  /**
   * Define if input is disabled
   */
  @Prop() disabled = false;
  @Watch('required')
  @Watch('readonly')
  @Watch('disabled')
  handleValidityChange(newValue: boolean, _oldValue: boolean, prop: string): void {
    this.inputs.forEach(input => {
      input[prop] = newValue;
    });
    this.checkValidity();
    if (this.hasDisplayedError) {
      this.setErrorMessage();
      this.hasDisplayedError = false;
    }
  }

  @Watch('disabled')
  validateDisabled(newValue: MgInputCheckbox['disabled']): void {
    const className = `${this.baseClassName}-multi-disabled`;
    if (newValue && this.type === 'multi') this.classCollection.add(className);
    else this.classCollection.delete(className);
  }

  /**
   * Add a tooltip message next to the input
   */
  @Prop() tooltip: string;

  /**
   * Add a help text under the input, usually expected data format and example
   */
  @Prop() helpText: string;

  /**
   * Define input valid state
   */
  @Prop({ mutable: true }) valid: boolean;

  /**
   * Define input invalid state
   */
  @Prop({ mutable: true }) invalid: boolean;

  /**
   * Component classes
   */
  @State() classCollection: ClassList = new ClassList([this.baseClassName]);

  /**
   * Error message to display
   */
  @State() errorMessage: string;

  /**
   * Formated value for display
   */
  @State() checkboxItems: CheckboxItem[] = [];
  @Watch('checkboxItems')
  validateCheckboxItems(newValue: MgInputCheckbox['checkboxItems']): void {
    if (newValue.length > this.multiStart) this.type = 'multi';
    if (newValue.length > this.searchStart) this.displaySearchInput = this.type === 'multi';
  }

  /**
   * Display search input
   */
  @State() displaySearchInput: boolean;

  /**
   * Search current page
   */
  @State() currentSearchPage = 0;

  /**
   * Search value
   */
  @State() searchValue: SearchValueType = '';
  @Watch('searchValue')
  validateSearchValue(newValue: MgInputCheckbox['searchValue']): void {
    this.searchResults = this.checkboxItems.filter(item => item.title.toLocaleLowerCase().includes(newValue.trim().toLocaleLowerCase()));
    // after each query we reset pagination
    this.setCurrentSearchPage();
  }

  /**
   * Search current page
   */
  @State() searchResults: CheckboxItem[] = [];

  /**
   * Emitted event when value change
   */
  @Event({ eventName: 'value-change' }) valueChange: EventEmitter<MgInputCheckbox['value']>;

  /**
   * Emited event when checking validity
   */
  @Event({ eventName: 'input-valid' }) inputValid: EventEmitter<MgInputCheckbox['valid']>;

  /**
   * Public method to display errors
   */
  @Method()
  async displayError(): Promise<void> {
    this.checkValidity();
    this.setErrorMessage();
    this.hasDisplayedError = this.invalid;
  }

  /**
   * Handle input event
   * @param event - input event
   */
  private handleInput = (event: InputEvent & { target: HTMLInputElement }): void => {
    this.checkboxItems = this.checkboxItems.map(item => {
      if (item.id === event.target.id) {
        item.value = Boolean(event.target.checked);
      }
      return item;
    });

    this.value = this.checkboxItems.map(o => ({ value: o.value, title: o.title, disabled: o.disabled }));
    this.checkValidity();
  };

  /**
   * Keyboard handler
   * @param event - to trak "tab" key
   */
  private handleKeydown = (event: KeyboardEvent & { target: HTMLElement }): void => {
    // track "Tab" key event when popover display (is "multi" type selected)
    if (event.key === 'Tab' && this.mgPopover?.display) {
      const enableInputs = this.checkboxItems.filter(input => !input.disabled).map(({ id }) => id);
      const originInputIndex = enableInputs.findIndex(id => id === event.target.id);

      // close popover when tab trigger focus outside its DOM
      if ((originInputIndex + 1 >= enableInputs.length && !event.shiftKey) || (originInputIndex === 0 && event.shiftKey)) this.mgPopover.display = false;
    }
  };

  /**
   * Reset current-search-page prop
   */
  private setCurrentSearchPage(): void {
    this.currentSearchPage = this.getDisplayItems().length > 0 ? 1 : 0;
  }

  /**
   * Handle blur event
   */
  private handleBlur = (): void => {
    // Check validity
    this.checkValidity();
    this.setErrorMessage();
  };

  /**
   * Handle input search value-change event
   * @param event - input value-change event
   */
  private handleSearchChange = (event: CustomEvent): void => {
    this.searchValue = event.detail;
  };

  /**
   * Handle mg-pagination current page change event
   * @param event - pagination current page change event
   */
  private handleCurrentPageChange = (event: CustomEvent): void => {
    this.currentSearchPage = Number(event.detail);
  };

  private handleMgPopoverDisplayChange = (event: CustomEvent): void => {
    // reset search value
    if (!event.detail) {
      this.searchValue = '';
      this.setCurrentSearchPage();
    }
  };

  /**
   * get invalid element
   * @returns element
   */
  private getInvalidElement = (): HTMLInputElement => this.inputs.find((input: HTMLInputElement) => input !== null && !input.disabled && !input.checkValidity());

  /**
   * Check if input is valid
   */
  private checkValidity = (): void => {
    this.valid = this.readonly || this.disabled || this.getInvalidElement() === undefined;
    this.invalid = !this.valid;
    // We need to send valid event even if it is the same value
    this.inputValid.emit(this.valid);
  };

  /**
   * Render button text
   * @param selectedValuesNb - nb of selected values
   * @returns translated message
   */
  private renderButtonText = (selectedValuesNb: number): string => {
    let messageKey = 'editButton';
    if (this.disabled) messageKey = 'showButton';
    else if (selectedValuesNb < 1) messageKey = 'selectButton';

    return this.messages.input.checkbox[messageKey];
  };

  /**
   * Set input error message
   */
  private setErrorMessage = (): void => {
    const invalidElement = this.getInvalidElement();

    // Set error message
    this.errorMessage = undefined;
    if (!this.valid && invalidElement.validity.valueMissing) {
      this.errorMessage = this.messages.errors.required;
    }
  };

  /**
   * Method to get mg-popover identifier
   * @returns MgPopover identifier
   */
  private getMgPopoverIdentifier = (): string => `${this.identifier}-input-mg-popover`;

  /**
   * Manage items to display depending on the search state
   * @returns items to display
   */
  private getDisplayItems = (): CheckboxItem[] => (this.searchValue.length > 0 ? this.searchResults : this.checkboxItems);

  /**
   * Method to get a array range
   * @param from - array start index
   * @param to - array end index
   * @returns array's range
   */
  private getArrayRange<ItemType>(array: ItemType[], from: number, to: number): ItemType[] {
    return array.slice(from, to);
  }

  /**
   * Get from and to index
   * @returns [from,to] index
   */
  private getFromToIndexes(): number[] {
    const isFirstPage = this.currentSearchPage === 1;
    const checkboxItemsFromIndex = isFirstPage ? 0 : (this.currentSearchPage - 1) * this.searchOffset;
    const checkboxItemsToIndex = isFirstPage ? this.searchOffset : this.currentSearchPage * this.searchOffset;
    return [checkboxItemsFromIndex, checkboxItemsToIndex];
  }

  /**
   * Method to get pagination total-page
   * @param checkboxes - checkboxes to paginate
   * @returns total page number for pagination
   */
  private getPaginationTotalPages = (checkboxes: CheckboxItem[]): number => Math.ceil(checkboxes.length / this.searchOffset);

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
    this.validateType(this.type);
    this.validateValue(this.value);
    this.validateDisabled(this.disabled);
    this.validateDisplaySelectedValues(this.displaySelectedValues);
    this.setCurrentSearchPage();
    // Check validity when component is ready
    // return a promise to process action only in the FIRST render().
    // https://stenciljs.com/docs/component-lifecycle#componentwillload
    return setTimeout(() => {
      this.checkValidity();
    }, 0);
  }

  /**
   * Render checkbox multi display values
   * @param selectedValuesNb - selected values length
   * @returns display selected values
   */
  private renderCheckboxMultiDisplaySelectedValues(selectedValuesNb: number): HTMLElement {
    if (this.displaySelectedValues) {
      return (
        selectedValuesNb > 0 && (
          <ul role="list" class="mg-input__input-checkbox-multi-values-container">
            {this.checkboxItems
              .filter(({ value }) => value)
              .map(({ title }) => (
                <li class="mg-input__input-checkbox-multi-value" key={title}>
                  {title}
                </li>
              ))}
          </ul>
        )
      );
    } else {
      return <strong>{this.messages.input.checkbox[selectedValuesNb > 1 ? 'selectedValues' : 'selectedValue'].replace('{nb}', selectedValuesNb)}</strong>;
    }
  }

  /**
   * Render paginated checkboxes
   * @param checkboxes - checkboxes to render
   * @returns paginated checkboxes
   */
  private renderPaginatedCheckboxes(checkboxes: CheckboxItem[]): HTMLElement[] {
    const [checkboxItemsFromIndex, checkboxItemsToIndex] = this.getFromToIndexes();
    return [
      this.renderCheckboxes(this.getArrayRange(checkboxes, checkboxItemsFromIndex, checkboxItemsToIndex)),
      <mg-pagination
        key="search-pagination"
        totalPages={this.getPaginationTotalPages(checkboxes)}
        currentPage={this.currentSearchPage}
        onCurrent-page-change={this.handleCurrentPageChange}
        hideNavigationLabels={true}
        identifier={`${this.identifier}-pagination`}
      ></mg-pagination>,
    ];
  }

  /**
   * render checkbox multi element
   * @returns html element
   */
  private renderCheckboxMulti(): HTMLElement[] {
    const selectedValuesNb = this.checkboxItems.filter(({ value }) => value).length;
    const checkboxes = this.getDisplayItems();

    return (
      <div class={{ 'mg-input__input-container': true, 'mg-input__input-checkbox-multi': true, 'mg-input__input-checkbox-multi--with-values': this.displaySelectedValues }}>
        {this.renderCheckboxMultiDisplaySelectedValues(selectedValuesNb)}
        <mg-popover
          arrowHide={true}
          identifier={this.getMgPopoverIdentifier()}
          onDisplay-change={this.handleMgPopoverDisplayChange}
          ref={el => {
            if (Boolean(el)) this.mgPopover = el;
          }}
        >
          <mg-button variant="secondary">
            <mg-icon icon="list"></mg-icon>
            {this.renderButtonText(selectedValuesNb)}
          </mg-button>
          <div slot="content">
            {this.displaySearchInput && [
              <mg-input-text
                key="input-search"
                identifier={`${this.identifier}-input-search`}
                icon="magnifying-glass"
                type="search"
                placeholder={this.messages.input.checkbox.label}
                label={this.messages.input.checkbox.label}
                mgWidth="full"
                value={this.searchValue}
                labelHide={true}
                displayCharacterLeft={false}
                name="q"
                onValue-change={this.handleSearchChange}
                aria-controls="search-results items-list"
              ></mg-input-text>,
              <p key="search-results" role="status" class="sr-only" id="search-results">
                {`${checkboxes.length} ${this.messages.input.checkbox[checkboxes.length > 0 ? 'results' : 'result']}`}
              </p>,
            ]}
            {this.displaySearchInput && this.getPaginationTotalPages(checkboxes) > 1 ? this.renderPaginatedCheckboxes(checkboxes) : this.renderCheckboxes(checkboxes)}
            {this.displaySearchInput && checkboxes.length === 0 && <p class="mg-input__input-checkbox-multi-no-result">{this.messages.input.checkbox.noResult}</p>}
          </div>
        </mg-popover>
      </div>
    );
  }

  /**
   * Render checkbox element
   * @param checkboxes - checkboxes to render
   * @returns HTML Element
   */
  private renderCheckboxes(checkboxes: CheckboxItem[]): HTMLElement {
    return (
      <ul
        class={{
          'mg-input__input-group-container': true,
          'mg-input__input-group-container--vertical': this.inputVerticalList || (this.type === 'multi' && !this.readonly),
          'mg-input__input-checkbox-multi-inputs': this.type === 'multi' && !this.readonly,
        }}
        role="list"
        aria-describedby={this.displaySearchInput ? 'search-results' : false}
        aria-label={this.displaySearchInput ? this.messages.input.checkbox.searchResults : false}
        aria-live={this.displaySearchInput ? 'polite' : false}
        id="items-list"
        key="checkboxes"
      >
        {checkboxes
          .filter(item => !this.readonly || item.value)
          .map((input, index) => (
            <li key={input.id} class={{ 'mg-input__input-group': true, 'mg-input__input-group--disabled': this.disabled || input.disabled }}>
              <input
                type="checkbox"
                id={input.id}
                name={this.identifier}
                value={input.value && input.value.toString()}
                checked={Boolean(input.value)}
                disabled={this.readonly || this.disabled || input.disabled}
                required={this.required}
                indeterminate={input.value === null}
                onInput={this.handleInput}
                onBlur={this.handleBlur}
                onKeyDown={this.handleKeydown}
                ref={el => {
                  if (el !== null) this.inputs[index] = el as HTMLInputElement;
                }}
              />
              <label htmlFor={input.id}>{input.title}</label>
            </li>
          ))}
      </ul>
    );
  }

  /**
   * Render
   * @returns HTML Element
   */
  render(): HTMLElement {
    return (
      <MgInput
        identifier={this.identifier}
        classCollection={this.classCollection}
        ariaDescribedbyIDs={[]}
        label={this.label}
        labelOnTop={this.labelOnTop}
        labelHide={this.labelHide}
        required={!this.readonly ? this.required : undefined} // required is only used display asterisk
        readonly={undefined}
        mgWidth={undefined}
        disabled={this.disabled}
        value={this.value && this.value.toString()}
        readonlyValue={undefined}
        tooltip={!this.readonly ? this.tooltip : undefined}
        helpText={!this.readonly ? this.helpText : undefined}
        errorMessage={!this.readonly ? this.errorMessage : undefined}
        isFieldset={true}
      >
        {this.type === 'checkbox' || this.readonly ? this.renderCheckboxes(this.checkboxItems) : this.renderCheckboxMulti()}
      </MgInput>
    );
  }
}
