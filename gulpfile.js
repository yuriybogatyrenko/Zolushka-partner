var gulp = require('gulp'),
    useref = require('gulp-useref'),
    wiredep = require('wiredep').stream,
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    clean = require('gulp-clean'),
    compass = require('gulp-compass'),
    jade = require('gulp-jade'),
    sftp = require('gulp-sftp');


//jade
gulp.task('jade', function () {
  gulp.src('app/jade/*.jade')
      .pipe(jade({
        pretty: true
      }))
      .pipe(gulp.dest('app/'));
});

// compass
gulp.task('compass', function () {
  gulp.src('app/sass/**/*')
      .pipe(compass({
          sass: 'app/sass',
          css: 'app/css',
          js: 'app/js'
      }))
      .pipe(gulp.dest('app/css'));
});

// sftp
gulp.task('sftp', function(){
    gulp.src("dist/**/*")
        .pipe(sftp({
            host: "",
            user: "",
            pass: "",
            remotePath: ""
        }));
});

// clean
gulp.task('clean', function(){
    gulp.src('dist', {read: false})
        .pipe(clean());
});

// Build
gulp.task('build',["clean"], function(){

    return gulp.src("app/*.html")
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(useref())
        .pipe(gulp.dest('dist'));
});

// Bower
gulp.task('bower', function () {
    gulp.src('app/*.html')
        .pipe(wiredep({
            directory: "app/bower_components"
        }))
        .pipe(gulp.dest('app'));
});


// watch
gulp.task('default', function () {
    // gulp.watch('bower.json', ["bower"]);
    gulp.watch('app/sass/**/*', ['compass']);

    gulp.watch('app/jade/*.jade', ["jade"]);
});