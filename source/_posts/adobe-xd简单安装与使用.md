---
title: adobe xd简单安装与使用
date: 2018-12-07 10:38:40
tags:
  - 设计
  - 原型
categories:
  - 设计
---

> 闲来无事，搞搞原型，把控整体，一个总是想搞产品和UI的前端。

## 安装与XD 闪退解决
安装通过creative cloud安装就可以了。安装之后win10一直闪退，找个各种方法，逐渐是解决了，记录下。

### 尝试一
> 下载【vc2018】安装一下，再重启电脑就可以使用了。

原文链接：[Win10 Adobe XD打开后白屏，3秒后闪退的解决方法](http://www.sucaijishi.com/2018/articles_0806/257.html)

好吧没什么用。

### 尝试二
> 更新win10到最新版

使用[win10更新助手](https://www.microsoft.com/zh-cn/software-download/windows10)更新到最新版，重启。

依然fail。

### 尝试三

> 你是不是破解了其它abobe产品？

不嫌麻烦的把其它工具都给卸载了。又重装了次XD。

依然fail。

### 尝试四
[adobe xd windows版 闪退打不开终极解决办法](https://zhuanlan.zhihu.com/p/51292210)

提到了两步：
#### 第一步:
> 使用DirectXRepairV3.7这款软件修复VC组件。
原文链接：https://tieba.baidu.com/p/5961511474
软件下载地址：http://xiazai.zol.com.cn/detail/44/430281.shtmlbai
照着原文链接做就行了。


![运行修复工具](http://pimt13n7x.bkt.clouddn.com/markdown-img-paste-2018120710553026.png)


#### 第二步：

ps：其实做完这步就可以打开XD了，但是一直白屏，只是不闪退了,可以先试试第三步，不行再搞第二步。

> 第二步，修改注册表
原文链接：https://tieba.baidu.com/p/5870010680

操作步骤：
1. 打开注册表 win + R 运行regedit
2. 找到HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Policies\Associations
3. 如果没有的 Associations 则在 Policies 上右击，选择新建-项
4. 右侧新建 DWORD：BlockProtocolElevation,值默认为0
5. 注销或重启系统

![修改注册表](http://pimt13n7x.bkt.clouddn.com/markdown-img-paste-20181207105405997.png)

#### 第三步：
做到这依然还是一直白屏，后面我重装了XD。然后就惊喜地打开了XD，
![XD 界面](http://pimt13n7x.bkt.clouddn.com/markdown-img-paste-20181207105921349.png)
