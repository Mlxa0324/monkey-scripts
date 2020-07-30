// ==UserScript==
// @name        知乎问题/回答/专栏时间置顶
// @namespace   Violentmonkey Scripts
// @version     1.0
// @author      smallx
// @description 知乎问题/回答/专栏时间置顶
// @include     *.zhihu.com/*
// @grant       none
// @run-at      document-end
// @require     https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js
// ==/UserScript==

// 参考:
// - https://greasyfork.org/zh-CN/scripts/399835
// - https://greasyfork.org/zh-CN/scripts/401827
(function () {
    'use strict';

    var $ = $ || window.$;

    function formatDate(timestamp) {
        var date = new Date(timestamp);
        var Y = date.getFullYear();
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
        var D = date.getDate();
        return Y + '-' + M + '-' + D;
    }

    $(document).ready(function() {
        var link = document.location.toString();
        if (link.indexOf("zhuanlan.zhihu.com") != -1) {     // 专栏
            document.getElementsByClassName("Post-Header")[0].after(document.getElementsByClassName("ContentItem-time")[0]);
        } else {    // 问题/回答
            // 显示提问时间
            $('.QuestionPage').each(function(index, element) {
                let ctime = $(this).find('meta[itemprop="dateCreated"]'),
                    mtime = $(this).find('meta[itemprop="dateModified"]'),
                    cc = ctime.attr('content'),
                    mc = mtime.attr('content'),
                    cd = formatDate((new Date(cc)).getTime()),
                    md = formatDate((new Date(mc)).getTime());
                let add = $(this).find('div[class="QuestionHeader-side"]');
                add.append(`<div style='text-align:left;color:#999'>
                                <p>编辑于 ${md}</p>
                                <p>创建于 ${cd}</p>
                            </div>`);
            });
            // 置顶回答时间
            // 由于回答是动态加载的所以需定时执行
            setInterval(() => {
                $('.top-time-magic').remove();
                $('.ContentItem').each(function(index, element) {
                    let ctime = $(this).find('meta[itemprop="dateCreated"]'),
                        mtime = $(this).find('meta[itemprop="dateModified"]'),
                        cc = ctime.attr('content'),
                        mc = mtime.attr('content'),
                        cd = formatDate(cc),
                        md = formatDate(mc);
                    let add = $(this).find('div[class="css-h5al4j"]');
                    add.append(`<span class='top-time-magic'>&nbsp;&nbsp;&nbsp;&nbsp;编辑于 ${md}&nbsp;&nbsp;&nbsp;&nbsp;创建于 ${cd}</span>`);
                    let add2 = $(this).find('div[class="RichContent is-collapsed"]');
                    add2.prepend(`<div class='top-time-magic' style='text-align:left;color:#999;font-size:14px;'>编辑于 ${md}&nbsp;&nbsp;&nbsp;&nbsp;创建于 ${cd}</div>`);
                });
            }, 1000);
        }
    });
})();
