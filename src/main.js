import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import 'bootstrap'
import '@/scss/custom.scss'

const app = createApp(App)
app.use(router)
app.config.globalProperties.$api=axios
app.mount('#app')