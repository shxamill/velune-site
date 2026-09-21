const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const viewports = [
    { name: 'desktop', width: 1440, height: 900 },
    { name: 'tablet', width: 1280, height: 800 },
    { name: 'mobile', width: 390, height: 844 },
  ];
  
  if (!fs.existsSync('qa_captures_full')) {
    fs.mkdirSync('qa_captures_full');
  }

  const page = await browser.newPage();
  
  // Collect console errors
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });

  for (const vp of viewports) {
    console.log(`Starting ${vp.name}...`);
    await page.setViewport({ width: vp.width, height: vp.height });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
    
    // Wait for videos to load
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Scroll down the page slowly to trigger GSAP animations
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let totalHeight = 0;
        const distance = 500;
        let count = 0;
        const timer = setInterval(() => {
          const scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;
          count++;

          // hard stop after 50 scrolls (~25000px) or bottom of page
          if (totalHeight >= scrollHeight - window.innerHeight || count > 50) {
            clearInterval(timer);
            resolve();
          }
        }, 100);
      });
    });
    
    // Wait for animations to settle
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    await page.screenshot({ path: `qa_captures_full/full-${vp.name}.png`, fullPage: true });
    console.log(`Captured full-${vp.name}.png`);
  }
  
  if (errors.length > 0) {
    console.log('CONSOLE ERRORS FOUND:');
    console.log(errors.join('\n'));
  } else {
    console.log('No console errors found.');
  }

  await browser.close();
})();
