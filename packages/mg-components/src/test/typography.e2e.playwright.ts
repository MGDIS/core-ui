import { setPageContent, expect, describe, testEach, PageType } from '../utils/playwright.e2e.test.utils';

describe('typography', () => {
  testEach([
    '<h1>Heading 1</h1>',
    '<h2>Heading 2</h2>',
    '<h3>Heading 3</h3>',
    '<h4>Heading 4</h4>',
    '<h5>Heading 5</h5>',
    '<h6>Heading 6</h6>',
    '<p>paragraph</p>',
    '<p><strong>strong</strong></p>',
    '<p><small>small</small></p>',
  ])('Should renders typography %s', async (page: PageType, html: string) => {
    await setPageContent(page, html);

    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });
});
