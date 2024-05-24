**@mgdis/stencil-helpers** • **Docs**

***

# @mgdis/stencil-helpers

## Classes

### ClassList

Class to manage component classlist

#### Constructors

##### new ClassList()

> **new ClassList**(`classlist`): [`ClassList`](README.md#classlist)

###### Parameters

• **classlist**: `string`[]= `[]`

###### Returns

[`ClassList`](README.md#classlist)

###### Source

packages/stencil-helpers/src/components/index.ts:29

#### Properties

##### classes

> **classes**: `string`[]

Available classes

###### Source

packages/stencil-helpers/src/components/index.ts:27

#### Methods

##### add()

> **add**(`className`): `void`

Add class

###### Parameters

• **className**: `string`

class name to add

###### Returns

`void`

###### Source

packages/stencil-helpers/src/components/index.ts:37

##### delete()

> **delete**(`className`): `void`

Delete class

###### Parameters

• **className**: `string`

class name to delete

###### Returns

`void`

###### Source

packages/stencil-helpers/src/components/index.ts:47

##### has()

> **has**(`className`): `boolean`

Check if class exist in list

###### Parameters

• **className**: `string`

class name to check

###### Returns

`boolean`

class name is in the list

###### Source

packages/stencil-helpers/src/components/index.ts:59

##### join()

> **join**(): `string`

Join classes seperated by spaces

###### Returns

`string`

joined values

###### Source

packages/stencil-helpers/src/components/index.ts:67

## Variables

### dateRegExp

> `const` **dateRegExp**: `RegExp`

Date RegExp, usefull to test if string is a follow the date pattern

#### Example

```ts
dateRegExp.test('mystring') // false
dateRegExp.test('2020-12-31') // true
```

#### Source

packages/stencil-helpers/src/locale/index.ts:87

***

### focusableElements

> `const` **focusableElements**: "a\[href\], button, input, textarea, select, details, \[tabindex\]:not(\[tabindex=\"-1\"\]), \[identifier\], mg-button" = `'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"]), [identifier], mg-button'`

CSS selector to select focusable elements.

#### Example

```ts
const allFocusableElements: HTMLElement[] = Array.from(this.element.querySelectorAll(focusableElements));
```

#### Source

packages/stencil-helpers/src/components/index.ts:96

## Functions

### allItemsAreString()

> **allItemsAreString**(`items`): `items is string[]`

Typeguard function to check if all array items are strings.

#### Parameters

• **items**: `unknown`

items to check

#### Returns

`items is string[]`

`true` if all items are strings

#### Source

packages/stencil-helpers/src/components/index.ts:77

***

### cleanString()

> **cleanString**(`text`): `string`

Cleans string characters by removing special characters and converting to lowercase.

#### Parameters

• **text**: `string`

text to clean

#### Returns

`string`

cleaned string

#### Example

```ts
cleanString('âäàçéèêñù') // 'aaaceeenu'
cleanString('BATMAN') // 'batman'
```

#### Source

packages/stencil-helpers/src/components/index.ts:166

***

### createID()

> **createID**(`prefix`, `length`): `string`

Create random ID

#### Parameters

• **prefix**: `string`= `''`

add prefix to created ID

• **length**: `number`= `10`

ID length

#### Returns

`string`

ID

#### Source

packages/stencil-helpers/src/components/index.ts:7

***

### dateToString()

> **dateToString**(`date`): `undefined` \| `string`

Formats a date object to a string with the pattern 'YYYY-MM-DD'.

#### Parameters

• **date**: `Date`

date to parse

#### Returns

`undefined` \| `string`

string date with pattern 'YYYY-MM-DD'

#### Example

```ts
dateToString(new Date('2023-12-24')) // '2023-12-24'
```

#### Source

packages/stencil-helpers/src/locale/index.ts:28

***

### defineLocales()

> **defineLocales**(`messages`, `defaultLocale`): (`element`) => `object`

Get Intl object

#### Parameters

• **messages**: `ObjectType`

locales to render in object format. `ex: { en: { porp: "test" }, fr: { porp: "test" }}`.

• **defaultLocale**: `string`

fallback locale to render. `ex: 'en'`.

#### Returns

`Function`

from the element passed in return function you will get the matching messages object

##### Parameters

• **element**: `HTMLElement`

##### Returns

`object`

###### locale

> **locale**: `string`

###### messages

> **messages**: `ObjectType`

#### Example

```ts
import en from './en/messages.json';
import fr from './fr/messages.json';
import { defineLocales } from '@mgdis/stencil-helpers';

const defaultLocale = 'en';
const messages = { en, fr };

export const initLocales = defineLocales(messages, defaultLocale);
```

#### Source

packages/stencil-helpers/src/locale/index.ts:124

***

### filterArgs()

> **filterArgs**\<`T`\>(`args`, `defaultValues`?): `T`

Filter default argument on component argument to prevent them to be rendered

#### Type parameters

• **T**

#### Parameters

• **args**: `T`

all possible args with custom values

• **defaultValues?**: `Partial`\<`T`\>

component default args values

#### Returns

`T`

filtres args

#### Example

```ts
import { filterArgs } from '@mgdis/stencil-helpers';
const Template = (args: MgBadgeType): HTMLElement => <mg-badge {...filterArgs(args, { variant: variants[0] })}></mg-badge>;
```

#### Source

packages/stencil-helpers/src/storybook/index.ts:59

***

### getLocaleDatePattern()

> **getLocaleDatePattern**(`locale`): `string`

Gets the date pattern based on the specified locale.

#### Parameters

• **locale**: `string`

the locale to refer to

#### Returns

`string`

date pattern

#### Example

```ts
getLocaleDatePattern('fr') // 'dd/mm/yyyy'
```

#### Source

packages/stencil-helpers/src/locale/index.ts:12

***

### getParentWindows()

> **getParentWindows**(`localWindow`, `windows`): `Window`[]

Get parent windows

#### Parameters

• **localWindow**: `Window`

the window we are lookink for parents

• **windows**: `Window`[]= `[]`

The list of allready found windows

#### Returns

`Window`[]

The list of windows found

#### Source

packages/stencil-helpers/src/components/index.ts:115

***

### getStoryHTML()

> **getStoryHTML**(`vitualNode`): `string`

Get story HTML from virtual DOM.
Mainly used to render, component code exemple in stories.

#### Parameters

• **vitualNode**: `VNode`

story virtual DOM

#### Returns

`string`

stringified rendered HTML

#### Example

```ts
// .storybook/preview.ts
import { getStoryHTML } from '@mgdis/stencil-helpers';

export const parameters: Preview['parameters'] = {
  docs: {
    extractArgTypes,
    extractComponentDescription,
    transformSource: (_, ctx) => getStoryHTML(ctx.originalStoryFn(ctx.args)),
  },
};
```

#### Source

packages/stencil-helpers/src/storybook/index.ts:132

***

### getWindows()

> **getWindows**(`localWindow`): `Window`[]

Get windows

#### Parameters

• **localWindow**: `Window`

the window we are lookink for other windows

#### Returns

`Window`[]

The list of windows found

#### Source

packages/stencil-helpers/src/components/index.ts:103

***

### isTagName()

> **isTagName**(`element`, `tagNames`): `boolean`

Check if element belongs to the given tagNames list

#### Parameters

• **element**: `Element`

element to check

• **tagNames**: `string`[]

allowed tag names list

#### Returns

`boolean`

`true` if element tagName is in the tagNames list

#### Source

packages/stencil-helpers/src/components/index.ts:85

***

### isValidString()

> **isValidString**(`value`): `boolean`

Validate string

#### Parameters

• **value**: `unknown`

value to check

#### Returns

`boolean`

`true` if string is valid

#### Source

packages/stencil-helpers/src/components/index.ts:154

***

### localeCurrency()

> **localeCurrency**(`number`, `locale`, `currency`): `string`

Format number to the locale currency

#### Parameters

• **number**: `number`

number to format

• **locale**: `string`

locale to apply

• **currency**: `string`

currency to apply

#### Returns

`string`

formatted currency

#### Example

```ts
localeCurrency(1234567890.12, 'fr', 'EUR') // '1 234 567 890,12\xa0€'
```

#### Source

packages/stencil-helpers/src/locale/index.ts:63

***

### localeDate()

> **localeDate**(`date`, `locale`): `string`

Locale date format

#### Parameters

• **date**: `undefined` \| `string`

date to format

• **locale**: `string`

locale to apply

#### Returns

`string`

formatted date

#### Example

```ts
localeDate('2022-06-02', 'fr') // '02/06/2022'
```

#### Source

packages/stencil-helpers/src/locale/index.ts:99

***

### localeNumber()

> **localeNumber**(`number`, `locale`, `decimalLength`): `string`

Format number to locale

#### Parameters

• **number**: `number`

number to format

• **locale**: `string`

locale to apply

• **decimalLength**: `number`= `0`

decimal length to apply

#### Returns

`string`

formatted number

#### Example

```ts
localeNumber(1234567890.12, 'fr') // 1 234 567 890,12
```

#### Source

packages/stencil-helpers/src/locale/index.ts:76

***

### nextTick()

> **nextTick**(`callback`): `Promise`\<`void`\>

Use to process code next tick in the event loop

#### Parameters

• **callback**

code to excute on next tick

#### Returns

`Promise`\<`void`\>

differed code excution

#### Source

packages/stencil-helpers/src/components/index.ts:179

***

### setupMutationObserverMock()

> **setupMutationObserverMock**(`__namedParameters`): (`callback`) => `MutationObserver`

Utility function that mocks the `MutationObserver` API. Recommended to execute inside `beforeEach`.

#### Parameters

• **\_\_namedParameters**: `SetupMutationObserverMockParams`

#### Returns

`Function`

Mocked MutationObserver

##### Parameters

• **callback**: `MutationCallback`

##### Returns

`MutationObserver`

##### prototype

> **prototype**: `MutationObserver`

#### Example

```
let fireMo;
setupMutationObserverMock({
  observe: function () {
    fireMo = this.cb;
  },
});
...
fireMo([{ type: 'childList', addedNodes: [AMockElemenet, AnotherMockElemenet], target: yourMockElemenet }]);;
```

#### Source

packages/stencil-helpers/src/test/unit.ts:23

***

### setupResizeObserverMock()

> **setupResizeObserverMock**(`__namedParameters`): (`callback`) => `ResizeObserver`

Utility function that mocks the `ResizeObserver` API. Recommended to execute inside `beforeEach`.

#### Parameters

• **\_\_namedParameters**: `setupResizeObserverMockParams`

#### Returns

`Function`

Mocked ResizeObserver

##### Parameters

• **callback**: `ResizeObserverCallback`

##### Returns

`ResizeObserver`

##### prototype

> **prototype**: `ResizeObserver`

#### Example

```
let fireRo;
setupResizeObserverMock({
  observe: function () {
    fireRo = this.cb;
  },
});
...
fireRo([{
 borderBoxSize: ResizeObserverSize[],
 contentBoxSize: ResizeObserverSize[],
 contentRect: DOMRectReadOnly,
 devicePixelContentBoxSize: ResizeObserverSize[],
 target: yourMockElemenet
}]);;
```

#### Source

packages/stencil-helpers/src/test/unit.ts:83

***

### setupSubmitEventMock()

> **setupSubmitEventMock**(): *typeof* `MockCustomEvent`

Utility function that mocks the `SubmitEvent` API. Recommended to execute inside `beforeEach`.

#### Returns

*typeof* `MockCustomEvent`

custom event mock

#### Example

```
setupSubmitEventMock();
```

#### Source

packages/stencil-helpers/src/test/unit.ts:133

***

### stencilWrapper()

> **stencilWrapper**(`storyFn`, `context`): `undefined` \| `Element`

Storybook stencil wrapper. Used to target element with `storybook-root` id and render virtual DOM inside.

#### Parameters

• **storyFn**

storybook render function

• **context**: `ArgsType`

storybook context

#### Returns

`undefined` \| `Element`

rendered element

#### Example

```ts
// .storybook/preview.ts
import { stencilWrapper } from '@mgdis/stencil-helpers';
export const decorators: Preview['decorators'] = [stencilWrapper];
```

#### Source

packages/stencil-helpers/src/storybook/index.ts:90

***

### vsCodeGenerator()

> **vsCodeGenerator**(`version`, `jsonDocs`, `storybookBaseUrl`, `sourceBaseUrl`): `object`

Generate custom HTML datasets for VS Code

#### Parameters

• **version**: `string`

Library version

• **jsonDocs**: `JsonDocs`

Stencil JSON doc

• **storybookBaseUrl**: `string`

Storybook Base Url

• **sourceBaseUrl**: `string`

#### Returns

`object`

custom HTML datasets

##### globalAttributes

> **globalAttributes**: `never`[] = `[]`

##### tags

> **tags**: `object`[]

##### valueSets

> **valueSets**: `never`[] = `[]`

##### version

> **version**: `string`

#### Example

```ts
const customDataJson = vsCodeGenerator('1.0.0', jsonDocs, 'https://storybook.example.com', 'https://sources.example.com');
```

#### Source

packages/stencil-helpers/src/ide/index.ts:185

***

### webTypesGenerator()

> **webTypesGenerator**(`name`, `version`, `jsonDocs`, `storybookBaseUrl`): `object`

Generate Web Types metadata for IntelliJ's IDE

#### Parameters

• **name**: `string`

Library name

• **version**: `string`

Library version

• **jsonDocs**: `JsonDocs`

Stencil JSON doc

• **storybookBaseUrl**: `string`

Storybook Base Url

#### Returns

`object`

Web Types metadata

##### $schema

> **$schema**: `string` = `'https://json.schemastore.org/web-types'`

##### contributions

> **contributions**: `object`

##### contributions.html

> **html**: `object`

##### contributions.html.elements

> **elements**: `object`[]

##### description-markup

> **description-markup**: `string` = `'markdown'`

##### name

> **name**: `string`

##### version

> **version**: `string`

#### Example

```ts
const webTypesJson = webTypesGenerator('@mgdis/mg-components', '1.0.0', jsonDocs, 'https://storybook.example.com');
```

#### Source

packages/stencil-helpers/src/ide/index.ts:101
