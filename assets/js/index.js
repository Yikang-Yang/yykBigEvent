$(function () {
    // var layer = layui.layer;
    var layer = layui.layer;
    getUserInfo()

    // 退出按钮绑定事件
    // $('.logout').on('click', function () {

    //     console.log('444444');

    //     layer.confirm('确定要退出吗?', { icon: 3, title: '提示' }, function (index) {
    //         //清楚token
    //         localStorage.removeItem('token')

    //         location.href = '/login.html'

    //         layer.close(index);
    //     })
    // })
    $('.logout').on('click', function () {
        console.log(1);

        layer.confirm('确定要退出登录吗?', { icon: 3, title: '提示' }, function (index) {
            // 1. 清 token
            console.log(2);

            localStorage.removeItem('token')
            // 2. 跳页面
            // location.href = '/login.html'
            console.log('ssssss');


            layer.close(index)
        });
    })
})
// 获取用户信息 一定要写在入口函数之外
function getUserInfo () {
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',


        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            // 渲染头像函数
            renderAvatar(res.data)

        }
    })
}

function renderAvatar (user) {
    var name = user.nickname || user.username
    $('#welcome').html('欢迎你&nbsp;&nbsp;' + name)

    if (user.user_pic) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        // alert('dd')

        $('.layui-nav-img').hide();

        // 获取用户名的第一个字符串
        var first = name[0].toUpperCase()
        // console.log(name[0].toUpperCase());

        $('.text_avatar').html(first).show()
    }
}