(function() {
    var isHtml5AndNotIE     = function() {
        var elem = document.createElement('canvas');
        return '__proto__' in {} && !!(elem.getContext && elem.getContext('2d'));
    };
    require.config({
        baseUrl: 'scripts',
        defaultExt: '.min.js',
        paths: {
            jquery:     isHtml5AndNotIE() ? 'lib/zepto' : 'lib/jquery',
            bootstrap:  'lib/bootstrap'
        }
    });

    requirejs(['jquery','xing/hash'],function($,hash) {

    });
})();