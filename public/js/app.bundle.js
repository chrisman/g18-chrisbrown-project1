!function e(n,t,o){function r(c,s){if(!t[c]){if(!n[c]){var u="function"==typeof require&&require;if(!s&&u)return u(c,!0);if(i)return i(c,!0);var l=new Error("Cannot find module '"+c+"'");throw l.code="MODULE_NOT_FOUND",l}var f=t[c]={exports:{}};n[c][0].call(f.exports,function(e){var t=n[c][1][e];return r(t?t:e)},f,f.exports,e,n,t,o)}return t[c].exports}for(var i="function"==typeof require&&require,c=0;c<o.length;c++)r(o[c]);return r}({1:[function(e,n,t){var o=e("./xmlgetter");$(document).ready(function(){console.log("hello werld");var e=o.getEncodedUrl("https://en.wikipedia.org/w/api.php?action=feedrecentchanges"),n="http://rss2json.com/api.json?&rss_url="+e,t=new XMLHttpRequest;t.onreadystatechange=function(){if(4==t.readyState&&200==t.status){var e=JSON.parse(t.responseText);if("ok"==e.status){for(var n="<h1>"+e.feed.title+"</h1>",o=0;o<e.items.length;++o)n+='<p><h2><a href="'+e.items[o].link+'" >'+e.items[o].title+"</h2></a></p>";console.log(n)}}},t.open("GET",n,!0),t.send()})},{"./xmlgetter":2}],2:[function(e,n,t){n.exports={serveLocal:function(){var e="<rss version='2.0'><channel><title>RSS Title</title></channel></rss>";return e},getxml:function(){return function(){return"<rss version='2.0'><channel><title>RSS Title</title></channel></rss>"}()},fetchLive:function(){return function(){$.get("https://en.wikipedia.org/w/api.php?action=feedrecentchanges",function(e){console.log(e)}).done(function(e){console.log(e)}).fail(function(e){console.error(e)})}()},fetchJson:function(e){return function(e){$.get(e,function(e){console.log(e)})}()},getJsonp:function(){return function(e){console.log(e)}()},getEncodedUrl:function(e){return encodeURIComponent(e)}}},{}]},{},[1]);