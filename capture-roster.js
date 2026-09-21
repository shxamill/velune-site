/**
 * capture-works.js — Phase 6.1 QA captures
 * Uses Chrome DevTools to screenshot the Selected Works section at 3 viewports.
 * waitUntil: 'domcontentloaded' + short fixed delay to avoid video-stream hangs.
 */
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const OUT_DIR = path.join(__dirname, 'qa_captures_roster');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet',  width: 1280, height: 800 },
  { name: 'mobile',  width: 390,  height: 844 },
];

async function capture() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  for (const vp of VIEWPORTS) {
    console.log(`Starting ${vp.name}...`);
    const page = await browser.newPage();
    await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 1 });

    await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded', timeout: 20000 });
    await new Promise(r => setTimeout(r, 1000));

    // Scroll to the Selected Works section
    await page.evaluate(() => {
      const sections = document.querySelectorAll('main > section');
      if (sections.length >= 2) {
        sections[sections.length - 1].scrollIntoView({ behavior: 'instant' });
      } else {
        window.scrollBy(0, window.innerHeight * 3);
      }
    });
    await new Promise(r => setTimeout(r, 400));

    // Screenshot the last section element
    const el = await page.$('main > section:last-of-type');
    const outPath = path.join(OUT_DIR, `roster-${vp.name}.png`);
    if (el) {
      await el.screenshot({ path: outPath });
    } else {
      await page.screenshot({ path: outPath, fullPage: true });
    }
    console.log(`Captured roster-${vp.name}.png`);
    await page.close();
  }

  await browser.close();
}

capture().catch(e => { console.error(e); process.exit(1); });


