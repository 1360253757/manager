import request from './../utils/request'

export default {
    // 获取用户列表
    getUserList(data) {
        return request({
            url: '/users/list',
            method: 'get',
            data,
            mock: false
        })
    },
    // 删除用户
    userDel(data) {
        return request({
            url: '/users/delete',
            method: 'post',
            data,
            mock: false
        })
    },
    // 新增用户时需要角色名称
    getRoleAllList() {
        return request({
            url: '/roles/allList',
            method: 'get',
            mock: true
        })
    },
    // 新增用户时的部门列表
    getDeptList(data) {
        return request({
            url: '/dept/list',
            method: 'get',
            data,
            mock: true
        })
    },
    // 新建/编辑用户
    userSubmit(data) {
        return request({
            url: '/users/operate',
            method: 'post',
            data,
            mock: false
        })
    },
}
