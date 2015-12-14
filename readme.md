# Personal project

This is my personal project. It's basically just GET and POST requests against the wikipedia API.

Here's the plan.

__MVP__

1. GET [recent edits](https://en.wikipedia.org/w/api.php?action=help&modules=feedrecentchanges)

2. The user browses summaries of recent edits

3. The user can at their discretion reward editors for their edits by POSTing to the [thank](https://en.wikipedia.org/w/api.php?action=help&modules=thank) action.

__Stretch__

* Thanks are a finite resource? e.g., You can only send 5 per day?

## Links

__for this project itself__

* [github](https://github.com/chrisman/g18-chrisbrown-project1)

* [firebase](https://g18-chrisbrown.firebaseapp.com)

* [pivotal tracker](https://www.pivotaltracker.com/projects/1498456)

__references and resources__

* [MediaWiki API help](https://en.wikipedia.org/w/api.php)

## What I Have Learned

* Bower. bower downloads front end assets and resolves dependencies. It doesn't do anything with them though. Including them in your project is up to you.

  * ?? why would you use bower if a CDN is available for the assest?

  * todo: build gulp tasks to automate incorporating bower modules.

* Bootstrap. neat layout tool.

* CORS, xhr, etc. My xml feed API does not have a _Access-Control-Allow-Origin_ header, which apparently means that it can the request will be denied. "No 'Access-Control-Allow-Origin' header is present on the requested resource."

## Project Owners

* April is my project owner

* I am tommys pwner
