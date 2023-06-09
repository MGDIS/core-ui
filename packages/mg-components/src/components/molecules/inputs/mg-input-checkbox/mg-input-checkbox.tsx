/* eslint-disable jsx-a11y/no-redundant-roles */
import { Component, Element, Event, h, Prop, EventEmitter, State, Watch, Method } from '@stencil/core';
import { MgInput } from '../MgInput';
import { ClassList } from '../../../../utils/components.utils';
import { initLocales } from '../../../../locales';
import { CheckboxItem, CheckboxType, CheckboxValue, checkboxTypes, SearchValueType, SectionKind, MgInputCheckboxListProps } from './mg-input-checkbox.conf';
import { MgInputCheckboxList } from './MgInputCheckboxList';

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

  // style
  private readonly baseClassName = 'mg-input--checkbox';

  // "multi" setup
  private readonly multiStart = 5;
  private readonly searchStart = 10;

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
        required: item.required,
        handleInput: this.handleInput.bind(this),
        handleBlur: this.handleBlur.bind(this),
        handleKeydown: this.handleKeydown.bind(this),
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
   * Define if mg-input-checkbox is required
   */
  @Prop() required = false;

  /**
   * Define if mg-input-checkbox is readonly
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
    if (prop !== 'readonly') this.updateCheckboxItems(prop, newValue);
    this.checkValidity();
    if (this.hasDisplayedError) {
      this.hasDisplayedError = prop !== 'required';
      this.setErrorMessage(this.hasDisplayedError);
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
   * Formated value to display in list
   */
  @State() checkboxItems: CheckboxItem[] = [];
  @Watch('checkboxItems')
  validateCheckboxItems(newValue: MgInputCheckbox['checkboxItems']): void {
    if (newValue.length > this.multiStart) this.type = 'multi';
    if (newValue.length > this.searchStart) {
      this.displaySearchInput = this.type === 'multi';
      // refresh search values
      this.updateSearchResults();
    }
  }

  /**
   * Display search input
   */
  @State() displaySearchInput: boolean;

  /**
   * Search value query
   */
  @State() searchValue: SearchValueType = '';
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
    this.updateCheckboxItems('value', Boolean(event.target.checked), item => item.id === event.target.id);
    this.updateValues();
    this.checkValidity();
  };

  /**
   * Keyboard handler
   * @param event - to trak "tab" key
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
        .filter(input => !Boolean(input.getAttribute('disabled')))
        .map(({ id }) => id);
      const originInputIndex = enableInputs.findIndex(id => id === event.target.id);

      // close popover when tab trigger focus outside its DOM
      if ((originInputIndex + 1 >= enableInputs.length && !event.shiftKey) || (originInputIndex === 0 && event.shiftKey && !Boolean(this.searchInput)))
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
  };

  /**
   * popover display-change handler
   * @param event - mg-popover display-change custom event
   */
  private handleMgPopoverDisplayChange = (event: CustomEvent): void => {
    // reset search value
    if (!event.detail) {
      this.searchValue = '';
      this.checkValidity();
    }
  };

  /**
   * Handle select all button
   * @param event - mass action event trigger a global select/unselect on values
   */
  private handleMassAction = (event: CustomEvent): void => {
    this.updateCheckboxItems('value', event.detail !== 'selected');
    this.updateValues();
  };

  /**
   * Update values
   */
  private updateValues = (): void => {
    this.value = this.checkboxItems.map(o => ({ value: o.value, title: o.title, disabled: o.disabled }));
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
   * get invalid element
   * @returns element
   */
  private getInvalidElement = (): HTMLInputElement => {
    const items: HTMLInputElement[] = Array.from(this.element.shadowRoot.querySelectorAll('input[type="checkbox"]'));
    return items.find(input => input !== null && !input.disabled && !input.checkValidity());
  };

  /**
   * Method to update searchResults
   */
  private updateSearchResults = (): void => {
    this.searchResults = this.checkboxItems.filter(item => item.title.toLocaleLowerCase().includes(this.searchValue.trim().toLocaleLowerCase()));
  };

  /**
   * Methode to validate if one of inputs value is checked id required
   * @returns truthy if condition is valid
   */
  private validateRequired = (): boolean => !this.required || this.checkboxItems.some(({ value }) => value);

  /**
   * Check if input is valid
   */
  private checkValidity = (): void => {
    this.valid = this.readonly || this.disabled || (this.getInvalidElement() === undefined && this.validateRequired());
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
   * @param displayError - dispay error condition
   */
  private setErrorMessage = (displayError = true): void => {
    // Set error message
    this.errorMessage = undefined;
    if (displayError && !this.valid && !this.validateRequired()) this.errorMessage = this.messages.errors.required;
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
    // Check validity when component is ready
    // return a promise to process action only in the FIRST render().
    // https://stenciljs.com/docs/component-lifecycle#componentwillload
    return setTimeout(() => {
      this.checkValidity();
    }, 0);
  }

  /**
   * add listeners
   */
  componentDidLoad(): void {
    this.searchInput = this.element.shadowRoot.querySelector('mg-input-text')?.shadowRoot.querySelector('input');
    this.searchInput?.addEventListener('keydown', this.handleKeydown);
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
        sectionKind: SectionKind.SELECTED,
        checkboxes: checkedValues,
        messages: this.messages.input.checkbox.sections.selected,
      },
      {
        ...baseSection,
        sectionKind: SectionKind.NOT_SELECTED,
        checkboxes: notCheckedValues,
        messages: this.messages.input.checkbox.sections.notSelected,
      },
    ];

    return sections.map(section => <mg-input-checkbox-paginated {...section} onMass-action={this.handleMassAction}></mg-input-checkbox-paginated>);
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
            {this.displaySearchInput ? (
              <div class="mg-input__input-checkbox-multi-sections-container">{this.renderCheckboxBySection(checkboxes)}</div>
            ) : (
              <MgInputCheckboxList
                checkboxes={checkboxes}
                inputVerticalList={true}
                type={this.type}
                readonly={this.readonly}
                displaySearchInput={this.displaySearchInput}
                messages={this.messages.input.checkbox}
                id="checkboxes-list"
                disabled={this.disabled}
                name={this.name}
              ></MgInputCheckboxList>
            )}
            {this.displaySearchInput && checkboxes.length === 0 && <p class="mg-input__input-checkbox-multi-no-result">{this.messages.input.checkbox.noResult}</p>}
          </div>
        </mg-popover>
      </div>
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
        {this.type === 'checkbox' || this.readonly ? (
          <MgInputCheckboxList
            checkboxes={this.checkboxItems}
            inputVerticalList={this.inputVerticalList}
            type={this.type}
            readonly={this.readonly}
            displaySearchInput={this.displaySearchInput}
            messages={this.messages.input.checkbox}
            id="checkboxes-list"
            disabled={this.disabled}
            name={this.name}
          ></MgInputCheckboxList>
        ) : (
          this.renderCheckboxMulti()
        )}
      </MgInput>
    );
  }
}
