var gulp = require('gulp');

var webpack = require('gulp-webpack');

var fs = require('fs');
var crypto = require("crypto-js");
var gulpSequence = require('gulp-sequence');

gulp.task('default', function() {
    console.log('hey I am banana')
});

gulp.task('rehash', () => {
    var key = crypto.MD5(`${Number(new Date())}`).toString();
    console.log(key)
    fs.truncate("./.bdigest", 0, function() {
        fs.writeFile("./.bdigest", key, function(err) {
            if (err) {
                return console.log(err);
            }
        });
    });
});

gulp.task('dev', function() {
    return gulp.src('src/index.js')
        .pipe(webpack(require('./webpack.dev.config.js')))
        .pipe(gulp.dest('public/dist/dev'));
});

gulp.task('prod', function() {
    return gulp.src('src/index.js')
        .pipe(webpack(require('./webpack.prod.config.js')))
        .pipe(gulp.dest('public/dist/prod'));
});

gulp.task('dev-seq', gulpSequence(['rehash', 'dev']));

gulp.task('prod-seq', gulpSequence(['rehash', 'prod']))