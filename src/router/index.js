import { createWebHistory, createRouter } from "vue-router"
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
    component: loadView('Home'),
    meta: { title: 'Homepage | Cigale Strike' }
  },
  {
    path: "/about",
    name: "About",
    component: About,
    meta: { title: 'About us and this project | Cigale Strike' }
  },
  {
    path: "/player",
    name: "Player",
    component: loadView('Player'),
    meta: { title: 'Player Profile | Cigale Strike' }
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