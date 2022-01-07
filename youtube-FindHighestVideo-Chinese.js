// ==UserScript==
// @name         youtube-sort-chinese version
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Find highest view video on current page
// @author       Shuxin Qiao
// @match        https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?domain=tampermonkey.net
// @grant        none
// ==/UserScript==
let triple=document.createElement("button");
triple.innerText="FindHighest";
triple.style.background="#a2cdf2";
triple.style.color="#343d45";
triple.onclick=function(){
    const views = [];
    const num = [];
    let Re_all = /\u6b21\u89c2\u770b/;
    let Re_s = /\d*\u6b21\u89c2\u770b/;
    let Re_tK = /\d*\u4e07\u6b21\u89c2\u770b/;
    let Re_hM = /\d*\u4ebf\u6b21\u89c2\u770b/;



    function Find(){
        for (var i=0; i<div_list.length; i++){
            if (Re_all.test(div_list[i].innerHTML)){
                var newView = div_list[i].innerHTML;
                views.push(newView);
            };
        };
    };

    function Replace(){
        for (var i=0; i<views.length; i++){
            if (Re_tK.test(views[i])){
                var cur_d_tK = views[i].replace("\u4e07\u6b21\u89c2\u770b","") * 10000;
                num.push(Number(cur_d_tK));
            }
            else if (Re_hM.test(views[i])){
                var cur_d_hM = views[i].replace("\u4ebf\u6b21\u89c2\u770b","") * 10000 * 10000 ;
                num.push(Number(cur_d_hM));
            }
            else if (Re_s.test(views[i])){
                var cur_d = views[i].replace("\u6b21\u89c2\u770b","");
                num.push(Number(cur_d));
            }
        };
    };


    Find();
    Replace();
    console.log(views);
    num.sort(function(a, b){return b - a});
    console.log(num);


    function alert_msg(){
        var word = "次观看";
        var value = num[0];
        if (value >= 10000){
            value = num[0]/10000;
            word = "万次观看";
            if (value >= 10000){
                value = value/10000;
                word = "亿次观看"
            }
        }
        return {value,word};
    };

    const {value,word} = alert_msg();
    alert("Most view video on this page: " + value + word);


};
let sub=document.querySelector('.style-scope ytd-subscribe-button-renderer');
sub.parentElement.insertBefore(triple,sub);

var div_list = document.getElementsByTagName('span');
console.log(div_list.length);
