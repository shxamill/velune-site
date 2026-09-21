const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const sizeOf = require('image-size');

const directory = 'C:\\Personal\\potfo_assets';
const files = [];

function scanDir(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            scanDir(fullPath);
        } else {
            files.push(fullPath);
        }
    }
}

scanDir(directory);

const results = [];
for (const file of files) {
    if (file.includes('logo.jpeg')) continue;
    const ext = path.extname(file).toLowerCase();
    const isVideo = ext === '.mp4' || ext === '.mov';
    const isImage = ext === '.jpeg' || ext === '.jpg' || ext === '.png';
    
    if (isVideo) {
        try {
            const out = execSync(`ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=s=x:p=0 "${file}"`);
            const [w, h] = out.toString().trim().split('x');
            results.push({ file: file.replace(directory + '\\', ''), type: 'video', width: parseInt(w), height: parseInt(h), ratio: (parseInt(w)/parseInt(h)).toFixed(2) });
        } catch(e) {
            console.error('ffprobe failed for', file);
        }
    } else if (isImage) {
        try {
            const dim = sizeOf(file);
            let w = dim.width;
            let h = dim.height;
            if (dim.orientation >= 5) {
                w = dim.height;
                h = dim.width;
            }
            results.push({ file: file.replace(directory + '\\', ''), type: 'image', width: w, height: h, ratio: (w/h).toFixed(2) });
        } catch(e) {
            console.error('image-size failed for', file);
        }
    }
}

console.log(JSON.stringify(results, null, 2));
