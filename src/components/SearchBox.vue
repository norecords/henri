<template>
    <div class="row">
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
</template>

<script>
import { debounce } from 'lodash'
export default {
  data () {
    return {
      players: {},
      playerFound: '',
      term: '',
      results: [],
      noResults: []
    }
  },
    methods: {
    loadProfile: function (id) {
      console.log('loading profile: ' + id)
      if (this.searching === false) {
        this.noResults = false
        this.results = []
        this.$store.commit('playerData', this.results)
      }
      this.searching = true
      this.$api.get('https://cigalestrike.norecords.org/vue/apiv3.php', {
        params: {
          q: 'profile',
          id: id
        }
      })
      .then((response) => {
        this.searching = false
        this.noResults = response.data.success
        if (this.noResults === true) {
          this.$store.commit('playerData', response.data)
          this.$emit('playerid', id)
          this.$router.push({
            path: '/player',
            query: {
              id: id
            }
          })
        } else {
          this.results = []
          this.$store.commit('playerData', this.results)
        }
      })
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
          // console.log(this.players)
        })
        .catch(err => {
        // eslint-disable-next-line no-console
          console.log(err)
        })
    }
  },
  created () {
    this.debounceName = debounce(this.search, 1000)
  },
  watch: {
    term () {
      if (!this.term) return
      this.debounceName()
    }
  }
}

</script>