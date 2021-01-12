<template>
  <div class="api-reference">
    <v-container>
      <v-row>
        <v-col>
          <BreadCrumbs 
            v-bind:versionChoices="getVersions()" 
            :currentVersion="`${$route.params.version}`"
            :versionType="'api'"/>
          <doxygen-xml
            :baseURL="`/data/doxygen/${$route.params.version}`"
            @updated="updated"
          ></doxygen-xml>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { DoxygenXml } from 'vue-doxygen-xml'
import BreadCrumbs from '@/components/BreadCrumbs'
import { getDoxygenVersions } from '../js/versions'

export default {
  name: 'APIPage',
  components: {
    DoxygenXml,
    BreadCrumbs,
  },
  methods: {
    getVersions() {
      return getDoxygenVersions()
    },
    updated() {
      this.$store.commit('togglePageContentChanged')
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
