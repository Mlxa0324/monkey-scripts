// ==UserScript==
// @name        知乎快捷键调优
// @namespace   Violentmonkey Scripts
// @version     1.4
// @author      smallx
// @description 知乎快捷键调优, 方便左手配合鼠标操作 | 无需选中回答, Tab下一条, C展开评论
// @homepageURL https://github.com/smallx/monkey-scripts/tree/master/zhihu-next-answer
// @updateURL   https://github.com/smallx/monkey-scripts/raw/master/zhihu-next-answer/zhihu-next-answer.user.js
// @match       *://www.zhihu.com/*
// @grant       none
// @run-at      document-end
// ==/UserScript==

// 快捷键:
// - Tab: 下一条回答
// - Shift + Tab: 上一条回答
// - 空格: 向下滚动一屏幕 减去 知乎导航条高度 减去 收起评论按钮栏高度
// - Shift + 空格: 向上滚动一屏幕 减去 知乎导航条高度 减去 收起评论按钮栏高度
// - C 或 `: 展开/收起评论
// - 点击评论弹窗的外面: 收起评论
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

    // 判断元素在当前人眼可视窗口中是否可以被看到, 输入为 元素位置, 可视窗口位置, 可视窗口上下左右被覆盖的尺寸(比如顶部导航栏覆盖)
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
    // 由于知乎是动态加载的, 所以该方法需要在每次action时调用.
    function getAnswerItems() {
        var url = window.location.href;
        if (/^(http|https):\/\/www.zhihu.com(\/|\/follow)?$/.test(url)) {                       // 首页 推荐/关注
            return document.querySelectorAll('.TopstoryItem:not(.TopstoryItem--advertCard)');
        } else if (/^(http|https):\/\/www.zhihu.com\/question\/(\d)+\/answer\/*/.test(url)) {   // 问题单个回答页面
            return document.querySelectorAll('.QuestionAnswer-content, .List-item');
        } else if (/^(http|https):\/\/www.zhihu.com\/question\/(\d)+/.test(url)) {              // 问题全部回答页面
            return document.querySelectorAll('.List-item');
        } else if (/^(http|https):\/\/www.zhihu.com\/search\/*/.test(url)) {                    // 搜索结果页面
            return document.querySelectorAll('.List-item');
        }
    }

    var currentIndex = -1;  // 当前滚动到了哪个回答

    window.addEventListener('keydown', function (event) {
        
        var target = event.target;
        if (target.tagName == 'INPUT'
        || target.tagName == 'TEXTAREA'
        || ` ${target.className} `.indexOf(' public-DraftEditor-content ') != -1) {
            return;
        }
        
        // 下一条/上一条回答
        if (event.code == 'Tab') {
            event.preventDefault();

            var items = getAnswerItems();
            if (!items || items.length == 0) {
                return;
            }
            var visualIndexes = getVisualElementIndexes(items);
            var nextIndex = -1;
            if (visualIndexes.includes(currentIndex)) {
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
            items[nextIndex].focus({preventScroll:true});
            items[nextIndex].style.boxShadow = '0px 0px 6px #BBB';
            if (currentIndex != -1) {
                items[currentIndex].style.boxShadow = 'none';
            }
            currentIndex = nextIndex;

            return;
        }

        // 展开/收起评论
        if (event.code == 'KeyC' || event.code == 'Backquote') {
            event.preventDefault();

            var items = getAnswerItems();
            if (!items || items.length == 0) {
                return;
            }
            var visualIndexes = getVisualElementIndexes(items);
            var index = visualIndexes.includes(currentIndex) ? currentIndex 
                : (visualIndexes.length>0 ? visualIndexes[0] : -1);
            if (index != -1) {
                var buttons = items[index].querySelectorAll('button.ContentItem-action');
                buttons.forEach(button => {
                    var text = button.innerText;
                    if (text.includes('条评论') || text.includes('收起评论')) {
                        button.click();
                    }
                });
            }

            return;
        }
        
        if (event.code == 'Space') {
            event.preventDefault();

            if (event.shiftKey) {
                window.scrollTo(0, window.scrollY - (window.innerHeight - 52 - 54 - 3));
            } else {
                window.scrollTo(0, window.scrollY + (window.innerHeight - 52 - 54 - 3));
            }

            return;
        }
    }, true);

    window.addEventListener('click', function (event) {
        var target = event.target;
        // 点击评论弹窗外面收起评论
        var modalInner = document.querySelector('.Modal-inner');
        if (modalInner && !modalInner.contains(target)) {
            document.querySelector('.Modal-closeButton').click();
        }
    }, true);
})();
