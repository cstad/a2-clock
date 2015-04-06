var gulp = require('gulp'),
    less = require('gulp-less'),
    livereload = require('gulp-livereload'),
    watch = require('gulp-watch'),
    concat = require('gulp-concat'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    traceur = require('gulp-traceur'),
    del = require('del');



var PATHS = {
    src: {
        js: 'app/**/*.js',
        html: 'app/**/*.html',
        less: 'app/less/**/*.less'
    },
    lib: [
        'node_modules/gulp-traceur/node_modules/traceur/bin/traceur-runtime.js',
        'node_modules/es6-module-loader/dist/es6-module-loader-sans-promises.src.js',
        'node_modules/systemjs/lib/extension-cjs.js',
        'node_modules/systemjs/lib/extension-register.js',
        'node_modules/angular2/node_modules/zone.js/zone.js',
        'node_modules/angular2/node_modules/zone.js/long-stack-trace-zone.js',
        'node_modules/angular2/node_modules/rx/dist/rx.all.js',
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/jquery/dist/jquery.min.map',
        'node_modules/bootstrap/dist/js/bootstrap.min.js',
        'node_modules/bootstrap/dist/css/bootstrap.min.css'
    ]
};

gulp.task('clean', function(done) {
    del(['dist'], done);
});

gulp.task('js', function () {
    return gulp.src(PATHS.src.js)
        .pipe(rename({extname: ''})) //hack, see: https://github.com/sindresorhus/gulp-traceur/issues/54
        .pipe(plumber())
        .pipe(traceur({
            modules: 'instantiate',
            moduleName: true,
            annotations: true,
            types: true,
            memberVariables: true
        }))
        .pipe(rename({extname: '.js'})) //hack, see: https://github.com/sindresorhus/gulp-traceur/issues/54
        .pipe(gulp.dest('dist'));
});

gulp.task('html', function () {
    return gulp.src(PATHS.src.html)
        .pipe(gulp.dest('dist'));
});

gulp.task('libs', ['angular2'], function () {
    return gulp.src(PATHS.lib)
        .pipe(gulp.dest('dist/lib'));
});

gulp.task('less', ['angular2'], function () {
    gulp.src(PATHS.src.less)
        .pipe(watch(PATHS.src.less))
        .pipe(less())
        .pipe(gulp.dest('dist/css'))
        .pipe(livereload());
});

gulp.task('angular2', function () {

    //transpile & concat
    return gulp.src([
            'node_modules/angular2/es6/prod/*.es6',
            'node_modules/angular2/es6/prod/src/**/*.es6'],
        { base: 'node_modules/angular2/es6/prod' })
        .pipe(rename(function(path){
            path.dirname = 'angular2/' + path.dirname; //this is not ideal... but not sure how to change angular's file structure
            path.extname = ''; //hack, see: https://github.com/sindresorhus/gulp-traceur/issues/54
        }))
        .pipe(traceur({ modules: 'instantiate', moduleName: true}))
        .pipe(concat('angular2.js'))
        .pipe(gulp.dest('dist/lib'));
});

gulp.task('serve', ['default'], function () {

    var http = require('http');
    var connect = require('connect');
    var serveStatic = require('serve-static');
    var open = require('open');

    var port = 9001, app;

    gulp.watch(PATHS.src.html, ['html']);
    gulp.watch(PATHS.src.js, ['js']);

    app = connect().use(serveStatic(__dirname + '/dist'));  // serve everything that is static
    http.createServer(app).listen(port, function () {
        open('http://localhost:' + port);
    });
});

gulp.task('default', ['js', 'html', 'less', 'libs']);
