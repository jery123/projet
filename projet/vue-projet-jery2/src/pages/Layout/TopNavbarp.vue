<template>
  <md-toolbar v-if="currentProducteur" md-elevation="0" class="md-transparent">
    <div class="md-toolbar-row">
      <div class="md-toolbar-section-start">
        <h3 class="md-title">{{ $route.name }}</h3>
      </div>
      <div class="md-toolbar-section-end">
        <md-button
          class="md-just-icon md-simple md-toolbar-toggle"
          :class="{ toggled: $sidebar.showSidebar }"
          @click="toggleSidebar"
        >
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </md-button>

        <div class="md-collapse">
          <div class="md-autocomplete">
            <!-- <md-autocomplete
              class="search"
              v-model="nom"
              :md-options="produits"
            >
              <label>Recherche...</label>
            </md-autocomplete> -->
              
      <!-- <v-text-field v-model="nom" label="Recherche"></v-text-field> -->
          </div>
          <md-list>
            <md-list-item >
             <!-- <v-btn small @click="searchNom">
        chercher
      </v-btn> -->
            </md-list-item>
            <md-list-item :href="'/dashboard-producteur/' + currentProducteur.id">
              <i class="material-icons">dashboard</i>
              <p class="hidden-lg hidden-md">Dashboard</p>
            </md-list-item>

            <!-- <md-list-item href="#/notifications" class="dropdown">
              <drop-down>
                <a slot="title" class="dropdown-toggle" data-toggle="dropdown">
                  <i class="material-icons">notifications</i>
                  <span class="notification">5</span>
                  <p class="hidden-lg hidden-md">Notifications</p>
                </a>
                <ul class="dropdown-menu dropdown-menu-right">
                  <li><a href="#">Mike John responded to your email</a></li>
                  <li><a href="#">You have 5 new tasks</a></li>
                  <li><a href="#">You're now friend with Andrew</a></li>
                  <li><a href="#">Another Notification</a></li>
                  <li><a href="#">Another One</a></li>
                </ul>
              </drop-down>
            </md-list-item> -->

            <!-- <li class="md-list-item">
              <a
                href="#/notifications"
                class="md-list-item-router md-list-item-container md-button-clean dropdown"
              >
                <div class="md-list-item-content">
                  <drop-down>
                     <md-button slot="title" class="md-button md-just-icon md-simple" data-toggle="dropdown" >
                         <sidebar-link :to="'/commandes/' + currentProducteur.id">
                       <md-icon>notifications</md-icon>
                          <span class="notification">6</span>
                          <p class="hidden-lg hidden-md">Notifications</p>
                           </sidebar-link>
                       </md-button>
                    
                    <ul class="dropdown-menu dropdown-menu-right">
                      <li><a href="#">Mike John responded to your email</a></li>
                      <li><a href="#">You have 5 new tasks</a></li>
                      <li><a href="#">You're now friend with Andrew</a></li>
                      <li><a href="#">Another Notification</a></li>
                      <li><a href="#">Another One</a></li>
                    </ul>
                  </drop-down>
                </div>
              </a>
            </li> -->
               <md-list-item :href="'/commandes/' + currentProducteur.id">
              <i class="material-icons">notifications</i>
            </md-list-item>
            <md-list-item :href="'/profil/' + currentProducteur.id">
              <i class="material-icons">person</i>
              <p class="hidden-lg hidden-md">Profile</p>
            </md-list-item>            
            <md-list-item class="nav-link"  @click.prevent="logOut" title="Déconnexion">
           <i class="material-icons">logout</i>
            <p class="hidden-lg hidden-md">Profile</p>
          </md-list-item>
          </md-list>
        </div>
      </div>
    </div>
  </md-toolbar>
</template>

<script>
import FarmerDataService from "../../services/FarmerDataService";
import ProduitDataService from '../../services/ProduitDataService';
export default {
  data() {
    return {
       currentProducteur:null,
      nom: "",
      selectedEmployee: null,
      produits: [
        // "tomate",
        // "banane",
        // "poivre",
        // "piment",
        // "ananas",
        // "pomme",
        // "riz",
        // // "Kevin Malone"
      ]
    };
  },
  methods: {
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
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
     searchNom() {
      ProduitDataService.findByNom(this.nom)
        .then(response => {
          this.produits = response.data.map(this.getDisplayProduit);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    
  },
   getDisplayProduit(produit) {
      return {
        id: produit.id,
        nom: produit.nom.length > 30 ? produit.nom.substr(0, 30) + "..." : produit.nom,
        description: produit.description.length > 30 ? produit.description.substr(0, 30) + "..." : produit.description,
        status: produit.published ? "Publier" : "Non Publier",
      };
    },
  },
mounted() {
    this.getFarmer(this.$route.params.id);
  }
};
   </script>

<style lang="css"></style>
