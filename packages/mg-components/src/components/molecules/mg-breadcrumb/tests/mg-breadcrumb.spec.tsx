import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { toString } from '@mgdis/core-ui-helpers/dist/utils';
import { MgBreadcrumb } from '../mg-breadcrumb';
import { MgIcon } from '../../../atoms/mg-icon/mg-icon';

const getPage = args =>
  newSpecPage({
    components: [MgBreadcrumb, MgIcon],
    template: () => <mg-breadcrumb {...args}></mg-breadcrumb>,
  });

const expectedItemsError = (value: unknown) =>
  `<mg-breadcrumb> prop "items" is required and all values must be the same type, BreadcrumbItemType. Passed value: ${toString(value)}.`;

describe('mg-breadcrumb', () => {
  test('with args %s', async () => {
    expect(
      (
        await getPage({
          items: [{ label: 'Home', href: '/', icon: 'home-outline' }, { label: 'Lorem ipsum dolor sit amet', href: '/lorem' }, { label: 'Current page' }],
        })
      ).root,
    ).toMatchSnapshot();
  });

  test.each([{ items: [] }, { items: [{ label: '' }] }, { items: [{ label: '   ' }] }])('Should throw error with invalid items: %s', async args => {
    expect.assertions(1);
    try {
      await getPage(args);
    } catch (err) {
      expect(err.message).toEqual(expectedItemsError(args.items));
    }
  });

  test('Should throw error when items is passed via HTML attribute (string)', async () => {
    const items = '[{"label":"Home","href":"/"}]';
    expect.assertions(1);
    try {
      await getPage({ items });
    } catch (err) {
      expect(err.message).toEqual(expectedItemsError(items));
    }
  });

  test.each([
    {
      items: [{ label: 'Home' }, { label: 'Section', href: '/section' }, { label: 'Current page' }],
    },
    {
      items: [{ label: 'Home', href: '/' }, { label: 'Section' }, { label: 'Current page', href: '/current' }],
    },
  ])('Should throw error when a non-last item has no href', async ({ items }) => {
    expect.assertions(1);
    try {
      await getPage({ items });
    } catch (err) {
      expect(err.message).toEqual(expectedItemsError(items));
    }
  });

  test('Should set aria-label on link when item has icon', async () => {
    const page = await getPage({
      items: [{ label: 'Home', href: '/', icon: 'home' }, { label: 'Current page' }],
    });

    expect(page.doc.querySelector('mg-breadcrumb').shadowRoot.querySelector('a').getAttribute('aria-label')).toBe('Home');
  });

  test('Should set aria-current="page" on last link when last item has href', async () => {
    const page = await getPage({
      items: [
        { label: 'Home', href: '/', icon: 'home' },
        { label: 'Current', href: '/current' },
      ],
    });

    const links = page.doc.querySelector('mg-breadcrumb').shadowRoot.querySelectorAll('a');
    expect(links[links.length - 1].getAttribute('aria-current')).toBe('page');
  });

  test('Should not set aria-label on link when item has no icon', async () => {
    const page = await getPage({
      items: [{ label: 'Home', href: '/', icon: 'home' }, { label: 'Lorem ipsum dolor sit amet', href: '/lorem' }, { label: 'Current page' }],
    });

    const links = page.doc.querySelector('mg-breadcrumb').shadowRoot.querySelectorAll('a');
    expect(links[1].hasAttribute('aria-label')).toBe(false);
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
