let form = layui.form;

// ------------------- 获取分类 -------------------
$.ajax({
    url: '/my/article/cates',
    success: function (res) {
        // console.log(res)
        let html = template('tpl-category', res);
        $('select[name=cate_id]').html(html);
        // 更新渲染
        form.render('select');
    }
});
// --------------------  内容区更换为富文本编辑器 -------------------------
initEditor();

// --------------------  剪裁插件 ----------------------------------
// 初始化剪裁框
let $image = $('#image');
let options = {
    // 宽高比例
    aspectRatio: 400 / 280,
    // 预览区容器的类名
    preview: '.img-preview'
};
$image.cropper(options);
// 点击按钮，能够选择图片
$('button:contains("选择封面")').on('click', function () {
    $('#file').trigger('click');
})
// 文件域的文件切换的时候，更换剪裁区的图片
$('#file').on('change', function () {
    let fileObj = this.files[0];
    let url = URL.createObjectURL(fileObj);
    // 销毁剪裁区 --> 更换图片 --> 重新生成剪裁区
    $image.cropper('destroy').attr('src', url).cropper(options);
})
// ------------------- 完成添加功能 -------------------
$('form').on('submit', function (e) {
    e.preventDefault();
    // 收集表单数据
    let fd = new FormData(this);
    // 替换FormData对象里面的一项
    fd.set('content', tinyMCE.activeEditor.getContent());
    // 剪裁图片
    let canvas = $image.cropper('getCroppedCanvas', {
        width: 400,
        height: 280
    });
    // 把图片转成 blob 形式
    canvas.toBlob(function (blob) {
        // 把 文件 追加到fd中
        fd.append('cover_img', blob);
        // ajax完成添加
        $.ajax({
            type: 'POST',
            url: '/my/article/add',
            data: fd,
            processData: false,
            contentType: false,
            success: function (res) {
                // console.log(res);
                layer.msg(res.message);
                if (res.status === 0) {
                    location.href = '/article/article.html';
                }
            }
        });
    });
});