define(['jquery'],function($, undefined) {
    //region PRIVATE MEMBERS/METHODS (NOTE, ASSUMING COMMA IS ABOVE TO NOT NEED var)
    var _$pages, _$firstPage,
        _window             = window,
        _document           = document,
        _get                = {},
        _currentHash        = null,
        _getKeyValuePair    = function( arr ) {
            return { key:arr[0], value:arr[1] };
        },
        _setUrlParams       = function( queryStringParams ) {
            _get                = {};
            var params          = queryStringParams.split('&');
            $.each( params, function( index, param )  {
                var keyValue    = _getKeyValuePair(param.split('='));
                if( _get[keyValue.key] === undefined ) {
                    _get[keyValue.key]   = keyValue.value;
                }
                else if( typeof _get[keyValue.key] == 'object' ) {
                    _get[keyValue.key].push(keyValue.value);
                }
                else {
                    _get[keyValue.key]  = [ _get[keyValue.key], keyValue.value ];
                }
                _get[keyValue[0]] = keyValue[1];
            } );
        },
    //endregion

    //region LITERAL CLASS DEFINITION: hash (NOTE, ASSUMING COMMA IS ABOVE TO NOT NEED var)
    hash         = {
        get             : function( key ) {
            return _get[key] === undefined ? null : _get[key];
        },
        changePage      : function(newHash) {
            var urlSplit        = newHash.split('?'),
                pageId          = urlSplit[0],
                $page           = pageId=='' || pageId=='#' ? _$firstPage : $(pageId),
                script          = $page.data('script');

            if( urlSplit[1] !== undefined ) {
                _setUrlParams(urlSplit[1]);
            }
            if( script != null && _currentHash != newHash ) {
                requirejs([script], function() {
                    $page.trigger('scriptloaded');
                });
            }
            if( newHash !== undefined && newHash != _currentHash ) {
                _currentHash            = newHash;
                _$pages.each(function() {
                    var $this = $(this);
                    $this.toggle( $this[0] === $page[0] );
                } );
            }
        }
    };
    //endregion

    //region EVENT HANDLERS
    $(_window).on('hashchange',function() {
        if( _window.location.hash != _currentHash ) {
            hash.changePage(_window.location.hash);
        }
    });
    //instead of changing hash directly, we can make buttons with data-toggle=page and data-target='#hashPath'
    $(_document).on('click.page','[data-toggle=page]',function(e) {
        _window.location.hash = $(this).data('target');
    });
    //check the URL when DOM ready so we can reload pages by path
    $(_document).ready( function() {
        _$pages     = $('.page');
        _$firstPage = _$pages.first();
        hash.changePage(_window.location.hash);
    });
    //endregion

    return hash;
});