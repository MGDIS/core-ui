import { Component, Element, h, Prop, Watch } from '@stencil/core';
import { BreadcrumbItem } from './mg-breadcrumb.conf';
import { initLocales } from '../../../locales';
import { isValidString, toString } from '@mgdis/core-ui-helpers/dist/utils';
import type { MessageType } from '../../../locales/index.conf';

/**
 * Type guard for BreadcrumbItem[]
 * @param items - value to check
 * @returns true if items is a non-empty array of valid BreadcrumbItem (label required, href required except for last item)
 */
const isBreadcrumbItems = (items: unknown): items is BreadcrumbItem[] =>
  Array.isArray(items) &&
  items.length > 0 &&
  items.every(
    (item, index) => typeof item === 'object' && item !== null && isValidString(item.label) && item.label.trim() !== '' && (index === items.length - 1 || isValidString(item.href)),
  );

@Component({
  tag: 'mg-breadcrumb',
  styleUrl: '../../../../node_modules/@mgdis/styles/dist/components/mg-breadcrumb.css',
  shadow: true,
})
export class MgBreadcrumb {
  /************
   * Internal *
   ************/

  private messages: MessageType;

  /**************
   * Decorators *
   **************/

  /**
   * Get component DOM element
   */
  @Element() element: HTMLMgBreadcrumbElement;

  /**
   * Breadcrumb items (hierarchical order: root → current page).
   * Must be set via JavaScript (property only). Passing via HTML attribute is not supported.
   */
  @Prop() items!: BreadcrumbItem[];
  @Watch('items')
  validateItems(newValue: MgBreadcrumb['items']): void {
    if (newValue === undefined || !isBreadcrumbItems(newValue)) {
      throw new Error(`<mg-breadcrumb> prop "items" is required and all values must be the same type, BreadcrumbItem. Passed value: ${toString(newValue)}.`);
    }
  }

  /***********
   * Methods *
   **********/

  /**
   * Render a single breadcrumb item (link or current page)
   * @param item - The breadcrumb item
   * @param isLast - Whether this item is the last in the list
   * @returns The rendered link or span element
   */
  private renderItem(item: BreadcrumbItem, isLast: boolean): HTMLElement {
    const isLink = isValidString(item.href);

    if (isLink) {
      const linkContent = item.icon !== undefined ? <mg-icon icon={item.icon}></mg-icon> : item.label;
      const ariaLabel = item.icon !== undefined ? item.label : undefined;
      return (
        <a href={item.href} aria-label={ariaLabel} aria-current={isLast ? 'page' : undefined}>
          {linkContent}
        </a>
      );
    }

    return <span aria-current="page">{item.label}</span>;
  }

  /*************
   * Lifecycle *
   *************/

  componentWillLoad(): void {
    this.validateItems(this.items);
    this.messages = initLocales(this.element).messages.breadcrumb as MessageType;
  }

  render(): HTMLElement {
    return (
      <nav aria-label={this.messages.label} class="mg-c-breadcrumb">
        <ol class="mg-c-breadcrumb__list">
          {this.items.map((item, index) => (
            <li key={`${index}-${item.href ?? item.label}`} class="mg-c-breadcrumb__list-item">
              {this.renderItem(item, index === this.items.length - 1)}
            </li>
          ))}
        </ol>
      </nav>
    );
  }
}
