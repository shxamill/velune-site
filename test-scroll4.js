const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
  
  await new Promise(r => setTimeout(r, 6000));
  
  const results = await page.evaluate(async () => {
      // scroll to center
      const el = document.querySelectorAll('.media-wrapper')[1];
      el.scrollIntoView({ behavior: 'instant', block: 'center' });
      
      // wait a bit
      await new Promise(r => setTimeout(r, 1000));
      
      const st = window.ScrollTrigger ? ScrollTrigger.getAll().find(st => st.trigger === el) : null;
      const res = [];
      res.push('Start progress: ' + (st ? st.progress : 'no ST'));
      res.push('Start transform: ' + window.getComputedStyle(el).transform);
      
      window.scrollBy(0, 100);
      await new Promise(r => setTimeout(r, 1500));
      
      res.push('End progress: ' + (st ? st.progress : 'no ST'));
      res.push('End transform: ' + window.getComputedStyle(el).transform);
      return res;
  });
  
  console.log(results.join('\n'));

  await browser.close();
})();
