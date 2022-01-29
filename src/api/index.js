import request from './../utils/request'

export default {
    login(data) {
        return request({
            url: '/user/login',
            method: 'post',
            data
        })
    },
    // 检查未读通知数
    noticeCount() {
        return request({
            url: '/leave/count',
            method: 'get'
        })
    },
    // 获取 nav 菜单列表
    getMenuList() {
        return request({
            url: '/menu/list',
            method: 'get'
        })
    },
}