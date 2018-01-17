const path = require('path');
const fs = require('fs');
const bdigest = fs.readFileSync('./.bdigest', 'utf8');
const webpack = require('webpack');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

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
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['es2015']
                }
            }
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                "NODE_ENV": JSON.stringify("production")
            }
        }),
        new cleanWebpackPlugin(['public/dist/prod'], {
            root: __dirname,
            verbose: true,
            dry: false
        }),
        new UglifyJSPlugin(),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        })
    ]
}