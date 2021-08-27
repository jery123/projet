<template>
<div v-if="currentProducteur">
  <form>
    <div v-if="!submitted">
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">Modifiez votre Profile</h4>
        <!-- <p class="category">Complete your profile</p> -->
      </md-card-header>

      <md-card-content>
        <div class="md-layout">
        
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Nom d'utilisateur</label>
              <md-input v-model="currentProducteur.userName" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Email Address</label>
              <md-input v-model="currentProducteur.email" type="email"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Password</label>
              <md-input v-model="currentProducteur.mdp" type="password"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Nom</label>
              <md-input v-model="currentProducteur.nom" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Prénom</label>
              <md-input v-model="currentProducteur.prenom" type="text"></md-input>
            </md-field>
          </div>
         
          <!-- <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>Adress</label>
              <md-input v-model="currentProducteur.address" type="text"></md-input>
            </md-field>
          </div> -->
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Ville</label>
              <md-input v-model="currentProducteur.ville" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Télephone</label>
              <md-input v-model="currentProducteur.telephone" type="number"></md-input>
            </md-field>
          </div>
          <!-- <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Country</label>
              <md-input v-model="country" type="text"></md-input>
            </md-field>
          </div> -->
          <!-- <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Postal Code</label>
              <md-input v-model="code" type="number"></md-input>
            </md-field>
          </div> -->
          <div class="md-layout-item md-size-100">
            <md-field maxlength="5">
              <label>Experience</label>
              <md-textarea v-model="currentProducteur.experience"></md-textarea>
            </md-field>
          </div>
          <div class="md-layout-item md-size-100 text-right">
            <md-button @click="updateFarmer" class="md-raised md-success">Modifier</md-button>
          </div>
         
        </div>
      </md-card-content>
    </md-card>
    </div>
     
        <div v-else>
      <h4>Votre profil a été modifier avec succès</h4>
      <md-button class="btn btn-success" :href="'/profil/' + currentProducteur.id">OK</md-button>
    </div>
  </form>
</div>
</template>
<script>
import FarmerDataService from "../../services/FarmerDataService";

export default {
  name: "edit-profil-user",
    props: {
    dataBackgroundColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
     currentProducteur: null,
      submitted: false
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
 
    updateFarmer() {
     FarmerDataService.update(this.currentProducteur.id, this.currentProducteur)
        .then(response => {
          console.log(response.data);
          this.message = 'Votre profil a été modifié avec succès!';
         this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
  },
   mounted() {
    this.getFarmer(this.$route.params.id);
     this.submitted = false;
  }
};
</script>
