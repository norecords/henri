import { createWebHistory, createRouter } from "vue-router"
import Home from "@/views/Home.vue"
import About from "@/views/About.vue"

// Lazy Loading views chunk vendors.js and gain in app optimization
function loadView (view) {
  return () => import(/* webpackChunkName: "view-[request]" */ `@/views/${view}.vue`)
}

// Create routes
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    component: About
  },
  {
    path: "/player",
    name: "Player",
    component: loadView('Player')
  }
]

// Create the router
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth"
      };
    } else if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
})

export default router