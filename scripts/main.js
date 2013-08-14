(function() {
    var elem            = document.createElement('canvas'),
        isHtml5AndNotIE = '__proto__' in {} && !!(elem.getContext && elem.getContext('2d')),
        shim            = isHtml5AndNotIE ? {'jquery':{exports:'Zepto'}} : {};

    require.config({
        baseUrl:    'scripts',
        defaultExt: '.min.js',
        paths: {
            jquery:     isHtml5AndNotIE ? 'lib/zepto' : 'lib/jquery',
            bootstrap:  'lib/bootstrap'
        },
        shim: shim
    });

    requirejs(['jquery','xing/hash'],function($,hash) {

    });
})();