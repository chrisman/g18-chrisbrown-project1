var xmlgetter = require('./xmlgetter')

$(document).ready(function(){
  console.log('hello werld');

  var encodedUrlForApiCall = xmlgetter.getEncodedUrl("https://en.wikipedia.org/w/api.php?action=feedrecentchanges");
  var myApiCall = "https://rss2json.com/api.json?&rss_url="+encodedUrlForApiCall


  $.get(myApiCall, function(data){
    console.log(data["feed"]["title"]);
  })

})
