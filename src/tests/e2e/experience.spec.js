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

  test('should display experience timeline with correct entries', async ({ page }) => {
    // Check if the timeline exists
    const timeline = await page.locator('[data-testid="experience-timeline"]');
    await expect(timeline).toBeVisible();
    
    // Check for connection nodes
    const startNode = await page.locator('[data-testid="connection-start"]');
    await expect(startNode).toBeVisible();
    
    const endNode = await page.locator('[data-testid="connection-end"]');
    await expect(endNode).toBeVisible();
    
    // Verify experience entries are present
    // We expect at least the connection nodes and timeline entries to be displayed
    const entries = await page.locator('.timeline-entries .timeline-container > *').count();
    expect(entries).toBeGreaterThan(2); // Connection nodes and at least one entry
    
    // Check for specific company names from portfolio.js
    const companyNames = ['Traction Tools', 'Ubicquia', 'Starr Companies'];
    
    for (const company of companyNames) {
      // Use a more specific selector to avoid strict mode violations
      const companyElement = await page.locator(`.timeline-entries .terminal-title:has-text("${company}")`).first();
      await expect(companyElement).toBeVisible();
    }
  });

  test('should display security decorative elements in the timeline', async ({ page }) => {
    // Check for security theme elements
    const securityDecorations = await page.locator('.security-decorations');
    await expect(securityDecorations).toBeVisible();
    
    // Check for binary streams
    const binaryStream = await page.locator('.binary-stream').first();
    await expect(binaryStream).toBeVisible();
    
    // Check for secure connection labels
    const secureLabels = await page.locator('.secure-label');
    await expect(secureLabels.first()).toContainText('SECURE CONNECTION');
    await expect(secureLabels.last()).toContainText('CONNECTION SECURE');
  });
});
