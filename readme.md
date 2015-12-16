# Personal project

This is my personal project. It's basically just GET and POST requests against the wikipedia API.

Here's the plan.

__MVP__

 1. [x] GET [recent edits](https://en.wikipedia.org/w/api.php?action=help&modules=feedrecentchanges)

2. [ ] The user browses summaries of recent edits

3. [ ] The user can at their discretion reward editors for their edits by POSTing to the [thank](https://en.wikipedia.org/w/api.php?action=help&modules=thank) action.

__Stretch__

* Thanks are a finite resource? e.g., You can only send 5 per day?

## What I Have Learned

* __Bower__ bower downloads front end assets and resolves dependencies. It doesn't do anything with them though. Including them in your project is up to you. I don't know if I'll use it in the future.

  * ?? why would you use bower if a CDN is available for the assest?

    * in case you want to work offline, or

    * in case you want to make changes to the defaults (see: bootstrap)

  * todo: build gulp tasks to automate incorporating bower modules.

    * this is really annoying and seems to require a lot of manual editing of the package file, overriding each package's 'main' file

* __Bootstrap.__ neat layout tool.

* __CORS__, xhr, etc. My xml feed API does not have a _Access-Control-Allow-Origin_ header, which apparently means that it can the request will be denied. "No 'Access-Control-Allow-Origin' header is present on the requested resource."

  * [cors-anywhere](https://cors-anywhere.herokuapp.com/): lifesaver

* new __gulp plugins__

  1. browserSync! is pretty nifty.

  2. there is a neat gulp-gh-pages package that makes for very easy deploy to gh-pages.

* the __Wikipedia API.__ the POST request I chose to use requires authentication via a 'token' string, which I _cannot_ get to work.

  1. __Latest:__ sending an md5 hash of a token returns a badtoken error.

  1. gotten over all the CORS issues. But remote token fetching still returns an anonymous token, which you cannot use to post data.

  2. The token must be included in the POST body.

  3. The POST body must be set to content-type: x-www-for-urlencoded.

  1. Using an anonymous token (`+\`) returns a "not logged in" error code, which is the only thing I can get it to do besides "badtoken"

  2. You get different token values everytime you call `api.php?action=query&meta=tokens`, none of which work. (The request answers with 'badtoken' if you post with a csrf, patrol, rollback, userrights, or watch token.)

  3. You're supposed to be able to get an _Access-Control-Allow-Origin_ header if you set the right origin in the data object of your GET request, but it keeps returning 'null'.

## Links

  __for this project itself__

  * [github](https://github.com/chrisman/g18-chrisbrown-project1)

  * ~~[firebase](https://g18-chrisbrown.firebaseapp.com)~~ [gh-pages](http://chrisman.github.io/g18-chrisbrown-project1/) (Firebase wouldn't allow any ajax/cors without SSL and my api didn't have HTTPS. gh-pages works.)

  * [pivotal tracker](https://www.pivotaltracker.com/projects/1498456)

  __references and resources__

  * [MediaWiki API help](https://en.wikipedia.org/w/api.php)

  * [MediaWiki API Sandbox](https://en.wikipedia.org/wiki/Special:ApiSandbox#action=query&meta=tokens&format=json)

  * [MediaWiki CORS Manual](https://www.mediawiki.org/wiki/Manual:CORS)

  * [RSS2JSON](http://rss2json.com/)

  * [programmableweb](http://www.programmableweb.com/api/wikipedia)

  * [cors-anywhere](https://cors-anywhere.herokuapp.com/)

## Project Owners

* April is my project owner

* I am tommys pwner
