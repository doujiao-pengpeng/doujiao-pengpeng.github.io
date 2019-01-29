---
title: tornado 二三事
date: 2018-12-06 13:06:29
tags:
  - python
  - tornado
categories:
  - python
---

## 前言
> 日常中使用tornado开发，有时候对一些概念不清晰，需要翻一翻文档，这里记录下一些杂项。

一个web框架最基础的功能应该是接受http请求，根据url（路由）分发到不同的处理程序中，经过处理程序处理后（可能牵扯到数据库的东西），返回结果。所以遇到一个web框架一般关注以下几点：
- 路由系统
- http解析系统
- 配置系统
- 数据库ORM

## tornado 结构

### 启动
通过向`tornado.web.Application`构造器传入全局配置（如路由表，某些开关）自定义化启动一个服务器，调用listen方法监听某个端口，整个服务算是起来了。当请求到达时根据配置的路由表，进入不同的`RequestHandler`的子类进行处理。

为什么是`RequestHandler`的子类，这里可以将`RequestHandler`类理解为一个通用的handler,通过改写其中定义的一些方法可以实现不同的自定义handler,从而实现不同的处理逻辑。

整个tornado应用是由一个或多个`RequestHandler`子类组成。下面是一个最小化的demo:
```python
import tornado.ioloop
import tornado.web

class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.write("Hello, world")

def make_app():
    return tornado.web.Application([
        (r"/", MainHandler), # urlSpec Dict或truple
    ])

if __name__ == "__main__":
    app = make_app()
    app.listen(8888)
    tornado.ioloop.IOLoop.current().start() # 样板代码
```

## 配置多域名
最初我的结构是这样的，前端代码有两份，分别生成了两个dist: dist1,dist2。正常的要区分两个东西可能会这样`www.xxx.com/dist1/xxxx`, `www.xxx.com/dist2/xxxx`。这种通过使用命名空间的方式会增加url的长度，不够优雅。如果我们有多个域名或者子域名，我们可能想要这样：`www.a.xxx.com/xxxx`,`www.b.xxx.com/xxxx`或者`www.xxx.com/xxxx`,`www.b.xxx.com/xxxx`来分别对应刚才的两种方式。

> 我们支持虚拟主机通过 add_handlers 方法, 该方法带有一个主机 正则表达式作为第一个参数:
>```python
> application.add_handlers(r"www\.myhost\.com", [
>    (r"/article/([0-9]+)", ArticleHandler),
> ])
> ```

通过这个我们可以实现了，参考文章[Tornado服务器中绑定域名、虚拟主机的方法，tornado虚拟主机](http://www.bkjia.com/Pythonjc/867714.html)

以下是我的实现
```python
# coding:utf-8

import tornado.ioloop
import tornado.web

class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.write("Hello, world")

class DataHandler(tornado.web.RequestHandler):
    def get(self):
        self.write("Hello, data")

# 启动服务
def start_app():
    return tornado.web.Application([
        (r"/", MainHandler), # urlSpec Dict或truple
    ])

# 配置多域名
def setMutiDomain(app):
    app.add_handlers(r"www.my.com", [
        (r"/", DataHandler)
    ])

if __name__ == "__main__":
    app = start_app()
    setMutiDomain(app)
    app.listen(8888)
    tornado.ioloop.IOLoop.current().start() # 样板代码
```
