import { h } from '@stencil/core';
import { filterArgs } from '@mgdis/stencil-helpers';
import type { MgInputCombobox as MgInputComboboxType } from '../mg-input-combobox';
import { type ItemType } from '../mg-input-combobox.conf';

export default {
  component: 'mg-input-combobox',
  title: 'Molecules/Inputs/mg-input-combobox',
  parameters: { actions: { handles: ['value-change', 'input-valid', 'filter-change', 'load-more'] } },
};

const getOptionsItems = (length: number): ItemType[] => new Array(length).fill(() => '').map((_, index) => ({ title: `title ${index + 1}`, value: `/${index + 1}` }));

import { http, HttpResponse, delay } from 'msw';

/**
 * Template
 * @param args - component arguments
 * @returns HTMLMgInputComboboxElement
 */
const Template = (args: MgInputComboboxType): HTMLMgInputComboboxElement => <mg-input-combobox {...filterArgs(args)}></mg-input-combobox>;

export const MgInputComboboxStringItems = {
  render: Template,
  args: {
    // Global
    value: '',
    items: ['Batman', 'Robin', 'Joker'],
    itemsLabel: 'DC Comics',
    identifier: 'identifier',
    name: 'input-name',
    // Label
    label: 'Label',
    labelOnTop: false,
    labelHide: false,
    // Input
    placeholder: 'placeholder',
    required: true,
    disabled: false,
    readonly: false,
    mgWidth: 'full',
    // Tooltip
    tooltip: 'This is a tooltip',
    tooltipPosition: undefined,
    // Help Text
    helpText: 'Help text with html <b>bold</b>, <em>italic</em>.',
  },
};

export const MgInputComboboxOptionsItems = {
  render: Template,
  args: {
    ...MgInputComboboxStringItems.args,
    items: getOptionsItems(100),
  },
};

const API = new URL('https://your-restful-endpoint');
const RequestMapping = {
  filter: 'filter',
};
const ResponseMapping = {
  items: 'items',
  total: '_total',
  next: '_next',
};

export const MgInputComboboxAPI = {
  render: Template,
  args: {
    ...MgInputComboboxStringItems.args,
    items: undefined,
    fetchurl: API,
    fetchmappings: {
      request: RequestMapping,
      response: ResponseMapping,
    },
  },
  parameters: {
    msw: {
      handlers: [
        http.get(API.toString(), async resolver => {
          const skipKey = '$skip';
          const topKey = '$top';
          const url = new URL(resolver.request.url);
          const filter = url.searchParams.get(RequestMapping.filter);
          const top = Number(url.searchParams.get(topKey) || 10);
          const skip = Number(url.searchParams.get(skipKey)) || 0;
          let items = getOptionsItems(1000);
          // fake backend filter from request
          if (filter) {
            items = items.filter((item: ItemType) => item.title.includes(filter));
          }

          const total = items.length;

          // fake API pagination
          const end = skip + top;
          if (top) {
            items = items.slice(skip, end);
          }

          // mock request delay
          await delay(800);

          // response
          const response = {};
          response[ResponseMapping.total] = total;
          response[ResponseMapping.items] = items;
          const next = total > skip + top ? new URL(resolver.request.url) : undefined;
          if (next) {
            next.searchParams.set(skipKey, end.toString());
            next.searchParams.set(topKey, top.toString());
            response[ResponseMapping.next] = next.toString();
          }
          return HttpResponse.json(response);
        }),
      ],
    },
  },
};
