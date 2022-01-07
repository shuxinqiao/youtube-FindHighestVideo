// ==UserScript==
// @name         youtube-sort
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
    let Re_all = /\d*\w\sviews/;
    let Re_K = /\d*K\sviews/;
    let Re_M = /\d*M\sviews/;
    let Re_B = /\d*B\sviews/;


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
            if (Re_K.test(views[i])){
                var cur_d = views[i].replace("K views","");
                num.push(Number(cur_d));
            }
            else if (Re_M.test(views[i])){
                var cur_d_M = views[i].replace("M views","") * 1000 ;
                num.push(Number(cur_d_M));
            }
            else if (Re_B.test(views[i])){
                var cur_d_B = views[i].replace("B views","") * 1000 * 1000;
                num.push(Number(cur_d_B));
            }
        };
    };


    Find();
    Replace();
    console.log(views);
    num.sort(function(a, b){return b - a});
    console.log(num);


    function alert_msg(){
        var word = "K";
        var value = num[0];
        if (value >= 1000){
            value = num[0]/1000;
            word = "M";
            if (value >= 1000){
                value = value/1000;
                word = "B"
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
