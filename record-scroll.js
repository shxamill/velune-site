const puppeteer = require('puppeteer');
const { PuppeteerScreenRecorder } = require('puppeteer-screen-recorder');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  
  await new Promise(r => setTimeout(r, 2000));
  
  const recorder = new PuppeteerScreenRecorder(page, {
    fps: 30,
    videoFrame: {
      width: 1440,
      height: 900,
    },
    videoCrf: 18,
    videoCodec: 'libx264',
    videoPreset: 'ultrafast',
    videoBitrate: 2000,
    autopad: {
      color: 'black'
    }
  });

  await recorder.start('hero-animation.mp4');
  
  const scrollHeight = await page.evaluate(() => document.body.scrollHeight - window.innerHeight);
  
  // Smooth scroll down
  const steps = 60;
  for (let i = 0; i <= steps; i++) {
    await page.evaluate((y) => window.scrollTo(0, y), (scrollHeight * i) / steps);
    await new Promise(r => setTimeout(r, 50));
  }
  
  await new Promise(r => setTimeout(r, 1000));
  
  await recorder.stop();
  await browser.close();
  
  console.log('Recorded hero-animation.mp4');
})();
