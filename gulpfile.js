var gulp        = require('gulp'),
    less        = require('gulp-less'), //编译less
    uglify      = require('gulp-uglify'), //压缩js
    jshint      = require('gulp-jshint'), //js检测 
    concat      = require('gulp-concat'), //文件合并  
    rename      = require('gulp-rename'), //文件更名  
    notify      = require('gulp-notify'); //提示信息  
    cssmin      = require('gulp-clean-css'), //压缩css
    autoprefix  = require('gulp-autoprefixer'), //处理css3前缀
    browserSync = require('browser-sync'); //浏览器实时测试工具
    
