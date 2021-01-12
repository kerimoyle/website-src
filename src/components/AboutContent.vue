<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>About libCellML</h1>

        <h3>Questions and comments</h3>
        <p>
          The library is intended to be lightweight and focused purely in
          dealing with CellML models. In achieving this, some of the convenience
          methods/objects that we might expect will not be part of libCellML. If
          you have feature requests or questions please see **TODO** mailing
          lists?
        </p>

        <h3>Citing libCellML</h3>
        <p>
          Until we have a formal paper to cite, please link to the official
          libCellML website
          <a target="_blank" href="http://www.libcellml.org"
            >www.libcellml.org</a
          >
          and reference the CellML 2.0 paper below:
        </p>
        <p style="padding-left: 20px">
          Michael Clerx, Michael T. Cooling, Jonathan Cooper, Alan Garny, Keri
          Moyle, David P. Nickerson, Poul M. F. Nielsen, and Hugh Sorby (2020),
          "CellML 2.0", <i>Journal of Integrative Bioinformatics</i>,
          <b>17</b>:2-3
          <br />
          <b>DOI: </b>
          <a href="https://doi.org/10.1515/jib-2020-0021"
            >https://doi.org/10.1515/jib-2020-0021</a
          >
        </p>

        <h3>Contributors</h3>
        <p>
          A complete list of the developers and contributors to the libCellML
          project are given on the
          <a href="https://github.com/cellml/libcellml/graphs/contributors"
            >libCellML Github repository page</a
          >.
        </p>

        <h3>Supporters</h3>
        The libCellML team acknowledges the generous support of our sponsors.

        <v-container class="image-box">
          <v-row>
            <v-col class="col-12 col-sm-6 col-md-4">
              <img src="../assets/logo_medtech_core.png" />
            </v-col>
            <v-col class="col-12 col-sm-6 col-md-4">
              <img src="../assets/logo_maurice_wilkins.png" />
            </v-col>
            <v-col class="col-12 col-sm-6 col-md-4">
              <img src="../assets/logo_vpr.png" />
            </v-col>
            <v-col class="col-12 col-sm-6 col-md-4">
              <img src="../assets/logo_abi.png" />
            </v-col>
            <v-col class="col-12 col-sm-6 col-md-4">
              <img src="../assets/logo_aotearoa.png" />
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'AboutContent',
}
</script>

<style scoped></style>
