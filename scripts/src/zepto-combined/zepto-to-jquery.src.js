/**
 * make Zepto work as jQuery for Bootstrap
 * @type {Window.Zepto|*}
 */
window.jQuery=window.Zepto;
window.jQuery.event.special = {};
window.jQuery.fn.jquery     = '1.9.1';
