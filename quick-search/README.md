# Quick Search

Quick Search - 快速搜索. 无缝集成 划词搜索 + 快捷键搜索 + 搜索跳转 + 网址导航, 享受丝滑搜索体验.

![quick-search](https://github.com/smallx/monkey-scripts/raw/master/quick-search/images/quick-search-1.gif)

![quick-search](https://github.com/smallx/monkey-scripts/raw/master/quick-search/images/quick-search-2.gif)

# 功能

## 划词搜索

划词可以搜索或者直接打开网址, 同时也会自动复制到剪贴板. 划词搜索和复制到剪贴板均可配置.

## 快捷键搜索

- **超级快搜**: Alt+S键 搜索快搜搜索框中的文本 或 划词选中的文本 或 用相同分类的另一个引擎搜索当前引擎的搜索词 或 打开快搜搜索框, 优先级按顺序依次降低.
- **网址直达**: Alt+D键 打开快搜搜索框中的网址 或 划词选中的网址, 自动补全 www. 和 .com 前后缀.
- **快速唤出**: Alt+F键 打开/关闭快搜主窗口, 主窗口含搜索框+常用搜索引擎+分类搜索引擎.
- **随时锁定**: Alt+L键 在当前页面禁用/启用快搜所有功能.
- **自定义搜索引擎**: Alt+W键 wiki(百度百科), Alt+E键 english(百度翻译), Alt+B键 百度, Alt+G键 谷歌.

如果同时按下Cmd(Mac系统下)/Ctrl(Windows和Linux系统下), 上述快捷键会在后台打开新页面.

## 搜索跳转

Alt+F键 打开/关闭快搜主窗口, 会自动填入当前搜索引擎搜索词, 快捷跳转.

## 网址导航

Alt+F键 打开/关闭快搜主窗口, 当搜索框中没有文本或同时按下Alt键, 点击搜索引擎图标自动打开其主页.

> 默认使用配置的搜索引擎url中的hostname作为其主页的地址, 可通过home参数另行显示指定主页.

# 安装

- Greasy Fork: https://greasyfork.org/zh-CN/scripts/408250
- GitHub: https://github.com/smallx/monkey-scripts/raw/master/quick-search/quick-search.user.js

## Tampermonkey权限

由于脚本需要请求百度/谷歌获取搜索建议, 所以有跨域url请求, 需要在Tampermonkey中开启相应权限, 如下:

![tampermonkey](https://github.com/smallx/monkey-scripts/raw/master/quick-search/images/tampermonkey-1.png)

# 推荐脚本

## Multi Search - 多搜索引擎搜索

[Multi Search - 多搜索引擎搜索](https://greasyfork.org/zh-CN/scripts/407794)

我自己开发的, 同时搜索多个搜索引擎并将结果并排显示在一个页面.

## Super_preloaderPlus_one_改

[Super_preloaderPlus_one_改](https://greasyfork.org/zh-CN/scripts/33522)

预加载并自动翻页, 很好很强大.

## anti-redirect

[anti-redirect](https://greasyfork.org/zh-CN/scripts/11915)

去除百度/谷歌/知乎/简书等的站外链接跳转, 直达网址.

# 更新日志

## v1.8 20201027

- 更新常用搜索引擎列表, 添加购物搜索.

## v1.7 20201016

- 搜索引擎列表添加"脉脉".

## v1.6 20201011

- 默认关闭"划词自动复制到剪贴板"功能.

## v1.5 20200828

- fix: 网址补全bug.

## v1.4 20200820

- 快捷键全部调整为必须加Alt, 避免有的网页单字符快捷键异常.

## v1.3 20200809

- 优化: 多个搜索引擎的建议去重.

## v1.2 20200809

- 增加搜索引擎建议功能, 默认 5条Google + 5条百度 搜索建议.

## v1.1 20200806

- 优化: 从url中自动获取搜索词更加准确
- 优化: 当快搜搜索框没有文本时, 按下S/Alt+S隐藏快搜主窗口
- 优化: 在输入框中划词时, 禁用自动复制到剪贴板
- fix: 从url中获取的搜索词为乱码的问题

## v1.0 20200806

初版发布, 支持:
- 划词搜索
- 快捷键搜索
- 搜索跳转
- 网址导航
- 自动复制到剪贴板

# TODO

~~由于油猴脚本的限制, 访问书签/历史记录等难以实现, 若有兴趣或考虑做成chrome插件, 让搜索更丝滑一些.~~

# 问题反馈

欢迎在GitHub Issue中反馈问题.

GitHub地址: https://github.com/smallx/monkey-scripts/tree/master/quick-search
