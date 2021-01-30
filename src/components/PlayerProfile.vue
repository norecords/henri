<template>
  <div>
    <div v-if="profile.summary" class="row mt-3">
        <div class="col-lg-8">
        <!-- Player profile table -->
        <table
          class="table table-sm table-dark table-striped table-bordered"
        >
        <thead>
            <tr>
            <th style="border-right:0px;"><h4>Player Profile</h4></th>
            <th class="text-right" style="border-left:0px;">
              <a
                id="addUser"
                v-bind:href="profile.summary.addfriend"
              >
                <h4><fa-icon icon="user-plus" /></h4>
              </a>
            </th>
            </tr>
        </thead>
        <tbody>
          <tr>
            <td class="col-4 font-weight-bold">
              {{ profile.summary.lastName }}
            </td>
            <td class="align-middle col-4" rowspan="5">
              <img
                v-bind:src="profile.summary.avatar"
                class="img-fluid img-avatar rounded mx-auto d-block"
                id="avatar"
                title="Avatar"
              />
            </td>
          </tr>
          <tr>
            <td>
              <!--
              <img
                v-bind:src="require(`@/assets/flags/${countryFlag}`)"
                id="country"
                title="Flags"
                width="24px"
                height="18px"
              />
              -->
                {{ profile.summary.country }}
            </td>
          </tr>
          <tr>
            <td>
              <fa-icon :icon="[ 'fab', 'steam' ]" size="lg" />
              <a
                v-bind:href="profile.summary.steamurl"
              >
                0:{{ profile.summary.uniqueId }}
              </a> 
            </td>
          </tr>
          <tr>
            <td>Status
              <span
                class="badge"
                v-bind:class="classOnlineStatusObject(profile.summary.status)"
              >
                {{ profile.summary.status }}
              </span>
            </td>
          </tr>
          <tr>
            <td>Karma
              <span
                class="badge"
                v-bind:class="classKarmaObject(profile.summary.hideranking)"
                >
                {{ karmaText(profile.summary.hideranking) }}
              </span>
            </td>
          </tr>
          <tr>
            <td>Member of Clan</td>
            <td>
              <span
                v-if="profile.summary.clan === 0"
              >
                None
              </span>
              <span
                v-else
              >
                {{ profile.summary.clan }}
              </span>
            </td>
          </tr>
          <tr>
            <td>Real Name</td>
            <td>
              <span
                v-if="profile.summary.fullName"
              >
                {{ profile.summary.fullName }}
              </span>
              <span
                v-else
              >
                None
              </span>
            </td>
          </tr>
          <tr>
            <td>E-mail Address</td>
            <td>
              <a
                v-if="profile.summary.email"
                v-bind:href="'mailto:' + profile.summary.email"
              >
                {{ email(profile.summary.email) }}
              </a>
              <span
                v-else
              >
                None
              </span>
            </td>
          </tr>
          <tr>
            <td>Home Page</td>
            <td>
              <a
                v-if="profile.summary.homepage"
                v-bind:href="profile.summary.homepage"
              >
                {{ homepage(profile.summary.homepage) }}
              </a>
              <span
                v-else
              >
                None
              </span>
            </td>
          </tr>
          <tr>
            <td>MM Rank</td>
            <td>
              <!--
              <img
                v-bind:src="require(`@/assets/mmranks/${mmRank}`)"
                height="20px"
                width="50px"
              />
              -->
            </td>
          </tr>
          <tr>
            <td>Last Connect</td>
            <td>{{ lastConnect(profile.summary.lastconnect) }}</td>
          </tr>
          <tr>
            <td>Total Connection Time</td>
            <td>{{ connectionTime(profile.summary.connection_time) }}</td>
          </tr>
          <tr>
            <td>Average Ping</td>
            <td>
              <span
                v-if="profile.summary.avgping"
              >
                {{ profile.summary.avgping }} ms
              </span>
              <span
                v-else
              >
                None
              </span>
            </td>
          </tr>
          <tr>
            <td>Favorite Server</td>
            <td>
              <span
                v-if="profile.summary.favserver"
              >
                {{ profile.summary.favserver }}
              </span>
              <span
                v-else
              >
                None
              </span>
            </td>
          </tr>
          <tr>
            <td>Favorite Map</td>
            <td>
              <span
                v-if="profile.summary.favmap"
              >
                {{ profile.summary.favmap }}
              </span>
              <span
                v-else
              >
                None
              </span>
            </td>
          </tr>
          <tr>
            <td>Favorite Weapon</td>
            <td>
              <span
                v-if="profile.summary.favweapon"
              >
                {{ profile.summary.favweapon }}
                </span>
              </td>
          </tr>
        </tbody>
        </table>
      </div>
    </div>

    <div class="row">
      <div class="col-12 mb-3" id="chartBonuses"></div>
      <div class="col-12" id="chartWeaponsTop5"></div>
    </div>

    <div v-if="profile.summary">
      <div v-if="profile.weapons.success" class="row">
        <div class="col-12">
          <h4>Statistiques des armes</h4>
          <table
            v-if="profile.weapons.stats.length"
            v-bind:class="table.class"
          >
            <thead>
              <tr>
                <th
                  v-for="item in table.columns.stats"
                  v-bind:key="item"
                >
                  {{ item }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="weapons in profile.weapons.stats"
                v-bind:key="weapons.smweapon"
              >
                <td> <!--
                  <img
                    v-bind:src="require(`@/assets/weapons/${weapons.smweapon}.png`)"
                    id="weapons"
                    title="weapons"
                    class="mx-auto d-block"
                  /> -->
                </td>
                <td>
                    {{ weapons.smshots }}
                </td>
                <td>
                    {{ weapons.smhits }}
                </td>
                <td>
                    {{ weapons.smdamage }}
                </td>
                <td>
                    {{ weapons.smheadshots }}
                </td>
                <td>
                    {{ weapons.smkills }}
                </td>
                <td>
                    {{ weapons.smkdr }}
                </td>
                <td>
                    {{ weapons.smaccuracy }}
                </td>
                <td>
                    {{ weapons.smdhr }}
                </td>
                <td>
                    {{ weapons.smspk }}
                </td>
              </tr>
            </tbody>
          </table>
          <span class="alert"
            v-else
            variant="danger"
            show
          >
            Not Enought Data!
          </span>
        </div>
        <div class="col-12">
          <h4>Statistiques des trajectoires</h4>
          <table
            v-if="profile.weapons.targets.length"
            v-bind:class="table.class"
          >
            <thead>
              <tr>
                <th
                  v-for="item in table.columns.targets"
                  v-bind:key="item"
                >
                  {{ item }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="weapons in profile.weapons.targets"
                v-bind:key="weapons.smweapon"
              >
                <td> <!--
                  <img
                    v-bind:src="require(`@/assets/weapons/${weapons.smweapon}.png`)"
                    id="weapons"
                    title="weapons"
                    class="mx-auto d-block"
                  /> -->
                </td>
                <td>
                    {{ weapons.smhead }}
                </td>
                <td>
                    {{ weapons.smchest }}
                </td>
                <td>
                    {{ weapons.smstomach }}
                </td>
                <td>
                    {{ weapons.smleftarm }}
                </td>
                <td>
                    {{ weapons.smrightarm }}
                </td>
                <td>
                    {{ weapons.smleftleg }}
                </td>
                <td>
                    {{ weapons.smrightleg }}
                </td>
                <td>
                    {{ weapons.smhits }}
                </td>
                <td>
                    {{ weapons.smleft }}
                </td>
                <td>
                    {{ weapons.smright }}
                </td>
                <td>
                    {{ weapons.smmiddle }}
                </td>
              </tr>
            </tbody>
          </table>
          <span class="alert"
            v-else
            variant="danger"
            show
          >
            Not Enought Data!
          </span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Highcharts from 'highcharts'
import stockInit from 'highcharts/modules/stock'
import HighchartsChartTem from 'highcharts/themes/dark-unica'
import exportingInit from 'highcharts/modules/exporting'

stockInit(Highcharts)
HighchartsChartTem(Highcharts)
exportingInit(Highcharts)

export default {
  name: 'PlayerProfile',
  props: ['id'],
  data () {
    return {
      profile: {
      },
      bonusdatas: {
        bonuses: [],
        skill: [],
        skillChange: [],
        mapPlotlines: []
      },
      subtitles: '',
      top5datas: {
        categories: [],
        kills: [],
        headshots: [],
        hits: []
      },
      chart: undefined,
      table: {
        class: 'table table-responsive-lg table-sm table-dark table-striped table-bordered text-right',
        columns: {
          stats: ['', 'Shots', 'Hits', 'Damage', 'Headshots', 'Kills', 'Kills / Death', 'Accuracy', 'Damage per Hit', 'Shot per Kill'],
          targets: ['', 'Head', 'Chest', 'Stomach', 'Left arm', 'Right arm', 'Left leg', 'Right leg', 'Hits', 'Left', 'Right', 'Middle']
        }
      }
    }
  },
  mounted () {
    console.log(this.id)
    this.$api.get('https://cigalestrike.norecords.org/vue/apiv3.php', {
      params: {
        q: 'profile',
        id: this.id
      }
    })
      .then((response) => {
      this.profile = response.data
      this.weapons = response.data.weapons
      console.log(this.profile)

      // Manipulate data that needed
      this.profile.summary.steamurl = 'https://steamcommunity.com/profiles/' + this.profile.summary.uniqueId64.substring(2)
      this.profile.summary.addfriend = 'steam://friends/add/' + this.profile.summary.uniqueId64.substring(2)

      if (this.profile.graphs.success === true) {
      // Generate Charts
      for (let i = 0; i < this.profile.graphs.bonus.length; i++) {
            this.bonusdatas.bonuses.push(
              {x: this.profile.graphs.bonus[i].timestamp * 1000, y: this.profile.graphs.bonus[i].bonus, map: this.profile.graphs.bonus[i].map}
            )
          }
          // Skill and skill change array
          for (let i = 0; i < this.profile.graphs.skill.length; i++) {
            this.bonusdatas.skill.push(
              [this.profile.graphs.skill[i].timestamp * 1000, this.profile.graphs.skill[i].skill]
            )
            this.bonusdatas.skillChange.push(
              [this.profile.graphs.skill[i].timestamp * 1000, this.profile.graphs.skill[i].skill_change]
            )
          }
          // array maps changes via plotlines on xAxis
          for (let i = 0; i < this.profile.graphs.maps.length; i++) {
            var pline = {
              color: 'white',
              width: 1,
              dashStyle: 'shortdash',
              value: this.profile.graphs.maps[i].timestamp * 1000,
              zIndex: 1,
              label: {
                text: this.profile.graphs.maps[i].map,
                style: {
                  color: 'white',
                  fontWeight: 'bold'
                }
              }
            }
            this.bonusdatas.mapPlotlines.push(pline)
          }
          var highchartsOptions = {
            chart: {
              renderTo: 'chartBonuses'
            },
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
          for (let i = 0; i < this.profile.graphs.weapons.length; i++) {
            this.top5datas.categories.push(this.profile.graphs.weapons[i].smweapon.toUpperCase())
            this.top5datas.kills.push(this.profile.graphs.weapons[i].smkills)
            this.top5datas.headshots.push(this.profile.graphs.weapons[i].smheadshots)
            this.top5datas.hits.push(this.profile.graphs.weapons[i].smhits)
          }
          var top5 = {
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
          // eslint-disable-next-line
          this.chart = new Highcharts.stockChart(highchartsOptions)
          // eslint-disable-next-line
          this.chart2 = new Highcharts.chart(top5)
      } // end of If charts api data 
    })
  },
  methods: {
    classOnlineStatusObject: function (el) {
        return {
          'bg-danger': el === 'Offline',
          'bg-success': el === 'Online',
          'bg-info': el === 'In-game'
        }
    },
    karmaText: function (el) {
      return el === 2 ? 'Banned' : 'In good standing'
    },
    classKarmaObject: function (el) {
      return el === 2 ? 'bg-danger' : 'bg-success'
    },
    email: function (el) {
      return el.length > 25 ? el.trim(el).substring(0, 22).slice(0, -1) + '...' : el
    },
    homepage: function (el) {
      return el.length > 25 ? el.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '').split('/')[0].trim(el).substring(0, 22).slice(0, -1) + '...' : el
    },
    lastConnect: function (el) {
      return el
    },
    connectionTime: function (el) {
      var seconds = Number(el)
      var d = Math.floor(seconds / (3600 * 24))
      var h = Math.floor(seconds % (3600 * 24) / 3600)
      var m = Math.floor(seconds % 3600 / 60)
      var s = Math.floor(seconds % 60)
      var dDisplay = d > 0 ? d + (d === 1 ? ' day, ' : ' days, ') : ''
      var hDisplay = h > 0 ? h + (h === 1 ? ' hour, ' : ' hours, ') : ''
      var mDisplay = m > 0 ? m + (m === 1 ? ' minute, ' : ' minutes, ') : ''
      var sDisplay = s > 0 ? s + (s === 1 ? ' second' : ' seconds') : ''
      return dDisplay + hDisplay + mDisplay + sDisplay
    },
  }
}
</script>
