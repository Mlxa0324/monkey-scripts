// ==UserScript==
// @name        显示github中文时间
// @namespace   Violentmonkey Scripts
// @version     1.0
// @author      smallx
// @description 将github的时间显示为中国人习惯的时间格式
// @match       https://github.com/*
// @match       https://*.github.com/*
// @grant       none
// @run-at      document-idle
// ==/UserScript==

// 请注意github需要 @run-at 为 document-idle 并等待一会再执行
(function () {
    'use strict';

    setTimeout(function() {
        var eles = document.querySelectorAll("relative-time");
        eles.forEach(function(ele) {
            if (!ele.innerText.endsWith(' ago')) {
                ele.innerText = ele.title.replace(' GMT+8 ', ' ');
            }
        });
    }, 3000);
})();