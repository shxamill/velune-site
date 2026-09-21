const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const viewports = [
    { name: 'desktop', width: 1440, height: 900 },
    { name: 'mobile', width: 390, height: 844 },
  ];
  
  if (!fs.existsSync('qa_captures_menu')) {
    fs.mkdirSync('qa_captures_menu');
  }

  const page = await browser.newPage();
  
  for (const vp of viewports) {
    console.log(`Starting ${vp.name}...`);
    await page.setViewport({ width: vp.width, height: vp.height });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
    
    // Wait a bit
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Click MENU
    const buttons = await page.$$('button');
    let menuBtn;
    for (const btn of buttons) {
      const text = await page.evaluate(el => el.textContent, btn);
      if (text && text.includes('MENU')) {
        menuBtn = btn;
        break;
      }
    }
    
    if (menuBtn) {
      await menuBtn.click();
      await new Promise(resolve => setTimeout(resolve, 1500)); // wait for GSAP to finish
      await page.screenshot({ path: `qa_captures_menu/menu-${vp.name}.png` });
      console.log(`Captured menu-${vp.name}.png`);
    } else {
      console.log('Menu button not found!');
    }
  }

  await browser.close();
})();
