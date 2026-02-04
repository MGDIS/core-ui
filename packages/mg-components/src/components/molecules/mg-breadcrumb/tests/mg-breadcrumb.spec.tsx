import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgBreadcrumb } from '../mg-breadcrumb';
import { MgIcon } from '../../../atoms/mg-icon/mg-icon';

const getPage = args =>
  newSpecPage({
    components: [MgBreadcrumb, MgIcon],
    template: () => <mg-breadcrumb {...args}></mg-breadcrumb>,
  });

/** Type to call private handleLinkClick in tests (for coverage of edge cases) */
interface BreadcrumbTestInstance {
  handleLinkClick(event: MouseEvent): void;
}

describe('mg-breadcrumb', () => {
  test('with args %s', async () => {
    const { root } = await getPage({
      items: [{ label: 'Home', href: '/', icon: 'home-outline' }, { label: 'Lorem ipsum dolor sit amet', href: '/lorem' }, { label: 'Current page' }],
    });
    expect(root).toMatchSnapshot();
  });

  test('Should render with items as JSON string (HTML attribute)', async () => {
    const itemsJson = JSON.stringify([{ label: 'Home', href: '/', icon: 'home-outline' }, { label: 'Lorem ipsum dolor sit amet', href: '/lorem' }, { label: 'Current page' }]);
    const { root } = await getPage({ items: itemsJson });
    expect(root).toMatchSnapshot();
  });

  test.each([{}, { items: [] }, { items: [{ label: '' }] }, { items: [{ label: '   ' }] }, { items: 'invalid' }, { items: '{"not": "an array"}' }])(
    'Should throw error with invalid items: %s',
    async args => {
      expect.assertions(1);
      try {
        await getPage(args);
      } catch (err) {
        const msg = err.message as string;
        const expectedMessages = [
          '<mg-breadcrumb> prop "items": Cannot be empty and each item must have a non-empty label.',
          '<mg-breadcrumb> prop "items": Invalid JSON in attribute.',
        ];
        expect(expectedMessages.some(m => msg === m)).toBe(true);
      }
    },
  );

  test('Should emit item-click when link is clicked', async () => {
    const page = await getPage({
      items: [{ label: 'Home', href: '/', icon: 'home-outline' }, { label: 'Lorem ipsum dolor sit amet', href: '/lorem' }, { label: 'Current page' }],
    });

    const spyItemClick = jest.spyOn(page.rootInstance.itemClick, 'emit');

    const mgBreadcrumb = page.doc.querySelector('mg-breadcrumb');
    const firstLink = mgBreadcrumb.shadowRoot.querySelector('a');
    const spyBlur = jest.spyOn(firstLink, 'blur');

    const clickEvent = new MouseEvent('click', { bubbles: true });
    Object.defineProperty(clickEvent, 'currentTarget', { value: firstLink, configurable: true });
    firstLink.dispatchEvent(clickEvent);

    await page.waitForChanges();

    expect(spyItemClick).toHaveBeenCalledWith(expect.objectContaining({ href: '/', label: 'Home' }));
    const emitted = spyItemClick.mock.calls[0][0] as { href: string; label: string; event: MouseEvent };
    expect(emitted.event).toBeInstanceOf(MouseEvent);
    expect(spyBlur).toHaveBeenCalled();
  });

  test('Should not emit item-click when clicked element has no valid href', async () => {
    const page = await getPage({
      items: [{ label: 'Home', href: '/' }, { label: 'Current page' }],
    });
    const spyItemClick = jest.spyOn(page.rootInstance.itemClick, 'emit');
    const mockAnchor = document.createElement('a');
    mockAnchor.setAttribute('href', '');
    const clickEvent = new MouseEvent('click', { bubbles: true });
    Object.defineProperty(clickEvent, 'currentTarget', { value: mockAnchor, configurable: true });
    (page.rootInstance as BreadcrumbTestInstance).handleLinkClick(clickEvent);
    expect(spyItemClick).not.toHaveBeenCalled();
  });

  test('Should emit item-click with empty label when link has no aria-label and no text content', async () => {
    const page = await getPage({
      items: [{ label: 'Home', href: '/' }, { label: 'Current page' }],
    });
    const spyItemClick = jest.spyOn(page.rootInstance.itemClick, 'emit');
    const mockAnchor = document.createElement('a');
    mockAnchor.setAttribute('href', '/');
    const clickEvent = new MouseEvent('click', { bubbles: true });
    Object.defineProperty(clickEvent, 'currentTarget', { value: mockAnchor, configurable: true });
    (page.rootInstance as BreadcrumbTestInstance).handleLinkClick(clickEvent);
    expect(spyItemClick).toHaveBeenCalledWith(expect.objectContaining({ href: '/', label: '' }));
  });

  test('Should emit item-click with empty label when link has null textContent (covers optional chaining branch)', async () => {
    const page = await getPage({
      items: [{ label: 'Home', href: '/' }, { label: 'Current page' }],
    });
    const spyItemClick = jest.spyOn(page.rootInstance.itemClick, 'emit');
    const mockAnchor = {
      getAttribute(name: string): string | null {
        return name === 'href' ? '/' : null;
      },
      get textContent(): string | null {
        return null;
      },
      blur(): void {},
    };
    const clickEvent = new MouseEvent('click', { bubbles: true });
    Object.defineProperty(clickEvent, 'currentTarget', { value: mockAnchor, configurable: true });
    (page.rootInstance as BreadcrumbTestInstance).handleLinkClick(clickEvent);
    expect(spyItemClick).toHaveBeenCalledWith(expect.objectContaining({ href: '/', label: '' }));
  });

  test('Should use custom label when provided', async () => {
    const page = await getPage({
      items: [{ label: 'Home', href: '/' }, { label: 'Current page' }],
      label: 'Custom breadcrumb',
    });
    const nav = page.doc.querySelector('mg-breadcrumb').shadowRoot.querySelector('nav');
    expect(nav.getAttribute('aria-label')).toBe('Custom breadcrumb');
  });

  test('Should emit item-click when text link (no icon) is clicked', async () => {
    const page = await getPage({
      items: [{ label: 'Home', href: '/', icon: 'home' }, { label: 'Lorem ipsum dolor sit amet', href: '/lorem' }, { label: 'Current page' }],
    });

    const spyItemClick = jest.spyOn(page.rootInstance.itemClick, 'emit');
    const mgBreadcrumb = page.doc.querySelector('mg-breadcrumb');
    const links = mgBreadcrumb.shadowRoot.querySelectorAll('a');
    const textLink = links[1];

    const clickEvent = new MouseEvent('click', { bubbles: true });
    Object.defineProperty(clickEvent, 'currentTarget', { value: textLink, configurable: true });
    textLink.dispatchEvent(clickEvent);
    await page.waitForChanges();

    expect(spyItemClick).toHaveBeenCalledWith(expect.objectContaining({ href: '/lorem', label: 'Lorem ipsum dolor sit amet' }));
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
    expect(listBefore.querySelector('.mg-c-breadcrumb__current').textContent.trim()).toBe('Current page');

    const newItems = [{ label: 'Home', href: '/' }, { label: 'Section', href: '/section' }, { label: 'New current' }];
    mgBreadcrumb.items = newItems;
    await page.waitForChanges();

    const listAfter = mgBreadcrumb.shadowRoot.querySelector('ol');
    expect(listAfter.querySelectorAll('li')).toHaveLength(3);
    expect(listAfter.querySelector('.mg-c-breadcrumb__current').textContent.trim()).toBe('New current');
  });
});
