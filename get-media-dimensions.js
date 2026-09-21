/**
 * get-media-dimensions.js
 * Reads actual intrinsic dimensions from every Selected Works asset.
 * Uses sharp for images and fluent-ffmpeg/ffprobe for videos.
 */

const path = require('path');
const { execSync } = require('child_process');
const fs = require('fs');

const ASSETS_ROOT = 'C:\\Personal\\potfo_assets';

const CLIENTS = [
  { client: 'Kinjal Mehtha',   dir: 'KInjal Mehtha' },
  { client: 'Lakshi Lingaraju', dir: 'Lakshi Lingaraju' },
  { client: 'Yash Jain',       dir: 'Yash Jain' },
  { client: 'Stilat',          dir: 'Stilat' },
  { client: 'PL Edits',        dir: 'PL Edit' },
];

const IMAGE_EXTS  = ['.jpg', '.jpeg', '.png', '.webp'];
const VIDEO_EXTS  = ['.mp4', '.mov'];

function getImageDimensions(filePath) {
  // Use Python Pillow — always available
  const escaped = filePath.replace(/\\/g, '\\\\');
  const result = execSync(
    `python -c "from PIL import Image; img=Image.open('${escaped}'); print(img.width, img.height)"`,
    { encoding: 'utf-8' }
  ).trim();
  const [w, h] = result.split(' ').map(Number);
  return { width: w, height: h };
}

function getVideoDimensions(filePath) {
  // Use ffprobe
  const escaped = JSON.stringify(filePath);
  try {
    const result = execSync(
      `ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=p=0 ${escaped}`,
      { encoding: 'utf-8' }
    ).trim();
    const [w, h] = result.split(',').map(Number);
    return { width: w, height: h };
  } catch {
    return { width: null, height: null };
  }
}

const manifest = [];

for (const { client, dir } of CLIENTS) {
  const clientDir = path.join(ASSETS_ROOT, dir);
  const files = fs.readdirSync(clientDir);

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    const fullPath = path.join(clientDir, file);
    const publicPath = `/media/work/${dir.toLowerCase().replace(/\s+/g, '-')}/${file}`;

    let type, dims;
    if (IMAGE_EXTS.includes(ext)) {
      type = 'image';
      dims = getImageDimensions(fullPath);
    } else if (VIDEO_EXTS.includes(ext)) {
      type = 'video';
      dims = getVideoDimensions(fullPath);
    } else {
      continue;
    }

    const ar = dims.width && dims.height
      ? (dims.width / dims.height).toFixed(3)
      : '?';

    const orientation = dims.width && dims.height
      ? (dims.width > dims.height ? 'landscape' : dims.width < dims.height ? 'portrait' : 'square')
      : '?';

    manifest.push({
      client,
      file,
      type,
      width: dims.width,
      height: dims.height,
      aspectRatio: ar,
      orientation,
      publicPath,
    });
  }
}

console.log('\n=== VELUNE MEDIA MANIFEST ===\n');
for (const m of manifest) {
  console.log(`${m.client} | ${m.file} | ${m.type} | ${m.width}×${m.height} | AR ${m.aspectRatio} | ${m.orientation}`);
  console.log(`  -> ${m.publicPath}`);
}

// Also write as JSON for use in component
fs.writeFileSync('media-manifest.json', JSON.stringify(manifest, null, 2), 'utf-8');
console.log('\nWritten: media-manifest.json');
