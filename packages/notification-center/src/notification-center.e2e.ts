import { test, expect, Page, FrameLocator } from '@playwright/test';

const displayNotification = (page: Page, hasText: string, frame?: FrameLocator): Promise<void> => (frame ?? page).locator(`text="${hasText}"`).click();

const expectedNotifications = (page: Page | FrameLocator, expected: number): Promise<void> =>
  expect(page.locator('#mg-notification-center .notification-center__notification')).toHaveCount(expected);

const testPage = async (page: Page, file: string, title: RegExp, frame?: FrameLocator, frameTitle?: string): Promise<void> => {
  await page.goto(`http://localhost:3210/${file}`);
  await page.locator('html.hydrated').waitFor();

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(title);

  // Do not expect to have any notifications
  await expectedNotifications(page, 0);

  // Click on Info button
  await displayNotification(page, 'Info', frame);

  // Expect to have a displayed message
  await expectedNotifications(page, 1);

  // Click on message close button
  const mgButton = await page.locator('#mg-notification-center .notification-center__notification.hydrated mg-button');
  await mgButton.waitFor();
  await mgButton.dispatchEvent('click');

  // Do not expect to have any notifications
  await expectedNotifications(page, 0);

  // Add message with context
  await displayNotification(page, 'w/ Context', frame);

  // Expect to have 1 notification
  await expectedNotifications(page, 1);

  // Add message with context
  await displayNotification(page, 'w/ Context', frame);

  // Expect to have 1 notification
  await expectedNotifications(page, 1);

  // Click on all buttons
  await displayNotification(page, 'Info', frame);
  await displayNotification(page, 'Danger', frame);
  await displayNotification(page, 'Warning', frame);
  await displayNotification(page, 'Success', frame);
  await displayNotification(page, 'Success no delay', frame);
  await displayNotification(page, 'Delay', frame);
  await displayNotification(page, 'Long text', frame);

  // Expect to have 7 notifications
  await expectedNotifications(page, 8);

  // Expect to match screenshot
  await expect(page).toHaveScreenshot(`${[file, 'notification', frameTitle].filter(value => !!value).join('-')}.png`);

  // Wait for Delay and Success messages to disappear
  await page.waitForTimeout(5000);

  // Expect to have 5 notifications
  await expectedNotifications(page, 6);
};

test('Without iframe', async ({ page }) => {
  await testPage(page, 'index.html', /Notification center without iframe/);
});

test('With one iframe', async ({ page }) => {
  await testPage(page, 'iframe.html', /Notification center with an iframe/);
  // From the iframe
  await testPage(page, 'iframe.html', /Notification center with an iframe/, page.frameLocator('[title="index"]'), 'index');
});

test('With two iframes', async ({ page }) => {
  await testPage(page, 'inception.html', /Notification center with iframes/);
  // From the iframe
  await testPage(page, 'inception.html', /Notification center with iframes/, page.frameLocator('[title="iframe"]'), 'iframe');
  // From the iframe in the iframe
  await testPage(page, 'inception.html', /Notification center with iframes/, page.frameLocator('[title="iframe"]').frameLocator('[title="index"]'), 'index');
});
