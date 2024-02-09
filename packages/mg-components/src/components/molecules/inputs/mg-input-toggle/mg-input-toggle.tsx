/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Event, h, Prop, EventEmitter, State, Watch, Element, Method } from '@stencil/core';
import { MgInput } from '../MgInput';
import { ClassList, allItemsAreString, isValidString } from '@mgdis/stencil-helpers';
import { ToggleValue } from './mg-input-toggle.conf';
import { type TooltipPosition } from '../MgInput.conf';

/**
 * type Option validation function
 * @param option - radio option
 * @returns toggle option type is valid
 */
const isOption = (option: unknown): option is ToggleValue =>
  typeof option === 'object' && typeof (option as ToggleValue).title === 'string' && (option as ToggleValue).value !== undefined;

@Component({
  tag: 'mg-input-toggle',
  styleUrl: '../../../../../node_modules/@mgdis/styles/dist/components/mg-input-toggle.css',
  shadow: true,
})
export class MgInputToggle {
  /************
   * Internal *
   ************/

  // Classes
  private classDisabled = 'mg-c-input--toggle-disabled';
  private classIsActive = 'mg-c-input--toggle-is-active';
  private classOnOff = 'mg-c-input--toggle-on-off';
  private classIcon = 'mg-c-input--toggle-icon';

  /**************
   * Decorators *
   **************/

  /**
   * Get component DOM element
   */
  @Element() element: HTMLMgInputToggleElement;

  /**
   * Component value
   */
  @Prop({ mutable: true }) value: any;
  @Watch('value')
  handleValue(newValue: any): void {
    // Swich to the right option
    this.setChecked();
    // Emit value-change event
    this.valueChange.emit(newValue);
  }

  /**
   * Items are the possible options to select
   */
  @Prop() items!: string[] | ToggleValue[];
  @Watch('items')
  validateItems(newValue: MgInputToggle['items']): void {
    if (typeof newValue === 'object' && this.items.length !== 2) {
      throw new Error('<mg-input-toggle> prop "items" require 2 items.');
    }
    // String array
    else if (allItemsAreString(newValue)) {
      this.options = newValue.map(item => ({ title: item, value: item }));
    }
    // Object array
    else if (newValue && newValue.every(item => isOption(item))) {
      this.options = newValue;
    } else {
      throw new Error('<mg-input-toggle> prop "items" is required and all items must be the same type: ToggleValue.');
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
  @Prop() name: string = this.identifier;

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
   * Define if toggle have on/off style
   */
  @Prop() isOnOff = false;
  @Watch('isOnOff')
  handleIsOnOff(newValue: MgInputToggle['isOnOff']): void {
    if (newValue) this.classCollection.add(this.classOnOff);
    else this.classCollection.delete(this.classOnOff);
  }

  /**
   * Define if toggle display icon
   */
  @Prop() isIcon = false;
  @Watch('isIcon')
  handleIsIcon(newValue: MgInputToggle['isIcon']): void {
    if (newValue) this.classCollection.add(this.classIcon);
    else this.classCollection.delete(this.classIcon);
  }

  /**
   * Define if input is readonly
   */
  @Prop() readonly = false;

  /**
   * Define if input is disabled
   */
  @Prop() disabled = false;
  @Watch('disabled')
  handleDisabled(newValue: MgInputToggle['disabled']): void {
    if (newValue) this.classCollection.add(this.classDisabled);
    else this.classCollection.delete(this.classDisabled);
  }

  /**
   * Add a tooltip message next to the input
   */
  @Prop() tooltip: string;

  /**
   * Define tooltip position
   */
  @Prop() tooltipPosition: TooltipPosition = 'input';

  /**
   * Add a help text under the input, usually expected data format and example
   */
  @Prop() helpText: string;

  /**
   * Component classes
   */
  @State() classCollection: ClassList = new ClassList(['mg-c-input--toggle']);

  /**
   * Formated items for display
   */
  @State() options: ToggleValue[];

  /**
   * Error message to display
   */
  @State() errorMessage: string;

  /**
   * Define input valid state
   */
  @State() valid: boolean;

  /**
   * Checked internal value
   */
  @State() checked = false;
  @Watch('checked')
  handleChecked(newValue: MgInputToggle['checked']): void {
    // style
    if (newValue) this.classCollection.add(this.classIsActive);
    else this.classCollection.delete(this.classIsActive);

    // update value
    this.value = this.options[newValue ? 1 : 0].value;
  }

  /**
   * Emited event when value change
   */
  @Event({ eventName: 'value-change' }) valueChange: EventEmitter<HTMLMgInputToggleElement['value']>;

  /**
   * Emited event when checking validity
   */
  @Event({ eventName: 'input-valid' }) inputValid: EventEmitter<boolean>;

  /**
   * Set an error and display a custom error message.
   * This method can be used to set the component's error state from its context by passing a boolean value to the `valid` parameter.
   * It must be paired with an error message to display for the given context.
   * When used to set validity to `false`, you should use this method again to reset the validity to `true`.
   * @param valid - value indicating the validity
   * @param errorMessage - the error message to display
   */
  @Method()
  async setError(valid: boolean, errorMessage: string): Promise<void> {
    if (typeof valid !== 'boolean') {
      throw new Error('<mg-input-toggle> method "setError()" param "valid" must be a boolean');
    } else if (!isValidString(errorMessage)) {
      throw new Error('<mg-input-toggle> method "setError()" param "errorMessage" must be a string');
    } else {
      this.valid = valid;
      this.inputValid.emit(valid);
      this.setErrorMessage(valid ? undefined : errorMessage);
    }
  }

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
  };

  /**
   * Change checked value
   */
  private toggleChecked = (): void => {
    this.checked = !this.checked;
  };

  /**
   * Slots validation
   */
  private validateSlots = (): void => {
    const slots = Array.from(this.element.children);
    if (slots.length !== 2) {
      throw new Error('<mg-input-toggle> 2 slots are required.');
    } else if (!this.isIcon) {
      // Due to text-overflow set to ellipsis
      // we need to ensure that slot element have title to display value on mouse over
      slots.forEach(slot => slot.setAttribute('title', slot.textContent));
    }
  };

  /**
   * set checked state
   */
  private setChecked(): void {
    const optionTrueValueIndex = this.options.map(option => option.value).findIndex(value => value === true);

    if ([0, 1].includes(optionTrueValueIndex)) {
      // has "value" props type is not a boolean, it is bind/render as an attributes/props
      // true props will be represent by "true" string so we convert it has boolean
      // true attribute will be represent by "" string so we convert it has boolean
      // https://stenciljs.com/docs/properties
      if (['', 'true'].includes(this.value as string) && this.options.find(option => option.value) !== undefined) {
        this.value = true;
      }

      // when options are boolean values and ordered as [true,false] instead [false,true]
      // we need to reversed the checked value logic
      const selectedValue = this.value === this.options[optionTrueValueIndex].value;
      this.checked = optionTrueValueIndex === 0 ? !selectedValue : selectedValue;
    } else {
      this.checked = this.value === this.options[1].value;
    }
  }

  /*************
   * Lifecycle *
   *************/

  /**
   * Check if component props are well configured on init
   */
  componentWillLoad(): void {
    // Check items format
    this.validateItems(this.items);
    // Check slots
    this.validateSlots();
    // init checked value
    this.setChecked();
    // apply handler
    this.handleIsOnOff(this.isOnOff);
    this.handleIsIcon(this.isIcon);
    this.handleDisabled(this.disabled);
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
        required={undefined}
        readonly={this.readonly}
        mgWidth={undefined}
        disabled={this.disabled}
        value={this.value?.toString()}
        readonlyValue={this.options[this.checked ? 1 : 0].title}
        tooltip={!this.readonly && this.tooltip}
        tooltipPosition={this.tooltipPosition}
        helpText={this.helpText}
        errorMessage={this.errorMessage}
        isFieldset={false}
      >
        <button
          type="button"
          role="switch"
          aria-checked={this.checked.toString()}
          aria-readonly={this.disabled || this.readonly}
          id={this.identifier}
          class="mg-c-input__button-toggle"
          disabled={this.disabled || this.readonly}
          onClick={this.toggleChecked}
        >
          <span aria-hidden="true" class="mg-c-input__toggle-item-container">
            <slot name="item-1"></slot>
          </span>
          <span aria-hidden="true" class="mg-c-input__toggle-item-container">
            <slot name="item-2"></slot>
          </span>
        </button>
      </MgInput>
    );
  }
}
