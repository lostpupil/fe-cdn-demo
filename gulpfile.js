var gulp = require('gulp');

var webpack = require("webpack");
var webpackStream = require('webpack-stream');
var webpackConfig = require("./webpack.config.js");

gulp.task('default', function() {
    console.log('hey I am banana')
});

gulp.task('dev', function() {
    var myConfig = Object.create(webpackConfig);
    return gulp.src('')
        .pipe(webpackStream(myConfig))
});

gulp.task('prod', function() {
    var myConfig = Object.create(webpackConfig);
    myConfig.plugins = myConfig.plugins.concat(
        new webpack.DefinePlugin({
            "process.env": {
                "NODE_ENV": JSON.stringify("production")
            }
        }),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        })
    );
    return gulp.src('')
        .pipe(webpackStream(myConfig))
});