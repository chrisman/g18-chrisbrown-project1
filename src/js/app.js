var xmlgetter = require('./xmlgetter')

$(document).ready(function(){
  console.log('hello werld');

  var apiurl = xmlgetter.getEncodedUrl("https://en.wikipedia.org/w/api.php?action=feedrecentchanges");
  var jsonurl = "http://rss2json.com/api.json?&rss_url="+apiurl

  var xhr = new XMLHttpRequest()

  xhr.onreadystatechange = function(){
    if (xhr.readyState==4 && xhr.status==200) {
     var data = JSON.parse(xhr.responseText);
     if(data.status == 'ok'){
       var output = '<h1>'+data.feed.title+'</h1>';
       for(var i=0;i<data.items.length;++i){
         output += '<p><h2><a href="' +
           data.items[i].link + '" >' +
           data.items[i].title + '</h2></a></p>';
       }
       console.log(output);
     }
    }
   };
   xhr.open('GET',jsonurl,true);
   xhr.send();
})
