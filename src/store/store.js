import { createStore } from 'vuex'

const store = createStore({
    state: {
      player: ''
    },
    mutations: {
      playerData (state, payload) {
        state.player = payload
      }
    }
  })

export default store