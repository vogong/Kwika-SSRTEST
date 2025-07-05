const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 4000;

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
    userAgent.toLowerCase().includes(crawler.toLowerCase())
  );
}

// API endpoint for redirect info
app.get('/api/redirect-info', (req, res) => {
  res.json({
    shouldRedirect: true,
    targetUrl: 'https://p1/saffasel.com',
    delay: 100 // milliseconds
  });
});

// Serve static files from the Angular app build directory
app.use(express.static(path.join(__dirname, 'dist/angular-ssr-metadata/browser')));

// For all GET requests that aren't to static files or the API
app.get('*', (req, res) => {
  if (req.path.startsWith('/api/')) {
    return;
  }
  
  const userAgent = req.headers['user-agent'] || '';
  const isBot = isSearchEngine(userAgent);
  
  // Add a custom header to indicate if this is a bot for debugging
  res.setHeader('X-Is-Search-Engine', isBot ? 'true' : 'false');
  
  // Read the index.html file
  const indexPath = path.join(__dirname, 'dist/angular-ssr-metadata/browser/index.html');
  fs.readFile(indexPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading index.html:', err);
      return res.status(500).send('Error loading application');
    }
    
    // Send the HTML with proper SEO metadata
    res.send(data);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Visit: http://localhost:${PORT}`);
});
