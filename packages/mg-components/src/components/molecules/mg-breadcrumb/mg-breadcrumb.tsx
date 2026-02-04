import { Component, Element, Event, EventEmitter, h, Prop, State, Watch } from '@stencil/core';
import { BreadcrumbItem } from './mg-breadcrumb.conf';
import { initLocales } from '../../../locales';
import { isValidString } from '@mgdis/core-ui-helpers/dist/utils';

@Component({
  tag: 'mg-breadcrumb',
  styleUrl: '../../../../node_modules/@mgdis/styles/dist/components/mg-breadcrumb.css',
  shadow: true,
})
export class MgBreadcrumb {
  /**************
   * Decorators *
   **************/

  /**
   * Get component DOM element
   */
  @Element() element: HTMLMgBreadcrumbElement;

  /**
   * Breadcrumb items (hierarchical order: root → current page).
   * Can be set as a JavaScript array (property) or as a JSON string (HTML attribute).
   */
  @Prop() items: BreadcrumbItem[] | string;
  @Watch('items')
  watchItems(): void {
    this.syncResolvedItems();
  }

  /**
   * Landmark label for accessibility. If absent, uses i18n message.
   */
  @Prop() label?: string;

  /**
   * Emitted when a link is clicked (e.g. for routing without full page reload).
   * The native event is included so preventDefault() can be called in a single listener.
   */
  @Event({ eventName: 'item-click' }) itemClick: EventEmitter<{ href: string; label: string; event: MouseEvent }>;

  /************
   * Internal *
   ************/

  private messages: { breadcrumb: { label: string } };

  /**
   * Items ready for render: parsed from the `items` prop (array or JSON string) and validated.
   * Updated only when `items` is set or changes, via syncResolvedItems().
   */
  @State() private resolvedItems: BreadcrumbItem[] = [];

  /***********
   * Methods *
   **********/

  /**
   * Normalize items: return the array as-is or parse JSON from the items attribute.
   * @param raw - The items prop (array or JSON string)
   * @returns Normalized breadcrumb items array
   */
  private normalizeItems(raw: BreadcrumbItem[] | string): BreadcrumbItem[] {
    if (Array.isArray(raw)) return raw;
    if (typeof raw === 'string') {
      try {
        const parsed = JSON.parse(raw) as unknown;
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        throw new Error(`<mg-breadcrumb> prop "items": Invalid JSON in attribute.`);
      }
    }
    return [];
  }

  /**
   * Validate items array: non-empty and each item must have a non-empty label.
   * @param list - The normalized items array
   */
  private validateItemsList(list: BreadcrumbItem[]): void {
    if (list.length === 0 || list.some(item => !isValidString(item.label) || item.label.trim() === '')) {
      throw new Error(`<mg-breadcrumb> prop "items": Cannot be empty and each item must have a non-empty label.`);
    }
  }

  /**
   * Parse and validate the `items` prop, then update `resolvedItems`.
   * Called on init and whenever `items` changes so the rendered list stays in sync.
   */
  private syncResolvedItems(): void {
    const list = this.normalizeItems(this.items);
    this.validateItemsList(list);
    this.resolvedItems = list;
  }

  /**
   * Get nav aria-label: prop label or i18n
   * @returns The nav aria-label string
   */
  private getNavLabel(): string {
    return isValidString(this.label) ? this.label : this.messages.breadcrumb.label;
  }

  /**
   * Handle link click and emit item-click event (href and label read from the clicked anchor)
   */
  private handleLinkClick = (event: MouseEvent): void => {
    const anchor = event.currentTarget as HTMLAnchorElement;
    const href = anchor.getAttribute('href');
    if (!isValidString(href)) return;
    const label = anchor.getAttribute('aria-label') ?? anchor.textContent?.trim() ?? '';
    anchor.blur();
    this.itemClick.emit({ href, label, event });
  };

  /**
   * Render a single breadcrumb item (link or current page)
   * @param item - The breadcrumb item
   * @param isLast - Whether this item is the last in the list
   * @returns The rendered link or span element
   */
  private renderItem(item: BreadcrumbItem, isLast: boolean): HTMLElement {
    const isLink = isValidString(item.href);

    if (isLink) {
      const linkContent = item.icon !== undefined ? <mg-icon icon={item.icon} aria-hidden="true"></mg-icon> : item.label;
      const ariaLabel = item.icon !== undefined ? item.label : undefined;
      return (
        <a href={item.href} class="mg-c-breadcrumb__link" aria-label={ariaLabel} aria-current={isLast ? 'page' : undefined} onClick={this.handleLinkClick}>
          {linkContent}
        </a>
      );
    }

    return (
      <span class="mg-c-breadcrumb__current" aria-current="page">
        {item.label}
      </span>
    );
  }

  /*************
   * Lifecycle *
   *************/

  componentWillLoad(): void {
    this.syncResolvedItems();
    this.messages = initLocales(this.element).messages as { breadcrumb: { label: string } };
  }

  render(): HTMLElement {
    const navLabel = this.getNavLabel();
    const list = this.resolvedItems;

    return (
      <nav role="navigation" aria-label={navLabel} class="mg-c-breadcrumb">
        <ol class="mg-c-breadcrumb__list">
          {list.map((item, index) => (
            <li key={index} class="mg-c-breadcrumb__item">
              {this.renderItem(item, index === list.length - 1)}
            </li>
          ))}
        </ol>
      </nav>
    );
  }
}
