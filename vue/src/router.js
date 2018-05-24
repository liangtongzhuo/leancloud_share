import Vue from 'vue'
import VueRouter from 'vue-router'
import Base from './components/Base'
import Login from './components/Login'

Vue.use(VueRouter)


const routes = [
  { path: '/',    component: Base},
  { path: '/Login', component: Login }
]

const router = new VueRouter({
  routes
})

export default router
