const {series, parallel, src, dest, watch} = require("gulp");

// CSS

const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const postcss = require("gulp-postcss");
const sourcemaps = require("gulp-sourcemaps");

// Images

const cache = require("gulp-cache");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const avif = require("gulp-avif");

// Javascript

const terser = require("gulp-terser-js");


function css(done) {
    src ("src/scss/**/*.scss") // Identify the .SCSS archive to compile
        .pipe(sourcemaps.init())
        .pipe(plumber({
            errorHandler: function (err) {
              console.log(err);
              this.emit('end');
            }
        }))
        .pipe(sass()) // Compile it
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write("."))
        .pipe(dest("build/css")); // Save it
    done();
};

function mcss(done) {
    src ("src/scss/app.scss")
        .pipe(sass({
            outputStyle: "compressed"
        }))
        .pipe(dest("build/css"));
    done();
};

function img (done) {
    const options = {
        optimizationLevel: 3
    };

    src("src/img/**/*.{png, jpg}")
        .pipe(cache(imagemin(options)))
        .pipe(dest("build/img"));
    done();
};

function vwebp(done) {
    const options = {
        quality: 50
    };

    src("src/img/**/*.{png, jpg}")
        .pipe(webp(options))
        .pipe(dest("build/img"));
    done();
};

function vavif(done) {
    const options = {
        quality: 50
    };

    src("src/img/**/*.{png, jpg}")
        .pipe(avif(options))
        .pipe(dest("build/img"));
    done();
};

function javascript(done) {
    src("src/js/**/*.js")
        .pipe(sourcemaps.init())
        .pipe(terser())
        .pipe(sourcemaps.write("."))
        .pipe(dest("build/js"));
    done();
}

function dev (done) {
    watch("src/scss/**/*.scss", css); // * = Actual folder - ** = All the archives with that extension
    watch("src/js/**/*.js", javascript);
    done();
};

exports.css = css;
exports.js = javascript;
exports.mcss = mcss;
exports.img = img;
exports.vwebp = vwebp;
exports.vavif = vavif;
exports.dev = dev;

exports.default = parallel(css, img, vwebp, vavif, dev);

// function hello(done) {
//     console.log("Hello World in Gulp");
//     done();
// };

// function javascript(done) {
//     console.log("Compiling JavaScript...");
//     done();
// };

// function minificateHTML(done) {
//     console.log("Minificating...");
//     done();
// }

// exports.firstFunction = hello;
// exports.javascript = javascript;
// exports.tasks = parallel(hello, javascript, minificateHTML);