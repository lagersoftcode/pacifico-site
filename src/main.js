import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from './components/login/Component'
import Dashboard from './components/dashboard/Component'
import VueProgressBar from 'vue-progressbar'
import axios from 'axios'
import auth from './lib/auth'
import config from './siteconfig'

Vue.use(VueRouter)
Vue.use(VueProgressBar, {
  failedColor: 'red',
  thickness: '10px'
})

axios.defaults.headers.post['With-credentials'] = config.WITH_CREDENTIALS_HEADER

let routes = [
  { name: 'dashboard', path: '/', component: Dashboard, meta: { requiresAuth: true } },
  { name: 'login', path: '/login', component: Login, meta: { requiresAuth: false } }
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
