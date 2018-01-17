var gulp = require('gulp');

var webpack = require("webpack");

var fs = require('fs');
var crypto = require("crypto-js");
var shell = require('gulp-shell')

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
    shell.task(['webpack'])
});
