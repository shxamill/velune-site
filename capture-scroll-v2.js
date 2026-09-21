const puppeteer = require('puppeteer-core');
const fs = require('fs');

async function run() {
  const browser = await puppeteer.launch({
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    headless: "new",
    defaultViewport: null
  });

  const viewports = [
    { name: 'desktop', width: 1440, height: 900 },
    { name: 'tablet', width: 1280, height: 800 },
    { name: 'mobile', width: 390, height: 844 }
  ];

  const page = await browser.newPage();
  
  for (const vp of viewports) {
    await page.setViewport(vp);
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
    
    // Wait for GSAP and animations
    await new Promise(r => setTimeout(r, 2000));
    
    const maxScroll = await page.evaluate(() => document.documentElement.scrollHeight - window.innerHeight);
    
    const percentages = [0, 25, 50, 75, 100];
    
    for (const pct of percentages) {
      const scrollPos = (maxScroll * (pct / 100));
      await page.evaluate((y) => window.scrollTo(0, y), scrollPos);
      await new Promise(r => setTimeout(r, 500)); // wait for ScrollTrigger to catch up
      
      await page.screenshot({ path: `hero-${vp.name}-${pct}pct.png` });
      console.log(`Captured hero-${vp.name}-${pct}pct.png`);
    }
  }

  await browser.close();
}

run().catch(console.error);
