<template>
  <md-card v-if="currentProducteur" class="md-card-profile">
    <div class="md-card-avatar">
      <img class="img" :src="cardUserImage" />
    </div>

 

    <md-card-content>
      <h6 class="category text-gray">Producteur de Jangolo</h6>
      <h4 class="card-title">{{currentProducteur.nom}} {{currentProducteur.prenom}}</h4>
      <p class="card-description"> Avec une expérience de: 
       {{currentProducteur.experience}}
      </p>
      <!-- <md-button class="md-round md-success">Follow</md-button> -->
    </md-card-content>
  </md-card>
</template>
<script>
import FarmerDataService from "../../services/FarmerDataService";
export default {
  name: "user-card",
  props: {
    cardUserImage: {
      type: String,
      default: require("@/assets/img/faces/téléchargé.png")
    }
  },
  data() {
    return {
      currentProducteur:null,
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
     
    },
     mounted() {
    this.getFarmer(this.$route.params.id);
  }
};
</script>
<style></style>
