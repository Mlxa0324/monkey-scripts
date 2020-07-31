// ==UserScript==
// @name        显示stackoverflow中文时间
// @namespace   Violentmonkey Scripts
// @version     1.0
// @author      smallx
// @description 将stackoverflow等网站的时间显示为中国人习惯的时间格式
// @match       https://askubuntu.com/*
// @match       https://mathoverflow.net/*
// @match       https://serverfault.com/*
// @match       https://stackapps.com/*
// @match       https://stackexchange.com/*
// @match       https://stackoverflow.com/*
// @match       https://superuser.com/*
// @match       https://*.askubuntu.com/*
// @match       https://*.mathoverflow.net/*
// @match       https://*.serverfault.com/*
// @match       https://*.stackapps.com/*
// @match       https://*.stackexchange.com/*
// @match       https://*.stackoverflow.com/*
// @match       https://*.superuser.com/*
// @grant       none
// @run-at      document-end
// ==/UserScript==

(function () {
    'use strict';

    var eles = document.querySelectorAll("span.relativetime, span.relativetime-clean");
    eles.forEach(function(ele) {
        if (!ele.innerText.endsWith(' ago')) {
            ele.innerText = ele.title.replace('Z', '');
        }
    });
})();