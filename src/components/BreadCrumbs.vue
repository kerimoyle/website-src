<template>
  <div class="breadcrumbs" id="breadcrumbs">
    <v-container>
      <template v-if="currentVersion !== latest">
        <div class="old-version">
          <router-link :to="{ path: `${latestFullPath}` }">
            You are viewing an old version. Click to see the latest one
          </router-link>
          <v-icon size="1.3em">mdi-alert-circle-outline</v-icon>
        </div>
      </template>
      <v-row>
        <v-breadcrumbs :items="breadcrumbs">
          <template v-slot:divider>
            <v-icon>mdi-chevron-right</v-icon>
          </template>
          <template v-slot:item="{ item }">
            <v-breadcrumbs-item :href="item.href" :disabled="item.disabled">
              <template v-if="item.text === 'home'">
                <v-icon size="1.3em">mdi-home</v-icon>
              </template>
              <template v-else-if="item.type === 'versions'">
                <VersionDropdown
                  :versionChoices="versionChoices"
                  :currentVersion="currentVersion"
                  :versionType="versionType"
                />
              </template>
              <template v-else>
                {{ item.text.toUpperCase() }}
              </template>
            </v-breadcrumbs-item>
          </template>
        </v-breadcrumbs>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import VersionDropdown from './VersionDropdown'
import { getDoxygenVersions, getSphinxVersions } from '../js/versions'

export default {
  name: 'BreadCrumbs',
  components: {
    VersionDropdown,
  },
  props: {
    currentVersion: {
      type: String,
      default: '',
    },
    versionChoices: {
      type: Array,
      default: () => {
        return []
      },
    },
    versionType: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    items: [],
    version: '',
  }),
  computed: {
    breadcrumbs() {
      return this.$store.state.breadcrumbs
    },
    latest() {
      if (this.$props.versionType === 'tutorials') {
        return getSphinxVersions()[0]
      }
      return getDoxygenVersions()[0]
    },
    latestFullPath() {
      return this.$route.fullPath.replace(
        `${this.$route.params.version}`,
        this.latest,
      )
    },
  },
}
</script>
<style scoped>
.old-version {
  color: var(--link-colour);
  background-color: var(--warning-background);
  padding: 5px 15px 5px 10px;
  border-radius: 10px;
  font-weight: 500;
}
</style>
