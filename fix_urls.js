const fs = require('fs');
const path = require('path');
const d = path.join(__dirname, 'frontend', 'src', 'pages');
const files = fs.readdirSync(d).filter(f => f.endsWith('.jsx'));
files.forEach(f => {
  const p = path.join(d, f);
  const c = fs.readFileSync(p, 'utf8');
  const replaced = c.replace(/\\\${/g, '${');
  fs.writeFileSync(p, replaced);
});
console.log('Fixed interpolation!');
