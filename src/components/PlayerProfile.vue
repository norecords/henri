<template>
  <div>
    Player Profile
  </div>
</template>

<script>
export default {
  name: 'PlayerProfile',
  data () {
    return {
      profile: {}
    }
  },
  mounted () {
    this.$api.get('https://cigalestrike.norecords.org/vue/apiv3.php', {
      params: {
        q: 'profile',
        id: '1'
      }
    })
    .then((response) => {
      this.profile = response.data
      console.log(this.profile.graphs.bonus[0].timestamp)
    })
  }
}
</script>