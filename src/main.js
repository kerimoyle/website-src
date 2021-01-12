import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import vuetify from './plugins/vuetify'

import DoxygenXml from 'vue-doxygen-xml'
import SphinxXml from 'vue-sphinx-xml'
import VueHighlightJS from 'vue-highlightjs'

import 'highlight.js/styles/xcode.css'

// KRM
import './css/custom.css'

Vue.use(DoxygenXml, { store })
Vue.use(SphinxXml, { store })
Vue.use(VueHighlightJS)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
