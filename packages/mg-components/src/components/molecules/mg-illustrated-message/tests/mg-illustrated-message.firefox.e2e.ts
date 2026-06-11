import { expect } from '@playwright/test';
import { test } from '../../../../utils/playwright.fixture';

test.describe('mg-illustrated-message', () => {
  // Firefox-specific: inside the horizontal container query the illustration column
  // is sized with `max-inline-size: fit-content`. An <img> slotted with `inline-size:
  // 100%` has no layout size of its own, so Firefox resolves that fit-content to 0 and
  // the image disappears (Chromium does not). Anchoring images by their block-size in
  // the horizontal direction keeps them visible. Inline <svg> illustrations were never
  // affected, so this guards the `<img>` case specifically.
  test('img illustration does not collapse in the horizontal row layout', async ({ page }) => {
    await page.setContent(`
      <div style="inline-size: 60rem">
        <mg-illustrated-message direction="horizontal">
          <img
            slot="illustration"
            alt=""
            src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 184 184'><rect width='184' height='184' fill='%23bed830'/></svg>"
          />
          <h2 slot="title">Lorem Ipsum</h2>
          <div slot="details">The standard Lorem Ipsum passage, used since the 1500s</div>
        </mg-illustrated-message>
      </div>`);

    await page.waitForSelector('mg-illustrated-message.hydrated');

    const illustration = page.locator('[slot="illustration"]');
    const box = await illustration.boundingBox();

    // Without the fix the illustration column collapses to 0 on Firefox.
    expect(box?.width ?? 0).toBeGreaterThan(0);
    expect(box?.height ?? 0).toBeGreaterThan(0);
  });
});
