import { createApp } from 'vue'
import Highcharts from 'highcharts';
import VueHighcharts from 'vue-highcharts';
import router from './router'
import store from './store'
import axios from 'axios'
import 'bootstrap'
import '@/scss/custom.scss'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import App from './App.vue'

// load these modules as your need
import loadStock from 'highcharts/modules/stock.js';
import HighchartsChartTem from 'highcharts/themes/dark-unica'

loadStock(Highcharts)
HighchartsChartTem(Highcharts)

const app = createApp(App)
app.use(router)
app.use(store)
app.use(VueHighcharts, { Highcharts })
app.config.globalProperties.$api=axios
app.component('fa-icon', FontAwesomeIcon)
app.mount('#app')