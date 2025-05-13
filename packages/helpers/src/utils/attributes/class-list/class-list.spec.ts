import { describe, expect, test } from 'vitest';
import { ClassList } from './class-list';

describe('ClassList', () => {
  test('Should add classes to list', () => {
    const classCollection = new ClassList();
    expect(classCollection.classes).toEqual([]);
    classCollection.add('blu');
    expect(classCollection.classes).toEqual(['blu']);
    classCollection.add('bli');
    expect(classCollection.classes).toEqual(['blu', 'bli']);
    // Should not add classes if already in list
    classCollection.add('blu');
    expect(classCollection.classes).toEqual(['blu', 'bli']);
  });

  test('Should delete classes from list', () => {
    const classCollection = new ClassList(['blu', 'bli']);
    classCollection.delete('blu');
    expect(classCollection.classes).toEqual(['bli']);
    // List doesn't change if class name doesn't existe in list
    classCollection.delete('bla');
    expect(classCollection.classes).toEqual(['bli']);
  });

  test('Should check if class already in list', () => {
    const classCollection = new ClassList(['blu']);
    expect(classCollection.has('blu')).toEqual(true);
    expect(classCollection.has('bli')).toEqual(false);
  });

  test('Should return seperated space classes list', () => {
    const classCollection = new ClassList(['blu', 'bli']);
    expect(classCollection.join()).toEqual('blu bli');
  });
});
