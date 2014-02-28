/*!
 * xing.session
 * http://xingcreative.com/
 *
 * Copyright 2013 Kevin K. Nelson
 * Released under the MIT license
 */
;define(["jquery","lib/json"],function(f,i){var c=function(){if(typeof sessionStorage!="undefined"){try{sessionStorage.setItem("storage","");sessionStorage.removeItem("storage");return sessionStorage}catch(j){return null}}return null},a=function(j){return b&&h.getItem(j)!=null},d=function(k){if(a(k)){var j=h.getItem(k);g.set(k,j);return j}return null},e={},h=c(),b=h!=null,g={get:function(j){return typeof e[j]=="undefined"?d(j):e[j]},set:function(k,j){e[k]=j},store:function(k,j){this.set(k,j);if(b){h.setItem(k,j)}},getObject:function(j){return JSON.parse(this.get(j))},setObject:function(k,j){this.set(k,i.stringify(j))},storeObject:function(k,j){this.store(k,i.stringify(j))}};return g});