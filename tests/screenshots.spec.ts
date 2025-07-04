import { test, expect } from '@playwright/test';

test.describe('Light Strip Library Screenshots', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
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
    await straightSection.locator('button:has-text("Chasing Light")').click();
    
    // Wait for animation to start
    await page.waitForTimeout(500);
    
    await page.screenshot({ 
      path: 'screenshots/straight-led-strip-chasing.png',
      fullPage: false,
      clip: { x: 0, y: 0, width: 1200, height: 400 }
    });

    // Stop animation and start rainbow
    await straightSection.locator('button:has-text("Stop")').click();
    await page.waitForTimeout(300);
    await straightSection.locator('button:has-text("Rainbow Wave")').click();
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
    await circularSection.locator('button:has-text("Chasing Light")').click();
    await page.waitForTimeout(500);
    
    await page.screenshot({ 
      path: 'screenshots/circular-led-strip-chasing.png',
      fullPage: false,
      clip: { x: 0, y: 400, width: 1200, height: 500 }
    });

    // Rainbow animation
    await circularSection.locator('button:has-text("Stop")').click();
    await page.waitForTimeout(300);
    await circularSection.locator('button:has-text("Rainbow Wave")').click();
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
    await squareSection.locator('button:has-text("Chasing Light")').click();
    await page.waitForTimeout(500);
    
    await page.screenshot({ 
      path: 'screenshots/square-led-strip-chasing.png',
      fullPage: false,
      clip: { x: 0, y: 900, width: 1200, height: 600 }
    });

    // Random blink animation
    await squareSection.locator('button:has-text("Stop")').click();
    await page.waitForTimeout(300);
    await squareSection.locator('button:has-text("Random Blink")').click();
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
      await allSections.nth(i).locator('button:has-text("Rainbow Wave")').click();
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