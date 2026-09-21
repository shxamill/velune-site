const puppeteer = require('puppeteer');

async function checkOverlap() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000');
  
  // Wait for load
  await new Promise(r => setTimeout(r, 2000));
  
  const textBounds = await page.evaluate(() => {
    const el = document.querySelector('.max-w-2xl');
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    return { top: rect.top, bottom: rect.bottom, height: rect.height, text: el.innerText.substring(0, 50) };
  });

  const focalBounds = await page.evaluate(() => {
    const el = document.querySelector('.aspect-\\[3\\/4\\]').parentElement;
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    return { top: rect.top, bottom: rect.bottom, height: rect.height };
  });

  console.log("Text bounds:", textBounds);
  console.log("Focal bounds:", focalBounds);
  
  if (textBounds && focalBounds) {
    const overlap = textBounds.bottom - focalBounds.top;
    console.log("Overlap (positive means text bottom is BELOW focal top):", overlap);
  }
  
  await browser.close();
}

checkOverlap().catch(console.error);
