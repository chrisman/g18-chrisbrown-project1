module.exports = {
  apiEndPoint: "https://en.wikipedia.org/w/api.php",
  getRecentChanges: "https://en.wikipedia.org/w/api.php?action=feedrecentchanges&hideminor=true&hidebots=true",
  getRecentChangesOptions: {
    action: 'feedrecentchanges',
    hideminor: 'true',
    hidebots: 'true'
  }
  myGetTokensString: "https://en.wikipedia.org/w/api.php?action=query&meta=tokens&type=csrf&format=json",
  testCentralAuthString: "https://en.wikipedia.org/w/api.php?action=centralauthtoken&format=json",
  myPostString: "https://en.wikipedia.org/w/api.php?action=thank&format=json&rev=624145252&source=history",
  myPostStringOptions: {
    action: 'thank',
    format: 'json',
    rev: '624145252',
    source: 'diff',
    token: ''
  },
  corsAnywhere: "https://cors-anywhere.herokuapp.com/",
  rss2json: "http://rss2json.com/api.json?&rss_url="
}
