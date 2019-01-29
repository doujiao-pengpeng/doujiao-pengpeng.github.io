---
title: sentry
date: 2018-12-13 20:17:55
tags:
  - 前端
---
## 前端错误监控
对于前端代码质量，有一个很好的监控和上报至关重要。
准备写四篇
- 错误监控基础篇
- 性能监控基础篇
- 错误上报与sentry基础篇
- 各场景实战篇

## 使用sentry

### sentry workflow
如果你是一个开发者，你的工作流可能是这样的：
设计 -> 开发 -> 测试 -> CI/CD -> 发现问题 -> 定位问题 -> 修复

很多工具帮助我们开发，但是部署后的过程（发现、定位、解决问题）依然很痛苦。当在生产环境汇总引入一个bug时，如何快速收到bug警报；怎样估计影响和紧急性；怎样快速定位到问题根本原因，提交修复版本后怎样知道是否已经解决了问题。

sentry通过整合已有工作流帮助我们解决这些问题，引入sentry后，我们的工作流可能是这样：
写代码 -> 部署代码 （有一个bug: 空指针异常） -> 用户触发bug -> sentry立即收集并通过各种预置方式通知你

这个通知带你去一个仪表板,给你必要的背景下快速分流问题——频率,用户的影响,影响代码的一部分,和团队成员是一个可能的所有者的问题。然后告诉你详细的信息来帮助您调试堆栈跟踪、堆栈本地人,之前的事件,可能导致问题的提交,自定义数据捕获时的错误。你也可以自动开始跟踪这个问题你的项目管理工具。

确认您提交的问题修复后库。此时,您不再需要照顾修复因为哨兵手表自动提交,因为他们去解决这个问题的时候部署。如果问题返回后,标记为回归和你再次通知。

同时,遇到错误的用户甚至不需要发送你一个模糊的”你的网站坏了!”的信息来帮助你修复bug。值得注意的是,虽然,哨兵也可以为这些用户提供友好的方式发送额外的信息可能会帮助你更快解决问题。

sentry是非常灵活的，每个项目的环境可能是不同的，每个人都可以通过一些稍微不同的配置来配置最适合他们的特定环境，这是sentry工作流的关键。

### 起步
#### SDK集成
sentry是一个C/S架构，整合sentry SDK到应用中，当发生error时，发送error信息到sentry服务器。由于语言或者框架的不同，错误上报可能完全是自动的或者自己指定特定的错误。比如：
- JavaScript全局未捕获错误:
```js
Raven.config('<your project specfic key, called a DSN>').install()
Raven.context(function () {
    initMyApp();
});
```
- 捕获特定错误
```js
try {
    // Do something that should not raise an exception
} catch(e) {
    Raven.captureException(e)
}
```
也可以发送自定义数据来检索和分类错误。
```js
Raven.captureException('hello world!', {tags: {
    locale: 'en-us'
}});
```

一旦sentry收到错误，在dashboard上可以看到：
![sentry dashboard](https://blog.sentry.io/img/post-images/sentry-workflow/needs-triage.png)

注意相同的错误类型被分组和排序，以及在给定时间内的频率和受影响的用户数量。搜索栏允许你过滤等属性问题的频率、年龄、用户受到影响,分辨率的地位,环境,或任何其他自定义数据发送的错误。这些搜索可以保存,这样你很快就会到过滤视图。

点击一个问题需要你的页面可以帮助你找到根源。最重要的是堆栈跟踪显示函数调用的顺序导致错误。对于支持它的语言,你也可以看到局部和全局变量的值为单独的堆栈帧。

接下来是面包屑（breadcrumbs)部分，错误发生前发生的一系列事件。这些事件类似于传统日志，但是有能力记录更加丰富的结构数据。当哨兵与web框架集成时,面包屑会自动记录像数据库调用或网络请求这样的事件,但你也可以在代码中手动标记感兴趣的事件,他们将会出现在一个后续问题的面包屑序列中。
最后,获取关于这个问题的其它结构化数据：
![](https://blog.sentry.io/img/post-images/sentry-workflow/more-data.png)

任何记录为一个标签时的异常可以作为一个过滤器。这是有用的,以确定哪些错误是来自一个特定的机器,浏览器版本等。你也可以看到标签的分布为一个问题了解的相关。


> sentry是一个开源错误监控平台，帮助你在真实环境中监控和修复冲突。

创建一个project
![创建一个project](http://pimt13n7x.bkt.clouddn.com/markdown-img-paste-20181213203456944.png)
![](http://pimt13n7x.bkt.clouddn.com/markdown-img-paste-20181213203732415.png)


### sourcemap管理

#### 准备工作：
安装sentry-cli
```shell
npm i -g @sentry/cli
```
运行`sentry-cli`查看版本及说明：
![sentry-cli](http://pimt13n7x.bkt.clouddn.com/markdown-img-paste-20181214212838956.png)
登录：
![login](http://pimt13n7x.bkt.clouddn.com/markdown-img-paste-20181214213404233.png)
