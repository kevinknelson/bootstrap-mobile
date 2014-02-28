(function() {
    /**
     * jQuery can't use a shim because it uses RequireJS's define() method to define itself as 'jquery'.
     * Zepto, on the other hand, doesn't use the define() call and it's global is 'Zepto' instead of jQuery.
     * So, we have to make both the jquery path and the shim-ing conditional on which library is going to be used.
     * In addition to Zepto's recommended condition of '__proto__' in {}, I've added an HTML5 check which ensures
     * that older, incompatible browsers (e.g. Firefox 3.6) won't use Zepto.  This means MORE browsers are going to
     * download jQuery than need to, but I'd rather a slow-loading working library for those that don't need it
     * than a quick download of nothing for those that do.
     *
     * Also, thank-you to Modernizr for an example of checking for canvas.
     *
     * Android 2.1 and IOS Safari 3.2 are not Zepto compatible but have canvas support...so these two specific versions
     * may fail IF they have __proto__ (I don't care enough to try to find out).  Otherwise, based on the two
     * cross-references of Zepto and caniuse.com, all browsers should work with this configuration of zepto/jquery fallback.
     */
    var elem                            = document.createElement('canvas'),
        isHtml5AndNotIE                 = false && '__proto__' in {} && !!(elem.getContext && elem.getContext('2d')),
        shim                            = isHtml5AndNotIE ? {'jquery':{exports:'Zepto',init:function() { window.jQuery=Zepto; }}} : {};

    require.config({
        baseUrl:    'scripts',
        defaultExt: '.src.js', //change this to .js for production, or replace require.src.js with unmodified copy
        paths: {
            jquery:         isHtml5AndNotIE ? 'lib/zepto-combined' : 'lib/jquery-combined',
            JSON:           'lib/json'
        },
        shim: shim
    });

    if( typeof JSON != 'undefined' ) {
        define('JSON',[],function() { return JSON; });
    }

    requirejs(['jquery','xing/hash'],function($,hash) {

    });
})();