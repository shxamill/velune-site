const puppeteer = require('puppeteer');
const path = require('path');

async function checkOverlap() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  const fileUrl = 'file://' + path.resolve('hero.html');
  await page.goto(fileUrl);
  
  await new Promise(r => setTimeout(r, 2000));
  
  const textBounds = await page.evaluate(() => {
    const el = document.getElementById('center-statement-block');
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    return { top: rect.top, bottom: rect.bottom, height: rect.height, text: el.innerText.substring(0, 50) };
  });

  const focalBounds = await page.evaluate(() => {
    const el = document.getElementById('focal-card-inner');
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    return { top: rect.top, bottom: rect.bottom, height: rect.height };
  });

  console.log("Stitch Text bounds:", textBounds);
  console.log("Stitch Focal bounds:", focalBounds);
  
  if (textBounds && focalBounds) {
    const overlap = textBounds.bottom - focalBounds.top;
    console.log("Overlap in Stitch:", overlap);
  }
  
  await browser.close();
}

checkOverlap().catch(console.error);
