const path = require('path');
const fs = require('fs');
const bdigest = fs.readFileSync('./.bdigest', 'utf8');
const webpack = require('webpack');
var cleanWebpackPlugin = require('clean-webpack-plugin');

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
                    presets: ['@babel/preset-env']
                }
            }
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                "NODE_ENV": JSON.stringify("development")
            }
        }),
        new cleanWebpackPlugin(['public/dist'], {
            root: __dirname,
            verbose: true,
            dry: false
        }),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        })
    ]
}