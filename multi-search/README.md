# Multi Search

Multi Search - 一个可以同时搜索多个搜索引擎并将结果并排显示的油猴脚本 | 谷歌百度同时搜索并排显示

目前支持:
- 谷歌 + 百度
- 百度 + 谷歌
- 必应 + 百度

可以较轻松地添加多个搜索引擎, 比如 谷歌 + 百度 + StackOverflow + 知乎 一起搜索并显示在一个页面上.

# 效果示例

## 谷歌 + 百度

![google_baidu](https://github.com/smallx/monkey-scripts/raw/master/multi-search/images/google_baidu.gif)

## 百度 + 谷歌

![baidu_google](https://github.com/smallx/monkey-scripts/raw/master/multi-search/images/baidu_google.gif)

# 安装

- [Greasy Fork](https://greasyfork.org/zh-CN/scripts/407794)
- [GitHub](https://github.com/smallx/monkey-scripts/raw/master/multi-search/multi-search.user.js)

## Opera注意事项

Opera浏览器中需要勾选Tampermonkey插件的"允许访问搜索页面结果"选项, 否则该脚本不能生效, 如下:

![opera](https://github.com/smallx/monkey-scripts/raw/master/multi-search/images/opera.png)

# 推荐脚本

Multi Search 配合如下油猴脚本使用效果更佳:

## Quick Search - 快速搜索

[Quick Search - 快速搜索](https://greasyfork.org/zh-CN/scripts/408250)

我自己开发的, 无缝集成 划词搜索 + 快捷键搜索 + 搜索跳转 + 网址导航, 享受丝滑搜索体验.

## Super_preloaderPlus_one_改

[Super_preloaderPlus_one_改](https://greasyfork.org/zh-CN/scripts/33522)

预加载并自动翻页, 很好很强大.

## anti-redirect

[anti-redirect](https://greasyfork.org/zh-CN/scripts/11915)

去除百度/谷歌/知乎/简书等的站外链接跳转, 直达网址.

# 更新日志

## v1.3 20200812
- fix: run-at为document-start时, 偶尔不work的情况.

## v1.2 20200806
- 优化调整右侧搜索引擎坐标.

## v1.1 20200729
- 在document-start时启动以隐藏搜索引擎右边栏, 避免右边栏闪现又消失.
- 支持添加的搜索引擎窗口最大化, 以便在谷歌出现验证码的时候方便操作.
- 其他更新优化.

## v1.0 20200727
初版发布, 支持:
- 谷歌 + 百度
- 百度 + 谷歌
- 必应 + 百度

# TODO

- ~~使脚本能够在document-start时运行, 加快其他搜索引擎结果呈现速度~~. 目前只是在document-start时让右侧栏隐藏, 避免右侧栏闪现又消失. document-start时就搜索其他搜索引擎然后在DOMContentLoaded时显示其他引擎结果不太好做, 就先不做了.
- ~~iframe中登陆状态问题, 以减少iframe中的Google验证码频率~~. iframe中, 百度是会自动登录的, 但谷歌由于安全策略限制不会自动登录, 而且难以绕过此限制. 而没登录时, 谷歌经常会出现验证码判断是否是机器人, 此处先加一个最大化按钮, 当遇到这种情况时, 点击最大化就可以看到并操作验证码了.

# 问题反馈

欢迎在GitHub Issue中反馈问题.

GitHub地址: https://github.com/smallx/monkey-scripts/tree/master/multi-search
