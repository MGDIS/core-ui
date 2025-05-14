import { Component, h, Prop, State, Watch, Element, Event, EventEmitter } from '@stencil/core';
import { createID, ClassList, isValidString, toString, isValideID } from '@mgdis/core-ui-helpers/dist/utils';
import { initLocales } from '../../../locales';
import { DialogRoleType, dialogRoles } from './mg-modal.conf';

/**
 * @slot - Modal content
 * @slot actions - Actions content
 */
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
  private dialog: HTMLDialogElement;

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
  @Watch('identifier')
  watchIdentifier(newValue: MgModal['identifier']): void {
    if (!isValideID(newValue)) {
      throw new Error(`<mg-modal> prop "identifier" value is invalid. Passed value: ${toString(newValue)}.`);
    }
  }

  /**
   * Modal dialog role.
   */
  @Prop() dialogRole: DialogRoleType = 'dialog';
  @Watch('dialogRole')
  validateDialogRole(newValue: MgModal['dialogRole']): void {
    if (!dialogRoles.includes(newValue)) throw new Error(`<mg-modal> prop "dialogRole" must be one of: ${dialogRoles.join(', ')}. Passed value: ${toString(newValue)}.`);
  }

  /**
   * Displayed modal title
   */
  @Prop() modalTitle!: string;
  @Watch('modalTitle')
  validateModalTitle(newValue: MgModal['modalTitle']): void {
    if (!isValidString(newValue)) {
      throw new Error(`<mg-modal> prop "modalTitle" is required. Passed value: ${toString(newValue)}.`);
    }
  }

  /**
   * Define if modal has a cross button
   */
  @Prop() closeButton = false;

  /**
   * Define if modal is open
   */
  @Prop({ mutable: true }) open = false;
  @Watch('open')
  watchOpen(newValue: boolean): void {
    if (newValue) {
      this.dialog.showModal();
      this.componentShow.emit();
      document.body.style.overflow = 'hidden';
    } else {
      this.dialog.close();
      this.componentHide.emit();
      document.body.style.overflow = this.bodyOverflow;
    }
  }

  /**
   * Define if component is using actions slot
   */
  @State() hasActions = false;

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
   * Emmited event when modal is closed
   */
  @Event({ eventName: 'component-close' }) componentClose: EventEmitter<void>;

  /***********
   * Handles *
   ***********/

  /**
   * Closes the modal.
   */
  private handleClose = (): void => {
    this.open = false;
    this.componentClose.emit();
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
    this.titleId = `${this.identifier}-title`;
    this.watchIdentifier(this.identifier);
    this.validateModalTitle(this.modalTitle);
    this.validateDialogRole(this.dialogRole);
  }

  /**
   * Define open state on component load
   */
  componentDidLoad(): void {
    this.watchOpen(this.open);
    // update open prop when use escape key
    this.dialog.addEventListener('close', () => {
      this.open = false;
      this.componentClose.emit();
    });
  }

  /**
   * Render
   * @returns HTML Element
   */
  render(): HTMLElement {
    return (
      <dialog
        role={this.dialogRole}
        id={this.identifier}
        class={this.classCollection.join()}
        aria-labelledby={this.titleId}
        ref={(el: HTMLDialogElement) => {
          if (el !== null) {
            this.dialog = el;
          }
        }}
      >
        <mg-card>
          <div class="mg-c-modal__dialog">
            <header class="mg-c-modal__header">
              {this.closeButton && (
                <span class="mg-c-modal__close-button">
                  <mg-button is-icon variant="flat" label={this.messages.modal.closeButton} onClick={this.handleClose}>
                    <mg-icon icon="cross"></mg-icon>
                  </mg-button>
                </span>
              )}
              <h1 class="mg-c-modal__title" id={this.titleId}>
                {this.modalTitle}
              </h1>
            </header>
            <article class="mg-c-modal__content">
              <slot></slot>
            </article>
            {this.hasActions && (
              <footer class="mg-c-modal__footer">
                <slot name="actions"></slot>
              </footer>
            )}
          </div>
        </mg-card>
      </dialog>
    );
  }
}
