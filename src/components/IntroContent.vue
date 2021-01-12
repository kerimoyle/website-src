<template>
  <div class="intro">
    <v-container>
      <v-row>
        <v-col cols="12">
          <h1>libCellML</h1>
          <h3>
            libCellML is an easy-to-use library aiming to be useful to
            developers of CellML applications.
          </h3>
          <p>
            The purpose of CellML is to store and exchange computer-based
            mathematical models, allowing scientists to share models even if
            they are using different model-building software. The purpose of
            libCellML is to create, manipulate, serialise, deserialise, validate
            and instantiate CellML models. Alongside that, libCellML offers
            functionality for annotation support, model debugging, mathematical
            analysis and code generation.
          </p>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'IntroContent',

  data: () => ({}),
}
</script>
