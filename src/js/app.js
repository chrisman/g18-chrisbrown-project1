var xmlgetter = require('./xmlgetter')

function makeCard(o){
  var rev = xmlgetter.queryParser(o["link"])
  console.log(rev["oldid"]); // should be the ID for the block

  return '<div class="row"><div class="col-md-12"><h3><a href="'+o["link"]+'">'+o["title"]+'</a><small> by '+o["author"]+'</small></h2></div></div><div class="row"><div class="col-md-12">'+o["description"]+'</div></div><div class="row"><div class="col-md-12"><button class="btn btn-default"><span class="glyphicon glyphicon-heart" aria-hidden="true"></span><span>&nbsp;Thank</span></button></div></div>'
}

$(document).ready(function(){
  console.log('hello werld');

  var encodedUrlForApiCall = xmlgetter.getEncodedUrl("https://en.wikipedia.org/w/api.php?action=feedrecentchanges&hideminor=true&hidebots=true");
  var myApiCall = "http://rss2json.com/api.json?&rss_url="+encodedUrlForApiCall

  $.get(myApiCall, function(data){
    data["items"].filter(function(o){ // omit user pages
      return (!(o["title"].includes('User')))
    }).filter(function(o){ // omit anonymous authors (match IP address)
      return (!(o["author"].match(/\d{2,3}\.\d{3}\.\d{2,3}\.\d{2,3}/)))
    }).forEach(function(o){
      $('#main').append(makeCard(o))
    })
  })

})
