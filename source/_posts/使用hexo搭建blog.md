---
title: 使用hexo搭建blog
date: 2018-11-23 09:44:19
tags:
---
## 使用hexo搭建博客
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
