import { Component, Element, h, Host, Prop, Watch } from '@stencil/core';
import { createID, focusableElements, getWindows, isValideID, isValidString, nextTick, toString } from '@mgdis/stencil-helpers';
import { computePosition, autoUpdate, flip, shift, limitShift, offset, arrow, type Strategy, type Placement } from '@floating-ui/dom';
import { type GuardType, Guard, type TooltipPlacementType, isFloatingUIPlacement } from './mg-tooltip.conf';

/**
 * HTMLMgButtonElement type guard
 * @param element - element to check
 * @returns return true if type is HTMLMgButtonElement
 */
const isButton = (element: unknown): element is HTMLMgButtonElement => typeof element === 'object' && ['MG-BUTTON', 'BUTTON'].includes((element as Element).tagName);

/**
 * @slot - Element that will display the tooltip
 */
@Component({
  tag: 'mg-tooltip',
  styleUrl: '../../../../node_modules/@mgdis/styles/dist/components/mg-tooltip.css',
  shadow: true,
})
export class MgTooltip {
  /************
   * Internal *
   ************/

  private mgTooltipContent: HTMLMgTooltipContentElement;
  private tooltipedElement: HTMLElement;
  private arrowEelement: HTMLElement;
  private windows: Window[];
  private hasCustomTabIndex: boolean;
  private tooltipStrategy: Strategy;

  // tooltip actions guards
  private guard: GuardType;

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
  @Watch('identifier')
  watchIdentifier(newValue: MgTooltip['identifier']): void {
    if (!isValideID(newValue)) {
      throw new Error(`<mg-tooltip> prop "identifier" value is invalid. Passed value: ${toString(newValue)}.`);
    }
    // use renderTooltipContent to update tooltip-content id
    this.renderTooltipContent();
  }

  /**
   * Displayed message in the tooltip
   */
  @Prop() message!: string;
  @Watch('message')
  watchMessage(newValue: MgTooltip['message']): void {
    if (!isValidString(newValue)) {
      throw new Error(`<mg-tooltip> prop "message" is required and must be a string. Passed value: ${toString(newValue)}.`);
    }
    if (this.mgTooltipContent !== undefined) this.mgTooltipContent.message = newValue;
  }

  /**
   * Tooltip placement
   */
  @Prop({ mutable: true }) placement: TooltipPlacementType = 'bottom';
  @Watch('placement')
  watchPlacement(newValue: MgTooltip['placement']): void {
    if (!isFloatingUIPlacement(newValue)) this.placement = 'bottom';
  }

  /**
   * Display tooltip
   */
  @Prop({ mutable: true }) display = false;
  @Watch('display')
  watchDisplay(newValue: MgTooltip['display']): void {
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
  watchDisabled(newValue: MgTooltip['disabled']): void {
    if (this.hasCustomTabIndex) {
      if (newValue) this.tooltipedElement.removeAttribute('tabindex');
      else if (!this.tooltipedElement.hasAttribute('tabindex')) this.tooltipedElement.setAttribute('tabindex', '0');
    }
  }

  /**
   * Show tooltip
   */
  private show = (): void => {
    // Make the tooltip visible
    this.mgTooltipContent.dataset.show = '';
    // hide when click outside on nextTick to prevent event to trigger after creation
    nextTick(() => {
      this.windows.forEach((localWindow: Window) => {
        localWindow.addEventListener('click', this.handleClickOutside, false);
        localWindow.addEventListener('keydown', this.handlePressEscape, false);
      });
    });
    this.updateTooltip();
  };

  /**
   * Hide tooltip
   */
  private hide = (): void => {
    // Hide the tooltip
    this.mgTooltipContent.removeAttribute('data-show');
    // Remove event listener
    this.windows.forEach((localWindow: Window) => {
      localWindow.removeEventListener('click', this.handleClickOutside, false);
      localWindow.removeEventListener('keyboard', this.handlePressEscape, false);
    });
  };

  /**
   * Check if clicked outside of component and hide tooltip
   * @param event - mouse event
   */
  private handleClickOutside = (event: MouseEvent & { target: HTMLElement }): void => {
    if (event.target.closest('mg-tooltip') !== this.element) this.setDisplay(false);
  };

  /**
   * Check if 'Escape' key is pressed of component and hide tooltip
   * @param event - keyboard event
   */
  private handlePressEscape = (event: KeyboardEvent): void => {
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
  private setDisplay = (newValue: MgTooltip['display'], condition = true): void => {
    if (!this.disabled && condition && this.display !== newValue) {
      this.display = newValue;
    }
  };

  /**
   * Action for tooltip element and tooltiped element mouse listener
   * @param elementGuard -  tooltip element guard
   * @param eventName - event name
   * @param conditionalGuard - guard condition
   */
  private tooltipMouseListenerAction = (elementGuard: GuardType, eventName: 'mouseenter' | 'mouseleave', conditionalGuard: GuardType): void => {
    // active FOCUS guard cancel process
    if ([Guard.FOCUS, Guard.DISABLE_ON_CLICK].includes(this.guard)) {
      return;
    }

    // Update guard by element guard
    this.guard = elementGuard;

    if (eventName !== 'mouseenter') {
      // process action in the next event loop macro task
      setTimeout(() => {
        this.setDisplay(false, this.guard !== conditionalGuard);
        this.resetGuard();
      }, 100);
    } else if (this.guard === Guard.HOVER_TOOLTIPED_ELEMENT) {
      this.setDisplay(true);
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
    const buttonWrapperClass = 'mg-c-tooltip__mg-button-wrapper';
    const hasButtonWrapper = mgButton.parentElement.classList.contains(buttonWrapperClass);
    // For disabled mg-button, we need to wrap it in a new element
    // We bind handlers to this new element to keep listener features as workaround to disabled mg-button `pointer-events: none`
    // AND to prevent multiple nested wrappers from rendering when a new render is called with a disabled mg-button
    if (mgButton.disabled && !hasButtonWrapper) {
      // wrap mg-button in a div
      const div = document.createElement('div');
      div.classList.add(buttonWrapperClass);
      mgButton.parentNode.insertBefore(div, mgButton);
      div.appendChild(mgButton);

      // update tooltipElement
      this.setTooltipedElement(div);
    } else if (!mgButton.disabled && hasButtonWrapper) {
      this.element.firstElementChild.replaceWith(mgButton);

      // update tooltipElement
      this.setTooltipedElement(mgButton);
    }
  };

  private updateTooltip = () => {
    autoUpdate(
      this.tooltipedElement,
      this.mgTooltipContent,
      async () => {
        // Placement
        const { x, y, placement, middlewareData } = await computePosition(this.tooltipedElement, this.mgTooltipContent, {
          placement: this.placement as Placement,
          strategy: this.tooltipStrategy,
          middleware: [
            offset(8),
            flip(),
            shift({
              limiter: limitShift(),
            }),
            arrow({ element: this.arrowEelement }),
          ],
        });

        // Positioning
        const roundByDPR = (value: number) => {
          const dpr = window.devicePixelRatio || 1;
          return Math.round(value * dpr) / dpr;
        };

        const transforms: string[] = [];
        const tooltipX = isNaN(x) ? 0 : roundByDPR(x);
        const tooltipY = isNaN(y) ? 0 : roundByDPR(y);
        if (tooltipX !== 0) transforms.push(`translateX(${tooltipX}px)`);
        if (tooltipY !== 0) transforms.push(`translateY(${tooltipY}px)`);

        Object.assign(this.mgTooltipContent.style, {
          position: this.tooltipStrategy,
          transform: transforms.join(' '),
        });

        // Arrow positioning
        const { x: arrowX, y: arrowY } = middlewareData.arrow;

        const staticSide = {
          top: 'bottom',
          right: 'left',
          bottom: 'top',
          left: 'right',
        }[placement.split('-')[0]];

        // https://floating-ui.com/docs/arrow
        // Unlike the floating element, which has both coordinates defined at all times, the arrow only has one defined.
        // Due to this, either x or y will be undefined, depending on the side of placement.
        // The above code uses `isNaN` to check for null and undefined simultaneously.
        // Don’t remove `isNaN`, because either value can be falsy (0), causing a bug!
        const numberToPx = (number: number): string => (!isNaN(number) ? `${number}px` : '');

        Object.assign(this.arrowEelement.style, {
          left: numberToPx(arrowX),
          top: numberToPx(arrowY),
          [staticSide]: '-4px',
        });

        this.mgTooltipContent.setAttribute('data-placement', placement);
      },
      {
        layoutShift: false,
      },
    );
  };

  /**
   * Define selected element to become tooltip selector and init listeners
   * @param element - tooltiped element
   */
  private setTooltipedElement = (element: HTMLElement): void => {
    this.tooltipedElement = element;

    // Manage tooltipedElement focus events
    this.tooltipedElement.addEventListener('focus', () => {
      this.guard = Guard.FOCUS;
      this.setDisplay(true);
    });

    // as `click` event is the composition of `mousedown` and `mouseup` event,
    // and `click` event trigger `focus` event after a success `mousedown` wich set the `guard` to `Guard.FOCUS`
    // we reset the guard on `mouseup` event to unlock tooltip
    this.tooltipedElement.addEventListener('mouseup', () => {
      this.resetGuard();
    });

    this.tooltipedElement.addEventListener('blur', () => {
      this.resetGuard();
      this.setDisplay(false);
    });

    // manage tooltipElement & tooltipedElement mouseenter/mouseleave events
    this.tooltipedElement.addEventListener('mouseenter', () => {
      this.tooltipMouseListenerAction(Guard.HOVER_TOOLTIPED_ELEMENT, 'mouseenter', Guard.HOVER_TOOLTIP_ELEMENT);
    });

    this.tooltipedElement.addEventListener('mouseleave', () => {
      this.tooltipMouseListenerAction(Guard.HOVER_TOOLTIPED_ELEMENT, 'mouseleave', Guard.HOVER_TOOLTIP_ELEMENT);
    });
  };

  /**
   * Set button mutation observer
   * @param mgButton - mg-button to observe
   */
  private setMgButtonMutationObserver = (mgButton: HTMLMgButtonElement): void => {
    new MutationObserver(mutationList => {
      // stop process when none of mutations attributed is disabled
      if (!mutationList.some(mutation => ['aria-disabled', 'disabled'].includes(mutation.attributeName))) return;

      // set guard when one of mutations is for a disabled with disabled-on-click
      if (mutationList.some((mutation: MutationRecord & { target: HTMLMgButtonElement }) => mutation.target.disabled && mutation.target.disableOnClick)) {
        this.guard = Guard.DISABLE_ON_CLICK;
        return;
      }

      // update button wrapper
      this.setMgButtonWrapper(mgButton);

      // Since Firefox doesn't trigger a "blur" event when the "disabled" attribute is added or removed from a button
      // we have to manually unlock the guard because the "blur" handler of the tooltipedElement won't do it.
      this.resetGuard();

      // update Floating UI instance
      this.updateTooltip();
    }).observe(mgButton, { attributes: true });
  };

  /**
   * Set tooltiped element aria-describedby
   * @param element - element to update
   */
  private setAriaDescribedby = (element: HTMLElement): void => {
    // Set aria-describedby
    if (!element.hasAttribute('aria-describedby')) {
      this.tooltipedElement.setAttribute('aria-describedby', this.identifier);
    } else {
      // We ensure to have uniq ids
      element.setAttribute('aria-describedby', `${[...new Set([...element.getAttribute('aria-describedby').split(' '), this.identifier])].join(' ')}`);
    }
  };

  /**
   * Render tooltip content element and init listeners
   */
  private renderTooltipContent(): void {
    if (this.mgTooltipContent !== undefined) {
      this.mgTooltipContent.setAttribute('id', this.identifier);
    } else {
      this.mgTooltipContent = document.createElement('mg-tooltip-content');
      this.mgTooltipContent.setAttribute('slot', 'content');
      this.mgTooltipContent.setAttribute('id', this.identifier);

      const arrow = document.createElement('div');
      arrow.setAttribute('slot', 'arrow');
      arrow.dataset.floatingArrow = '';
      this.mgTooltipContent.appendChild(arrow);

      // manage tooltipElement & tooltipedElement mouseenter/mouseleave events
      this.mgTooltipContent.addEventListener('mouseenter', () => {
        this.tooltipMouseListenerAction(Guard.HOVER_TOOLTIP_ELEMENT, 'mouseenter', Guard.HOVER_TOOLTIPED_ELEMENT);
      });
      this.mgTooltipContent.addEventListener('mouseleave', () => {
        this.tooltipMouseListenerAction(Guard.HOVER_TOOLTIP_ELEMENT, 'mouseleave', Guard.HOVER_TOOLTIPED_ELEMENT);
      });

      // append tooltip element to component
      this.element.appendChild(this.mgTooltipContent);
    }
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

    // Get tooltip element
    this.renderTooltipContent();

    //validate properties
    this.watchPlacement(this.placement);
    this.watchDisabled(this.disabled);
    this.watchMessage(this.message);
    this.watchIdentifier(this.identifier);

    // define if the tooltip is inside a popover
    this.tooltipStrategy = this.element.closest('mg-popover') !== null ? 'absolute' : 'fixed';
  }

  /**
   * Get slotted element
   * Check if it already contain an interactive element, if not we need to add a tabIndex attribute
   * We need to attach the focused element to the tooltip (aria-describedby)
   */
  componentDidLoad(): void {
    // get slotted element wich is not the tooltip
    const slotElement: HTMLElement = this.element.querySelector(`*:not(#${this.identifier})`);

    // Get interactive element
    const interactiveElement: HTMLElement = slotElement.matches(focusableElements) ? slotElement : slotElement.shadowRoot?.querySelector(focusableElements);

    this.setTooltipedElement(interactiveElement || slotElement);

    // Set arrow element
    this.arrowEelement = this.mgTooltipContent.querySelector('[data-floating-arrow]');

    // Check if slotted element is a disabled mg-button
    // In this case we wrap the mg-button into a div to enable the tooltip
    if (isButton(slotElement)) {
      this.setMgButtonMutationObserver(slotElement);
      this.setMgButtonWrapper(slotElement);
    }

    // Add tabindex to slotted element if we can't find any interactive element
    if (!this.disabled && [undefined, null].includes(interactiveElement)) {
      this.hasCustomTabIndex = true;
      slotElement.tabIndex = 0;
      // Add role on non-interactive element to work with "aria-describedby" for screen readers
      slotElement.setAttribute('role', 'button');
    }

    // apply a11y aria
    this.setAriaDescribedby(slotElement);

    // add document keyboard handler
    document.addEventListener('keydown', this.handlePressEscape);

    // check props
    this.watchDisplay(this.display);
  }

  /**
   * update popper position after props change on component did update hook to benefit from render ended
   */
  componentDidUpdate(): void {
    this.updateTooltip();
  }

  /**
   * remove listeners
   */
  disconnectedCallback(): void {
    document.removeEventListener('keydown', this.handlePressEscape);
    this.windows?.forEach((localWindow: Window) => {
      localWindow.removeEventListener('click', this.handleClickOutside, false);
      localWindow.removeEventListener('keydown', this.handlePressEscape, false);
    });
    this.updateTooltip?.();
  }

  /**
   * Render
   * @returns HTML Element
   */
  render(): HTMLElement {
    return (
      <Host>
        <slot></slot>
        <slot name="content"></slot>
      </Host>
    );
  }
}
