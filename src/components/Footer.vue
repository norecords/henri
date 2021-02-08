<template>
<div>
     <div class="mt-5">
        <div class="container-fluid text-center text-md-start">
          <div class="row">
            <div class="col-md-6 mt-md-0 mt-3">
              <h5 class="text-uppercase">cigale strike</h5>
              <p>Le serveur qui sent bon la lavande!</p>
            </div>
            <div class="col-md-3 mb-md-0 mb-3">
              <h5 class="text-uppercase">Status</h5>
              <ul class="list-unstyled">
                <li>Serveur CS : <span class="badge rounded-pill bg-success">En ligne</span></li>
                <li>Statistiques  : <span class="badge rounded-pill bg-success">En ligne</span></li>
                <li>Nb. de joueur : {{ server.act_players }} / {{ server.max_players }}</li>
                <li>Carte actuelle : {{ server.act_map }}</li>
              </ul>
            </div>
            <div class="col-md-3 mb-md-0 mb-3">
              <h5 class="text-uppercase">Site</h5>
              <ul class="list-unstyled">
                <li>
                  <a href="#!wiki">Wiki</a>
                </li>
                <li>
                  <a href="#!faq">FAQ</a>
                </li>
                <li>
                  <a href="./mentions.html">Mentions légales</a>
                </li>
                <li>
                  <a href="./cgu.html">CGU</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="footer-copyright text-center py-3">2020 Copyleft : <a href="https://cigalestrike.norecords.org">Cigale Strike</a>
    </div>
  </div>
</div>
</template>

<script>
export default {
    name: 'Footer',
    data () {
      return {
        server: {}
      }
    },
    created () {
      this.$api.get('https://cigalestrike.norecords.org/vue/apiv3.php', {
        params: {
          q: 'server'
        }
      })
      .then((response) => {
        this.server = response.data.server
      })
    },
    beforeMount (){
      return this.server
    }
}
</script>
