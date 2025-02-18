import { Component, Element, State, Prop, Watch } from '@stencil/core';
import { ClassList, toString, createID, isValidString } from '@mgdis/stencil-helpers';
import { type TableSizeType, type ColumnsAlignmentType, alignments, sizes } from './mg-table.conf';

/**
 * Check if value is a valid align object
 * @param newValue - New value
 * @returns True if value is a valid align object
 */
const isValidAlignObject = (newValue: unknown): boolean =>
  typeof newValue === 'object' &&
  !Array.isArray(newValue) &&
  Object.entries(newValue).every(([key, value]) => {
    return !isNaN(parseInt(key)) && alignments.includes(value);
  });

/**
 * @slot - Table content
 */
@Component({
  tag: 'mg-table',
  styleUrl: '../../../../node_modules/@mgdis/styles/dist/components/mg-table.css',
  shadow: true,
})
export class MgTable {
  /************
   * Internal *
   ************/

  // Classes
  private readonly componentClass = 'mg-c-table';
  private readonly componentWrapperClass = 'mg-c-table-wrapper';
  private readonly classFullWidth = 'mg-c-table--full-width';

  // Alignment stylesheet
  private alignmentStylesheet = new CSSStyleSheet();

  /**************
   * Decorators *
   **************/

  /**
   * Get component DOM element
   */
  @Element() element: HTMLMgTableElement;

  /**
   * Define table size
   */
  @Prop() size: TableSizeType = 'medium';
  @Watch('size')
  watchSize(newValue: MgTable['size'], oldValue?: MgTable['size']): void {
    if (!sizes.includes(newValue)) {
      throw new Error(`<mg-table> prop "size" must be one of: ${sizes.join(', ')}. Passed value: ${toString(newValue)}.`);
    } else {
      if (oldValue !== undefined) {
        this.classCollection.delete(`mg-c-table--size-${oldValue}`);
      }
      this.classCollection.add(`mg-c-table--size-${newValue}`);
    }
  }

  /**
   * Define if table fits its parent element
   */
  @Prop() fullWidth = false;
  @Watch('fullWidth')
  watchFullWidth(newValue: MgTable['fullWidth']): void {
    if (newValue) {
      this.classCollection.add(this.classFullWidth);
    } else {
      this.classCollection.delete(this.classFullWidth);
    }
  }

  /**
   * Define column alignment.
   *
   * Can be a string: `left`, `center`, `right`; In this case all columns will have the same alignment.
   *
   * Can be an array: `['left', 'center', 'right']`; In this case each column will have the corresponding alignment.
   *
   * Can be an object: `{ 2: 'center' }`; In this case the column 2 will have the corresponding alignment.
   */
  @Prop() columnsAlignment: ColumnsAlignmentType;
  @Watch('columnsAlignment')
  watchColumnAlign(newValue: MgTable['columnsAlignment']): void {
    if (newValue !== undefined) {
      // String value
      if (typeof newValue === 'string' && alignments.includes(newValue)) {
        this.classCollection.add(`mg-c-table--align-${this.columnsAlignment}`);
      }
      // Object value
      else if (typeof newValue === 'object' && isValidAlignObject(newValue)) {
        Object.entries(newValue).forEach(([key, value]) => {
          this.alignmentStylesheet.insertRule(`.${this.componentClass}{th:nth-child(${key}),td:nth-child(${key}){text-align:${value}}}`);
        });
      } else {
        throw new Error(`<mg-table> prop "columnsAlignment" can be a string or an Object, values must be one of ${alignments.join(', ')}. Passed value: ${toString(newValue)}.`);
      }
    }
  }

  /**
   * Class collection
   */
  @State() classCollection: ClassList = new ClassList([this.componentClass]);

  /**
   * Render Table
   * @param table - Table element
   */
  private renderTable(table: HTMLTableElement): void {
    // Remove table classes
    table.className = '';
    // Add table classes
    table.classList.add(...this.classCollection.classes);

    // Add alignment to columns
    this.element.shadowRoot.adoptedStyleSheets = [...this.element.shadowRoot.adoptedStyleSheets, this.alignmentStylesheet];

    // Create div wrapper for responsive behavior
    const divWrapper = document.createElement('div');
    divWrapper.setAttribute('class', this.componentWrapperClass);
    divWrapper.setAttribute('tabindex', '0');
    divWrapper.setAttribute('role', 'region');

    // Get table title
    const captionTable = table.querySelector('caption');

    if (captionTable !== null) {
      // Ensure caption is not visible (otherwhise the table does not have rounded corners)
      captionTable.className = 'mg-u-visually-hidden';
      // Link caption to div
      if (!isValidString(captionTable.id)) {
        captionTable.setAttribute('id', createID(`${this.componentClass}-caption`));
      }
      divWrapper.setAttribute('aria-labelledby', captionTable.id);
    }
    divWrapper.append(table);

    // Remove existing table from shadow root
    const existingTable = this.element.shadowRoot.querySelector(`.${this.componentWrapperClass}`);
    if (existingTable !== null) {
      existingTable.remove();
    }
    // Append table
    this.element.shadowRoot.append(divWrapper);
  }

  /*************
   * Lifecycle *
   *************/

  /**
   * Set variables and validate props
   */
  componentDidLoad(): void {
    this.watchSize(this.size);
    this.watchFullWidth(this.fullWidth);
    this.watchColumnAlign(this.columnsAlignment);
    this.renderTable(this.element.querySelector('table'));
  }

  /**
   * Update table
   */
  componentWillUpdate(): void {
    this.renderTable(this.element.shadowRoot.querySelector('table'));
  }
}
