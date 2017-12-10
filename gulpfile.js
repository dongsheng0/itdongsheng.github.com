
var gulp=require('gulp'),

    concat=require('gulp-concat');
var uglifycss = require('gulp-uglifycss');

//配置任务
gulp.task('concat:css',function(){
    //具体任务流程
    gulp.src('./css/*css')
        .pipe(concat('main.css'))
        .pipe(gulp.dest('./dest/css'))
        .pipe(uglifycss())
        .pipe(gulp.dest('./dest/css'));
});



//默认任务
gulp.task('default',['concat:css']);