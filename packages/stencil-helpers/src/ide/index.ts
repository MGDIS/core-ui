import { JsonDocs, JsonDocsComponent, JsonDocsProp } from '@stencil/core/internal';

export const webTypesGenerator = (name: string, version: string, jsonDocs: JsonDocs) => {
  return {
    '$schema': 'https://json.schemastore.org/web-types',
    name,
    version,
    'description-markup': 'markdown',
    'contributions': {
      html: {
        elements: jsonDocs.components.map(component => ({
          'name': component.tag,
          'description': component.docs,
          'attributes': component.props
            .filter(prop => prop.attr)
            .map(prop => ({
              name: prop.attr,
              description: prop.docs,
              type: prop.type,
              defaultValue: prop.default,
              required: prop.required,
            })),
          'properties': component.props.map(prop => ({
            name: prop.name,
            type: prop.type,
            description: prop.docs,
            defaultValue: prop.default,
            required: prop.required,
          })),
          '/js/events': component.events.map(event => ({
            name: event.event,
            description: event.docs,
          })),
          'methods': component.methods.map(method => ({
            name: method.name,
            description: method.docs,
            signature: method.signature,
          })),
          'cssProperties': component.styles
            .filter(style => style.annotation === 'prop')
            .map(style => ({
              name: style.name,
              description: style.docs,
            })),
          'cssParts': component.parts.map(part => ({
            name: part.name,
            description: part.docs,
          })),
        })),
      },
    },
  };
};

export const vsCodeGenerator = (name: string, version: string, jsonDocs: JsonDocs) => {
  console.log(JSON.stringify(jsonDocs.components[10], null, 2));

  return {
    version,
    tags: jsonDocs.components.map(component => {
      const references = getStorybookReference(component.filePath);
      return {
        name: component.tag,
        description: getTagDescription(component),
        attributes: component.props.map(prop => ({
          name: prop.attr || prop.name,
          description: getAttributeDescription(prop),
          values: getValues(prop),
          references,
        })),
        references,
      };
    }),
    globalAttributes: [],
    valueSets: [],
  };
};

const storybookBasePath = 'http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/';

const getStorybookUrl = (path: string): string => {
  const split = path.split('/');
  return `${storybookBasePath}${split.slice(2, split.length - 1).join('-')}--docs`;
};

const getStorybookReference = (filePath: string | undefined) => {
  if (!filePath) {
    return;
  }
  return [{ name: 'Storybook', url: getStorybookUrl(filePath) }];
};

const getAttributeDescription = (prop: JsonDocsProp): string => {
  return `${prop.docs}\n\nType: \`${prop.type}\``;
};

const getValues = (prop: JsonDocsProp): unknown[] | undefined => {
  if (prop.values.some(({ value }) => value === undefined)) {
    return;
  }
  return prop.values.map(({ value }) => ({ name: value }));
};

const getTagDescription = (component: JsonDocsComponent): string => {
  // Component title
  let description = `\`<${component.tag}>\` component.\n\n`;
  // Attributes
  const attributes = component.props.filter(({ attr }) => attr !== undefined);
  if (attributes.length) {
    description += `Attributes:\n`;
    description += attributes.map(({ attr, docs }) => `- \`${attr}\`: ${docs}\n`).join('');
    description += '\n';
  }
  // Properties
  const properties = component.props.filter(({ attr }) => attr === undefined);
  if (properties.length) {
    description += `Properties:\n`;
    description += properties.map(({ name, docs }) => `- \`${name}\`: ${docs}\n`).join('');
    description += '\n';
  }
  // Events
  if (component.events.length) {
    description += `Events:\n`;
    description += component.events.map(({ event, docs }) => `- \`${event}\`: ${docs}\n`).join('');
    description += '\n';
  }
  // Methods
  if (component.methods.length) {
    description += `Methods:\n`;
    description += component.methods.map(({ name, docs }) => `- \`${name}\`: ${docs}\n`).join('');
    description += '\n';
  }
  // Return
  return description;
};
