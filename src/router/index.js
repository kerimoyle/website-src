import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'

import store from '@/store'

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
    path: '/help/api/:version/:pageName?',
    name: 'APIReferencePage',
    component: () =>
      import(/* webpackChunkName: "doxygen" */ '../views/HelpAPIPage.vue'),
  },
  {
    path: '/help/api',
    name: 'APIReference',
    component: () =>
      import(/* webpackChunkName: "doxygen" */ '../views/HelpAPI.vue'),
  },
  {
    path: '/help/tutorials/:version/:pageName*',
    name: 'TutorialsPage',
    component: () =>
      import(/* webpackChunkName: "sphinx" */ '../views/HelpTutorialsPage.vue'),
  },
  {
    path: '/help/tutorials',
    name: 'Tutorials',
    component: () =>
      import(/* webpackChunkName: "sphinx" */ '../views/HelpTutorials.vue'),
  },
  {
    path: '/help',
    redirect: { name: 'Documentation' },
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
    redirect: { name: '404', params: { resource: 'page' } },
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
  let items = [
    {
      text: 'home',
      disabled: false,
      href: '/',
    },
  ]
  if (to.name === 'Home') {
    items[0].disabled = true
  } else if (
    to.name === '404' ||
    to.name === 'About' ||
    to.name === 'Developers' ||
    to.name === 'Download' ||
    to.name === 'Documentation'
  ) {
    items.push({
      text: to.name,
      disabled: true,
      href: to.path,
    })
  } else if (
    to.name === 'TutorialsPage' ||
    to.name === 'Tutorials' ||
    to.name === 'APIReferencePage' ||
    to.name === 'APIReference'
  ) {
    let toPath = to.path
    let appendFileName = ''
    if (to.params.pageName && to.params.pageName.indexOf('/') !== -1) {
      appendFileName = to.params.pageName
      toPath = toPath.replace(to.params.pageName, '')
    }
    const pathParts = toPath.split('/')
    let builtPath = ''
    pathParts.forEach(part => {
      if (part) {
        builtPath += `/${part}`
        items.push({
          text: part,
          disabled: false,
          href: builtPath,
        })
      }
    })
    if (appendFileName) {
      items.push({
        text: appendFileName,
        disabled: true,
        href: builtPath,
      })
    }
    items[items.length - 1].disabled = true
  }

  store.commit('setBreadcrumbs', items)
  next()
})

router.afterEach((to, from) => {
  if (to.name !== from.name) {
    store.commit('togglePageContentChanged')
  }
})

export default router
