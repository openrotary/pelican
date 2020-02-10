![image](https://github.com/openrotary/pelican/blob/master/docs/images/logo.png)

# 介绍

Pelican 是一款以 Vue 组件为单位、针对性较强的高效代码生成器。其本质和绝大多数代码生成器都不一样，主要有以下特点：

-   它追求的并非是“不写代码”，而是“用更快的速度写代码”——用抽象模型的方式代替线性的键盘输入。
-   它专注于 HTML 和 CSS 部分。
-   较弱的入侵性确保它能轻易与任何一个 Vue 工程相集成，无论是全新的工程还是开发到一半的工程。

## 安装

```bash
# install
$ yarn global add @openrotary/pelican
```

## 升级

近期 Pelican 需要频繁迭代，因此在这里附上升级方式。

```bash
# upgrade
$ yarn global upgrade @openrotary/pelican
```

## 启动

```bash
$ cd myProject
$ pelican ui
```

运行`pelican ui`后，在浏览器打开`localhost:3022`, 即可看到代码生成器的工作界面。
