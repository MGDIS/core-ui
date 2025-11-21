import { Component, Event, h, Prop, EventEmitter, State, Watch, Element, Method } from '@stencil/core';
import { ClassList, allItemsAreString, isValidString, toString } from '@mgdis/core-ui-helpers/dist/utils';
import { Option as ToggleOption } from '../../../../types';
import { classDisabled, classReadonly, type TooltipPosition } from '../mg-input/mg-input.conf';

/**
 * type Option validation function
 * @param option - radio option
 * @returns toggle option type is valid
 */
const isOption = (option: unknown): option is ToggleOption =>
  typeof option === 'object' && typeof (option as ToggleOption).title === 'string' && (option as ToggleOption).value !== undefined;

/**
 * @slot item-1 - Left option toggle content
 * @slot item-2 - Right option toggle content
 */
@Component({
  tag: 'mg-input-toggle',
  styleUrl: '../../../../../node_modules/@mgdis/styles/dist/components/mg-input-toggle.css',
  shadow: true,
})
export class MgInputToggle {
  /************
   * Internal *
   ************/

  private button: HTMLButtonElement;
  // Classes
  private readonly classIsActive = 'mg-c-input--toggle-is-active';
  private readonly classOnOff = 'mg-c-input--toggle-on-off';
  private readonly classIcon = 'mg-c-input--toggle-icon';

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
  @Prop({ mutable: true }) value: ToggleOption['value'];
  @Watch('value')
  watchValue(newValue: MgInputToggle['value'], oldValue?: MgInputToggle['value']): void {
    // A "true" attribute can be represented by an empty string
    // We need to convert it to a boolean true value
    if (newValue === '') {
      this.value = true;
      // Return early to prevent infinite loop
      return;
    }
    // https://stenciljs.com/docs/properties
    // According to the Stencil documentation, when a prop is declared as `any`, boolean values can be bound as boolean attributes.
    // However, depending on the integration context (e.g., Vue.js), they may also be interpreted as string attributes.
    // To avoid incorrect type interpretation when a boolean is received as a string,
    // we normalize the value and convert it to a proper boolean before internal use.
    else if (['true', 'false'].includes(newValue as string) && this.options.every(option => typeof option.value === 'boolean')) {
      this.value = newValue === 'true';
      // Return early to prevent infinite loop
      return;
    }

    if (this.isChecked(newValue)) {
      this.classCollection.add(this.classIsActive);
    } else {
      this.classCollection.delete(this.classIsActive);
    }

    // when value is reassigned programmatically from previous `watchValue` call
    // `oldValue` can be a string while `newValue` is boolean or vice versa
    // so we need to compare them as strings to prevent infinite loop and unnecessary event emission
    if (toString(newValue) !== toString(oldValue)) {
      // Emit value-change event
      this.valueChange.emit(newValue);
    }
  }

  /**
   * Items are the possible options to select
   */
  @Prop() items!: string[] | ToggleOption[];
  @Watch('items')
  watchItems(newValue: MgInputToggle['items']): void {
    if (typeof newValue === 'object' && this.items.length !== 2) {
      throw new Error(`<mg-input-toggle> prop "items" require 2 items. Passed value: ${toString(newValue)}.`);
    }
    // String array
    else if (allItemsAreString(newValue)) {
      this.options = newValue.map(item => ({ title: item, value: item }));
    }
    // Object array
    else if (Array.isArray(newValue) && newValue.every(isOption)) {
      this.options = newValue;
    } else {
      throw new Error(`<mg-input-toggle> prop "items" is required and all items must be the same type: ToggleOption. Passed value: ${toString(newValue)}.`);
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
  @Prop() labelOnTop = false;

  /**
   * Define if label is visible
   */
  @Prop() labelHide = false;

  /**
   * Define if toggle have on/off style,
   * the left icon is hidden.
   * Only available in combination with the "isIcon" prop.
   */
  @Prop({ mutable: true }) isOnOff = false;
  @Watch('isOnOff')
  watchIsOnOff(newValue: MgInputToggle['isOnOff']): void {
    if (newValue) {
      this.classCollection.add(this.classOnOff);
      if (!this.isIcon) {
        this.isOnOff = false;
        console.warn('<mg-input-toggle> prop "isOnOff" must be used with "isIcon". Setting isOnOff to false.');
      }
    } else {
      this.classCollection.delete(this.classOnOff);
    }
  }

  /**
   * Define if toggle display icon
   */
  @Prop() isIcon = false;
  @Watch('isIcon')
  watchIsIcon(newValue: MgInputToggle['isIcon']): void {
    if (newValue) this.classCollection.add(this.classIcon);
    else this.classCollection.delete(this.classIcon);
  }

  /**
   * Define if input is readonly
   */
  @Prop() readonly = false;
  @Watch('readonly')
  watchReadonly(newValue: MgInputToggle['readonly']): void {
    if (newValue) this.classCollection.add(classReadonly);
    else this.classCollection.delete(classReadonly);
  }

  /**
   * Define if input is disabled
   */
  @Prop() disabled = false;
  @Watch('disabled')
  watchDisabled(newValue: MgInputToggle['disabled']): void {
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
   * Component classes
   */
  @State() classCollection: ClassList = new ClassList(['mg-c-input--toggle']);

  /**
   * Formated items for display
   */
  @State() options: ToggleOption[];

  /**
   * Error message to display
   */
  @State() errorMessage: string;

  /**
   * Define input valid state
   */
  @State() valid: boolean;

  /**
   * Emited event when value change
   */
  @Event({ eventName: 'value-change' }) valueChange: EventEmitter<HTMLMgInputToggleElement['value']>;

  /**
   * Emited event when checking validity
   */
  @Event({ eventName: 'input-valid' }) inputValid: EventEmitter<boolean>;

  /**
   * Set focus on input.
   */
  @Method()
  async setFocus(): Promise<void> {
    this.button?.focus();
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
  async setError(valid: boolean, errorMessage?: string): Promise<void> {
    if (typeof valid !== 'boolean') {
      throw new Error('<mg-input-toggle> method "setError()" param "valid" must be a boolean.');
    } else if (errorMessage !== undefined && !isValidString(errorMessage)) {
      throw new Error('<mg-input-toggle> method "setError()" param "errorMessage" must be a string.');
    } else {
      this.valid = valid;
      this.inputValid.emit(valid);
      this.setErrorMessage(valid ? undefined : errorMessage);
    }
  }

  /**
   * Reset value, validity, error and visual state
   */
  @Method()
  async reset(): Promise<void> {
    if (!this.readonly) {
      this.value = this.options[0].value;
      // Use `Promise` as requested for stencil method
      // Use `requestAnimationFrame` to ensure:
      // - DOM is fully updated before validation
      // - Async operations are completed
      // - No timing issues with Stencil's render cycle
      // - Keep everything in sync both inside and outside the component
      return new Promise(resolve => {
        requestAnimationFrame(() => {
          this.errorMessage = undefined;
          resolve();
        });
      });
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
    if (!this.valid && typeof errorMessage === 'string') {
      this.errorMessage = errorMessage;
    }
  };

  /**
   * Handle switch button to update value
   */
  private handleSwitchButton = (): void => {
    const currentOptionIndex = this.getCurrentOptionIndex(this.value);
    this.value = this.options[currentOptionIndex === 0 ? 1 : 0].value;
  };

  /**
   * Slots validation
   */
  private validateSlots = (): void => {
    const slots = Array.from(this.element.children);
    // validate slots
    if (slots.length !== 2) {
      if (this.isOnOff && this.isIcon) {
        // ONLY slot="item-2" is required in with isOnOff && isIcon
        if (this.element.querySelector('[slot="item-2"]') === null) {
          throw new Error('<mg-input-toggle> an element with attribute slot="item-2" is required.');
        }
      } else {
        throw new Error('<mg-input-toggle> 2 slots are required.');
      }
    }

    // update slots
    if (!this.isIcon) {
      // Due to text-overflow set to ellipsis
      // we need to ensure that slot element have title to display value on mouse over
      slots.forEach(slot => slot.setAttribute('title', slot.textContent));
    } else {
      slots.forEach(slot => {
        if (slot.nodeName === 'MG-ICON') {
          (slot as HTMLMgIconElement).size = 'small';
        }
      });
    }
  };

  /**
   * Get checked item
   * @param checked - checked item
   * @returns toggle value
   */
  private getCurrentOptionIndex = (value: MgInputToggle['value']): number => {
    return this.options.findIndex(option => toString(option.value) === toString(value)) === 1 ? 1 : 0;
  };

  /**
   * Check if value is checked
   * @param value - toggle value
   * @returns truthy if value is checked
   */
  private isChecked = (value: MgInputToggle['value']): boolean => {
    return this.getCurrentOptionIndex(value) === 1;
  };

  /*************
   * Lifecycle *
   *************/

  /**
   * Check if component props are well configured on init
   */
  componentWillLoad(): void {
    this.watchItems(this.items);
    this.validateSlots();
    this.watchValue(this.value);
    this.watchIsIcon(this.isIcon);
    this.watchIsOnOff(this.isOnOff);
    this.watchReadonly(this.readonly);
    this.watchDisabled(this.disabled);
  }

  /**
   * Render
   * @returns HTML Element
   */
  render(): HTMLElement {
    const currentOption = this.options[this.getCurrentOptionIndex(this.value)];
    return (
      <mg-input
        label={this.label}
        helpText={this.helpText}
        identifier={this.identifier}
        class={this.classCollection.join()}
        labelOnTop={this.labelOnTop}
        labelHide={this.labelHide}
        required={undefined}
        tooltip={this.tooltip}
        tooltipPosition={this.tooltipPosition}
        errorMessage={this.errorMessage}
      >
        {this.readonly ? (
          currentOption && <b class="mg-c-input__readonly-value">{currentOption.title}</b>
        ) : (
          <button
            type="button"
            role="switch"
            aria-checked={this.isChecked(this.value).toString()}
            aria-readonly={this.disabled || this.readonly}
            id={this.identifier}
            class="mg-c-input__button-toggle"
            disabled={this.disabled || this.readonly}
            onClick={this.handleSwitchButton}
            ref={el => {
              if (el !== null) this.button = el;
            }}
          >
            <span aria-hidden="true" class="mg-c-input__toggle-item-container">
              <slot name="item-1"></slot>
            </span>
            <span aria-hidden="true" class="mg-c-input__toggle-item-container">
              <slot name="item-2"></slot>
            </span>
          </button>
        )}
      </mg-input>
    );
  }
}
