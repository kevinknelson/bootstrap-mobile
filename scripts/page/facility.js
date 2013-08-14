define(['jquery','xing/hash'],function($,hash) {
    $(document).on('scriptloaded','#page-facility',function() {
        alert('facility '+hash.get('id'))
    } );

});