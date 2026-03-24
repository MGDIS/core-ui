import { Component, Element, h, Prop, Watch } from '@stencil/core';
import { BreadcrumbItemType } from './mg-breadcrumb.conf';
import { initLocales } from '../../../locales';
import { isValidString, toString } from '@mgdis/core-ui-helpers/dist/utils';

/**
 * Type guard for BreadcrumbItemType[]
 * @param items - value to check
 * @returns true if items is a non-empty array of valid BreadcrumbItemType (label required, href required except for last item)
 */
const isBreadcrumbItems = (items: unknown): items is BreadcrumbItemType[] =>
  Array.isArray(items) &&
  items.length > 0 &&
  items.every((item, index) => typeof item === 'object' && item !== null && isValidString(item.label) && (index === items.length - 1 || isValidString(item.href)));

@Component({
  tag: 'mg-breadcrumb',
  styleUrl: '../../../../node_modules/@mgdis/styles/dist/components/mg-breadcrumb.css',
  shadow: true,
})
export class MgBreadcrumb {
  /************
   * Internal *
   ************/

  private messages;

  /**************
   * Decorators *
   **************/

  /**
   * Get component DOM element
   */
  @Element() element: HTMLMgBreadcrumbElement;

  /**
   * Breadcrumb items (hierarchical order: root → current page).
   */
  @Prop() items!: BreadcrumbItemType[];
  @Watch('items')
  validateItems(newValue: MgBreadcrumb['items']): void {
    if (newValue === undefined || !isBreadcrumbItems(newValue)) {
      throw new Error(`<mg-breadcrumb> prop "items" is required and all values must be the same type, BreadcrumbItemType. Passed value: ${toString(newValue)}.`);
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
  private renderItem(item: BreadcrumbItemType, isLast: boolean): HTMLElement {
    if (isValidString(item.href)) {
      return (
        <a href={item.href} aria-label={item.icon !== undefined ? item.label : undefined} aria-current={isLast ? 'page' : undefined}>
          {item.icon !== undefined ? <mg-icon icon={item.icon}></mg-icon> : item.label}
        </a>
      );
    }

    return <span>{item.label}</span>;
  }

  /*************
   * Lifecycle *
   *************/

  componentWillLoad(): void {
    this.validateItems(this.items);
    this.messages = initLocales(this.element).messages.breadcrumb;
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
