//--------------切换盒子--------
$('.login a').click(function () {
    $('.login').hide().next().show();
})
$('.register a').click(function () {
    $('.login').show().next().hide();
})

//----------注册----------
$('.register form').on('submit', function (e) {
    e.preventDefault();
    //收集表单数据
    let data = $(this).serialize()
    //ajax提交
    $.ajax({
        type: 'POST',
        url: 'http://ajax.frontend.itheima.net/api/reguser',
        data: data,
        success: function (res) {
            layer.msg(res.message)
            if (res.status === 0) {
                $('.login').show().next().hide();
                $('.register form')[0].reset()
            }
        }
    })
})
//---------------验证规则---------
let form = layui.form;
form.verify({
    changdu: [/^\S{6,12}$/, '长度6~12位，不能有空格'],
    same: function (val) {
        let pwd = $('.register .pwd').val();
        if (pwd !== val) {
            return '两次密码不一致哦！'
        }
    }
})
//---------------------登录---------------------
$('.login form').on('submit', function (e) {
    e.preventDefault();
    $.ajax({
        type: 'POST',
        url: 'http://ajax.frontend.itheima.net/api/login',
        data: $(this).serialize(),
        success: function (res) {
            layer.msg(res.message)
            if (res.status === 0) {
                localStorage.setItem('token', res.token);
                location.href = '/index.html';
            }
        }
    })
})