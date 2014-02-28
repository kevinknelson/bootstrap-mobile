/*!
 * xing.session
 * http://xingcreative.com/
 *
 * Copyright 2013 Kevin K. Nelson
 * Released under the MIT license
 */
define(['jquery','lib/json'],function($,json) {
    var getStorage          = function() {
            if( typeof sessionStorage != 'undefined' ) {
                try {
                    sessionStorage.setItem("storage", "");
                    sessionStorage.removeItem("storage");
                    return sessionStorage;
                }
                catch(e) {
                    return null;
                }
            }
            return null;
        },
        isStored           = function( key ) {
            return _hasStorage && _sessionStorage.getItem(key) != null;
        },
        getStoredValue     = function( key ) {
            if( isStored(key) ) {
                var result = _sessionStorage.getItem(key);
                XingSession.set(key, result);
                return result;
            }
            return null;
        },

        _vars               = {},
        _sessionStorage     = getStorage(),
        _hasStorage         = _sessionStorage != null,

        XingSession = {
            get     : function( varName ) {
                return typeof _vars[varName] == 'undefined' ? getStoredValue(varName) : _vars[varName];
            },
            set     : function( varName, value ) {
                _vars[varName] = value;
            },
            store   : function( varName, value ) {
                this.set(varName,value);
                if( _hasStorage ) {
                    _sessionStorage.setItem(varName,value);
                }
            },
            getObject   : function( varName ) {
                return JSON.parse(this.get(varName));
            },
            setObject   : function( varName, object ) {
                this.set(varName, json.stringify(object));
            },
            storeObject : function( varName, object ) {
                this.store(varName, json.stringify(object));
            }
        };
    return XingSession;
});