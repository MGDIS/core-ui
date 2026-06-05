import { describe, expect, test, vi } from 'vitest';
import { cemGenerator } from '.';
import { JsonDocs } from '@stencil/core/internal';
import jsonDocs from '../../../json-doc.test.json';

vi.mock('@stencil/core/internal/client', () => ({
  renderVdom: vi.fn(),
}));

describe('cemGenerator', () => {
  test('Should generate Custom Elements Manifest v2', () => {
    const cem = cemGenerator(jsonDocs as JsonDocs);
    expect(cem).toMatchSnapshot();
  });

  test('Should map attribute-backed props to both attributes and members', () => {
    const cem = cemGenerator(jsonDocs as JsonDocs);
    const decl = cem.modules[0].declarations[0];
    const attrBackedProp = decl.attributes.find(a => a.name === 'prop');
    expect(attrBackedProp).toBeDefined();
    expect(attrBackedProp?.fieldName).toBe('prop');
    const member = decl.members.find(m => m.kind === 'field' && m.name === 'prop');
    expect(member).toBeDefined();
    expect((member as { attribute?: string }).attribute).toBe('prop');
  });

  test('Should map JS-only props to members only (not attributes)', () => {
    const cem = cemGenerator(jsonDocs as JsonDocs);
    const decl = cem.modules[0].declarations[0];
    expect(decl.attributes.find(a => a.name === 'attr')).toBeUndefined();
    const member = decl.members.find(m => m.kind === 'field' && m.name === 'attr');
    expect(member).toBeDefined();
    expect((member as { attribute?: string }).attribute).toBeUndefined();
  });
});
