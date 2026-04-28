const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'frontend', 'src', 'pages');

const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
    const filePath = path.join(pagesDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace 'http://localhost:5000/api/...' -> `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/...`
    content = content.replace(/'http:\/\/localhost:5000(\/[^']*)'/g, "`\\${import.meta.env.VITE_API_URL || 'http://localhost:5000'}$1`");

    // Replace `http://localhost:5000/api/...` -> `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/...`
    content = content.replace(/`http:\/\/localhost:5000(\/[^`]*)`/g, "`\\${import.meta.env.VITE_API_URL || 'http://localhost:5000'}$1`");
    
    fs.writeFileSync(filePath, content);
});

console.log("Replaced API URLs");
