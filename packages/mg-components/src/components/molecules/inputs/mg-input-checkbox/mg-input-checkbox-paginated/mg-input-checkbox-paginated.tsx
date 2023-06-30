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
   * Define checkboxes to paginate
   */
  @Prop() checkboxes: CheckboxItem[] = [];
  @Watch('checkboxes')
  validateCheckboxes(newValue: MgInputCheckboxPaginated['checkboxes'], oldValue: MgInputCheckboxPaginated['checkboxes']): void {
    // after each array.length update we reset pagination
    // when items fill on page, we set current page to 1
    if (this.getPageCount(newValue) === 1) this.currentPage = 1;
    // when old items page numbers match the current page AND new items page number is lower than current page, we set the new last page
    else if (this.getPageCount(oldValue) === this.currentPage && this.getPageCount(newValue) < this.currentPage) this.currentPage = this.getPageCount(newValue);
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
  @Event({ eventName: 'mass-action' }) massAction: EventEmitter<MgInputCheckboxPaginated['sectionKind']>;

  /**
   * Define section title
   */
  @State() titleKind: SectionTitleKind;

  /**
   * Current page
   */
  @State() currentPage = 1;

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
    const isFirstPage = this.currentPage === 1;
    const checkboxItemsFromIndex = isFirstPage ? 0 : (this.currentPage - 1) * this.offset;
    const checkboxItemsToIndex = isFirstPage ? this.offset : this.currentPage * this.offset;
    return [checkboxItemsFromIndex, checkboxItemsToIndex];
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
    const [checkboxItemsFromIndex, checkboxItemsToIndex] = this.getFromToIndexes();
    const itemsContainerId = `items-${this.sectionKind}-container`;

    const getText = (checkboxes: CheckboxItem[]): HTMLElement => <em>{`${this.messages[checkboxes.length > 1 ? 'titlePlurial' : 'title']} (${checkboxes.length})`}</em>;

    return (
      <Host hidden={this.checkboxes.length < 1}>
        <div class="mg-input__input-checkbox-multi-section-header">
          {this.titleKind === SectionTitleKind.BUTTON ? (
            <mg-button variant="flat" onClick={this.handleToggleClick} aria-controls={itemsContainerId} aria-expanded={this.itemsExpanded.toString()}>
              <mg-icon icon={this.itemsExpanded ? 'chevron-up' : 'chevron-down'} size="small"></mg-icon>
              <span class="mg-input__input-checkbox-multi-text">{getText(this.checkboxes)}</span>
            </mg-button>
          ) : (
            <p class="mg-input__input-checkbox-multi-title">{getText(this.checkboxes)}</p>
          )}
          {((this.sectionKind === SectionKind.SELECTED && this.itemsExpanded) || this.sectionKind === SectionKind.NOT_SELECTED) && (
            <mg-button variant="link" class="mg-input__input-checkbox-multi-select-button" onClick={this.massActionHandler}>
              {this.messages.action}
            </mg-button>
          )}
          {this.getPageCount(this.checkboxes) > 1 && (
            <mg-pagination
              key="search-pagination"
              totalPages={this.getPageCount(this.checkboxes)}
              currentPage={this.currentPage > 1 ? this.currentPage : 1}
              onCurrent-page-change={this.handleCurrentPageChange}
              hideNavigationLabels={true}
              hidePageCount={true}
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
            name={this.name}
          ></MgInputCheckboxList>
        </div>
      </Host>
    );
  }
}
