const gulp = require('gulp');
const config = require('../gulpfile.config');
const nunjucksRender = require('gulp-nunjucks-render');

module.exports = (browserSync) => gulp.task('render', function() {
  return gulp.src('src/pages/*.+(html|njk)')
    .pipe(nunjucksRender({
      path: ['src/pages/templates'],
    }))
    .pipe(gulp.dest('www/'))
    .pipe(browserSync.stream());
});
