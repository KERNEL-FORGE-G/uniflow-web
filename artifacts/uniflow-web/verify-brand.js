import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1280, height: 800 }
  });

  // Test the Landing page
  console.log('Navigating to landing page...');
  await page.goto('http://localhost:3000/');
  await page.waitForTimeout(1000);

  // Check if logo is visible
  const logoText = await page.locator('text=UniFlow').first().isVisible();
  console.log('Landing logo text visible:', logoText);

  // Check if mascot is visible
  const mascotVisible = await page.locator('img[alt="UniFlow Mascot"]').first().isVisible();
  console.log('Landing mascot visible:', mascotVisible);

  await page.screenshot({ path: 'landing-updated.png', fullPage: true });
  console.log('Landing screenshot saved.');

  // Navigate to Auth page
  console.log('Navigating to Auth page...');
  await page.goto('http://localhost:3000/auth');
  await page.waitForTimeout(1000);

  const authMascotVisible = await page.locator('img[data-testid="auth-mascot"]').first().isVisible();
  console.log('Auth mascot visible:', authMascotVisible);

  await page.screenshot({ path: 'auth-updated.png' });
  console.log('Auth screenshot saved.');

  await browser.close();
})();
