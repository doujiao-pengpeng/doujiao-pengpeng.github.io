---
title: 持续打造Atom编写markdown
date: 2018-11-23 10:17:34
tags:
---
> 一直以来都很喜欢使用Atom来写markdown文件，记录下打造过程，同时与hexo进行整合，工欲善其事必先利其器，开整。

## 1. 图片相关
github一个仓库的容量有限，最好上传到图床，且速度更快，选的是七牛云存储。

### 1.1 准备七牛环境
1. 创建账号
2. 创建一个新的对象存储空间，这里是images,华南地区
3. 准备好下面几个信息
  3.1. 七牛密钥（个人中心查看）
  3.2. bucket(刚才填的存储空间名称 images)
  3.3. domain(图片外链： 内容管理，外链默认域名)
  3.4. uphost(对应所选地区的客户端上传地址)

![创建对象存储空间](http://pimt13n7x.bkt.clouddn.com/markdown-img-paste-20181123141154394.png "创建对象存储空间")

![图片外链](http://pimt13n7x.bkt.clouddn.com/markdown-img-paste-20181123142642281.png "domain")

![存储区域](http://pimt13n7x.bkt.clouddn.com/markdown-img-paste-20181123142734489.png "存储区域")



### 1.2 安装Atom插件
安装Markdown-img-paste插件后，设置配置，下面的一些选项
![配置](http://pimt13n7x.bkt.clouddn.com/markdown-img-paste-20181123141934478.png)



参考链接
[1]: [使用Atom打造无懈可击的Markdown编辑器](https://www.cnblogs.com/fanzhidongyzby/p/6637084.html)
