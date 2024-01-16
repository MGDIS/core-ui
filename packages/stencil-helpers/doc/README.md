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

Date RegExp

#### Defined in

packages/stencil-helpers/src/locale/index.ts:64

---

### focusableElements

• `Const` **focusableElements**: `"a[href], button, input, textarea, select, details, [tabindex]:not([tabindex=\"-1\"]), [identifier]"`

Focusable elements query selector

#### Defined in

packages/stencil-helpers/src/components/index.ts:93

## Functions

### allItemsAreString

▸ **allItemsAreString**(`items`): items is string[]

Check if all items are string

#### Parameters

| Name    | Type      | Description    |
| :------ | :-------- | :------------- |
| `items` | `unknown` | items to check |

#### Returns

items is string[]

all items are string

#### Defined in

packages/stencil-helpers/src/components/index.ts:78

---

### cleanString

▸ **cleanString**(`text`): `string`

Clean string caraters

#### Parameters

| Name   | Type     | Description   |
| :----- | :------- | :------------ |
| `text` | `string` | text to clean |

#### Returns

`string`

cleanded string

#### Defined in

packages/stencil-helpers/src/components/index.ts:158

---

### createID

▸ **createID**(`prefix?`, `length?`): `string`

Create random ID

#### Parameters

| Name     | Type     | Default value | Description              |
| :------- | :------- | :------------ | :----------------------- |
| `prefix` | `string` | `''`          | add prefix to created ID |
| `length` | `number` | `10`          | ID length                |

#### Returns

`string`

ID

#### Defined in

packages/stencil-helpers/src/components/index.ts:7

---

### dateToString

▸ **dateToString**(`date`): `undefined` \| `string`

Format a date object to string

#### Parameters

| Name   | Type   | Description |
| :----- | :----- | :---------- |
| `date` | `Date` | to parse    |

#### Returns

`undefined` \| `string`

string date with pattern 'YYYY-MM-DD'

#### Defined in

packages/stencil-helpers/src/locale/index.ts:20

---

### defineLocales

▸ **defineLocales**(`messages`, `defaultLocale`): (`element`: `HTMLElement`) => \{ `locale`: `string` ; `messages`: `ObjectType` }

Get Intl object

#### Parameters

| Name            | Type         | Description                                                                              |
| :-------------- | :----------- | :--------------------------------------------------------------------------------------- |
| `messages`      | `ObjectType` | locales to render in object format. `ex: { en: { porp: "test" }, fr: { porp: "test" }}`. |
| `defaultLocale` | `string`     | fallback locale to render. `ex: 'en'`.                                                   |

#### Returns

`fn`

from the element passed in return function you will get the matching messages object

▸ (`element`): `Object`

##### Parameters

| Name      | Type          |
| :-------- | :------------ |
| `element` | `HTMLElement` |

##### Returns

`Object`

| Name       | Type         |
| :--------- | :----------- |
| `locale`   | `string`     |
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

packages/stencil-helpers/src/locale/index.ts:97

---

### filterArgs

▸ **filterArgs**(`args`, `defaultValues?`): `ArgsType`

Filter default argument on component argument to prevent them to be rendered

#### Parameters

| Name             | Type       | Description                          |
| :--------------- | :--------- | :----------------------------------- |
| `args`           | `ArgsType` | all possible args with custom values |
| `defaultValues?` | `ArgsType` | component default args values        |

#### Returns

`ArgsType`

filtres args

**`Example`**

```ts
import { filterArgs } from '@mgdis/stencil-helpers';
const Template = (args: MgBadgeType): HTMLElement => <mg-badge {...filterArgs<MgBadgeType>(args, { variant: variants[0] })}></mg-badge>;
```

#### Defined in

packages/stencil-helpers/src/storybook/index.ts:59

---

### getLocaleDatePattern

▸ **getLocaleDatePattern**(`locale`): `string`

Get date pattern base on locale

#### Parameters

| Name     | Type     | Description |
| :------- | :------- | :---------- |
| `locale` | `string` | to refer    |

#### Returns

`string`

date pattern

#### Defined in

packages/stencil-helpers/src/locale/index.ts:8

---

### getParentWindows

▸ **getParentWindows**(`localWindow`, `windows?`): `Window`[]

Get parent windows

#### Parameters

| Name          | Type       | Default value | Description                           |
| :------------ | :--------- | :------------ | :------------------------------------ |
| `localWindow` | `Window`   | `undefined`   | the window we are lookink for parents |
| `windows`     | `Window`[] | `[]`          | The list of allready found windows    |

#### Returns

`Window`[]

The list of windows found

#### Defined in

packages/stencil-helpers/src/components/index.ts:112

---

### getStoryHTML

▸ **getStoryHTML**(`vitualNode`): `string`

Get story HTML from virtual DOM.
Mainly used to render, component code exemple in stories.

#### Parameters

| Name         | Type    | Description       |
| :----------- | :------ | :---------------- |
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

---

### getWindows

▸ **getWindows**(`localWindow`): `Window`[]

Get windows

#### Parameters

| Name          | Type     | Description                                 |
| :------------ | :------- | :------------------------------------------ |
| `localWindow` | `Window` | the window we are lookink for other windows |

#### Returns

`Window`[]

The list of windows found

#### Defined in

packages/stencil-helpers/src/components/index.ts:100

---

### isTagName

▸ **isTagName**(`element`, `tagNames`): `boolean`

Check if element is a heading

#### Parameters

| Name       | Type       | Description            |
| :--------- | :--------- | :--------------------- |
| `element`  | `Element`  | slotted element        |
| `tagNames` | `string`[] | allowed tag names list |

#### Returns

`boolean`

element is a heading

#### Defined in

packages/stencil-helpers/src/components/index.ts:86

---

### isValidString

▸ **isValidString**(`value`): `boolean`

Validate string

#### Parameters

| Name    | Type      | Description    |
| :------ | :-------- | :------------- |
| `value` | `unknown` | value to check |

#### Returns

`boolean`

if string is valid

#### Defined in

packages/stencil-helpers/src/components/index.ts:151

---

### localeCurrency

▸ **localeCurrency**(`number`, `locale`, `currency`): `string`

Format number to the locale currency

#### Parameters

| Name       | Type     | Description       |
| :--------- | :------- | :---------------- |
| `number`   | `number` | number to format  |
| `locale`   | `string` | locale to apply   |
| `currency` | `string` | currency to apply |

#### Returns

`string`

formatted currency

#### Defined in

packages/stencil-helpers/src/locale/index.ts:51

---

### localeDate

▸ **localeDate**(`date`, `locale`): `string`

Locale date format

#### Parameters

| Name     | Type                    | Description     |
| :------- | :---------------------- | :-------------- |
| `date`   | `undefined` \| `string` | date to format  |
| `locale` | `string`                | locale to apply |

#### Returns

`string`

formatted date

#### Defined in

packages/stencil-helpers/src/locale/index.ts:72

---

### localeNumber

▸ **localeNumber**(`number`, `locale`): `string`

Format number to locale

#### Parameters

| Name     | Type     | Description      |
| :------- | :------- | :--------------- |
| `number` | `number` | number to format |
| `locale` | `string` | locale to apply  |

#### Returns

`string`

formatted number

#### Defined in

packages/stencil-helpers/src/locale/index.ts:59

---

### nextTick

▸ **nextTick**(`callback`): `Promise`\<`void`\>

Use to process code next tick in the event loop

#### Parameters

| Name       | Type         | Description                 |
| :--------- | :----------- | :-------------------------- |
| `callback` | () => `void` | code to excute on next tick |

#### Returns

`Promise`\<`void`\>

differed code excution

#### Defined in

packages/stencil-helpers/src/components/index.ts:171

---

### setupMutationObserverMock

▸ **setupMutationObserverMock**(`«destructured»`): (`callback`: `MutationCallback`) => `MutationObserver`

Utility function that mocks the `MutationObserver` API. Recommended to execute inside `beforeEach`.

#### Parameters

| Name             | Type                              |
| :--------------- | :-------------------------------- |
| `«destructured»` | `SetupMutationObserverMockParams` |

#### Returns

`fn`

Mocked MutationObserver

• **new setupMutationObserverMock**(`callback`): `MutationObserver`

##### Parameters

| Name       | Type               |
| :--------- | :----------------- |
| `callback` | `MutationCallback` |

##### Returns

`MutationObserver`

| Name        | Type               |
| :---------- | :----------------- |
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

---

### setupResizeObserverMock

▸ **setupResizeObserverMock**(`«destructured»`): (`callback`: `ResizeObserverCallback`) => `ResizeObserver`

Utility function that mocks the `ResizeObserver` API. Recommended to execute inside `beforeEach`.

#### Parameters

| Name             | Type                            |
| :--------------- | :------------------------------ |
| `«destructured»` | `setupResizeObserverMockParams` |

#### Returns

`fn`

Mocked ResizeObserver

• **new setupResizeObserverMock**(`callback`): `ResizeObserver`

##### Parameters

| Name       | Type                     |
| :--------- | :----------------------- |
| `callback` | `ResizeObserverCallback` |

##### Returns

`ResizeObserver`

| Name        | Type             |
| :---------- | :--------------- |
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

---

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

---

### stencilWrapper

▸ **stencilWrapper**(`storyFn`, `context`): `undefined` \| `Element`

Storybook stencil wrapper. Used to target element with `storybook-root` id and render virtual DOM inside.

#### Parameters

| Name      | Type                     | Description               |
| :-------- | :----------------------- | :------------------------ |
| `storyFn` | (`ctx`: `any`) => `void` | storybook render function |
| `context` | `ArgsType`               | storybook context         |

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
