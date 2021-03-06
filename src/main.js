import Vue from 'vue'
import VueRouter from 'vue-router'
import keyStorage from 'key-storage'
import VueProgressBar from 'vue-progressbar'
import axios from 'axios'
import routes from './routes'
import auth from './lib/auth'
import pollyfills from './lib/pollyfills'
import config from './siteconfig'
import Alerts from './components/utils/alerts'

pollyfills()

// Register middlewares
Vue.use(VueRouter)
Vue.use(VueProgressBar, {
  failedColor: 'red',
  thickness: '10px'
})

// Register inner components
Vue.component('alerts', Alerts)

// axios defaults
axios.defaults.headers.post['With-credentials'] = config.WITH_CREDENTIALS_HEADER

// router conditions
let router = new VueRouter({routes})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth) && !auth.isLoggedIn()) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else if (to.matched.some(record => record.name === 'login') && auth.isLoggedIn()) {
    next({
      path: '/'
    })
  } else if (to.matched.some(record => record.name === 'logout')) {
    keyStorage.remove('AuthToken')
    next({
      path: '/login'
    })
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  router
}).$mount('#app')
