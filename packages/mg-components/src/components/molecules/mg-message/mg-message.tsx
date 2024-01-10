import { Component, Element, Event, EventEmitter, h, Prop, State, Watch } from '@stencil/core';
import { createID, ClassList } from '../../../utils/components.utils';
import { variants, VariantType } from './mg-message.conf';
import { initLocales } from '../../../locales';
import { type MgIcon } from '../../atoms/mg-icon/mg-icon';

@Component({
  tag: 'mg-message',
  styleUrl: '../../../../node_modules/@mgdis/styles/dist/components/mg-message.css',
  shadow: true,
})
export class MgMessage {
  /************
   * Internal *
   ************/

  // IDs
  private closeButtonId = '';

  // Stored timer setted when hide action is run from setTimeOut
  private storedTimer: ReturnType<typeof setTimeout> = null;

  // Manage hover
  private isFocused = false;
  private isHovered = false;

  // Locales
  private messages;

  /**************
   * Decorators *
   **************/

  /**
   * Get component DOM element
   */
  @Element() element: HTMLMgMessageElement;

  /**
   * Identifier is used for the element ID (id is a reserved prop in Stencil.js)
   * If not set, it will be created.
   */
  @Prop() identifier: string = createID('mg-message');

  /**
   * Add a delay to hide/close message when it passed
   * Value is defined in seconds and must greater than 2 seconds (PDA9-314 RG-06)
   */
  @Prop() delay: number;
  @Watch('delay')
  validateDelay(newValue: MgMessage['delay']): void {
    if (newValue !== undefined && newValue < 2) {
      throw new Error(`<mg-message> prop "delay" must be greater than 2 seconds.`);
    }
  }

  /**
   * Message variant
   */
  @Prop() variant: VariantType = variants[0]; // info
  @Watch('variant')
  validateVariant(newValue: MgMessage['variant'], oldValue?: MgMessage['variant']): void {
    if (!variants.includes(newValue)) {
      throw new Error(`<mg-message> prop "variant" must be one of: ${variants.join(', ')}`);
    } else {
      if (oldValue !== undefined) {
        this.classCollection.delete(`mg-c-message--${oldValue}`);
      }
      this.classCollection.add(`mg-c-message--${newValue}`);
    }
  }

  /**
   * Define if message has a cross button
   * RG 01: https://jira.mgdis.fr/browse/PDA9-140
   */
  @Prop({ mutable: true }) closeButton = false;
  @Watch('closeButton')
  validateCloseButton(newValue: MgMessage['closeButton']): void {
    if (newValue && this.hasActions) {
      this.closeButton = false;
      throw new Error('<mg-message> prop "close-button" can\'t be used with the actions slot.');
    }
  }

  /**
   * Watch hidden prop
   */
  // eslint-disable-next-line @stencil-community/no-unused-watch
  @Watch('hidden')
  validateHidden(newValue: boolean): void {
    if (typeof newValue === 'string' && newValue === '') {
      newValue = true;
    }

    if (newValue) {
      this.componentHide.emit();
      // Remove event Listener
      ['focusin', 'mouseenter'].forEach(event => {
        this.element.removeEventListener(event, this.timerEvents);
      });
      // Clear Timer
      this.clearTimer();
    } else {
      this.componentShow.emit();
      // If delay is set
      if (this.delay > 1) {
        // Start timer
        this.setTimer();
        // Stop timer when get focus or mouse enter
        ['focusin', 'mouseenter'].forEach(event => {
          this.element.addEventListener(event, this.timerEvents);
        });
      }
    }
    // forceUpdate(this);
  }

  /**
   * Define if aria role is unset
   * For a11y reasons, `<mg-message />` was design for `alert` needs with attached semantic role: `status`, `alert`.
   * By toggle this props to `true`, you can unset the role to benefit from the template without any semantic role.
   * Be careful to set the mode according to the context needs.
   */
  @Prop() noAriaRole: boolean;

  /**
   * Component classes
   */
  @State() classCollection: ClassList = new ClassList(['mg-c-message']);

  /**
   * Define if component is using actions slot
   */
  @State() hasActions = false;

  /**
   * Emited event when message is diplayed
   */
  @Event({ eventName: 'component-show' }) componentShow: EventEmitter<void>;

  /**
   * Emited event when message is hidden
   */
  @Event({ eventName: 'component-hide' }) componentHide: EventEmitter<void>;

  /**
   * Set timer
   */
  private setTimer = (): void => {
    this.storedTimer = setTimeout(() => (this.element.hidden = true), this.delay * 1000);
  };

  /**
   * Clear timer
   */
  private clearTimer = (): void => {
    clearTimeout(this.storedTimer);
  };

  /**
   * Event to add on element
   * @param event - event
   */
  private timerEvents = (event: MouseEvent | FocusEvent): void => {
    this.clearTimer();
    const isMouseEvent: boolean = event.type === 'mouseenter';
    // Needed to ensure we don't start the timer
    this[isMouseEvent ? 'isHovered' : 'isFocused'] = true;

    // Restart timer when loose focus AND mouse leave
    this.element.addEventListener(
      isMouseEvent ? 'mouseleave' : 'focusout',
      eventOut => {
        this[eventOut.type === 'mouseleave' ? 'isHovered' : 'isFocused'] = false;
        // Start timer if needed
        if (!this.isFocused && !this.isHovered) this.setTimer();
      },
      { once: true },
    );
  };

  /**
   * Handle close button
   */
  private handleClose = (): void => {
    this.element.hidden = true;
  };

  /**
   * Get icon corresponding to variant
   * @returns icon
   */
  private getIcon = (): MgIcon['icon'] => {
    switch (this.variant) {
      case 'info':
        return 'info-circle';
      case 'warning':
        return 'exclamation-triangle';
      case 'success':
        return 'check-circle';
      case 'danger':
        return 'exclamation-circle';
      default:
        break;
    }
  };

  /*************
   * Lifecycle *
   *************/

  /**
   * Check if component props are well configured on init
   */
  componentWillLoad(): void {
    // Get locales
    this.messages = initLocales(this.element).messages;
    // Validate
    this.validateVariant(this.variant);
    // Check if close button is an can be activated
    this.hasActions = this.element.querySelector('[slot="actions"]') !== null;
    this.validateCloseButton(this.closeButton);
    if (this.closeButton) {
      this.classCollection.add('mg-c-message--close-button');
      this.closeButtonId = `${this.identifier}-close-button`;
    }
    this.validateDelay(this.delay);
    this.validateHidden(this.element.hidden);
  }

  /**
   * Render
   * @returns HTML Element
   */
  render(): HTMLElement {
    let role: string;

    if (!this.noAriaRole) role = this.variant === 'info' ? 'status' : 'alert';

    return (
      <div id={this.identifier} class={this.classCollection.join()} role={role}>
        <mg-card variant={this.variant} variant-style="bar-left">
          <span class="mg-c-message__icon">
            <mg-icon icon={this.getIcon()}></mg-icon>
          </span>
          <div class="mg-c-message__content">
            <span class="mg-c-message__content-slot">
              <slot></slot>
            </span>
            {this.hasActions && <span class="mg-c-message__content-separator"></span>}
            {this.hasActions && (
              <span class="mg-c-message__content-actions-slot">
                <slot name="actions"></slot>
              </span>
            )}
          </div>
          {this.closeButton && (
            <span class="mg-c-message__close-button">
              <mg-button identifier={this.closeButtonId} is-icon variant="flat" label={this.messages.message.closeButton} onClick={this.handleClose}>
                <mg-icon icon="cross"></mg-icon>
              </mg-button>
            </span>
          )}
        </mg-card>
      </div>
    );
  }
}
