import { test, expect } from '@playwright/test';

test.describe('Experience Section', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the homepage
    await page.goto('/');
    
    // Scroll to the Experience section to ensure it's in view
    await page.evaluate(() => {
      const experienceSection = document.getElementById('experience');
      if (experienceSection) {
        experienceSection.scrollIntoView();
      }
    });
  });

  test('should display the Experience section with correct title', async ({ page }) => {
    // Check if the Experience section exists
    const experienceSection = await page.locator('[data-testid="experience-section"]');
    await expect(experienceSection).toBeVisible();
    
    // Verify section title and subtitle
    const title = await page.locator('#experience .section-title');
    await expect(title).toBeVisible();
    await expect(title).toHaveText('Professional Experience');
    
    const subtitle = await page.locator('#experience .section-subtitle');
    await expect(subtitle).toBeVisible();
  });

  test('should display experience cards with correct entries', async ({ page }) => {
    // Check if the experience cards container exists
    const experienceCards = await page.locator('.experience-cards');
    await expect(experienceCards).toBeVisible();
    
    // Verify experience entries are present
    const cards = await page.locator('.experience-cards .experience-card').count();
    expect(cards).toBeGreaterThan(0); // At least one experience card
    
    // Check for specific company names from portfolio.js
    const companyNames = ['Traction Tools', 'Ubicquia', 'Starr Companies'];
    
    for (const company of companyNames) {
      // Look for company names in the experience cards
      const companyElement = await page.locator(`.experience-cards:has-text("${company}")`).first();
      await expect(companyElement).toBeVisible();
    }
    
    // Check that the console header is present
    const consoleHeader = await page.locator('.experience-header');
    await expect(consoleHeader).toBeVisible();
  });

  test('should display console header with security theme', async ({ page }) => {
    // Check for the console header with security theme
    const consoleHeader = await page.locator('.experience-header');
    await expect(consoleHeader).toBeVisible();
    
    // Check that it contains the security-themed prompt and command
    const headerText = await consoleHeader.textContent();
    expect(headerText).toContain('root@security:~$');
    expect(headerText).toContain('view --secure professional_experience.json');
    
    // Verify the experience section has the correct structure
    const experienceSection = await page.locator('[data-testid="experience-section"]');
    await expect(experienceSection).toBeVisible();
    
    // Check that experience cards are properly rendered
    const experienceCards = await page.locator('.experience-cards .experience-card');
    const cardCount = await experienceCards.count();
    expect(cardCount).toBeGreaterThan(0);
  });
});
