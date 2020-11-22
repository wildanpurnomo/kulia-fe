import Vue from 'vue'
import VueRouter from 'vue-router'
import { landingRouter } from './landing.router'
import { authRouter } from './auth.router'
import { fallbackRouter } from './404.router'

Vue.use(VueRouter)

const routes = [
  landingRouter,
  authRouter,
  fallbackRouter
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
