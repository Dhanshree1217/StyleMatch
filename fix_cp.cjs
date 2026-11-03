const fs = require('fs');

// Fix 1: Fix cp-main CSS layout
const cssFile = './src/affiliate-style.css';
let css = fs.readFileSync(cssFile, 'utf8');

css = css.replace(
  '.cp-main {\n  flex: 1;\n  padding: 2rem 2.5rem;\n  overflow-y: auto;\n  background: #fafaf9;\n  min-height: 100vh;\n}',
  '.cp-main {\n  flex: 1;\n  min-width: 0;\n  margin-left: 240px;\n  padding: 2rem 2.5rem;\n  overflow-y: auto;\n  background: #fafaf9;\n  min-height: 100vh;\n  transition: margin-left 0.25s ease;\n  box-sizing: border-box;\n}'
);

// Fix 2: Fix mobile responsive for cp-main
css = css.replace(
  '.cp-main { padding: 1.25rem 1rem; }',
  '.cp-main { margin-left: 0; padding: 1.25rem 1rem; padding-top: 60px; }'
);

fs.writeFileSync(cssFile, css, 'utf8');
console.log('CSS fixed');
