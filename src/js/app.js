var xmlgetter = require('./xmlgetter')
require('./md5')

// append to page
function makeCard(o){
  var idBase = xmlgetter.queryParser(o["link"])["oldid"]
  // console.log(idBase); // should be the ID for the block
  return '<div class="row"><div class="col-md-12"><h3><a href="'+o["link"]+'">'+o["title"]+'</a><small> by '+o["author"]+'</small></h2></div></div><div class="row"><div class="col-md-12">'+o["description"]+'</div></div><div class="row"><div class="col-md-12"><button class="btn btn-default"><span class="glyphicon glyphicon-heart" aria-hidden="true"></span><span>&nbsp;Thank</span></button></div></div>'
}

// Filters and forEach. see `$get(rss2json+encodedUrlForApiCall, `
function excludeUserPages(o){
  return (!(o["title"].includes('User')))
}
function excludeAnonymousUsers(o){
  return (!(o["author"].match(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/)))
}
function addToPage(o){
  $('#main').append(makeCard(o))
}
function handleGetMyApiCall(data) {
  data["items"]
    .filter(excludeUserPages)
    .filter(excludeAnonymousUsers)
    .forEach(addToPage)
}


$(document).ready(function(){
  console.log('hello werld');
  var myApiEndPoint = "https://en.wikipedia.org/w/api.php"
  var myGetString = "https://en.wikipedia.org/w/api.php?action=feedrecentchanges&hideminor=true&hidebots=true"
  var encodedUrlForApiCall = xmlgetter.getEncodedUrl(myGetString);
  var corsAnywhere = "https://cors-anywhere.herokuapp.com/"
  var rss2json = "http://rss2json.com/api.json?&rss_url="
  var myPostString = "https://en.wikipedia.org/w/api.php?action=thank&format=json&rev=624145252&source=history"

  $.get(rss2json+encodedUrlForApiCall, handleGetMyApiCall)

  $(document).on('click', 'button', function(e){
    console.log('click logged');
    $.get(corsAnywhere+myApiEndPoint, {
      action: 'query',
      meta: 'tokens',
      format: 'json'
    }, function(res){
      console.log(res['query']['tokens']['csrftoken']);
      console.log(MD5(res['query']['tokens']['csrftoken']));
      $.post(corsAnywhere+myApiEndPoint, {
        action: 'thank',
        format: 'json',
        rev: '624145252',
        source: 'diff',
        token: res["query"]["tokens"]["csrftoken"]
      }, function(res){
        console.log(res);
      })
    })
  })

})
