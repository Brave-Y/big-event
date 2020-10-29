let form = layui.form;
function renderForm() {
    $.ajax({
        url: '/my/userinfo',
        success: function (res) {
            console.log(res)
            form.val('abc', res.data)
            console.log(123)
        }
    })
}
renderForm();
$('form').on('submit', function (e) {
    e.preventDefault();
    let data = $(this).serialize();
    $.ajax({
        type: 'POST',
        data: data,
        url: '/my/userinfo',
        success: function (res) {
            layer.msg(res.message)
            if (res.status === 0) {
                window.parent.renderUser();
                console.log(666)
            }
        }
    })
})
$('button[type=reset]').on('click', function (e) {
    e.preventDefault();
    renderForm();
})