let laypage = layui.laypage;
let form = layui.form;
//获取列表
let data = {
    pagenum: 1,  // 获取第1页的数据
    pagesize: 2, // 每页显示2条数据
};
function renderArticle() {
    $.ajax({
        url: '/my/article/list',
        data: data,
        success: function (res) {
            let html = template('tpl-list', res);
            $('tbody').html(html);
            // Ajax请求成功之后，调用showPage
            showPage(res.total);
        }
    });
}
renderArticle();
// ------------------------- 分页 ---------------------------------------
function showPage(t) {
    //执行一个laypage实例
    laypage.render({
        elem: 'page', // 注意，这里的 test1 是 ID，不用加 # 号
        count: t, // 数据总数，从服务端得到
        limit: data.pagesize, // 每页显示条数
        limits: [2, 3, 5, 10], // 下拉框的值，表示每页多少条，下拉框用于更换
        curr: data.pagenum, // 起始页，当前页
        layout: ['prev', 'page', 'next', 'count', 'limit', 'skip'],
        jump: function (obj, first) {
            if (first === undefined) {
                data.pagenum = obj.curr;
                data.pagesize = obj.limit;
                renderArticle();
            }
        }
    });
}
// ------------------------- 发送请求，获取所有的分类 -----------------------
$.ajax({
    url: '/my/article/cates',
    success: function (res) {
        var html = template('tpl-category', res)
        $('select[name=category]').html(html);
        form.render('select');
    }
});
// ------------------------- 完成筛选功能 -----------------------
$('.search').on('submit', function (e) {
    e.preventDefault();
    let p = $(this).serializeArray();
    // 修改请求参数
    data.cate_id = p[0].value;
    data.state = p[1].value;
    // 重置pagenum
    data.pagenum = 1;
    renderArticle();
})