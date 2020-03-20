import Vue from 'vue'
import VueRouter from 'vue-router'
import AboutPage from '../views/AboutPage'
import HomePage from '../views/HomePage'
import GuestBook from '../views/GuestBook'
import Blog from '../views/Blog'
Vue.use(VueRouter)

const routes = [
  {
    // 当 /user/:id/posts 匹配成功
    // UserPosts 会被渲染在 User 的 <router-view> 中
    path: '/',
    component: HomePage,
  },
  {
    // 当 /user/:id/profile 匹配成功，
    // UserProfile 会被渲染在 User 的 <router-view> 中
    path: '/about',
    component: AboutPage
  },
  {
    path: '/guestbook',
    component: GuestBook
  },
  {
    path: '/blog/:bid',
    component: Blog,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
