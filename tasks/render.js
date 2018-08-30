const gulp = require('gulp');
const dataset = require('../src/pages/repeat/dataset.json');
const nunjucksRender = require('gulp-nunjucks-render');

module.exports = (browserSync) => gulp.task('render', function() {
  const envHooks = [
    env => env.addFilter('orderByObjKey', function(arr, path) {
      return ((arr, path) => {
        const findValue = (part, path) => {
          if(!path.length) return part;

          const cur = path[0];
          const newPath = path.slice(1);

          return part[cur] ? findValue(part[cur], newPath) : 0;
        }

        return arr.sort(function(a, b) {

          return findValue(a, path) > findValue(b, path);
        });
      })(arr, path);
    }),
  ]

  gulp.src('src/pages/*.+(html|njk)')
    .pipe(nunjucksRender({
      path: ['src/pages/templates'],
      manageEnv: function(env) {
        return envHooks.forEach(fn => fn(env));
      },
    }))
    .pipe(gulp.dest('www/'))
    .pipe(browserSync.stream());

  return dataset.forEach(chunk => {
    gulp.src('src/pages/repeat/project.njk')
      .pipe(nunjucksRender({
        path: ['src/pages/templates'],
        data: chunk,
        ext: `-${chunk.className}.html`,
        manageEnv: function(env) {
          return envHooks.forEach(fn => fn(env));
        },
      }))
      .pipe(gulp.dest('www/'))
      .pipe(browserSync.stream());
  });
});
