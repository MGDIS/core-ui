import { Component, Element, h, Prop, Watch } from '@stencil/core';
import { BreadcrumbItem } from './mg-breadcrumb.conf';
import { initLocales } from '../../../locales';
import { isValidString } from '@mgdis/core-ui-helpers/dist/utils';

@Component({
  tag: 'mg-breadcrumb',
  styleUrl: '../../../../node_modules/@mgdis/styles/dist/components/mg-breadcrumb.css',
  shadow: true,
})
export class MgBreadcrumb {
  /************
   * Internal *
   ************/

  private messages: { breadcrumb: { label: string } };

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
  @Prop() items: BreadcrumbItem[];
  @Watch('items')
  validateItems(items: BreadcrumbItem[]): void {
    if (items !== undefined) {
      if (typeof items === 'string') {
        throw new Error(`<mg-breadcrumb> prop "items": Must be set via JavaScript (property), not via HTML attribute.`);
      }
      if (items.length === 0 || items.some(item => !isValidString(item.label) || item.label.trim() === '')) {
        throw new Error(`<mg-breadcrumb> prop "items": Cannot be empty and each item must have a non-empty label.`);
      }
      const itemWithoutHref = items.findIndex((item, index) => index < items.length - 1 && !isValidString(item.href));
      if (itemWithoutHref !== -1) {
        throw new Error(`<mg-breadcrumb> prop "items": Only the last item may have no href (current page). Item at index ${itemWithoutHref} has no href.`);
      }
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
    this.messages = initLocales(this.element).messages as { breadcrumb: { label: string } };
  }

  render(): HTMLElement {
    return (
      <nav aria-label={this.messages.breadcrumb.label} class="mg-c-breadcrumb">
        <ol class="mg-c-breadcrumb__list">
          {this.items.map((item, index) => (
            <li
              key={this.items
                .slice(0, index + 1)
                .map(i => i.label)
                .join(' / ')}
              class="mg-c-breadcrumb__item"
            >
              {this.renderItem(item, index === this.items.length - 1)}
            </li>
          ))}
        </ol>
      </nav>
    );
  }
}
