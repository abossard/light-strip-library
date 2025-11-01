import { test, expect } from '@playwright/test';

test.describe('Light Strip Library Screenshots', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    // Wait for React to render
    await page.waitForSelector('.strip-section', { timeout: 10000 });
  });

  test('capture straight LED strip configurations', async ({ page }) => {
    // Take screenshot of initial state
    await page.screenshot({ 
      path: 'screenshots/straight-led-strip-initial.png',
      fullPage: false,
      clip: { x: 0, y: 0, width: 1200, height: 400 }
    });

    // Start chasing animation on straight strip
    const straightSection = page.locator('.strip-section').first();
    const chasingButton = straightSection.locator('button:has-text("Chasing Light")');
    await chasingButton.waitFor({ state: 'visible' });
    await chasingButton.click({ force: true });
    
    // Wait for animation to start
    await page.waitForTimeout(500);
    
    await page.screenshot({ 
      path: 'screenshots/straight-led-strip-chasing.png',
      fullPage: false,
      clip: { x: 0, y: 0, width: 1200, height: 400 }
    });

    // Stop animation and start rainbow
    const stopButton = straightSection.locator('button:has-text("Stop")');
    await stopButton.waitFor({ state: 'visible' });
    await stopButton.click({ force: true });
    await page.waitForTimeout(300);
    
    const rainbowButton = straightSection.locator('button:has-text("Rainbow Wave")');
    await rainbowButton.waitFor({ state: 'visible' });
    await rainbowButton.click({ force: true });
    await page.waitForTimeout(500);
    
    await page.screenshot({ 
      path: 'screenshots/straight-led-strip-rainbow.png',
      fullPage: false,
      clip: { x: 0, y: 0, width: 1200, height: 400 }
    });
  });

  test('capture circular LED strip configurations', async ({ page }) => {
    // Scroll to circular section
    const circularSection = page.locator('.strip-section').nth(1);
    await circularSection.scrollIntoViewIfNeeded();
    
    // Take screenshot of initial state
    await page.screenshot({ 
      path: 'screenshots/circular-led-strip-initial.png',
      fullPage: false,
      clip: { x: 0, y: 400, width: 1200, height: 500 }
    });

    // Start chasing animation
    const chasingButton = circularSection.locator('button:has-text("Chasing Light")');
    await chasingButton.waitFor({ state: 'visible' });
    await chasingButton.click({ force: true });
    await page.waitForTimeout(500);
    
    await page.screenshot({ 
      path: 'screenshots/circular-led-strip-chasing.png',
      fullPage: false,
      clip: { x: 0, y: 400, width: 1200, height: 500 }
    });

    // Rainbow animation
    const stopButton = circularSection.locator('button:has-text("Stop")');
    await stopButton.waitFor({ state: 'visible' });
    await stopButton.click({ force: true });
    await page.waitForTimeout(300);
    
    const rainbowButton = circularSection.locator('button:has-text("Rainbow Wave")');
    await rainbowButton.waitFor({ state: 'visible' });
    await rainbowButton.click({ force: true });
    await page.waitForTimeout(500);
    
    await page.screenshot({ 
      path: 'screenshots/circular-led-strip-rainbow.png',
      fullPage: false,
      clip: { x: 0, y: 400, width: 1200, height: 500 }
    });
  });

  test('capture square LED strip configurations', async ({ page }) => {
    // Scroll to square section
    const squareSection = page.locator('.strip-section').nth(2);
    await squareSection.scrollIntoViewIfNeeded();
    
    // Take screenshot of initial state
    await page.screenshot({ 
      path: 'screenshots/square-led-strip-initial.png',
      fullPage: false,
      clip: { x: 0, y: 900, width: 1200, height: 600 }
    });

    // Start chasing animation
    const chasingButton = squareSection.locator('button:has-text("Chasing Light")');
    await chasingButton.waitFor({ state: 'visible' });
    await chasingButton.click({ force: true });
    await page.waitForTimeout(500);
    
    await page.screenshot({ 
      path: 'screenshots/square-led-strip-chasing.png',
      fullPage: false,
      clip: { x: 0, y: 900, width: 1200, height: 600 }
    });

    // Random blink animation
    const stopButton = squareSection.locator('button:has-text("Stop")');
    await stopButton.waitFor({ state: 'visible' });
    await stopButton.click({ force: true });
    await page.waitForTimeout(300);
    
    const randomButton = squareSection.locator('button:has-text("Random Blink")');
    await randomButton.waitFor({ state: 'visible' });
    await randomButton.click({ force: true });
    await page.waitForTimeout(800);
    
    await page.screenshot({ 
      path: 'screenshots/square-led-strip-random.png',
      fullPage: false,
      clip: { x: 0, y: 900, width: 1200, height: 600 }
    });
  });

  test('capture overview of all LED strips', async ({ page }) => {
    // Start rainbow animation on all strips for a nice overview
    const allSections = page.locator('.strip-section');
    
    for (let i = 0; i < 3; i++) {
      const section = allSections.nth(i);
      const rainbowButton = section.locator('button:has-text("Rainbow Wave")');
      await rainbowButton.waitFor({ state: 'visible' });
      await rainbowButton.click({ force: true });
      await page.waitForTimeout(200);
    }
    
    await page.waitForTimeout(1000);
    
    // Take full page screenshot
    await page.screenshot({ 
      path: 'screenshots/all-led-strips-overview.png',
      fullPage: true
    });
  });
});