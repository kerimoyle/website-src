<template>
  <v-container>
    <v-row id="breadcrumb-id">
      <v-col @click="expandDropdown" class="breadcrumb-dropdown"
        >{{ currentVersion }}&nbsp;<v-icon>mdi-chevron-down</v-icon>
      </v-col>
    </v-row>
    <v-row class="hide-options">
      <router-link
        v-for="(version, index) in versionChoices"
        :key="'version_index_' + index"
        :id="'version_' + version"
        :to="{ path: `/documentation/${versionType}/${version}${pagePath}` }"
      >
        {{ version }}
        <template v-if="version === currentVersion">
          <v-icon>mdi-check</v-icon>
        </template>
        <br />
      </router-link>
    </v-row>
  </v-container>
</template>

<script>
import { getDoxygenVersions, getSphinxVersions } from '../js/versions'

export default {
  name: 'VersionDropdown',
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
  mounted() {
    if (
      (this.$props.versionType === 'tutorials' &&
        this.$props.currentVersion !== getSphinxVersions()[0]) ||
      (this.$props.versionType === 'api' &&
        this.$props.currentVersion !== getDoxygenVersions()[0])
    ) {
      let b = document.getElementById('breadcrumb-id')
      b.classList = ['old-version']
    }
  },

  methods: {
    expandDropdown() {
      let menu = document.getElementById('breadcrumb-id')
      document.addEventListener('click', function (event) {
        var isClickInside = menu.contains(event.target)
        if (!isClickInside) {
          menu.nextSibling.classList = ['hide-options']
        }
      })
      this.$el.lastElementChild.classList = ['show-options']
    },
  },
  computed: {
    pagePath() {
      return this.$route.fullPath.split(`${this.$route.params.version}`)[1]
    },
  },
}
</script>

<style>
.breadcrumb-dropdown {
  position: relative;
  color: var(--link-colour);
}

.hide-options {
  display: none;
  position: absolute;
}

.show-options {
  display: inline-block;
  position: absolute;
  background-color: white;
  z-index: 1;
  padding: 0.8em 1em;
  margin-right: -1em;
  border: solid 1px var(--pale-grey);
  box-shadow: var(--pale-grey);
}

.old-version {
  background-color: var(--warning-background);
  padding: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
</style>
