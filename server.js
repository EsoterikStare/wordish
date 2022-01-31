const express = require('express');
const path = require('path');

const app = express();

const port = process.env.PORT || 3001;

// Setup static directory to serve
app.use(express.static(path.resolve('dist')));

// Setup wildcard route for SPA
app.get('*', (req, res) => {
  res.sendFile(path.resolve('dist', 'index.html'));
});

// Start server
app.listen(port, () => console.log(`Listening on port ${port}`));
