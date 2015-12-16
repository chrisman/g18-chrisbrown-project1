var xmlgetter = require('./xmlgetter')

// Filters and forEach.
function makeCard(o) {
  var idBase = xmlgetter.queryParser(o["link"])["oldid"]
  var desc = o["description"]
    .split('')
    .filter(excludeMarkup)
    .join('')

  return '\
  <div id="card-'+ idBase +'" class="col-md-4">\
    <div class="row">\
      <h3><a href="' + o["link"] + '">' + o["title"] + '</a><small> by ' + o["author"] + '</small></h3>\
    </div>\
    <div class="row row-desc">' + desc + '</div>\
    <div class="row">\
      <button id="btn-'+ idBase +'" class="btn btn-default"><span class="glyphicon glyphicon-heart" aria-hidden="true"></span><span>&nbsp;Thank</span></button>\
    </div>\
  </div>'
}
function excludeUserPages(o) {
  return (!(o["title"].includes('User')))
}
function excludeAnonymousUsers(o) {
  return (!(o["author"].match(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/)))
}
function excludeMarkup(i) {
  return (!(i.match(/[{}[\]'|]/)))
}
function addToPage(currentValue, index, array) {
  $('#main').append(currentValue)
}
function handleGetMyApiCall(data) {
  data["items"]
    .filter(excludeUserPages)
    .filter(excludeAnonymousUsers)
    .map(makeCard)
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
  var testCentralAuthString = "https://en.wikipedia.org/w/api.php?action=centralauthtoken&format=json"
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
