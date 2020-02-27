$(function () {
    $('#link-reg').on('click', function () {

        $('.login_box').hide()
        $('.reg_box').show()
    })
    $('#link-login').on('click', function () {
        $('.login_box').show()
        $('.reg_box').hide()
    })
})