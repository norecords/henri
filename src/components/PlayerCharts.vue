<template>
  <div class="row">
    <div class="col-12">
      <h4>Graphiques</h4>
    </div>
    <div
      v-if="show"
      class="col-12"
    >
        <Highstock :options="bonusOptions" />
    </div>
    <div
      v-if="show"
      class="col-12 mt-3 mb-3"
    >
        <Highcharts :options="top5Options" />
    </div>
    <div
      v-else
      class="col-12 mb-3"
    >
        <Highcharts :options="defaultOptions" />
    </div>
  </div>
</template>

<script>
import Highcharts from 'highcharts'
import { createHighcharts } from 'vue-highcharts';
import loadStock from 'highcharts/modules/stock'
import exportingInit from 'highcharts/modules/exporting'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserPlus, faChartLine } from '@fortawesome/free-solid-svg-icons'
import { faSteam } from '@fortawesome/free-brands-svg-icons'

loadStock(Highcharts)
exportingInit(Highcharts)

library.add(faUserPlus, faChartLine, faSteam)
export default {
  name: 'PlayerCharts',
  components: {
    Highstock: createHighcharts('Highstock', Highcharts),
    Highcharts: createHighcharts('Highcharts', Highcharts)
  },
  data () {
    return {
      bonusOptions: {},
      top5Options: {},
      graphs: {},
      bonusdatas: {
        bonuses: [],
        skill: [],
        skillChange: [],
        mapPlotlines: []
      },
      subtitles: this.$store.state.player.summary.lastName + '<br>STEAM_0:' + this.$store.state.player.summary.uniqueId,
      top5datas: {
        categories: [],
        kills: [],
        headshots: [],
        hits: []
      },
      show: false,
      defaultOptions: {
        title: {
          text: 'Not Enought Data!'
        },
        subtitle: {
          text: this.subtitles
        },
        xAxis: {
          type: 'datetime'
        },
        yAxis: {
          title: {
          text: 'Bonus'
          }
        },
        series: [{
          name: 'bonus',
          data: [{x: Date.now(), y: 0}],
          yAxis: 0,
          visible: false
        }]
      }
    }
  },
  created () {
    if (this.$store.state.player.graphs.success === true) {
        this.show = true
        for (let i = 0; i < this.$store.state.player.graphs.bonus.length; i++) {
        this.bonusdatas.bonuses.push(
            {x: this.$store.state.player.graphs.bonus[i].timestamp * 1000, y: this.$store.state.player.graphs.bonus[i].bonus, map: this.$store.state.player.graphs.bonus[i].map}
        )
        }
        // Skill and skill change array
        for (let i = 0; i < this.$store.state.player.graphs.skill.length; i++) {
        this.bonusdatas.skill.push(
            [this.$store.state.player.graphs.skill[i].timestamp * 1000, this.$store.state.player.graphs.skill[i].skill]
        )
        this.bonusdatas.skillChange.push(
            [this.$store.state.player.graphs.skill[i].timestamp * 1000, this.$store.state.player.graphs.skill[i].skill_change]
        )
        }
        // array maps changes via plotlines on xAxis
        for (let i = 0; i < this.$store.state.player.graphs.maps.length; i++) {
        var pline = {
            color: 'white',
            width: 1,
            dashStyle: 'shortdash',
            value: this.$store.state.player.graphs.maps[i].timestamp * 1000,
            zIndex: 1,
            label: {
            text: this.$store.state.player.graphs.maps[i].map,
            style: {
                color: 'white',
                fontWeight: 'bold'
            }
            }
        }
        this.bonusdatas.mapPlotlines.push(pline)
        }
        this.bonusOptions = {
        title: {
            text: 'Bonus and Skill'
        },
        subtitle: {
            text: this.subtitles
        },
        rangeSelector: {
            buttons: [{
            type: 'day',
            count: 7,
            text: '7d'
            }, {
            type: 'day',
            count: 14,
            text: '14d'
            }, {
            type: 'all',
            text: 'all'
            }],
            buttonTheme: {
            width: 35
            },
            selected: 0
        },
        xAxis: {
            type: 'datetime',
            plotLines: this.bonusdatas.mapPlotlines
        },
        yAxis: [{
            title: {
            text: 'Bonus'
            }
        }, {
            title: {
            text: 'skill'
            },
            opposite: false,
            min: 1000
        }, {
            title: {
            text: 'skill change'
            },
            opposite: false,
            visible: false
        }, {
            plotLines: [{
            value: 0,
            width: 2,
            color: 'silver'
            }]
        }],
        plotOptions: {
            series: {
            showInNavigator: true
            }
        },
        navigator: {
            enabled: false
        },
        series: [{
            name: 'bonus',
            data: this.bonusdatas.bonuses,
            yAxis: 0,
            step: true,
            zIndex: 99,
            tooltip:
            {pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br>Map: <b>{point.map}</b><br>'}
        }, {
            name: 'skill',
            data: this.bonusdatas.skill,
            yAxis: 1,
            type: 'column',
            pointWidth: 8
        }, {
            name: 'skill change',
            data: this.bonusdatas.skillChange,
            yAxis: 2,
            lineWidth: 0,
            marker: {
            enabled: true,
            lineWidth: 3,
            fillColor: 'white',
            lineColor: Highcharts.getOptions().colors[2]
            },
            states: {
            hover: {
                lineWidthPlus: 0
            }
            }
        }],
        tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> <br/>',
            changeDecimals: 2,
            valueDecimals: 0,
            split: true
        }
        }
        // TOP 5
        for (let i = 0; i < this.$store.state.player.graphs.weapons.length; i++) {
        this.top5datas.categories.push(this.$store.state.player.graphs.weapons[i].smweapon.toUpperCase())
        this.top5datas.kills.push(this.$store.state.player.graphs.weapons[i].smkills)
        this.top5datas.headshots.push(this.$store.state.player.graphs.weapons[i].smheadshots)
        this.top5datas.hits.push(this.$store.state.player.graphs.weapons[i].smhits)
        }
        this.top5Options = {
        chart: {
            renderTo: 'chartWeaponsTop5',
            type: 'column',
            inverted: true,
            polar: false
        },
        title: {
            text: 'Weapons Top 5'
        },
        subtitle: {
            text: this.subtitles
        },
        tooltip: {
            useHTML: true,
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> <br/>',
            outside: true
        },
        xAxis: {
            tickInterval: 1,
            labels: {
            align: 'right',
            useHTML: true,
            allowOverlap: true,
            step: 1,
            y: 3,
            style: {
                fontSize: '13px'
            }
            },
            lineWidth: 0,
            categories: this.top5datas.categories
        },
        yAxis: {
            title: null,
            crosshair: {
            enabled: true,
            color: '#333'
            },
            lineWidth: 0,
            tickInterval: 25,
            endOnTick: true,
            showLastLabel: true
        },
        plotOptions: {
            column: {
            borderWidth: 0,
            pointPadding: 0,
            groupPadding: 0.15
            }
        },
        series: [{
            name: 'Kills',
            data: this.top5datas.kills
        }, {
            name: 'Headshots',
            data: this.top5datas.headshots
        }, {
            name: 'Hits',
            data: this.top5datas.hits
        }]
      }
    } else {
        this.show = false
    }
  },
  beforeMount () {
    return this.bonusOptions, this.top5Options
  }
}
</script>
