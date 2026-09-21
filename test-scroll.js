const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  
  // Wait for GSAP and initial load
  await new Promise(r => setTimeout(r, 4000));
  
  // Find media wrappers
  const wrappers = await page.$$('.media-wrapper');
  console.log(`Found ${wrappers.length} media wrappers`);
  
  // Let's test scroll response of the first few
  for (let i = 0; i < 5; i++) {
    const el = wrappers[i];
    const dataSpeed = await page.evaluate(el => el.getAttribute('data-speed'), el);
    console.log(`\nTesting Wrapper ${i + 1} (data-speed: ${dataSpeed})`);
    
    // Scroll element into view
    await page.evaluate(el => el.scrollIntoView({ behavior: 'instant', block: 'center' }), el);
    
    // Wait for scroll scrub to catch up
    await new Promise(r => setTimeout(r, 1000));
    
    const transform1 = await page.evaluate(el => window.getComputedStyle(el).transform, el);
    
    // Scroll down 200px
    await page.evaluate(() => window.scrollBy(0, 200));
    await new Promise(r => setTimeout(r, 1500)); // Wait for scrub (scrub: 1 adds 1s lag)
    
    const transform2 = await page.evaluate(el => window.getComputedStyle(el).transform, el);
    
    console.log(`Transform 1: ${transform1}`);
    console.log(`Transform 2: ${transform2}`);
    
    if (dataSpeed !== '0' && transform1 !== transform2) {
      console.log('=> Element moved on scroll! PASS');
    } else if (dataSpeed === '0') {
      console.log('=> Speed is 0, no movement expected. PASS');
    } else {
      console.log('=> FAIL: Element did not move.');
    }
  }

  await browser.close();
})();
