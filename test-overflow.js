const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  
  const buttons = await page.$$('button');
  let menuBtn;
  for (const btn of buttons) {
    const text = await page.evaluate(el => el.textContent, btn);
    if (text && text.includes('MENU')) {
      menuBtn = btn;
      break;
    }
  }

  await menuBtn.click();
  await new Promise(r => setTimeout(r, 1000));
  
  const overflow = await page.evaluate(() => document.body.style.overflow);
  console.log('Overflow:', overflow);

  await browser.close();
})();
