//获取用户信息我函数
function renderUser() {
    $.ajax({
        url: '/my/userinfo',
        success: function (res) {
            if (res.status === 0) {
                //渲染用户信息
                let name = res.data.nickname || res.data.username;
                $('.username').text(name)

                //渲染头像
                if (res.data.user_pic) {
                    $('.layui-nav-img').attr('src', res.data.user_pic).show();

                } else {
                    let fist = name.substr(0, 1).toUpperCase();
                    $('.text-avatar').text(fist).css('display', 'inline-block')

                }
            }
        },
    })
}
renderUser();


// -------------- 退出功能 -----------------
// 点击退出，询问，删除token，跳转到login.html
$('#logout').on('click', function () {
    layer.confirm('确定退出吗？', { icon: 3, title: '提示' }, function (index) {
        //do something
        // 移除token
        localStorage.removeItem('token');
        // 跳转到login.html
        location.href = '/login.html';

        layer.close(index); // 关闭弹层
    });
});