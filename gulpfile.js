const gulp = require("gulp");
const pug = require("gulp-pug");
const sass = require("gulp-sass")(require("sass"));
const uglify = require("gulp-uglify");
const sourcemaps = require("gulp-sourcemaps");
const del = require("del");
const browserSync = require("browser-sync").create();
const imagemin = require("gulp-imagemin");
const replace = require("gulp-replace");
const fs = require("fs");
const config = require("./config.json");
const config_fs = JSON.parse(fs.readFileSync("./config.json"));

gulp.task("clean", function () {
  return del(["dist"]);
});

gulp.task("pug", function () {
  return gulp
    .src("src/index.pug")
    .pipe(pug({ data: config }))
    .pipe(gulp.dest("dist"))
    .pipe(browserSync.stream());
});

gulp.task("sass", function () {
  return gulp
    .src("src/css/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.stream());
});

gulp.task("js", function () {
  return gulp
    .src("src/js/**/*.js")
    .pipe(replace("/* CONFIG_PLACEHOLDER */", JSON.stringify(config_fs)))
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist/js"))
    .pipe(browserSync.stream());
});

gulp.task("assets", function () {
  return gulp
    .src("src/assets/**/*", { encoding: false })
    .pipe(gulp.dest("dist/assets"))
    .pipe(imagemin())
    .pipe(browserSync.stream());
});

gulp.task("watch", function () {
  browserSync.init({
    server: {
      baseDir: "dist",
    },
  });
  gulp.watch("src/components/**/*.pug", gulp.series("pug"));
  gulp.watch("src/css/**/*.scss", gulp.series("sass"));
  gulp.watch("src/js/**/*.js", gulp.series("js"));
  gulp.watch("src/assets/**/*", gulp.series("assets"));
});

gulp.task(
  "default",
  gulp.series("clean", gulp.parallel("pug", "sass", "js", "assets"))
);
gulp.task(
  "debug",
  gulp.series("clean", gulp.parallel("pug", "sass", "js", "assets"), "watch")
);
