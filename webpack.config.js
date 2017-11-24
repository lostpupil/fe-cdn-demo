const path = require('path');

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        index: ['./index.js'],
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'public/dist')
    },
    plugins: []
}