<template>
  <v-container>
    <v-row>
      <v-col>
        <BreadCrumbs />
        <h1>API Reference</h1>
        <ul>
          <li
            v-for="(version, index) in apiVersions"
            :key="'api_reference_' + index"
          >
            <router-link :to="{ path: `/documentation/api/${version}` }">
              <big>libCellML {{ version }} API Documentation</big>
            </router-link>
          </li>
        </ul>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { getDoxygenVersions } from '@/js/versions'

import BreadCrumbs from '../components/BreadCrumbs'

export default {
  name: 'HelpAPI',
  components: {
    BreadCrumbs,
  },
  data: () => {
    return { apiVersions: [] }
  },
  created() {
    this.apiVersions = getDoxygenVersions()
  },
}
</script>
