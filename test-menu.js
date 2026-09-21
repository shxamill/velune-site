const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });

  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Find menu button
  const buttons = await page.$$('button');
  let menuBtn;
  for (const btn of buttons) {
    const text = await page.evaluate(el => el.textContent, btn);
    if (text && text.includes('MENU')) {
      menuBtn = btn;
      break;
    }
  }

  if (!menuBtn) {
    console.log('FAIL: Menu button not found');
    process.exit(1);
  }

  // Click menu to open
  await page.evaluate(el => el.click(), menuBtn);
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Verify body overflow is hidden
  const isHidden = await page.evaluate(() => document.body.style.overflow === 'hidden');
  if (!isHidden) {
    console.log('FAIL: Body scroll not hidden');
    process.exit(1);
  }

  // Click close button
  await page.evaluate(el => el.click(), menuBtn);
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Verify body overflow is restored
  const isRestored = await page.evaluate(() => document.body.style.overflow === '');
  if (!isRestored) {
    console.log('FAIL: Body scroll not restored');
    process.exit(1);
  }

  // Click menu to open again
  await page.evaluate(el => el.click(), menuBtn);
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Press Escape
  await page.keyboard.press('Escape');
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Verify it closed
  const isEscaped = await page.evaluate(() => document.body.style.overflow === '');
  if (!isEscaped) {
    console.log('FAIL: Escape did not close menu');
    process.exit(1);
  }

  // Check clicks on links
  // Open menu again
  await page.evaluate(el => el.click(), menuBtn);
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const links = await page.$$('a');
  let worksLink;
  for (const link of links) {
    const text = await page.evaluate(el => el.textContent, link);
    if (text && text.includes('WORKS')) {
      worksLink = link;
      break;
    }
  }

  if (worksLink) {
    await page.evaluate(el => el.click(), worksLink);
    await new Promise(resolve => setTimeout(resolve, 1500));
    // Verify it closed
    const linkClosed = await page.evaluate(() => document.body.style.overflow === '');
    if (!linkClosed) {
       console.log('FAIL: Clicking link did not close menu');
       process.exit(1);
    }
  }

  if (errors.length > 0) {
    console.log('FAIL: Console errors found');
    console.log(errors);
    process.exit(1);
  }

  console.log('PASS');
  await browser.close();
})();
