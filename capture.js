const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  const viewports = [
    { width: 1440, height: 900, name: 'hero-initial-desktop.png' },
    { width: 1280, height: 800, name: 'hero-initial-tablet.png' },
    { width: 390, height: 844, name: 'hero-initial-mobile.png' },
  ];
  
  for (const vp of viewports) {
    await page.setViewport({ width: vp.width, height: vp.height });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
    await page.screenshot({ path: vp.name, fullPage: true });
    console.log(`Captured ${vp.name}`);
  }
  
  await browser.close();
})();
