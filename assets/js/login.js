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

    $('#form-reg').on('sumit', function (e) {
        e.preventDefault()

        $.ajax({
            type: 'post',
            url: url + '/api/login',
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
        // 1. 阻止默认提交行为
        e.preventDefault()
        // 2. 手动发起 ajax 请求
        $.ajax({
            type: 'POST',
            url: 'http://www.liulongbin.top:3007/api/login',
            data: $(this).serialize(),
            success: function (res) {
                // 先使用 if 判断失败的请求，然后 return 出去
                // 如果没有被 return 出去，那就是成功了
                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                // 提示用户登录成功
                layer.msg('登录成功！')
                // 将服务器颁发的 token 字符串，持久化存储到 localStorage
                localStorage.setItem('token', res.token)
                // 跳转到后台首页
                location.href = '/index.html'
            }
        })
    })



})

