import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'

import store from '@/store'

import { calculateBreadcrumbs, calculateSphinxVersion, calculateDoxygenVersion } from './breadcrumbs'
import { getDoxygenVersions, getSphinxVersions } from '../js/versions'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/documentation',
    name: 'Documentation',
    component: () =>
      import(
        /* webpackChunkName: "documentation" */ '../views/Documentation.vue'
      ),
  },
  {
    path: '/documentation/api/:version/:pageName?',
    name: 'APIReferencePage',
    component: () =>
      import(/* webpackChunkName: "doxygen" */ '../views/HelpAPIPage.vue'),
  },
  {
    path: '/documentation/api',
    redirect: to => {
      // Defaults to latest version, if not specified.
      return '/documentation/api/' + getDoxygenVersions()[0]
    }
  },
  {
    path: '/documentation/tutorials/:version/:pageName*',
    // path: '/documentation/tutorials/:pageName*',
    name: 'TutorialsPage',
    component: () =>
      import(/* webpackChunkName: "sphinx" */ '../views/HelpTutorialsPage.vue'),
  },
  {
    path: '/documentation/tutorials/:version',
    name: 'Tutorials',
    component: () =>
      import(/* webpackChunkName: "sphinx" */ '../views/HelpTutorials.vue'),
  },
  {
    path: '/documentation/tutorials',
    redirect: to => {
      // Defaults to latest version, if not specified.
      return '/documentation/tutorials/' + getSphinxVersions()[0]
    }
  },
  {
    path: '/developers',
    name: 'Developers',
    component: () =>
      import(/* webpackChunkName: "developers" */ '../views/Developers.vue'),
  },
  {
    path: '/download',
    name: 'Download',
    component: () =>
      import(/* webpackChunkName: "download" */ '../views/Download.vue'),
  },
  {
    path: '/404',
    name: '404',
    component: () =>
      import(/* webpackChunkName: "notFound" */ '../views/NotFound.vue'),
  },
  {
    path: '/network-issue',
    name: 'network-issue',
    component: () =>
      import(
        /* webpackChunkName: "networkIssue" */ '../views/NetworkIssue.vue'
      ),
  },
  {
    path: '*',
    redirect: {
      name: '404',
      params: { resource: 'page' },
    },
  },
]

const createRouter = () => {
  return new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
    scrollBehavior(to, from, savedPosition) {
      if (to.path !== from.path) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            let value = { x: 0, y: 0 }
            if (to.hash) {
              value = window.scrollTo({
                top: document.querySelector(to.hash).offsetTop,
                behavior: 'smooth',
              })
            }
            resolve(value)
          }, store.getters.getTransitionDelay)
        })
      } else if (to.hash) {
        return window.scrollTo({
          top: document.querySelector(to.hash).offsetTop,
          behavior: 'smooth',
        })
      } else {
        return { x: 0, y: 0 }
      }
    },
  })
}

const router = createRouter()

router.beforeEach((to, from, next) => {
  store.commit('setBreadcrumbs', calculateBreadcrumbs(to))
  store.commit('updateLastURL', to.path)
  next()
})

router.afterEach((to, from) => {
  if (to.name !== from.name) {
    store.commit('togglePageContentChanged')
  }
})

export default router
