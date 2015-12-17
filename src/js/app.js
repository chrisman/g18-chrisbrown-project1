var xmlgetter = require('./xmlgetter')
var ab = require('./arraybuddy')
var _str = require('./strings')

// Filters and forEach.
function makeCard(o) {
  var idBase = xmlgetter.queryParser(o["link"])["oldid"]
  var desc = o["description"]
    .split('')
    .filter(excludeMarkup)
    .join('')

  return '\
  <div id="card-'+ idBase +'" class="container-fluid col-md-4 card">\
    <div class="card__header">\
      <h3><a href="' + o["link"] + '">' + o["title"] + '</a><small> by ' + o["author"] + '</small></h3>\
    </div>\
    <div class="card__summary">' + desc + '</div>\
    <div class="card__footer">\
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
  var cards = data["items"]
    .filter(excludeUserPages)
    .filter(excludeAnonymousUsers)
    .map(makeCard)

  var rowOfCards = ab.chunk(cards, 3)
  rowOfCards = rowOfCards.map(function(a){
    return a.join('')
  }).map(function(s){
    return '<div class="row card-row">'+s+'</div>'
  }).forEach(addToPage)
}


$(document).ready(function() {

  var encodedUrlForApiCall = xmlgetter.getEncodedUrl(_str["getFeedRecentChanges"]);

  $.get(_str["rss2json"]+encodedUrlForApiCall, handleGetMyApiCall)

  $(document).on('click', 'button', function(e) {
    console.log('click logged');
    $.get(_str["corsAnywhere"]+_str["getTokens"], function(res){
      _str["postOptions"]["token"] = res["query"]["tokens"]["csrftoken"]
      $.post(_str["corsAnywhere"]+_str["apiEndPoint"], _str["postOptions"], function(res){
        console.log(res);
      })
    })
  })
})
