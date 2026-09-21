const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
  
  // wait for react and gsap
  await new Promise(r => setTimeout(r, 6000));
  
  const results = await page.evaluate(async () => {
      const res = [];
      const wrappers = document.querySelectorAll('.media-wrapper');
      
      // We will test 3 wrappers with non-zero data-speed
      const toTest = [wrappers[1], wrappers[2], wrappers[3]];
      
      for (const el of toTest) {
          const speed = el.getAttribute('data-speed');
          el.scrollIntoView({ behavior: 'instant', block: 'end' });
          await new Promise(r => setTimeout(r, 2000)); // wait for scrub 1 to settle
          
          const t1 = window.getComputedStyle(el).transform;
          
          // Scroll natively using window.scrollBy
          window.scrollBy({ top: 300, behavior: 'instant' });
          await new Promise(r => setTimeout(r, 2000));
          
          const t2 = window.getComputedStyle(el).transform;
          
          res.push(`Element (speed: ${speed}): Transform ${t1} -> ${t2}`);
      }
      
      return res;
  });
  
  console.log(results.join('\n'));

  await browser.close();
})();
