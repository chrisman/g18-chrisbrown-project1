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

  var $fullDescription = $($.parseHTML(desc))
  var $briefSummary = $('<table>').append($fullDescription.find('ins, del').closest('tr'))

  return '\
  <div id="poster-'+ idBase +'"\
  <div class="modal fade poster" tabindex="-1" role="dialog">\
    <div class="modal-dialog">\
      <div class="modal-content">\
        <div class="modal-header">\
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\
          <h4 class="modal-title"><a href="' + o["link"] + '">' + o["title"] + '</a><small> by <a href="https://en.wikipedia.org/wiki/User:' + o["author"] + '">'+ o["author"] +'</a></small></h4>\
        </div>\
        <div class="modal-body">\
          '+ desc +'\
        </div>\
        <div class="modal-footer">\
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\
        <button id="poster-thank-'+ idBase +'" class="btn btn-default btn-thanks" data-toggle="tooltip" data-placement="top" title="Thank '+ o["author"] +' for this contribution"><i class="fa fa-heart-o"></i><span>&nbsp;Thank</span></button>\
        </div>\
      </div><!-- /.modal-content -->\
    </div><!-- /.modal-dialog -->\
  </div><!-- /.modal -->\
  <div id="card-'+ idBase +'" class="container-fluid col-md-4 card card--dim">\
    <div class="row card__header">\
      <div class="col-md-12">\
      <h3><a href="' + o["link"] + '">' + o["title"] + '</a><small> by <a href="https://en.wikipedia.org/wiki/User:' + o["author"] + '">'+ o["author"] +'</a></small></h3>\
      </div>\
    </div>\
    <div class="row card__summary">\
      <div class="col-md-12">\
      ' + $('<table>').append($briefSummary).html() + '\
      </div>\
    </div>\
    <div class="row card__footer">\
      <div class="col-md-12 text-right">\
      <a id="modal--show'+ idBase +'" class="btn btn-default" data-toggle="modal" data-target="#poster-'+ idBase +'">Show summary</a>\
      <button id="card-thank-'+ idBase +'" class="btn btn-default btn-thanks" data-toggle="tooltip" data-placement="top" title="Thank '+ o["author"] +' for this contribution"> <i class="fa fa-heart-o"></i><span>&nbsp;Thank</span></button>\
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

  $('[data-toggle="tooltip"]').tooltip({
    delay: { "show": 500, "hide": 100 }
  })
}


$(document).ready(function() {
  var encodedUrlForApiCall = xmlgetter.getEncodedUrl(_str["getFeedRecentChanges"]);

  $.get(_str["rss2json"]+encodedUrlForApiCall, handleGetMyApiCall)

  $(document).on('click', '.btn-thanks', function(e) {
    var that = $(this)
    that.html('<i class="fa fa-spinner fa-spin"></i>')

    $.get(_str["corsAnywhere"]+_str["getTokens"], function(res){
      _str["postOptions"]["token"] = res["query"]["tokens"]["csrftoken"]

      $.post(_str["corsAnywhere"]+_str["apiEndPoint"], _str["postOptions"]).done(function(x){
        if ('error' in x) {
          that.toggleClass("btn-default").toggleClass("btn-danger").html("uh-oh..")
        } else {
          that.toggleClass("btn-default").toggleClass("btn-success").html('<i class="fa fa-heart fa-lg"></i>')
        }
      })
    })
  })
})
