import {createApp} from 'vue'
import App from './App.vue'
import router from './router/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import api from './api'
import store from './store'
import storage from './utils/storage'

const app = createApp(App);

// 创建 v-has 指令，控制按钮显示与否
app.directive('has', {
    beforeMount: function (el, binding) {
        let actionList = storage.getItem('actionList');
        let value = binding.value;
        let hasPermission = actionList.includes(value)
        if (!hasPermission) {
            // 按钮权限缺失
            el.style = 'display:none';
            setTimeout(() => {
                el.parentNode.removeChild(el);
            }, 0)
        }
    }
})

app.config.globalProperties.$api = api
app.use(router).use(ElementPlus, {size: 'mini'}).use(store)
app.mount('#app')
