<template>
  <div class="row mt-3">
    <div class="col-lg-8">
    <!-- Player profile table -->
    <table class="table table-sm table-dark table-striped table-bordered align-middle">
      <thead>
        <tr>
          <th style="border-right:0px;"><h4>{{ tableTitleProfile }}</h4></th>
          <th class="text-end" style="border-left:0px;">
            <h5>
            <a
              id="addUser"
              v-bind:href="steamAddFriends"
            >
              <fa-icon icon="user-plus" />
            </a>
            </h5>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="col-4 fw-bold text-break">
            {{ $store.state.player.summary.lastName }}
          </td>
          <td class="align-middle col-4" rowspan="5">
            <img
              v-bind:src="$store.state.player.summary.avatar"
              class="img-fluid rounded mx-auto d-block"
              title="Avatar"
            />
          </td>
        </tr>
        <tr>
          <td>
            <img
              :src="`img/flags/${countryFlag}`"
              class="flags"
              title="Flags"
            />
              {{ $store.state.player.summary.country }}
          </td>
        </tr>
        <tr>
          <td>
            <fa-icon :icon="[ 'fab', 'steam' ]" size="lg" />
            <a
              v-bind:href="steamProfileUrl"
            >
               0:{{ $store.state.player.summary.uniqueId }}
            </a>
          </td>
        </tr>
        <tr>
          <td>Status
            <span
              class="badge"
              v-bind:class="classOnlineStatusObject"
            >
              {{ $store.state.player.summary.status }}
            </span>
          </td>
        </tr>
        <tr>
          <td>Karma
            <span
              class="badge"
              v-bind:class="classKarmaObject"
              >
              {{ karmaText }}
            </span>
          </td>
        </tr>
        <tr>
          <td>Member of Clan</td>
          <td>
            <span
              v-if="$store.state.player.summary.clan === 0"
              class="fst-italic"
            >
              None
            </span>
            <span
              v-else
            >
              {{ $store.state.player.summary.clan }}
            </span>
          </td>
        </tr>
        <tr>
          <td>Real Name</td>
          <td>
            <span
              v-if="$store.state.player.summary.fullName"
              class="text-break"
            >
              {{ $store.state.player.summary.fullName }}
            </span>
            <span
              v-else
              class="fst-italic"
            >
              None
            </span>
          </td>
        </tr>
        <tr>
          <td>E-mail Address</td>
          <td>
            <a
              v-if="$store.state.player.summary.email"
              v-bind:href="'mailto:' + $store.state.player.summary.email"
              class="text-break"
            >
              {{ $store.state.player.summary.email }}
            </a>
            <span
              v-else
              class="fst-italic"
            >
              None
            </span>
          </td>
        </tr>
        <tr>
          <td>Home Page</td>
          <td>
            <a
              v-if="$store.state.player.summary.homepage"
              v-bind:href="$store.state.player.summary.homepage"
              class="text-break"
            >
              {{ shrinkUrl }}
            </a>
            <span
              v-else
              class="fst-italic"
            >
              None
            </span>
          </td>
        </tr>
        <tr>
          <td>MM Rank</td>
          <td>
            <img
              :src="`img/mmranks/${mmRank}`"
              class="mmrank"
            />
          </td>
        </tr>
        <tr>
          <td>Last Connect</td>
          <td>{{ lastConnect }}</td>
        </tr>
        <tr>
          <td>Total Connection Time</td>
          <td>{{ connectionTime }}</td>
        </tr>
        <tr>
          <td>Average Ping</td>
          <td>
            <span
              v-if="$store.state.player.summary.avgping"
            >
              {{ $store.state.player.summary.avgping }} ms
            </span>
            <span
              v-else
              class="fst-italic"
            >
              None
            </span>
          </td>
        </tr>
        <tr>
          <td>Favorite Server</td>
          <td>
            <span
              v-if="$store.state.player.summary.favserver"
            >
              {{ $store.state.player.summary.favserver }}
            </span>
            <span
              v-else
              class="fst-italic"
            >
              None
            </span>
          </td>
        </tr>
        <tr>
          <td>Favorite Map</td>
          <td>
            <span
              v-if="$store.state.player.summary.favmap"
            >
              {{ $store.state.player.summary.favmap }}
            </span>
            <span
              v-else
              class="fst-italic"
            >
              None
            </span>
          </td>
        </tr>
        <tr>
          <td>Favorite Weapon</td>
          <td>{{ $store.state.player.summary.favweapon }}</td>
        </tr>
      </tbody>
    </table>
    </div>
    <div class="col-lg-4">
    <!-- Statistics summary table -->
    <table class="table table-sm table-dark table-striped table-bordered">
      <thead>
        <tr>
          <th colspan="2">
            <h4>Stats Summary</h4>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <div class="progress" style="height:100%">
                <div
                  id="activityBar"
                  class="progress-bar"
                  v-bind:class="classActivityObject"
                  role="progressbar"
                  style="height:25px"
                  v-bind:style="styleActivityObject"
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                Activity
                </div>
            </div>
          </td>
          <td>
            {{ Activity }} %
          </td>
        </tr>
        <tr>
          <td>Points</td>
          <td>{{ $store.state.player.summary.skill }}</td>
        </tr>
        <tr>
          <td>Rank</td>
          <td>{{ showRank }}</td>
        </tr>
        <tr>
          <td>Kills per Minute</td>
          <td>{{ $store.state.player.summary.kpm }}</td>
        </tr>
        <tr>
          <td>Kills per Death</td>
          <td>{{ $store.state.player.summary.kpd }}</td>
        </tr>
        <tr>
          <td>Headshots per Kill</td>
          <td>{{ $store.state.player.summary.hpk }}</td>
        </tr>
        <tr>
          <td>Shots per Kill</td>
          <td>{{ $store.state.player.summary.spk }}</td>
        </tr>
        <tr>
          <td>Weapon Accuracy</td>
          <td>{{ $store.state.player.summary.accuracy }}</td>
        </tr>
        <tr>
          <td>Headshots</td>
          <td>{{ $store.state.player.summary.headshots }}</td>
        </tr>
        <tr>
          <td>Kills</td>
          <td>{{ $store.state.player.summary.kills }}</td>
        </tr>
        <tr>
          <td>Deaths</td>
          <td>{{ $store.state.player.summary.deaths }}</td>
        </tr>
        <tr>
          <td>Longest Kill Streak</td>
          <td>{{ $store.state.player.summary.lks }}</td>
        </tr>
        <tr>
          <td>Longest Death Streak</td>
          <td>{{ $store.state.player.summary.lds }}</td>
        </tr>
        <tr>
          <td>Suicides</td>
          <td>{{ $store.state.player.summary.suicides }}</td>
        </tr>
        <tr>
          <td>Teammate Kills</td>
          <td>{{ $store.state.player.summary.teamkills }}</td>
        </tr>
      </tbody>
    </table>
    </div>
  </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { faSteam } from '@fortawesome/free-brands-svg-icons'
library.add(faUserPlus, faSteam)
export default {
  name: 'PlayerSummary',
  data () {
    return {
      tableTitleProfile: 'Player\'s profile'
    }
  },
  computed: {
    steamAddFriends: function () {
      return 'steam://friends/add/' + this.$store.state.player.summary.uniqueId64.substring(2)
    },
    steamProfileUrl: function () {
      return 'https://steamcommunity.com/profiles/' + this.$store.state.player.summary.uniqueId64.substring(2)
    },
    countryFlag: function () {
      return this.$store.state.player.summary.flag.toLowerCase() + '.png'
    },
    classOnlineStatusObject: function () {
      return {
        'bg-danger': this.$store.state.player.summary.status === 'Offline',
        'bg-success': this.$store.state.player.summary.status === 'Online',
        'bg-info': this.$store.state.player.summary.status === 'In-game'
      }
    },
    karmaText: function () {
      return this.$store.state.player.summary.hideranking === 2 ? 'Banned' : 'In good standing'
    },
    classKarmaObject: function () {
      return {
        'bg-danger': this.karmaText === 'Banned',
        'bg-success': this.karmaText === 'In good standing'
      }
    },
    // Shrink url
    shrinkUrl: function () {
      return this.$store.state.player.summary.homepage.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '').split('/')[0]
    },
    mmRank: function () {
      return typeof (this.$store.state.player.mmrank) === 'undefined' ? '0.png' : this.$store.state.player.mmrank + '.png'
    },
    lastConnect: function () {
      return 'moment' // this.$moment(1e3 * this.$store.state.player.summary.lastconnect).format('Do MMMM YYYY à H[h]mm')
    },
    connectionTime: function () {
      var seconds = Number(this.$store.state.player.summary.connection_time)
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
    Activity: function () {
      return this.$store.state.player.summary.activity > 0 ? this.$store.state.player.summary.activity : 0
    },
    styleActivityObject: function () {
      return {
        width: this.$store.state.player.summary.activity < 20 ? 100 + '%' : this.$store.state.player.summary.activity + '%'
      }
    },
    classActivityObject: function () {
      return {
        'bg-success': this.$store.state.player.summary.activity >= 75,
        'bg-info': this.$store.state.player.summary.activity >= 50 && this.$store.state.player.summary.activity < 75,
        'bg-warning': this.$store.state.player.summary.activity >= 25 && this.$store.state.player.summary.activity < 50,
        'bg-danger': this.$store.state.player.summary.activity >= -1 && this.$store.state.player.summary.activity < 25
      }
    },
    showRank: function () {
      console.log('rank' + this.$store.state.player.summary.rank)
      return this.$store.state.player.summary.rank === 0 ? 'Not Active' : this.$store.state.player.summary.rank === -1 ? 'Hidden' : this.$store.state.player.summary.rank === -2 ? 'Banned' : 'none'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
