import { Component, Element, Host, h, Prop, Watch, EventEmitter, Event } from '@stencil/core';
import { createID, getWindows, isValideID, toString } from '@mgdis/stencil-helpers';
import { computePosition, autoUpdate, flip, shift, limitShift, offset, arrow, type Placement } from '@floating-ui/dom';

/**
 * @slot - Element that will display the popover
 * @slot content - popover content
 */
@Component({
  tag: 'mg-popover',
  styleUrl: '../../../../node_modules/@mgdis/styles/dist/components/mg-popover.css',
  shadow: true,
})
export class MgPopover {
  /************
   * Internal *
   ************/

  private mgPopover: HTMLElement;
  private mgPopoverContent: HTMLMgPopoverContentElement;
  private windows: Window[];
  private floatingUICleanup: () => void;

  /**************
   * Decorators *
   **************/

  /**
   * Get component DOM element
   */
  @Element() element: HTMLMgPopoverElement;

  /**
   * Sets an `id` attribute.
   * Needed by the input for accessibility `aria-decribedby`.
   */
  @Prop() identifier: string = createID('mg-popover');
  @Watch('identifier')
  validateIdentifier(newValue: MgPopover['identifier']): void {
    if (!isValideID(newValue)) {
      throw new Error(`<mg-popover> prop "identifier" value is invalid. Passed value: ${toString(newValue)}.`);
    }
    // use renderPopoverContent to update popover-content id
    this.renderPopoverContent();
  }

  /**
   * Popover placement
   */
  @Prop() placement: Placement = 'bottom';

  /**
   * Hide popover arrow
   */
  @Prop() arrowHide = false;
  @Watch('arrowHide')
  validateArrowHide(newValue: MgPopover['arrowHide']): void {
    if (newValue) this.mgPopoverContent.dataset.arrowHide = '';
    else delete this.mgPopoverContent.dataset.arrowHide;
  }

  /**
   * Define if popover has a cross button
   */
  @Prop() closeButton = false;
  @Watch('closeButton')
  validateCloseButton(newValue: MgPopover['closeButton']): void {
    this.mgPopoverContent.closeButton = newValue;
  }

  /**
   * Display popover
   */
  @Prop({ mutable: true }) display = false;
  @Watch('display')
  handleDisplay(newValue: boolean): void {
    if (newValue) {
      this.show();
    } else {
      this.hide();
    }
    this.displayChange.emit(newValue);
  }

  /**
   * Disable popover
   */
  @Prop() disabled = false;

  /**
   * Emited event when display value change
   */
  @Event({ eventName: 'display-change' }) displayChange: EventEmitter<HTMLMgPopoverElement['display']>;

  /**
   * Emmited event when popover is closed
   */
  @Event({ eventName: 'component-close' }) componentClose: EventEmitter<void>;

  /**
   * Check if clicked outside of component
   * @param event - mouse event
   */
  private clickOutside = (event: MouseEvent & { target: HTMLElement }): void => {
    if (!this.disabled && event.target.closest('mg-popover') !== this.element && event.target.closest(`[data-mg-popover-guard="${this.identifier}"]`) === null) {
      this.display = false;
    }
  };

  /**
   * Show popover
   */
  private show = (): void => {
    // Make the popover visible
    this.mgPopover.dataset.show = '';
    // hide when click outside
    // setTimeout is used to prevent event to trigger after creation
    setTimeout(() => {
      this.manageClickOutsideListeners('addEventListener');
    });
  };

  /**
   * Hide popover
   */
  private hide = (): void => {
    // Hide the popover
    this.mgPopover.removeAttribute('data-show');
    // Remove event listener
    this.manageClickOutsideListeners('removeEventListener');
  };

  /**
   * Manage all clickOustside listeners
   * @param action - top process on elements listeners
   */
  private manageClickOutsideListeners = (action: 'removeEventListener' | 'addEventListener'): void => {
    // clickOutside listeners need to bind windows
    // AND as shawdowDom content is not include on windows listeners `event.target` we need to include popover guard content DOM if it's a web-component
    // by doing this we can get and parse all needeed document DOM elements in clickOutside callback event.details.
    // This result in the givern junction :
    // Windows > document > [data-mg-popover-guard] + [data-mg-popover-guard] > shadowRoot =  Windows > document > [data-mg-popover-guard] > shadowRoot
    const guardChildren = Array.from(document.querySelector(`[data-mg-popover-guard="${this.identifier}"]`)?.shadowRoot?.children || new Set());
    [...guardChildren, ...this.windows].forEach((element: Window | HTMLElement) => {
      if (element !== null) {
        element[action]('click', this.clickOutside, false);
      }
    });
  };

  /**
   * Handle content hide event
   */
  private handleHideContent = (): void => {
    this.display = false;
    this.componentClose.emit();
  };

  /**
   * Render popover content element
   */
  private renderPopoverContent = (): void => {
    const mgPopoverContent = this.element.querySelector('mg-popover-content');
    if (mgPopoverContent === null) {
      this.mgPopoverContent = document.createElement('mg-popover-content');
      this.mgPopoverContent.setAttribute('slot', 'content');
      this.mgPopoverContent.setAttribute('id', this.identifier);
      this.mgPopoverContent.addEventListener('hide-content', this.handleHideContent);

      const arrow = document.createElement('div');
      arrow.setAttribute('slot', 'arrow');
      arrow.dataset.floatingArrow = '';
      this.mgPopoverContent.appendChild(arrow);

      // insert elements in DOM
      ['[slot="title"]', '[slot="content"]:not(mg-popover-content)'].forEach(slotType => {
        Array.from(this.element.querySelectorAll(slotType)).forEach(slot => {
          this.mgPopoverContent.appendChild(slot);
        });
      });
      this.element.appendChild(this.mgPopoverContent);
    } else {
      mgPopoverContent.setAttribute('id', this.identifier);
    }
  };

  /**
   * Set up Floating UI positioning and arrow behavior
   * @param interactiveElement - Element that triggers the popover
   */
  private setFloatingUI = (interactiveElement: HTMLElement): void => {
    const fallbackPlacements = this.element.dataset.fallbackPlacement?.split(',').filter((p): p is Placement => ['top', 'right', 'bottom', 'left'].includes(p)) || [];

    this.floatingUICleanup = autoUpdate(interactiveElement, this.mgPopover, () => {
      computePosition(interactiveElement, this.mgPopover, {
        placement: this.placement,
        strategy: 'fixed',
        middleware: [
          offset(0),
          flip({
            fallbackPlacements: fallbackPlacements.length > 0 ? fallbackPlacements : undefined,
          }),
          shift({
            limiter: limitShift(),
          }),
          arrow({
            element: this.mgPopover.querySelector('[data-floating-arrow]'),
          }),
        ],
      }).then(({ x, y, placement, middlewareData }) => {
        if (this.mgPopover !== null)
          Object.assign(this.mgPopover.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            transform: !isNaN(x) && !isNaN(y) ? `translate(${Math.round(x)}px, ${Math.round(y)}px)` : undefined,
          });

        // Update arrow style
        const staticSide = {
          top: 'bottom',
          right: 'left',
          bottom: 'top',
          left: 'right',
        }[placement.split('-')[0]];

        const arrowElement = this.mgPopover.querySelector('[data-floating-arrow]') as HTMLElement;
        const { x: arrowX, y: arrowY } = middlewareData.arrow;

        if (arrowElement !== null)
          Object.assign(arrowElement.style, {
            position: 'absolute',
            top: !isNaN(arrowY) ? `${Math.round(arrowY)}px` : undefined,
            left: !isNaN(arrowX) ? `${Math.round(arrowX)}px` : undefined,
            [staticSide]: '1px',
          });

        this.mgPopover.setAttribute('data-placement', placement);
      });
    });
  };

  /*************
   * Lifecycle *
   *************/

  /**
   * update popper position after props change on component did update hook to benefit from render ended
   */
  componentDidUpdate(): void {
    this.floatingUICleanup?.();
  }

  /**
   * Check if component props are well configured on init
   */
  componentWillLoad(): void {
    // Get windows to attach events
    this.windows = getWindows(window);
    // render mg-popover-content slot
    this.renderPopoverContent();
    this.validateCloseButton(this.closeButton);
    this.validateIdentifier(this.identifier);
    this.validateArrowHide(this.arrowHide);
  }

  /**
   * Check if component props are well configured on init
   */
  componentDidLoad(): void {
    // Get popover content
    this.mgPopover = this.element.querySelector(`#${this.identifier}`);

    // Get interactive element (first element without slot attribute)
    const interactiveElement: HTMLElement = this.element.querySelector(':not([slot])');

    // Add aria attributes
    interactiveElement.setAttribute('aria-controls', this.identifier);
    interactiveElement.setAttribute('aria-expanded', `${this.display}`);

    // Initial styles configuration
    Object.assign(this.mgPopover.style, {
      position: 'fixed',
    });

    // Create Floating UI instance
    this.setFloatingUI(interactiveElement);

    // Add resize observer
    [interactiveElement, this.mgPopoverContent].forEach(element => {
      new ResizeObserver(() => {
        this.floatingUICleanup?.();
        this.setFloatingUI(interactiveElement);
      }).observe(element);
    });

    // Add events to toggle display
    interactiveElement.addEventListener('click', () => {
      if (!this.disabled) this.display = !this.display;
    });

    this.element.addEventListener('click', (event: MouseEvent & { target: HTMLElement }): void => {
      const target = event.target.closest('[popovertargetaction]');
      if (this.display === true && target !== null && target.getAttribute('popovertargetaction') === 'hide') {
        this.display = false;
      }
    });

    // Add events to hide popover
    this.element.addEventListener('keydown', e => {
      if (!this.disabled && e.code === 'Escape') {
        this.display = false;
        this.componentClose.emit();
        interactiveElement.focus();
      }
    });

    this.handleDisplay(this.display);
  }

  /**
   * Cleanup when component is disconnected
   */
  disconnectedCallback(): void {
    // Cleanup Floating UI instance
    this.floatingUICleanup?.();
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
