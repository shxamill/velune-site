const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
  
  await new Promise(r => setTimeout(r, 6000));
  
  const results = await page.evaluate(async () => {
      const res = [];
      const articles = document.querySelectorAll('article');
      const clients = ['Kinjal', 'Lakshi', 'Yash', 'Stilat', 'PL Edits'];
      
      for (let i = 0; i < articles.length; i++) {
          const article = articles[i];
          const el = article.querySelector('.media-wrapper');
          if (!el) continue;
          const speed = el.getAttribute('data-speed');
          
          el.scrollIntoView({ behavior: 'instant', block: 'center' });
          await new Promise(r => setTimeout(r, 1500));
          
          const t1 = window.getComputedStyle(el).transform;
          
          const scrollInterval = setInterval(() => {
              // Scroll UP to guarantee we don't hit the bottom of the document
              window.scrollBy({ top: -50, behavior: 'instant' });
          }, 50);
          
          await new Promise(r => setTimeout(r, 400));
          
          const t2 = window.getComputedStyle(el).transform;
          
          clearInterval(scrollInterval);
          
          await new Promise(r => setTimeout(r, 1500)); 
          
          const t3 = window.getComputedStyle(el).transform;
          
          res.push(`${clients[i]} (speed: ${speed}):`);
          res.push(`  before = ${t1}`);
          res.push(`  during = ${t2}`);
          res.push(`  after  = ${t3}`);
      }
      
      return res;
  });
  
  console.log(results.join('\n'));
  await browser.close();
})();
