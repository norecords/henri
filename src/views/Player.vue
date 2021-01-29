<template>
  <div>
    <div v-if="!showSearch">
    <button 
      v-on:click="showSearch = !showSearch, show = !show"
      class="btn btn-outline-light"
    >
    Search
    </button>
    </div>
    <div v-if="showSearch" class="row">
        <div class="col-12">
            <div class="card bg-dark">
                <div class="card-body">
                    <h4>Search Players</h4>
                    <div class="form-group">
                        <input
                        class="form-control"
                        v-model="term"
                        type="search"
                        placeholder="Player name"
                        >
                    </div>
                    <button
                        class="btn btn-outline-light mt-2"
                        @click.prevent="search"
                    >
                        Search
                    </button>
                    <ul v-if="players.length" class="list-group mt-3">
                        <li class="list-unstyled">{{ playerFound }}</li>
                        <li
                            v-for="item in players"
                            :key="item"
                            v-on:click="loadProfile(item.playerId)"
                            class="list-group-item list-group-item-action list-group-item-dark urlpointer"
                        >
                        <!--
                        <img
                            v-bind:src="require(`@/assets/flags/${countryFlag(item.flag.toLowerCase())}.png`)"
                            id="country"
                            title="Flags"
                            width="24px"
                            height="18px"
                        />
                        -->
                        {{item.lastName}}
                        </li>
                    </ul>
                    <ul
                      v-else
                      class="list-group mt-3"
                    >
                      <li class="list-unstyled">
                          {{ playerFound }}
                      </li>
                    </ul>
                </div>
                <div
                    class="card-footer pb-1 pt-2"
                    v-if="players.length"
                >
                </div>
            </div>
        </div>
    </div>

    <transition name="fade">
      <div v-if="show">
        <PlayerProfile v-bind:id="id" />
      </div>
    </transition>
  </div>
</template>

<script>
import PlayerProfile from '../components/PlayerProfile'
export default {
  components: { PlayerProfile },
  data () {
    return {
      players: [],
      playerFound: '',
      show: false,
      showSearch: true,
      term: '',
      id: ''
    }
  },
    methods: {
    loadProfile: function (id) {
      this.showSearch = false
      this.id = id
      console.log(this.id)
      return this.show = true
    },
    search: function () {
    // eslint-disable-next-line no-console
      console.log(`Checking name: ${this.term}`)
      this.$api
        .get('https://cigalestrike.norecords.org/vue/apiv3.php', {
          params: {
            q: 'username',
            name: this.term
          }
        })
        .then(res => {
          this.players = res.data.user
          this.playerFound = res.data.user.length >= 1 ? 'Found ' + res.data.user.length + (res.data.user.length === 1 ? ' player' : ' players') : 'No player found!'
          console.log(this.players)
        })
        .catch(err => {
        // eslint-disable-next-line no-console
          console.log(err)
        })
    }
  }
}
</script>
