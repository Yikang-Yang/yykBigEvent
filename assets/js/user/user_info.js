$(function () {

    var layer = layui.layer
    var form = layui.form

    form.verify({
        // 昵称的验证规则
        nickname: [
            /^[\S]{2,6}$/
            , '昵称必须2到6位，且不能出现空格'
        ]
    })
    // 初始化用户信息
    initUserInfo()

    function initUserInfo () {
        $.ajax({

            type: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败')
                }
                form.val('f1', res.data)
            }
        })
    }

    // 重置按钮事件
    $('.layui-btn-primary').on('click', function (e) {
        e.preventDefault()
        // 重新获取用户信息 渲染表单
        initUserInfo()

    })
    $('#form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    console.log('1444');

                    return layer.msg('信息更新失败')
                }
                layer.msg('信息更新成功')
                // 更新index页面的信息
                window.parent.getUserInfo()
                console.log(4545);

            }
        })
    })

})