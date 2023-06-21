import { Component, h, Prop, State, Event, EventEmitter, Watch, Host } from '@stencil/core';
import { CheckboxItem, IMgInputCheckboxBase, SectionKind, SectionTitleKind } from './mg-input-checkbox.conf';
import { MgInputCheckboxList } from './MgInputCheckboxList';

@Component({
  tag: 'mg-input-checkbox-paginated',
  shadow: false,
})
export class MgInputCheckboxPaginated implements IMgInputCheckboxBase {
  /*************
   * Constantes *
   *************/
  private readonly searchOffset = 10;

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
   * Define mg-input-checkbox-list identifier
   */
  @Prop() identifier: string;

  /**
   * Define checkboxes to paginate
   */
  @Prop() checkboxes: CheckboxItem[] = [];
  @Watch('checkboxes')
  validateChecboxes(newValue: MgInputCheckboxPaginated['checkboxes'], oldValue: MgInputCheckboxPaginated['checkboxes']): void {
    // after each array.length update we reset pagination
    if (newValue.length !== oldValue.length) this.currentSearchPage = 1;
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
   * Define 'mass-action' event
   */
  @Event({ eventName: 'mass-action' }) massAction: EventEmitter<MgInputCheckboxPaginated['sectionKind']>;

  /**
   * Define section title
   */
  @State() titleKind: SectionTitleKind;

  /**
   * Search current page
   */
  @State() currentSearchPage = 1;

  /**
   * Is checked items values expanded
   */
  @State() itemsExpanded = true;

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
   * Toogle items button handler
   */
  private handleToggleClick = (): void => {
    this.itemsExpanded = !this.itemsExpanded;
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
    const isFirstPage = this.currentSearchPage === 1;
    const checkboxItemsFromIndex = isFirstPage ? 0 : (this.currentSearchPage - 1) * this.searchOffset;
    const checkboxItemsToIndex = isFirstPage ? this.searchOffset : this.currentSearchPage * this.searchOffset;
    return [checkboxItemsFromIndex, checkboxItemsToIndex];
  }

  /**
   * Method to get pagination total-page
   * @param checkboxes - checkboxes to paginate
   * @returns total page number for pagination
   */
  private getPaginationTotalPages = (checkboxes: CheckboxItem[]): number => Math.ceil(checkboxes.length / this.searchOffset);

  /**
   * Handle mg-pagination current page change event
   * @param event - pagination current page change event
   */
  private handleCurrentPageChange = (event: CustomEvent): void => {
    this.currentSearchPage = Number(event.detail);
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
    const [checkboxItemsFromIndex, checkboxItemsToIndex] = this.getFromToIndexes();
    const itemsContainerId = `items-${this.sectionKind}-container`;

    const getText = (checkboxes: CheckboxItem[]): HTMLElement => <em>{`${this.messages[checkboxes.length > 1 ? 'titlePlurial' : 'title']} (${checkboxes.length})`}</em>;

    return (
      <Host>
        <div class="mg-input__input-checkbox-multi-section-header">
          {this.titleKind === SectionTitleKind.BUTTON ? (
            <mg-button
              variant="flat"
              class="mg-input__input-checkbox-multi-section-button"
              onClick={this.handleToggleClick}
              aria-controls={itemsContainerId}
              aria-expanded={this.itemsExpanded.toString()}
            >
              <mg-icon icon={this.itemsExpanded ? 'chevron-down' : 'chevron-up'} size="small"></mg-icon>
              <span class="mg-input__input-checkbox-multi-text">{getText(this.checkboxes)}</span>
            </mg-button>
          ) : (
            <p class="mg-input__input-checkbox-multi-title">{getText(this.checkboxes)}</p>
          )}
          {((this.sectionKind === SectionKind.SELECTED && this.itemsExpanded) || this.sectionKind === SectionKind.NOT_SELECTED) && (
            <mg-button variant="link" class="mg-input__input-checkbox-multi-section-button" onClick={this.massActionHandler}>
              {this.messages.action}
            </mg-button>
          )}
          {this.getPaginationTotalPages(this.checkboxes) > 1 && (
            <mg-pagination
              key="search-pagination"
              totalPages={this.getPaginationTotalPages(this.checkboxes)}
              currentPage={this.currentSearchPage}
              onCurrent-page-change={this.handleCurrentPageChange}
              hideNavigationLabels={true}
              hideSelectInput={true}
              identifier={`input-checkbox-pagination-${this.sectionKind}`}
            ></mg-pagination>
          )}
        </div>
        <div hidden={!this.itemsExpanded} id={itemsContainerId} class="mg-input__input-checkbox-multi-section-content">
          <MgInputCheckboxList
            checkboxes={this.getArrayRange(this.checkboxes, checkboxItemsFromIndex, checkboxItemsToIndex)}
            inputVerticalList={true}
            type={'multi'}
            displaySearchInput={true}
            messages={this.messages}
            id={`items-${this.sectionKind}`}
            readonly={this.readonly}
            disabled={this.disabled}
            identifier={this.identifier}
          ></MgInputCheckboxList>
        </div>
      </Host>
    );
  }
}
