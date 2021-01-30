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
        <SearchBox v-on:playerid="loadProfile"/>
      </div>
      <div v-if="show">
        <!-- <PlayerProfile v-bind:id="id" /> -->
          <PlayerProfile v-bind:id="id" />
      </div>
  </div>
</template>

<script>
import SearchBox from '../components/SearchBox'
import PlayerProfile from '../components/PlayerProfile'
export default {
  components: {
    SearchBox, 
    PlayerProfile 
  },
  data () {
    return {
      show: false,
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
      this.show = !this.show 
    },
    loadProfile (value) {
      this.id = value
      this.show = true
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
        this.noResults = response.data.success
        if (this.noResults === true) {
          this.$store.commit('playerData', response.data)
          this.show = true
        }
      })
    }
  }
}
</script>
