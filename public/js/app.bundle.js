!function n(t,e,r){function o(c,s){if(!e[c]){if(!t[c]){var u="function"==typeof require&&require;if(!s&&u)return u(c,!0);if(i)return i(c,!0);var a=new Error("Cannot find module '"+c+"'");throw a.code="MODULE_NOT_FOUND",a}var l=e[c]={exports:{}};t[c][0].call(l.exports,function(n){var e=t[c][1][n];return o(e?e:n)},l,l.exports,n,t,e,r)}return e[c].exports}for(var i="function"==typeof require&&require,c=0;c<r.length;c++)o(r[c]);return o}({1:[function(n,t,e){function r(n){u.queryParser(n.link).oldid;return'<div class="row"><div class="col-md-12"><h3><a href="'+n.link+'">'+n.title+"</a><small> by "+n.author+'</small></h2></div></div><div class="row"><div class="col-md-12">'+n.description+'</div></div><div class="row"><div class="col-md-12"><button class="btn btn-default"><span class="glyphicon glyphicon-heart" aria-hidden="true"></span><span>&nbsp;Thank</span></button></div></div>'}function o(n){return!n.title.includes("User")}function i(n){return!n.author.match(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/)}function c(n){$("#main").append(r(n))}function s(n){n.items.filter(o).filter(i).forEach(c)}var u=n("./xmlgetter");$(document).ready(function(){var n="https://en.wikipedia.org/w/api.php",t="https://en.wikipedia.org/w/api.php?action=feedrecentchanges&hideminor=true&hidebots=true",e="https://en.wikipedia.org/w/api.php?action=query&meta=tokens&type=csrf&format=json",r=u.getEncodedUrl(t),o="https://cors-anywhere.herokuapp.com/",i="http://rss2json.com/api.json?&rss_url=",c={action:"thank",format:"json",rev:"624145252",source:"diff",token:""};$.get(i+r,s),$(document).on("click","button",function(t){console.log("click logged"),$.get(o+e,function(t){c.token=t.query.tokens.csrftoken,$.post(o+n,c,function(n){console.log(n)})})})})},{"./xmlgetter":2}],2:[function(n,t,e){function r(n){return n.split("?")[1]}function o(n){return n.split("&amp;").reduce(function(n,t){var e=t.split("=")[0],r=t.split("=")[1].split("+").join(" ");return n[e]=r,n},{})}t.exports={fetchJson:function(n){return function(n){$.get(n,function(n){console.log(n)})}()},getEncodedUrl:function(n){return encodeURIComponent(n)},queryParser:function(n){return o(r(n))}}},{}]},{},[1]);