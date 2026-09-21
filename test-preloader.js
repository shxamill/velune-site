const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
  
  // Immediately check if preloader is visible
  const preloaderVisible = await page.evaluate(() => {
    const el = document.querySelector('.z-\\[100\\]');
    if (!el) return false;
    return window.getComputedStyle(el).display !== 'none' && window.getComputedStyle(el).opacity !== '0';
  });
  
  console.log('Preloader initially visible:', preloaderVisible);
  
  // Wait until it disappears
  await page.waitForFunction(() => {
    const el = document.querySelector('.z-\\[100\\]');
    if (!el) return true;
    return window.getComputedStyle(el).display === 'none' || window.getComputedStyle(el).opacity === '0';
  }, { timeout: 10000 });
  
  console.log('Preloader dismissed successfully');
  
  const focalVideoReady = await page.evaluate(() => {
    const vid = document.getElementById('hero-focal-video');
    return vid && vid.readyState >= 1;
  });
  
  console.log('Hero focal video readyState >= 1:', focalVideoReady);

  await browser.close();
})();
