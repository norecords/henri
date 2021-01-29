import { createWebHistory, createRouter } from "vue-router"
import Home from "@/views/Home.vue"
import About from "@/views/About.vue"

function loadView (view) {
  return () => import(/* webpackChunkName: "view-[request]" */ `@/views/${view}.vue`)
}

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

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router