/*!
 * xing.http
 * http://xingcreative.com/
 *
 * Copyright 2013 Kevin K. Nelson
 * Released under the MIT license
 */
define(['jquery','xing'],function($,xing) {
    'use strict';
    var $body       = $('body'),
        $progress   = $($body.data('progressDisplay')),
        $status     = $($body.data('statusMessage')),
        curPath     = window.location.pathname,
        baseDir     = curPath.substring(0, curPath.lastIndexOf('/')),
        sitePath    = '//'+window.location.host+baseDir,
        stackCount  = 0,
        stackCall   = function() {
            if( $progress.length > 0 ) {
                $progress.show();
                stackCount++;
            }
        },
        unstackCall = function() {
            if( --stackCount < 1 ) {
                stackCount = 0;
                $progress.hide();
            }
        },
        getErrorHandler = function( callback, doUnstack ) {
            return function( xhr ) {
                if( doUnstack ) {
                    unstackCall();
                }
                callback($.parseJSON(xhr.response));
            };
        }
    ;
    /**
     * @type {{BasePath: string, SitePath: string, redirect: Function, get: Function, post: Function, put: Function, ajax: Function, stackCall: Function, unstackCall: Function, forceEndStack: Function, message: Function}} xing.http
     */
    xing.http = {
        BasePath	: baseDir,
        SitePath	: sitePath,
        redirect    : function( path ) {
            stackCall(); // show our processing loader when changing pages
            window.location.href    = path.replace('~',this.BasePath);
        },
        get         : function( path, data, callback, stopLoadingIcon ) {
            xing.http.ajax('GET',path,data,callback,stopLoadingIcon);
        },
        post        : function( path, data, callback, stopLoadingIcon  ) {
            xing.http.ajax('POST',path,data,callback,stopLoadingIcon);
        },
        put         : function( path, data, callback, stopLoadingIcon ) {
            xing.http.ajax('PUT',path,data,callback,stopLoadingIcon);
        },
        ajax        : function( type, path, data, callback, stopLoadingIcon ) {
            stopLoadingIcon = stopLoadingIcon || false;

            $.ajax( {
                type        : type,
                url         : path.replace('~',this.BasePath),
                data        : data,
                success     : stopLoadingIcon ? callback : function(response) { unstackCall(); callback(response); },
                error       : getErrorHandler(callback, !stopLoadingIcon)
            } );

            if( !stopLoadingIcon ) {
                stackCall();
            }
        },
        stackCall       : stackCall,
        unstackCall     : unstackCall,
        forceEndStack   : function() {
            stackCount = 0;
            unstackCall();
        },
        message     : function( msg, isError, timeoutSecs, callback ) {
            if( $status.length ) {
                $status.find('.content').html(msg);
                $status.toggleClass('error',!!isError).show('fast'); // force isError to boolean with !!
                setTimeout( function() {
                    $status.hide('fast');
                    if( callback ) { callback(); }
                }, typeof timeoutSecs === 'undefined' ? 1400 : (timeoutSecs * 1000));
            }
        }
    };

    return xing.http;
});