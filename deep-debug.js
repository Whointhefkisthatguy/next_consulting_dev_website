const { chromium } = require('playwright');

async function deepDebug() {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 }
  });

  try {
    console.log('Opening http://localhost:3004...');
    await page.goto('http://localhost:3004', { waitUntil: 'networkidle' });

    // Find the monogram SVG
    const svg = await page.evaluate(() => {
      const svgElement = document.querySelector('svg[role="img"]');
      if (!svgElement) return 'SVG not found';

      const rect = svgElement.getBoundingClientRect();
      const computed = getComputedStyle(svgElement);
      const parentComputed = getComputedStyle(svgElement.parentElement);

      return {
        found: true,
        svg: {
          width: svgElement.getAttribute('width'),
          height: svgElement.getAttribute('height'),
          viewBox: svgElement.getAttribute('viewBox'),
          fill: svgElement.getAttribute('fill'),
          computedColor: computed.color,
          computedFill: computed.fill,
          className: svgElement.getAttribute('class'),
          computedDisplay: computed.display,
          computedVisibility: computed.visibility,
          opacity: computed.opacity,
        },
        rect: {
          width: rect.width,
          height: rect.height,
          top: rect.top,
          left: rect.left,
          visibility: rect.height > 0 ? 'has dimensions' : 'zero dimensions',
        },
        parentClass: svgElement.parentElement?.className,
        parentComputed: {
          color: parentComputed.color,
          display: parentComputed.display,
        },
      };
    });

    console.log('SVG Analysis:', JSON.stringify(svg, null, 2));

    // Check the text elements in the first visible layer
    const firstLayer = await page.evaluate(() => {
      const layer = document.querySelector('[class*="fixed"][class*="inset-0"][class*="z-20"]');
      if (!layer) return 'No layer found';

      const computed = getComputedStyle(layer);
      const textElements = layer.querySelectorAll('p, span, h1, blockquote, div');

      return {
        layerOpacity: computed.opacity,
        layerDisplay: computed.display,
        layerColor: computed.color,
        textElementsCount: textElements.length,
        firstTextElement: textElements[0] ? {
          tag: textElements[0].tagName,
          class: textElements[0].className,
          text: textElements[0].textContent.substring(0, 50),
          computedColor: getComputedStyle(textElements[0]).color,
          computedOpacity: getComputedStyle(textElements[0]).opacity,
          computedDisplay: getComputedStyle(textElements[0]).display,
        } : null,
      };
    });

    console.log('\nFirst layer text analysis:', JSON.stringify(firstLayer, null, 2));

    // Check actual rendered colors
    const colors = await page.evaluate(() => {
      const styles = document.createElement('div');
      styles.className = 'text-amber';
      document.body.appendChild(styles);
      const computed = getComputedStyle(styles);
      document.body.removeChild(styles);

      return {
        textAmber: computed.color,
        htmlBG: getComputedStyle(document.documentElement).backgroundColor,
        bodyBG: getComputedStyle(document.body).backgroundColor,
        bodyColor: getComputedStyle(document.body).color,
      };
    });

    console.log('\nColor check:', JSON.stringify(colors, null, 2));

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
}

deepDebug();
