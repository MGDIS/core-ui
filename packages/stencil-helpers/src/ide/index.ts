import { JsonDocs, JsonDocsComponent, JsonDocsProp } from '@stencil/core/internal';

/**
 * Retrieve Component Storybook URL from file path
 * @param storybookBaseUrl - Storybook Base Url
 * @param filePath - Component file path
 * @returns Component Storybook URL
 */
const getStorybookUrl = (storybookBaseUrl: string, filePath: string | undefined): string | undefined => {
  if (!filePath) {
    return;
  }
  const split = filePath.split('/');
  return `${storybookBaseUrl}${split.slice(2, split.length - 1).join('-')}--docs`;
};

/**
 * Get Component Tag Description
 * @param component - Component
 * @returns Component Tag Description
 */
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

/**
 * Get Props Description
 * @param prop - Component Property
 * @returns Props Description
 */
const getAttributeDescription = (prop: JsonDocsProp): string => {
  return `${prop.docs}\n\nType: \`${prop.type}\``;
};

/**
 * Generate Web Types metadata for IntelliJ's IDE
 * @param name - Library name
 * @param version - Library version
 * @param storybookBaseUrl - Storybook Base Url
 * @param jsonDocs - Stencil JSON doc
 * @returns Web Types metadata
 */

export const webTypesGenerator = (name: string, version: string, storybookBaseUrl: string, jsonDocs: JsonDocs) => {
  return {
    '$schema': 'https://json.schemastore.org/web-types',
    name,
    version,
    'description-markup': 'markdown',
    'contributions': {
      html: {
        elements: jsonDocs.components.map(component => {
          const docUrl = getStorybookUrl(storybookBaseUrl, component.filePath);
          return {
            'name': component.tag,
            'description': getTagDescription(component),
            'doc-url': docUrl,
            'attributes': component.props
              .filter(prop => prop.attr)
              .map(prop => ({
                'name': prop.attr,
                'description': getAttributeDescription(prop),
                'doc-url': docUrl,
                'type': prop.type,
                'defaultValue': prop.default,
                'required': prop.required,
              })),
            'properties': component.props.map(prop => ({
              name: prop.name,
              type: prop.type,
              description: getAttributeDescription(prop),
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
          };
        }),
      },
    },
  };
};

/**
 * Create Storybook Reference
 * @param storybookBaseUrl - Storybook Base Url
 * @param filePath - Component file path
 * @returns Storybook Reference
 */
const getStorybookReference = (storybookBaseUrl: string, filePath: string | undefined) => {
  if (!filePath) {
    return;
  }
  return [{ name: 'Storybook', url: getStorybookUrl(storybookBaseUrl, filePath) }];
};

/**
 * Get Property possible values
 * @param prop - Component Property
 * @returns Property possible values
 */
const getValues = (prop: JsonDocsProp): unknown[] | undefined => {
  // Only values Array where all objects have a value seems to be usefull
  if (prop.values.some(({ value }) => value === undefined)) {
    return;
  }
  return prop.values.map(({ value }) => ({ name: value }));
};

/**
 * Generate custom HTML datasets for VS Code
 * @param version - Library version
 * @param storybookBaseUrl - Storybook Base Url
 * @param jsonDocs - Stencil JSON doc
 * @returns custom HTML datasets
 */
export const vsCodeGenerator = (version: string, storybookBaseUrl: string, jsonDocs: JsonDocs) => {
  return {
    version,
    tags: jsonDocs.components.map(component => {
      const references = getStorybookReference(storybookBaseUrl, component.filePath);
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
