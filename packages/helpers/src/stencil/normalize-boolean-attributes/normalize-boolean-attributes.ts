/**
 * Per the HTML spec, a boolean attribute is `true` whenever it is present on the
 * element, regardless of its value (including `="false"`). Stencil's default Prop
 * parser converts the string `"false"` to the boolean `false`, which breaks this
 * contract for consumers writing markup. Call this helper from `componentWillLoad`
 * to re-normalize every present attribute that maps to a boolean-typed Prop.
 *
 * Iterates the host element's attributes and, for each one whose camelCase name
 * matches a `typeof === 'boolean'` Prop on the instance, rewrites the attribute
 * to `''` — Stencil's parser then turns that into `true` via the standard
 * attribute → prop pipeline (no need for `mutable: true` on the Prop, since the
 * write goes through Stencil's internal setter, not through user code).
 *
 * Non-boolean Props and non-Prop attributes (`class`, `id`, ...) are skipped
 * naturally by the type check.
 *
 * @param target - the component instance (must expose `element` via `@Element()`)
 *
 * @example
 * ```typescript
 * @Component({ tag: 'my-input' })
 * export class MyInput {
 *   @Element() element: HTMLMyInputElement;
 *   @Prop() readonly = false;
 *   @Prop() disabled = false;
 *
 *   componentWillLoad() {
 *     normalizeBooleanAttributes(this);
 *   }
 * }
 * ```
 */
export const normalizeBooleanAttributes = (target: { element: HTMLElement }): void => {
  for (const attr of Array.from(target.element.attributes)) {
    const propName = attr.name.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());
    if (typeof (target as Record<string, unknown>)[propName] === 'boolean') {
      target.element.setAttribute(attr.name, '');
    }
  }
};
