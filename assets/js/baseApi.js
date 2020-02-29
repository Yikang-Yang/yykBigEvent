$.ajaxPrefilter(function (option) {

    // option就是调用ajax时的配置对象
    option.url = 'http://www.liulongbin.top:3007' + option.url
    // 为有权限的接口 统一添加headers
    // 根据接口权限进行判断要不要加请求头
    if (option.url.indexOf('/my/') !== -1) {
        option.headers = {
            Authorization: localStorage.getItem('token')
        }
        option.complete = function (res) {
            // 使用 res.responseJSON 获取到服务器的响应内容
            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                // 用户没有登录，就来访问 index 页面
                // 1. 清空假 token
                localStorage.removeItem('token')
                // 2. 强制用户跳转到 登录页面
                location.href = '/login.html'
            }
        }
    }

})