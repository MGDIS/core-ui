[@mgdis/stencil-helpers](../README.md) / WebTypesGenerator

# Class: WebTypesGenerator

## Table of contents

### Constructors

- [constructor](WebTypesGenerator.md#constructor)

### Properties

- [config](WebTypesGenerator.md#config)

### Methods

- [generateWebTypesJson](WebTypesGenerator.md#generatewebtypesjson)

## Constructors

### constructor

• **new WebTypesGenerator**(`config`): [`WebTypesGenerator`](WebTypesGenerator.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`WebTypesGeneratorConfig`](../interfaces/WebTypesGeneratorConfig.md) |

#### Returns

[`WebTypesGenerator`](WebTypesGenerator.md)

#### Defined in

packages/stencil-helpers/src/ide/index.ts:9

## Properties

### config

• **config**: [`WebTypesGeneratorConfig`](../interfaces/WebTypesGeneratorConfig.md)

#### Defined in

packages/stencil-helpers/src/ide/index.ts:9

## Methods

### generateWebTypesJson

▸ **generateWebTypesJson**(`docsData`): `Promise`\<\{ `$schema`: `string` = 'https://json.schemastore.org/web-types'; `contributions`: \{ `html`: \{ `elements`: \{ `/js/events`: \{ `description`: `string` = event.docs; `name`: `string` = event.event }[] ; `attributes`: \{ `defaultValue`: `undefined` \| `string` = prop.default; `description`: `string` = prop.docs; `name`: `undefined` \| `string` = prop.attr; `required`: `boolean` = prop.required; `type`: `string` = prop.type }[] ; `cssParts`: \{ `description`: `string` = part.docs; `name`: `string` = part.name }[] ; `cssProperties`: \{ `description`: `string` = style.docs; `name`: `string` = style.name }[] ; `description`: `string` = component.docs; `methods`: \{ `description`: `string` = method.docs; `name`: `string` = method.name; `signature`: `string` = method.signature }[] ; `name`: `string` = component.tag; `properties`: \{ `defaultValue`: `undefined` \| `string` = prop.default; `description`: `string` = prop.docs; `name`: `string` = prop.name; `required`: `boolean` = prop.required; `type`: `string` = prop.type }[]  }[]  }  } ; `description-markup`: `string` = 'markdown'; `name`: `string` ; `version`: `string`  }\>

Generate web-types
See https://github.com/JetBrains/web-types

#### Parameters

| Name | Type |
| :------ | :------ |
| `docsData` | `JsonDocs` |

#### Returns

`Promise`\<\{ `$schema`: `string` = 'https://json.schemastore.org/web-types'; `contributions`: \{ `html`: \{ `elements`: \{ `/js/events`: \{ `description`: `string` = event.docs; `name`: `string` = event.event }[] ; `attributes`: \{ `defaultValue`: `undefined` \| `string` = prop.default; `description`: `string` = prop.docs; `name`: `undefined` \| `string` = prop.attr; `required`: `boolean` = prop.required; `type`: `string` = prop.type }[] ; `cssParts`: \{ `description`: `string` = part.docs; `name`: `string` = part.name }[] ; `cssProperties`: \{ `description`: `string` = style.docs; `name`: `string` = style.name }[] ; `description`: `string` = component.docs; `methods`: \{ `description`: `string` = method.docs; `name`: `string` = method.name; `signature`: `string` = method.signature }[] ; `name`: `string` = component.tag; `properties`: \{ `defaultValue`: `undefined` \| `string` = prop.default; `description`: `string` = prop.docs; `name`: `string` = prop.name; `required`: `boolean` = prop.required; `type`: `string` = prop.type }[]  }[]  }  } ; `description-markup`: `string` = 'markdown'; `name`: `string` ; `version`: `string`  }\>

formated json

#### Defined in

packages/stencil-helpers/src/ide/index.ts:16
