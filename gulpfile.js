var gulp = require('gulp');
var plug = require('gulp-load-plugins')();

gulp.task('build', function () {
    return gulp.src('./src/**/*.js')
        .pipe(plug.angularFilesort())
        .pipe(plug.concat('ng-rest-emulator.js'))
        .pipe(plug.ngAnnotate({
            add: true,
            single_quotes: true
        }))
        .pipe(gulp.dest('./build'));
});

gulp.task('build-release', function () {
    return gulp.src('./src/**/*.js')
        .pipe(plug.angularFilesort())
        .pipe(plug.concat('ng-rest-emulator.min.js'))
        .pipe(plug.ngAnnotate({
            add: true,
            single_quotes: true
        }))
        .pipe(plug.uglify({
            mangle: true
        }))
        .pipe(gulp.dest('./build'));
});

gulp.task('default', ['build', 'build-release']);