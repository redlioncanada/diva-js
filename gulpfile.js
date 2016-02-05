var gulp        = require('gulp');
var uglify      = require('gulp-uglify');
var rename		= require('gulp-rename');

gulp.task('transpile', function() {
	gulp.src('app/*.js')
		.pipe(gulp.dest('build'))
		.pipe(uglify({mangle:false}))
		.pipe(rename({'suffix':'.min'}))
		.pipe(gulp.dest('build'));
})

gulp.task('default', ['transpile'], function() {
	gulp.watch('app', ['transpile']);
});