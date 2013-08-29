define(['jquery','xing/hash'],function($,hash) {
    var lastId          = null,
        $container      = $('#UserDetails'),
        $templates      = $('#templates'),
        $userHtml       = $templates.find('.user-details');

    $(document).on('scriptloaded','#page-user',function() {
        var currentId   = hash.get('id');
        if( currentId != lastId ) {
            $.get('/mock/users.json',function( results ) {
                $.each( results, function( index, user ) {
                    if( user.Id == currentId ) {
                        var $clone      = $userHtml.clone(),
                            $emailLink  = $('<a />').attr('href','mailto:'+user.Email).html(user.Email);

                        $clone.find('.userid').html(user.Id);
                        $clone.find('.username').html(user.Username);
                        $clone.find('.fullname').html(user.FirstName+' '+user.MiddleName+' '+user.LastName);
                        $clone.find('.email').append($emailLink);
                        $container.html($clone);
                    }
                });
            });
            lastId      = currentId;
        }
        else {
            alert("already loaded, let's not reload automatically");
        }
    } );

});