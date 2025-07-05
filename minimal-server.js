const express = require('express');
const app = express();
const path = require('path');

const PORT = 4000;
const DIST_FOLDER = path.join(__dirname, 'dist/angular-ssr-metadata/browser');

// Serve static files
app.use(express.static(DIST_FOLDER));

// All routes should serve index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(DIST_FOLDER, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Visit: http://localhost:${PORT}`);
});
