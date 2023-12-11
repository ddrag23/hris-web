import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import icons from '@/plugins/icon'
import { resetStore } from './utils'

addIcons(...icons)
const app = createApp(App)

const pinia = createPinia()
pinia.use(resetStore)
app.use(pinia)
app.use(router)
app.use(ElementPlus)
app.component('VIcon', OhVueIcon)
app.mount('#app')
