<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item">
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">Notifications des produits</h4>
            <p class="category">
             Consultez vos notifications chaque jour<i class="fa fa-heart heart"></i>
            </p>
          </md-card-header>
          <md-card-content>
            <div class="md-layout">
            
              <div class="md-layout-item md-medium-size-100">
               
              
<!-- <div class="row row-cols-1 row-cols-md-3 g-4">
  
  </div> -->
      <ul class="list-group">
                  <li class="list-group-item"
                    :class="{ active: index == currentIndex }"
                    v-for="(produit, index) in produits"
                    :key="index"
                    @click="setActiveProduit(produit, index)"
                  >
        
                  {{ produit.nom }}
                  </li>
                </ul>

    </div>
    <!-- END of list -->

    <div class="col-md-6">
      <div v-if="currentProduit">
        <h4>Produit</h4>
       <div class="md-layout-item">
                <md-field>
                 <label><strong>Nom:</strong></label> {{ currentProduit.nom }}
                </md-field>
        </div> 
        <div class="md-layout-item">
                <md-field>
                 <label><strong>Description:</strong></label> {{ currentProduit.description }}
                </md-field>
        </div> 
         <div class="md-layout-item">
                <md-field>
                  <label><strong>Quantité:</strong></label> {{ currentProduit.quantité }}
                </md-field>
        </div> 
         <div class="md-layout-item">
                <md-field>
                  <label><strong>Prix Unitaire:</strong></label> {{ currentProduit.prixUnitaire }}
                </md-field>
        </div> 
         <div class="md-layout-item">
                <md-field>
                <label><strong>Unité de mesure:</strong></label> {{ currentProduit.uniteDeMesure }}
               </md-field>
        </div> 
         <div class="md-layout-item">
                <md-field>
                 <label><strong>Status:</strong></label> {{ currentProduit.published ? "Published" : "Pending" }}
                </md-field>
        </div> 
        <md-button class="md-primary md-round"
          :href="'/Produits/' + currentProduit.id"
        >
          Modifier
        </md-button>
        <!-- <md-button class="md-round md-danger" @click="removeAllProduits" >Supprimer</md-button> -->
      </div>
      <div v-else>
        <br />
        <p>S'il vous plait cliquer sur un Produit...</p>
        
      </div>

              
              </div>

              <div class="md-layout-item md-size-100">
                <div class="places-buttons text-center">
              
                </div>
              </div>
            </div>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import ProduitDataService from '../services/ProduitDataService';
import 'bootstrap/dist/css/bootstrap.min.css'
  export default {
        data() {

    return {
     produits: [],
      currentProduit: null,
      currentIndex: -1,
      nom: "",
    };

  },
  methods: {

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
   mounted() {
    this.retrieveProduits();
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

