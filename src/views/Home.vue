<template>
  <div class="home">
    <v-container>
      <v-row>
        <v-col cols="12" id="intro">
          <IntroContent />
        </v-col>
        <v-col cols="12" id="download">
          <DownloadContent />
        </v-col>
        <v-col cols="12" id="documentation">
          <DocumentationContent />
        </v-col>
        <v-col cols="12" id="developers">
          <DevelopersContent />
        </v-col>
        <v-col cols="12" id="about">
          <AboutContent />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import AboutContent from '@/components/AboutContent'
import DevelopersContent from '@/components/DevelopersContent'
import DownloadContent from '@/components/DownloadContent'
import DocumentationContent from '@/components/DocumentationContent'
import IntroContent from '@/components/IntroContent'

export default {
  name: 'Home',
  components: {
    AboutContent,
    DevelopersContent,
    DownloadContent,
    DocumentationContent,
    IntroContent,
  },
}
</script>
