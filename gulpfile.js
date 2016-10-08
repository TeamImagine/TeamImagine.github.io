var gulp = require('gulp'),
	clean = require('gulp-clean');

gulp.task('clean', function () {
	return gulp.src([
  		'assets/lib/*.css',
  		'assets/lib/moment'
  	], {read: false}).pipe(clean());
});

gulp.task('dest', ['clean'], function(){
	gulp.src([
		'node_modules/*.css/*.css',
		'node_modules/*.css/LICENSE*',
		'node_modules/moment/min/moment-with-locales.min.js'
	]).pipe(gulp.dest('assets/lib'));
	gulp.src([
		'node_modules/moment/LICENSE',
		'node_modules/moment/min/moment-with-locales.min.js'
	]).pipe(gulp.dest('assets/lib/moment'));
});

gulp.task('default', ['dest']);