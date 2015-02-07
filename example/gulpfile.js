'use strict';

var gulp = require('gulp');
var restEmulator = require('gulp-rest-emulator');

gulp.task('run', function () {

    var options = {
        rewriteNotFound: true
    };

    return gulp.src('./mocks/**/*.js')
        .pipe(restEmulator(options));
});