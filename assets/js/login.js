$(function () {
  $("#link_reg").on('click', function () {
    $(".login-box").hide();
    $(".reg-box").show();
  });
  $("#link_login").on('click', function () {
    $(".login-box").show();
    $(".reg-box").hide();
  });
  // 从layui中获取form对象
  var form = layui.form;
  // 通过form.verify()函数自定义验证规则
  form.verify({
    // 密码6~12位
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    // 校验两次密码是否一致
    repwd: function (value) {
      var pwd = $(".reg-box [name=password]").val();
      if (value !== pwd) {
        return "两次密码不一致！";
      }
    },
    username: function (value, item) { //value：表单的值、item：表单的DOM对象
      if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
        return '用户名不能有特殊字符';
      }
      if (/(^\_)|(\__)|(\_+$)/.test(value)) {
        return '用户名首尾不能出现下划线\'_\'';
      }
      if (/^\d+\d+\d$/.test(value)) {
        return '用户名不能全为数字';
      }

      //如果不想自动弹出默认提示框，可以直接返回 true，这时你可以通过其他任意方式提示（v2.5.7 新增）
      if (value === 'xxx') {
        alert('用户名不能为敏感词');
        return true;
      }
    },
  });

  // 从layui中获取form对象
  var layer = layui.layer;
  // 监听注册表单的提交事件
  $("#form-reg").on('submit', function (e) {
    e.preventDefault();
    // http://www.liulongbin.top:3007
    // http://www.liulongbin.top:3007/api/login
    var data = { username: '$("#form-reg [name=username]")', password: '$("#form-reg [name=password]")' };
    $.post('http://www.liulongbin.top:3007/api/reguser',
      data,
      function (res) {
        if (res.status != 0) {
          return layer.msg(res.message);
        }
        layer.msg('注册成功');
        // 模拟点击行为 调用click去登录界面
        $("#link_login").click();
      });
  });

  // 监听登录表单的提交事件
  $("#form-login").submit(function (e) {
    e.preventDefault();
    $.ajax({
      // url: "http://www.liulongbin.top:3007/api/login",
      url: "http://www.liulongbin.top:3007/api/login",
      method: "POST",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("登录失败");
        }
        layer.msg("登录成功");
        // 本地存储token
        localStorage.setItem("token", res.token);
        // 跳转到后台
        location.href = "/index.html";
      }
    });
  });

})