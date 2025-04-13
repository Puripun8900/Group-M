const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();
const port = 3000;

// Serve static files
app.use(express.static(path.join(__dirname)));

// Set up proxy for API requests
app.use('/api', createProxyMiddleware({
  target: 'https://smartgym-m.azurewebsites.net',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '', // Remove /api prefix when forwarding to target
  },
  onProxyRes: function(proxyRes, req, res) {
    // Log proxy activity
    console.log(`Proxied request: ${req.method} ${req.path} -> ${proxyRes.statusCode}`);
  }
}));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`Open your browser and navigate to http://localhost:${port}`);
});