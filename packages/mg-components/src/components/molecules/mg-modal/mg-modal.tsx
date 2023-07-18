import { Component, h, Prop, State, Watch, Element, Event, EventEmitter, Listen } from '@stencil/core';
import { createID, ClassList, focusableElements } from '../../../utils/components.utils';
import { initLocales } from '../../../locales';

@Component({
  tag: 'mg-modal',
  styleUrl: 'mg-modal.scss',
  shadow: true,
})
export class MgModal {
  /************
   * Internal *
   ************/

  // Modal focusable elements
  private modalFocusableElements: HTMLElement[] = [];
  private closeButtonElement: HTMLMgButtonElement;

  // Classes
  private readonly classHide = 'mg-modal--hide';

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
   * Displayed modal title
   */
  @Prop() modalTitle!: string;
  @Watch('modalTitle')
  validateModalTitle(newValue: string): void {
    if (typeof newValue !== 'string' || newValue.trim() === '') {
      throw new Error('<mg-modal> prop "modalTitle" is required.');
    }
  }

  /**
   * Define if modal has a cross button
   */
  @Prop() closeButton = false;

  /**
   * Define if modal is hidden
   */
  @Prop({ mutable: true }) hide = false;
  @Watch('hide')
  validateHide(newValue: boolean): void {
    if (newValue) {
      this.componentHide.emit();
      this.classCollection.add(this.classHide);
      document.body.style.overflow = this.bodyOverflow;
      // reset focus handlers
      this.getLastFocusableElement()?.removeEventListener('keydown', this.handleLastFocusableElement);
      if (this.modalFocusableElements.length > 0) this.modalFocusableElements[0].removeEventListener('keydown', this.handleFirstFocusableElement);
    } else {
      this.componentShow.emit();
      this.classCollection.delete(this.classHide);
      document.body.style.overflow = 'hidden';
      this.setFocus();
    }
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
  @State() classCollection: ClassList = new ClassList(['mg-modal']);

  /**
   * Emmited event when modal is diplayed
   */
  @Event({ eventName: 'component-show' }) componentShow: EventEmitter<string>;

  /**
   * Emmited event when modal is hidden
   */
  @Event({ eventName: 'component-hide' }) componentHide: EventEmitter<string>;

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
      this.hide = true;
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
    const allFocusableElements = Array.from(this.element.querySelectorAll(focusableElements));
    // If at least one
    if (allFocusableElements.length > 0) {
      this.modalFocusableElements = allFocusableElements.reduce((acc, focusableElement) => {
        acc.push(focusableElement.shadowRoot !== null ? focusableElement.shadowRoot.querySelector(focusableElements) || focusableElement : focusableElement);
        return acc;
      }, []);
      // When close button is enabled it's the first focusable element.
      if (this.closeButton && this.closeButtonElement !== undefined) {
        this.modalFocusableElements.unshift(this.closeButtonElement);
      }
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
    this.hide = true;
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
    this.validateHide(this.hide);
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
      <div role="alertdialog" id={this.identifier} class={this.classCollection.join()} tabindex="-1" aria-labelledby={this.titleId} aria-modal="true" aria-hidden={this.hide}>
        <mg-card>
          <div class="mg-modal__dialog">
            <header class="mg-modal__header">
              {this.closeButton && (
                <span class="mg-modal__close-button">
                  <mg-button
                    identifier={`${this.identifier}-close-button`}
                    is-icon
                    variant="flat"
                    label={this.messages.modal.closeButton}
                    onClick={this.handleClose}
                    ref={el => {
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
              <h1 class="mg-modal__title" id={this.titleId}>
                {this.modalTitle}
              </h1>
            </header>

            {this.hasContent && (
              <article class="mg-modal__content">
                <slot name="content"></slot>
              </article>
            )}

            {this.hasActions && (
              <footer class="mg-modal__footer">
                <slot name="actions"></slot>
              </footer>
            )}
          </div>
        </mg-card>
      </div>
    );
  }
}
