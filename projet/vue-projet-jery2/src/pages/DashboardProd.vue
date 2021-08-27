<template>
   

  <div v-if="currentProducteur">
     <div>
       <v-row >
    <v-col cols="12" md="7">
      <v-text-field v-model="nom" label="Search by Name"></v-text-field>
    </v-col>
<!-- </div> 
<div class="md-layout-item md-small-size-100 md-size-50"> -->
    <v-col cols="12" md="4">
      <v-btn small @click="searchNom">
        Search
      </v-btn>
    </v-col>
    </v-row >
</div> 
       <md-card> <div class="list row">
       
         <md-card-header data-background-color="green">
            <h4 class="title">Vos produits</h4>
            <p class="category">
          </p>
          </md-card-header>
           <md-card-content>
              <div class="md-layout-item md-medium-size-100">





 
    <v-row align="center" class="list px-3 mx-auto">
   
    <v-col cols="12" sm="12">
      <v-card class="mx-auto" tile>
        <v-data-table
          :headers="headers"
          :items="produits"
          disable-pagination
          :hide-default-footer="true"
        >
          <template v-slot:[`item.actions`]="{ item }">
           <md-button class="md-just-icon md-simple md-primary">  <svg xmlns="http://www.w3.org/2000/svg"  @click="editProduit(item.id)" width="16" height="16" fill="currentColor" class="bi bi-pen-fill" viewBox="0 0 16 16">
  <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"/>
</svg> </md-button>
          <md-button class="md-just-icon md-simple md-danger">   <svg xmlns="http://www.w3.org/2000/svg" @click="deleteProduit(item.id)" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
</svg></md-button>
          </template>
        </v-data-table>

        <v-card-actions v-if="produits.length > 0">
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
                </div>
             </md-card-content>
    </div>
   </md-card> 
 <md-button type="button"  class="md-success" :href="'/create-product/' + currentProducteur.id">Ajouter un produit </md-button>
    </div>
<!--===============END Vos produits ================-->    
</template>

<script>
import FarmerDataService from "../services/FarmerDataService";
import ProduitDataService from '../services/ProduitDataService';
import 'bootstrap/dist/css/bootstrap.min.css'
  export default {
     name: "produits-list",
        data() {
    return {
     produits: [],
     currentProducteur:null,
      nom: "",
       headers: [
        { text: "Nom", align: "start", sortable: false, value: "nom" },
        { text: "Description", value: "description", sortable: false },
        { text: "Status", value: "status", sortable: false },
       { text: "Actions", value: "actions", sortable: false },
      ],
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
 retrieveProduits() {
      ProduitDataService.getAll()
        .then(response => {
          this.produits = response.data.map(this.getDisplayProduit);
          //  this.produits = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
        // this.getDisplayProduit(this.produits)
    },
 refreshList() {
      this.retrieveProduits();
    },
     removeAllProduits() {
      ProduitDataService.deleteAll()
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
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
    this.retrieveProduits();
    //  ProduitDataService.myProd(this.$route.params.id)
    //     .then(response => {
    //       this.produits = response.data.map(this.getDisplayProduit);
    //       console.log(response.data);
    //     })
    //     .catch((e) => {
    //       console.log(e);
    //     });

  }
};
</script>

<style scoped>
*{
  font-family: 'Times New Roman', Times, serif;
}
.list {
  max-width: 750px;
}
</style>
