const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  
  await page.evaluate(() => { document.body.style.overflow = 'hidden'; });
  const overflow = await page.evaluate(() => document.body.style.overflow);
  console.log('Overflow:', overflow);

  await browser.close();
})();
