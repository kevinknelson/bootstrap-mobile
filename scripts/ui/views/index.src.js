define(['jquery','xing/http'],function($,http) {
    'use strict';
    var loaded  = false,
        prefix  = '#index',
        $page   = $(prefix)
    ;
    $page.on('scriptloaded',function() {
        if( !loaded ) {
            http.get('~/mock/index.html',{}, function( results ) {
                $page.html(results);
                loaded = true;
            } );
        }
    } );

});