<template>
<div>
  <md-button class="md-primary md-round classic-modal" @click="classicModal = true">Classic Modal</md-button>
  <modal v-if="classicModal" @close="classicModalHide">
    <template slot="header">
      <h4 class="modal-title">Modal Title</h4>
      <md-button class="md-simple md-just-icon md-round modal-default-button" @click="classicModalHide">
        <md-icon>clear</md-icon>
      </md-button>
    </template>

    <template slot="body">
      <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar.</p>
    </template>

    <template slot="footer">
      <md-button class="md-simple">Nice Button</md-button>
      <md-button class="md-danger md-simple" @click="classicModalHide">Close</md-button>
    </template>
  </modal>
  </div>
</template>
