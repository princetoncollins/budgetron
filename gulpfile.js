'use strict';
// /////////////////////////////////////////////////////////
// Required
// /////////////////////////////////////////////////////////

var gulp = require('gulp'),
	sass = require('gulp-sass'),
	uglify = require('gulp-uglify'),
	cleanCss = require('gulp-clean-css'),
	minifyCss = require('gulp-minify-css'),
	prettyError = require('gulp-prettyerror'),
	compass = require('gulp-compass'),
	rename = require('gulp-rename'),
	plumber = require('gulp-plumber'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload,
	del = require('del');

// /////////////////////////////////////////////////////////
// Default Tasks
// /////////////////////////////////////////////////////////

gulp.task('default', ['compass', 'html', 'browser-sync', 'watch']);

// /////////////////////////////////////////////////////////
// Watch Tasks
// /////////////////////////////////////////////////////////

// Task to watch for changes made in CSS and HTML.
gulp.task('watch', function() {
	gulp.watch('public/styles/scss/**/*.scss', ['compass']);
	gulp.watch('public/**/*.html', ['html']);
});

// /////////////////////////////////////////////////////////
// Javascript Tasks
// /////////////////////////////////////////////////////////

gulp.task('scripts', function() {
	gulp.src(['public/js/**/*.js', '!public/js/**/*.min.js'])
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
		.pipe(gulp.dest('public/js'));
})

// /////////////////////////////////////////////////////////
// Compass / Sass Tasks
// /////////////////////////////////////////////////////////

//Reloads changes made to the CSS in the browser in live.
gulp.task('compass', function() {
	gulp.src('public/styles/scss/style.scss')
		.pipe(plumber())
		.pipe(compass({
			config_file: './config.rb',
			sass: 'public/styles/scss',
			css: 'public/styles/css',
			require: ['susy']
		}))
		.pipe(gulp.dest('public/styles/css'))
		.pipe(reload({stream: true}));
});

// gulp.task('styles', function() {
// 	return gulp
// 		.src('public/style/scss/style.scss')
// 		.pipe(sass())
// 		.pipe(gulp.dest('public/css'));
// });

// /////////////////////////////////////////////////////////
// HTML Tasks
// /////////////////////////////////////////////////////////


// Reloads changes made to the HTML in the browser in live.
gulp.task('html', function() {
	gulp.src('public/**/*.html')
	.pipe(reload({stream: true}));
});

// /////////////////////////////////////////////////////////
// Browser-Sync Tasks
// /////////////////////////////////////////////////////////

// Task to run dev server for development.
gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: "./public/"
		}
	})
});

// Task to run build server for testing final app.
gulp.task('build:serve', function() {
	browserSync({
		server: {
			baseDir: "./public/"
		}
	})
});

// /////////////////////////////////////////////////////////
// Build Tasks
// /////////////////////////////////////////////////////////

// These tasks will be manually fired.

// Clear out all files and folders from build folder.
gulp.task('build:cleanfolder', function(cb) {
	del([
		'build/**'
	], cb);
});

// Create build directory for all files. 
gulp.task('build:copy', function() {
	return gulp.src('public/**/*/')
	.pipe(gulp.dest('build'));
});


// Remove unwanted build files and list all files and directories here that you don't want to include.
gulp.task('build:remove', ['build:copy'], function(cb) {
	del([
		'build/styles/scss'
	], cb);
});

gulp.task('build', ['build:copy', 'build:remove']);