import type { JsonDocs, JsonDocsComponent } from '@stencil/core/internal';

/**
 * Convert a Stencil component's JsonDocs into a CEM v2 module entry.
 * @param component - Stencil component doc
 * @returns CEM module
 */
const componentToModule = (component: JsonDocsComponent) => {
  const className = component.tag
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');

  const attributes = component.props
    .filter(prop => prop.attr !== undefined)
    .map(prop => ({
      name: prop.attr,
      description: prop.docs,
      type: { text: prop.type },
      default: prop.default,
      fieldName: prop.name,
    }));

  const fieldMembers = component.props.map(prop => {
    const member: {
      kind: 'field';
      name: string;
      description?: string;
      type: { text: string };
      default?: string;
      attribute?: string;
    } = {
      kind: 'field',
      name: prop.name,
      description: prop.docs,
      type: { text: prop.type },
      default: prop.default,
    };
    if (prop.attr !== undefined) member.attribute = prop.attr;
    return member;
  });

  const methodMembers = component.methods.map(method => ({
    kind: 'method' as const,
    name: method.name,
    description: method.docs,
  }));

  return {
    kind: 'javascript-module' as const,
    path: component.filePath ?? '',
    declarations: [
      {
        kind: 'class' as const,
        name: className,
        tagName: component.tag,
        customElement: true,
        description: component.overview ?? '',
        attributes,
        members: [...fieldMembers, ...methodMembers],
        events: component.events.map(event => ({
          name: event.event,
          description: event.docs,
          type: { text: `CustomEvent<${event.detail}>` },
        })),
        slots: component.slots.map(slot => ({
          name: slot.name,
          description: slot.docs,
        })),
        cssProperties: component.styles.map(style => ({
          name: style.name,
          description: style.docs,
        })),
        cssParts: (component.parts ?? []).map(part => ({
          name: part.name,
          description: part.docs,
        })),
      },
    ],
    exports: [
      {
        kind: 'custom-element-definition' as const,
        name: component.tag,
        declaration: {
          name: className,
          module: component.filePath ?? '',
        },
      },
    ],
  };
};

/**
 * Generate a Custom Elements Manifest v2 from Stencil JSON docs.
 * @param jsonDocs - Stencil JSON doc
 * @returns CEM v2
 * @example
 * ```ts
 * const cem = cemGenerator(jsonDocs);
 * ```
 */
export const cemGenerator = (jsonDocs: JsonDocs) => ({
  schemaVersion: '2.0.0',
  readme: '',
  modules: jsonDocs.components.map(componentToModule),
});
