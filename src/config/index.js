const env = import.meta.env.MODE || 'prod';
const EnvConfig = {
    dev: {
        baseApi: '/api',
        mockApi: 'https://www.fastmock.site/mock/c1c302e8baed9894c48c17e4738c092e/api'
    },
    test: {
        baseApi: '/',
        mockApi: ''
    },
    prod: {
        baseApi: '/',
        mockApi: ''
    }
}

export default {
    env,
    mock: true,
    ...EnvConfig[env],
    namespace: 'manager'
}
