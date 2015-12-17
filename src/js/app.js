var xmlgetter = require('./xmlgetter')
var ab = require('./arraybuddy')
var _str = require('./strings')


function briefSummary(str){

}
// Filters and forEach.
function makeCard(o) {
  var idBase = xmlgetter.queryParser(o["link"])["oldid"]
  var desc = o["description"]
    .split('')
    .filter(excludeMarkup)
    .join('')

  var $test = $(desc)
  console.log($test);

  return '\
  <div id="card-'+ idBase +'" class="container-fluid col-md-4 card card--dim">\
    <div class="row card__header">\
      <div class="col-md-12">\
      <h3><a href="' + o["link"] + '">' + o["title"] + '</a><small> by ' + o["author"] + '</small></h3>\
      </div>\
    </div>\
    <div class="row card__summary">\
      <div class="col-md-12">\
      ' + desc + '\
      </div>\
    </div>\
    <div class="row card__footer">\
      <div class="col-md-12 text-right">\
      <span>Show summary</span>\
      <button id="btn-'+ idBase +'" class="btn btn-default"><span class="glyphicon glyphicon-heart" aria-hidden="true"></span><span>&nbsp;Thank</span></button>\
      </div>\
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
  var dataset = data["items"]
    .filter(excludeUserPages)
    .filter(excludeAnonymousUsers)

  var cards = dataset.map(makeCard)

  var rowOfCards = ab.chunk(cards, 3)
  rowOfCards = rowOfCards.map(function(a){
    return a.join('')
  }).map(function(s){
    return '<div class="row card-row">'+s+'</div>'
  }).forEach(addToPage)

  var timer = 0
  dataset.forEach(function(o){
    var idBase = xmlgetter.queryParser(o["link"])["oldid"]
    $('#card-'+idBase).delay(timer+=50).animate({'opacity': 1.0}, 500)
  })
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
