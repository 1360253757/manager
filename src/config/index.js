const env = import.meta.env.MODE || 'prod';
console.log(env)
const EnvConfig = {
    dev: {
        baseApi: '/api',
        mockApi: 'https://www.fastmock.site/mock/c1c302e8baed9894c48c17e4738c092e/api'
    },
    test: {
        baseApi: '/api',
        mockApi: ''
    },
    production: {
        baseApi: '/api',
        mockApi: ''
    }
}

export default {
    env,
    mock: true,
    ...EnvConfig[env],
    namespace: 'manager'
}
