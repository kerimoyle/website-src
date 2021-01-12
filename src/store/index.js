import Vue from 'vue'
import Vuex from 'vuex'

import * as notifications from '@/store/modules/notifications.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sidebarOpen: null,
    dynamicRoutes: [],
    transitionDelay: 300, // This number has to be higher than page transition
    pageContentChanged: false,
    breadcrumbs: [],
    lastURL: ['', '', ''],
  },
  getters: {
    getSidebarOpen: state => {
      return state.sidebarOpen
    },
    getDynamicRoutes: state => {
      return state.dynamicRoutes
    },
    getTransitionDelay: state => {
      return state.transitionDelay
    },
    getPageContentChanged: state => {
      return state.pageContentChanged
    },
    hasRoute: state => name => {
      return state.dynamicRoutes.filter(entry => entry.name === name).length > 0
    },
    getLastURL: state => {
      return state.lastURL[1]
    },
    getBreadcrumbs: state => {
      return state.breadcrumbs
    },
  },
  mutations: {
    setSidebarOpen: (state, value) => {
      state.sidebarOpen = value
    },
    addRoute: (state, value) => {
      state.dynamicRoutes.push(value)
    },
    togglePageContentChanged: state => {
      state.pageContentChanged = !state.pageContentChanged
    },
    setBreadcrumbs: (state, value) => {
      state.breadcrumbs = value
    },
    updateLastURL: (state, value) => {
      state.lastURL[0] = state.lastURL[1]
      state.lastURL[1] = state.lastURL[2]
      state.lastURL[2] = value
    },
  },
  modules: { notifications },
})
