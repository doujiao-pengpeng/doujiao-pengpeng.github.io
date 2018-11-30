---
title: 使用hexo搭建blog
date: 2018-11-23 09:44:19
tags:
---
## 初体验hexo
1. 安装hexo, 初始化一个目录并安装依赖，运行一个服务器
```shell
cnpm install hexo-cli -g
hexo init blog
cd blog
cnpm install #
hexo server # 运行
```
2. 直接写一个文件
```shell
hexo new [layout] "my first hexo blog"
```

3. 安装主题
```shell
git clone https://github.com/iissnan/hexo-theme-next themes/next
```
4. 部署到github
首先需要在自己的github上生成一个[repositorie_name].github.io的**repositorie**，并配置其github-pages.

修改配置文件_config.yml
```yml
# Deployment
## Docs: https://hexo.io/docs/deployment.html
deploy:
  type: git
  repo: https://github.com/username/repositorie_name.github.io.git
```
运行部署命令
```shell
hexo deploy

# 配置到package.json
# "deploy": "hexo clean && hexo g && hexo d",
npm run deploy
```
5 访问
浏览器打开 https://repositorie_name.github.io/

### 图片问题
写bolg自然少不了图片了，这里需要熟悉下md(markdown)文件引用图片的两种方式，内联和引用，具体使用方式可以查看[markdown语法](https://coding.net/help/doc/project/markdown.html)，下面是个例子。
```markdown
内联方式：
  ![Alt text](/path/to/img.jpg)
  或
  ![Alt text](/path/to/img.jpg "Optional title")

引用方式：
![Alt text][id]  使用

[id]: url/to/image "Optional title attribute" 一般放在底部作为参考链接
```

hexo中插入图片的方式也是在markdown语法的基础上，我们要注意的就是hexo的图片路径如何填写,参考文章[[4]](https://yanyinhong.github.io/2017/05/02/How-to-insert-image-in-hexo-post/)
1. 本地引用（绝对/相对）
2. CDN引用

为了便捷自然需要自动的插入图片，这里可以参考这篇文章图片部分。

参考资源
[1]: [使用 Hexo + Github 搭建博客教程，支持在新电脑同步管理项目和主题](https://www.jianshu.com/p/ae4f485ab3b3)
[2]: [使用Hexo搭建个人Github博客](https://zhuanlan.zhihu.com/p/34379150)
[3]: [如何写一个自己的hexo主题](https://www.jianshu.com/p/a142eb105279)
[4]: [Hexo博客搭建之在文章中插入图片](https://yanyinhong.github.io/2017/05/02/How-to-insert-image-in-hexo-post/)
