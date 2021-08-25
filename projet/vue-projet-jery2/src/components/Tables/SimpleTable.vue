<template>
  <div>
    <md-table v-model="users" :table-header-color="tableHeaderColor"  > 
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Nom">{{ item.nom }}</md-table-cell>
        <md-table-cell md-label="Email">{{ item.email }}</md-table-cell>
        <md-table-cell md-label="Ville">{{ item.ville }}</md-table-cell>
        <md-table-cell md-label="Telephone">{{ item.telephone }}</md-table-cell>
      </md-table-row>  
    </md-table>
     
</div>
</template>

<script>
// import axios from 'axios';
import ClientDataService from '../../services/ClientDataService'
export default {
  name: "simple-table",
 props: {
    tableHeaderColor: {
      type: String,
      default: ""
    }
  },
 data() {
    return {
      
      users: [
    //      {
        
    //     "nom": "pop",
    //     "email": "pop@gmail.com",
    //     "ville": "douala\r\n",
    //     "telephone": 650515253,
       
    // },
    // {
        
    //     "nom": "franck",
    //     "userName": "prope",
    //     "email": "franch.edouade@gmail.com",
    //     "ville": "Bertoua",
    //     "telephone": 640414243,
       
    // },
    // {
       
    //     "nom": "kenfack",
    //     "userName": "Yemalé",
    //     "email": "kenfack.dadi@gmail.com",
    //     "ville": "dschang",
    //     "telephone": 670717273,
       
    // }
      ],
    };
  },
   mounted() {
  ClientDataService.getAll()
        .then(response => {
          this.users = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
     }

};
</script>
