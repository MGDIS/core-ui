import { Component, Element, Event, h, Prop, EventEmitter, State, Watch, Method } from '@stencil/core';
import { ClassList, cleanString, isValidString, toString } from '@mgdis/core-ui-helpers/dist/utils';
import { CheckboxItem, CheckboxType, CheckboxValue, checkboxTypes, SectionKind, MgInputCheckboxListProps, SectionKindType } from './mg-input-checkbox.conf';
import { MgInputCheckboxList } from './MgInputCheckboxList';
import { classDisabled, type TooltipPosition, classReadonly, classFieldset, classVerticalList } from '../mg-input/mg-input.conf';
import { initLocales } from '../../../../locales';

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
  styleUrl: '../../../../../node_modules/@mgdis/styles/dist/components/mg-input-checkbox.css',
  shadow: true,
})
export class MgInputCheckbox implements Omit<MgInputCheckboxListProps, 'id' | 'checkboxes' | 'messages'> {
  /************
   * Internal *
   ************/

  // HTML selector
  private mgPopover: HTMLMgPopoverElement;
  private searchInput: HTMLInputElement;

  // Locales
  private messages;

  // hasDisplayedError (triggered by blur event)
  private hasDisplayedError = false;

  private mode: 'custom' | 'auto' = 'custom';

  // style
  private readonly baseClassName = 'mg-c-input--checkbox';
  private readonly classTypeMulti = 'mg-c-input--checkbox-multi';
  private readonly classWithValues = 'mg-c-input--with-values';
  private readonly classSearchMode = 'mg-c-input--search-mode';

  // "multi" setup
  private readonly multiStart = 5;
  private readonly searchStart = 10;

  // popover variables
  private hasOpenedPopover = false;

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
        ...item,
        _id: `${this.identifier}_${index}`,
        _handleInput: this.handleInput.bind(this),
        _handleBlur: this.handleBlur.bind(this),
        _handleKeydown: this.handleKeydown.bind(this),
      }));
      this.valueChange.emit(newValue);
    } else {
      throw new Error(`<mg-input-checkbox> prop "value" is required and all values must be the same type, CheckboxItem. Passed value: ${toString(newValue)}.`);
    }
  }

  /**
   * Define checkbox type
   * When it's undefined the type is dynamic:
   * - With 0-5 items type is 'checkbox'
   * - With 5-10 items type is 'multi'
   * When it set the type is locked to the defined value.
   * When type is dynamic OR with 'multi' type AND Over 10 items "search" feature is enabled
   */
  @Prop({ mutable: true }) type: CheckboxType;
  @Watch('type')
  validateType(newValue: MgInputCheckbox['type']): void {
    if (newValue !== undefined && !checkboxTypes.includes(newValue)) {
      throw new Error(`<mg-input-checkbox> prop "type" must be a CheckboxType. Passed value: ${toString(newValue)}.`);
    } else if (newValue === undefined) {
      this.mode = 'auto';
      this.type = checkboxTypes[0];
    } else if (newValue === 'multi') {
      this.classCollection.add(this.classTypeMulti);
      this.element.dataset.mgPopoverGuard = this.getMgPopoverIdentifier();
    } else {
      this.classCollection.delete(this.classTypeMulti);
    }
  }

  /**
   * Identifier is used for the element ID (id is a reserved prop in Stencil.js)
   */
  @Prop() identifier!: string;

  /**
   * Define input name
   * If not set the value equals the identifier
   */
  @Prop() name = this.identifier;

  /**
   * Define input label
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
   * Define if inputs are display verticaly
   */
  @Prop() inputVerticalList = false;
  @Watch('inputVerticalList')
  watchInputVerticalList(newValue: MgInputCheckbox['inputVerticalList']): void {
    if (newValue) this.classCollection.add(classVerticalList);
    else this.classCollection.delete(classVerticalList);
  }

  /**
   * Define if mg-input-checkbox is required
   */
  @Prop() required = false;

  /**
   * Define if mg-input-checkbox is readonly
   */
  @Prop() readonly = false;
  @Watch('readonly')
  watchReadonly(newValue: MgInputCheckbox['readonly']): void {
    if (newValue) this.classCollection.add(classReadonly);
    else this.classCollection.delete(classReadonly);
  }

  /**
   * Display selected values list in "multi" type
   * This prop is only applied with prop type "multi" or when an "unset" mode render a "multi" type.
   */
  @Prop() displaySelectedValues = false;
  @Watch('displaySelectedValues')
  watchDisplaySelectedValues(newValue: MgInputCheckbox['displaySelectedValues']): void {
    if (newValue) this.classCollection.add(this.classWithValues);
    else this.classCollection.delete(this.classWithValues);
  }

  /**
   * Define if input is disabled
   */
  @Prop() disabled = false;
  @Watch('required')
  @Watch('readonly')
  @Watch('disabled')
  handleValidityChange(newValue: boolean, _oldValue: boolean, prop: string): void {
    // if required or disabled are enabled, we force options state
    if (newValue && prop !== 'readonly') {
      this.updateCheckboxItems(prop, newValue);
    }
    // else we rebase options to inital values
    else {
      this.validateValue(this.value);
    }
    this.checkValidity();
    if (this.hasDisplayedError) {
      this.hasDisplayedError = prop !== 'required';
      this.setErrorMessage(this.hasDisplayedError);
    }
    this.setButtonTextKey();
  }

  @Watch('disabled')
  validateDisabled(newValue: MgInputCheckbox['disabled']): void {
    if (newValue) this.classCollection.add(classDisabled);
    else this.classCollection.delete(classDisabled);
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
   * Overwrite default "edit" button message
   */
  @Prop() editButtonMessage: string;
  /**
   * Overwrite default "show" button message
   */
  @Prop() showButtonMessage: string;

  /**
   * Overwrite default "select" button message
   */
  @Prop() selectButtonMessage: string;

  /**
   * Component classes
   */
  @State() classCollection: ClassList = new ClassList([this.baseClassName, classFieldset]);

  /**
   * Error message to display
   */
  @State() errorMessage: string;

  /**
   * Formated value to display in list
   */
  @State() checkboxItems: CheckboxItem[] = [];
  @Watch('checkboxItems')
  validateCheckboxItems(newValue: MgInputCheckbox['checkboxItems']): void {
    // For the 'auto' mode we update the type depending on the new value's length.
    if (this.mode === 'auto') this.type = newValue.length > this.multiStart ? 'multi' : 'checkbox';
    // If the type is multi and the new value's length is greater than the search gauge, display the search input.
    this.displaySearchInput = this.type === 'multi' && newValue.length > this.searchStart;
    // refresh search values
    if (this.displaySearchInput) this.updateSearchResults();
    this.setButtonTextKey();
  }

  /**
   * Display search input
   */
  @State() displaySearchInput: boolean;
  @Watch('displaySearchInput')
  watchDisplaySearchInput(newValue: MgInputCheckbox['displaySearchInput']): void {
    if (newValue) this.classCollection.add(this.classSearchMode);
    else this.classCollection.delete(this.classSearchMode);
  }

  /**
   * Search value query
   */
  @State() searchValue = '';
  @Watch('searchValue')
  validateSearchValue(): void {
    // refresh search values
    this.updateSearchResults();
  }

  /**
   * Search current page
   */
  @State() searchResults: CheckboxItem[] = [];

  /**
   * Select values button text local key
   */
  @State() selectValuesButtonKey: 'editButton' | 'showButton' | 'selectButton' = 'editButton';

  /**
   * Emitted event when value change
   */
  @Event({ eventName: 'value-change' }) valueChange: EventEmitter<HTMLMgInputCheckboxElement['value']>;

  /**
   * Emited event when checking validity
   */
  @Event({ eventName: 'input-valid' }) inputValid: EventEmitter<HTMLMgInputCheckboxElement['valid']>;

  /**
   * Set focus on input.
   */
  @Method()
  async setFocus(): Promise<void> {
    this.element.shadowRoot.querySelector('input')?.focus();
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
   * This method can be used to set the component's error state from its context by passing a boolean value to the `valid` parameter.
   * It must be paired with an error message to display for the given context.
   * When used to set validity to `false`, you should use this method again to reset the validity to `true`.
   * @param valid - value indicating the validity
   * @param errorMessage - the error message to display
   */
  @Method()
  async setError(valid: MgInputCheckbox['valid'], errorMessage: string): Promise<void> {
    if (typeof valid !== 'boolean') {
      throw new Error('<mg-input-checkbox> method "setError()" param "valid" must be a boolean.');
    } else if (!isValidString(errorMessage)) {
      throw new Error('<mg-input-checkbox> method "setError()" param "errorMessage" must be a string.');
    } else {
      this.setValidity(valid);
      this.setErrorMessage(undefined, valid ? undefined : errorMessage);
      this.hasDisplayedError = this.invalid;
    }
  }

  /**
   * Reset value, validity and error state
   */
  @Method()
  async reset(): Promise<void> {
    if (!this.readonly) {
      this.value = this.value.map(item => ({ ...item, value: false }));
      // Use `Promise` as requested for stencil method
      // Use `requestAnimationFrame` to ensure:
      // - DOM is fully updated before validation
      // - Async operations are completed
      // - No timing issues with Stencil's render cycle
      // - Keep everything in sync both inside and outside the component
      return new Promise(resolve => {
        requestAnimationFrame(() => {
          this.checkValidity();
          this.errorMessage = undefined;
          this.hasDisplayedError = false;
          resolve();
        });
      });
    }
  }

  /**
   * Method to set validity values
   * @param newValue - valid new value
   */
  private setValidity(newValue: MgInputCheckbox['valid']) {
    const oldValidValue = this.valid;
    this.valid = newValue;
    this.invalid = !this.valid;
    // We need to send valid event even if it is the same value
    if (this.valid !== oldValidValue) this.inputValid.emit(this.valid);
  }

  /**
   * Handle input event
   * @param event - input event
   */
  private handleInput = (event: InputEvent & { target: HTMLInputElement }): void => {
    this.updateCheckboxItems('value', Boolean(event.target.checked), item => item._id === event.target.id);
    this.updateValues();
    this.checkValidity();
    this.setErrorMessage();
  };

  /**
   * Keyboard handler
   * @param event - to track "tab" key
   */
  private handleKeydown = (event: KeyboardEvent & { target: HTMLElement }): void => {
    // track "Tab" key event when popover display (is "multi" type selected)
    if (event.key === 'Tab' && this.mgPopover?.display) {
      // when search input and do a back tab we close the popover
      if (Boolean(this.searchInput) && event.shiftKey && this.searchInput.id === event.target.id) {
        this.mgPopover.display = false;
        return;
      }

      const enableInputs = Array.from(this.element.shadowRoot.querySelectorAll('input'))
        .filter(input => !input.hasAttribute('disabled'))
        .map(({ id }) => id);
      const originInputIndex = enableInputs.findIndex(id => id === event.target.id);

      // close popover when tab trigger focus outside its DOM
      if ((originInputIndex + 1 >= enableInputs.length && !event.shiftKey) || (originInputIndex === 0 && event.shiftKey && this.searchInput === undefined))
        this.mgPopover.display = false;
    }
  };

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
    event.stopPropagation();
  };

  /**
   * popover display-change handler
   * @param event - mg-popover display-change custom event
   */
  private handleMgPopoverDisplayChange = (event: CustomEvent): void => {
    // 1. update hasOpenedPopover guard with event value
    this.hasOpenedPopover = event.detail;

    // 2. update selected valued button text
    this.setButtonTextKey();

    // 3. when popover display change to hide, update reset needeed props and run checkValidity
    if (!event.detail) {
      // reset search value
      this.searchValue = '';
      // reset pagintated section current page
      Array.from(this.element.shadowRoot.querySelectorAll('mg-input-checkbox-paginated')).forEach(element => {
        element.currentPage = 1;
      });
      this.checkValidity();
    }
  };

  /**
   * Handle select all button
   * @param event - mass action event trigger a global select/unselect on values
   */
  private handleMassAction = (event: CustomEvent<SectionKindType>): void => {
    const displayItems = this.getDisplayItems();

    // update only displayed items
    displayItems.forEach(item => {
      if (item.disabled !== true) {
        item.value = event.detail !== SectionKind.SELECTED;
      }
    });
    this.updateValues();
  };

  /**
   * Update values
   */
  private updateValues = (): void => {
    this.value = this.checkboxItems.map(o => {
      delete o._handleBlur;
      delete o._handleInput;
      delete o._handleKeydown;
      delete o._id;
      return o;
    });
  };

  /**
   * Update ckecboxes item
   * @param key - property to update
   * @param newValue - value to update with
   * @param condition - condtion to applu change on item
   */
  private updateCheckboxItems(key: string, newValue: unknown, condition?: (item: CheckboxItem) => boolean): void {
    this.checkboxItems = this.checkboxItems.map(item => {
      if ((typeof condition === 'function' && condition(item)) || condition === undefined) item[key] = newValue;
      return item;
    });
  }

  /**
   * has invalid input
   * @returns true if at least one input is invalid
   */
  private hasInvalidInput = (): boolean =>
    Array.from(this.element.shadowRoot.querySelectorAll('input[type="checkbox"]')).some((input: HTMLInputElement) => !input.disabled && !input.checkValidity());

  /**
   * Method to update searchResults
   */
  private updateSearchResults = (): void => {
    this.searchResults = this.checkboxItems.filter(item => cleanString(item.title).includes(cleanString(this.searchValue)));
  };

  /**
   * Method to validate if one of inputs value is checked id required
   * @returns truthy if condition is valid
   */
  private validateRequired = (): boolean => !this.required || this.checkboxItems.some(({ value }) => value);

  /**
   * Check if input is valid
   */
  private checkValidity = (): void => {
    this.setValidity(this.readonly || this.disabled || (!this.hasInvalidInput() && this.validateRequired()));
  };

  /**
   * Set button text locale key
   */
  private setButtonTextKey = (): void => {
    // prevent key update while popover is openned
    if (this.hasOpenedPopover) return;
    let messageKey: MgInputCheckbox['selectValuesButtonKey'] = 'editButton';
    if (this.disabled) messageKey = 'showButton';
    else if (this.getSelectedItems().length < 1) messageKey = 'selectButton';

    this.selectValuesButtonKey = messageKey;
  };

  /**
   * Get select values button message
   * @returns message to display
   */
  private getSelectValuesButtonMessage = (): string => {
    if (this.selectValuesButtonKey === 'editButton' && isValidString(this.editButtonMessage)) {
      return this.editButtonMessage;
    } else if (this.selectValuesButtonKey === 'showButton' && isValidString(this.showButtonMessage)) {
      return this.showButtonMessage;
    } else if (this.selectValuesButtonKey === 'selectButton' && isValidString(this.selectButtonMessage)) {
      return this.selectButtonMessage;
    } else {
      return this.messages.input.checkbox[this.selectValuesButtonKey];
    }
  };

  /**
   * Set input error message
   * @param displayError - dispay error condition
   * @param errorMessage - errorMessage override
   */
  private setErrorMessage = (displayError = true, errorMessage?: string): void => {
    // Set error message
    this.errorMessage = undefined;
    if (displayError && !this.valid) {
      if (errorMessage !== undefined) this.errorMessage = errorMessage;
      else if (!this.validateRequired()) this.errorMessage = this.messages.errors.required;
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
   * get list of selected checkboxItems
   * @returns selected checkboxItems
   */
  private getSelectedItems = (): CheckboxItem[] => this.checkboxItems.filter(({ value }) => value);

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
    // `validateType` must be done before `validateValue` because we need to set mode['auto'|'custom'] from type
    // and `validateValue` updates `this.checkboxItems` watcher which requires a defined `this.type`.
    this.validateType(this.type);
    this.validateValue(this.value);
    this.validateDisabled(this.disabled);
    this.watchReadonly(this.readonly);
    this.watchInputVerticalList(this.inputVerticalList);
    this.watchDisplaySelectedValues(this.displaySelectedValues);
    this.watchDisplaySearchInput(this.displaySearchInput);
    // Check validity when component is ready
    // return a promise to process action only in the FIRST render().
    // https://stenciljs.com/docs/component-lifecycle#componentwillload
    return setTimeout(() => {
      this.checkValidity();
    }, 0);
  }

  /**
   * add listeners and DOM attributed
   */
  componentDidLoad(): void {
    if (!this.readonly) {
      this.searchInput = this.element.shadowRoot.querySelector('mg-input-text')?.shadowRoot.querySelector('input');
      this.searchInput?.addEventListener('keydown', this.handleKeydown);
    }
  }

  /**
   * Render checkboxes by section
   * @param checkboxes - checkboxes to render
   * @returns render sections of checkboxes
   */
  private renderCheckboxBySection(checkboxes: CheckboxItem[]): HTMLElement[] {
    const [checkedValues, notCheckedValues] = checkboxes.reduce(
      (acc, curr) => {
        acc[curr.value ? 0 : 1].push(curr);
        return acc;
      },
      [[], []],
    );

    const baseSection = {
      readonly: this.readonly,
      disabled: this.disabled,
      identifier: this.identifier,
    };

    const sections = [
      {
        ...baseSection,
        checkboxes: checkedValues,
        messages: this.messages.input.checkbox.sections.selected,
      },
      {
        ...baseSection,
        checkboxes: notCheckedValues,
        messages: this.messages.input.checkbox.sections.notSelected,
      },
    ];

    return sections
      .filter(section => section.checkboxes.length)
      .map(section => <mg-input-checkbox-paginated {...section} onMass-action={this.handleMassAction} key={section.messages}></mg-input-checkbox-paginated>);
  }

  /**
   * render checkbox multi element
   * @returns html element
   */
  private renderCheckboxMulti(): HTMLElement {
    const selectedValuesNb = this.getSelectedItems().length;
    const checkboxes = this.getDisplayItems();

    return (
      <div class="mg-c-input__input-container">
        <mg-popover
          arrowHide={true}
          identifier={this.getMgPopoverIdentifier()}
          display={this.hasOpenedPopover}
          onDisplay-change={this.handleMgPopoverDisplayChange}
          ref={(el: HTMLMgPopoverElement) => {
            if (el !== null) this.mgPopover = el;
          }}
        >
          <mg-button variant="secondary" aria-describedby={`${this.identifier}-title`}>
            <mg-icon icon="list"></mg-icon>
            {this.getSelectValuesButtonMessage()}
          </mg-button>
          <div slot="content" class="mg-c-input__content">
            {this.displaySearchInput ? (
              [
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
                  characterLeftHide={true}
                  name="q"
                  onValue-change={this.handleSearchChange}
                  aria-controls="search-results items-list"
                ></mg-input-text>,
                <p key="search-results" role="status" class="mg-u-visually-hidden" id="search-results">
                  {`${checkboxes.length} ${this.messages.input.checkbox[checkboxes.length > 0 ? 'results' : 'result']}`}
                </p>,
                <div key="sections-container" class="mg-c-input__sections">
                  {this.renderCheckboxBySection(checkboxes)}
                </div>,
              ]
            ) : (
              <MgInputCheckboxList
                checkboxes={checkboxes}
                displaySearchInput={this.displaySearchInput}
                messages={this.messages.input.checkbox}
                id="checkboxes-list"
                disabled={this.disabled}
                name={this.name}
                invalid={this.invalid}
              ></MgInputCheckboxList>
            )}
            {this.displaySearchInput && checkboxes.length === 0 && <p class="mg-c-input__input-no-result">{this.messages.input.checkbox.noResult}</p>}
          </div>
        </mg-popover>
        {this.displaySelectedValues ? (
          selectedValuesNb > 0 && (
            <ul role="list" class="mg-c-input__input-container-list">
              {this.getSelectedItems().map(({ title }) => (
                <li class="mg-c-input__input-value" key={title}>
                  {title}
                </li>
              ))}
            </ul>
          )
        ) : (
          <b>{this.messages.input.checkbox[selectedValuesNb > 1 ? 'selectedValues' : 'selectedValue'].replace('{nb}', selectedValuesNb)}</b>
        )}
      </div>
    );
  }

  /**
   * Renders the readonly value of the input.
   * @returns The rendered readonly value.
   */
  private renderReadonly = (readonlyValue: string[]): HTMLElement => {
    return this.inputVerticalList ? (
      <ul class="mg-c-input__readonly-value">
        {readonlyValue.map(value => (
          <li key={value}>
            <b>{value}</b>
          </li>
        ))}
      </ul>
    ) : (
      <b class="mg-c-input__readonly-value">{readonlyValue.join(', ')}</b>
    );
  };

  /**
   * Renders the MgInputCheckboxList component.
   * @returns The rendered MgInputCheckboxList component.
   */
  private renderMgInputCheckboxList = () => (
    <MgInputCheckboxList
      checkboxes={this.checkboxItems}
      displaySearchInput={this.displaySearchInput}
      messages={this.messages.input.checkbox}
      id="checkboxes-list"
      disabled={this.disabled}
      name={this.name}
      invalid={this.invalid}
    ></MgInputCheckboxList>
  );

  /**
   * Render
   * @returns HTML Element
   */
  render(): HTMLElement {
    let inputContent: HTMLElement;
    const readonlyValue = this.value.filter(({ value }) => value).map(({ title }) => title);

    if (this.readonly) {
      inputContent = this.renderReadonly(readonlyValue);
    } else if (this.type === 'checkbox') {
      inputContent = this.renderMgInputCheckboxList();
    } else {
      inputContent = this.renderCheckboxMulti();
    }

    return (
      <mg-input
        label={this.label}
        identifier={this.identifier}
        class={this.classCollection.join()}
        labelOnTop={this.labelOnTop}
        labelHide={this.labelHide}
        required={!this.readonly ? this.required : undefined} // required is only used display asterisk
        tooltip={this.tooltip}
        tooltipPosition={this.readonly && readonlyValue.length === 0 ? 'label' : this.tooltipPosition}
        helpText={!this.readonly ? this.helpText : undefined}
        errorMessage={!this.readonly ? this.errorMessage : undefined}
      >
        {inputContent}
      </mg-input>
    );
  }
}
