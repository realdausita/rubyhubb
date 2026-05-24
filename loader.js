export default function handler(req, res) {
  const userAgent = (req.headers['user-agent'] || '').toLowerCase();

  const browserSignatures = [
    'mozilla', 'chrome', 'safari', 'firefox', 'edge', 'opera',
    'msie', 'trident', 'gecko', 'webkit', 'applewebkit', 'blink',
    'brave', 'vivaldi', 'seamonkey', 'curl', 'wget', 'postman'
  ];

  const isBrowser = browserSignatures.some(sig => userAgent.includes(sig));

  if (isBrowser) {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    return res.status(403).send('U dont have access to this script.');
  }

  const luaScript = `local pId = game.PlaceId
local player = game:GetService("Players").LocalPlayer

if pId == 4620170611 or pId == 3851622790 then
    loadstring(game:HttpGet("https://raw.githubusercontent.com/realdausita/RubyHub/refs/heads/main/BreakIn.lua"))()
elseif pId == 9872472334 then
    loadstring(game:HttpGet("https://raw.githubusercontent.com/realdausita/RubyHub/refs/heads/main/Evade.lua"))()
else
    player:Kick("This Game Is Not Supported by Ruby Hub Universal Version Soon..")
end`;

  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  return res.status(200).send(luaScript);
}
