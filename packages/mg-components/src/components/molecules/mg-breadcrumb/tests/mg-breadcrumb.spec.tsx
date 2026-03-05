import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgBreadcrumb } from '../mg-breadcrumb';
import { MgIcon } from '../../../atoms/mg-icon/mg-icon';

const getPage = args =>
  newSpecPage({
    components: [MgBreadcrumb, MgIcon],
    template: () => <mg-breadcrumb {...args}></mg-breadcrumb>,
  });

describe('mg-breadcrumb', () => {
  test('with args %s', async () => {
    const { root } = await getPage({
      items: [{ label: 'Home', href: '/', icon: 'home-outline' }, { label: 'Lorem ipsum dolor sit amet', href: '/lorem' }, { label: 'Current page' }],
    });
    expect(root).toMatchSnapshot();
  });

  test.each([{ items: [] }, { items: [{ label: '' }] }, { items: [{ label: '   ' }] }])('Should throw error with invalid items: %s', async args => {
    expect.assertions(1);
    try {
      await getPage(args);
    } catch (err) {
      expect((err as Error).message).toBe('<mg-breadcrumb> prop "items": Cannot be empty and each item must have a non-empty label.');
    }
  });

  test('Should throw error when items is passed via HTML attribute (string)', async () => {
    expect.assertions(1);
    try {
      await getPage({ items: '[{"label":"Home","href":"/"}]' });
    } catch (err) {
      expect((err as Error).message).toBe('<mg-breadcrumb> prop "items": Must be set via JavaScript (property), not via HTML attribute.');
    }
  });

  test.each([
    {
      items: [{ label: 'Home' }, { label: 'Section', href: '/section' }, { label: 'Current page' }],
      expectedIndex: 0,
    },
    {
      items: [{ label: 'Home', href: '/' }, { label: 'Section' }, { label: 'Current page', href: '/current' }],
      expectedIndex: 1,
    },
  ])('Should throw error when a non-last item has no href', async ({ items, expectedIndex }) => {
    expect.assertions(1);
    try {
      await getPage({ items });
    } catch (err) {
      expect((err as Error).message).toBe(`<mg-breadcrumb> prop "items": Only the last item may have no href (current page). Item at index ${expectedIndex} has no href.`);
    }
  });

  test('Should set aria-label on link when item has icon', async () => {
    const page = await getPage({
      items: [{ label: 'Home', href: '/', icon: 'home' }, { label: 'Current page' }],
    });

    const mgBreadcrumb = page.doc.querySelector('mg-breadcrumb');
    const linkWithIcon = mgBreadcrumb.shadowRoot.querySelector('a');

    expect(linkWithIcon.getAttribute('aria-label')).toBe('Home');
  });

  test('Should set aria-current="page" on last link when last item has href', async () => {
    const page = await getPage({
      items: [
        { label: 'Home', href: '/', icon: 'home' },
        { label: 'Current', href: '/current' },
      ],
    });

    const mgBreadcrumb = page.doc.querySelector('mg-breadcrumb');
    const links = mgBreadcrumb.shadowRoot.querySelectorAll('a');
    const lastLink = links[links.length - 1];

    expect(lastLink.getAttribute('aria-current')).toBe('page');
  });

  test('Should not set aria-label on link when item has no icon', async () => {
    const page = await getPage({
      items: [{ label: 'Home', href: '/', icon: 'home' }, { label: 'Lorem ipsum dolor sit amet', href: '/lorem' }, { label: 'Current page' }],
    });

    const mgBreadcrumb = page.doc.querySelector('mg-breadcrumb');
    const links = mgBreadcrumb.shadowRoot.querySelectorAll('a');
    const textLink = links[1];

    expect(textLink.hasAttribute('aria-label')).toBe(false);
  });

  test('Should update rendered list when items prop changes', async () => {
    const initialItems = [{ label: 'Home', href: '/' }, { label: 'Current page' }];
    const page = await getPage({ items: initialItems });

    const mgBreadcrumb = page.doc.querySelector('mg-breadcrumb');
    const listBefore = mgBreadcrumb.shadowRoot.querySelector('ol');
    expect(listBefore.querySelectorAll('li')).toHaveLength(2);
    expect(listBefore.querySelector('span[aria-current="page"]').textContent.trim()).toBe('Current page');

    const newItems = [{ label: 'Home', href: '/' }, { label: 'Section', href: '/section' }, { label: 'New current' }];
    mgBreadcrumb.items = newItems;
    await page.waitForChanges();

    const listAfter = mgBreadcrumb.shadowRoot.querySelector('ol');
    expect(listAfter.querySelectorAll('li')).toHaveLength(3);
    expect(listAfter.querySelector('span[aria-current="page"]').textContent.trim()).toBe('New current');
  });
});
