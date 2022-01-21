import {createApp} from 'vue'
import App from './App.vue'
import router from './router/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import api from './api'
import store from './store'

const app = createApp(App);

// app.config.globalProperties.$request = request
app.config.globalProperties.$api = api
app.use(router).use(ElementPlus).use(store)
app.mount('#app')
