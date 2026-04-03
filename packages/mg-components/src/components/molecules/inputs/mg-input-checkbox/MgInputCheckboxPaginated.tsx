import { h, FunctionalComponent, VNode } from '@stencil/core';
import { ICheckboxItem, IMgInputCheckboxPaginatedProps } from './mg-input-checkbox.conf';
import { MgInputCheckboxList } from './MgInputCheckboxList';
import { formatID } from '@mgdis/core-ui-helpers/dist/utils';

/**
 * Get items from checkboxes and limit
 * @param checkboxes - checkboxes to slice
 * @param limit - number of items to return
 * @returns list of items to display in section
 */
const getItems = (checkboxes: ICheckboxItem[], limit: number): ICheckboxItem[] => [...checkboxes].slice(0, limit);

/**
 * Component has next checkboxes to display
 * @param checkboxes - checkboxes to check
 * @param limit - number of items to display
 * @returns truthy if have next elements
 */
const hasNext = (checkboxes: ICheckboxItem[], limit: number): boolean => checkboxes.length > limit;

/**
 * Internal component use to manage sections instances
 * @param props - MgInputCheckboxList Interface Props
 * @returns input template
 */
export const MgInputCheckboxPaginated: FunctionalComponent<IMgInputCheckboxPaginatedProps> = (props: IMgInputCheckboxPaginatedProps): VNode => {
  const items = getItems(props.checkboxes, props.limit);
  const listId = formatID(props.messages.label);
  const tabId = `tab-info-${props.key}`;

  /**
   * Handle load-more <mg-button> click event
   */
  const handleLoadMoreClick = (): void => {
    if (hasNext(props.checkboxes, props.limit)) {
      props.handleLoadMore();
    }
  };

  return (
    <div class="mg-input-checkbox-paginated mg-c-input__tab" slot={`tab_content-${props.key + 1}`}>
      {
        // Mass action depends on all checkboxes list, not only displayed items
        typeof props.handleMassAction === 'function' && props.checkboxes.length > 0 && props.checkboxes.some(checkbox => checkbox.disabled !== true) && (
          <mg-tooltip slot="header-action" class="mg-c-input__tabs-action" message={props.messages.tooltip}>
            <mg-button variant="link" onClick={props.handleMassAction}>
              {props.messages.action}
            </mg-button>
          </mg-tooltip>
        )
      }
      <div class="mg-c-input__tabs-content">
        <p id={tabId} class={{ 'mg-c-input__popover-info': true, 'mg-u-visually-hidden': items.length !== 0 }} aria-live={items.length !== 0 ? 'polite' : undefined}>
          {items.length === 0 ? props.messages.noValue : props.messages.values.replace('{count}', items.length.toString())}
        </p>
        {items.length > 0 && (
          <MgInputCheckboxList checkboxes={items} labelledby={tabId} id={listId} disabled={props.disabled} name={props.name} invalid={props.invalid}></MgInputCheckboxList>
        )}
        {hasNext(props.checkboxes, props.limit) && (
          <mg-button key="load-more" variant="flat" class="mg-c-input__load-more" tabIndex={-1} full-width onClick={handleLoadMoreClick} aria-controls={listId}>
            <mg-icon icon="chevron-down"></mg-icon>
            {props.messages.showMore}
          </mg-button>
        )}
      </div>
    </div>
  );
};
