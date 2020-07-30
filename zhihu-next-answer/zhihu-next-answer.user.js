// ==UserScript==
// @name        知乎下一条回答左手快捷键
// @namespace   Violentmonkey Scripts
// @version     1.0
// @author      smallx
// @description 知乎下一条回答左手快捷键 | 知乎Tab下一条回答
// @homepageURL 
// @updateURL   
// @match       *://www.zhihu.com/*
// @grant       none
// @run-at      document-end
// ==/UserScript==

(function () {
    'use strict';

    // 获取可视窗口在文档(页面)中的绝对位置
    function getWindowPosition() {
        return {
            top: window.scrollY,
            bottom: window.scrollY + window.innerHeight,
            left: window.scrollX,
            right: window.scrollX + window.innerWidth
        };
    }

    // 计算元素在文档(页面)中的绝对位置
    function getElementPosition(e) {
        return {
            top: e.getBoundingClientRect().top + window.scrollY,        // 元素顶部相对于文档顶部距离
            bottom: e.getBoundingClientRect().bottom + window.scrollY,  // 元素底部相对于文档顶部距离
            left: e.getBoundingClientRect().left + window.scrollX,      // 元素左边相对于文档左侧距离
            right: e.getBoundingClientRect().right + window.scrollX     // 元素右边相对于文档左侧距离
        };
    }

    // 判断元素是否可以被看到, 输入为 元素位置, 可视窗口位置, 可视窗口上下左右被覆盖的尺寸(比如顶部导航栏覆盖)
    function isVisual(ePos, wPos, topCover, bottomCover, leftCover, rightCover) {
        return !(
            ePos.bottom <= wPos.top + topCover
            || ePos.top >= wPos.bottom - bottomCover
            || ePos.right <= wPos.left + leftCover
            || ePos.left >= wPos.right - rightCover
        );
    }

    // 给定一些元素, 返回在当前可视区域的元素的索引列表, 前后顺序不变
    function getVisualElementIndexes(elements) {
        var visualIndexes = [];
        var wPos = getWindowPosition();
        for (var i=0; i<elements.length; i++) {
            var ePos = getElementPosition(elements[i]);
            if (isVisual(ePos, wPos, 52, 0, 0, 0)) {
                visualIndexes.push(i);
            }
        }
        return visualIndexes;
    }

    // 针对不同页面获取回答所对应的元素列表
    function getAnswerItems() {
        var url = window.location.href;
        if (/^(http|https):\/\/www.zhihu.com(\/|\/follow)?$/.test(url)) {                       // 首页 推荐/关注
            return document.querySelectorAll('.TopstoryItem:not(.TopstoryItem--advertCard)');
        } else if (/^(http|https):\/\/www.zhihu.com\/question\/(\d)+$/.test(url)) {             // 问题全部回答页面
            return document.querySelectorAll('.List-item');
        } else if (/^(http|https):\/\/www.zhihu.com\/question\/(\d)+\/answer\/*/.test(url)) {   // 问题单个回答页面
            return document.querySelectorAll('.QuestionAnswer-content, .List-item');
        } else if (/^(http|https):\/\/www.zhihu.com\/search\/*/.test(url)) {                    // 搜索结果页面
            return document.querySelectorAll('.List-item');
        }
    }

    var currentIndex = -1;  // 当前滚动到了哪个回答

    window.onkeydown = function(event) {
        if (event.keyCode == 9) {   // Tab键

            var target = event.target;
            if (target.tagName == 'input'
            || target.tagName == 'textarea' 
            || ` ${target.className} `.indexOf(' public-DraftEditor-content ') != -1) {
                return;
            }

            event.preventDefault();

            var items = getAnswerItems();
            if (!items || items.length == 0) {
                return;
            }
            var visualIndexes = getVisualElementIndexes(items);
            var nextIndex = -1;
            if (currentIndex != -1 && visualIndexes.includes(currentIndex)) {
                nextIndex = event.shiftKey ? currentIndex-1 : currentIndex+1;
            } else if (visualIndexes.length > 0) {
                nextIndex = event.shiftKey ? visualIndexes[visualIndexes.length-1]-1 : visualIndexes[0]+1;
            } else {
                nextIndex = event.shiftKey ? items.length-1 : 0;
            }
            nextIndex = Math.max(0, nextIndex);
            nextIndex = Math.min(items.length - 1, nextIndex);
            var nextItemPos = getElementPosition(items[nextIndex]);
            if (nextIndex == currentIndex && nextIndex == items.length - 1) {   // 最后一条滚动到底部以便加载剩下的回答(知乎是动态加载)
                window.scrollTo({top: nextItemPos.bottom, behavior: 'smooth'});
            } else {
                window.scrollTo({top: nextItemPos.top - 52, behavior: 'smooth'});
            }
            if (currentIndex != -1) {
                items[currentIndex].style.boxShadow = 'none';
            }
            items[nextIndex].style.boxShadow = '0px 0px 6px #BBB';
            currentIndex = nextIndex;
        }
    };
})();
