'use strict';

import gulp from 'gulp';
import babelify from 'babelify';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import browserSync from 'browser-sync';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';

gulp.task("html", () => {
    return gulp.src("./app/*.html")
        .pipe(gulp.dest("./build"))
        .pipe(browserSync.stream());
});

gulp.task("vendor", () => {
    return gulp.src("./app/vendor/*.js")
        .pipe(gulp.dest("./build/vendor"))
        .pipe(browserSync.stream());
});

gulp.task("img", () => {
    return gulp.src("./app/images/*.jpg")
        .pipe(gulp.dest("./build/images"))
        .pipe(browserSync.stream());
});

gulp.task("styles", () => {
    return gulp.src("./app/stylesheets/*.scss")
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest("./build/css"))
        .pipe(browserSync.stream());
});

gulp.task("scripts", () => {
    return browserify({
            entries: ["./app/scripts/main.js"]
        })
        .transform(babelify.configure({
            presets: ["es2015"]
        }))
        .bundle()
        .pipe(source("bundle.js"))
        .pipe(gulp.dest("./build/js"))
        .pipe(browserSync.stream());
});

gulp.task("startServer", () => {
    browserSync.init({
        server: "./build"
    });
});

gulp.task('watch', () => {
    gulp.watch('./app/*.html', ['html']);
    gulp.watch(['./app/scripts/*.js'], ['scripts']);
    gulp.watch(['./app/sass/**/*.scss'], ['styles']);
});

gulp.task("build", ["html", "vendor", "img", "scripts", "styles"]);
gulp.task("dev", ["build", "startServer", "watch"]);
