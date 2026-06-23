module.exports = async function(req, res) {
  const userAgent = (req.headers['user-agent'] || '').toLowerCase();

  // Roblox uses 'Roblox' or 'RobloxStudio' in its User-Agent
  const isRoblox = userAgent.includes('roblox');

  // Common browser signatures to block
  const browserSignatures = [
    'mozilla', 'chrome', 'safari', 'firefox', 'edge', 'opera',
    'msie', 'trident', 'gecko', 'webkit', 'applewebkit', 'blink',
    'brave', 'vivaldi', 'seamonkey', 'curl', 'wget', 'postman',
    'insomnia', 'python-requests', 'axios', 'got', 'node-fetch'
  ];

  const isBrowser = browserSignatures.some(sig => userAgent.includes(sig));

  // If it's a browser and NOT Roblox, block it
  if (isBrowser && !isRoblox) {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    return res.status(403).send('Access Denied. You do not have permission to view this script.');
  }

  try {
    const targetUrl = 'https://api.jnkie.com/api/v1/luascripts/public/34792c8829e32dc584472d8a8302775bdb08ed24f53dad9e09f723d78142319c/download';
    
    // Using https module for maximum compatibility across Node versions
    const https = require('https');
    
    https.get(targetUrl, (apiRes) => {
      let data = '';
      
      apiRes.on('data', (chunk) => {
        data += chunk;
      });
      
      apiRes.on('end', () => {
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.status(200).send(data);
      });
    }).on('error', (error) => {
      console.error('Error fetching script:', error);
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.status(500).send('-- Internal Server Error: Could not load script.');
    });

  } catch (error) {
    console.error('Error in handler:', error);
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.status(500).send('-- Internal Server Error: Could not load script.');
  }
}
