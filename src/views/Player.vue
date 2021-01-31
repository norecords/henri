<template>
  <div>
    <div v-if="!showSearch">
      <button 
        v-on:click="searchButton"
        class="btn btn-outline-light"
      >
      Search
      </button>
    </div>
    <div v-show="showSearch">
      <SearchBox v-on:playerid="loadProfile" />
    </div>
    <transition name="fade" mode="out-in">
      <div v-if="showProfile">
        <PlayerSummary />

        <PlayerCharts />

        <PlayerStats />
      </div>
    </transition>
  </div>
</template>

<script>
import SearchBox from '../components/SearchBox'
import PlayerSummary from '@/components/PlayerSummary'
import PlayerCharts from '@/components/PlayerCharts'
import PlayerStats from '@/components/PlayerStats'
export default {
  components: {
    SearchBox, 
    PlayerSummary,
    PlayerCharts,
    PlayerStats
  },
  data () {
    return {
      showProfile: false,
      showSearch: false,
      id: ''
    }
  },
  mounted () {
    this.$route.query.id ? this.getPlayer(this.$route.query.id) : this.showSearch = true
  },
    methods: {
    searchButton () {
      this.showSearch = !this.showSearch
      if (this.$route.query.id) this.$router.push({ path: '/player', query: ''})
      this.showProfile = !this.showProfile 
    },
    loadProfile (value) {
      this.id = value
      this.showProfile = true
      this.showSearch = false
      console.log('id: ' + value)
    },
    getPlayer (id) {
      this.$api.get('https://cigalestrike.norecords.org/vue/apiv3.php', {
        params: {
          q: 'profile',
          id: id
        }
      })
      .then((response) => {
        this.$store.commit('playerData', response.data)
        if (response.data.success) this.showProfile = true
      })
    }
  }
}
</script>
