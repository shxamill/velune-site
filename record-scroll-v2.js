const puppeteer = require('puppeteer-core');
const { PuppeteerScreenRecorder } = require('puppeteer-screen-recorder');

async function run() {
  const browser = await puppeteer.launch({
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    headless: "new"
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  
  await new Promise(r => setTimeout(r, 2000));

  const recorder = new PuppeteerScreenRecorder(page, {
    fps: 30,
    videoFrame: { width: 1440, height: 900 }
  });

  await recorder.start('./hero-animation-v2.mp4');
  
  const maxScroll = await page.evaluate(() => document.documentElement.scrollHeight - window.innerHeight);
  
  // Smooth scroll
  const steps = 60;
  for (let i = 0; i <= steps; i++) {
    const y = (maxScroll * i) / steps;
    await page.evaluate((pos) => window.scrollTo(0, pos), y);
    await new Promise(r => setTimeout(r, 50));
  }
  
  // Wait at the end
  await new Promise(r => setTimeout(r, 1000));

  await recorder.stop();
  console.log("Recorded hero-animation-v2.mp4");

  await browser.close();
}

run().catch(console.error);
