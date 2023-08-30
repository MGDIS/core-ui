import { Component, Element, h, Prop, Watch } from '@stencil/core';
import { createID, focusableElements, getWindows } from '../../../utils/components.utils';
import { Instance as PopperInstance, createPopper, Placement } from '@popperjs/core';
import { Guard } from './mg-tooltip.conf';

/**
 * HTMLMgButtonElement type guard
 * @param element - element to check
 * @returns return true if type is HTMLMgButtonElement
 */
const isButton = (element: unknown): element is HTMLMgButtonElement => typeof element === 'object' && ['MG-BUTTON', 'BUTTON'].includes((element as Element).tagName);

@Component({
  tag: 'mg-tooltip',
  styleUrl: 'mg-tooltip.scss',
  shadow: true,
})
export class MgTooltip {
  /************
   * Internal *
   ************/

  private popper: PopperInstance;
  private mgTooltip: HTMLElement;
  private tooltipedElement: HTMLElement;
  private windows: Window[];
  private hasCustomTabIndex: boolean;

  // tooltip actions guards
  private guard: Guard;

  /**************
   * Decorators *
   **************/

  /**
   * Get component DOM element
   */
  @Element() element: HTMLMgTooltipElement;

  /**
   * Sets an `id` attribute.
   * Needed by the input for accessibility `aria-decribedby`.
   */
  @Prop() identifier: string = createID('mg-tooltip');

  /**
   * Displayed message in the tooltip
   */
  @Prop() message!: string;
  @Watch('message')
  validateMessage(newValue: string): void {
    if (typeof newValue !== 'string' || newValue.trim() === '') {
      throw new Error('<mg-tooltip> prop "message" is required.');
    }
    this.mgTooltip.querySelector('.mg-tooltip__message').innerHTML = newValue;
  }

  /**
   * Tooltip placement
   */
  @Prop() placement: Placement = 'bottom';

  /**
   * Display tooltip
   */
  @Prop({ mutable: true }) display = false;
  @Watch('display')
  handleDisplay(newValue: boolean): void {
    if (newValue) {
      this.show();
    } else {
      this.hide();
    }
  }

  /**
   * Disable tooltip
   */
  @Prop() disabled = false;
  @Watch('disabled')
  validateDisabled(newValue: MgTooltip['disabled']): void {
    if (this.hasCustomTabIndex) {
      if (newValue) this.tooltipedElement.removeAttribute('tabindex');
      else if (this.tooltipedElement.getAttribute('tabindex') === null) this.tooltipedElement.setAttribute('tabindex', '0');
    }
  }

  /**
   * Show tooltip
   */
  private show = (): void => {
    // Make the tooltip visible
    this.mgTooltip.dataset.show = '';
    // Enable the event listeners
    this.popper.setOptions(options => ({
      ...options,
      modifiers: [...options.modifiers, { name: 'eventListeners', enabled: true }],
    }));
    // hide when click outside
    // setTimeout is used to prevent event to trigger after creation
    setTimeout(() => {
      this.windows.forEach((localWindow: Window) => {
        localWindow.addEventListener('click', this.clickOutside, false);
        localWindow.addEventListener('keydown', this.pressEscape, false);
      });
    }, 0);
  };

  /**
   * Hide tooltip
   */
  private hide = (): void => {
    // Hide the tooltip
    this.mgTooltip.removeAttribute('data-show');
    // Disable the event listeners
    this.popper.setOptions(options => ({
      ...options,
      modifiers: [...options.modifiers, { name: 'eventListeners', enabled: false }],
    }));
    // Remove event listener
    this.windows.forEach((localWindow: Window) => {
      localWindow.removeEventListener('click', this.clickOutside, false);
      localWindow.removeEventListener('keyboard', this.pressEscape, false);
    });
  };

  /**
   * Check if clicked outside of component and hidde tooltip
   * @param event - mouse event
   */
  private clickOutside = (event: MouseEvent & { target: HTMLElement }): void => {
    if (event.target.closest('mg-tooltip') !== this.element) this.setDisplay(false);
  };

  /**
   * Check if 'Escape' key is pressed of component and hidde tooltip
   * @param event - keyboard event
   */
  private pressEscape = (event: KeyboardEvent): void => {
    if (event.code === 'Escape') {
      this.setDisplay(false);
      this.resetGuard();
    }
  };

  /**
   * Method to set display prop
   * @param newValue - display prop new value
   * @param condition - additionnal condition to apply display prop newValue
   */
  private setDisplay = (newValue: boolean, condition = true): void => {
    if (!this.disabled && condition) this.display = newValue;
  };

  /**
   * Action for tooltip element and tooltiped element mouse listener
   * @param elementGuard -  tooltip element guard
   * @param isMouseenter - mouseenter validation
   * @param conditionalGuard - guard condition
   */
  private tooltipMouseListenerAction = (elementGuard: Guard, isMouseenter: boolean, conditionalGuard: Guard): void => {
    // we mutate elementGuard
    if (this.guard !== Guard.FOCUS) {
      this.guard = elementGuard;
      if (!isMouseenter) {
        setTimeout(() => {
          this.setDisplay(isMouseenter, this.guard !== conditionalGuard);
          this.resetGuard();
        }, 100);
      } else if (this.guard === Guard.HOVER_TOOLTIPED_ELEMENT) {
        this.setDisplay(isMouseenter);
      }
    }
  };

  /**
   * Method to reset guard value
   */
  private resetGuard = (): void => {
    this.guard = undefined;
  };

  /**
   * Update slot content when it is a mg-button
   * @param mgButton - slotted mg-button
   */
  private setMgButtonWrapper = (mgButton: HTMLMgButtonElement): void => {
    if (mgButton.disabled) {
      const div = document.createElement('div');
      div.classList.add('mg-tooltip__mg-button-wrapper');
      mgButton.parentNode.insertBefore(div, mgButton);
      div.appendChild(mgButton);
      this.tooltipedElement = div;
    } else if (mgButton.parentElement.classList.contains('mg-tooltip__mg-button-wrapper')) {
      this.element.firstElementChild.replaceWith(mgButton);
      this.tooltipedElement = mgButton;
    }
  };

  /**
   * Init tooltip
   * @param slotElement - slotted element
   * @param interactiveElement - interactive element
   */
  private initTooltip = (slotElement: HTMLElement, interactiveElement: HTMLElement): void => {
    // Add tabindex to slotted element if we can't find any interactive element
    if (!this.disabled && !Boolean(interactiveElement)) {
      this.hasCustomTabIndex = true;
      slotElement.tabIndex = 0;
      // Add role on non-interactive element to work with "aria-describedby" for screen readers
      slotElement.setAttribute('role', 'button');
    }
    // Set aria-describedby
    const ariaDescribedby = slotElement.getAttribute('aria-describedby');

    if (ariaDescribedby === null) {
      this.tooltipedElement.setAttribute('aria-describedby', this.identifier);
    } else {
      // We ensure to have uniq ids
      slotElement.setAttribute('aria-describedby', `${[...new Set([...ariaDescribedby.split(' '), this.identifier])].join(' ')}`);
    }

    // Create popperjs tooltip
    this.popper = createPopper(this.tooltipedElement, this.mgTooltip, {
      placement: this.placement,
      strategy: 'fixed',
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 8],
          },
        },
      ],
    });

    // Manage tooltipedElement focus/blur events
    this.tooltipedElement.addEventListener('focus', () => {
      this.guard = Guard.FOCUS;
      this.setDisplay(true);
    });

    this.tooltipedElement.addEventListener('blur', () => {
      this.resetGuard();
      this.setDisplay(false);
    });

    document.addEventListener('keydown', this.pressEscape);

    // manage tooltipElement & tooltipedElement mouseenter/mouseleave events
    ['mouseenter', 'mouseleave'].forEach(eventType => {
      const isMouseenter = eventType === 'mouseenter';
      [
        { element: this.mgTooltip, action: () => this.tooltipMouseListenerAction(Guard.HOVER_TOOLTIP_ELEMENT, isMouseenter, Guard.HOVER_TOOLTIPED_ELEMENT) },
        { element: this.tooltipedElement, action: () => this.tooltipMouseListenerAction(Guard.HOVER_TOOLTIPED_ELEMENT, isMouseenter, Guard.HOVER_TOOLTIP_ELEMENT) },
      ].forEach(({ element, action }) => {
        element.addEventListener(eventType, () => {
          action();
        });
      });
    });
  };

  /**
   * Render tooltip element
   * @example
   * rendered template
   * ```
   * <div role="tooltip" id={this.identifier} class="mg-tooltip">
   *   <span innerHTML={this.message} class="mg-tooltip__message"></span>
   *   <div class="mg-tooltip__arrow" data-popper-arrow></div>
   * </div>
   * ```
   */
  private renderTooltip(): void {
    const baseElement = document.createElement('div');
    baseElement.setAttribute('id', this.identifier);
    baseElement.setAttribute('role', 'tooltip');
    baseElement.classList.add('mg-tooltip');

    const messageElement = document.createElement('span');
    messageElement.innerHTML = this.message;
    messageElement.classList.add('mg-tooltip__message');
    baseElement.appendChild(messageElement);

    const arrowElement = document.createElement('div');
    arrowElement.classList.add('mg-tooltip__arrow');
    arrowElement.dataset.popperArrow = 'true';
    baseElement.appendChild(arrowElement);

    // append tooltip element to component
    this.element.appendChild(baseElement);
  }

  /*************
   * Lifecycle *
   *************/

  /**
   * set variables
   */
  componentWillLoad(): void {
    // Get windows to attach events
    this.windows = getWindows(window);
    //validate properties
    this.validateDisabled(this.disabled);
  }

  /**
   * Get slotted element
   * Check if it already contain an interactive element, if not we need to add a tabIndex attribute
   * We need to attach the focused element to the tooltip (aria-describedby)
   */
  componentDidLoad(): void {
    this.renderTooltip();

    // Get tooltip element
    this.mgTooltip = this.element.querySelector(`#${this.identifier}`);

    // get slotted element wich is not the tooltip
    const slotElement: HTMLElement = this.element.querySelector(`*:not(#${this.identifier})`);

    // Get interactive element
    const interactiveElement: HTMLElement = slotElement.matches(focusableElements) ? slotElement : slotElement.shadowRoot?.querySelector(focusableElements);

    // define selected element to become tooltip selector
    this.tooltipedElement = interactiveElement || slotElement;

    // Check if slotted element is a disabled mg-button
    // In this case we wrap the mg-button into a div to enable the tooltip
    if (isButton(slotElement)) {
      new MutationObserver(mutationList => {
        if (mutationList.some(mutation => ['aria-disabled', 'disabled'].includes(mutation.attributeName))) {
          this.setMgButtonWrapper(slotElement);
          // Since Firefox doesn't trigger a "blur" event when the "disabled" attribute is added or removed from a button
          // we have to manually unlock the guard because the "blur" handler of the tooltipedElement won't do it.
          this.resetGuard();
          this.initTooltip(slotElement, interactiveElement);
        }
      }).observe(slotElement, { attributes: true });
      this.setMgButtonWrapper(slotElement);
    }

    // Init Tooltip
    this.initTooltip(slotElement, interactiveElement);

    this.handleDisplay(this.display);
    this.validateMessage(this.message);
  }

  /**
   * update popper position after props change on component did update hook to benefit from render ended
   */
  componentDidUpdate(): void {
    this.popper.update();
  }

  /**
   * Render
   * @returns HTML Element
   */
  render(): HTMLElement {
    return <slot></slot>;
  }
}
