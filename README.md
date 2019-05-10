## 项目说明：
#### 1、gulp4.0之后跟只有有些差别，如写法上的，还有一些插件使用上的，所以我用的固定版本的3.9.1。
#### 2、利用gulp对项目进行代码压缩，并进行防缓存处理。
##### 2.1、在项目src中写开发代码，写完代码后命令行输入gulp,生成的压缩文件在dist文件夹中。
##### 2.2、压缩的内容有：html、js、css、img
##### 2.3、压缩后的带MD5后缀的js、css自动完成打包后html文件中更换

```
gulp
```

##### 2.4、也可以单独输入独立命令，如gulp clear,具体项目中都有哪些命令，可以查看gulpfile.js


```
gulp clean
gulp htmlmin
gulp css
gulp js
gulp imgmove
gulp imgemin
...
```
