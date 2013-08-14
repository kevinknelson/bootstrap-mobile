Bootstrap Mobile w/ Zepto & RequireJS (Skeleton)
===============

----------
[**Try It Out**](https://rawgithub.com/kevinknelson/bootstrap-mobile/master/index.html)

## Features

* **LIGHTWEIGHT** - Zepto and Bootstrap are less than half the size of jQuery & jQuery mobile.  If the browser isn't compatible with Zepto, JQuery is used instead to optimize compatibility.
* Using the hash class, changing pages is as easy as jQuery mobile.
* Unlike jQuery Mobile's default, you can use query parameters (e.g. `#page-name?id=3`) so that stateless, external links are possible.
* Lazy-load of page scripts.  Don't load the script for `#page2` until the user visits `#page2` without needing an additional MV* framework.

In building the jQuery Mobile skeleton project, which I also have available, I was discouraged by the size of jQuery combined with jQuery Mobile when I wasn't planning to use the majority of the features available in jQuery Mobile, nor did I like jQuery Mobile's approach to dynamically changing all of your HTML markup to make things layout correctly.  It gives it that "mobile app" feel, but I'm not certain that is worth the bloat when mobile connections still tend to be sporadic and sometimes slow.  So, I investigated the options and found Zepto.  Zepto has all the features I need, and with some conditionals in the RequireJS config, I'm able to fallback to jQuery for non-supporting browsers...Win-Win.

**Not for Everybody** If you have an extremely complex app with a lot of data management, it may be better to look into KnockoutJS, Backbone, etc., for a more robust MV* framework.

In any case, this project combines the following into a usable starter-kit/skeleton by combining:

* `Zepto` w/ `jQuery` fallback
* `Bootstrap 3`
* `RequireJS`

It modifies the above in two ways:

* `RequireJS` is a non-breaking customized version of RequireJS.  It allows a defaultExt configuration option that allows you to default to .min.js extensions.  If you overwrite this with the current RequireJS release, it will still work, but it will grab the .js files instead.  This is a useful feature for me because my IDE: phpStorm automatically generates the .min.js files next to my .js files as I modify them.
* `xing/hash` is an AMD module that monitors hash changes to change the page similar to the way that jQuery Mobile works except with class='page' instead of data-role='page'. In addition to monitoring the hash and changing the page, the hash script does the following:
  * allow query parameters in the URL (e.g. #page-name?id=3)
  * lazy-load the page script needed for that specific page if one is specified on the class='page' tag using the data-script attribute.

See index.html class='page' tags for examples of including page scripts.

See `page/facility.js` for an example of how to retrieve query parameters.

In the event you are using a button rather than an anchor tag and you want to change the hash with that button, rather than writing any JavaScript, etc., `xing/hash` also sets up a listener that listens for any click on an element with `[data-toggle=page]` and will change the page to what is set in the `data-target` attribute.

## Note

I will work on extending the examples over time so that you can see a way to where something like page/facility.js can either A) show the data already loaded (if the last time you went to the page it was ?id=3 and it's the same the next time you go there), or B) load up new data when that data is not loaded.

Other dependencies, such as verifying that when a person goes to a link that they are logged in, have permission, etc., is beyond the scope of what this is for--for the time being.

* * *

Author: Kevin K. Nelson [http://xingcreative.com](http://xingcreative.com/)

* hopefully obvious, but just in case, I'm not claiming to have authored Zepto, Bootstrap, or RequireJS

Copyright © 2013 Kevin K. Nelson | MIT license