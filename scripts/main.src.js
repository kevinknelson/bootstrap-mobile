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
    'use strict';
    var elem                            = document.createElement('canvas'),
        // you can change to true to use Zepto if it works for your project.
        // Unfortunately, Zepto doesn't work with the bootstrap menu system,
        // so I've disabled it by default
        isSiteZeptoCompatible           = false,
        useZepto                        = isSiteZeptoCompatible && '__proto__' in {} && !!(elem.getContext && elem.getContext('2d')),
        shim                            = useZepto ? {'jquery':{exports:'Zepto',init:function() { window.jQuery=window.Zepto; }}} : {},
        isProduction                    = window.location.host.replace('www.','') === 'myproductionsite.com'
    ;

    require.config({
        baseUrl     : 'scripts',
        defaultExt  : isProduction ? '.js' : '.src.js', //or replace require.src.js with unmodified copy
        paths: {
            'jquery'            : useZepto ? 'lib/zepto-combined' : 'lib/jquery-combined',
            'JSON'              : 'lib/json',
            'moment'            : 'plugins/moment/moment',
            'moment-timezone'   : 'plugins/moment/moment-timezone'
        },
        shim: shim
    });

    if( typeof JSON !== 'undefined' ) {
        define('JSON',[],function() { return JSON; });
    }
    define('xing',[],function() { return {}; });

    requirejs(['jquery','xing/hash'],function($,hash) {
        hash.config('#page-container','ui/views','ui/templates','.html');
        hash.init();
        $(document).on('click','[data-action=toggle]', function() {
            $($(this).data('target')).toggle();
        } );
    });
})();