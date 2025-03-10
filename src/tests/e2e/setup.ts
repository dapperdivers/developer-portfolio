import { chromium, FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  const { baseURL } = config.projects[0].use;
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    // Perform any global setup here
    await page.goto(baseURL!);
    // You can add more setup steps here
  } finally {
    await browser.close();
  }
}

export default globalSetup;