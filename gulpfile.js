const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sourcemap = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const server = require('browser-sync').create();
const csso = require('gulp-csso');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const svgstore = require('gulp-svgstore')
const posthtml = require('gulp-posthtml');
const include = require('posthtml-include');
const del = require('del');
const concat = require('gulp-concat');

const ghPages = require('gulp-gh-pages');

gulp.task('css', function () {
  return gulp.src('source/sass/style.scss')
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(csso())
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest('build/css'))
    .pipe(rename('style.min.css'))
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest('build/css'))
    .pipe(server.stream());
});

gulp.task('server', function () {
  server.init({
    server: 'build/',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch('source/sass/**/*.{scss,sass}', gulp.series('css', 'refresh'));
  gulp.watch('source/img/icon-*.svg', gulp.series('sprite', 'html', 'refresh'));
  gulp.watch('source/*.html', gulp.series('html', 'refresh'));
});

gulp.task('refresh', function (done) {
  server.reload();
  done();
});

gulp.task('images', function () {
  return gulp.src('source/img/**/*.{png,jpg,svg}')
    .pipe(imagemin([
      imagemin.optipng({ optimizationLevel: 3 }),
      imagemin.mozjpeg({ quality: 90, progressive: true }),
      imagemin.svgo()
    ]))

    .pipe(gulp.dest('build/img'));

});

gulp.task('webp', function () {
  return gulp.src('build/img/**/*.{png,jpg}')
    .pipe(webp({ quality: 90 }))
    .pipe(gulp.dest('build/img'));
});

gulp.task('sprite', function () {
  return gulp.src('build/img/**/icon-*.svg')
    .pipe(svgstore({ inlineSvg: true }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('build/img'));
});

gulp.task('html', function () {
  return gulp.src('source/*.html')
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest('build'));
});

gulp.task('copy', function () {
  return gulp.src([
    'source/fonts/**/*.{woff,woff2}',
    'source/js/*.js',
    'source/img/*.ico',
  ], {
    base: 'source'
  })
    .pipe(gulp.dest('build'));
});

gulp.task('clean', function () {
  return del('build');
});

gulp.task('concat', function () {
  return gulp.src('source/js/vendor/**')
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('source/js'))
});

gulp.task('build', gulp.series('clean', 'concat', 'copy', 'css', 'images', 'webp', 'sprite', 'html'));
gulp.task('start', gulp.series('build', 'server'));

gulp.task('deploy', function () {
  return gulp.src('./build/**/*')
    .pipe(ghPages());
});
