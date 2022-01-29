const env = import.meta.env.MODE || 'prod';
const EnvConfig = {
    dev: {
        baseApi: '/api',
        // mockApi: 'https://www.fastmock.site/mock/6d159f26447b15f7c626275ae403b6a2/api'
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