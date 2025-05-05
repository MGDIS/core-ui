import { Component, Element, Event, EventEmitter, h, Prop, State, Watch, forceUpdate } from '@stencil/core';
import { ClassList, toString } from '@mgdis/core-ui-helpers/stencil';
import { variants, variantStyles, VariantStyleType, VariantType } from './mg-alert.conf';
import { initLocales } from '../../../locales';

/**
 * @slot - Alert content
 * @slot actions - Actions content
 */
@Component({
  tag: 'mg-alert',
  styleUrl: '../../../../node_modules/@mgdis/styles/dist/components/mg-alert.css',
  shadow: true,
})
export class MgAlert {
  /************
   * Internal *
   ************/

  // Classes
  private readonly classCloseButton = 'mg-c-alert--close-button';

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
  @Element() element: HTMLMgAlertElement;

  /**
   * Add a delay to hide/close message when it passed
   * Value is defined in seconds and must greater than 2 seconds
   */
  @Prop() delay?: number;
  @Watch('delay')
  watchDelay(newValue: MgAlert['delay']): void {
    if (newValue !== undefined && newValue < 2) {
      throw new Error(`<mg-alert> prop "delay" must be greater than 2 seconds. Passed value: ${toString(newValue)}.`);
    }
  }

  /**
   * Define variant
   */
  @Prop() variant?: VariantType = 'info';
  @Watch('variant')
  watchVariant(newValue: MgAlert['variant']): void {
    if (newValue && !variants.includes(newValue)) {
      throw new Error(`<mg-alert> prop "variant" must be one of: ${variants.join(', ')}. Passed value: ${toString(newValue)}.`);
    }
  }

  /**
   * Define variant style
   */
  @Prop() variantStyle?: VariantStyleType = 'bar-left';
  @Watch('variantStyle')
  watchVariantStyle(newValue: MgAlert['variantStyle']): void {
    if (newValue && !variantStyles.includes(newValue)) {
      throw new Error(`<mg-alert> prop "variantStyle" must be one of: ${variantStyles.join(', ')}. Passed value: ${toString(newValue)}.`);
    }
  }

  /**
   * Watch hidden prop
   */
  // eslint-disable-next-line @stencil-community/no-unused-watch
  @Watch('hidden')
  watchHidden(newValue: boolean): void {
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
    forceUpdate(this);
  }

  /**
   * Component classes
   */
  @State() classCollection: ClassList = new ClassList(['mg-c-alert']);

  /**
   * Define if component is using actions slot
   */
  @State() hasActions = false;

  /**
   * Emited event when alert is diplayed
   */
  @Event({ eventName: 'component-show' }) componentShow: EventEmitter<void>;

  /**
   * Emited event when alert is hidden
   */
  @Event({ eventName: 'component-hide' }) componentHide: EventEmitter<void>;

  /**
   * Emmited event when alert is closed
   */
  @Event({ eventName: 'component-close' }) componentClose: EventEmitter<void>;

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
    this.componentClose.emit();
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
    this.watchVariant(this.variant);
    this.watchVariantStyle(this.variantStyle);
    this.watchDelay(this.delay);
    this.watchHidden(this.element.hidden);
    // Check if component has actions slot
    this.hasActions = this.element.querySelector('[slot="actions"]') !== null;
    if (!this.hasActions) {
      this.classCollection.add(this.classCloseButton);
    }
  }

  /**
   * Render
   * @returns HTML Element
   */
  render(): HTMLElement {
    return (
      <mg-message
        class={this.classCollection.join()}
        role={['info', 'success'].includes(this.variant) ? 'status' : 'alert'}
        variant={this.variant}
        variantStyle={this.variantStyle}
      >
        <slot></slot>
        {this.hasActions ? (
          <span slot="actions">
            <slot name="actions"></slot>
          </span>
        ) : (
          <span class="mg-c-alert__close-button">
            <mg-button is-icon variant="flat" label={this.messages.alert.closeButton} onClick={this.handleClose}>
              <mg-icon icon="cross"></mg-icon>
            </mg-button>
          </span>
        )}
      </mg-message>
    );
  }
}
