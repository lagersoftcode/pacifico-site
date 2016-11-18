import Vue from 'vue'
import App from './App'
import Login from './components/Login'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

let routes = [
  { path: '/', component: App, meta: { requiresAuth: true } },
  { path: '/login', component: Login, meta: { requiresAuth: false } }
]

let router = new VueRouter({routes})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
  /*  if (!auth.loggedIn()) {
      next({
        path: '/login',
        query: {redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()! */
  }
  next()
})

/* eslint-disable no-new */
new Vue({
  router
}).$mount('#app')
