import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from './components/login/Component'
import Dashboard from './components/dashboard/Component'
import AddTrophy from './components/catalogs/addTrophy/Component'
import VueProgressBar from 'vue-progressbar'
import axios from 'axios'
import auth from './lib/auth'
import pollyfills from './lib/pollyfills'
import config from './siteconfig'

pollyfills()
Vue.use(VueRouter)
Vue.use(VueProgressBar, {
  failedColor: 'red',
  thickness: '10px'
})

axios.defaults.headers.post['With-credentials'] = config.WITH_CREDENTIALS_HEADER

let routes = [
  { name: 'login', path: '/login', component: Login, meta: { requiresAuth: false } },
  { name: 'dashboard', path: '/', component: Dashboard, meta: { requiresAuth: true } },
  { name: 'addTrophy', path: '/addTrophy', component: AddTrophy, meta: { requiresAuth: true } }
]

let router = new VueRouter({routes})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!auth.isLoggedIn()) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  router
}).$mount('#app')
