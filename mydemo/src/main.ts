import { createApp } from 'vue'
import App from './App.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import {createPinia} from 'pinia'
import router from './router'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import 'element-plus/dist/index.css'
import '@/icons'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const app = createApp(App)
const state = createPinia()
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(router).use(state).mount('#app')
app.use(ElementPlus, {
  locale: zhCn,
})

import 'element-plus/dist/index.css'


import '@/icons'
import Vue from 'vue'



createApp(App).use(ElementPlus).use(state).use(router).mount('#app')

