<template>
  <div v-if="currentProducteur" class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <notifications></notifications>

    <side-bar
      :sidebar-item-color="sidebarBackground"
      :sidebar-background-image="sidebarBackgroundImage"
    >
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link :to="'/dashboard-producteur/' + currentProducteur.id">
        <md-icon>dashboard</md-icon>
        <p>Dashboard</p>
      </sidebar-link>
      <sidebar-link :to="'/profil/' + currentProducteur.id">
        <md-icon>person</md-icon>
        <p>Profile</p>
      </sidebar-link>
      <!-- <sidebar-link to="/table/ + currentProducteur.id">
        <md-icon>content_paste</md-icon>
        <p>Liste des utilisateurs</p>
      </sidebar-link> -->
      <!-- <sidebar-link to="/produits">
       <md-icon>bubble_chart</md-icon>
        <md-icon>library_books</md-icon>
        <p>Mes produits</p>
      </sidebar-link> -->

<sidebar-link :to="'/create-product/' + currentProducteur.id">
        <md-icon>content_paste</md-icon>
        <p>Nouveau produit</p>
      </sidebar-link>

      <!-- <sidebar-link to="/icons">
        <md-icon>bubble_chart</md-icon>
        <p>Icons</p>
      </sidebar-link> -->
      <sidebar-link :to="'/maps/' + currentProducteur.id">
        <md-icon>location_on</md-icon>
        <p>Nos locaux</p>
      </sidebar-link>
      <sidebar-link :to="'/commandes/' + currentProducteur.id">
        <md-icon>notifications</md-icon>
        <p>Notifications</p>
      </sidebar-link>
      <sidebar-link :to="'/upgradep/' + currentProducteur.id" class="active-pro">
        <md-icon>unarchive</md-icon>
        <p>Version recente</p>
      </sidebar-link>
    </side-bar>

    <div class="main-panel">
      <TopNavbarp></TopNavbarp>

      <fixed-plugin
        :color.sync="sidebarBackground"
        :image.sync="sidebarBackgroundImage"
      >
      </fixed-plugin>

      <dashboard-content> </dashboard-content>

      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>

<script>
import TopNavbarp from "./TopNavbarp.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "@/pages/Layout/MobileMenu.vue";
import FixedPlugin from "./Extra/FixedPlugin.vue";
import FarmerDataService from "../../services/FarmerDataService";

export default {
  components: {
    TopNavbarp,
    DashboardContent,
    ContentFooter,
    MobileMenu,
    FixedPlugin
  },
  data() {
    return {
      sidebarBackground: "green",
      sidebarBackgroundImage: require("@/assets/img/sidebar-2.jpg"),
      currentProducteur:null,
    };
  }, methods: {
    getFarmer(id) {
      FarmerDataService.get(id)
        .then(response => {
          this.currentProducteur = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
      logOut() {
      // this.$store.dispatch('auth/logout');
      this.$router.push('/home');
    },
   },
   mounted() {
    this.getFarmer(this.$route.params.id);
  }

};
</script>



