/*!
 * xing.http
 * http://xingcreative.com/
 *
 * Copyright 2013 Kevin K. Nelson
 * Released under the MIT license
 */
;define(["jquery","xing"],function(e,i){var c=e("body"),g=e(c.data("progressDisplay")),l=e(c.data("statusMessage")),a=window.location.pathname,j=a.substring(0,a.lastIndexOf("/")),f="//"+window.location.host+j,h=0,k=function(){if(g.length>0){g.show();h++}},d=function(){if(--h<1){h=0;g.hide()}},b=function(n,m){return function(o){if(m){d()}n(e.parseJSON(o.response))}};i.http={BasePath:j,SitePath:f,redirect:function(m){k();window.location.href=m.replace("~",this.BasePath)},get:function(o,n,p,m){i.http.ajax("GET",o,n,p,m)},post:function(o,n,p,m){i.http.ajax("POST",o,n,p,m)},put:function(o,n,p,m){i.http.ajax("PUT",o,n,p,m)},ajax:function(m,p,o,q,n){n=n||false;e.ajax({type:m,url:p.replace("~",this.BasePath),data:o,success:n?q:function(r){d();q(r)},error:b(q,!n)});if(!n){k()}},stackCall:k,unstackCall:d,forceEndStack:function(){h=0;d()},message:function(o,n,m,p){if(l.length){l.find(".content").html(o);l.toggleClass("error",!!n).show("fast");setTimeout(function(){l.hide("fast");if(p){p()}},typeof m==="undefined"?1400:(m*1000))}}};return i.http});