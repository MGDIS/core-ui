import { Component, h, Prop, State, Event, EventEmitter, Watch, Host } from '@stencil/core';
import { CheckboxItem, IMgInputCheckboxBase, SectionKind, SectionTitleKind } from '../mg-input-checkbox.conf';
import { MgInputCheckboxList } from '../MgInputCheckboxList';

/**
 * Internal component use to manage sections instances
 */
@Component({
  tag: 'mg-input-checkbox-paginated',
  shadow: false,
  scoped: true,
})
export class MgInputCheckboxPaginated implements IMgInputCheckboxBase {
  /*************
   * Constantes *
   *************/
  private readonly offset = 10;

  /*************
   * Decorators *
   *************/

  /**
   * Define if mg-input-checkbox-list is readonly
   */
  @Prop() readonly: boolean;

  /**
   * Define if mg-input-checkbox-list is disabled
   */
  @Prop() disabled: boolean;

  /**
   * Define mg-input-checkbox input name
   */
  @Prop() name: string;

  /**
   * Define mg-input-checkbox input invalid
   */
  @Prop() invalid: boolean;

  /**
   * Current page
   */
  @Prop({ mutable: true }) currentPage = 1;

  /**
   * Define checkboxes to paginate
   */
  @Prop() checkboxes: CheckboxItem[] = [];
  @Watch('checkboxes')
  validateCheckboxes(newValue: MgInputCheckboxPaginated['checkboxes'], oldValue: MgInputCheckboxPaginated['checkboxes']): void {
    const pageCountNewValue = this.getPageCount(newValue);
    const pageCountOldValue = this.getPageCount(oldValue);
    // after each array.length update we reset pagination
    // when items fill on page, we set current page to 1
    if (pageCountNewValue === 1 || (pageCountNewValue !== 0 && this.currentPage === 0)) {
      this.currentPage = 1;
    }
    // when old items page numbers match the current page AND new items page number is lower than current page, we set the new last page
    else if (pageCountOldValue === this.currentPage && pageCountNewValue < this.currentPage) {
      this.currentPage--;
    }
  }

  /**
   * Define section kind
   */
  @Prop() sectionKind: SectionKind;
  @Watch('sectionKind')
  validateSectionKind(newValue: MgInputCheckboxPaginated['sectionKind']): void {
    if (newValue === SectionKind.SELECTED) this.titleKind = SectionTitleKind.BUTTON;
    else this.titleKind = SectionTitleKind.TEXT;
  }

  /**
   * Define component message
   */
  @Prop() messages: Record<string, string>;

  /**
   * Emit 'mass-action' event
   * used to informe that select-all/unselect-all button listner is triggered
   */
  @Event({ eventName: 'mass-action' }) massAction: EventEmitter<HTMLMgInputCheckboxPaginatedElement['sectionKind']>;

  /**
   * Define section title
   */
  @State() titleKind: SectionTitleKind;

  /**
   * Is checked items values expanded
   */
  @State() expanded = true;

  /***********
   * Methods *
   ***********/

  /**
   * Mass action handler
   */
  private massActionHandler = (): void => {
    this.massAction.emit(this.sectionKind);
  };

  /**
   * Toggle items button handler
   */
  private handleToggleClick = (): void => {
    this.expanded = !this.expanded;
  };

  /**
   * Method to get a array range
   * @param from - array start index
   * @param to - array end index
   * @returns array's range
   */
  private getArrayRange = <ItemType,>(array: ItemType[], from: number, to: number): ItemType[] => array.slice(from, to);

  /**
   * Get from and to index
   * @returns [from,to] index
   */
  private getFromToIndexes(): number[] {
    const isFirstPage = this.currentPage === 1;
    const from = isFirstPage ? 0 : (this.currentPage - 1) * this.offset;
    const to = isFirstPage ? this.offset : this.currentPage * this.offset;
    return [from, to];
  }

  /**
   * Method to get page count from items
   * @param items - items to count
   * @returns page count from items
   */
  private getPageCount = (item: unknown[]): number => Math.ceil(item.length / this.offset);

  /**
   * Handle mg-pagination current page change event
   * @param event - pagination current page change event
   */
  private handleCurrentPageChange = (event: CustomEvent): void => {
    this.currentPage = Number(event.detail);
  };

  /*************
   * Lifecycle *
   *************/

  /**
   * Check if component props are well configured on init
   */
  componentWillLoad(): void {
    this.validateSectionKind(this.sectionKind);
  }

  /**
   * Render
   * @returns HTML Element
   */
  render(): HTMLElement {
    const getText = (checkboxes: CheckboxItem[]): HTMLElement => (
      <em class="mg-c-input__input-checkbox-multi-section-header-label">{`${this.messages[checkboxes.length > 1 ? 'titlePlurial' : 'title']} (${checkboxes.length})`}</em>
    );
    const [from, to] = this.getFromToIndexes();
    const itemsContainerId = `items-${this.sectionKind}-container`;

    return (
      <Host hidden={this.checkboxes.length < 1}>
        <div class="mg-c-input__input-checkbox-multi-section-header">
          {this.titleKind === SectionTitleKind.BUTTON ? (
            <mg-button variant="flat" onClick={this.handleToggleClick} aria-controls={itemsContainerId} aria-expanded={this.expanded.toString()}>
              <mg-icon icon={this.expanded ? 'chevron-up' : 'chevron-down'} size="small"></mg-icon>
              <span class="mg-c-input__input-checkbox-multi-text">{getText(this.checkboxes)}</span>
            </mg-button>
          ) : (
            <p class="mg-c-input__input-checkbox-multi-title">{getText(this.checkboxes)}</p>
          )}
          {((this.sectionKind === SectionKind.SELECTED && this.expanded) || this.sectionKind === SectionKind.NOT_SELECTED) && (
            <mg-tooltip class="mg-c-input__input-checkbox-multi-section-header-tootlip" message={this.messages.tooltip} data-popper-strategy="absolute">
              <mg-button variant="link" onClick={this.massActionHandler}>
                {this.messages.action}
              </mg-button>
            </mg-tooltip>
          )}
          {this.expanded && this.getPageCount(this.checkboxes) > 1 && (
            <mg-pagination
              key="search-pagination"
              totalPages={this.getPageCount(this.checkboxes)}
              currentPage={this.currentPage}
              onCurrent-page-change={this.handleCurrentPageChange}
              hideNavigationLabels={true}
              hidePageCount={true}
              identifier={`input-checkbox-pagination-${this.sectionKind}`}
            ></mg-pagination>
          )}
        </div>
        <div hidden={!this.expanded} id={itemsContainerId} class="mg-c-input__input-checkbox-multi-section-content">
          <MgInputCheckboxList
            checkboxes={this.getArrayRange(this.checkboxes, from, to)}
            inputVerticalList={true}
            type={'multi'}
            displaySearchInput={true}
            messages={this.messages}
            id={`items-${this.sectionKind}`}
            disabled={this.disabled}
            name={this.name}
            invalid={this.invalid}
          ></MgInputCheckboxList>
        </div>
      </Host>
    );
  }
}
