var xmlgetter = require('./xmlgetter')

// append to page
function makeCard(o) {
  var idBase = xmlgetter.queryParser(o["link"])["oldid"]
    // console.log(idBase); // should be the ID for the block
  return '<div class="row"><div class="col-md-12"><h3><a href="' + o["link"] + '">' + o["title"] + '</a><small> by ' + o["author"] + '</small></h2></div></div><div class="row"><div class="col-md-12">' + o["description"] + '</div></div><div class="row"><div class="col-md-12"><button class="btn btn-default"><span class="glyphicon glyphicon-heart" aria-hidden="true"></span><span>&nbsp;Thank</span></button></div></div>'
}

// Filters and forEach. see `$get(rss2json+encodedUrlForApiCall, `
function excludeUserPages(o) {
  return (!(o["title"].includes('User')))
}

function excludeAnonymousUsers(o) {
  return (!(o["author"].match(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/)))
}

function addToPage(o) {
  $('#main').append(makeCard(o))
}

function handleGetMyApiCall(data) {
  data["items"]
    .filter(excludeUserPages)
    .filter(excludeAnonymousUsers)
    .forEach(addToPage)
}


$(document).ready(function() {

  var myApiEndPoint = "https://en.wikipedia.org/w/api.php"
  var getRecentChanges = "https://en.wikipedia.org/w/api.php?action=feedrecentchanges&hideminor=true&hidebots=true"
  var getRecentChangesOptions = {
    action: 'feedrecentchanges',
    hideminor: 'true',
    hidebots: 'true'
  }
  var myGetTokensString = "https://en.wikipedia.org/w/api.php?action=query&meta=tokens&type=csrf&format=json"
  var encodedUrlForApiCall = xmlgetter.getEncodedUrl(getRecentChanges);
  var corsAnywhere = "https://cors-anywhere.herokuapp.com/"
  var rss2json = "http://rss2json.com/api.json?&rss_url="
  var myPostString = "https://en.wikipedia.org/w/api.php?action=thank&format=json&rev=624145252&source=history"
  var myPostStringOptions = {
    action: 'thank',
    format: 'json',
    rev: '624145252',
    source: 'diff',
    token: ''
  }

  $.get(rss2json + encodedUrlForApiCall, handleGetMyApiCall)

  $(document).on('click', 'button', function(e) {
    console.log('click logged');
    $.get(corsAnywhere+myGetTokensString, function(res){
      myPostStringOptions["token"] = res["query"]["tokens"]["csrftoken"]
      $.post(corsAnywhere+myApiEndPoint, myPostStringOptions, function(res){
        console.log(res);
      })
    })
  })
})
