<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Oops!</h1>
        <BrokenLink />
        <router-link to="/">Back to the home page</router-link>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import BrokenLink from '@/components/BrokenLink'

export default {
  name: 'About',
  components: {
    BrokenLink,
  },
}
</script>
