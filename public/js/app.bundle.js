!function n(t,r,e){function i(s,a){if(!r[s]){if(!t[s]){var c="function"==typeof require&&require;if(!a&&c)return c(s,!0);if(o)return o(s,!0);var u=new Error("Cannot find module '"+s+"'");throw u.code="MODULE_NOT_FOUND",u}var l=r[s]={exports:{}};t[s][0].call(l.exports,function(n){var r=t[s][1][n];return i(r?r:n)},l,l.exports,n,t,r,e)}return r[s].exports}for(var o="function"==typeof require&&require,s=0;s<e.length;s++)i(e[s]);return i}({1:[function(n,t,r){function e(n){var t=a.queryParser(n.link);return console.log(t.oldid),'<div class="row"><div class="col-md-12"><h3><a href="'+n.link+'">'+n.title+"</a><small> by "+n.author+'</small></h2></div></div><div class="row"><div class="col-md-12">'+n.description+'</div></div><div class="row"><div class="col-md-12"><button class="btn btn-default"><span class="glyphicon glyphicon-heart" aria-hidden="true"></span><span>&nbsp;Thank</span></button></div></div>'}function i(n){return!n.title.includes("User")}function o(n){return!n.author.match(/\d{2,3}\.\d{3}\.\d{2,3}\.\d{2,3}/)}function s(n){$("#main").append(e(n))}var a=n("./xmlgetter");$(document).ready(function(){console.log("hello werld");var n="https://en.wikipedia.org/w/api.php?action=feedrecentchanges&hideminor=true&hidebots=true",t=a.getEncodedUrl(n),r="http://rss2json.com/api.json?&rss_url="+t;$.get(r,function(n){n.items.filter(i).filter(o).forEach(s)}),$.ajax({url:"https://en.wikipedia.org/w/api.php",data:{action:"query",meta:"tokens",format:"json",origin:"https://en.wikipedia.org"},xhrFields:{withCredentials:!0},success:function(n){console.log(n)}})})},{"./xmlgetter":2}],2:[function(n,t,r){function e(n){return n.split("?")[1]}function i(n){return n.split("&amp;").reduce(function(n,t){var r=t.split("=")[0],e=t.split("=")[1].split("+").join(" ");return n[r]=e,n},{})}t.exports={fetchJson:function(n){return function(n){$.get(n,function(n){console.log(n)})}()},getEncodedUrl:function(n){return encodeURIComponent(n)},queryParser:function(n){return i(e(n))}}},{}]},{},[1]);