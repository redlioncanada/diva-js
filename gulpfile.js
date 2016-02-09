var gulp        = require('gulp');
var uglify      = require('gulp-uglify');
var rename		= require('gulp-rename');
var jshint		= require('gulp-jshint');

gulp.task('transpile', function() {
	gulp.src('app/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(gulp.dest('build'))
		.pipe(uglify())
		.pipe(rename({'suffix':'.min'}))
		.pipe(gulp.dest('build'));
});

gulp.task('release', function() {
	gulp.src('app/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(gulp.dest('release'))
		.pipe(uglify())
		.pipe(rename({'suffix':'.min'}))
		.pipe(gulp.dest('release'));
});

gulp.task('default', ['transpile'], function() {
	gulp.watch('app/*', ['transpile']);
});