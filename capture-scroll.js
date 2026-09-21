const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  
  const viewports = [
    { width: 1440, height: 900, name: 'desktop' },
    { width: 1280, height: 800, name: 'tablet' },
    { width: 390, height: 844, name: 'mobile' },
  ];
  
  for (const vp of viewports) {
    const page = await browser.newPage();
    await page.setViewport({ width: vp.width, height: vp.height });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
    
    // Wait for GSAP ScrollTrigger to initialize
    await new Promise(r => setTimeout(r, 2000));
    
    const scrollHeight = await page.evaluate(() => document.body.scrollHeight - window.innerHeight);
    
    const milestones = [
      { name: 'A-Initial', pct: 0 },
      { name: 'B-25pct', pct: 0.25 },
      { name: 'C-50pct', pct: 0.50 },
      { name: 'D-75pct', pct: 0.75 },
      { name: 'E-End', pct: 1.0 },
    ];
    
    for (const ms of milestones) {
      await page.evaluate((targetY) => {
        window.scrollTo(0, targetY);
      }, scrollHeight * ms.pct);
      
      // Wait for scrubbing animation to settle
      await new Promise(r => setTimeout(r, 1000));
      
      await page.screenshot({ path: `hero-${vp.name}-${ms.name}.png` });
      console.log(`Captured hero-${vp.name}-${ms.name}.png`);
    }
    
    await page.close();
  }
  
  await browser.close();
})();
