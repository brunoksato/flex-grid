/**
 * Created by Bruno Sato on 04/08/2014.
 * npm install gulp gulp-util gulp-rename gulp-minify-css gulp-jshint gulp-concat gulp-clean gulp-sass gulp-uglify gulp-ng-annotate gulp-autoprefixer --save-dev
 */ 

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    rename = require('gulp-rename'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    clean = require('gulp-clean'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    ngannotate = require('gulp-ng-annotate'),
    autoprefixer = require('gulp-autoprefixer');


// Dev task
gulp.task('build', ['scripts','styles','lint','clean'], function() {
  
  console.log('Build complete!');

});

// JSHint task
gulp.task('lint', function() {
    gulp.src('src/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Styles task
gulp.task('styles', function() {
    gulp.src(['src/styles/*.css'])
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(rename("flex-grid.css"))
        .pipe(gulp.dest('dist/'));

    gulp.src(['src/styles/*.css'])
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(rename("flex-grid.min.css"))
        .pipe(minifycss())
        .pipe(gulp.dest('dist/'));
});


gulp.task('scripts', function() {
    gulp.src('src/*.js')
        .pipe(ngannotate())
        .pipe(concat('flex-grid.js'))
        .pipe(gulp.dest('dist/'));

    gulp.src('src/*.js')
        .pipe(ngannotate())
        .pipe(uglify())
        .pipe(rename('flex-grid.min.js'))
        .pipe(gulp.dest('dist/'));
});


gulp.task('clean', function() {
    return gulp.src(['dist/*'], {read: false})
        .pipe(clean());
});
