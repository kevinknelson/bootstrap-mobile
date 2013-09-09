Bootstrap 3 Single-Page App Skeleton
===============
###w/ Zepto/JQuery & RequireJS for mobile and responsive sites

----------
[**Try It Out**](https://rawgithub.com/kevinknelson/bootstrap-mobile/master/index.html)

## Features

* **LIGHTWEIGHT** - Zepto and Bootstrap are less than half the size of jQuery & jQuery mobile.  If the browser isn't compatible with Zepto, JQuery is used instead to optimize compatibility.
* **EASY PAGE TRANSITION** - Using the hash class, changing pages is as easy as jQuery mobile...just less animation and "cool-ness" factors.
* **QUERY PARAMETERS** - Unlike jQuery Mobile's default, you can use query parameters (e.g. `#page-name?id=3`) so that stateless, external links are possible.
* **BEST PRACTICES** - or "better than average practices" at least.  Using RequireJS we Lazy-load page scripts (e.g. don't load the script for `#page2` until the user visits `#page2` without needing an additional MV* framework.)  Other things like combining files to reduce the number of HTTP requests is recommended.  To do further optimization, however, you'll want to go to RequireJS and study up :).

In building the jQuery Mobile skeleton project, which I also have available, I was discouraged by the size of jQuery combined with jQuery Mobile when I wasn't planning to use the majority of the features available in jQuery Mobile, nor did I like jQuery Mobile's approach to dynamically changing all of your HTML markup to make things layout correctly, which then requires you to call refresh methods all the time.  JQuery Mobile is "cool" because it gives it that "mobile app" feel, but I'm not certain that is worth the bloat when mobile connections still tend to be sporadic and sometimes slow.  So, I investigated the options and found Zepto.  Zepto has all the features I need, and with some conditionals in the RequireJS config, I'm able to fallback to jQuery for non-supporting browsers...**Win-Win**.

**Not for Everybody** If you have an extremely complex app with a lot of data management, it may be better to look into KnockoutJS, Backbone, etc., for a more robust MV* framework.  However, this may at least help you get started if you are starting from scratch.

In any case, this project combines the following into a usable starter-kit/skeleton by combining:

* `Zepto` w/ `jQuery` fallback for maximum compatibility
* `Bootstrap 3` bootstraps mobile-first responsive CSS
* `RequireJS` dependency file management for JavaScript

It modifies the above in two ways:

* `RequireJS` is a non-breaking customized version of RequireJS.  It allows a defaultExt configuration option that allows you to default to .src.js extensions when debugging and back to .js when you deploy for the minified versions.  If you overwrite this with the current RequireJS release, it will still work, but it will grab the .js minified files only.  This is a useful feature for me because my IDE: phpStorm automatically generates the minified file as I make changes to source code.
* `xing/hash` is an AMD module that monitors hash changes to change the page similar to the way that jQuery Mobile works except with class='page' instead of data-role='page'. In addition to monitoring the hash and changing the page, the hash script does the following:
  * allow query parameters in the URL (e.g. #page-name?id=3)
  * lazy-load the page script needed for that specific page if one is specified on the class='page' tag using the data-script attribute.


> See index.html class='page' tags for examples of including page scripts.

> See `page/user.js` for an example of how to retrieve query parameters.

In the event you are using a button rather than an anchor tag and you want to change the hash with that button, rather than writing any JavaScript, etc., `xing/hash` also sets up a listener that listens for any click on an element with `[data-toggle=page]` and will change the page to what is set in the `data-target` attribute.

## Note

The skeleton is setup with some example pages where you can see that a refresh will take you back to the page you were on, it will load up the needed script for that page and load the content, then going back to that page later, unless a query parameter has changed from the last time the page was loaded, it will just show the page and not waste its time reloading.  This does require that you do some checking in the scriptloaded event handler, but I provided some examples to help those a bit newer to single page apps on how to do it.

## Change Log

### 9th September 2013

* moved require.js into lib/ folder with other libraries.
* changed source version of JS files to .src.js so that minified versions can be .js.  This will allow the default require.js to run the minified versions.  I still have the modified require.js, however, because I want to see the source code for debugging purposes...but users of this skeleton can upgrade require.js without worry of breaking anything.

* * *

Author: Kevin K. Nelson [http://xingcreative.com](http://xingcreative.com/)

* hopefully obvious, but just in case, I'm not claiming to have authored Zepto, Bootstrap, or RequireJS

Copyright © 2013 Kevin K. Nelson | MIT license