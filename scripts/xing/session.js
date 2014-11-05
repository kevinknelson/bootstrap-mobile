/*!
 * xing.session
 * http://xingcreative.com/
 *
 * Copyright 2013 Kevin K. Nelson
 * Released under the MIT license
 */
;define(["jquery","lib/json","xing"],function(f,i,h){var c=function(){if(typeof sessionStorage!=="undefined"){try{sessionStorage.setItem("storage","");sessionStorage.removeItem("storage");return sessionStorage}catch(j){return null}}return null},a=function(j){return b&&g.getItem(j)!=null},d=function(k){if(a(k)){var j=g.getItem(k);h.session.set(k,j);return j}return null},e={},g=c(),b=g!=null;h.session={get:function(j){return typeof e[j]==="undefined"?d(j):e[j]},set:function(k,j){e[k]=j},store:function(k,j){this.set(k,j);if(b){g.setItem(k,j)}},getObject:function(j){return i.parse(this.get(j))},setObject:function(k,j){this.set(k,i.stringify(j))},storeObject:function(k,j){this.store(k,i.stringify(j))}};return h.session});