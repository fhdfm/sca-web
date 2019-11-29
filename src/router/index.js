import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

var jwt = require('jsonwebtoken')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    beforeEnter: (to, from, next) => {
      const token = window.localStorage.getItem('token')
      if (token != null) {
        const { perfil } = jwt.decode(token)
        if (perfil === 'ROLE_ALUNO') {
          next('/aluno')
        }

        if (perfil === 'ROLE_PROFESSOR') {
          next('/professor')
        }
      }
      next()
    }
  },
  {
    path: '/aluno',
    name: 'aluno',
    component: () => import(/* webpackChunkName: "about" */ '../views/Aluno.vue'),
    beforeEnter: (to, from, next) => {
      const token = window.localStorage.getItem('token')
      if (token != null) {
        const { perfil } = jwt.decode(token)
        if (perfil === 'ROLE_ALUNO') {
          next()
        } else {
          next('/')
        }
      } else {
        next('/')
      }
      next()
    }
  },
  {
    path: '/professor',
    name: 'professor',
    component: () => import(/* webpackChunkName: "about" */ '../views/Professor.vue'),
    beforeEnter: (to, from, next) => {
      const token = window.localStorage.getItem('token')
      if (token != null) {
        const { perfil } = jwt.decode(token)
        if (perfil === 'ROLE_PROFESSOR') {
          next()
        } else {
          next('/')
        }
      } else {
        next('/')
      }
      next()
    }
  },
  {
    path: '/nota/:id/:data',
    name: 'nota',
    component: () => import(/* webpackChunkName: "about" */ '../views/Nota.vue'),
    beforeEnter: (to, from, next) => {
      const token = window.localStorage.getItem('token')
      if (token != null) {
        const { perfil } = jwt.decode(token)
        if (perfil === 'ROLE_PROFESSOR') {
          next()
        } else {
          next('/')
        }
      } else {
        next('/')
      }
      next()
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
