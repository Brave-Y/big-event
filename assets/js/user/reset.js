//验证规则
let form = layui.form;
form.verify({
    len: [/\S{6,12}/, '长度6~12w位!'],

    diff: function (val) {
        let oldpwd = $('.oldpwd').val();
        if (oldpwd === val) {
            return '新密码不能和原密码相同'
        }
    },
    same: function (val) {
        let newpwd = $('.newpwd').val()
        if (newpwd !== val) {
            return '两次输入不一样'
        }
    },
})
//重置
$('form').on('submit', function (e) {
    e.preventDefault();
    let data = $(this).serialize();
    $.ajax({
        type: 'POST',
        url: '/my/updatepwd',
        data: data,
        success: function (res) {
            layer.msg(res.message);
            if (res.status === 0) {
                $('form')[0].reset();
            }
        }
    })
})