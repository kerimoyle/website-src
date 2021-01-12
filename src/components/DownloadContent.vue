<template>
  <v-container>
    <v-row>
      <v-col>
        <div id="downloadContent">
          <h1>Downloading libCellML</h1>
          <p>TODO: NB None of these buttons are linked to anything.</p>
          <v-row>
            <v-col class="col-12 col-md-4">
              <v-btn outlined disabled>C++ Libraries</v-btn>
            </v-col>
            <v-col class="col-12 col-md-4">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn outlined v-bind="attrs" v-on="on">Python Wheel</v-btn>
                </template>
                <span>For the Python savvy, 'pip install libcellml'</span>
              </v-tooltip>
            </v-col>
            <v-col class="col-12 col-md-4">
              <v-btn outlined disabled>Javascript bytecode</v-btn>
            </v-col>
          </v-row>

          <p>
            TODO: Need to write about dependencies and latest versions here too.
          </p>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'DownloadContent',
}
</script>

<style scoped>
v-col {
  align-content: center;
}
</style>
