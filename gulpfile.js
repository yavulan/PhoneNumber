'use strict';

const gulp = require( 'gulp' );
const babel = require( 'gulp-babel' );
const uglify = require( 'gulp-uglify' );
const rename = require( 'gulp-rename' );
const mocha = require( 'gulp-mocha' );

gulp.task( 'babelize', () => {
    return gulp.src( 'app/PhoneNumber.es6' )
        .pipe( babel() )
        .pipe( gulp.dest('dist') )
});

gulp.task( 'uglify', () => {
    return gulp.src( 'dist/PhoneNumber.js' )
        .pipe( uglify() )
        .pipe( rename({
            suffix: '.min'
        }) )
        .pipe( gulp.dest('dist') );
});

gulp.task( 'default', gulp.series('babelize', 'uglify') );

gulp.task( 'test', () =>
        gulp.src( 'test/general.js', {read: false} )
            .pipe( mocha({reporter: 'spec'}) )
);

