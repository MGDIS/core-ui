import { Component, Element, h, Prop, State, Watch, Host, EventEmitter, Event } from '@stencil/core';
import { variants, VariantType, ButtonType, SizeType, sizes } from './mg-button.conf';
import { ClassList, isValidString, nextTick, toString } from '@mgdis/stencil-helpers';

/**
 * @slot - Button content
 */
@Component({
  tag: 'mg-button',
  styleUrl: '../../../../node_modules/@mgdis/styles/dist/components/mg-button.css',
  shadow: true,
})
export class MgButton {
  /************
   * Internal *
   ************/

  private onClickElementFn = null;
  private readonly classDisabled = 'mg-c-button--disabled';
  private readonly classLoading = 'mg-c-button--loading';
  private readonly classFullWidth = 'mg-c-button--full-width';

  /**************
   * Decorators *
   **************/

  /**
   * Get component DOM element
   */
  @Element() element: HTMLMgButtonElement;

  /**
   * Define button variant
   */
  @Prop({ mutable: true }) variant: VariantType = variants[0]; // Primary
  @Watch('variant')
  validateVariant(newValue: VariantType, oldValue?: VariantType): void {
    // validate new value
    if (!variants.includes(newValue)) {
      if ((newValue as string) === '') {
        // Reactive framework like VUE render with `""` when prop is update to undefined
        this.variant = variants[0];
        return;
      }
      throw new Error(`<mg-button> prop "variant" must be one of: ${variants.join(', ')}. Passed value: ${toString(newValue)}.`);
    } else {
      if (oldValue !== undefined) {
        this.classCollection.delete(`mg-c-button--${oldValue}`);
      }
      this.classCollection.add(`mg-c-button--${newValue}`);
    }
  }

  /**
   * aria-label
   * In case button text is not explicit enough
   */
  @Prop() label?: string;

  /**
   * Define button type
   */
  @Prop() type?: ButtonType;

  /**
   * Define button size
   */
  @Prop() size: SizeType = sizes[0]; // medium
  @Watch('size')
  validateSize(newValue: MgButton['size'], oldValue?: MgButton['size']): void {
    // validate new value
    if (!sizes.includes(newValue)) {
      throw new Error(`<mg-button> prop "size" must be one of: ${sizes.join(', ')}. Passed value: ${toString(newValue)}.`);
    } else {
      if (oldValue !== undefined) {
        this.classCollection.delete(`mg-c-button--${oldValue}`);
      }
      this.classCollection.add(`mg-c-button--${newValue}`);
      this.setIconSize();
    }
  }

  /**
   * Set button to full-width
   */
  @Prop() fullWidth = false;
  @Watch('fullWidth')
  validateFullWidth(newValue: MgButton['fullWidth']): void {
    if (newValue && this.isIcon) {
      throw new Error('<mg-button> prop "fullWidth" cannot be used with prop "isIcon".');
    } else if (newValue) {
      this.classCollection.add(this.classFullWidth);
    } else {
      this.classCollection.delete(this.classFullWidth);
    }
  }

  /**
   * Define form id to attach button with.
   * If this attribute is not set, the `<button>` is associated with its ancestor `<form>` element.
   */
  @Prop() form?: string;

  /**
   * Disable button
   */
  @Prop({ mutable: true }) disabled?: boolean;
  @Watch('disabled')
  disabledHandler(isDisabled: MgButton['disabled']): void {
    // Remove loading when enable
    // Will be set back onclick
    if (!isDisabled && this.disableOnClick) {
      this.loading = false;
    }
    // Manage if onclick
    this.element.onclick = isDisabled ? undefined : this.onClickElementFn;

    // apply style
    if (isDisabled) {
      this.classCollection.add(this.classDisabled);
    } else {
      this.classCollection.delete(this.classDisabled);
    }

    // emit value update
    this.disabledChange.emit(isDisabled);
  }
  /**
   * Define if button is round.
   * Used for icon button.
   */
  @Prop() isIcon = false;
  @Watch('isIcon')
  watchIsIcon(): void {
    this.setIconSize();
  }

  /**
   * Option to set input disable on click, in order to prevent multi-click.
   * Parent component have to remove the attribute 'disabled' when the process ends.
   */
  @Prop() disableOnClick = false;

  /**
   * Define if button is loading, default to false.
   * Trigger when button is clicked or key-up ['enter', 'space], then value change to true.
   * It's required to reset to false when action/promise in parent is done to stop the loading state
   */
  @State() loading = false;
  @Watch('loading')
  loadingHandler(newValue: MgButton['loading']): void {
    // we add loading style if it newvalue is true else we remove it
    if (newValue) {
      this.classCollection.add(this.classLoading);
    } else {
      this.classCollection.delete(this.classLoading);
    }
  }

  /**
   * Component classes
   */
  @State() classCollection: ClassList = new ClassList(['mg-c-button']);

  /**
   * Emmited event when disabled change
   */
  @Event({ eventName: 'disabled-change' }) disabledChange: EventEmitter<HTMLMgButtonElement['disabled']>;

  /**
   * Trigger actions onClick event
   * @param event - click event
   */
  private handleClick = (event: MouseEvent): void => {
    if (this.disabled) event.stopPropagation();
    // Used to prevent multi-click.
    else if (this.disableOnClick) {
      this.loading = true;
      this.disabled = true;
    }
  };

  /**
   * Handle onKeydown event
   * @param event - keyboard event
   */
  private handleKeydown = (event: KeyboardEvent): void => {
    if (!this.disabled && event.key === ' ') {
      event.preventDefault();
    } else if (!this.disabled && ['Enter', 'NumpadEnter', 'Space'].includes(event.key)) {
      event.preventDefault();
      this.element.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    }
  };

  /**
   * Handle onKeyup event
   * @param event - keyboard event
   */
  private handleKeyup = (event: KeyboardEvent): void => {
    if (!this.disabled && event.key === ' ') {
      event.preventDefault();
      this.element.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    }
  };

  /**
   * Set child `<mg-icon>` element `size` prop to follow the current `size` prop
   */
  private setIconSize = (): void => {
    if (this.size === 'medium') {
      this.element.querySelector('mg-icon')?.removeAttribute('size');
    } else if (this.isIcon) {
      this.element.querySelector('mg-icon')?.setAttribute('size', this.size);
    }
  };

  /**
   * Check if props are well configured on init
   */
  componentWillLoad(): void {
    this.validateVariant(this.variant);
    this.validateFullWidth(this.fullWidth);
    this.validateSize(this.size);
    this.watchIsIcon();
    if (this.isIcon) {
      this.classCollection.add(`mg-c-button--icon`);
      if (!isValidString(this.label)) {
        throw new Error(`<mg-button> prop "label" is mandatory when prop "isIcon" is set to true.`);
      }
    }
    // Store the onclick fn
    this.onClickElementFn = this.element.onclick;
    this.disabledHandler(this.disabled);
  }

  /**
   * Add listners
   */
  componentDidLoad(): void {
    nextTick(() => {
      const closestForm = this.element.closest('form') || this.element.closest('mg-form')?.shadowRoot.querySelector('form');
      // submit buttons should trigger form submition;
      if (closestForm && ['submit', undefined].includes(this.type)) {
        this.element.addEventListener('click', () => {
          closestForm.dispatchEvent(new SubmitEvent('submit', { bubbles: true, cancelable: true }));
        });
      }
    });
  }

  /**
   * Render component
   * @returns html element
   */
  render(): HTMLElement {
    return (
      <Host
        role="button"
        tabIndex={0}
        type={this.type}
        form={this.form}
        full-width={this.fullWidth}
        aria-label={this.label}
        aria-disabled={this.disabled?.toString()}
        onClick={this.handleClick}
        onKeyup={this.handleKeyup}
        onKeydown={this.handleKeydown}
      >
        <div class={this.classCollection.join()}>
          {this.loading && <mg-icon icon="loader" spin></mg-icon>}
          <div class="mg-c-button__content">
            <slot></slot>
          </div>
        </div>
      </Host>
    );
  }
}
