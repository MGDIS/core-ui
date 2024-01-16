[@mgdis/stencil-helpers](../README.md) / ClassList

# Class: ClassList

Class to manage component classlist
Set() are not working when imported in project

## Table of contents

### Constructors

- [constructor](ClassList.md#constructor)

### Properties

- [classes](ClassList.md#classes)

### Methods

- [add](ClassList.md#add)
- [delete](ClassList.md#delete)
- [has](ClassList.md#has)
- [join](ClassList.md#join)

## Constructors

### constructor

• **new ClassList**(`classlist?`): [`ClassList`](ClassList.md)

#### Parameters

| Name        | Type       | Default value |
| :---------- | :--------- | :------------ |
| `classlist` | `string`[] | `[]`          |

#### Returns

[`ClassList`](ClassList.md)

#### Defined in

packages/stencil-helpers/src/components/index.ts:30

## Properties

### classes

• **classes**: `string`[]

Available classes

#### Defined in

packages/stencil-helpers/src/components/index.ts:28

## Methods

### add

▸ **add**(`className`): `void`

Add class

#### Parameters

| Name        | Type     | Description       |
| :---------- | :------- | :---------------- |
| `className` | `string` | class name to add |

#### Returns

`void`

#### Defined in

packages/stencil-helpers/src/components/index.ts:38

---

### delete

▸ **delete**(`className`): `void`

Delete class

#### Parameters

| Name        | Type     | Description          |
| :---------- | :------- | :------------------- |
| `className` | `string` | class name to delete |

#### Returns

`void`

#### Defined in

packages/stencil-helpers/src/components/index.ts:48

---

### has

▸ **has**(`className`): `boolean`

Check if class exist in list

#### Parameters

| Name        | Type     | Description         |
| :---------- | :------- | :------------------ |
| `className` | `string` | class name to check |

#### Returns

`boolean`

class name is in the list

#### Defined in

packages/stencil-helpers/src/components/index.ts:60

---

### join

▸ **join**(): `string`

Join classes seperated by spaces

#### Returns

`string`

joined values

#### Defined in

packages/stencil-helpers/src/components/index.ts:68
