import { Component, Element, Host, h, Prop, Watch, EventEmitter, Event } from '@stencil/core';
import { createID, getWindows, isValideID, toString } from '@mgdis/stencil-helpers';
import { computePosition, autoUpdate, flip, shift, limitShift, offset, arrow, type Placement } from '@floating-ui/dom';
import { isFloatingUIPlacement, type PopoverPlacementType, sides, alignments } from './mg-popover.conf';

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
  private floatingUICleanup: ReturnType<typeof autoUpdate>;

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
  @Prop({ mutable: true }) placement: PopoverPlacementType = 'bottom';
  @Watch('placement')
  watchPlacement(newValue): void {
    if (!isFloatingUIPlacement(newValue)) this.placement = 'bottom';
  }

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
   * Update aria-expanded attribute on interactive element
   * @param expanded - expanded state
   */
  private updateAriaExpanded = (expanded: boolean): void => {
    const interactiveElement = this.element.querySelector(':not([slot])');
    if (interactiveElement !== null) {
      interactiveElement.setAttribute('aria-expanded', String(expanded));
    }
  };

  /**
   * Show popover
   */
  private show = (): void => {
    // Make the popover visible
    this.mgPopover.dataset.show = '';
    // Update aria-expanded
    this.updateAriaExpanded(true);
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
    // Update aria-expanded
    this.updateAriaExpanded(false);
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
   * Get alternative placements ordered by proximity to initial placement
   * First check fallbackPlacement attribute, then generate alternatives:
   * 1. Same side with different alignments (start, center, end)
   * 2. Other sides in order
   * @param placement - initial placement
   * @returns array of alternative placements
   */
  private getClosestPlacements = (placement: Placement): Placement[] => {
    // First check if fallbackPlacement attribute is defined
    const fallbackPlacements = (this.element.dataset.fallbackPlacement || '')
      .split(',')
      .map(t => t.trim())
      .filter(isFloatingUIPlacement);
    if (fallbackPlacements.length > 0) return Array.from(new Set([...fallbackPlacements, ...sides]).values()).filter(isFloatingUIPlacement);

    // Extract side from placement (e.g. "top" from "top-start")
    const [side] = placement.split('-');

    // Generate placements for same side with different alignments
    const currentSidePlacements = alignments.map(alignment => (alignment !== null ? `${side}-${alignment}` : (side as Placement)));

    // Return unique placements: current side variants first, then other sides
    return Array.from(new Set([...currentSidePlacements, ...sides.filter(otherSide => otherSide !== side)])).filter(isFloatingUIPlacement);
  };

  /**
   * Set up Floating UI positioning and arrow behavior
   * @param interactiveElement - Element that triggers the popover
   */
  private setFloatingUI = (interactiveElement: HTMLElement): void => {
    this.floatingUICleanup = autoUpdate(interactiveElement, this.mgPopover, () => {
      computePosition(interactiveElement, this.mgPopover, {
        placement: this.placement as Placement,
        strategy: 'fixed',
        middleware: [
          offset(0),
          flip({
            fallbackPlacements: this.getClosestPlacements(this.placement as Placement),
          }),
          shift({
            limiter: limitShift(),
          }),
          arrow({
            element: this.mgPopover.querySelector('[data-floating-arrow]'),
          }),
        ],
      }).then(({ x, y, placement, middlewareData }) => {
        Object.assign(this.mgPopover.style, {
          position: 'fixed',
          top: '0',
          left: '0',
          transform: `translate(${Math.round(x)}px, ${Math.round(y)}px)`,
        });

        // Update arrow style
        const staticSide = {
          top: 'bottom',
          right: 'left',
          bottom: 'top',
          left: 'right',
        }[placement.split('-')[0]];

        const arrowElement: HTMLElement = this.mgPopover.querySelector('[data-floating-arrow]');
        const { x: arrowX, y: arrowY } = middlewareData.arrow;
        // https://floating-ui.com/docs/arrow
        // Unlike the floating element, which has both coordinates defined at all times, the arrow only has one defined.
        // Due to this, either x or y will be undefined, depending on the side of placement.
        // The above code uses `isNaN` to check for null and undefined simultaneously.
        // Don't remove `isNaN`, because either value can be falsy (0), causing a bug!
        const numberToPx = (number: number): string => (!isNaN(number) ? `${number}px` : '');

        if (arrowElement !== null)
          Object.assign(arrowElement.style, {
            position: 'absolute',
            left: numberToPx(arrowX),
            top: numberToPx(arrowY),
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
    this.floatingUICleanup();
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
    this.watchPlacement(this.placement);
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
        this.floatingUICleanup();
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
    this.floatingUICleanup();
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
