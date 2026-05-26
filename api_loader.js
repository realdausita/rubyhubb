export default function handler(req, res) {
  const userAgent = (req.headers['user-agent'] || '').toLowerCase();

  // Roblox uses 'Roblox' or 'RobloxStudio' in its User-Agent
  const isRoblox = userAgent.includes('roblox');

  // Common browser/tool signatures to block
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
    return res.status(403).send('Access Denied. You do not have permission to access this script.');
  }

  // Updated Lua Script with Forsaken support
  const luaScript = `local pId = game.PlaceId
local player = game:GetService("Players").LocalPlayer

if pId == 4620170611 or pId == 3851622790 then
    loadstring(game:HttpGet("https://raw.githubusercontent.com/realdausita/RubyHub/refs/heads/main/BreakIn.lua"))()
elseif pId == 9872472334 then
    loadstring(game:HttpGet("https://raw.githubusercontent.com/realdausita/RubyHub/refs/heads/main/Evade.lua"))()
elseif pId == 18687417158 or pId == 83645629621104 then
    loadstring(game:HttpGet("https://raw.githubusercontent.com/realdausita/RubyHub/refs/heads/main/Forsaken.lua"))()
else
    player:Kick("This Game Is Not Supported by Ruby Hub Universal Version Soon..")
end`;

  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  return res.status(200).send(luaScript);
}
