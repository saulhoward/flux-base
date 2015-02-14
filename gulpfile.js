var gulp = require('gulp');
var util = require('gulp-util');
var to5 = require('gulp-6to5');
var del = require('del');

var src = [ './src/**' ],
    dest = './lib';

var log = function(e) {
    util.log(e.message);
};

gulp.task('clean', function(cb) {
    del(dest, cb);
});

gulp.task('compile', ['clean'], function() {
    return gulp.src(src)
        .pipe(to5().on('error', log))
        .pipe(gulp.dest(dest));
});

gulp.task('default', ['compile']);

gulp.task('watch', ['compile'], function() {
    gulp.watch(src, ['compile']);
});
