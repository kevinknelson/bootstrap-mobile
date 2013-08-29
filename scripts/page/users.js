define(['jquery'],function($) {
    var loaded          = false,
        $container      = $('#UsersContainer'),
        $templates      = $('#templates'),
        $userListHtml   = $templates.find('.users-list');

    $(document).on('scriptloaded','#page-users',function() {
        if( !loaded ) {

            $.get('/mock/users.json',function( results ) {
                $.each( results, function( index, user ) {
                    var $clone      = $userListHtml.clone(),
                        $emailLink  = $('<a />').attr('href','mailto:'+user.Email).html(user.Email);

                    $clone.find('.username').html(user.Username);
                    $clone.find('.fullname').html(user.FirstName+' '+user.MiddleName+' '+user.LastName);
                    $clone.find('.email').append($emailLink);
                    $clone.find('.user-link').data('target','#page-user?id='+user.Id);
                    $container.append($clone);
                });
                loaded  = true;
            });
        }
        else {
            alert("already loaded, let's not reload automatically");
        }
    } );

});