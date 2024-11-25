const fs = require('fs');
const path = require('path');

// 确保目录存在
const tokenDir = path.join(__dirname, '../public/tokens');
if (!fs.existsSync(tokenDir)) {
  fs.mkdirSync(tokenDir, { recursive: true });
}

// 生成 SVG 的函数
function generateTokenSVG(symbol, backgroundColor = '#FF4433') {
  return `<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="10" fill="${backgroundColor}"/>
    <text x="50" y="50" font-family="Arial" font-size="24" fill="white" text-anchor="middle" dominant-baseline="middle">
      ${symbol}
    </text>
  </svg>`;
}

// 代币符号列表
const tokens = [
  'KOTH', 'PEPE', 'MOON', 'DOGE+', 'PIXEL', 'CCAT', 'ROBOT', 'SPACE',
  'NINJA', 'VKING', 'WIZA', 'GOLD', 'PUNK', 'FRST', 'WAVE', 'FIRE',
  'STAR', 'BOLT', 'ICE', 'WIND', 'CRYST', 'SOLAR', 'LUNAR', 'TITAN',
  'META', 'QUARK', 'NEO', 'DAWN', 'SHIELD', 'FLOW'
];

// 生成所有代币的 SVG
tokens.forEach(symbol => {
  const svg = generateTokenSVG(symbol);
  fs.writeFileSync(path.join(tokenDir, `${symbol}.svg`), svg);
});

console.log('Token images generated successfully!'); 