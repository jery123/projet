 <template>
   

  <div>
   
       <md-card> <div class="list row">
       
         <md-card-header data-background-color="green">
            <h4 class="title">Vos produits</h4>
            <p class="category">
             <!-- Consultez vos notifications chaque jour<i class="fa fa-heart heart"></i> -->
            </p>
          </md-card-header>
          <!-- <md-card-header data-background-color="green"> 
           <h4>Vos produits</h4>
          </md-card-header> -->
           <!-- <md-card-content> -->
              <div class="md-layout-item md-medium-size-100">
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
      </div>
    <!-- </md-card-content> -->
      <div class="col-md-6">
         <div v-if="currentProduit">
           <p>Produit</p>
             <div>
               <label><strong>Nom:</strong></label> {{ currentProduit.nom }}
             </div>
             <div>
                <label><strong>Description:</strong></label> {{ currentProduit.description }}
             </div>
             <div>
                <label><strong>Status:</strong></label> {{ currentProduit.published ? "Published" : "Pending" }}
              </div>

                <md-button class="md-info"  :href="'/produitfarm/' + currentProduit.id" > Edit </md-button>
                                                

                <md-button class="md-round md-danger" @click="removeAllProduits" >Supprimer</md-button>
      
         </div>
          <!-- </md-card-content> -->
         <div v-else>
          <br />
           <p>S'il vous plait cliquer sur un Produit...</p>
        
          </div>
  
    </div>
   </md-card> 
 <md-button type="button"  class="md-success" :href="'/create-product'">Ajouter un produit </md-button>
    </div>

<!--===============END Vos produits ================-->




       
</template>

<script>
import ProduitDataService from '../services/ProduitDataService';
// import 'bootstrap/dist/css/bootstrap.min.css'
  export default {
        data() {

    return {
     produits: [],
      currentProduit: null,
      currentIndex: -1,
      nom: ""
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
      this.currentProduct = produit;
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
    
  },
   mounted() {
    this.retrieveProduits();
  }
};
</script>

<style scoped>


</style>
