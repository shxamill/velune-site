const puppeteer = require('puppeteer-core');

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
    
    // Scroll to the absolute bottom of the page
    const maxScroll = await page.evaluate(() => document.documentElement.scrollHeight - window.innerHeight);
    await page.evaluate((y) => window.scrollTo(0, y), maxScroll);
    await new Promise(r => setTimeout(r, 1000));
    
    await page.screenshot({ path: `manifesto-${vp.name}.png` });
    console.log(`Captured manifesto-${vp.name}.png`);
  }

  await browser.close();
}

run().catch(console.error);
