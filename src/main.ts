import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'

import 'normalize.css'

import router from './router'
import store from './store'
const app = createApp(App)

// 注册路由
app.use(router)
// 注册 VueX
app.use(store)

app.mount('#app')
