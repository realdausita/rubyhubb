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

  // Orijinal Jnkie scriptini çalıştıracak Lua kodunu geri döndürüyoruz
  const jnkieScript = 'loadstring(game:HttpGet("https://api.jnkie.com/api/v1/luascripts/public/34792c8829e32dc584472d8a8302775bdb08ed24f53dad9e09f723d78142319c/download"))()';

  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  return res.status(200).send(jnkieScript);
}
