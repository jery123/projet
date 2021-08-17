<template>
  <ul class="nav nav-mobile-menuUser">
    <!-- <li>
      <md-field>
        <label>Search</label>
        <md-input v-model="search" type="text"></md-input>
      </md-field>
    </li> -->
    <li>
          <v-col cols="12" md="8">
      <v-text-field v-model="nom" label="Search by Name"></v-text-field>
    </v-col>

    <v-col cols="12" md="4">
      <v-btn small @click="searchNom">
        Search
      </v-btn>
    </v-col>

    </li>
    <li>
      <a href="#" class="dropdown-toggle" data-toggle="dropdown">
        <i class="material-icons">dashboard</i>
        <p>Dashboard</p></a
      >
    </li>
    <li>
      <drop-down>
        <a slot="title" class="dropdown-toggle" data-toggle="dropdown">
          <i class="material-icons">notifications</i>
          <span class="notification">5</span>
          <p>Notifications</p>
        </a>
        <ul class="dropdown-menu dropdown-menu-right">
          <li><a href="#">Mike John responded to your email</a></li>
          <li><a href="#">You have 5 new tasks</a></li>
          <li><a href="#">You're now friend with Andrew</a></li>
          <li><a href="#">Another Notification</a></li>
          <li><a href="#">Another One</a></li>
        </ul>
      </drop-down>
    </li>
    <li>
      <a href="#" data-toggle="dropdown" class="dropdown-toggle"
        ><i class="material-icons">person</i>
        <p>Profile</p></a
      >
    </li>
  </ul>
</template>
<script>
export default {
  data() {
    return {
      search: null,
      selectedEmployee: null,
      employees: [
       
        "Angela Martin",
        "Kelly Kapoor",
        "Ryan Howard",
        "Kevin Malone"
      ]
    };
  },
  methods:{
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
  }
};
</script>
