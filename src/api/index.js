import request from './../utils/request'
import user from './user'
import menu from './menu'
import role from './role'
import dept from './dept'

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
    // 获取 nav 菜单列表
    // getMenuList() {
    //     return request({
    //         url: '/menu/list',
    //         method: 'get'
    //     })
    // },
    user,
    menu,
    role,
    dept
}
