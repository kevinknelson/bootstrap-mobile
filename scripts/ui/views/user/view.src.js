define(['jquery','../../../xing/hash','xing/http'],function($,hash,http) {
    'use strict';
    var lastId          = null,
        prefix          = '#user-view',
        $page           = $(prefix),
        $templates      = $(prefix+'-templates'),
        $userHtml       = $templates.find('.user-details')
    ;

    $page.on('scriptloaded',function() {
        var currentId   = +hash.get('id');
        if( currentId !== lastId ) {
            http.get('~/mock/users.js',{},function( results ) {
                results = $.parseJSON(results);
                $.each( results, function( index, user ) {
                    if( user.Id === currentId ) {
                        var $clone      = $userHtml.clone(),
                            $emailLink  = $('<a />').attr('href','mailto:'+user.Email).html(user.Email);

                        $clone.find('.userid').html(user.Id);
                        $clone.find('.username').html(user.Username);
                        $clone.find('.fullname').html(user.FirstName+' '+user.MiddleName+' '+user.LastName);
                        $clone.find('.email').append($emailLink);
                        $page.html($clone);
                    }
                });
            } );
            lastId      = currentId;
        }
        else {
            http.message("This user is already loaded, so we didn't reload it.");
        }
    } );

});