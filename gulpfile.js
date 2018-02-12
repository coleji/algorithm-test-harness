var gulp  = require('gulp');
var fs = require('fs');
var path = require('path');
var concat = require('gulp-concat');

const DIST_DIR = 'dist';

function build() {
	gulp.src(getFiles([
		"lib/consoleStatic.js",
		"src/console/consoleHarness.js",
		"src/main.js"
	])).pipe(concat("console.js"))
		.pipe(gulp.dest(DIST_DIR))

	gulp.src(getFiles([
		"src/mocha/alternatives.js",
		"lib/mochaStatic.js",
		"src/main.js",
		"src/mocha/mochaHarness.js"
	])).pipe(concat("test.js"))
		.pipe(gulp.dest(DIST_DIR))
}

gulp.task('watch', function() {
	build();
	gulp.watch('src/**', ['build'])
	gulp.watch('lib/**', ['build'])
})

gulp.task('build', function() {
	build();
})

function getFiles(fileList) {
	return fileList.filter(fs.existsSync)
}
