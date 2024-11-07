import { Component, h, Host, Prop, Watch } from '@stencil/core';
import { isValidNumber, isValidString, toString } from '@mgdis/stencil-helpers';
import { AriaRoleType, roles } from './mg-progress.conf';

@Component({
  tag: 'mg-progress',
  styleUrl: '../../../../node_modules/@mgdis/styles/dist/components/mg-progress.css',
  shadow: true,
})
export class MgProgress {
  /**************
   * Decorators *
   **************/

  /**
   * Define label
   */
  @Prop() label!: string;
  @Watch('label')
  watchLabel(newValue: MgProgress['label']): void {
    if (!isValidString(newValue)) {
      throw new Error(`<mg-progress> prop "label" must be a valid string. Passed value: ${toString(newValue)}.`);
    }
  }

  /**
   * Define progress role
   * - `progressbar` to indicate a progress, such as loading or percent completion of a task
   * - `meter` to indicate a graphical display of a numeric value that varies within a defined range
   */
  @Prop() ariaRole?: AriaRoleType = 'progressbar';
  @Watch('ariaRole')
  watchAriaRole(newValue: MgProgress['ariaRole']): void {
    if (newValue && !roles.includes(newValue)) {
      throw new Error(`<mg-progress> prop "ariaRole" must be one of: ${roles.join(', ')}. Passed value: ${toString(newValue)}.`);
    }
  }

  /**
   * Define current value
   * By default, it will be displayed as a percentage value.
   * If you don’t specify the min and max props, the value should be a number within the range of 0 to 100.
   */
  @Prop() value?: number = 0;
  @Watch('value')
  watchValue(newValue: MgProgress['value']): void {
    if (newValue !== undefined && (!isValidNumber(newValue) || !(newValue >= this.min && newValue <= this.max)))
      throw new Error(`<mg-progress> prop “value” must be a number within the range ${this.min} to ${this.max}. Passed value: ${toString(newValue)}.`);
  }

  /**
   * Define the minimum value in the range
   */
  @Prop() min?: number = 0;
  @Watch('min')
  watchMin(newValue: MgProgress['min']): void {
    if (newValue !== 0 && newValue !== undefined && (!isValidNumber(newValue) || newValue >= this.max))
      throw new Error(`<mg-progress> prop “min” must be a number lower than: ${this.max}. Passed value: ${toString(newValue)}.`);
  }

  /**
   * Define the maximum value in the range
   */
  @Prop() max?: number = 100;
  @Watch('min')
  watchMax(newValue: MgProgress['max']): void {
    if (newValue !== 100 && newValue !== undefined && (!isValidNumber(newValue) || newValue <= this.min))
      throw new Error(`<mg-progress> prop “max” must be a number greater than: ${this.min}. Passed value: ${toString(newValue)}.`);
  }

  /*************
   * Lifecycle *
   *************/

  /**
   * Check if component props are well configured on init
   */
  componentWillLoad(): void {
    // validate props
    this.watchLabel(this.label);
    this.watchAriaRole(this.ariaRole);
    this.watchMin(this.min);
    this.watchMax(this.max);
    this.watchValue(this.value);
  }

  /**
   * Render
   * @returns HTML Element
   */
  render(): HTMLElement {
    return (
      <Host role={this.ariaRole} aria-label={this.label} aria-valuenow={this.value} aria-valuemin={this.min} aria-valuemax={this.max}>
        <div class="mg-c-progress">
          <div class={{ 'mg-c-progress__bar': true, 'mg-c-progress__bar--active': this.value > this.min }}>
            <div
              class="mg-c-progress__fill"
              style={{
                width: `${Math.round(((this.value - this.min) / (this.max - this.min)) * 100)}%`,
              }}
            ></div>
          </div>
        </div>
      </Host>
    );
  }
}
