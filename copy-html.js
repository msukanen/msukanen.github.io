const fs = require('fs');
const path = require('path');

const sourceDir = '.';
const destDir = path.join(__dirname, '.dist');

if (!fs.existsSync(destDir)) {
  throw new Error('Please run `npm run build` before running this script');
}

fs.readdir(sourceDir, (err, files) => {
  if (err) {
    throw err;
  }

  files.forEach(file => {
    const fp = path.join(sourceDir, file);
    if (fs.statSync(fp).isFile() && path.extname(fp) === '.html' && file !== 'index.html') {
      fs.copyFile(path.join(sourceDir, file), path.join(destDir, file), err => {
        if (err) {
          throw err;
        }
      });
    }});
});
