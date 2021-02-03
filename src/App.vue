<template>
<div>
  <nav class="navbar navbar-expand-lg navbar-dark sticky-top bg-dark">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">CS</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <!-- Hack adding :key to destoy uncollapsed menu on route change-->
      <div class="navbar-collapse collapse" id="navbarSupportedContent" :key="$route.path">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link" id="menuPlay" href="#">Join</a>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/player">Players</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="https://talk.fdn.fr/cigalestrike">Chat</a>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Bans</a>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about">About</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <div class="jumbotron bg-dark">
    <h1><router-link to="/">Cigale Strike</router-link></h1>
    <p>Serveur Counter Strike : Global Offensive</p> 
  </div>

  <div class="container">

    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in" appear>
          <component :is="Component" />
      </transition>
    </router-view>
  
  </div>

     <div class="mt-5">
        <div class="container-fluid text-center text-md-start">
          <div class="row">
            <div class="col-md-6 mt-md-0 mt-3">
              <h5 class="text-uppercase">cigale strike</h5>
              <p>slogan</p>
            </div>
            <div class="col-md-3 mb-md-0 mb-3">
              <h5 class="text-uppercase">Status</h5>
              <ul class="list-unstyled">
                <li>Serveur CS : <a id="lastPing" title="" class="badge rounded-pill bg-success" href="steam://connect/"><span id="onlineStatus">En ligne</span></a></li>
                <li>Statistiques  : <a class="badge rounded-pill bg-success" href="">En ligne</a></li>
                <li>Nb. de joueur : <span id="nbPlayers"></span></li>
                <li>Carte actuelle : <span id="actMap"></span></li>
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
  name: 'App',
  watch: {
    $route: {
        immediate: true,
        handler(to) {
            document.title = to.meta.title || 'Cigale Strike';
        }
    }
  }
}
</script>

<style>
.fade-enter-active {
  transition: opacity 1.5s ease;
}
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
