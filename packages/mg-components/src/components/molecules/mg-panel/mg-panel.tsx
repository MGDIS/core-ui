import { Component, Element, h, Prop, State, EventEmitter, Watch, Event } from '@stencil/core';
import { createID, ClassList, isValidString, toString, isValideID } from '@mgdis/core-ui-helpers/dist/utils';
import { initLocales } from '../../../locales';
import { type ExpandToggleDisplayType, type TitlePositionType, expandToggleDisplays, titlePositions } from './mg-panel.conf';

/**
 * @slot - Panel content
 * @slot panel-title - Panel title content (replaces panel-title prop when used)
 * @slot header-right - Header right panel content
 */
@Component({
  tag: 'mg-panel',
  styleUrl: '../../../../node_modules/@mgdis/styles/dist/components/mg-panel.css',
  shadow: true,
})
export class MgPanel {
  /************
   * Internal *
   ************/

  // HTML selector
  private editInputElement: HTMLMgInputTextElement;

  // Locales
  private messages;

  /**************
   * Decorators *
   **************/

  /**
   * Get component DOM element
   */
  @Element() element: HTMLMgPanelElement;

  /**
   * Identifier is used for the element ID (id is a reserved prop in Stencil.js)
   * If not set, it will be created.
   */
  @Prop() identifier: string = createID('mg-panel');
  @Watch('identifier')
  watchIdentifier(newValue: MgPanel['identifier']): void {
    if (!isValideID(newValue)) {
      console.error(`<mg-panel> prop "identifier" value is invalid. Passed value: ${toString(newValue)}.`);
    }
  }

  /**
   * Panel title
   */
  @Prop({ mutable: true }) panelTitle?: string;
  @Watch('panelTitle')
  validatePanelTitle(newValue: MgPanel['panelTitle']): void {
    if (newValue !== undefined) {
      if (!isValidString(newValue)) {
        throw new Error(`<mg-panel> prop "panelTitle" must be a string. Passed value: ${toString(newValue)}.`);
      } else {
        this.titleChange.emit(newValue);
      }
    }
  }

  /**
   * Panel title pattern
   */
  @Prop() titlePattern?: string;

  /**
   * Panel title pattern error message
   */
  @Prop() titlePatternErrorMessage?: string;
  @Watch('titlePattern')
  @Watch('titlePatternErrorMessage')
  validateTitlePattern(newValue: string): void {
    if (newValue !== undefined && !this.titleEditable) throw new Error(`<mg-panel> prop "titleEditable" must be set to "true".`);
  }

  /**
   * Define if panel title is editable
   */
  @Prop({ mutable: true }) titleEditable = false;
  @Watch('titleEditable')
  validateTitleEditable(newValue: MgPanel['titleEditable']): void {
    if (newValue && this.hasPanelTitleSlot()) {
      throw new Error(`<mg-panel> prop "titleEditable" cannot be used with panel-title slot.`);
    }
  }

  /**
   * Define title position
   */
  @Prop() titlePosition: TitlePositionType = 'left';
  @Watch('titlePosition')
  validateTitlePosition(newValue: MgPanel['titlePosition']) {
    if (!titlePositions.includes(newValue)) throw new Error(`<mg-panel> prop "titlePosition" must be one of: ${titlePositions.join(', ')}. Passed value: ${toString(newValue)}.`);
  }

  /**
   * Panel is opened
   */
  @Prop({ mutable: true }) expanded = false;
  @Watch('expanded')
  handleExpanded(newValue: MgPanel['expanded']): void {
    this.expandedChange.emit(newValue);
  }

  /**
   * Define expand toggle button display
   */
  @Prop() expandToggleDisplay: ExpandToggleDisplayType = 'text';
  @Watch('expandToggleDisplay')
  validateExpandToggleDisplay(newValue: MgPanel['expandToggleDisplay']) {
    if (!expandToggleDisplays.includes(newValue))
      throw new Error(`<mg-panel> prop "expandToggleDisplay" must be one of: ${expandToggleDisplays.join(', ')}. Passed value: ${toString(newValue)}.`);
    if (newValue === 'icon' && this.titleEditable) this.titleEditable = false;
    if (newValue === 'icon' && this.hasPanelTitleSlot()) {
      throw new Error(`<mg-panel> prop "expandToggleDisplay" cannot be "icon" when panel-title slot is used.`);
    }
  }

  /**
   * Disable possibility to toggle expand
   */
  @Prop() expandToggleDisabled = false;

  /**
   * Add box-shadow style
   */
  @Prop() shadow = false;

  /**
   * Component classes
   */
  @State() classCollection: ClassList = new ClassList(['mg-c-panel']);

  /**
   * Title is in edition mode
   */
  @State() isEditing = false;

  /**
   * Cache for updated panel title before validation
   */
  @State() updatedPanelTitle: string;

  /**
   * Emmited event when title change
   */
  @Event({ eventName: 'title-change' }) titleChange: EventEmitter<HTMLMgPanelElement['panelTitle']>;

  /**
   * Emmited event when expanded change
   */
  @Event({ eventName: 'expanded-change' }) expandedChange: EventEmitter<HTMLMgPanelElement['expanded']>;

  /************
   * Methods *
   ************/

  /**
   * Check if panel-title slot is used
   * @returns true if slot is used
   */
  private hasPanelTitleSlot = (): boolean => {
    return this.element.querySelector('[slot="panel-title"]') !== null;
  };

  /**
   * Toggle is editing state
   */
  private toggleIsEditing = (): void => {
    this.isEditing = !this.isEditing;
  };

  /************
   * Handlers *
   ************/

  /**
   * Collapse button click handler
   */
  private handleCollapseButton = (): void => {
    if (!this.expandToggleDisabled) this.expanded = !this.expanded;
  };

  /**
   * Edit button click handler
   */
  private handleEditButton = (): void => {
    this.toggleIsEditing();
  };

  /**
   * Update title handler
   * @param event - input value change event
   */
  private handleUpdateTitle = (event: CustomEvent<HTMLMgInputTextElement['value']>): void => {
    this.updatedPanelTitle = event.detail;
  };

  /**
   * Cancel edition button handler
   */
  private handleCancelEditButton = (): void => {
    this.updatedPanelTitle = undefined;
    this.toggleIsEditing();
  };

  /**
   * Validate edition button handler
   */
  private handleValidateEditButton = (): void => {
    if (!this.editInputElement.valid) return;
    if (this.updatedPanelTitle !== undefined) this.panelTitle = this.updatedPanelTitle;
    this.toggleIsEditing();
  };

  /*************
   * Lifecycle *
   *************/

  /**
   * Check if props are well configured on init
   */
  componentWillLoad(): void {
    // Get locales
    this.messages = initLocales(this.element).messages;
    // Validate
    this.watchIdentifier(this.identifier);
    this.validateTitlePattern(this.titlePattern);
    this.validateTitlePattern(this.titlePatternErrorMessage);
    // Only validate panelTitle if slot is not used
    if (!this.hasPanelTitleSlot()) {
      if (!isValidString(this.panelTitle)) throw new Error(`<mg-panel> prop "panelTitle" is required when panel-title slot is not used.`);
      this.validatePanelTitle(this.panelTitle);
    }
    this.validateExpandToggleDisplay(this.expandToggleDisplay);
    this.validateTitlePosition(this.titlePosition);
    this.validateTitleEditable(this.titleEditable);
  }

  /**
   * Edit DOM after render
   */
  componentDidRender(): void {
    // when we are editing we get focus on edition input
    if (this.isEditing) this.editInputElement.setFocus();
  }

  /*************
   * Render *
   *************/

  /**
   * Render collapse button
   * @returns collpase button
   */
  private renderCollapseButton = (): HTMLMgButtonElement => (
    <mg-button
      onClick={this.handleCollapseButton}
      variant="flat"
      aria-expanded={this.expanded.toString()}
      aria-controls={`${this.identifier}-content`}
      disabled={this.expandToggleDisabled}
      isIcon={this.expandToggleDisplay === 'icon'}
      label={this.expandToggleDisplay === 'icon' ? this.panelTitle : undefined}
    >
      <span class="mg-c-panel__collapse-button-content">
        <mg-icon icon="chevron-up" class={{ 'mg-c-panel__collapse-button-icon': true, 'mg-c-panel__collapse-button-icon--reverse': !this.expanded }}></mg-icon>
        {!this.isEditing && this.expandToggleDisplay !== 'icon' && (this.hasPanelTitleSlot() ? <slot name="panel-title"></slot> : this.panelTitle)}
      </span>
    </mg-button>
  );

  /**
   * Render edit button
   * @returns edit Button
   */
  private renderEditButton = (): HTMLMgButtonElement => (
    <mg-button key="edit-button" is-icon variant="flat" label={this.messages.panel.editLabel} onClick={this.handleEditButton}>
      <mg-icon icon="pen"></mg-icon>
    </mg-button>
  );

  /**
   * Render input button
   * @returns edit title input
   */
  private renderEditInput = (): HTMLMgInputTextElement => (
    <mg-input-text
      key="edition-input"
      label={this.messages.panel.editLabel}
      label-hide
      value={this.panelTitle}
      onValue-change={this.handleUpdateTitle}
      characterLeftHide={true}
      pattern={this.titlePattern}
      pattern-error-message={this.titlePatternErrorMessage}
      identifier={`${this.identifier}-edition-input`}
      ref={(el: HTMLMgInputTextElement) => (this.editInputElement = el)}
    >
      <mg-button slot="append-input" label={this.messages.general.cancel} is-icon variant="secondary" onClick={this.handleCancelEditButton}>
        <mg-icon icon="cross"></mg-icon>
      </mg-button>
      <mg-button slot="append-input" label={this.messages.general.confirm} is-icon variant="secondary" onClick={this.handleValidateEditButton}>
        <mg-icon icon="check"></mg-icon>
      </mg-button>
    </mg-input-text>
  );

  /**
   * Render title
   * @returns title element
   */
  private renderTitle = (): HTMLElement[] => {
    const elementsToRender: HTMLElement[] = [this.renderCollapseButton()];

    // Add edit functionality only if not using slot and title is editable
    if (this.titleEditable && !this.hasPanelTitleSlot()) {
      if (!this.isEditing) elementsToRender.push(this.renderEditButton());
      else elementsToRender.push(this.renderEditInput());
    }

    return this.titlePosition === 'right' ? elementsToRender.reverse() : elementsToRender;
  };

  /**
   * Render header children
   * @returns header child
   */
  private renderHeaderChildren = (): HTMLElement[] => {
    const children = [
      <div
        class={{ 'mg-c-panel__header-title': true, 'mg-c-panel__header-title--full': this.isEditing, 'mg-c-panel__header-title--reverse': this.titlePosition === 'right' }}
        key={this.panelTitle}
      >
        {this.renderTitle()}
      </div>,
      <div class="mg-c-panel__header-content" key="slot-header">
        <slot name="header-right"></slot>
      </div>,
    ];
    return this.titlePosition === 'right' ? children.reverse() : children;
  };

  /**
   * Render component
   * @returns rendered component
   */
  render(): HTMLElement {
    const headerId = `${this.identifier}-header`;
    return (
      <section class={this.classCollection.join()} id={this.identifier}>
        <mg-card shadow={this.shadow}>
          <header class={{ 'mg-c-panel__header': true, 'mg-c-panel__header--reverse': this.titlePosition === 'right' }} id={headerId}>
            {this.renderHeaderChildren()}
          </header>
          <article class="mg-c-panel__content" id={`${this.identifier}-content`} aria-labelledby={headerId} hidden={!this.expanded}>
            <slot></slot>
          </article>
        </mg-card>
      </section>
    );
  }
}
