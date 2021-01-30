import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import 'bootstrap'
import '@/scss/custom.scss'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChartLine, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { faSteam, faJs, faVuejs, faFontAwesome, faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUserPlus, faChartLine, faFontAwesome, faGithub, faSteam, faJs, faVuejs)
const app = createApp(App)
app.use(router)
app.use(store)
app.config.globalProperties.$api=axios
app.component('fa-icon', FontAwesomeIcon)
app.mount('#app')