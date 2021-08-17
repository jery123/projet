<template>
<div>
  <md-button class="md-info md-round notice-modal" @click="noticeModal = true">Notice Modal</md-button>
  <modal v-if="noticeModal" @close="noticeModalHide">
    <template slot="header">
      <h4 class="modal-title">How Do You Become An Affiliate?</h4>
      <md-button class="md-simple md-just-icon md-round modal-default-button" @click="noticeModalHide">
        <md-icon>clear</md-icon>
      </md-button>
    </template>

    <template slot="body">
      <div class="instruction">
          <div class="md-layout">
              <div class="md-layout-item md-size-66">
                   <strong>1. Register</strong>
                   <p class="description">The first step is to create an account at <a href="https://www.creative-tim.com/">Creative Tim</a>. You can choose a social network or go for the classic version, whatever works best for you.</p>
              </div>
              <div class="md-layout-item">
                  <div class="picture">
                      <img src="/img/card-1.jpg" alt="Thumbnail Image">
                  </div>
              </div>
          </div>
      </div>
      <div class="instruction">
          <div class="md-layout">
              <div class="md-layout-item md-size-66">
                      <strong>2. Apply</strong>
                      <p class="description">The first step is to create an account at <a href="https://www.creative-tim.com/">Creative Tim</a>. You can choose a social network or go for the classic version, whatever works best for you.</p>
              </div>
              <div class="md-layout-item">
                  <div class="picture">
                      <img src="/img/card-2.jpg" alt="Thumbnail Image">
                  </div>
              </div>
          </div>
      </div>
      <p>If you have more questions, don't hesitate to contact us or send us a tweet @creativetim. We're here to help!</p>
    </template>

    <template slot="footer">
      <md-button class="md-info md-round" @click="noticeModalHide">Sound Good</md-button>
    </template>
  </modal>
  </div>
</template>
