import { setPageContent, expect, describe, testEach, PageType } from '../utils/playwright.e2e.test.utils';

describe('typography', () => {
  testEach(
    ['1', '2', '3', '4', '5', '6'].flatMap(tag =>
      [true, false].map(smallTag => (smallTag ? `<h${tag}><small>Heading ${tag} small</small></h${tag}>` : `<h${tag}>Heading ${tag}</h${tag}>`)),
    ),
  )('Should render heading %s', async (page: PageType, html: string) => {
    await setPageContent(page, html);

    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });

  testEach(['<p>paragraph</p>', '<p><strong>strong</strong></p>', '<p><small>small</small></p>'])('Should render paragraph %s', async (page: PageType, html: string) => {
    await setPageContent(page, html);

    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });
});
