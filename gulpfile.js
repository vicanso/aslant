/* eslint import/no-extraneous-dependencies:0 */
const gulp = require('gulp');
const del = require('del');
const stylus = require('gulp-stylus');
const base64 = require('gulp-base64');
const nib = require('nib');
const cssmin = require('gulp-cssmin');
const copy = require('gulp-copy');
const path = require('path');
const through = require('through2');
const webpack = require('webpack');
const crc32 = require('buffer-crc32');
const _ = require('lodash');
const fs = require('fs');

const webpackConfig = require('./webpack.config');

webpackConfig.plugins.push(
  new webpack.optimize.UglifyJsPlugin({
    mangle: {
      except: ['$super', '$', 'exports', 'require'],
    },
  })
);

const assetsPath = 'assets';
// 保存静态文件的crc32版本号
const crc32Versions = {};
function version(opts) {
  function addVersion(file, encoding, cb) {
    const v = crc32.unsigned(file.contents);
    const extname = path.extname(file.path);
    let name = file.path.substring(file.base.length - 1);
    if (opts && opts.prefix) {
      name = opts.prefix + name;
    }
    crc32Versions[name] = `${v}`;
    /* eslint no-param-reassign:0 */
    file.path = file.path.replace(extname, `.${v}${extname}`);
    cb(null, file);
  }
  return through.obj(addVersion);
}

gulp.task('bootstrap', [
  'copy-blueprintjs/core/css',
  'copy-blueprintjs/core/font',
  'copy-blueprintjs/table/css',
  'copy-blueprintjs/datetime/css',
]);

gulp.task('copy-blueprintjs/core/css', () => gulp.src('node_modules/@blueprintjs/core/dist/blueprint.css')
  .pipe(through.obj((file, encoding, cb) => {
    const css = file.contents.toString();
    const reg = /assets/gi;
    const buf = new Buffer(css.replace(reg, '../fonts'));
    fs.writeFile('public/css/blueprint.css', buf, cb);
  })));
gulp.task('copy-blueprintjs/core/font', () => gulp.src('node_modules/@blueprintjs/core/dist/assets/*')
  .pipe(copy('public/fonts', {
    prefix: 5,
  })));

gulp.task('copy-blueprintjs/table/css', () => gulp.src('node_modules/@blueprintjs/table/dist/table.css')
  .pipe(copy('public/css', {
    prefix: 4,
  })));

gulp.task('copy-blueprintjs/datetime/css', () => gulp.src('node_modules/@blueprintjs/datetime/dist/blueprint-datetime.css')
  .pipe(copy('public/css', {
    prefix: 4,
  })));


gulp.task('del:assets', () => del([assetsPath]));

gulp.task('del:build', () => del(['build', 'public/bundle']));

gulp.task('clean', ['crc32'], () => del(['build']));


gulp.task('stylus', ['del:assets', 'del:build'], () => gulp.src('public/**/*.styl')
  .pipe(stylus({
    use: nib(),
    'include css': true,
  }))
  .pipe(base64())
  .pipe(cssmin())
  .pipe(gulp.dest('build'))
);

gulp.task('copy:others', ['del:assets', 'del:build'], () => gulp.src([
  'public/**/*',
  '!public/**/*.styl',
  '!public/**/*.js',
]).pipe(copy('build', {
  prefix: 1,
})));

gulp.task('copy:to-assets', ['del:assets'], () => gulp.src([
  'public/fonts/*',
]).pipe(copy(assetsPath, {
  prefix: 1,
})));

gulp.task('copy:source', ['del:assets', 'del:build'], () => gulp.src([
  'public/js/*',
  'public/js/**/*.js',
]).pipe(copy(assetsPath, {
  prefix: 1,
})));

gulp.task('static:css', ['stylus', 'copy:others'], () => gulp.src(['build/**/*.css'])
  .pipe(base64())
  .pipe(cssmin())
  .pipe(version())
  .pipe(gulp.dest(assetsPath))
);

gulp.task('static:js', ['copy:others'], () => gulp.src(['public/bundle/*.js'])
  .pipe(version())
  .pipe(gulp.dest(assetsPath))
);

gulp.task('webpack:bundle', (cb) => {
  webpack(webpackConfig, cb);
});

gulp.task('static:webpack-compile', ['webpack:bundle'], () => gulp.src(['public/bundle/*'])
  .pipe(copy('build', {
    prefix: 1,
  }))
);
gulp.task('static:webpack', ['static:webpack-compile'], () => gulp.src(['build/bundle/*.js'])
  .pipe(copy(assetsPath, {
    prefix: 1,
  }))
);
gulp.task('static:webpack-sourcemap', ['webpack:bundle'], () => gulp.src(['public/bundle/*.map'])
  .pipe(copy(assetsPath, {
    prefix: 1,
  }))
);
gulp.task('static:webpack-version', ['static:webpack', 'static:webpack-sourcemap'], () => gulp.src([`${assetsPath}/bundle/*.js`])
  .pipe(through.obj((file, encoding, cb) => {
    const fileName = file.path.replace(path.join(__dirname, assetsPath), '');
    const v = crc32.unsigned(file.contents);
    const arr = fileName.split('.');
    crc32Versions[fileName] = `${v}`;
    arr.splice(1, 0, v);
    fs.rename(file.path, file.path.replace(fileName, arr.join('.')), cb);
  }))
);

gulp.task('static:img', ['copy:others'], () => {
  const maxSize = 10 * 1024;

  const sizeLimit = (file, encoding, cb) => {
    if (file.stat.size > maxSize) {
      const size = Math.ceil(file.stat.size / 1024);
      console.error(`Warning, the size of ${file.path} is ${size}KB`);
    }
    cb(null, file);
  };

  return gulp.src([
    'build/**/*.png',
    'build/**/*.jpg',
    'build/**/*.gif',
    'build/**/*.ico',
  ])
  .pipe(through.obj(sizeLimit))
  .pipe(version())
  .pipe(gulp.dest(assetsPath));
});

gulp.task('crc32', ['static:css', 'static:js', 'static:img', 'static:webpack', 'static:webpack-version'], (cb) => {
  const data = {};
  const keys = _.keys(crc32Versions).sort();
  _.forEach(keys, (k) => {
    data[k] = crc32Versions[k];
  });
  fs.writeFile(path.join(__dirname, 'versions.json'), JSON.stringify(data, null, 2), cb);
});

gulp.task('default', [
  'del:assets',
  'del:build',
  'stylus',
  'copy:others',
  'copy:to-assets',
  'static:css',
  'static:webpack',
  'static:js',
  'crc32',
  'clean',
]);
