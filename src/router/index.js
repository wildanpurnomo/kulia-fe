import Vue from 'vue'
import VueRouter from 'vue-router'
import { landingRouter } from './landing.router'
import { authRouter } from './auth.router'
import { mainRouter } from './main.router'
import { fallbackRouter } from './404.router'

Vue.use(VueRouter)

const routes = [
  landingRouter,
  authRouter,
  mainRouter,
  fallbackRouter
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
