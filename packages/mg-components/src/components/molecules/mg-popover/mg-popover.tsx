import { Component, Element, Host, h, Prop, Watch, EventEmitter, Event } from '@stencil/core';
import { createID, getWindows } from '@mgdis/stencil-helpers';
import { Instance as PopperInstance, createPopper, Placement } from '@popperjs/core';

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

  private popper: PopperInstance;
  private mgPopover: HTMLElement;
  private mgPopoverContent: HTMLMgPopoverContentElement;
  private windows: Window[];

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
  validateIdentifier(): void {
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
   * Check if clicked outside of component
   * @param event - mouse event
   */
  private clickOutside = (event: MouseEvent & { target: HTMLElement }): void => {
    if (!this.disabled && event.target.closest('mg-popover') !== this.element && !event.target.closest(`[data-mg-popover-guard="${this.identifier}"]`)) this.display = false;
  };

  /**
   * Show popover
   */
  private show = (): void => {
    // Make the popover visible
    this.mgPopover.dataset.show = '';
    // Enable the event listeners
    this.setPopperListeners(true);
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
    // Disable the event listeners
    this.setPopperListeners(false);
    // Remove event listener
    this.manageClickOutsideListeners('removeEventListener');
  };

  /**
   * Set popper listeners
   * @param newValue - if true enable popper listners
   */
  private setPopperListeners = (newValue: boolean): void => {
    this.popper.setOptions(options => ({
      ...options,
      modifiers: [...options.modifiers, { name: 'eventListeners', enabled: newValue }],
    }));
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
      element[action]('click', this.clickOutside, false);
    });
  };

  /**
   * Handle content hide event
   */
  private handleHideContent = (): void => {
    this.display = false;
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
      arrow.dataset.popperArrow = '';
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

  /*************
   * Lifecycle *
   *************/

  /**
   * update popper position after props change on component did update hook to benefit from render ended
   */
  componentDidUpdate(): void {
    this.popper.update();
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
    this.validateIdentifier();
    this.validateArrowHide(this.arrowHide);
  }

  /**
   * Check if component props are well configured on init
   */
  componentDidLoad(): void {
    // Get popover content
    this.mgPopover = this.element.querySelector(`#${this.identifier}`);

    //Get interactive element (first element without slot attribute)
    const interactiveElement: HTMLElement = this.element.querySelector(':not([slot])');
    // Add aria attributes
    interactiveElement.setAttribute('aria-controls', this.identifier);
    interactiveElement.setAttribute('aria-expanded', `${this.display}`);
    const fallbackPlacements = [];
    if (this.element.dataset.fallbackPlacement) {
      fallbackPlacements.push(this.element.dataset.fallbackPlacement);
    }

    // Create popperjs popover
    this.popper = createPopper(interactiveElement, this.mgPopover, {
      placement: this.placement,
      strategy: 'fixed',
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 0],
          },
        },
        {
          name: 'flip',
          options: {
            fallbackPlacements: [...fallbackPlacements, 'auto'],
          },
        },
      ],
    });

    // add resize observer
    [interactiveElement, this.element.querySelector('mg-popover-content')].forEach(element => {
      new ResizeObserver(() => {
        this.popper.update();
      }).observe(element);
    });

    // Add events to toggle display
    interactiveElement.addEventListener('click', () => {
      if (!this.disabled) this.display = !this.display;
    });

    // Add events to hide popover
    this.element.addEventListener('keydown', e => {
      if (!this.disabled && e.code === 'Escape') {
        this.display = false;
        interactiveElement.focus();
      }
    });

    this.handleDisplay(this.display);
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
