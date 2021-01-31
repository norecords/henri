import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import 'bootstrap'
import '@/scss/custom.scss'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const app = createApp(App)
app.use(router)
app.use(store)
app.config.globalProperties.$api=axios
app.component('fa-icon', FontAwesomeIcon)
app.mount('#app')