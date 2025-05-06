import { Component, h, Prop, State, Event, EventEmitter, Watch, Host } from '@stencil/core';
import { CheckboxItem, IMgInputCheckboxBase, type SectionKindType, SectionKind } from '../mg-input-checkbox.conf';
import { MgInputCheckboxList } from '../MgInputCheckboxList';

/**
 * Internal component use to manage sections instances
 * @internal
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
  private sectionKind: SectionKindType;

  /*************
   * Decorators *
   *************/

  /**
   * Define if mg-input-checkbox-list is readonly
   */
  @Prop() readonly = false;

  /**
   * Define if mg-input-checkbox-list is disabled
   */
  @Prop() disabled = false;

  /**
   * Define mg-input-checkbox input name
   */
  @Prop() name?: string;

  /**
   * Define mg-input-checkbox input invalid
   */
  @Prop() invalid?: boolean;

  /**
   * Current page
   */
  @Prop({ mutable: true }) currentPage = 1;

  /**
   * Define checkboxes to paginate
   */
  @Prop() checkboxes: CheckboxItem[] = [];
  @Watch('checkboxes')
  watchCheckboxes(newValue: MgInputCheckboxPaginated['checkboxes'], oldValue?: MgInputCheckboxPaginated['checkboxes']): void {
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
    this.sectionKind = newValue[0].value ? SectionKind.SELECTED : SectionKind.NOT_SELECTED;
  }

  /**
   * Define component message
   */
  @Prop() messages: Record<string, string>;

  /**
   * Emit 'mass-action' event
   * used to informe that select-all/unselect-all button listner is triggered
   */
  @Event({ eventName: 'mass-action' }) massAction: EventEmitter<SectionKindType>;

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
  private getPageCount = (items: unknown[]): number => (items?.length > 0 ? Math.ceil(items.length / this.offset) : 0);

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
   * Validate props
   */
  componentWillLoad(): void {
    this.watchCheckboxes(this.checkboxes);
  }

  /**
   * Render
   * @returns HTML Element
   */
  render(): HTMLElement {
    const getText = (checkboxes: CheckboxItem[]): HTMLElement => (
      <em class="mg-c-input__section-header-title-label">{`${this.messages[checkboxes.length > 1 ? 'titlePlural' : 'title']} (${checkboxes.length})`}</em>
    );
    const [from, to] = this.getFromToIndexes();
    const itemsContainerId = `items-${this.sectionKind}-container`;

    return (
      <Host hidden={this.checkboxes.length < 1}>
        <div class="mg-c-input__section-header">
          {this.sectionKind === SectionKind.SELECTED ? (
            <mg-button variant="flat" onClick={this.handleToggleClick} aria-controls={itemsContainerId} aria-expanded={this.expanded.toString()}>
              <mg-icon icon={this.expanded ? 'chevron-up' : 'chevron-down'}></mg-icon>
              <span class="mg-c-input__section-header-title">{getText(this.checkboxes)}</span>
            </mg-button>
          ) : (
            <p class="mg-c-input__section-header-title mg-c-input__section-header-title--static">{getText(this.checkboxes)}</p>
          )}
          {((this.sectionKind === SectionKind.SELECTED && this.expanded) || this.sectionKind === SectionKind.NOT_SELECTED) && (
            <mg-tooltip class="mg-c-input__section-header-tootlip" message={this.messages.tooltip}>
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
        <div hidden={!this.expanded} id={itemsContainerId} class="mg-c-input__section-content">
          <MgInputCheckboxList
            checkboxes={this.getArrayRange(this.checkboxes, from, to)}
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
