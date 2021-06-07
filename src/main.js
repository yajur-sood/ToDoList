import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router';

Vue.use(VueRouter);

Vue.config.productionTip = false

import LandingPage from './LandingPage.vue'
import TodoPage from './TodoPage.vue'
const routes = [
  { path: '/', component: LandingPage },
  { path: '/todo', component: TodoPage}
]

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes // short for `routes: routes`
})



new Vue({
  render: h => h(App),
  router
}).$mount('#app')
