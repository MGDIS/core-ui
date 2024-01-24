import { Component, h, Prop, State, Watch, Element, Event, EventEmitter, Listen, forceUpdate } from '@stencil/core';
import { createID, ClassList, focusableElements, isValidString } from '../../../utils/components.utils';
import { initLocales } from '../../../locales';
import { DialogRoleType, dialogRoles } from './mg-modal.conf';

@Component({
  tag: 'mg-modal',
  styleUrl: '../../../../node_modules/@mgdis/styles/dist/components/mg-modal.css',
  shadow: true,
})
export class MgModal {
  /************
   * Internal *
   ************/

  // Modal focusable elements
  private modalFocusableElements: HTMLElement[] = [];
  private closeButtonElement: HTMLMgButtonElement;

  // IDs
  private titleId = '';

  // Locales
  private messages;

  // body overflow default
  private bodyOverflow: string;

  /**************
   * Decorators *
   **************/

  /**
   * Get component DOM element
   */
  @Element() element: HTMLMgModalElement;

  /**
   * Identifier is used for the element ID (id is a reserved prop in Stencil.js)
   * If not set, it will be created.
   */
  @Prop() identifier: string = createID('mg-modal');

  /**
   * Modal dialog role.
   */
  @Prop() dialogRole: DialogRoleType = dialogRoles[0];
  @Watch('dialogRole')
  validateDialogRole(newValue: MgModal['dialogRole']): void {
    if (!dialogRoles.includes(newValue)) throw new Error(`<mg-modal> prop "dialogRole" must be one of: ${dialogRoles.join(', ')}.`);
  }

  /**
   * Displayed modal title
   */
  @Prop() modalTitle!: string;
  @Watch('modalTitle')
  validateModalTitle(newValue: MgModal['modalTitle']): void {
    if (!isValidString(newValue)) {
      throw new Error('<mg-modal> prop "modalTitle" is required.');
    }
  }

  /**
   * Define if modal has a cross button
   */
  @Prop() closeButton = false;

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
      document.body.style.overflow = this.bodyOverflow;
      // reset focus handlers
      this.getLastFocusableElement()?.removeEventListener('keydown', this.handleLastFocusableElement);
      if (this.modalFocusableElements.length > 0) this.modalFocusableElements[0].removeEventListener('keydown', this.handleFirstFocusableElement);
    } else {
      this.componentShow.emit();
      document.body.style.overflow = 'hidden';
      this.setFocus();
    }
    forceUpdate(this);
  }

  /**
   * Define if component is using actions slot
   */
  @State() hasActions = false;

  /**
   * Define if component is using content slot
   */
  @State() hasContent = false;

  /**
   * Component classes
   */
  @State() classCollection: ClassList = new ClassList(['mg-c-modal']);

  /**
   * Emmited event when modal is diplayed
   */
  @Event({ eventName: 'component-show' }) componentShow: EventEmitter<void>;

  /**
   * Emmited event when modal is hidden
   */
  @Event({ eventName: 'component-hide' }) componentHide: EventEmitter<void>;

  /**
   * Handle 'escape' key down
   * @param event - keydown event
   */
  @Listen('keydown', {
    target: 'window',
  })
  handleKeyDown(event: KeyboardEvent): void {
    // we can use 'Escape button" when this not a blocking modal, induced by closeButton value.
    if (this.closeButton && event.key === 'Escape') {
      this.element.hidden = true;
    }
  }

  /**
   * Handle last focusable element
   * @param event - keyboard event
   */
  private handleLastFocusableElement = (event): void => {
    if (event.key === 'Tab' && !event.shiftKey) {
      event.preventDefault();
      this.modalFocusableElements[0].focus();
    }
  };

  /**
   * Handle first focusable element
   * @param event - keyboard event
   */
  private handleFirstFocusableElement = (event): void => {
    if (event.key === 'Tab' && event.shiftKey) {
      event.preventDefault();
      this.getLastFocusableElement().focus();
    }
  };

  /**
   * Get last focusablmeElement
   * @returns last modal focusable element
   */
  private getLastFocusableElement = (): HTMLElement | null => (this.modalFocusableElements.length > 0 ? this.modalFocusableElements[this.modalFocusableElements.length - 1] : null);

  /**
   * Method to manage focus on modal focusable elements
   */
  private setFocus = (): void => {
    // Get all focusable elements
    const slottedFocusableElements = Array.from(this.element.querySelectorAll(focusableElements));
    // Check if slotted focusable elements have shadowDom with focusable elements
    this.modalFocusableElements = slottedFocusableElements.reduce((acc, focusableElement) => {
      acc.push(focusableElement.shadowRoot !== null ? focusableElement.shadowRoot.querySelector(focusableElements) || focusableElement : focusableElement);
      return acc;
    }, []);
    if (this.closeButton && this.closeButtonElement !== undefined) {
      this.modalFocusableElements.unshift(this.closeButtonElement);
    }
    // If modal elements can receive focus, we attach events to enable cycling through the modal.
    if (this.modalFocusableElements.length > 0) {
      // Add event listener on last element
      this.getLastFocusableElement().addEventListener('keydown', this.handleLastFocusableElement);
      // Add event listener on first element (case shift + tab)
      this.modalFocusableElements[0].addEventListener('keydown', this.handleFirstFocusableElement);
    }
  };

  /*************
   * Handlers *
   *************/

  /**
   * Handle close button
   */
  private handleClose = (): void => {
    this.element.hidden = true;
  };

  /*************
   * Lifecycle *
   *************/

  /**
   * Check if component props are well configured on init
   */
  componentWillLoad(): void {
    // Store body overflow
    this.bodyOverflow = document.body.style.overflow;
    // Get locales
    this.messages = initLocales(this.element).messages;
    // Validate
    this.hasActions = this.element.querySelector('[slot="actions"]') !== null;
    this.hasContent = this.element.querySelector('[slot="content"]') !== null;
    this.titleId = `${this.identifier}-title`;
    this.validateModalTitle(this.modalTitle);
    this.validateHidden(this.element.hidden);
    this.validateDialogRole(this.dialogRole);
  }

  /**
   * Add observer on component to set focus when displayed
   */
  componentDidLoad(): void {
    new MutationObserver(mutationList => {
      // as mutation.target is null on chrome and '' or undefined on firefox we test both with the 'aria-hidden' attribute mutation
      if (mutationList.some(mutation => mutation.attributeName === 'aria-hidden' && ['', null, undefined].includes((mutation.target as HTMLElement).ariaHidden))) {
        // Set focus on first element
        this.modalFocusableElements[0].focus();
      }
    }).observe(this.element.shadowRoot.getElementById(this.identifier), { attributes: true });
  }

  /**
   * Render
   * @returns HTML Element
   */
  render(): HTMLElement {
    return (
      <div
        role={this.dialogRole}
        id={this.identifier}
        class={this.classCollection.join()}
        tabindex="-1"
        aria-labelledby={this.titleId}
        aria-modal="true"
        aria-hidden={this.element.hidden}
      >
        <mg-card>
          <div class="mg-c-modal__dialog">
            <header class="mg-c-modal__header">
              {this.closeButton && (
                <span class="mg-c-modal__close-button">
                  <mg-button
                    is-icon
                    variant="flat"
                    label={this.messages.modal.closeButton}
                    onClick={this.handleClose}
                    ref={(el: HTMLMgButtonElement) => {
                      if (el !== null) {
                        // store closeButton Element
                        this.closeButtonElement = el;
                        // add close button element to modalFocusableElements when it is render
                        this.modalFocusableElements.unshift(this.closeButtonElement);
                      }
                    }}
                  >
                    <mg-icon icon="cross"></mg-icon>
                  </mg-button>
                </span>
              )}
              <h1 class="mg-c-modal__title" id={this.titleId}>
                {this.modalTitle}
              </h1>
            </header>

            {this.hasContent && (
              <article class="mg-c-modal__content">
                <slot name="content"></slot>
              </article>
            )}

            {this.hasActions && (
              <footer class="mg-c-modal__footer">
                <slot name="actions"></slot>
              </footer>
            )}
          </div>
        </mg-card>
      </div>
    );
  }
}
