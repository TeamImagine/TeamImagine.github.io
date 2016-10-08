var gulp = require('gulp'),
	clean = require('gulp-clean');

gulp.task('clean', function () {
	return gulp.src([
  		'assets/lib/*.css',
  		'assets/lib/moment',
  		'assets/lib/nunjucks'
  	], {read: false}).pipe(clean());
});

gulp.task('dest', ['clean'], function(){
	gulp.src([
		'node_modules/*.css/*.css',
		'node_modules/*/LICENSE*',
	]).pipe(gulp.dest('assets/lib'));
	gulp.src([
		'node_modules/medium-editor/dist/*/medium-editor.min.*'
	]).pipe(gulp.dest('assets/lib/medium-editor'));
	gulp.src([
		'node_modules/moment/min/moment-with-locales.min.js'
	]).pipe(gulp.dest('assets/lib/moment'));
	gulp.src([
		'node_modules/nunjucks/browser/nunjucks.min.js'
	]).pipe(gulp.dest('assets/lib/nunjucks'));
});

gulp.task('default', ['dest']);