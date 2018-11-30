---
title: 使用rollup
date: 2018-11-27 19:58:10
tags:
---
## 安装rollup
准备写一个上传库，一切都按照标准来。关于模块打包这块使用的是rollup。
```js
cnpm install --global rollup
```

使用上跟webpack基本一致：
1. 使用方式：命令行和配置文件
2. 也是需要指定入口文件和输出文件，但是可以指定输出文件类型。



## 配置文件
```js
cnpm install --save-dev rollup-plugin-buble // 类似于babel，但是配置更少
```


## 安装插件
安装常用插件列表
```js
  // 作用看下面，已安装阿里源
  cnpm install --save-dev rollup-plugin-buble
  cnpm install --save-dev rollup-plugin-node-resolve
  cnpm install --save-dev rollup-plugin-commonjs
  cnpm install --save-dev rollup-plugin-uglify
  cnpm install --save-dev rollup-plugin-serve
  cnpm install --save-dev rollup-plugin-livereload
```

使用
```js
// like babel
const buble = require('rollup-plugin-buble')
// 库别名，查看文档，很有意思
const alias = require('rollup-plugin-alias')

// 本地模块解析第三方模块，commonjs模块转Es6模块
const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs');

// js压缩
const uglify = require('rollup-plugin-uglify')

// 本地服务 + 实时刷新
const serve = require('rollup-plugin-serve')
const livereload = require('rollup-plugin-livereload')
```
