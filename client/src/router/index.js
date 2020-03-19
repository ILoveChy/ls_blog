import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../views/HomePage'
import AboutPage from '../views/AboutPage'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/aboutpage',
    name: 'AboutPage',
    component: AboutPage
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
