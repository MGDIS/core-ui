import { renderVdom } from '@stencil/core/internal/client';
import type { VNode } from '@stencil/core';
import type { ArgsType } from './conf.ts';

/**
 * Render attribute on the given element
 * @param element - targeted to render attribute
 * @param name - of the attribute
 * @param value - of the attribute
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderAttribute = (element: HTMLElement, name: string, value: any): void => {
  if ([null, undefined, '', false].includes(value) || ['innerHTML', 'style'].includes(name)) return;

  element.setAttribute(name, typeof value !== 'object' ? value : `/!\\ Object props are not rendered in the code example`);
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
  if (text) {
    parentNode.innerText = text;
    return;
  } else if (!tagName || typeof tagName !== 'string') return;
  const element = document.createElement(tagName);
  Object.keys(attributes || {}).forEach(attr => {
    renderAttribute(element, attr, attributes[attr]);
  });

  children?.forEach(child => {
    renderElement(element, child.$tag$, child.$attrs$, child.$children$, child.$text$);
  });

  if (attributes?.innerHTML) element.innerHTML = attributes.innerHTML;

  parentNode.appendChild(element);
};

/**
 * Filter default argument on component argument to prevent them to be rendered
 * @param args - all possible args with custom values
 * @param defaultValues - component default args values
 * @returns filtres args
 */
export const filterArgs = <T>(args: ArgsType<T>, defaultValues?: ArgsType<T>): ArgsType<T> => {
  const filteredArgs: typeof args = {};
  if (typeof args !== 'object') {
    throw new Error("filterArgs - args isn't an object.");
  }
  for (const k in args) {
    if (!k.startsWith('slot')) {
      const arg = args[k];
      // Change camelCase k to kebab-case
      const key = k.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
      if (!defaultValues || !Object.keys(defaultValues).includes(k) || defaultValues[k] !== arg) {
        filteredArgs[key] = arg;
      }
    }
  }
  return filteredArgs;
};

/**
 * Storybook stencil wrapper. Used to target element with `storybook-root` id and render virtual DOM inside.
 * @param storyFn - storybook render function
 * @param context - storybook context
 * @returns rendered element
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const stencilWrapper = (storyFn: (ctx: any) => void, context: ArgsType<Record<string, unknown>>): Element | undefined => {
  const host = document.getElementById('storybook-root');
  if (!host) return;
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
 */
export const getStoryHTML = ({ $tag$, $attrs$, $children$, $text$ }: VNode): string => {
  const host = document.createElement('div');

  renderElement(host, $tag$, $attrs$, $children$, $text$);

  return host.innerHTML;
};
