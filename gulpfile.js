/**
 * ------------------------------------------
 * gulp配置文件
 * @version  1.0
 * @author   henry
 * ------------------------------------------
 */
var gulp        = require('gulp'),
    less        = require('gulp-less'),         //编译less
    uglify      = require('gulp-uglify'),       //压缩js
    concat      = require('gulp-concat'),       //文件合并  
    rename      = require('gulp-rename'),       //文件更名  
    notify      = require('gulp-notify'),       //提示信息  
    cssmin      = require('gulp-clean-css'),    //压缩css
    autoprefix  = require('gulp-autoprefixer'), //处理css3前缀
    browserSync = require('browser-sync');      //浏览器实时测试工具
    
/**
 * 编译LESS
 */
gulp.task('CompileLESS', function() {
    return gulp.src('src/less/fui.less')
               .pipe(less())
               .pipe(autoprefix())
               .pipe(gulp.dest('dev/css'))
               .pipe(notify({ message: 'LESS 编译完成!' }));
});

/**
 * 压缩重命名CSS
 */
gulp.task('CompressCSS', function() {
    return gulp.src('dev/css/fui.css')
               .pipe(cssmin())
               .pipe(rename({suffix: '.min'}))
               .pipe(gulp.dest('dist/css'))
               .pipe(notify({ message: 'CSS 压缩完成!' }));
});

/**
 * 压缩重命名JS
 */
gulp.task('CompressJS', function() {
    return gulp.src('src/js/*.js')
               .pipe(uglify())
               .pipe(rename({suffix: '.min'}))
               .pipe(gulp.dest('dist/js'))
               .pipe(notify({ message: 'JS 压缩完成!' }));     
});

/**
 * gulp监听
 */
gulp.task('watch', function() {
    browserSync.init({
        files: ['dist/css/*.css', 'dist/js/*.js', 'views/index.html', 'views/*/*.html'],
        server: {
            baseDir: './'
        }
    });
    
    /**
     * 监听LESS
     */
    gulp.watch('src/less/*.less', ['CompileLESS']);
    
    /**
     * 监听CSS
     */
    gulp.watch('dev/css/*.css', ['CompressCSS']); 
    
    /**
     * 监听JS
     */
    gulp.watch('src/js/*.js', ['CompressJS']);  
})

/**
 * gulp默认任务
 */
gulp.task('default', ['watch']);
