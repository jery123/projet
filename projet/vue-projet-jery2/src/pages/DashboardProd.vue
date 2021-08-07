<template>
   

  <div>
    
      <!-- Le bouton permet d'éviter l'ouverture intempestive du modal pour le cours -->
     

      <!-- <div class="modal fade" id="modal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Titre</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">x</span></button>
            </div>
            <div class="modal-body">
              <p>Texte du modal + choix et actions...</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
              <button type="button" class="btn btn-primary">Enregistrer</button>
            </div>
          </div>
        </div>
      </div> -->



<!--===============Vos produits ================-->
 
  
          <!-- <p class="control has-icons-left">
		<input class="input is-rounded" type="text"	v-model="nom"	placeholder="Search by title"  @keyup="searchNom">
		<span class="icon is-small is-left">
			<i class="fa fa-search"></i>
		</span>
	</p> -->
       <md-card> <div class="list row">
       
         <md-card-header data-background-color="green">
            <h4 class="title">Vos produits</h4>
            <p class="category">
             Consultez vos notifications chaque jour<i class="fa fa-heart heart"></i>
            </p>
          </md-card-header>
          <!-- <md-card-header data-background-color="green"> 
           <h4>Vos produits</h4>
          </md-card-header> -->
           <!-- <md-card-content> -->
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

                <md-button class="md-info"  :href="'/produitfarm/' + currentProduit.id"  data-toggle="modal"  data-target="#edit" > Edit </md-button>
                                                

                <md-button class="md-round md-danger" @click="removeAllProduits" >Supprimer</md-button>
      
         </div>
          <!-- </md-card-content> -->
         <div v-else>
          <br />
           <p>S'il vous plait cliquer sur un Produit...</p>
        
          </div>
    <!--  -->
       
         <div class="modal fade" id="produit" tabindex="-1" role="dialog" aria-hidden="true">
              <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                                    <!-- <h5 class="modal-title" id="prodRegis">Enregistrement</h5> -->
                                              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">x</span></button>
                                  </div>
                                   <div class="modal-body">
                                       <form>
                                          <!-- <div  v-if="!submitted"> -->
                                               <md-card>
                                                  <md-card-header :data-background-color="dataBackgroundColor">
                                                         <h4 class="title">Ajout d'un produit </h4>
                                                   </md-card-header>
                                                   <md-card-content>
                                                     <div class="md-layout"> 
                                                        <div class="md-layout-item md-small-size-100 md-size-50">
                                                          <md-field>
                                                             <label>Nom</label>
                                                             <md-input v-model="produit.nom" type="text"></md-input>
                                                          </md-field>
                                                        </div>
                                                                                                             
                                                          <div class="md-layout-item md-small-size-100 md-size-50">
                                                            <md-field>
                                                              <label>Quantité</label>
                                                              <md-input v-model="produit.quantité" type="number"></md-input>
                                                            </md-field>
                                                          </div> 
                                                          <div class="md-layout-item md-small-size-100 md-size-50">
                                                            <md-field>
                                                              <label>Prix Unitaire</label>
                                                              <md-input v-model="produit.prixUnitaire" type="number"></md-input>
                                                            </md-field>
                                                          </div> 
                                                            <div class="md-layout-item md-small-size-100 md-size-50">
                                                          <md-field>
                                                              <label>Unité de mesure</label>
                                                              <v-select :options="['Kg', 'Litre', 'Cageot', 'Sacs']" v-model="produit.uniteDeMesure"></v-select>
                                                              <!-- <md-input v-model="produit.uniteDeMesure" type="text"></md-input> -->
                                                          </md-field>
                                                         </div> 
                                                          <div class="md-layout-item md-size-100 text-right">
                                                               <md-button class="md-danger" @click="notifyVue('top','left')"  data-dismiss="modal">Fermer</md-button>
                                                               <md-button class="md-success" @click="saveProduit" data-toggle="modal"  data-target="#cOK"  >Enregistrer </md-button>
                                                               
                                                               
                                                                     <div class="modal fade" id="cOK" tabindex="-1" role="dialog" aria-hidden="true">
                                                                            <div class="modal-dialog" role="document">
                                                                                     <div class="modal-content">
                                                                                          <div class="modal-header">
                                                                                                 <h5 class="modal-title" id="regisProd" color="black">Validation !</h5>
                                                                                                 <!-- <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">x</span></button> -->
                                                                                           </div>
                                                                                           <div class="modal-body">

                                                                                               <h4>Produit créer avec succès ! </h4>
            
                                                                                            </div>
                                                                                            <div class="modal-footer">
                                                                                               <md-button class="md-info" @click="newProduit" >OK</md-button>                
                                                                                            </div>
                                                                                      </div>
                                                                              </div>
                                                                       </div>
                                                                        </div> 
                                                                      </div>
         
                                                           
                                                        </md-card-content>
                                                      </md-card>
                                                      <!-- </div> -->
                                            
                                        </form>
                                </div>                              
                           </div>
                    </div>
                  </div>

  <!-- / -->
        
     
    </div>
   </md-card>
 <template>
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
</template>
 <md-button type="button"  class="md-succes" data-toggle="modal" data-target="#produit">Ajouter un produit </md-button>
  </div>

<!--===============END Vos produits ================-->




       
</template>

<script>
import ProduitDataService from '../services/ProduitDataService';
import 'bootstrap/dist/css/bootstrap.min.css'
  export default {
        data() {

    return {
      produit: {id: null, prodId:"",  imgId:"", nom:"", description:"", quantité:"", prixUnitaire:"", uniteDeMesure:"",  published: false },
        produits: [],
      currentProduit: null,
      currentIndex: -1,
      nom: ""
// submitted: false
    };

  },
  methods: {
    saveProduit() {
      var data = {
        //  prodId:this.produit.prodId,
        // imgId: this.produit.imgId,
        nom:this.produit.nom,
        description: this.produit.description,
        quantité: this.produit.quantité,
        prixUnitaire: this.produit.prixUnitaire,
        uniteDeMesure:this.produit.uniteDeMesure,
       };

      ProduitDataService.create(data)
        .then(response => {
          this.produit.id = response.data.id;
          console.log(response.data);
          // this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },//================end====================//

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
    newProduit() {
      // this.submitted = false;
      this.produit = {};
    },
  },
   mounted() {
    this.retrieveProduits();
  }
};
</script>

<style scoped>


</style>
