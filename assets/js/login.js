$(function () {

    var form = layui.form
    var layer = layui.layer

    $('#link-reg').on('click', function () {

        $('.login_box').hide()
        $('.reg_box').show()
    })
    $('#link-login').on('click', function () {
        $('.login_box').show()
        $('.reg_box').hide()
    })
    var url = 'http://www.liulongbin.top:3007'

    // 自定义校验规则
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        samePwd: function (value) {
            // 1. 通过形参，获取到确认密码框中的值
            // 2. 通过 jQuery 获取到密码框中的值
            var pwd = $('.reg_box [name=password]').val()
            // 3. 进行 if 判断
            if (value !== pwd) {
                // return 一个错误消息
                return '两次的密码不一致！'
            }
        }
    })

    $('#form-reg').on('submit', function (e) {
        e.preventDefault()
        console.log('12对的');

        $.ajax({
            type: 'POST',
            url: '/api/reguser',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {

                    return layer.msg(res.message);
                }

                layer.msg('注册成功，请登录！')
                $('#link-login').click()


            }
        })
    })

    $('#form-login').on('submit', function (e) {

        e.preventDefault()

        $.ajax({
            type: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {

                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                }

                layer.msg('登录成功！')

                localStorage.setItem('token', res.token)
                // 跳转到后台首页
                location.href = '/index.html'
            }
        })
    })



})

