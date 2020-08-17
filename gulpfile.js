var gulp = require('gulp');
var less = require('gulp-less');
var livereload = require('gulp-livereload');
var lesshint = require('gulp-lesshint');
var htmlhint = require("gulp-htmlhint");
var jshint = require('gulp-jshint');

var paths = {
  html: {
    src: '',
    dest: ''
  },
  styles: {
    src: './styles/src/main.less',
    dest: './styles'
  },
  scripts: {
    src: '.',
    dest: ''
  },
  images: {
    src: '',
    dest: ''
  },
  lint: {
    less: './styles/src/**/*.less',
    js: './scripts/**/*.js',
    html: './*.html'
  }
};

var watches = {
  html: './*.html',
  less: './styles/src/**/*.less',
  js: './scripts/**/*.js',
  images: ''
};

var lintConfig = {
  less: {}
}

gulp.task('less', function(){
  return gulp.src(paths.styles.src)
    .pipe(less())
    .pipe(gulp.dest(paths.styles.dest));
});

gulp.task('lint:js', function() {
  return gulp.src(paths.lint.js)
    .pipe(jshint())
    .pipe(jshint.reporter());
});

gulp.task('lint:html', function () {
  return gulp.src(paths.lint.html)
    .pipe(htmlhint())
    .pipe(htmlhint.reporter());
});

gulp.task('lint:less', function() {
  return gulp.src(paths.lint.less)
    .pipe(lesshint())
    .pipe(lesshint.reporter());
});

gulp.task('reload', function(done) {
  livereload.reload();
  done();
});

gulp.task('watch', function() {

  // Create LiveReload server
  livereload.listen();

  // Watch HTML files
  gulp.watch(watches.html, gulp.series('lint:html', 'reload'));

  // Watch .scss files
  gulp.watch(watches.less, gulp.series('less', 'lint:less', 'reload'));

  // Watch .js files
  gulp.watch(watches.js, gulp.series('lint:js', 'reload'));

});
