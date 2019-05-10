var gulp = require('gulp'),
    gulpSequence = require('gulp-sequence'),    //同步执行任务
    cssUglify = require('gulp-minify-css'),//css压缩
    uglify = require('gulp-uglify'),    //js压缩
    imageMin = require('gulp-imagemin'),    //压缩图片
    htmlMin = require('gulp-htmlmin'),   //压缩html
    clean = require('gulp-clean'),    //清空文件夹
    rev = require('gulp-rev'),    //更改版本名 md5后缀
    replace = require('gulp-replace'),
    revCollector = require('gulp-rev-collector');  //gulp-rev 的插件，用于html模板更改引用路径

var srcRoute = 'src';//文件的目录
var outRoute = 'dist';//打包输出的目录

//清空文件夹
gulp.task('clean', function(){
    return gulp.src(outRoute, {read:false})
        .pipe(clean());
});

//压缩css、增加版本号
gulp.task('css', function(){
    return gulp.src(srcRoute + '/css/**/*.css')
        .pipe(cssUglify())
        .pipe(rev()) //更改版本名 md5后缀
        .pipe(gulp.dest(outRoute+'/css'))
        .pipe(rev.manifest())  //返回json 配置文件，方便  rev-controller 进行替换
        .pipe(gulp.dest(outRoute+'/rev/css'));  //输出配置json
});

//压缩js、增加版本号
gulp.task('js', function(){
    return gulp.src(srcRoute + '/js/**/*.js')
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest(outRoute+'/js'))
        .pipe(rev.manifest())
        .pipe(gulp.dest(outRoute+'/rev/js'));
});

//html 压缩处理（添加版本号） main.html 除外
gulp.task('htmlmin',function(){
    return gulp.src(srcRoute + '/**/*.html')
        .pipe(rev())
        .pipe(htmlMin({
            collapseWhitespace : true,  //删除空格
            removeComments : true       //删除注释
        }))
        .pipe(gulp.dest(outRoute))
        .pipe(rev.manifest())//返回json 配置文件，方便  rev-controller 进行替换
        .pipe(gulp.dest(outRoute+'/rev/html'));
});


//image 把图片导入打包文件夹(这种可以不压缩，直接导入文件)
gulp.task('imgmove', function () {
    gulp.src(srcRoute + '/img/**/*.{png,jpg,gif,ico}')
        .pipe(gulp.dest(outRoute+'/img'));
});


// 压缩图片，需要单独输入命令
gulp.task('imagemin',function(){
    // 1. 找到图片
    gulp.src(srcRoute + '/img/*.*')
        // 2. 压缩图片
        .pipe(imageMin({progressive: true}))
        // 3. 另存图片
        .pipe(gulp.dest(outRoute+'/img'))
})



//改变html、js、css的资源引用的链接
gulp.task('rev', function(){//对压缩处理后的html资源以及js资源进行 url替换（来源于json）
    return gulp.src([outRoute+'/**/*.html',
                     outRoute+'/**/*.js',
                     outRoute+'/**/*.css'])
        .pipe(revCollector({
            replaceReved: true,//允许替换, 已经被替换过的文件
        }))
        .pipe(gulp.dest(outRoute));
});


//Html替换css、js文件版本
gulp.task('revHtmlCss', function () {
    return gulp.src([outRoute + '/rev/css/*.json', outRoute + '/**/*.html'])
        .pipe(revCollector())                         //替换html中对应的记录
        .pipe(gulp.dest(outRoute));                     //输出到该文件夹中
});
gulp.task('revHtmlJs', function () {
    return gulp.src([outRoute + '/rev/js/*.json', outRoute + '/**/*.html'])
        .pipe(revCollector())
        .pipe(gulp.dest(outRoute));
});




//按顺序执行任务
gulp.task('default', ['clean'], gulpSequence('imagemin', 'css', 'js','htmlmin', 'rev', 'revHtmlCss', 'revHtmlJs'));
