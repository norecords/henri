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

  <Footer />

</div>  
</template>

<script>
import Footer from './components/Footer'
export default {
  name: 'App',
  components: {
    Footer
  },
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
