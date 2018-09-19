var gulp = require("gulp");
var browserSync = require("browser-sync").create();
var pkg = require("./package.json");
var reload = browserSync.reload;

var nunjucksRender = require("gulp-nunjucks-render");

// Copy third party libraries from /node_modules into /vendor
gulp.task("vendor", function () {
  // Bootstrap
  gulp
    .src([
      "./node_modules/bootstrap/dist/**/*",
      "!./node_modules/bootstrap/dist/css/bootstrap-grid*",
      "!./node_modules/bootstrap/dist/css/bootstrap-reboot*"
    ])
    .pipe(gulp.dest("./vendor/bootstrap"));

  // jQuery
  gulp
    .src([
      "./node_modules/jquery/dist/*",
      "!./node_modules/jquery/dist/core.js"
    ])
    .pipe(gulp.dest("./vendor/jquery"));

  // jQuery Easing
  gulp
    .src(["node_modules/jquery.easing/*.js"])
    .pipe(gulp.dest("vendor/jquery-easing"));
});

// Default task
//gulp.task('default', ['vendor']);

gulp.task("dev", function () {
  browserSync.init({
    server: {
      baseDir: "./dist"
    }
  });

  var watcher = gulp.watch(["./**/*.nunjucks","./public/**/*.js","./public/**/*.css"], gulp.series("clean", "copy", "nunjucks"));
  watcher.on("change", function () {
    console.log('file change...')
    //gulp.series("clean", "nunjucks");
    reload();
  });
});

gulp.task("clean", function () {
  const del = require("del");
  return del("dist/1", {
    force: true
  });
});

gulp.task('copy', function () {
  return gulp.src(["./public/**"]).pipe(gulp.dest("dist"));
})

gulp.task("nunjucks", function () {
  //gulp.src(["./public/**/*.js", "./public/**/*.css", "./public/images/*.png"]).pipe(gulp.dest("dist"));

  console.log('nunjucks....')
  // Gets .html and .nunjucks files in pages
  return (
    gulp
    .src("pages/**/*.+(html|nunjucks)")
    // Renders template with nunjucks
    .pipe(
      nunjucksRender({
        path: ["templates"]
      })
    )
    // output files in app folder
    .pipe(gulp.dest("dist"))
  );
});

gulp.task("start", gulp.series("clean", "copy", "nunjucks", "dev"));