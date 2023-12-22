import { Component, Event, EventEmitter, h, Prop, Watch } from '@stencil/core';
import { isValidString } from '@mgdis/stencil-helpers';

@Component({
  tag: 'mg-details',
  styleUrl: '../../../../node_modules/@mgdis/styles/dist/components/mg-details.css',
  shadow: true,
})
export class MgDetails {
  /************
   * Internal *
   ************/

  // HTML selector
  private details: HTMLDetailsElement;

  /**************
   * Decorators *
   **************/

  /**
   * Displayed title when details are closed
   */
  @Prop() toggleClosed!: string;

  /**
   * Displayed title when details are opened
   */
  @Prop() toggleOpened!: string;
  @Watch('toggleClosed')
  @Watch('toggleOpened')
  validateTitles(newValue: string): void {
    if (!isValidString(newValue)) {
      throw new Error('<mg-details> prop "toggleClosed" and "toggleOpened" must be defined.');
    }
  }

  /**
   * Hide summary element
   */
  @Prop() hideSummary = false;

  /**
   * Define if details are diplayed
   */
  @Prop({ mutable: true }) expanded = false;
  @Watch('expanded')
  handleExpanded(newValue: boolean): void {
    this.expandedChange.emit(newValue);
  }

  /**
   * Emmited event when expanded change
   */
  @Event({ eventName: 'expanded-change' }) expandedChange: EventEmitter<HTMLMgDetailsElement['expanded']>;

  /**
   * Handle details toggle
   */
  private handleToggle = (): void => {
    this.expanded = this.details.open;
  };

  /*************
   * Lifecycle *
   *************/

  /**
   * Check if component props are well configured on init
   */
  componentWillLoad(): void {
    this.validateTitles(this.toggleClosed);
    this.validateTitles(this.toggleOpened);
  }

  /**
   * Render
   * @returns HTML Element
   */
  render(): HTMLElement {
    return (
      <details class="mg-c-details" onToggle={this.handleToggle} open={this.expanded} ref={(el: HTMLDetailsElement) => (this.details = el)}>
        <summary>
          <slot name="summary"></slot>
          <span class="mg-c-details__toggle">
            <mg-icon icon="chevron-up" size="small" class={{ 'mg-c-details__toggle-icon': true, 'mg-c-details__toggle-icon--reverse': !this.expanded }}></mg-icon>
            <span class={{ 'mg-u-visually-hidden': this.hideSummary }}>{this.expanded ? this.toggleOpened : this.toggleClosed}</span>
          </span>
        </summary>
        <div class="mg-c-details__details">
          <slot name="details"></slot>
        </div>
      </details>
    );
  }
}
