# Personal project

This is my personal project. It's basically just GET and POST requests against the wikipedia API.

Here's the plan.

__MVP__

1. [x] GET [recent edits](https://en.wikipedia.org/w/api.php?action=help&modules=feedrecentchanges)

2. [x] The user browses summaries of recent edits

3. [x] The user can at their discretion reward editors for their edits by POSTing to the [thank](https://en.wikipedia.org/w/api.php?action=help&modules=thank) action.

__Stretch__

* Thanks are a finite resource? e.g., You can only send 5 per day?

## todo

1. why does css break on page wrap?

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

## Post Mortem

__Smiles__

- Chris: found use of feature branching to try new zany stuff
- Chris: Liked his organization.  Was able to pull them out into their own files. Scott also had a lot of different files
- Chris: used gulp (task runner) to build stuff
- Chris: used BEM (Block Element Modifier) to name his system.  Helps with more organization.
- Chris: enjoyed using TDD to see how his functions would react to the API information.  
- Stuart: Excited to see how Express and Node can make games more efficient.  
- Stuart: Effectively moved back and forward between UI + key functionality.  
- Chris/Stuart: Started with a warm up.  
- Chris: Used stories to drive experience.

__Sads__

- Chris: BEM can be a little bit repetitive
- Stuart: Organization on the project was a struggle.
- Stuart: Wanted to take more of a focus on stories and not defining the next story until I got to the goal of the next one.  
- Stuart: Not a huge fan of Pivotal Tracker.  Felt like it was not that successful for a smaller project.
- Chris/Scott/Stuart: Not hugely connected to our projects.  Turned into a bit of a grind.
- Chris: Starting with wireframes did not work well.
- Chris: felt like he relied Git Stash a little too much
- Scott: Wouldn't use a local Python server again, caused a lot of  issues, especially with pushing.  Made it hard to tell if/when the code was broken.  

__Mehs__

- Scott: Github pages takes a little while to refresh
- Stuart/Chris: Didn't take enough breaks.  
- Stuart: Doing research/setting goals was not great.  Wish there was a better PM relationship.  
- Chris: PM relationship wasn't defined very clearly.  PMs weren't empowered with structure or responsibility.  
- Stuart: Would have defined game stats (UI states) better with regards to User Stories and code development.
- Chris: Going to have a scaffold that's ready to go for the project to reduce the setup time
