<template>
<div>
  <div class="row">
    <div class="col-12">
      <h1>Home</h1>
    </div>
    <div class="col-lg-6 mb-3">
      <div class="card bg-dark">
        <div class="card-header">
            Welcome to Cigale Strike Server
        </div>
        <div class="card-body">
            <p>This site is under active development, so don't worry if sometimes displaying the site is broken.</p>
            <p>
              Framework & Dependencies
              <ul class="list-group list-group-flush">
                <li class="list-group-item"><fa-icon :icon="[ 'fab', 'vuejs' ]" size="lg" /> Vuejs 3.0.0 <span class="badge rounded-pill bg-success">success</span></li>
                <li class="list-group-item"><fa-icon icon="chart-line" size="lg" /> Highcharts 8.2.2 <span class="badge rounded-pill bg-success">success</span></li>
                <li class="list-group-item"><fa-icon :icon="[ 'fab', 'bootstrap' ]" size="lg" /> Bootstrap 5.0.0-beta1 <span class="badge rounded-pill bg-success">success</span></li>
                <li class="list-group-item"><fa-icon :icon="[ 'fab', 'font-awesome' ]" size="lg" /> Font Awesome  5.15 <span class="badge rounded-pill bg-success">success</span></li>
              </ul>
            </p>
        </div>
        <div class="card-footer">
            Follow us on 
            <a href="https://github.com/norecords/henri-vuejs3/" target="_blank">
              <fa-icon :icon="[ 'fab', 'github' ]" size="lg" />
            </a>
        </div>
      </div>
    </div>
    <div class="col-lg-6">
      <div class="card bg-dark">
        <div class="card-header">
            Server Stats Summary
        </div>
        <div class="card-body">
            <p>Number of players tracked</p>
            <p>Number of games played</p>
            <p>Server Uptime</p>
            <p>etc..</p>
        </div>
        <div class="card-footer">
            See full server stats
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-12" id="chartServer"></div>
  </div>
</div>
</template>

<script>
import Highcharts from 'highcharts'
import HighchartsChartTem from 'highcharts/themes/dark-unica'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChartLine } from '@fortawesome/free-solid-svg-icons'
import { faJs, faVuejs, faFontAwesome, faGithub, faBootstrap } from '@fortawesome/free-brands-svg-icons'

HighchartsChartTem(Highcharts)

library.add(faChartLine, faBootstrap, faFontAwesome, faGithub, faJs, faVuejs)

export default {
  mounted () {
    new Highcharts.chart({
      chart: {
          renderTo: 'chartServer'
      },
      title: {
          text: 'Server Stats'
      },
      subtitle: {
          text: 'uptime'
      },
      xAxis: {
          type: 'datetime'
      },
      yAxis: {
          title: {
          text: 'y title'
          }
      },
      series: [{
          name: 'uptime',
          data: [{x: Date.now(), y: 0}],
          yAxis: 0,
          visible: false
      }]
    })
  }
}
</script>
