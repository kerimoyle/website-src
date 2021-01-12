<template>
  <div class="tutorials">
    <v-container>
      <v-row>
        <v-col>
          <BreadCrumbs v-bind:versionChoices="getVersions()" 
          :currentVersion="`${$route.params.version}`" 
          :versionType="'tutorials'" />
          <sphinx-page
            :baseURL="`/data/sphinx/${$route.params.version}`"
            indexFileName="index"
            @updated="updated"
          ></sphinx-page>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { SphinxPage } from 'vue-sphinx-xml'
import BreadCrumbs from '@/components/BreadCrumbs'
import { getSphinxVersions } from '../js/versions'

import ui from '@/js/ui'

export default {
  name: 'TutorialsPage',
  components: {
    SphinxPage,
    BreadCrumbs,
  },

  methods: {
    getVersions() {
      return getSphinxVersions()
    },
    updated() {
      this.$store.commit('togglePageContentChanged')

      // KRM include these on any page where the injected XML might contain tabs or toggle blocks.
      // Workaround only until sphinx tabs and toggles cann be handled outside the browser properly.
      setTimeout(function() {
        ui.processSphinxTabs()
        ui.addClickHandlerTabs()
        ui.addClickHandlerToggles()
      }, this.$store.getters.getTransitionDelay)
    },
  },
}
</script>

<style scoped>
.api-reference {
  position: relative;
}
.version-box > * {
  position: relative;
  margin: 0;
  padding: 0;
}
</style>
