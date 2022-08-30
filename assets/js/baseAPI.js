/**
 * 每次调用 $.post() $.get() $.ajax() 之前
 * 都会先调用这个函数 ajaxPrefilter
 * 拿到给ajax提供的配置对象
 */
$.ajaxPrefilter(function (options) {
  options.url = 'http://www.liulongbin.top:3007' + options.url;
  return options.url;
});