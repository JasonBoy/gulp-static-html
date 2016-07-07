var gulp = require('gulp');
var html = require('./index');

gulp.task('html', function () {
  return gulp.src('./test/*.html')
      .pipe(html({name: 'jason'}))
      .pipe(gulp.dest('./build'))
    ;
});