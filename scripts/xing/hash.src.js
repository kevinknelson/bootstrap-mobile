/*!
 * xing.hash
 * http://xingcreative.com/
 *
 * Copyright 2013 Kevin K. Nelson
 * Released under the MIT license
 */
define(['jquery','require'],function($, require, undefined) {
    //region PRIVATE MEMBERS/METHODS
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
        _getPageId = function( path ) {
            var result  = '',
                parts   = path.split('/');
            $.each( parts, function(index,value) {
                if( value != '' ) {
                    result += (result == '' || result == '#' ? '' : '-') + value;
                }
            } );
            return result;
        },
        changePage  = function(newHash) {
            var urlSplit        = newHash.split('?'),
                pageId          = _getPageId(urlSplit[0]),
                $page           = pageId=='' || pageId=='#' ? _$firstPage : $(pageId),
                script          = $page.data('script'),
                template        = $page.data('template'),
                triggerCallback = function() {
                    if( script != null ) { $page.trigger('scriptloaded'); }
                };

            if( urlSplit[1] !== undefined ) {
                _setUrlParams(urlSplit[1]);
            }
            if( _currentHash != newHash && (script != null || template != null) ) {
                var deps        = ['require'];
                if( script != null ) { deps.push(script); }
                if( template != null ) {
                    $.get(require.toUrl(template),function(response) {
                        $page.html(response);
                        $page.data('template',null)
                        requirejs(deps,triggerCallback);
                    } );
                }
                else {
                    requirejs(deps,triggerCallback);
                }
            }
            if( newHash !== undefined && newHash != _currentHash ) {
                _currentHash            = newHash;
                _$pages.each(function() {
                    var $this = $(this);
                    $this.toggle( $this[0] === $page[0] );
                } );
            }
        },
    //endregion

    //region LITERAL CLASS DEFINITION: hash (NOTE, ASSUMING COMMA IS ABOVE TO NOT NEED var)
    /** @name XingHash */
    XingHash         = {
        get             : function( key ) {
            return _get[key] === undefined ? null : _get[key];
        },
        changePage      : function(newHash) {
            window.location.hash = newHash;
        }
    };
    //endregion

    //region EVENT HANDLERS
    $(_window).on('hashchange',function() {
        if( _window.location.hash != _currentHash ) {
            changePage(_window.location.hash);
        }
    });
    //instead of changing hash directly, we can make buttons with data-toggle=page and data-target='#hashPath'
    $(_document).on('click.page','[data-toggle=page]',function(e) {
        _window.location.hash = $(this).data('target');
    });
    // ONLY NEEDED IF USING BOOTSTRAP NAVBAR.  This code will ensure that menu
    // gets closed for single-page apps where we are just changing the hash.
    $(_document).on('click.nav','.navbar-collapse.in',function(e) {
        if( $(e.target).is('a') ) {
            $(this).collapse('hide');
        }
    });
    //check the URL when DOM ready so we can reload pages by path
    $(_document).ready( function() {
        _$pages     = $('.page');
        _$firstPage = _$pages.first();
        changePage(_window.location.hash);
    });
    //endregion

    return XingHash;
});