import Vue from 'vue'
import App from './App'
import Login from './components/Login'
import VueRouter from 'vue-router'
import auth from './lib/auth'

Vue.use(VueRouter)

let routes = [
  { path: '/', component: App, meta: { requiresAuth: true } },
  { path: '/login', component: Login, meta: { requiresAuth: false } }
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
