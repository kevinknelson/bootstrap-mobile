define(['jquery','xing/http'],function($,http) {
    var loaded          = false,
        prefix          = '#user-index',
        $page           = $(prefix),
        $container      = $(prefix+'-container'),
        $templates      = $(prefix+'-templates'),
        $userListHtml   = $templates.find('.users-list');

    $page.on('scriptloaded',function() {
        if( !loaded ) {
            http.get('~/mock/users.js',{},function( results ) {
                results = $.parseJSON(results);
                $.each( results, function( index, user ) {
                    var $clone      = $userListHtml.clone(),
                        $emailLink  = $('<a />').attr('href','mailto:'+user.Email).html(user.Email);

                    $clone.find('.username').html(user.Username);
                    $clone.find('.fullname').html(user.FirstName+' '+user.MiddleName+' '+user.LastName);
                    $clone.find('.email').append($emailLink);
                    $clone.find('.user-link').data('target','#!/user/view?id='+user.Id);
                    $container.append($clone);
                });
                loaded  = true;
            });
        }
        else {
            http.message("already loaded, let's not reload automatically");
        }
    } );

});