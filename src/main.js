import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

let routes = [
  {path: '/', component: App}
]

let router = new VueRouter({routes})

/* eslint-disable no-new */
new Vue({
  router
}).$mount('#app')
