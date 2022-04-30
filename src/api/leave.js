import request from './../utils/request'

export default {
    getApplyList(params) {
        return request({
            url: '/leave/list',
            method: 'get',
            data: params,
            mock: false
        })
    },
    leaveOperate(params) {
        return request({
            url: '/leave/operate',
            method: 'post',
            data: params,
            mock: false
        })
    },
    leaveApprove(params) {
        return request({
            url: '/leave/approve',
            method: 'post',
            data: params,
            mock: false
        })
    }
}
