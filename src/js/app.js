var xmlgetter = require('./xmlgetter')

function makeCard(o){
  var rev = xmlgetter.queryParser(o["link"])
  console.log(rev["oldid"]); // should be the ID for the block

  return '<div class="row"><div class="col-md-12"><h3><a href="'+o["link"]+'">'+o["title"]+'</a><small> by '+o["author"]+'</small></h2></div></div><div class="row"><div class="col-md-12">'+o["description"]+'</div></div><div class="row"><div class="col-md-12"><button class="btn btn-default"><span class="glyphicon glyphicon-heart" aria-hidden="true"></span><span>&nbsp;Thank</span></button></div></div>'
}

function excludeUserPages(o){
  return (!(o["title"].includes('User')))
}

function excludeAnonymousUsers(o){
  return (!(o["author"].match(/\d{2,3}\.\d{3}\.\d{2,3}\.\d{2,3}/)))
}

function addToPage(o){
  $('#main').append(makeCard(o))
}

$(document).ready(function(){
  console.log('hello werld');
  var myGetString = "https://en.wikipedia.org/w/api.php?action=feedrecentchanges&hideminor=true&hidebots=true"
  var encodedUrlForApiCall = xmlgetter.getEncodedUrl(myGetString);

  var myPostString = "https://en.wikipedia.org/w/api.php?action=thank&format=json&rev=624145252&source=history"
  var myPostOptions = {
    token: "809b48eb5023bab3a1fe5fa7b7d9642f567091f7+\\"
  }

  var myApiCall = "http://rss2json.com/api.json?&rss_url="+encodedUrlForApiCall

  $.get(myApiCall, function(data){
    data["items"].filter(excludeUserPages)
      .filter(excludeAnonymousUsers)
      .forEach(addToPage)
  })

  $.ajax({
    'url': "https://en.wikipedia.org/w/api.php",
    'data': {
      action: 'query',
      meta: 'tokens',
      format: 'json',
      origin: 'https://en.wikipedia.org'
    },
    'xhrFields': {
      'withCredentials': true
    },
    'success': function(d){
      console.log(d);
    }
  })  


})
