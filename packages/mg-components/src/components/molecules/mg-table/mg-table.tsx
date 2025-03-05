import { Component, Element, State, Prop, Watch } from '@stencil/core';
import { ClassList, toString, createID, isValidString } from '@mgdis/stencil-helpers';
import { type TableSizeType, type ColumnsType, type datatypesType, textAlignments, dataTypes, sizes } from './mg-table.conf';
import { initLocales } from '../../../locales';

/**
 * Check if value is a valid align object
 * @param newValue - New value
 * @returns True if value is a valid align object
 */
const isValidColumnsObject = (newValue: ColumnsType): boolean =>
  // ensure newValue is an object
  typeof newValue === 'object' &&
  !Array.isArray(newValue) &&
  // Ensure every property is well formatted
  Object.entries(newValue).every(
    ([key, value]) =>
      // ensure key is a number
      !isNaN(parseInt(key)) &&
      // ensure value is an object
      typeof value === 'object' &&
      !Array.isArray(value) &&
      // ensure value has at least one of the following properties
      ((value.align !== undefined && textAlignments.includes(value.align)) ||
        (value.sortable !== undefined && typeof value.sortable === 'boolean') ||
        (value.datatype !== undefined && dataTypes.includes(value.datatype))) &&
      // ensure no extra properties are present
      Object.keys(value).every(key => ['align', 'sortable', 'datatype'].includes(key)),
  );

/**
 * Compare values
 * @param firstValue - First value
 * @param secondValue - Second value
 * @param descending - Define descending order
 * @param datatype - Data type
 * @returns Comparison result
 * @example
 * compareValues('a', 'b', false, 'string'); // -1
 */
const compareValues = (firstValue: string, secondValue: string, descending: boolean, datatype: datatypesType): number => {
  if (descending) {
    const temp = firstValue;
    firstValue = secondValue;
    secondValue = temp;
  }
  if (datatype === 'date') {
    return new Date(firstValue).getTime() - new Date(secondValue).getTime();
  }
  return firstValue.localeCompare(secondValue, undefined, { numeric: datatype === 'numeric' });
};

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

  private messages;

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
   * Define column properties
   */
  @Prop() columns: ColumnsType;
  @Watch('columns')
  watchColumns(newValue: ColumnsType): void {
    if (newValue !== undefined && !isValidColumnsObject(newValue)) {
      throw new Error(`<mg-table> prop "columns" must be a ColumnsType object. Passed value: ${toString(newValue)}.`);
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
    let isSortable = false;
    // Remove table classes
    table.className = '';
    // Add table classes
    table.classList.add(...this.classCollection.classes);

    // Set columns based on columns prop
    if (this.columns !== undefined) {
      // Store original rows
      const rowsDefault = Array.from(table.querySelectorAll('tbody tr'));

      // Apply columns settings
      Object.entries(this.columns).forEach(([key, value]) => {
        // Add alignment to stylesheet
        if (value.align !== undefined) {
          this.alignmentStylesheet.insertRule(`.${this.componentClass}{th:nth-child(${key}),td:nth-child(${key}){text-align:${value.align}}}`);
        }
        // if align is not defined and datatype is number, align right
        else if (value.datatype === 'numeric') {
          this.alignmentStylesheet.insertRule(`.${this.componentClass}{th:nth-child(${key}),td:nth-child(${key}){text-align:right}}`);
        }

        // Define if column is sortable
        if (value.sortable) {
          isSortable = true;
          // Add sortable class to table header
          const sortableHeader = table.querySelector(`thead td:nth-child(${key}),thead th:nth-child(${key})`);

          // Create button
          const button = document.createElement('button');
          button.classList.add('mg-c-table__sort-button');

          // Append button to header
          const sortableHeaderContent = sortableHeader.innerHTML;
          sortableHeader.innerHTML = '';
          button.innerHTML = sortableHeaderContent;

          // Set icon
          const icon = document.createElement('mg-icon');
          icon.setAttribute('icon', 'arrows-up-down');

          // Append icon to button
          button.append(icon);
          sortableHeader.append(button);

          // Add event listener
          button.addEventListener('click', (): void => {
            // Reset aria pressed
            table.querySelectorAll(`thead td:not(:nth-child(${key})) [aria-pressed],thead th:not(:nth-child(${key})) [aria-pressed]`).forEach(ariaPressed => {
              ariaPressed.removeAttribute('aria-pressed');
              ariaPressed.querySelector('mg-icon').setAttribute('icon', 'arrows-up-down');
            });
            // Reset aria sort
            table.querySelectorAll(`thead td:not(:nth-child(${key}))[aria-sort],thead th:not(:nth-child(${key}))[aria-sort]`).forEach(ariaSort => {
              ariaSort.removeAttribute('aria-sort');
            });

            // Set aria pressed
            button.setAttribute('aria-pressed', 'true');

            // Manage sort order
            // Get sort order
            let sortOrder = sortableHeader.getAttribute('aria-sort');

            // First click sort asc
            if ([null, 'none'].includes(sortOrder)) {
              sortableHeader.setAttribute('aria-sort', 'ascending');
            }
            // Second click sort desc
            else if (sortOrder === 'ascending') {
              sortableHeader.setAttribute('aria-sort', 'descending');
            }
            // Third click remove sort
            else {
              sortableHeader.setAttribute('aria-sort', 'none');
            }

            // Update sort order
            sortOrder = sortableHeader.getAttribute('aria-sort');

            // Update button icon
            const icon = button.querySelector('mg-icon');
            let iconType = 'arrows-up-down';
            if (sortOrder === 'ascending') {
              iconType = 'arrow-up';
            } else if (sortOrder === 'descending') {
              iconType = 'arrow-down';
            }
            icon.setAttribute('icon', iconType);

            // If sort order is none, return to original order
            if (sortOrder === 'none') {
              // Append rows to table
              rowsDefault.forEach(row => table.querySelector('tbody').append(row));
              return;
            }

            // Set a copy of rows
            const rows = Array.from(table.querySelectorAll('tbody tr'));

            // Sort rows
            rows.sort((a, b) => {
              // Get cells
              const cellA: HTMLTableCellElement = a.querySelector(`td:nth-child(${key}),th:nth-child(${key})`);
              const cellB: HTMLTableCellElement = b.querySelector(`td:nth-child(${key}),th:nth-child(${key})`);

              // Get cell values
              const cellValueA = cellA.dataset.sort ?? cellA.textContent;
              const cellValueB = cellB.dataset.sort ?? cellB.textContent;

              // Sort cells based on sort order
              return compareValues(cellValueA, cellValueB, sortOrder === 'descending', value.datatype);
            });

            // Append rows to table
            rows.forEach(row => table.querySelector('tbody').append(row));
          });
        }
      });
    }

    // Add alignment to columns
    this.element.shadowRoot.adoptedStyleSheets = [...this.element.shadowRoot.adoptedStyleSheets, this.alignmentStylesheet];

    // Create div wrapper for responsive behavior
    const divWrapper = document.createElement('div');
    divWrapper.setAttribute('class', this.componentWrapperClass);
    divWrapper.setAttribute('tabindex', '0');
    divWrapper.setAttribute('role', 'region');

    // Get table title
    let captionTable = table.querySelector('caption');

    // If table is sortable we must add a caption
    if (captionTable === null && isSortable) {
      captionTable = document.createElement('caption');
      table.prepend(captionTable);
    }

    if (captionTable !== null) {
      // Ensure caption is not visible (otherwhise the table does not have rounded corners)
      captionTable.className = 'mg-u-visually-hidden';

      // Link caption to div
      if (!isValidString(captionTable.id)) {
        captionTable.setAttribute('id', createID(`${this.componentClass}-caption`));
      }
      divWrapper.setAttribute('aria-labelledby', captionTable.id);

      // Add sortable caption if neeeded
      if (isSortable) {
        captionTable.innerHTML = `${captionTable.innerHTML} ${this.messages.table.sortableCaption}`.trim();
      }
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

  componentWillLoad(): void {
    this.messages = initLocales(this.element).messages;
  }

  /**
   * Set variables and validate props
   */
  componentDidLoad(): void {
    this.watchSize(this.size);
    this.watchFullWidth(this.fullWidth);
    this.watchColumns(this.columns);
    this.renderTable(this.element.querySelector('table'));
  }

  /**
   * Update table
   */
  componentWillUpdate(): void {
    this.renderTable(this.element.shadowRoot.querySelector('table'));
  }
}
