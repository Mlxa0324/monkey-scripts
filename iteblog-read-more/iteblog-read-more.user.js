// ==UserScript==
// @name        过往记忆大数据 取消阅读全文验证码
// @namespace   Violentmonkey Scripts
// @version     1.0
// @author      smallx
// @description 过往记忆大数据博客(https://www.iteblog.com)取消"阅读全文"验证码.
// @match       https://www.iteblog.com/archives/*
// @grant       none
// @run-at      document-end
// @noframes
// ==/UserScript==

(function () {
    'use strict';

    setTimeout(() => {
        document.getElementById('read-more-wrap').style.display = 'none';
        document.getElementsByClassName('article-content')[0].style.height = 'fit-content';
    }, 1000);
})();
