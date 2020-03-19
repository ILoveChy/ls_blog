import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/init.css'
import './assets/css/base.css'
// import './assets/css/blog_detail.css'
// import './assets/css/about.css'

// import './assets/css/sitemap.css'
// import './assets/css/guestbook.css'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
