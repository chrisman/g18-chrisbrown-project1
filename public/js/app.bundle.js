!function n(t,r,e){function o(c,u){if(!r[c]){if(!t[c]){var a="function"==typeof require&&require;if(!u&&a)return a(c,!0);if(i)return i(c,!0);var s=new Error("Cannot find module '"+c+"'");throw s.code="MODULE_NOT_FOUND",s}var d=r[c]={exports:{}};t[c][0].call(d.exports,function(n){var r=t[c][1][n];return o(r?r:n)},d,d.exports,n,t,r,e)}return r[c].exports}for(var i="function"==typeof require&&require,c=0;c<e.length;c++)o(e[c]);return o}({1:[function(n,t,r){function e(n){var t=s.queryParser(n.link).oldid,r=n.description.split("").filter(c).join("");return'  <div id="card-'+t+'" class="container-fluid col-md-4 card">    <div class="card__header">      <h3><a href="'+n.link+'">'+n.title+"</a><small> by "+n.author+'</small></h3>    </div>    <div class="card__summary">'+r+'</div>    <div class="card__footer">      <button id="btn-'+t+'" class="btn btn-default"><span class="glyphicon glyphicon-heart" aria-hidden="true"></span><span>&nbsp;Thank</span></button>    </div>  </div>'}function o(n){return!n.title.includes("User")}function i(n){return!n.author.match(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/)}function c(n){return!n.match(/[{}[\]'|]/)}function u(n,t,r){$("#main").append(n)}function a(n){var t=n.items.filter(o).filter(i).map(e),r=d.chunk(t,3);r=r.map(function(n){return n.join("")}).map(function(n){return'<div class="row card-row">'+n+"</div>"}).forEach(u)}var s=n("./xmlgetter"),d=n("./arraybuddy");$(document).ready(function(){var n="https://en.wikipedia.org/w/api.php",t="https://en.wikipedia.org/w/api.php?action=feedrecentchanges&hideminor=true&hidebots=true",r="https://en.wikipedia.org/w/api.php?action=query&meta=tokens&type=csrf&format=json",e=s.getEncodedUrl(t),o="https://cors-anywhere.herokuapp.com/",i="http://rss2json.com/api.json?&rss_url=",c={action:"thank",format:"json",rev:"624145252",source:"diff",token:""};$.get(i+e,a),$(document).on("click","button",function(t){console.log("click logged"),$.get(o+r,function(t){c.token=t.query.tokens.csrftoken,$.post(o+n,c,function(n){console.log(n)})})})})},{"./arraybuddy":2,"./xmlgetter":3}],2:[function(n,t,r){t.exports={chunk:function(n,t){var r=[];for(t=t||2;n.length>0;)r.push(n.splice(0,t));return r},flatten:function(n){return n.reduce(function(n,t){return n.concat(t)},[])}}},{}],3:[function(n,t,r){function e(n){return n.split("?")[1]}function o(n){return n.split("&amp;").reduce(function(n,t){var r=t.split("=")[0],e=t.split("=")[1].split("+").join(" ");return n[r]=e,n},{})}t.exports={fetchJson:function(n){return function(n){$.get(n,function(n){console.log(n)})}()},getEncodedUrl:function(n){return encodeURIComponent(n)},queryParser:function(n){return o(e(n))}}},{}]},{},[1]);