import { JsonDocs, JsonDocsProp } from '@stencil/core/internal';

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
  console.log(JSON.stringify(jsonDocs.components[1], null, 2));

  return {
    version,
    tags: jsonDocs.components.map(component => {
      const references = getStorybookReference(component.filePath);
      return {
        name: component.tag,
        description: `# ${component.tag}`,
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

const getStorybookReference = (filePath: string | undefined) => {
  if (!filePath) {
    return;
  }
  return [{ name: 'Storybook', url: getStorybookUrl(filePath) }];
};

const getStorybookUrl = (path: string): string => {
  const split = path.split('/');
  return `${storybookBasePath}${split[2]}-${split[3]}--docs`;
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
