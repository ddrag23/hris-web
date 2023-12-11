import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { FaFlag, RiZhihuFill, HiMenuAlt3, HiChevronDown, HiChevronUp } from 'oh-vue-icons/icons'

addIcons(FaFlag, RiZhihuFill, HiMenuAlt3, HiChevronDown, HiChevronUp)
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.component('VIcon', OhVueIcon)
app.mount('#app')
