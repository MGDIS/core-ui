import { Component, h, Prop, Watch, Host, State, Method } from '@stencil/core';
import { CheckboxItem, IMgInputCheckboxBase } from '../mg-input-checkbox.conf';
import { MgInputCheckboxList } from '../MgInputCheckboxList';
import { formatID } from '@mgdis/core-ui-helpers/dist/utils';

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
   * Variables *
   *************/

  private items: CheckboxItem[];
  private readonly step = 10;

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
   * Define checkboxes to paginate
   */
  @Prop() checkboxes: CheckboxItem[];
  @Watch('checkboxes')
  watchCheckboxes(): void {
    this.setItems();
  }

  /**
   * Define component message
   */
  @Prop() messages: Record<string, string>;

  /**
   * Page items limit to display
   */
  @State() limit = this.step;
  @Watch('limit')
  watchLimit(): void {
    this.setItems();
  }

  /**
   * Method to reset limit
   */
  @Method()
  async resetLimit(): Promise<void> {
    this.limit = this.step;
  }

  /***********
   * Methods *
   ***********/

  /**
   * Component has next checkboxes to display
   * @returns truthy if have next elements
   */
  private hasNext = (): boolean => {
    return this.checkboxes.length > this.limit;
  };

  /**
   * Set items from checkboxes and limit
   */
  private setItems = (): void => {
    this.items = this.checkboxes.slice(0, this.limit);
  };

  /**
   * Handle load-more <mg-button> click event
   */
  private handleLoadMore = (): void => {
    if (this.hasNext()) {
      this.limit += this.step;
    }
  };

  /*************
   * Lifecycle *
   *************/

  /**
   * Validate props
   */
  componentWillLoad(): void {
    this.watchCheckboxes();
  }

  /**
   * Render
   * @returns HTML Element
   */
  render(): HTMLElement {
    const listId = formatID(this.messages.label);
    const tabId = 'tab-info';
    return (
      <Host>
        <slot name="header-action"></slot>
        <div class="mg-c-input__tabs-content">
          <p id={tabId} class={{ 'mg-c-input__popover-info': true, 'mg-u-visually-hidden': this.items.length !== 0 }} aria-live={this.items.length !== 0 ? 'polite' : undefined}>
            {this.items.length === 0 ? this.messages.noValue : this.messages.values.replace('{count}', this.items.length.toString())}
          </p>
          {this.items.length > 0 && (
            <MgInputCheckboxList checkboxes={this.items} labelledby={tabId} id={listId} disabled={this.disabled} name={this.name} invalid={this.invalid}></MgInputCheckboxList>
          )}
          {this.hasNext() && (
            <mg-button key="load-more" variant="flat" class="mg-c-input__load-more" tabIndex={-1} full-width onClick={this.handleLoadMore} aria-controls={listId}>
              <mg-icon icon="chevron-down"></mg-icon>
              {this.messages.showMore}
            </mg-button>
          )}
        </div>
      </Host>
    );
  }
}
