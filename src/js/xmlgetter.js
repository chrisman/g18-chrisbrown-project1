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
  getJsonp: function(){
    return (function(d){
      console.log(d);
    })()
  },
  getEncodedUrl: function(u){
    return encodeURIComponent(u)
  }
}
