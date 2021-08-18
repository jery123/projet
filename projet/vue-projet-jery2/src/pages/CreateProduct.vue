<template>
  <form>
      <div v-if="!submitted">
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">Ajouter un Produit </h4>
        <!-- <p class="category">Complete your profile</p> -->
      </md-card-header>

      <md-card-content>
        <div class="md-layout">
         <div class="md-layout-item md-small-size-100 md-size-50">
              <md-field>
                 <label>Nom</label>
                 <md-input v-model="produit.nom" type="text" :rules="[(v) => !!v || 'Title is required']"></md-input>
              </md-field>
            </div>
                                                                                                             
              <div class="md-layout-item md-small-size-100 md-size-50">
                <md-field>
                  <label>Quantité</label>
                  <md-input v-model="produit.quantité" type="number" :rules="[(v) => !!v || 'Unité de mesure is required']"></md-input>
                </md-field>
              </div> 
              <div class="md-layout-item md-small-size-100 md-size-50">
                <md-field>
                  <label>Prix Unitaire</label>
                  <md-input v-model="produit.prixUnitaire" type="number" :rules="[(v) => !!v || 'Unité de mesure is required']"></md-input>
                </md-field>
              </div> 
                <div class="md-layout-item md-small-size-100 md-size-50">
              <md-field>
                  <!-- <label>Unité de mesure</label> -->
                   <!-- <md-field> -->
    <label for="movie">Unité de mesure</label>
    <md-select v-model="produit.uniteDeMesure" name="movie" id="movie" :rules="[(v) => !!v || 'Unité de mesure is required']">
      <md-option value="kg">Kg</md-option>
      <md-option value="litre">Litre</md-option>
      <md-option value="cageot">Cageot</md-option>
      <md-option value="sacs">Sacs</md-option>
      <!-- <md-option value="godfellas">Godfellas</md-option>
      <md-option value="pulp-fiction">Pulp Fiction</md-option>
      <md-option value="scarface">Scarface</md-option> -->
    </md-select>
  </md-field>
                  <!-- <v-select :options="['Kg', 'Litre', 'Cageot', 'Sacs']" v-model="produit.uniteDeMesure"></v-select> -->
                  <!-- <md-input v-model="produit.uniteDeMesure" type="text"></md-input> -->
              <!-- </md-field> -->
              </div> 
                  <div class="md-layout-item md-small-size-50 ">
              <md-field>
                  <label>Description</label>
                  <!-- <v-select :options="['Kg', 'Litre', 'Cageot', 'Sacs']" v-model="produit.uniteDeMesure"></v-select> -->
                  <md-input v-model="produit.description" type="text"></md-input>
              </md-field>
              </div> 
                <div class="md-layout-item md-small-size-50 ">
                 <md-field>
                       <label>Uniquement les images</label>
                        <md-file v-model="image" accept="image/*" />
                 </md-field>
              </div> 
          <div class="md-layout-item md-size-100 text-right">
            <md-button   class="md-danger md-round" :href="'/dashboard-producteur'">Annuler </md-button>
              <md-button  @click="saveProduit" class="md-success md-round">Ajouter</md-button>
          </div>
        </div>
      </md-card-content>
    </md-card>
      </div>
        <div v-else>
      <h4>Votre produit a été crée avec succès </h4>
      <md-button class="btn btn-success" @click="newProduit"  data-toggle="modal" data-target="#modal">Add</md-button>
<!-- <button type="button" class="btn btn-danger mt-3" data-toggle="modal" data-target="#modal">Cliquez pour ouvrir le modal</button> -->

      <div class="modal fade" id="modal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <!-- <h5 class="modal-title" id="regisProd" color="black">Enregistrement</h5> -->
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">x</span></button>
            </div>
            <div class="modal-body">

       
              <p>Voulez-vous encore ajouter un produit ?</p>
            </div>
            <div class="modal-footer">
               <md-card-content>
          <div class="md-layout">
            <div class="md-layout-item md-size-100">
              <div class="places-buttons text-center">
                <md-button class="md-danger" :href="'/create-product'">Oui</md-button>
                <md-button class="md-success"  to="/dashboard-producteur">Non</md-button> 
              </div>
            </div>
          </div>
        </md-card-content>
             
            </div>
          </div>
        </div>
       
    </div>    


    </div>
  </form>
</template>
<script>
import ProduitDataService from "../services/ProduitDataService";

export default {
  name: "edit-profil-prod",
  props: {
    dataBackgroundColor: {
      type: String,
      default: ""
    }
  },
   
  data() {
    return {
      produit: {
        id:null,
        prodId:"",
        imgId:"",
        nom: "",
        description: "",
        published: false,
        quantité: "",
        prixUnitaire: "",
        uniteDeMesure:""
        // uniteDeMesure: ['Kg','Litre','Cageot', 'Sacs'],
      },
        currentProduit: null,
       submitted: false
};

    },
     methods: {
    saveProduit() {
      var data = {
        // prodId=this.get(farmer.Id),
        nom:this.produit.nom,
        description: this.produit.description,
        quantité: this.produit.quantité,
        uniteDeMesure: this.produit.uniteDeMesure,
        prixUnitaire: this.produit.prixUnitaire,
      };

      ProduitDataService.create(data)
        .then(response => {
          this.produit.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
        
    },
    
    newProduit() {
      this.submitted = false;
      this.produit = {};
    }
  }
};
</script>
<style></style>
