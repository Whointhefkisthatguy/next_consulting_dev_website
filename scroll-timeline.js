const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const screenshotDir = '/tmp/site-audit';

async function analyzeScrollTimeline() {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 }
  });

  try {
    console.log('Opening http://localhost:3004...');
    await page.goto('http://localhost:3004', { waitUntil: 'networkidle' });

    const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight);
    console.log(`Total page height: ${pageHeight}px\n`);

    // Define test positions
    const testPositions = [
      { label: 'Initial (0%)', percent: 0 },
      { label: 'Monogram fade-in target (2%)', percent: 0.02 },
      { label: 'Monogram visible (12%)', percent: 0.12 },
      { label: 'Monogram fade-out (17%)', percent: 0.17 },
      { label: 'Quote fade-in (18%)', percent: 0.18 },
      { label: 'Quote visible (27%)', percent: 0.27 },
      { label: 'H1 fade-in (34%)', percent: 0.34 },
      { label: 'H1 visible (42%)', percent: 0.42 },
      { label: 'Truth 1 visible (48%)', percent: 0.48 },
      { label: 'Truth 2 visible (61%)', percent: 0.61 },
      { label: 'Truth 3 visible (74%)', percent: 0.74 },
      { label: 'Inquiry visible (88%)', percent: 0.88 },
    ];

    for (const pos of testPositions) {
      const scrollY = pageHeight * pos.percent;
      await page.evaluate(px => window.scrollTo(0, px), scrollY);
      await page.waitForTimeout(400);

      const layerInfo = await page.evaluate(() => {
        const layers = document.querySelectorAll('[class*="fixed"][class*="inset-0"][class*="z-20"]');
        return Array.from(layers).map((layer) => {
          const computed = getComputedStyle(layer);
          const text = layer.querySelector('p, h1, blockquote, a')?.textContent || '';
          return {
            opacity: parseFloat(computed.opacity),
            text: text.substring(0, 40),
          };
        });
      });

      console.log(`${pos.label} (scroll: ${scrollY}px):`);
      layerInfo.forEach((info, idx) => {
        if (info.opacity > 0.1) {
          console.log(`  Layer ${idx}: opacity=${info.opacity.toFixed(2)} text="${info.text}"`);
        }
      });
      console.log('');
    }

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
}

analyzeScrollTimeline();
