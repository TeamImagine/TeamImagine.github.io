var gulp = require('gulp'),
	clean = require('gulp-clean');

gulp.task('clean', function () {
	return gulp.src([
  		'assets/lib/*.css'
  	], {read: false}).pipe(clean());
});

gulp.task('dest', ['clean'], function(){
	gulp.src([
		'node_modules/*.css/*.css',
		'node_modules/*.css/LICENSE*'
	]).pipe(gulp.dest('assets/lib'));
});

gulp.task('default', ['dest']);