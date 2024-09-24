import { Component, Element, h, Prop, Watch } from '@stencil/core';
import { initLocales } from '../../../../locales';
import { isValideID, toString } from '@mgdis/stencil-helpers';

/**
 * @internal
 */
@Component({
  tag: 'mg-character-left',
  styleUrl: '../../../../../node_modules/@mgdis/styles/dist/components/mg-character-left.css',
  scoped: true,
})
export class MgCharacterLeft {
  /************
   * Internal *
   ************/

  private messages;

  /**************
   * Decorators *
   **************/

  /**
   * Get component DOM element
   */
  @Element() element: HTMLMgCharacterLeftElement;

  /**
   * Sets an `id` attribute.
   * Needed by the input for accessibility `aria-decribedby`.
   */
  @Prop() identifier?: string;
  @Watch('identifier')
  watchIdentifier(newValue: MgCharacterLeft['identifier']): void {
    if (newValue !== undefined && !isValideID(newValue)) {
      throw new Error(`<mg-character-left> prop "identifier" value is invalid. Passed value: ${toString(newValue)}.`);
    }
  }

  /**
   * Sets the characters to count
   */
  @Prop() characters = '';

  /**
   * Add maximum length
   */
  @Prop() maxlength!: number;
  @Watch('maxlength')
  validateMaxlength(newValue: number): void {
    if (typeof newValue !== 'number') {
      throw new Error(`<mg-character-left> prop "maxlength" is required and must be a number. Passed value: ${toString(newValue)}.`);
    }
  }

  /*************
   * Lifecycle *
   *************/

  /**
   * Check if props are well configured on init
   */
  componentWillLoad(): void {
    this.watchIdentifier(this.identifier);
    this.validateMaxlength(this.maxlength);
    this.messages = initLocales(this.element).messages;
  }

  /**
   * Render component
   * @returns HTML Element
   */
  render(): HTMLElement {
    return (
      <span id={this.identifier} aria-live="polite">
        <span aria-hidden="true">
          {this.maxlength - this.characters.length}/{this.maxlength}
        </span>
        <span class="mg-u-visually-hidden">{this.messages.nbCharLeft.replace('{counter}', this.maxlength - this.characters.length)}</span>
      </span>
    );
  }
}
