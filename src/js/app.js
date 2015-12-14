var xmlgetter = require('./xmlgetter')

$(document).ready(function(){
  console.log('hello werld');

  var apiurl = xmlgetter.getEncodedUrl("https://en.wikipedia.org/w/api.php?action=feedrecentchanges");

  function logFeed(d){
    alert('innit')
    if (d.status == "ok"){
      console.log(d.items);
    }
  }

  var srcurl = "http://rss2json.com/api.json?callback="+"logFeed"+"&rss_url="+apiurl

  $('body').append("<script type='application/json' src="+srcurl+"></script>")
})
