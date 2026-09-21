const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
  
  await new Promise(r => setTimeout(r, 6000));
  
  const results = await page.evaluate(async () => {
      const res = [];
      const wrappers = document.querySelectorAll('.media-wrapper');
      
      const toTest = [wrappers[1], wrappers[3], wrappers[5], wrappers[7], wrappers[12]].filter(Boolean);
      
      for (let i = 0; i < toTest.length; i++) {
          const el = toTest[i];
          const speed = el.getAttribute('data-speed');
          
          el.scrollIntoView({ behavior: 'instant', block: 'end' });
          await new Promise(r => setTimeout(r, 1500));
          
          const t1 = window.getComputedStyle(el).transform;
          
          // Scroll natively using window.scrollBy repeatedly to simulate continuous scroll
          const scrollInterval = setInterval(() => {
              window.scrollBy({ top: 50, behavior: 'instant' });
          }, 50);
          
          await new Promise(r => setTimeout(r, 400));
          
          const t2 = window.getComputedStyle(el).transform;
          
          clearInterval(scrollInterval);
          
          await new Promise(r => setTimeout(r, 1500)); // wait for proxy to decay to 0
          
          const t3 = window.getComputedStyle(el).transform;
          
          res.push(`media-0${i+1} (speed: ${speed}):`);
          res.push(`  before = ${t1}`);
          res.push(`  during = ${t2}`);
          res.push(`  after  = ${t3}`);
      }
      
      return res;
  });
  
  console.log(results.join('\n'));

  await browser.close();
})();
