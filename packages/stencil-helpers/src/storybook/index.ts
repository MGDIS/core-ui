import { renderVdom } from '@stencil/core/internal/client';
import type { VNode } from '@stencil/core';
import { ArgsType } from './index.conf';
import { JsonDocs, JsonDocsComponent, JsonDocsProp } from '@stencil/core/internal';
import { prettify } from 'htmlfy';

/**
 * Render attribute on the given element
 * @param element - targeted to render attribute
 * @param name - of the attribute
 * @param value - of the attribute
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderAttribute = (element: HTMLElement, name: string, value: any): void => {
  if ([null, undefined, '', false].includes(value) || ['innerHTML', 'style', ''].includes(name)) {
    return;
  }
  element.setAttribute(name, !['object', 'function'].includes(typeof value) ? value : `⚠️ Property must be set through a script or a framework-specific syntax.`);
};

/**
 * Render new element in parent element
 * @param parentNode - HTML element
 * @param tagName - of the new element
 * @param attributes - of the new element
 * @param children - of the new element
 * @param text - of the new element
 */
const renderElement = (parentNode: HTMLElement, tagName: VNode['$tag$'], attributes: VNode['$attrs$'], children: VNode[], text: VNode['$text$']): void => {
  // render HTML
  if (tagName && typeof tagName === 'string') {
    const element = document.createElement(tagName);
    Object.keys(attributes || {}).forEach(attr => {
      renderAttribute(element, attr, attributes[attr]);
    });

    children?.forEach(child => {
      renderElement(element, child.$tag$, child.$attrs$, child.$children$, child.$text$);
    });

    if (attributes?.innerHTML) element.innerHTML = attributes.innerHTML;

    parentNode.appendChild(element);
  }
  // render text
  if (text) {
    parentNode.innerHTML = text;
  }
};

/**
 * Filter default argument on component argument to prevent them to be rendered
 * @param args - all possible args with custom values
 * @param defaultValues - component default args values
 * @param slots - slots
 * @returns filtres args
 * @example
 * ```ts
 * import { filterArgs } from '@mgdis/stencil-helpers';
 * const Template = (args: MgBadgeType): HTMLElement => <mg-badge {...filterArgs(args, { variant: 'info' }, ['actions'])}></mg-badge>;
 * ```
 */
export const filterArgs = <T>(args: T, defaultValues?: Partial<T>, slots: string[] = []): T => {
  const filteredArgs = {} as { [key: string]: unknown };
  if (typeof args !== 'object') {
    throw new Error("filterArgs - args isn't an object.");
  }
  for (const k in args) {
    if (!slots.includes(k)) {
      const arg = args[k];
      // Change camelCase k to kebab-case
      const key = k.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
      if (!defaultValues || !Object.keys(defaultValues).includes(k) || defaultValues[k] !== arg) {
        filteredArgs[key] = arg;
      }
    }
  }
  return filteredArgs as T;
};

/**
 * Storybook stencil wrapper. Used to target element with `storybook-root` id and render virtual DOM inside.
 * @param storyFn - storybook render function
 * @param context - storybook context
 * @returns rendered element
 * @example
 * ```ts
 * // .storybook/preview.ts
 * import { stencilWrapper } from '@mgdis/stencil-helpers';
 * export const decorators: Preview['decorators'] = [stencilWrapper];
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const stencilWrapper = (storyFn: (ctx: any) => void, context: ArgsType): Element | undefined => {
  const host = document.getElementById('storybook-root');
  if (host === null) return;

  // update local switcher based on context variable
  document.querySelector('[lang]')?.setAttribute('lang', (context.globals as { locale: string })?.locale || 'en');

  renderVdom(
    {
      $ancestorComponent$: undefined,
      $flags$: 0,
      $modeName$: undefined,
      $cmpMeta$: {
        $flags$: 0,
        $tagName$: host.tagName,
      },
      $hostElement$: host,
    },
    storyFn(context),
  );
  return host.children[host.children.length - 1];
};

/**
 * Get story HTML from virtual DOM.
 * Mainly used to render, component code exemple in stories.
 * @param vitualNode - story virtual DOM
 * @returns stringified rendered HTML
 * @example
 * ```ts
 * // .storybook/preview.ts
 * import { getStoryHTML } from '@mgdis/stencil-helpers';
 *
 * export const parameters: Preview['parameters'] = {
 *   docs: {
 *     source: {
 *       transform: (_, ctx) => getStoryHTML(ctx.originalStoryFn(ctx.args)),
 *     }
 *   },
 * };
 * ```
 */
export const getStoryHTML = ({ $tag$, $attrs$, $children$, $text$ }: VNode): string => {
  const host = document.createElement('div');

  renderElement(host, $tag$, $attrs$, $children$, $text$);

  return prettify(host.innerHTML, { tag_wrap: true }).replace(/="true"/g, '');
};

/**
 * Retrieve Component Storybook URL from file path
 * @param storybookBaseUrl - Storybook Base URL
 * @param filePath - Component file path
 * @returns Component Storybook URL
 */
export const getStorybookUrl = (storybookBaseUrl: string, filePath: string | undefined): string | undefined => {
  if (!filePath) {
    return;
  }
  const split = filePath.split('/');
  return `${storybookBaseUrl}${split.slice(2, split.length - 1).join('-')}--docs`;
};

export class StorybookPreview {
  /**
   * JsonDocs
   */
  jsonDoc: JsonDocs;

  constructor(jsonDoc: JsonDocs) {
    this.jsonDoc = jsonDoc;
  }

  /**
   * Get component data from the jsonDoc
   * @param tagName - tag name we want to get the data from
   * @returns component data
   */
  #getComponentData = (tagName: string): JsonDocsComponent | undefined => {
    return this.jsonDoc.components.find(component => component.tag === tagName);
  };

  /**
   * Get the control for the given prop
   * Based on https://storybook.js.org/docs/api/arg-types#controltype
   * @param prop - prop to get control for
   * @returns control type and options if applicable
   */
  #getPropControl = (prop: JsonDocsProp) => {
    // Get types
    const types: (string | undefined)[] = prop.type
      .replace(/"([^"]+)"/g, '$1') // Remove quotes
      .replace(/\s/g, '') // Remove all whitespace for simplicity
      .replace(/\(.*?\)/g, match => match.replace(/\|/g, ' OR ')) // Replace '|' inside parentheses
      .split('|')
      .map(type => type.trim().replace(/ OR /g, '|')); // Revert ' OR ' back to '|'

    // Return control and options
    if (prop.type === 'string') {
      return { control: { type: 'text' } };
    } else if (prop.type === 'number') {
      return { control: { type: 'number' } };
    } else if (prop.type === 'boolean') {
      return { control: { type: 'boolean' } };
    } else if (prop.type.startsWith('{') && prop.type.endsWith('}')) {
      return { control: { type: 'object' } };
    } else if (types.length > 1) {
      // Manage case when multiple types are possible
      if (types.includes('string')) {
        return { control: { type: 'text' } };
      } else if (types.every(type => type?.includes('[]'))) {
        return { control: { type: 'object' } };
      } else {
        // Add the posibility to set undefined
        types.unshift(undefined);
        return { control: { type: 'select' }, options: types };
      }
    } else return { control: { type: 'object' } };
  };

  /**
   * Extract component arg types from the component data
   * @param tagName - tag name we want to extract the arg types from
   * @returns component arg types
   */
  extractArgTypes = (tagName: string) => {
    const componentData = this.#getComponentData(tagName);

    // Extract props arg types
    const componentPropsArgTypes = componentData?.props.reduce((acc, prop) => {
      // Get Controls
      const { control, options } = this.#getPropControl(prop);
      // Set Component ArgTypes
      return {
        ...acc,
        [prop.name]: {
          name: prop.attr || prop.name,
          description: prop.docs,
          type: { required: prop.required },
          table: {
            category: 'props',
            type: { summary: prop.type },
            defaultValue: { summary: prop.default },
          },
          control,
          options,
        },
      };
    }, {});

    // Extract events arg types
    const componentEventsArgTypes = componentData?.events.reduce(
      (acc, event) => ({
        ...acc,
        [event.event]: {
          name: event.event,
          description: event.docs,
          table: {
            category: 'events',
            type: { summary: event.detail },
          },
        },
      }),
      {},
    );

    // Extracts Methods arg types
    const componentMethodsArgTypes = componentData?.methods.reduce(
      (acc, method) => ({
        ...acc,
        [method.name]: {
          name: method.name,
          description: method.docs,
          table: {
            category: 'methods',
            type: { summary: method.signature },
          },
        },
      }),
      {},
    );

    // Extracts Slots arg types
    const componentSlotsArgTypes = componentData?.slots.reduce(
      (acc, slot) => ({
        ...acc,
        [slot.name]: {
          name: slot.name !== '' ? slot.name : 'default', // default slot are unnamed
          description: slot.docs,
          table: {
            category: 'slots',
            type: { summary: undefined },
          },
        },
      }),
      {},
    );

    // Extracts CSS Properties arg types
    const componentCSSPropArgTypes = componentData?.styles.reduce(
      (acc, style) => ({
        ...acc,
        [style.name]: {
          name: style.name,
          description: style.docs,
          table: {
            category: 'custom properties',
            type: { summary: undefined },
          },
        },
      }),
      {},
    );

    // Extract component dependencies
    const componentDependencies = componentData?.dependencies.reduce((acc, dependency) => {
      const dependencyData = this.#getComponentData(dependency);
      if (!dependencyData) return acc; // Prevents from adding internal dependency
      return {
        ...acc,
        [dependency]: {
          name: dependency,
          description: `<a href="./?path=/docs/${getStorybookUrl('', dependencyData?.filePath)}">View Component Documentation</a>`,
          table: {
            category: 'depends on',
            type: { summary: undefined },
          },
        },
      };
    }, {});

    // Extract dependents components
    const componentDependents = componentData?.dependents.reduce((acc, dependent) => {
      const dependentData = this.#getComponentData(dependent);
      if (!dependentData) return acc; // Prevents from adding internal dependent
      return {
        ...acc,
        [dependent]: {
          name: dependent,
          description: `<a href="./?path=/docs/${getStorybookUrl('', dependentData?.filePath)}">View Component Documentation</a>`,
          table: {
            category: 'used by',
            type: { summary: undefined },
          },
        },
      };
    }, {});

    return {
      ...componentPropsArgTypes,
      ...componentEventsArgTypes,
      ...componentMethodsArgTypes,
      ...componentSlotsArgTypes,
      ...componentCSSPropArgTypes,
      ...componentDependencies,
      ...componentDependents,
    };
  };

  /**
   * Extract component description from the component data
   * @param tagName - tag name we want to extract the description from
   * @returns component description
   */
  extractComponentDescription = (tagName: string) => {
    const componentData = this.#getComponentData(tagName);
    return componentData?.readme || componentData?.docs;
  };
}
