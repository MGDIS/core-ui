import { Component, Element, State, Prop, Watch } from '@stencil/core';
import { ClassList, toString, createID, isValidString } from '@mgdis/stencil-helpers';
import { type TableSizeType, sizes } from './mg-table.conf';

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
   *
   */
  @State() classCollection: ClassList = new ClassList([this.componentClass]);

  /**
   *
   */
  private renderTable(table: HTMLTableElement): void {
    // Remove table classes
    table.className = '';
    // Add table classes
    table.classList.add(...this.classCollection.classes);

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
    this.renderTable(this.element.querySelector('table'));
  }

  componentWillUpdate(): void {
    this.renderTable(this.element.shadowRoot.querySelector('table'));
  }
}
