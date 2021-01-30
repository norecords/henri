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
    <transition name="fade">
      <div v-if="showSearch">
        <SearchBox v-on:playerid="loadProfile"/>
      </div>
    </transition>
    <transition name="fade">
      <div v-if="show">
        <PlayerProfile v-bind:id="id" />
      </div>
    </transition>
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
    this.$route.query.id ? this.loadProfile(this.$route.query.id) : this.showSearch = true
  
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
    }
  }
}
</script>
