@mgdis/stencil-helpers

# @mgdis/stencil-helpers

## Table of contents

### Classes

- [ClassList](classes/ClassList.md)

### Variables

- [dateRegExp](README.md#dateregexp)
- [focusableElements](README.md#focusableelements)

### Functions

- [allItemsAreString](README.md#allitemsarestring)
- [cleanString](README.md#cleanstring)
- [createID](README.md#createid)
- [dateToString](README.md#datetostring)
- [defineLocales](README.md#definelocales)
- [filterArgs](README.md#filterargs)
- [getLocaleDatePattern](README.md#getlocaledatepattern)
- [getParentWindows](README.md#getparentwindows)
- [getStoryHTML](README.md#getstoryhtml)
- [getWindows](README.md#getwindows)
- [isTagName](README.md#istagname)
- [isValidString](README.md#isvalidstring)
- [localeCurrency](README.md#localecurrency)
- [localeDate](README.md#localedate)
- [localeNumber](README.md#localenumber)
- [nextTick](README.md#nexttick)
- [setupMutationObserverMock](README.md#setupmutationobservermock)
- [setupResizeObserverMock](README.md#setupresizeobservermock)
- [setupSubmitEventMock](README.md#setupsubmiteventmock)
- [stencilWrapper](README.md#stencilwrapper)

## Variables

### dateRegExp

• `Const` **dateRegExp**: `RegExp`

Date RegExp, usefull to test if string is a follow the date pattern

**`Example`**

```ts
dateRegExp.test('mystring') // false
dateRegExp.test('2020-12-31') // true
```

#### Defined in

packages/stencil-helpers/src/locale/index.ts:85

___

### focusableElements

• `Const` **focusableElements**: ``"a[href], button, input, textarea, select, details, [tabindex]:not([tabindex=\"-1\"]), [identifier], mg-button"``

CSS selector to select focusable elements.

**`Example`**

```ts
const allFocusableElements: HTMLElement[] = Array.from(this.element.querySelectorAll(focusableElements));
```

#### Defined in

packages/stencil-helpers/src/components/index.ts:96

## Functions

### allItemsAreString

▸ **allItemsAreString**(`items`): items is string[]

Typeguard function to check if all array items are strings.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `items` | `unknown` | items to check |

#### Returns

items is string[]

`true` if all items are strings

#### Defined in

packages/stencil-helpers/src/components/index.ts:77

___

### cleanString

▸ **cleanString**(`text`): `string`

Cleans string characters by removing special characters and converting to lowercase.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `text` | `string` | text to clean |

#### Returns

`string`

cleaned string

**`Example`**

```ts
cleanString('âäàçéèêñù') // 'aaaceeenu'
cleanString('BATMAN') // 'batman'
```

#### Defined in

packages/stencil-helpers/src/components/index.ts:166

___

### createID

▸ **createID**(`prefix?`, `length?`): `string`

Create random ID

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `prefix` | `string` | `''` | add prefix to created ID |
| `length` | `number` | `10` | ID length |

#### Returns

`string`

ID

#### Defined in

packages/stencil-helpers/src/components/index.ts:7

___

### dateToString

▸ **dateToString**(`date`): `undefined` \| `string`

Formats a date object to a string with the pattern 'YYYY-MM-DD'.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `date` | `Date` | date to parse |

#### Returns

`undefined` \| `string`

string date with pattern 'YYYY-MM-DD'

**`Example`**

```ts
dateToString(new Date('2023-12-24')) // '2023-12-24'
```

#### Defined in

packages/stencil-helpers/src/locale/index.ts:28

___

### defineLocales

▸ **defineLocales**(`messages`, `defaultLocale`): (`element`: `HTMLElement`) => \{ `locale`: `string` ; `messages`: `ObjectType`  }

Get Intl object

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `messages` | `ObjectType` | locales to render in object format. `ex: { en: { porp: "test" }, fr: { porp: "test" }}`. |
| `defaultLocale` | `string` | fallback locale to render. `ex: 'en'`. |

#### Returns

`fn`

from the element passed in return function you will get the matching messages object

▸ (`element`): `Object`

##### Parameters

| Name | Type |
| :------ | :------ |
| `element` | `HTMLElement` |

##### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `locale` | `string` |
| `messages` | `ObjectType` |

**`Example`**

```ts
import en from './en/messages.json';
import fr from './fr/messages.json';
import { defineLocales } from '@mgdis/stencil-helpers';

const defaultLocale = 'en';
const messages = { en, fr };

export const initLocales = defineLocales(messages, defaultLocale);
```

#### Defined in

packages/stencil-helpers/src/locale/index.ts:122

___

### filterArgs

▸ **filterArgs**\<`T`\>(`args`, `defaultValues?`): `T`

Filter default argument on component argument to prevent them to be rendered

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `args` | `T` | all possible args with custom values |
| `defaultValues?` | `T` | component default args values |

#### Returns

`T`

filtres args

**`Example`**

```ts
import { filterArgs } from '@mgdis/stencil-helpers';
const Template = (args: MgBadgeType): HTMLElement => <mg-badge {...filterArgs(args, { variant: variants[0] })}></mg-badge>;
```

#### Defined in

packages/stencil-helpers/src/storybook/index.ts:59

___

### getLocaleDatePattern

▸ **getLocaleDatePattern**(`locale`): `string`

Gets the date pattern based on the specified locale.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `locale` | `string` | the locale to refer to |

#### Returns

`string`

date pattern

**`Example`**

```ts
getLocaleDatePattern('fr') // 'dd/mm/yyyy'
```

#### Defined in

packages/stencil-helpers/src/locale/index.ts:12

___

### getParentWindows

▸ **getParentWindows**(`localWindow`, `windows?`): `Window`[]

Get parent windows

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `localWindow` | `Window` | `undefined` | the window we are lookink for parents |
| `windows` | `Window`[] | `[]` | The list of allready found windows |

#### Returns

`Window`[]

The list of windows found

#### Defined in

packages/stencil-helpers/src/components/index.ts:115

___

### getStoryHTML

▸ **getStoryHTML**(`vitualNode`): `string`

Get story HTML from virtual DOM.
Mainly used to render, component code exemple in stories.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vitualNode` | `VNode` | story virtual DOM |

#### Returns

`string`

stringified rendered HTML

**`Example`**

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

#### Defined in

packages/stencil-helpers/src/storybook/index.ts:132

___

### getWindows

▸ **getWindows**(`localWindow`): `Window`[]

Get windows

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `localWindow` | `Window` | the window we are lookink for other windows |

#### Returns

`Window`[]

The list of windows found

#### Defined in

packages/stencil-helpers/src/components/index.ts:103

___

### isTagName

▸ **isTagName**(`element`, `tagNames`): `boolean`

Check if element belongs to the given tagNames list

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `element` | `Element` | element to check |
| `tagNames` | `string`[] | allowed tag names list |

#### Returns

`boolean`

`true` if element tagName is in the tagNames list

#### Defined in

packages/stencil-helpers/src/components/index.ts:85

___

### isValidString

▸ **isValidString**(`value`): `boolean`

Validate string

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | value to check |

#### Returns

`boolean`

`true` if string is valid

#### Defined in

packages/stencil-helpers/src/components/index.ts:154

___

### localeCurrency

▸ **localeCurrency**(`number`, `locale`, `currency`): `string`

Format number to the locale currency

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `number` | `number` | number to format |
| `locale` | `string` | locale to apply |
| `currency` | `string` | currency to apply |

#### Returns

`string`

formatted currency

**`Example`**

```ts
localeCurrency(1234567890.12, 'fr', 'EUR') // '1 234 567 890,12\xa0€'
```

#### Defined in

packages/stencil-helpers/src/locale/index.ts:63

___

### localeDate

▸ **localeDate**(`date`, `locale`): `string`

Locale date format

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `date` | `undefined` \| `string` | date to format |
| `locale` | `string` | locale to apply |

#### Returns

`string`

formatted date

**`Example`**

```ts
localeDate('2022-06-02', 'fr') // '02/06/2022'
```

#### Defined in

packages/stencil-helpers/src/locale/index.ts:97

___

### localeNumber

▸ **localeNumber**(`number`, `locale`): `string`

Format number to locale

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `number` | `number` | number to format |
| `locale` | `string` | locale to apply |

#### Returns

`string`

formatted number

**`Example`**

```ts
localeNumber(1234567890.12, 'fr') // 1 234 567 890,12
```

#### Defined in

packages/stencil-helpers/src/locale/index.ts:75

___

### nextTick

▸ **nextTick**(`callback`): `Promise`\<`void`\>

Use to process code next tick in the event loop

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback` | () => `void` | code to excute on next tick |

#### Returns

`Promise`\<`void`\>

differed code excution

#### Defined in

packages/stencil-helpers/src/components/index.ts:179

___

### setupMutationObserverMock

▸ **setupMutationObserverMock**(`«destructured»`): (`callback`: `MutationCallback`) => `MutationObserver`

Utility function that mocks the `MutationObserver` API. Recommended to execute inside `beforeEach`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `SetupMutationObserverMockParams` |

#### Returns

`fn`

Mocked MutationObserver

• **new setupMutationObserverMock**(`callback`): `MutationObserver`

##### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | `MutationCallback` |

##### Returns

`MutationObserver`

| Name | Type |
| :------ | :------ |
| `prototype` | `MutationObserver` |

**`Example`**

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

#### Defined in

packages/stencil-helpers/src/test/unit.ts:23

___

### setupResizeObserverMock

▸ **setupResizeObserverMock**(`«destructured»`): (`callback`: `ResizeObserverCallback`) => `ResizeObserver`

Utility function that mocks the `ResizeObserver` API. Recommended to execute inside `beforeEach`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `setupResizeObserverMockParams` |

#### Returns

`fn`

Mocked ResizeObserver

• **new setupResizeObserverMock**(`callback`): `ResizeObserver`

##### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | `ResizeObserverCallback` |

##### Returns

`ResizeObserver`

| Name | Type |
| :------ | :------ |
| `prototype` | `ResizeObserver` |

**`Example`**

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

#### Defined in

packages/stencil-helpers/src/test/unit.ts:83

___

### setupSubmitEventMock

▸ **setupSubmitEventMock**(): typeof `MockCustomEvent`

Utility function that mocks the `SubmitEvent` API. Recommended to execute inside `beforeEach`.

#### Returns

typeof `MockCustomEvent`

custom event mock

**`Example`**

```
setupSubmitEventMock();
```

#### Defined in

packages/stencil-helpers/src/test/unit.ts:133

___

### stencilWrapper

▸ **stencilWrapper**(`storyFn`, `context`): `undefined` \| `Element`

Storybook stencil wrapper. Used to target element with `storybook-root` id and render virtual DOM inside.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `storyFn` | (`ctx`: `any`) => `void` | storybook render function |
| `context` | `ArgsType` | storybook context |

#### Returns

`undefined` \| `Element`

rendered element

**`Example`**

```ts
// .storybook/preview.ts
import { stencilWrapper } from '@mgdis/stencil-helpers';
export const decorators: Preview['decorators'] = [stencilWrapper];
```

#### Defined in

packages/stencil-helpers/src/storybook/index.ts:90
