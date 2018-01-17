const path = require('path');
const fs = require('fs');
const bdigest = fs.readFileSync('./.bdigest','utf8');
console.log(`current digest: ${bdigest}`);

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        index: ['./index.js'],
    },
    output: {
        filename: `[name]-${bdigest}.js`,
        path: path.resolve(__dirname, 'public/dist')
    },
    plugins: []
}