# Quick Search

Quick Search - 快速搜索. 无缝集成 划词搜索 + 快捷键搜索 + 搜索跳转 + 网址导航, 享受丝滑搜索体验.

![quick-search](https://github.com/smallx/monkey-scripts/raw/master/quick-search/images/quick-search-1.gif)

# 功能

## 划词搜索

划词可以搜索或者直接打开网址, 同时也会自动复制到剪贴板. 划词搜索和复制到剪贴板均可配置.

## 快捷键搜索

- **超级快搜**: S键/Alt+S键 搜索快搜搜索框中的文本 或 划词选中的文本 或 用相同分类的另一个引擎搜索当前引擎的搜索词 或 打开快搜搜索框, 优先级按顺序依次降低.
- **网址直达**: D键/Alt+D键 打开快搜搜索框中的网址 或 划词选中的网址, 自动补全 www. 和 .com 前后缀.
- **快速唤出**: F键/Alt+F键 打开/关闭快搜主窗口, 主窗口含搜索框+常用搜索引擎+分类搜索引擎.
- **随时锁定**: L键/Alt+L键 在当前页面禁用/启用快搜所有功能.
- **自定义搜索引擎**: W键/Alt+W键 wiki(百度百科), E键/Alt+E键 english(百度翻译), B键/Alt+B键 百度, G键/Alt+G键 谷歌.

当光标位于输入框(input/textarea)中时, 上述单字符的快捷键都不会启用, 需同时按下Alt键(在Mac下对应option键).

如果同时按下Cmd(Mac系统下)/Ctrl(Windows和Linux系统下) + Alt, 上述快捷键会在后台打开新页面.

## 搜索跳转

F键/Alt+F键 打开/关闭快搜主窗口, 会自动填入当前搜索引擎搜索词, 快捷跳转.

## 网址导航

F键/Alt+F键 打开/关闭快搜主窗口, 当搜索框中没有文本或同时按下Alt键, 点击搜索引擎图标自动打开其主页.

> 默认使用配置的搜索引擎url中的hostname作为其主页的地址, 可通过home参数另行显示指定主页.

# 安装

- Greasy Fork: https://greasyfork.org/zh-CN/scripts/408250
- GitHub: https://github.com/smallx/monkey-scripts/raw/master/quick-search/quick-search.user.js

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

由于油猴脚本的限制, 访问书签/历史记录等难以实现, 若有兴趣或考虑做成chrome插件, 让搜索更丝滑一些.

# 问题反馈

欢迎在GitHub Issue中反馈问题.

GitHub地址: https://github.com/smallx/monkey-scripts/tree/master/quick-search
