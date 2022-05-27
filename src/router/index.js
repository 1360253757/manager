import {createRouter, createWebHashHistory} from 'vue-router'
import Home from '../components/Home.vue'
import API from '../api/index'
import utils from '../utils/utils'
import storage from '../utils/storage'

const routes = [
    {
        name: 'home',
        path: '/',
        meta: {
            title: '首页'
        },
        component: Home,
        redirect: '/system/user',
        children: [
            {
                name: 'user',
                path: '/system/user',
                meta: {
                    title: '用户管理'
                },
                component: () => import('../views/User.vue')
            }
        ]
    },
    {
        name: 'login',
        path: '/login',
        meta: {
            title: '登录'
        },
        component: () => import('../views/Login.vue')
    },
    {
        name: '404',
        path: '/404',
        meta: {
            title: '未找到页面'
        },
        component: () => import('../views/404.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})


async function loadAsyncRoutes() {
    let userInfo = storage.getItem('userInfo') || {}
    if (userInfo.token) {
        try {
            const {menuList, actionList} = await API.getPermissionList();
            storage.setItem('actionList', actionList)
            storage.setItem('menuList', menuList)
            let routes = utils.generateRoute(menuList)
            routes.map(route => {
                let url = `../views/${route.name}.vue`
                route.component = () => import(url)
                router.addRoute("home", route);
            })
        } catch (error) {

        }
    }
}
await loadAsyncRoutes();

// 导航守卫
router.beforeEach((to, from, next) => {
    if (router.hasRoute(to.name)) {
        document.title = to.meta.title;
        next()
    } else {
        next('/404')
    }
})


export default router


