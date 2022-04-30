import request from './../utils/request'
import user from './user'
import menu from './menu'
import role from './role'
import dept from './dept'
import leave from './leave'

export default {
    login(data) {
        return request({
            url: '/users/login',
            method: 'post',
            data,
            mock: false
        })
    },
    // 检查未读通知数
    noticeCount() {
        return request({
            url: '/leave/count',
            method: 'get'
        })
    },
    getPermissionList() {
        return request({
            url: '/users/getPermissionList',
            method: 'get',
            data: {},
            mock: false
        })
    },
    user,
    menu,
    role,
    dept,
    leave
}
