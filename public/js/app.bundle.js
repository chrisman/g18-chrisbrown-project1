!function n(r,t,e){function o(u,c){if(!t[u]){if(!r[u]){var s="function"==typeof require&&require;if(!c&&s)return s(u,!0);if(i)return i(u,!0);var l=new Error("Cannot find module '"+u+"'");throw l.code="MODULE_NOT_FOUND",l}var a=t[u]={exports:{}};r[u][0].call(a.exports,function(n){var t=r[u][1][n];return o(t?t:n)},a,a.exports,n,r,t,e)}return t[u].exports}for(var i="function"==typeof require&&require,u=0;u<e.length;u++)o(e[u]);return o}({1:[function(n,r,t){function e(n){var r=o.queryParser(n.link);return console.log(r.oldid),'<div class="row"><div class="col-md-12"><h3><a href="'+n.link+'">'+n.title+"</a><small> by "+n.author+'</small></h2></div></div><div class="row"><div class="col-md-12">'+n.description+'</div></div><div class="row"><div class="col-md-12"><button class="btn btn-default"><span class="glyphicon glyphicon-heart" aria-hidden="true"></span><span>&nbsp;Thank</span></button></div></div>'}var o=n("./xmlgetter");$(document).ready(function(){console.log("hello werld");var n=o.getEncodedUrl("https://en.wikipedia.org/w/api.php?action=feedrecentchanges&hideminor=true&hidebots=true"),r="http://rss2json.com/api.json?&rss_url="+n;$.get(r,function(n){n.items.filter(function(n){return!n.title.includes("User")}).filter(function(n){return!n.author.match(/\d{2,3}\.\d{3}\.\d{2,3}\.\d{2,3}/)}).forEach(function(n){$("#main").append(e(n))})})})},{"./xmlgetter":2}],2:[function(n,r,t){function e(n){return n.split("?")[1]}function o(n){return n.split("&amp;").reduce(function(n,r){var t=r.split("=")[0],e=r.split("=")[1].split("+").join(" ");return n[t]=e,n},{})}r.exports={fetchJson:function(n){return function(n){$.get(n,function(n){console.log(n)})}()},getEncodedUrl:function(n){return encodeURIComponent(n)},queryParser:function(n){return o(e(n))}}},{}]},{},[1]);