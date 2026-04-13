const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const screenshotDir = '/tmp/site-audit';

// Create screenshot directory if it doesn't exist
if (!fs.existsSync(screenshotDir)) {
  fs.mkdirSync(screenshotDir, { recursive: true });
}

async function runAudit() {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 }
  });

  try {
    console.log('Opening http://localhost:3004...');
    await page.goto('http://localhost:3004', { waitUntil: 'networkidle' });

    // Get page height for scroll calculations
    const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight);
    console.log(`Page height: ${pageHeight}px`);

    // Screenshot 1: Initial load
    console.log('Taking screenshot 1: Initial load (0%)...');
    await page.screenshot({ path: path.join(screenshotDir, '01-initial-load.png'), fullPage: true });

    // Screenshot 2: 10% scroll
    const scroll10 = pageHeight * 0.1;
    console.log(`Taking screenshot 2: 10% scroll (${scroll10}px)...`);
    await page.evaluate(px => window.scrollTo(0, px), scroll10);
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(screenshotDir, '02-scroll-10.png'), fullPage: false });

    // Screenshot 3: 25% scroll
    const scroll25 = pageHeight * 0.25;
    console.log(`Taking screenshot 3: 25% scroll (${scroll25}px)...`);
    await page.evaluate(px => window.scrollTo(0, px), scroll25);
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(screenshotDir, '03-scroll-25.png'), fullPage: false });

    // Screenshot 4: 40% scroll
    const scroll40 = pageHeight * 0.4;
    console.log(`Taking screenshot 4: 40% scroll (${scroll40}px)...`);
    await page.evaluate(px => window.scrollTo(0, px), scroll40);
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(screenshotDir, '04-scroll-40.png'), fullPage: false });

    // Screenshot 5: 55% scroll
    const scroll55 = pageHeight * 0.55;
    console.log(`Taking screenshot 5: 55% scroll (${scroll55}px)...`);
    await page.evaluate(px => window.scrollTo(0, px), scroll55);
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(screenshotDir, '05-scroll-55.png'), fullPage: false });

    // Screenshot 6: 70% scroll
    const scroll70 = pageHeight * 0.7;
    console.log(`Taking screenshot 6: 70% scroll (${scroll70}px)...`);
    await page.evaluate(px => window.scrollTo(0, px), scroll70);
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(screenshotDir, '06-scroll-70.png'), fullPage: false });

    // Screenshot 7: 85% scroll
    const scroll85 = pageHeight * 0.85;
    console.log(`Taking screenshot 7: 85% scroll (${scroll85}px)...`);
    await page.evaluate(px => window.scrollTo(0, px), scroll85);
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(screenshotDir, '07-scroll-85.png'), fullPage: false });

    // Screenshot 8: 100% scroll
    const scroll100 = pageHeight;
    console.log(`Taking screenshot 8: 100% scroll (${scroll100}px)...`);
    await page.evaluate(px => window.scrollTo(0, px), scroll100);
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(screenshotDir, '08-scroll-100.png'), fullPage: false });

    console.log('\nAll screenshots captured successfully!');
    console.log(`Screenshots saved to: ${screenshotDir}`);

  } catch (error) {
    console.error('Error during audit:', error);
  } finally {
    await browser.close();
  }
}

runAudit();
