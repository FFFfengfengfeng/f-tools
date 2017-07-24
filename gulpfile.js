var gulp        = require('gulp'),
    less        = require('gulp-less'), //编译less
    coffee      = require('gulp-coffee'), //编译coffee
    coffeelint  = require('gulp-coffeelint')//检查coffee语法
    uglify      = require('gulp-uglify'), //压缩js
    jshint      = require('gulp-jshint'), //js检测 
    concat      = require('gulp-concat'), //文件合并  
    rename      = require('gulp-rename'), //文件更名  
    notify      = require('gulp-notify'); //提示信息  
    cssmin      = require('gulp-clean-css'), //压缩css
    autoprefix  = require('gulp-autoprefixer'), //处理css3前缀
    browserSync = require('browser-sync'); //浏览器实时测试工具
//  gutil       = require "gulp-util", //一个工具库
//  plumber     = require "gulp-plumber", //自动处理全部错误信息防止因为错误而导致 watch 不正常工作


//编译less添加浏览器前缀
gulp.task('less', function() {
    return gulp.src('src/less/fd.less')
            .pipe(less())
            .pipe(autoprefix())
            .pipe(gulp.dest('dev/css'))
});

//压缩、重命名css
gulp.task('cssmin', function() {
    return gulp.src('dev/css/*.css')
            .pipe(rename({suffix: '.min'}))
            .pipe(notify({ message: 'rename task ok' }))
            .pipe(cssmin())
            .pipe(gulp.dest('dist/css'))
            .pipe(notify({ message: 'cssmin task ok' })); 
});

//编译,检查coffee
gulp.task('coffee', function() {
    return gulp.src('src/coffee/fd.coffee')
            .pipe(coffeelint())
            .pipe(coffeelint.reporter())
            .pipe(notify({ message: 'coffeelint task ok' }))
            .pipe(coffee())
            .pipe(gulp.dest('dev/js'))
            .pipe(notify({ message: 'coffee task ok' }));
});

//检查js
gulp.task('lint', function() {
    return gulp.src('dev/js/*.js')  
            .pipe(jshint())  
            .pipe(jshint.reporter('default'))  
            .pipe(notify({ message: 'lint task ok' }));  
});

//压缩js
gulp.task('uglify', function() {
    return gulp.src('dev/js/*.js')
            .pipe(uglify())
            .pipe(rename({suffix: '.min'}))
            .pipe(gulp.dest('dist/js'))
            .pipe(notify({ message: 'uglify task ok' }));
});

//监听
gulp.task('watch', function() {
    browserSync.init({
        files: ['dist/css/*.css', 'dist/js/*.js', 'views/*.html', 'views/*/*.html', 'views/*/*/*.html'],
        server: {
            baseDir: './'
        }
    });
    
    // Watch .coffee files
    gulp.watch('src/coffee/fd.coffee', ['coffee']);  
   
    // Watch .js files  
    gulp.watch('dev/js/*.js', ['lint', 'uglify']);  
    
    // Watch .less files
    gulp.watch('src/less/*.less', ['less']);  
   
    // Watch .css files  
    gulp.watch('dev/css/*.css', ['cssmin']);
    
//  gulp.watch('dist/css/*.css').on('change', browserSync.reload);
//  gulp.watch('dist/js/*.js').on('change', browserSync.reload);
});

//默认任务
gulp.task('default', ['watch']);
