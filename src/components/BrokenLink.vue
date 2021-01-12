<template>
  <v-container>
    <v-row>
      <v-col>
        <p>The page that you've requested:</p>
        <h4>{{ lastURL }}</h4>
        <br />
        <p>
          does not exist. Please use the "back" button on your browser to return
          to where you were, or start again using the links in the menu bar.
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'BrokenLink',

  computed: {
    lastURL() {
      return this.$store.getters.getLastURL
    },
  },
}
</script>

<style scoped></style>
