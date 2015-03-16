Bootstrap 3 Single-Page App Skeleton
===============
###Zepto/JQuery & RequireJS with Bootstrap 3 for mobile and responsive sites

In trying to use jQuery Mobile I found much to be desired. It adds that "spiffy" mobile-app appearance combined with a lot of bloat. To top it off, it changes all your HTML markup to different HTML markup, which IMHO, has a definite [**code smell**](http://en.wikipedia.org/wiki/Code_smell). jQuery combined with Bootstrap 3 doesn't give that mobile-app feel, but it allows you to create a responsive website, and it doesn't mess with your markup.

I then wrote the `xing/hash` script as a lightweight MVC-style dependency loader. The script monitors the hash and loads dependencies dynamically based on the path. For example, if you navigate to `#!/auth/register`, it will look for the view markup (`ui/templates/auth/register.html`) and view script/controller (`ui/views/auth/register.js`). This provides a simple way to get started writing a single-page app with minimal code needed (side note: I will probably add a 404 error at some point in the future for invalid paths, but don't have that feature yet).

----------
[**Try It Out**](https://rawgithub.com/kevinknelson/bootstrap-mobile/master/index.html)

## Features

* **EASY PAGE TRANSITION** - Using the hash class, it's as easy as changing the hash.
* **QUERY PARAMETERS** - Unlike jQuery Mobile's default, you can use query parameters (e.g. `#!/page/name?id=3`) so that stateless, external links are possible. Just use `hash.get('id')`.
* **BEST PRACTICES** - or "better than average practices" at least.  Using RequireJS we Lazy-load page scripts (e.g. don't load the script for `#!/page/name` until the user visits `#!/page/name` without needing an additional MV* framework.)  Other things like combining files to reduce the number of HTTP requests is recommended.  To do further optimization, however, you'll want to go to RequireJS and study up :).

**Not for Everybody** If you have an extremely complex app with a lot of data management, it may be better to look into KnockoutJS, Backbone, etc., for a more robust MV* framework.  However, this may at least help you get started if you are starting from scratch.  Also, the #! (hash-bang) URL mechanism leaves something to be desired. If you need any search engine optimization, then you should have code that can generate the HTML with JavaScript disabled and JS that will utilize push-state for navigation within the app.  So, that means this code is best for applications where google search indexing and supporting all users is not really necessary.

## RequireJS Note

`RequireJS` is a non-breaking customized version of RequireJS.  It allows a defaultExt configuration option that allows you to default to .src.js extensions when debugging and back to .js when you deploy for the minified versions.  If you overwrite this with the current RequireJS release, it will still work, but it will grab the .js minified files only.  This is a useful feature for me because my IDE: phpStorm automatically generates the minified file as I make changes to source code.

## xing/hash

`xing/hash` is an AMD module that monitors hash changes to change the page similar to the way that jQuery Mobile works except with class='page' instead of data-role='page'. In addition to monitoring the hash and changing the page, the hash script does the following:
  * allow query parameters in the URL (e.g. #page-name?id=3)
  * lazy-load the page script needed for that specific page if one is specified on the class='page' tag using the data-script attribute.
  * dynamically attempts to load paths that aren't found in the list of pages in a similar fashion as "convention over configuration" server-side MVC frameworks.

## Warning on using Zepto

* Zepto does NOT implement 100% of jQuery's functionality. Since it doesn't, if you flag isSiteZeptoCompatible to true, and you run into issues where some jQuery features don't work, you'll need to solve these problems by either downloading additional Zepto modules (available at zeptojs.com) or fixing the code for yourself.
* Zepto is not fully Bootstrap compatible, so I have made isSiteZeptoCompatible=false by default. If someone can make Zepto Bootstrap compatible without modifying the Bootstrap or Zepto source code (only adding modules or fixes in an external file that can be appended), feel free to send me a pull-request. Personally, I think Zepto was a nice idea, but it seems to fall just a bit short.
* I will leave Zepto as a part of the skeleton for those interested in using it and want the example of using it with RequireJS and having a jQuery fallback script.

> See index.html class='page' tags for examples of including pages manually on the page.

> See `scripts/ui/views/user/*.js` and scripts/ui/templates/uiser/*.html for examples of pages loaded dynamically and how to retrieve query parameters.

In the event you are using a button rather than an anchor tag and you want to change the hash with that button, rather than writing any JavaScript, etc., `xing/hash` also sets up a listener that listens for any click on an element with `[data-toggle=page]` and will change the hash to what is set in the `data-target` attribute.

## Note

The skeleton is setup with some example pages where you can see that a refresh will take you back to the page you were on, it will load up the needed script for that page and load the content, then going back to that page later, unless a query parameter has changed from the last time the page was loaded, it will just show the page and not waste its time reloading.  This does require that you do some checking in the scriptloaded event handler, but I provided some examples to help those a bit newer to single page apps on how to do it.

## Change Log

### 24th July 2014

* Upgraded Bootstrap, JQuery, and Zepto. When using Zepto, there is a bootstrap error w/ `$.event.special`, which I am hiding. It doesn't affect any of the code I'm using, but if you have bootstrap issues, try turning off Zepto support.
* realized I had not included bootstrap fonts or bootstrap-theme files, so included those.
* added ajax-loader.gif.  The loader image will automatically display for the user while it's waiting for a response when you use the http.* AJAX methods, which are just wrappers for the jQuery AJAX methods.
* re-organized code in the /scripts/src folder to make it more obvious what the -combined files contain in the /scripts/lib folder.
* create a Dynamic Loading of the template and view so that you don't have to create empty tag placeholders for your pages.  Just link to them and if the script and template exists, it will load. However, this expects you to have both the HTML and the JS for the dynamically loaded page.
* TO-DO: need to create a pseudo 404 mechanism now that it will dynamically find and load pages based on the URL.

### 9th September 2013

* moved require.js into lib/ folder with other libraries.
* changed source version of JS files to .src.js so that minified versions can be .js.  This will allow the default require.js to run the minified versions.  I still have the modified require.js, however, because I want to see the source code for debugging purposes...but users of this skeleton can upgrade require.js without worry of breaking anything.

* * *

Author: Kevin K. Nelson [http://xingcreative.com](http://xingcreative.com/)

* hopefully obvious, but just in case, I'm not claiming to have authored Zepto, Bootstrap, or RequireJS

Copyright © 2013 Kevin K. Nelson | MIT license