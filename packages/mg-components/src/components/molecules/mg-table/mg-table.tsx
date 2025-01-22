import { Component, Element, State } from '@stencil/core';
import { ClassList } from '@mgdis/stencil-helpers';

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

  /**************
   * Decorators *
   **************/

  /**
   * Get component DOM element
   */
  @Element() element: HTMLMgTableElement;

  /**
   *
   */
  @State() classCollection: ClassList = new ClassList([this.componentClass]);

  /*************
   * Lifecycle *
   *************/

  /**
   * Set variables and validate props
   */
  componentWillLoad(): void {
    const slottedTable = this.element.firstElementChild;
    if (!slottedTable.classList.contains(this.componentClass)) {
      slottedTable.classList.add(this.componentClass);
    }
    this.element.shadowRoot.append(slottedTable);
  }
}
