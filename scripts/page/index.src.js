define(['jquery'],function($) {
    var loaded = false;
    $(document).on('scriptloaded','#page-index',function() {
        if( !loaded ) {
            var $indexPage = $(this);
            $.get('mock/index.html',function( results ) {
                $indexPage.html(results);
            } );
        }
    } );

});