import { afterAll, beforeAll } from 'vitest';
import { chromium, Browser, Page } from 'playwright';

let browser: Browser;
let page: Page;

// Setup for E2E tests
beforeAll(async () => {
  browser = await chromium.launch({
    headless: true
  });
  page = await browser.newPage();
  
  // Make browser and page available globally
  (global as any).browser = browser;
  (global as any).page = page;
});

// Cleanup after tests
afterAll(async () => {
  await page.close();
  await browser.close();
});

// Add any additional E2E-specific test setup here