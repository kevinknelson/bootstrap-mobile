/*!
 * xing.hash
 * http://xingcreative.com/
 *
 * Copyright 2013 Kevin K. Nelson
 * Released under the MIT license
 */
;define(["jquery"],function(g,c){var j,d,a=window,k=document,h={},b=null,e=function(l){return{key:l[0],value:l[1]}},i=function(m){h={};var l=m.split("&");g.each(l,function(n,p){var o=e(p.split("="));if(h[o.key]===c){h[o.key]=o.value}else{if(typeof h[o.key]=="object"){h[o.key].push(o.value)}else{h[o.key]=[h[o.key],o.value]}}h[o[0]]=o[1]})},f={get:function(l){return h[l]===c?null:h[l]},changePage:function(p){var o=p.split("?"),m=o[0],n=m==""||m=="#"?d:g(m),l=n.data("script");if(o[1]!==c){i(o[1])}if(l!=null&&b!=p){requirejs([l],function(){n.trigger("scriptloaded")})}if(p!==c&&p!=b){b=p;j.each(function(){var q=g(this);q.toggle(q[0]===n[0])})}}};g(a).on("hashchange",function(){if(a.location.hash!=b){f.changePage(a.location.hash)}});g(k).on("click.page","[data-toggle=page]",function(l){a.location.hash=g(this).data("target")});g(k).on("click.nav",".navbar-collapse.in",function(l){if(g(l.target).is("a")){g(this).collapse("hide")}});g(k).ready(function(){j=g(".page");d=j.first();f.changePage(a.location.hash)});return f});