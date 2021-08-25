<template>
  <div>
    <md-table v-model="users" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="ID">{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Nom">{{ item.nom }}</md-table-cell>
        <md-table-cell md-label="Email">{{ item.email }}</md-table-cell>
        <md-table-cell md-label="Ville">{{ item.ville }}</md-table-cell>
        <md-table-cell md-label="Télephone">{{ item.telephone }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import FarmerDataService from '../../services/FarmerDataService'
export default {
  name: "ordered-table",
  props: {
    tableHeaderColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      selected: [],
      users: [
        {
          id: 1,
          name: "Dakota Rice",
          email: "Dakota.Rice@gmail.com",
          ville: "Niger",
          telephone: "Oud-Turnhout"
        },
        {
          id: 2,
          name: "Minerva Hooper",
          email: "$23,738",
          ville: "Curaçao",
          telephone: "Sinaai-Waas"
        },
        {
          id: 3,
          name: "Sage Rodriguez",
          email: "$56,142",
          ville: "Netherlands",
          telephone: "Overland Park"
        },
        {
          id: 4,
          name: "Philip Chaney",
          email: "$38,735",
          ville: "Korea, South",
          telephone: "Gloucester"
        }
      ]
    };
  },
      mounted() {
  FarmerDataService.getAll()
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
