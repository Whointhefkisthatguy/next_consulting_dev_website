const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const screenshotDir = '/tmp/site-audit';

async function runDebugAudit() {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 }
  });

  try {
    console.log('Opening http://localhost:3004...');
    await page.goto('http://localhost:3004', { waitUntil: 'networkidle' });

    // Get page structure
    const bodyHTML = await page.evaluate(() => {
      const html = document.body.innerHTML;
      return html.substring(0, 500);
    });
    console.log('\nFirst 500 chars of body HTML:');
    console.log(bodyHTML);

    // Check computed styles
    const styles = await page.evaluate(() => {
      const container = document.querySelector('[class*="h-\\[800vh\\]"]') || document.body;
      const computedStyle = window.getComputedStyle(container);
      return {
        backgroundColor: computedStyle.backgroundColor,
        color: computedStyle.color,
        display: computedStyle.display,
        height: container.style.height || 'not set',
      };
    });
    console.log('\nComputed styles:', styles);

    // Get all divs with their height
    const divs = await page.evaluate(() => {
      const allDivs = document.querySelectorAll('div');
      return Array.from(allDivs).slice(0, 10).map(div => ({
        classes: div.className,
        textContent: div.textContent.substring(0, 100),
        style: div.getAttribute('style'),
      }));
    });
    console.log('\nFirst 10 divs:', JSON.stringify(divs, null, 2));

    // Check if content is actually rendering
    const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight);
    const bodyHeight = await page.evaluate(() => document.body.scrollHeight);
    const documentHeight = await page.evaluate(() => document.documentElement.offsetHeight);

    console.log(`\nPage height measurements:`);
    console.log(`  scrollHeight: ${pageHeight}px`);
    console.log(`  body.scrollHeight: ${bodyHeight}px`);
    console.log(`  documentElement.offsetHeight: ${documentHeight}px`);

    // Check viewport fill
    const isPageFillingViewport = await page.evaluate(() => {
      const fixed = document.querySelector('[class*="fixed"]');
      if (!fixed) return 'No fixed element found';
      const rect = fixed.getBoundingClientRect();
      return {
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      };
    });
    console.log('\nFixed element position:', isPageFillingViewport);

    // Check CSS variables
    const cssVars = await page.evaluate(() => {
      const style = getComputedStyle(document.documentElement);
      return {
        canvas: style.getPropertyValue('--color-canvas'),
        textPrimary: style.getPropertyValue('--color-text-primary'),
        amber: style.getPropertyValue('--color-amber'),
      };
    });
    console.log('\nCSS Variables:', cssVars);

  } catch (error) {
    console.error('Error during debug:', error);
  } finally {
    await browser.close();
  }
}

runDebugAudit();
