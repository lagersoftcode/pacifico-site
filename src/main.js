import Vue from 'vue'
import VueRouter from 'vue-router'
import keyStorage from 'key-storage'
import VueProgressBar from 'vue-progressbar'
import axios from 'axios'
import routes from './routes'
import LastActions from './components/dashboard/lastActions/Component'
import auth from './lib/auth'
import pollyfills from './lib/pollyfills'
import config from './siteconfig'

pollyfills()

// Register middlewares
Vue.use(VueRouter)
Vue.use(VueProgressBar, {
  failedColor: 'red',
  thickness: '10px'
})

// Register inner components
Vue.component('last-actions', LastActions)

axios.defaults.headers.post['With-credentials'] = config.WITH_CREDENTIALS_HEADER

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
