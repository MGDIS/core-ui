import { JsonDocs, JsonDocsComponent, JsonDocsProp } from '@stencil/core/internal';

/**
 * Retrieve Component Storybook URL from file path
 * @param storybookBaseUrl - Storybook Base URL
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
 * Retrieve Component source URL from file path
 * @param sourcesBaseUrl - Source base URL
 * @param filePath - Component file path
 * @returns Component source URL
 */
const getSourcesUrl = (sourcesBaseUrl: string, filePath: string | undefined): string | undefined => {
  if (!filePath) {
    return;
  }
  return `${sourcesBaseUrl}${filePath}`;
};

/**
 * Get Component element description
 * @param component - Component
 * @returns Component element description
 */
const getElementDescription = (component: JsonDocsComponent): string => {
  // Init description
  let description = component.overview ? `${component.overview}\n\n` : '';
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
  // Methods
  if (component.methods.length) {
    description += `Methods:\n`;
    description += component.methods.map(({ name, docs }) => `- \`${name}\`: ${docs}\n`).join('');
    description += '\n';
  }
  // Events
  if (component.events.length) {
    description += `Events:\n`;
    description += component.events.map(({ event, docs }) => `- \`${event}\`: ${docs}\n`).join('');
    description += '\n';
  }
  // Listeners
  if (component.listeners.length) {
    description += `Listeners:\n`;
    description += component.listeners.map(({ event }) => `- \`${event}\`\n`).join('');
    description += '\n';
  }
  // Slots
  if (component.slots.length) {
    description += `Slots:\n`;
    description += component.slots.map(({ name, docs }) => `- \`${name}\`: ${docs}\n`).join('');
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
 * @param jsonDocs - Stencil JSON doc
 * @param storybookBaseUrl - Storybook Base Url
 * @returns Web Types metadata
 * @example
 * ```ts
 * const webTypesJson = webTypesGenerator('@mgdis/mg-components', '1.0.0', jsonDocs, 'https://storybook.example.com');
 * ```
 */

export const webTypesGenerator = (name: string, version: string, jsonDocs: JsonDocs, storybookBaseUrl: string) => ({
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
          'description': getElementDescription(component),
          'doc-url': docUrl,
          'attributes': component.props
            .filter(prop => prop.attr)
            .map(prop => ({
              'name': prop.attr,
              'description': getAttributeDescription(prop),
              'doc-url': docUrl,
              'value': {
                type: prop.type,
                default: prop.default,
                required: prop.required,
              },
            })),
          'js': {
            properties: component.props.map(prop => ({
              'name': prop.name,
              'description': getAttributeDescription(prop),
              'doc-url': docUrl,
              'value': {
                type: prop.type,
                default: prop.default,
                required: prop.required,
              },
            })),
            events: component.events.map(event => ({
              name: event.event,
              description: event.docs,
            })),
          },
        };
      }),
    },
  },
});

/**
 * Create Storybook Reference
 * @param storybookBaseUrl - Storybook Base Url
 * @param filePath - Component file path
 * @returns Storybook Reference
 */
const getReferences = (storybookBaseUrl: string, sourceBaseUrl: string, filePath: string | undefined) => {
  if (!filePath) {
    return;
  }
  return [
    { name: 'Storybook', url: getStorybookUrl(storybookBaseUrl, filePath) },
    { name: 'Sources', url: getSourcesUrl(sourceBaseUrl, filePath) },
  ];
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
 * @param jsonDocs - Stencil JSON doc
 * @param storybookBaseUrl - Storybook Base Url
 * @returns custom HTML datasets
 * @example
 * ```ts
 * const customDataJson = vsCodeGenerator('1.0.0', jsonDocs, 'https://storybook.example.com', 'https://sources.example.com');
 * ```
 */
export const vsCodeGenerator = (version: string, jsonDocs: JsonDocs, storybookBaseUrl: string, sourceBaseUrl: string) => ({
  version,
  tags: jsonDocs.components.map(component => {
    const references = getReferences(storybookBaseUrl, sourceBaseUrl, component.filePath);
    return {
      name: component.tag,
      description: getElementDescription(component),
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
});
