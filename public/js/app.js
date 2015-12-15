(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var xmlgetter = require('./xmlgetter')

$(document).ready(function(){
  console.log('hello werld');

  var apiurl = xmlgetter.getEncodedUrl("https://en.wikipedia.org/w/api.php?action=feedrecentchanges");
  var jsonurl = "http://rss2json.com/api.json?&rss_url="+apiurl

  var xhr = new XMLHttpRequest()

  xhr.onreadystatechange = function(){
    if (xhr.readyState==4 && xhr.status==200) {
     var data = JSON.parse(xhr.responseText);
     if(data.status == 'ok'){
       var output = '<h1>'+data.feed.title+'</h1>';
       for(var i=0;i<data.items.length;++i){
         output += '<p><h2><a href="' +
           data.items[i].link + '" >' +
           data.items[i].title + '</h2></a></p>';
       }
       console.log(output);
     }
    }
   };
   xhr.open('GET',jsonurl,true);
   xhr.send();
})

},{"./xmlgetter":2}],2:[function(require,module,exports){
module.exports = {
  serveLocal: function(){
    // var localcopy = require('./sampledata.xml')
    var localcopy = "<rss version='2.0'><channel><title>RSS Title</title></channel></rss>"
    return localcopy
  },
  getxml: function(){
    return (function(){
      return "<rss version='2.0'><channel><title>RSS Title</title></channel></rss>"
    })()
  },
  fetchLive: function(){
    return (function(){

      $.get("https://en.wikipedia.org/w/api.php?action=feedrecentchanges",function(d){
        console.log(d);
      }).done(function(d){
        console.log(d);
      }).fail(function(e){
        console.error(e);
      })

    })()
  },
  fetchJson: function(url){
    return (function(url){

      $.get(url, function(d){
        console.log(d);
      })

    })()
  },
  getJsonp: function(){
    return (function(d){
      console.log(d);
    })()
  },
  getEncodedUrl: function(u){
    return encodeURIComponent(u)
  }
}

},{}]},{},[1]);
