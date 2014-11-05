/*!
 * xing.hash
 * http://xingcreative.com/
 *
 * Copyright 2013 Kevin K. Nelson
 * Released under the MIT license
 */
define(['jquery','require','xing'],function($, require, xing, undefined) {
    //region PRIVATE MEMBERS/METHODS
    'use strict';
    var _$pages, _$firstPage,
        _window             = window,
        _document           = document,
        _get                = {},
        _currentHash        = null,
        _templatePath       = '',
        _templateExt        = '',
        _viewModelPath      = '',
        _$pageContainer     = null,
        _getKeyValuePair    = function( arr ) {
            return { key:arr[0], value:arr[1] };
        },
        _setUrlParams       = function( queryStringParams ) {
            _get                = {};
            if( queryStringParams ) {
                var params          = queryStringParams.split('&');
                $.each( params, function( index, param )  {
                    var keyValue    = _getKeyValuePair(param.split('='));
                    if( _get[keyValue.key] === undefined ) {
                        _get[keyValue.key]   = keyValue.value;
                    }
                    else if( typeof _get[keyValue.key] === 'object' ) {
                        _get[keyValue.key].push(keyValue.value);
                    }
                    else {
                        _get[keyValue.key]  = [ _get[keyValue.key], keyValue.value ];
                    }
                    _get[keyValue[0]] = keyValue[1];
                } );
            }
        },
        _getPageId = function( path ) {
            return path.replace('/','-');
        },
        _getPageTag = function( path ) {
            var pageId      = _getPageId(path),
                $page       = path==='' ? _$firstPage : $('#'+pageId)
            ;
            if( $page.length ) { return $page; }
            $page = $("<div />").attr('id',pageId).addClass('page').data('script',_viewModelPath+'/'+path).data('template',_templatePath+'/'+path+_templateExt);
            _$pageContainer.append($page);
            _$pages         = $('.page'); //update list since we added tag
            return $page;
        },
        changePage  = function(newHash) {
            var urlSplit        = newHash.split('?'),
                dynamicPath     = urlSplit[0].replace(/^(#|\/|!)+/,''),
                $page           = _getPageTag(dynamicPath),
                script          = $page.data('script'),
                template        = $page.data('template'),
                triggerCallback = function() {
                    if( script != null ) { $page.trigger('scriptloaded'); }
                }
            ;

            _setUrlParams(urlSplit[1]);

            if( _currentHash !== newHash && (script != null || template != null) ) {
                var deps        = ['require'];
                if( script != null ) { deps.push(script); }
                if( template != null ) {
                    $.get(require.toUrl(template),function(response) {
                        $page.html(response);
                        $page.data('template',null);
                        requirejs(deps,triggerCallback);
                    } );
                }
                else {
                    requirejs(deps,triggerCallback);
                }
            }
            if( newHash !== undefined && newHash !== _currentHash ) {
                _currentHash            = newHash;
                _$pages.each(function() {
                    var $this = $(this);
                    $this.toggle( $this[0] === $page[0] );
                } );
            }
        }
    ;
    //endregion

    //region LITERAL CLASS DEFINITION: hash (NOTE, ASSUMING COMMA IS ABOVE TO NOT NEED var)
    /**
     * @type {{get: Function, changePage: Function, config: Function, init: Function}} xing.hash
     */
    xing.hash         = {
        get             : function( key ) {
            return _get[key] === undefined ? null : _get[key];
        },
        changePage      : function(newHash) {
            window.location.hash = newHash;
        },
        config          : function(pageContainerId, viewModelPath, templatePath, templateExtension) {
            _$pageContainer = $(pageContainerId);
            _templatePath   = templatePath;
            _templateExt    = templateExtension;
            _viewModelPath  = viewModelPath;
        },
        init            : function() {
            _$pages     = $('.page');
            _$firstPage = _$pages.first();
            changePage(_window.location.hash);
        }
    };
    //endregion

    //region EVENT HANDLERS
    $(_window).on('hashchange',function() {
        if( _window.location.hash !== _currentHash ) {
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
        if( $(e.target).is('a') && ( $(e.target).attr('class') !== 'dropdown-toggle' ) ) {
            $(this).collapse('hide');
        }
    });
    //endregion

    return xing.hash;
});