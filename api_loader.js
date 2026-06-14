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
if not game:IsLoaded() then game.Loaded:Wait() end

local player = game:GetService("Players").LocalPlayer

if pId == 4620170611 or pId == 3851622790 then
    loadstring(game:HttpGet("https://raw.githubusercontent.com/realdausita/RubyHub/refs/heads/main/BreakIn.lua"))()
elseif pId == 9872472334 then
    loadstring(game:HttpGet("https://raw.githubusercontent.com/realdausita/RubyHub/refs/heads/main/Evade.lua"))()
elseif pId == 18687417158 or pId == 83645629621104 then
    loadstring(game:HttpGet("https://raw.githubusercontent.com/realdausita/RubyHub/refs/heads/main/Forsaken.lua"))()
elseif pId == 2753915549 or pId == 4442272183 or pId == 7449423635 or pId == 100117331123089 or pId == 79091703265657 then
    loadstring(game:HttpGet("https://raw.githubusercontent.com/realdausita/RubyHub/refs/heads/main/Bloxfruit.lua"))()
elseif pId == 142823291 then
    loadstring(game:HttpGet("https://raw.githubusercontent.com/realdausita/RubyHub/refs/heads/main/mm2.lua"))()
elseif pId == 13864661000 or pId == 13864667823 then
    loadstring(game:HttpGet("https://raw.githubusercontent.com/realdausita/RubyHub/refs/heads/main/BreakIn2.lua"))()
elseif pId == 70876832253163 or pId == 116495829188952 then
    loadstring(game:HttpGet("https://raw.githubusercontent.com/realdausita/RubyHub/refs/heads/main/DeadRails.lua"))()
elseif pId == 79268393072444 then
    loadstring(game:HttpGet("https://raw.githubusercontent.com/realdausita/RubyHub/refs/heads/main/Sell%20Lemons.lua", true))()
elseif pId == 72988931267790 then
    loadstring(game:HttpGet("https://raw.githubusercontent.com/realdausita/RubyHub/refs/heads/main/DrawASleigh%26SlideDownHill.lua"))()
elseif pId == 95082159892680 then
    loadstring(game:HttpGet("https://raw.githubusercontent.com/realdausita/RubyHub/refs/heads/main/%2B1%20Speed%20Escape%20on%20Keyboard%20Candy%20and%20Chocalete.lua"))()
elseif pId == 920587237 then
    loadstring(game:HttpGet("https://raw.githubusercontent.com/realdausita/RubyHub/refs/heads/main/AdoptMe.lua"))()
else
    loadstring(game:HttpGet("https://raw.githubusercontent.com/realdausita/RubyHub/refs/heads/main/Universall.lua"))()
end

  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  return res.status(200).send(luaScript);
}
