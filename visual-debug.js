const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const screenshotDir = '/tmp/site-audit';

async function runVisualDebug() {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 }
  });

  try {
    console.log('Opening http://localhost:3004...');
    await page.goto('http://localhost:3004', { waitUntil: 'networkidle' });

    // Inject some diagnostic elements to understand visibility
    await page.evaluate(() => {
      const html = document.documentElement;
      const body = document.body;
      const fixedCanvas = document.querySelector('[class*="fixed"][class*="inset-0"]');

      console.log('=== DOM Structure ===');
      console.log('HTML tag:', {
        display: getComputedStyle(html).display,
        backgroundColor: getComputedStyle(html).backgroundColor,
      });

      console.log('BODY tag:', {
        display: getComputedStyle(body).display,
        backgroundColor: getComputedStyle(body).backgroundColor,
        color: getComputedStyle(body).color,
        height: body.style.height || 'auto',
      });

      if (fixedCanvas) {
        const rect = fixedCanvas.getBoundingClientRect();
        const computed = getComputedStyle(fixedCanvas);
        console.log('Fixed canvas:', {
          position: computed.position,
          inset: 'top=' + computed.top + ' right=' + computed.right + ' bottom=' + computed.bottom + ' left=' + computed.left,
          zIndex: computed.zIndex,
          backgroundColor: computed.backgroundColor,
          width: rect.width,
          height: rect.height,
          display: computed.display,
        });
      }

      // Check all Layer elements
      const layers = document.querySelectorAll('[class*="fixed"][class*="inset-0"][class*="z-20"]');
      console.log(`Found ${layers.length} layer elements`);

      if (layers.length > 0) {
        const firstLayer = layers[0];
        const rect = firstLayer.getBoundingClientRect();
        const computed = getComputedStyle(firstLayer);
        console.log('First layer:', {
          opacity: computed.opacity,
          transform: computed.transform,
          textContent: firstLayer.textContent.substring(0, 50),
          height: rect.height,
          width: rect.width,
        });
      }
    });

    // Take screenshot at top
    console.log('\nTaking screenshot at scroll 0...');
    await page.screenshot({ path: path.join(screenshotDir, 'debug-00-initial.png'), fullPage: false });

    // Scroll to 5% and check visibility
    const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight);
    await page.evaluate(px => window.scrollTo(0, px), pageHeight * 0.05);
    await page.waitForTimeout(300);

    const scrollInfo = await page.evaluate(() => {
      const layers = document.querySelectorAll('[class*="fixed"][class*="inset-0"][class*="z-20"]');
      const visibleLayers = Array.from(layers).map((layer, idx) => {
        const computed = getComputedStyle(layer);
        return {
          index: idx,
          opacity: computed.opacity,
          display: computed.display,
          textContent: layer.textContent.substring(0, 50),
        };
      });
      return { visibleLayers, scrollPercent: (window.scrollY / document.documentElement.scrollHeight) };
    });

    console.log('\nAt 5% scroll:', JSON.stringify(scrollInfo, null, 2));
    console.log('Taking screenshot at 5% scroll...');
    await page.screenshot({ path: path.join(screenshotDir, 'debug-05-scroll.png'), fullPage: false });

  } catch (error) {
    console.error('Error during visual debug:', error);
  } finally {
    await browser.close();
  }
}

runVisualDebug();
