<template>
<div id="app"> <nav class="navbar navbar-expand navbar-white bg-white">
     <a href="https://www.jangolo.cm"><img src="../assets/fullhd/img.png" alt="" height="80px" width="80px"></a>
       <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/home1" class="nav-link">
            <font-awesome-icon icon="home" />Home
          </router-link>
        </li>
        <li v-if="showAdminBoard" class="nav-item">
          <router-link to="/admin" class="nav-link">Admin Board</router-link>
        </li>
        <li v-if="showModeratorBoard" class="nav-item">
          <router-link to="/mod" class="nav-link">Moderator Board</router-link>
        </li>
        <li class="nav-item">
          <router-link v-if="currentUser" to="/user" class="nav-link">User</router-link>
        </li>
      </div>

      <div v-if="!currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/register" class="nav-link">
            <font-awesome-icon icon="user-plus" />Sign Up
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link">
            <font-awesome-icon icon="sign-in-alt" />Login
          </router-link>
        </li>
      </div>

      <div v-if="currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/profile" class="nav-link">
            <font-awesome-icon icon="user" />
            {{ currentUser.username }}
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href @click.prevent="logOut">
            <font-awesome-icon icon="sign-out-alt" />LogOut
          </a>
        </li>
      </div>
    </nav>
     <main id="main">

    <!-- ======= Breadcrumbs Section ======= -->
    <section class="breadcrumbs">
      <div class="container">

        <div class="d-flex justify-content-between align-items-center">
         
          <ol>
            <li><a href="/profile">Home</a></li>
            <li>Produits</li>
          </ol>
        </div>
       </div>
    </section><!-- End Breadcrumbs Section -->
</main>
  
<div class="heade">
<br>
<br>
<br>
<br>
<br>
<br>
   <div class="col-md-8">
      <div class="input-group mb-3">
<!--         
        <input type="text" id="search"  placeholder="Search by name" v-model="title"/>
        <div class="input-group-append">
         <md-button  id="search1" @click="searchTitle"> Search</md-button>
        </div> -->
         <v-row >
         <v-col cols="12" md="8">
      <v-text-field id="search" v-model="nom" label="Search by Name"></v-text-field>
    </v-col>

    <v-col cols="12" md="4">
      <v-btn small @click="searchNom">
        Search
      </v-btn>
    </v-col>
      </v-row>
      </div>
    </div>
</div>
<div id="produits">
  <div id="heade1">
    <h2> Nos produits</h2>
  </div>
   <div  
                    :class="{ active: index == currentIndex }"
                    v-for="(produit, index) in produits"
                    :key="index"
                    @click="setActiveProduit(produit, index)" 
                   :href="'/produitfarm/' + produit.id"
                  >
                  <div  class="roz" >
                   <div  class="col" >

       <v-card class="mx-auto" max-width="344" 
  >
  <div data-toggle="modal" data-target="#modalProd" >  
    <v-img
      :src="'http://localhost:8083/ap/files/'+ produit.image "
      height="200px"
    ></v-img>

    <v-card-title>
         {{ produit.nom }}
    </v-card-title>

    <v-card-subtitle>
       {{ produit.description }}
    </v-card-subtitle>
 </div>
    <v-card-actions>
      <v-btn
      class="md-raised md-success"
         text
      >
        Achat
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        icon
        @click="show = !show"
      >
        <v-icon color="orange lighten-2">{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show" color="orange lighten-2">
        <v-divider></v-divider>

        <v-card-text>
          Produit disponible sur tout nos coin de vente
            </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
  </div> 
<!-- Modal -->
<div v-if="currentProduit" class="modal fade" id="modalProd" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
               <p>Produit {{currentProduit.id}}</p>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">x</span></button>
            </div>
            <div class="modal-body">
             <div>
               <label><strong>Nom:</strong></label> {{ currentProduit.nom }}
             </div>
             <div>
                <label><strong>Description:</strong></label> {{ currentProduit.description }}
             </div>
             <div>
                <label><strong>Quantité:</strong></label> {{ currentProduit.quantité }}
              </div>
               <div>
                <label><strong>Prix Unitaire:</strong></label> {{ currentProduit.prixUnitaire }}
              </div>
              <div>
                <label><strong>Unité de mesure:</strong></label> {{ currentProduit.uniteDeMesure }}
              </div>
               
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Nom d'utilisateur</label>
             {{ currentProduit.quantité }}
            </md-field>
          </div>
            </div>
            <div class="modal-footer">
               <md-card-content>
          <div class="md-layout">
            <div class="md-layout-item md-size-100">
              <div class="places-buttons text-center">
                <md-button class="md-danger" @click="notifyVue('top','left')"  data-dismiss="modal">Annuler</md-button>
                <md-button class="md-success" :href="'/detail/' + currentProduit.id" >Plus d'infos </md-button>
                                                               
              <md-button class="md-info " @click="notifyVue('top','left')"  :href="'/detail/' + currentProduit.id" > Plus d'infos </md-button>
              <md-button class="md-danger" @click="notifyVue('top','left')"  data-dismiss="modal" >Annuler</md-button> </div>
            </div>
          </div>
        </md-card-content>
             
            </div>
          </div>
        </div>
      </div>
           <!-- <div  class="modal fade" id="modal Prod" tabindex="-1" role="dialog" aria-hidden="true">
          
           
      
         </div>       -->
     <!--END Modal -->             
                  </div>
                </div> 
    </div>
  <div class="container">
    <header class="jumbotron">
      <h3>{{content}}</h3>
    </header>
      </div>
  </div>
</template>

<script>
import UserService from '../services/user.service';
import ProduitDataService from '../services/ProduitDataService';
export default {
  name: 'Home',
   computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_ADMIN');
      }

      return false;
    },
    showModeratorBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_MODERATOR');
      }

      return false;
    }
  },
    methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    },
    
 retrieveProduits() {
      ProduitDataService.getAll()
        .then(response => {
          this.produits = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
 refreshList() {
      this.retrieveProduits();
      this.currentProduit = null;
      this.currentIndex = -1;
    },
 setActiveProduit(produit, index) {
      this.currentProduit = produit;
      this.currentIndex = index;
    },
     removeAllProduits() {
      ProduitDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    searchNom() {
      ProduitDataService.findByNom(this.nom)
        .then(response => {
          this.produits = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    
  },
      editProduit(id) {
      this.$router.push({ name: "produitfarm-details", params: { id: id } });
    },
      deleteProduit(id) {
      ProduitDataService.delete(id)
        .then(() => {
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  
    getDisplayProduit(produit) {
      return {
        id: produit.id,
        nom: produit.nom.length > 30 ? produit.nom.substr(0, 30) + "..." : produit.nom,
        description: produit.description.length > 30 ? produit.description.substr(0, 30) + "..." : produit.description,
        status: produit.published ? "Published" : "Pending",
      };
  },
  data() {
    return {
      content: '', 
      produits: [],
      currentProduit: null,
      currentIndex: -1,
      nom: "",
       show:false,
    };
  },
  mounted() {
     this.retrieveProduits();
    UserService.getPublicContent().then(
      response => {
        this.content = response.data;
      },
      error => {
        this.content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    );
  }
};
</script>

<style>
#search{
  height: 45px;
  vertical-align: middle;
  border: dashed;
  border-width: 4px 2px;
  border-radius: 40px;
  background-color:white;
  border: #333;
  color: black;
   font-family: "Times New Roman", Times, serif;
   font-weight: bold;
   min-width: 500px;
}
#search1{
  vertical-align: middle;
  border: dashed;
  border-width: 4px 2px;
  border-radius: 40px;
  background-color:white;
  border: #333;
  color: black;
  font-family: "Times New Roman", Times, serif;
   min-width: 20px;
}
/* p{
   font-family: "Times New Roman", Times, serif;
}
.footer {
   background: #b9e2fc;
   color: black;
    font-family: "Times New Roman", Times, serif;
  font-style: italic;
  font-weight: bold;
 }
 .hero {
     background: rgb(101, 199, 142);
     height: 200px;
    }
    h1, h2 {
      color: #fff;
      position: center; 
    }
    h1{
    font-family: "Times New Roman", Times, serif;
      font-size:1.5em;

    }
    h2{
  font-family: "Times New Roman", Times, serif;
  font-style: italic;
  font-weight: bold;
    } */

#regisProd{
  color: rgb(0, 0, 0);
}




.heade{
   vertical-align: middle;
  display: inline-block;
  text-align: center;
    background: url('../assets/fullhd/15.jpg') no-repeat;
    background-size: cover;
   width: 100%;
   height: 400px;
   border: 2px solid;
   color: rgb(189, 152, 152);
   resize: both;
    }
#heade1 h2{
   font-family: "Times New Roman", Times, serif;
   /* font-style: italic; */
   font-weight: bold;
   background-color: rgba(255, 255, 255, 0.849);
   height: 50px;
   border: 2px solid;
   color: rgba(25, 80, 46, 0.835);
  }








/**
* Template Name: Bell - v4.3.0
* Template URL: https://bootstrapmade.com/bell-free-bootstrap-4-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

h1, h2, h3, h4, h5, h6 {
  font-family: "Raleway", Helvetica, Arial, sans-serif;
}

p {
  line-height: 1.55;
  color: #333;
  font-size: 400;
  font-family: "Raleway", Helvetica, Arial, sans-serif;
}

h1 {
  font-size: 62px;
}

h2 {
  font-size: 30px;
  margin-bottom: 65px;
}

h3 {
  font-size: 24px;
}

h4 {
  font-size: 18px;
}

/*--------------------------------------------------------------
# General
--------------------------------------------------------------*/
a {
  transition: 0.5s;
  text-decoration: none;
  color: #199EB8;
}

a:hover {
  color: #23c2e1;
}

/*--------------------------------------------------------------
# Back to top button
--------------------------------------------------------------*/
.back-to-top {
  position: fixed;
  visibility: hidden;
  opacity: 0;
  right: 15px;
  bottom: 15px;
  z-index: 996;
  background: #199EB8;
  width: 40px;
  height: 40px;
  border-radius: 50px;
  transition: all 0.4s;
}

.back-to-top i {
  font-size: 28px;
  color: #fff;
  line-height: 0;
}

.back-to-top:hover {
  background: #1ebddc;
  color: #fff;
}

.back-to-top.active {
  visibility: visible;
  opacity: 1;
}

/* ==================================================
  Elements
  ================================================== */
.btn {
  background-color: #199EB8;
  font-family: "Roboto", Helvetica, Arial, sans-serif;
  font-weight: 800;
  color: #fff;
  padding: 15px 45px;
  border-radius: 50px;
}

.btn:hover {
  background-color: #E04F00;
  color: #fff;
}

.btn:focus {
  color: #fff;
}

.btn-ghost {
  border: 3px solid #fff;
  background-color: transparent;
}

.btn-ghost:hover {
  background-color: #fff;
  color: #199EB8;
}

section {
  padding: 85px 0;
}

.card {
  position: relative;
  padding: 0;
  border: 0;
  border-radius: 0;
  margin: 0;
  overflow: hidden;
}

a:hover {
  text-decoration: none !important;
}

/*--------------------------------------------------------------
# Header
--------------------------------------------------------------*/
#header {
  background: rgb(255, 255, 255);
  height: 70px;
}

#header #logo h1 {
  font-size: 32px;
  margin: 0;
  line-height: 0;
  font-family: "Raleway", Helvetica, Arial, sans-serif;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
}

#header #logo h1 a,
#header #logo h1 a:hover {
  color: #fff;
}

#header #logo img {
  padding: 0;
  margin: 0;
  max-height: 40px;
}

.scrolled-offset {
  margin-top: 70px;
}

/*--------------------------------------------------------------
# Header Social Links
--------------------------------------------------------------*/
.header-social-links {
  margin: 0 0 0 30px;
}

.header-social-links a {
  color: rgba(255, 255, 255, 0.8);
  padding-left: 8px;
  display: inline-block;
  line-height: 0px;
  transition: 0.3s;
}

.header-social-links a i {
  line-height: 0;
  font-size: 24px;
}

.header-social-links a:hover {
  color: #fff;
}

@media (max-width: 768px) {
  .header-social-links {
    margin: 0 15px 0 0;
  }
}

/*--------------------------------------------------------------
# Navigation Menu
--------------------------------------------------------------*/
/**
* Desktop Navigation 
*/
.navbar {
  padding: 0;
  background-color: #fff;
}

.navbar ul {
  margin: 0;
  padding: 0;
  display: flex;
  list-style: none;
  align-items: center;
}

.navbar li {
  position: relative;
}

.navbar a, .navbar a:focus {
  color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0 10px 30px;
  font-family:  'Times New Roman', Times, serif;
  font-size: 15px;
  font-weight: 600;
  white-space: nowrap;
  transition: 0.3s;
}

.navbar a i, .navbar a:focus i {
  font-size: 12px;
  line-height: 0;
  margin-left: 5px;
}

.navbar a:hover, .navbar .active, .navbar .active:focus, .navbar li:hover > a {
  color: rgb(39, 31, 31);
}

.navbar .dropdown ul {
   color: #fff;
  display: block;
  position: absolute;
  left: 30px;
  top: calc(100% + 30px);
  margin: 0;
  padding: 10px 0;
  z-index: 99;
  opacity: 0;
  visibility: hidden;
  background: #fff;
  box-shadow: 0px 0px 30px rgba(255, 255, 255, 0.25);
  transition: 0.3s;
  border-radius: 4px;
}

.navbar .dropdown ul li {
  min-width: 200px;
}

.navbar .dropdown ul a {
  padding: 10px 20px;
  color: #555;
}

.navbar .dropdown ul a i {
  font-size: 12px;
}

.navbar .dropdown ul a:hover, .navbar .dropdown ul .active:hover, .navbar .dropdown ul li:hover > a {
  color: #199EB8;
}

.navbar .dropdown:hover > ul {
  opacity: 1;
  top: 100%;
  visibility: visible;
}

.navbar .dropdown .dropdown ul {
  top: 0;
  left: calc(100% - 30px);
  visibility: hidden;
}

.navbar .dropdown .dropdown:hover > ul {
  opacity: 1;
  top: 0;
  left: 100%;
  visibility: visible;
}

@media (max-width: 1366px) {
  .navbar .dropdown .dropdown ul {
    left: -90%;
  }
  .navbar .dropdown .dropdown:hover > ul {
    left: -100%;
  }
}

/**
* Mobile Navigation 
*/
.mobile-nav-toggle {
  color: #fff;
  font-size: 28px;
  cursor: pointer;
  display: none;
  line-height: 0;
  transition: 0.5s;
}

@media (max-width: 991px) {
  .mobile-nav-toggle {
    display: block;
  }
  .navbar ul {
    display: none;
  }
}

.navbar-mobile {
  position: fixed;
  overflow: hidden;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(34, 34, 34, 0.9);
  transition: 0.3s;
  z-index: 999;
}

.navbar-mobile .mobile-nav-toggle {
  position: absolute;
  top: 15px;
  right: 15px;
}

.navbar-mobile ul {
  display: block;
  position: absolute;
  top: 55px;
  right: 15px;
  bottom: 15px;
  left: 15px;
  padding: 10px 0;
  border-radius: 8px;
  background-color: #fff;
  overflow-y: auto;
  transition: 0.3s;
}

.navbar-mobile a {
  padding: 10px 20px;
  font-size: 15px;
  color: #555;
}

.navbar-mobile a:hover, .navbar-mobile .active, .navbar-mobile li:hover > a {
  color: #199EB8;
}

.navbar-mobile .getstarted {
  margin: 15px;
}

.navbar-mobile .dropdown ul {
  position: static;
  display: none;
  margin: 10px 20px;
  padding: 10px 0;
  z-index: 99;
  opacity: 1;
  visibility: visible;
  background: #555;
  box-shadow: 0px 0px 30px rgba(127, 137, 161, 0.25);
}

.navbar-mobile .dropdown ul li {
  min-width: 200px;
}

.navbar-mobile .dropdown ul a {
  padding: 10px 20px;
}

.navbar-mobile .dropdown ul a i {
  font-size: 12px;
}

.navbar-mobile .dropdown ul a:hover, .navbar-mobile .dropdown ul .active:hover, .navbar-mobile .dropdown ul li:hover > a {
  color: #199EB8;
}

.navbar-mobile .dropdown > .dropdown-active {
  display: block;
}

/*--------------------------------------------------------------
# Hero Section
--------------------------------------------------------------*/
.hero {
  display: table;
  position: relative;
  background-image: url('../assets/fullhd/15.jpg');
  background-size: cover;
  padding: 150px 0;
  color: #fff;
  width: 100%;
  height: 100vh;
}

.hero:after {
  content: '';
  z-index: 0;
  position: absolute;
  background: rgba(0, 0, 0, 0.65);
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}

.hero .container {
  position: relative;
  z-index: 1;
  text-align: center;
  display: table-cell;
  vertical-align: middle;
  width: 100%;
}

.hero-brand {
  margin-bottom: 75px;
  display: inline-block;
}

.hero-brand:hover {
  opacity: .75;
}

.tagline {
  font-family: "Raleway", Helvetica, Arial, sans-serif;
  font-size: 26px;
  margin: 45px 0 75px 0;
  color: #fff;
}

/*--------------------------------------------------------------
# Stats
--------------------------------------------------------------*/
.stats-row {
  margin-top: 65px;
}

.stats-col .circle {
  display: inline-block;
  width: 160px;
  height: 160px;
  font-family: "Raleway", Helvetica, Arial, sans-serif;
  font-weight: 500;
  color: #666;
  border: 6px solid #199EB8;
  border-radius: 50%;
  padding: 55px 25px 0 25px;
  position: relative;
}

.stats-col .circle .stats-no {
  color: #fff;
  width: 70px;
  height: 70px;
  line-height: 70px;
  top: -25px;
  right: -15px;
  font-family: "Raleway", Helvetica, Arial, sans-serif;
  font-size: 18px;
  background-color: #E04F00;
  position: absolute;
  border-radius: 50%;
  font-weight: 700;
}

/*--------------------------------------------------------------
# Breadcrumbs
--------------------------------------------------------------*/
.breadcrumbs {
  padding: 20px 0;
  background-color: #fafafa;
  min-height: 40px;
}

.breadcrumbs h2 {
  font-size: 24px;
  font-weight: 300;
  margin: 0;
}

@media (max-width: 992px) {
  .breadcrumbs h2 {
    margin: 0 0 10px 0;
  }
}

.breadcrumbs ol {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 14px;
}

.breadcrumbs ol li + li {
  padding-left: 10px;
}

.breadcrumbs ol li + li::before {
  display: inline-block;
  padding-right: 10px;
  color: #6c757d;
  content: "/";
}

@media (max-width: 768px) {
  .breadcrumbs .d-flex {
    display: block !important;
  }
  .breadcrumbs ol {
    display: block;
  }
  .breadcrumbs ol li {
    display: inline-block;
  }
}

/* ==================================================
  Welcome Styling
  ================================================== */
/* .welcome {
  color: #fff;
  height: 490px;
  overflow: hidden;
  padding-top: 85px;
  background: url("../img/parallax-bg.jpg") center top no-repeat;
} */

.welcome h2 {
  text-transform: uppercase;
  margin-bottom: 15px;
}

.welcome p {
  color: #fff;
  margin-bottom: 45px;
}

/* ==================================================
  Features Styling
  ================================================== */
.features {
  padding-bottom: 45px;
}

.features h2 {
  color: #199EB8;
}

.feature-col {
  display: table;
  padding-bottom: 45px;
}

.feature-col > div > div {
  display: table-cell;
  vertical-align: middle;
}

.feature-col > div > div:last-child {
  padding-left: 20px;
}

.feature-col .feature-icon {
  width: 70px;
  height: 70px;
  margin-bottom: 15px;
  background: #199EB8;
  color: #fff;
  font-size: 24px;
  text-align: center;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 0;
}

.feature-col h3 {
  color: #199EB8;
}

.feature-col p {
  font-family: "Roboto", Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #999;
}

/* ==================================================
  Call-to-action Styling
  ================================================== */
.cta {
  background-color: #199EB8;
  padding: 25px 0;
}

.cta h2 {
  margin-bottom: 5px;
}

.cta h2,
.cta p {
  color: #fff;
}

.cta p {
  margin-bottom: 0;
  opacity: .75;
}

.cta .btn-ghost {
  position: relative;
  top: 13px;
}

/* ==================================================
  Portfolio Styling
  ================================================== */
.portfolio {
  background-color: #edf6ff;
  padding-bottom: 0;
}

.portfolio h2 {
  color: #199EB8;
  margin-bottom: 25px;
}

.portfolio-grid {
  margin-top: 65px;
}

.portfolio-grid .row {
  margin: 0;
}

.portfolio-grid .row > div {
  padding: 0;
}

.portfolio-grid .row > div .card img {
  width: 100%;
}

.portfolio-grid .row > div .card .portfolio-over {
  position: absolute;
  display: table-cell;
  vertical-align: middle;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  top: 0;
  left: 0;
  text-align: center;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}

.portfolio-grid .row > div .card .portfolio-over > div {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}

.portfolio-grid .row > div .card .portfolio-over .card-title {
  color: #fff;
  font-size: 30px;
}

.portfolio-grid .row > div .card .portfolio-over .card-text {
  color: #fff;
  opacity: .75;
  padding: 0 45px;
}

.portfolio-grid .row > div .card:hover .portfolio-over {
  opacity: 1;
  visibility: visible;
}

/* ==================================================
  Team Styling
  ================================================== */
.team h2 {
  color: #199EB8;
}

.team .col-sm-3 {
  padding: 0;
}

.team .card > a {
  display: block;
}

.team .card img {
  width: 100%;
}

.team .card h4 {
  color: #fff;
  text-transform: uppercase;
}

.team .card p {
  font-size: 11px;
  color: #fff;
  opacity: .75;
  margin: 0;
  padding: 0 35px;
}

.team .card .social-nav {
  margin-bottom: 45px;
}

.team .card .social-nav a {
  color: #fff;
  font-size: 16px;
  margin: 0 4px;
}

.team .card .social-nav a:hover {
  opacity: .75;
}

.team .card:hover .team-over {
  opacity: 1;
  visibility: visible;
}

.team .card:hover .card-title-wrap {
  background-color: #199EB8;
}

.team .card:hover .card-title-wrap .card-title,
.team .card:hover .card-title-wrap .card-text {
  color: #fff;
}

.team .team-over {
  padding-top: 45px;
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  top: 0;
  left: 0;
  text-align: center;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}

.team .card-title-wrap {
  padding: 15px 25px;
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.team .card-title-wrap .card-title,
.team .card-title-wrap .card-text {
  font-family: "Raleway", Helvetica, Arial, sans-serif;
  display: block;
  margin: 0;
}

.team .card-title-wrap .card-title {
  font-size: 24px;
  color: #333;
}

.team .card-title-wrap .card-text {
  font-size: 18px;
  color: #999;
}

/* ==================================================
  Contact Section
  ================================================== */
#contact {
  background: #f7f7f7;
  padding: 80px 0;
}

#contact h2 {
  font-family: "Raleway", Helvetica, Arial, sans-serif;
  color: #199EB8;
}

#contact .info i {
  font-size: 32px;
  color: #199EB8;
  float: left;
  line-height: 0;
}

#contact .info p {
  padding: 0 0 10px 50px;
  line-height: 24px;
}

#contact .php-email-form .validate {
  display: none;
  color: red;
  margin: 0 0 15px 0;
  font-weight: 400;
  font-size: 13px;
}

#contact .php-email-form .error-message {
  display: none;
  color: #fff;
  background: #ed3c0d;
  text-align: left;
  padding: 15px;
  font-weight: 600;
}

#contact .php-email-form .error-message br + br {
  margin-top: 25px;
}

#contact .php-email-form .sent-message {
  display: none;
  color: #fff;
  background: #18d26e;
  text-align: center;
  padding: 15px;
  font-weight: 600;
}

#contact .php-email-form .loading {
  display: none;
  background: #fff;
  text-align: center;
  padding: 15px;
}

#contact .php-email-form .loading:before {
  content: "";
  display: inline-block;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  margin: 0 10px -6px 0;
  border: 3px solid #18d26e;
  border-top-color: #eee;
  -webkit-animation: animate-loading 1s linear infinite;
  animation: animate-loading 1s linear infinite;
}

#contact .php-email-form input, #contact .php-email-form textarea {
  border-radius: 0;
  box-shadow: none;
}

#contact .php-email-form input::focus, #contact .php-email-form textarea::focus {
  background-color: #199EB8;
}

#contact .php-email-form button[type="submit"] {
  background: #199EB8;
  border: 0;
  padding: 10px 24px;
  color: #fff;
  transition: 0.4s;
}

#contact .php-email-form button[type="submit"]:hover {
  background: #23c2e1;
}

@-webkit-keyframes animate-loading {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes animate-loading {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/*--------------------------------------------------------------
# Footer
--------------------------------------------------------------*/
.site-footer {
  background-color: #111;
  padding: 0;
}

.site-footer h2,
.site-footer p {
  color: #fff;
}

.site-footer p {
  opacity: .75;
  line-height: 2.0925;
}

.site-footer h2,
.site-footer .btn {
  margin-bottom: 25px;
}

.site-footer .social-nav a {
  color: #fff;
  opacity: .25;
}

.site-footer .social-nav a:hover {
  opacity: 1;
}

.site-footer .bottom {
  background-color: #000;
  padding: 20px 0;
}

.site-footer .bottom .list-inline,
.site-footer .bottom p {
  margin: 0;
}

.site-footer .bottom .list-inline {
  position: relative;
  top: 5px;
}

.site-footer .bottom .list-inline a {
  color: #fff;
  font-family: "Roboto", Helvetica, Arial, sans-serif;
  margin-right: 15px;
}

.site-footer .bottom .list-inline a:hover {
  color: #199EB8;
}

.site-footer .credits {
  color: #ddd;
}

.site-footer .credits a {
  color: #199EB8;
}

/* ==================================================
  Responsive Styling
  ================================================== */
@media (max-width: 61.9em) {
  section,
  .block,
  .cta {
    padding: 35px 0;
  }
  .features {
    padding-bottom: 5px;
  }
  p,
  .block p {
    margin: 0;
  }
  .hero-brand {
    margin-bottom: 35px;
  }
  .tagline {
    margin: 35px 0;
  }
  h1 {
    font-size: 32px;
    margin: 0;
  }
  h2,
  .tagline {
    font-size: 24px;
  }
  h2 {
    margin-bottom: 25px;
  }
  h3 {
    font-size: 14px;
  }
  .hero {
    padding: 75px 0;
  }
  .stats-col {
    margin-bottom: 25px;
  }
  .block {
    height: auto;
  }
  .feature-col {
    padding-bottom: 30px;
  }
  .portfolio-grid .card h3.card-title {
    font-size: 18px !important;
  }
  .portfolio-grid .card .card-text {
    font-size: 13px;
  }
  .team .team-over {
    padding-top: 20px;
  }
  .team .card .social-nav {
    margin-bottom: 15px;
    padding: 0;
  }
  .site-footer .social-nav {
    margin-bottom: 35px;
  }
  .site-footer .list-inline {
    text-align: center;
    padding-bottom: 15px;
  }
  .site-footer .list-inline li {
    display: inline-block;
  }
}

@media (max-width: 767px) {
  .block {
    padding-left: 30px;
    padding-right: 30px;
  }
}






</style>
