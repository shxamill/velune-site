const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  
  await new Promise(r => setTimeout(r, 4000));
  
  const el = (await page.$$('.media-wrapper'))[1];
  await page.evaluate(el => el.scrollIntoView({ behavior: 'instant', block: 'center' }), el);
  await new Promise(r => setTimeout(r, 2000));
  
  const y1 = await page.evaluate(() => window.scrollY);
  const t1 = await page.evaluate(el => window.getComputedStyle(el).transform, el);
  
  await page.mouse.wheel({ deltaY: 500 });
  await new Promise(r => setTimeout(r, 2000));
  
  const y2 = await page.evaluate(() => window.scrollY);
  const t2 = await page.evaluate(el => window.getComputedStyle(el).transform, el);
  
  console.log(`Scroll: ${y1} -> ${y2}`);
  console.log(`Transform: ${t1} -> ${t2}`);

  await browser.close();
})();
