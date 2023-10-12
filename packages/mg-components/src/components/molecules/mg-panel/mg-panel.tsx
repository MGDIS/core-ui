import { Component, Element, h, Prop, State, EventEmitter, Watch, Event } from '@stencil/core';
import { createID, ClassList } from '../../../utils/components.utils';
import { initLocales } from '../../../locales';
import { type ExpandToggleDisplayType, type TitlePositionType, expandToggleDisplays, titlePositions } from './mg-panel.conf';

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

  /**
   * Panel title
   */
  @Prop({ mutable: true }) panelTitle!: string;
  @Watch('panelTitle')
  validatePanelTitle(newValue: string): void {
    if (typeof newValue !== 'string' || newValue.trim() === '') throw new Error('<mg-panel> prop "panelTitle" is required.');
    this.titleChange.emit(newValue);
  }

  /**
   * Panel title pattern
   */
  @Prop() titlePattern: string;

  /**
   * Panel title pattern error message
   */
  @Prop() titlePatternErrorMessage: string;
  @Watch('titlePattern')
  @Watch('titlePatternErrorMessage')
  validateTitlePattern(newValue: string): void {
    if (newValue !== undefined && !this.titleEditable) throw new Error(`<mg-panel> prop "titleEditable" must be set to "true".`);
  }

  /**
   * Define if panel title is editable
   */
  @Prop({ mutable: true }) titleEditable = false;

  /**
   * Define title position
   */
  @Prop() titlePosition: TitlePositionType = titlePositions[0];
  @Watch('titlePosition')
  validateTitlePosition(newValue: MgPanel['titlePosition']) {
    if (!titlePositions.includes(newValue)) throw new Error(`<mg-panel> prop "titlePosition" must be one of: ${titlePositions.join(', ')}.`);
  }

  /**
   * Panel is opened
   */
  @Prop({ mutable: true }) expanded = false;
  @Watch('expanded')
  handleExpanded(newValue: boolean): void {
    this.expandedChange.emit(newValue);
  }

  /**
   * Define expand toggle button display
   */
  @Prop() expandToggleDisplay: ExpandToggleDisplayType = expandToggleDisplays[0];
  @Watch('expandToggleDisplay')
  validateExpandToggleDisplay(newValue: MgPanel['expandToggleDisplay']) {
    if (!expandToggleDisplays.includes(newValue)) throw new Error(`<mg-panel> prop "expandToggleDisplay" must be one of: ${expandToggleDisplays.join(', ')}.`);
    if (newValue === 'icon' && this.titleEditable) this.titleEditable = false;
  }

  /**
   * Disable possibility to toggle expand
   */
  @Prop() expandToggleDisabled: boolean;

  /**
   * Component classes
   */
  @State() classCollection: ClassList = new ClassList(['mg-panel']);

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
  @Event({ eventName: 'title-change' }) titleChange: EventEmitter<string>;

  /**
   * Emmited event when expanded change
   */
  @Event({ eventName: 'expanded-change' }) expandedChange: EventEmitter<boolean>;

  /************
   * Methods *
   ************/

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
  private handleUpdateTitle = (event: CustomEvent<string>): void => {
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
    this.validateTitlePattern(this.titlePattern);
    this.validateTitlePattern(this.titlePatternErrorMessage);
    this.validatePanelTitle(this.panelTitle);
    this.validateExpandToggleDisplay(this.expandToggleDisplay);
    this.validateTitlePosition(this.titlePosition);
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
      identifier={`${this.identifier}-collapse-button`}
      aria-expanded={this.expanded !== undefined && this.expanded.toString()}
      aria-controls={`${this.identifier}-content`}
      disabled={this.expandToggleDisabled}
      isIcon={this.expandToggleDisplay === 'icon'}
      label={this.panelTitle}
    >
      <span class="mg-panel__collapse-button-content">
        <mg-icon icon="chevron-up" class={{ 'mg-panel__collapse-button-icon': true, 'mg-panel__collapse-button-icon--reverse': !this.expanded }}></mg-icon>
        {!this.isEditing && this.expandToggleDisplay !== 'icon' && this.panelTitle}
      </span>
    </mg-button>
  );

  /**
   * Render edit button
   * @returns edit Button
   */
  private renderEditButton = (): HTMLMgButtonElement => (
    <mg-button key="edit-button" is-icon variant="flat" label={this.messages.panel.editLabel} onClick={this.handleEditButton} identifier={`${this.identifier}-edit-button`}>
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
      displayCharacterLeft={false}
      pattern={this.titlePattern}
      pattern-error-message={this.titlePatternErrorMessage}
      identifier={`${this.identifier}-edition-input`}
      ref={(el: HTMLMgInputTextElement) => (this.editInputElement = el)}
    >
      <mg-button
        slot="append-input"
        label={this.messages.general.cancel}
        is-icon
        variant="secondary"
        onClick={this.handleCancelEditButton}
        identifier={`${this.identifier}-edition-button-cancel`}
      >
        <mg-icon icon="cross"></mg-icon>
      </mg-button>
      <mg-button
        slot="append-input"
        label={this.messages.general.confirm}
        is-icon
        variant="secondary"
        onClick={this.handleValidateEditButton}
        identifier={`${this.identifier}-edition-button-validate`}
      >
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
    if (this.titleEditable) {
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
        class={{ 'mg-panel__header-title': true, 'mg-panel__header-title--full': this.isEditing, 'mg-panel__header-title--reverse': this.titlePosition === 'right' }}
        key={this.panelTitle}
      >
        {this.renderTitle()}
      </div>,
      <div class="mg-panel__header-content" key="slot-header">
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
        <mg-card>
          <header class={{ 'mg-panel__header': true, 'mg-panel__header--reverse': this.titlePosition === 'right' }} id={headerId}>
            {this.renderHeaderChildren()}
          </header>
          <article class="mg-panel__content" id={`${this.identifier}-content`} aria-labelledby={headerId} hidden={!this.expanded}>
            <slot></slot>
          </article>
        </mg-card>
      </section>
    );
  }
}
