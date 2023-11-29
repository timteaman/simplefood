const { src, dest, watch, parallel, series } = require('gulp');

const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();
const del = require('del');
const svgSprite = require('gulp-svg-sprite');
const sourcemaps = require('gulp-sourcemaps');

const notify = require('gulp-notify'); 
const plumber = require('gulp-plumber'); 

function browsersync() {
  browserSync.init({
    server: {
      baseDir: "./src/",
    },
    notify: false,
  });
}

function watching() {
  watch(["./src/scss/**/*.scss"], styles);
  watch(["./src/js/**/*.js"]);
  watch(["./src/**/*.html"]).on("change", browserSync.reload);
  watch(["./src/images/icons/*.svg"], svgSprites);
}

function styles() {
  return src('./src/scss/style.scss')
    .pipe(plumber({
      errorHandler: notify.onError(function(err){
        return {
          title: 'Styles',
          sound: false,
          message: err.message
        }
      })
    }))
    .pipe(sourcemaps.init())
    .pipe(scss({ outputStyle: "compressed" }))
    .pipe(concat("style.min.css"))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 10 versions"],
        grid: true,
      })
    )
    .pipe(sourcemaps.write())
    .pipe(dest("./src/css"))
    .pipe(browserSync.stream());
}

// function scripts() {
//   return src(["./src/js/main.js"])
//     .pipe(concat("main.min.js"))
//     .pipe(uglify())
//     .pipe(dest("./src/js"))
//     .pipe(browserSync.stream());
// }

function images() {
  return src("./src/images/**/*.*")
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 75, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
        }),
      ])
    )
    .pipe(dest("./dist/images"));
}

function build() {
  return src(
    [
      "./src/css/style.min.css",
      "./src/fonts/**/*",
      "./src/js/main.js",
      "./src/*.html",
    ],
    { base: "src" }
  ).pipe(dest("./dist"));
}

function cleanDist() {
  return del('./dist');
}


function svgSprites() {
  return src("./src/images/icons/sprites/**/*.svg") // выбираем в папке с иконками все файлы с расширением svg
    .pipe(
      svgSprite({
        mode: {
          stack: {
            sprite: "../sprite.svg", // указываем имя файла спрайта и путь
          },
        },
      })
    )
    .pipe(dest("./src/images/icons")); // указываем, в какую папку поместить готовый файл спрайта
}

exports.styles = styles;
// exports.scripts = scripts;
exports.browsersync = browsersync;
exports.watching = watching;
exports.images = images;
exports.cleanDist = cleanDist;
exports.svgSprites = svgSprites;

exports.build = series(cleanDist, images, build);

exports.svg = svgSprites;
exports.default = parallel(styles, browsersync, watching);
