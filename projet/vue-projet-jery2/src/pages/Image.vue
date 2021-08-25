<template>
<div id="app">
  <div v-if="!image">
    <h2>Select an image</h2>
    <input type="file" @change="onFileChange">
  </div>
  <div v-else>
    <img :src="image" />
    <button @click="removeImage">Remove image</button>
  </div>
</div>
</template>
<script>
export default {
// import Vue from 'vue'
// var vm = new Vue({
//   el: '#app',
  data: function (){
   return {
       image: ''
    };
  },
  // beforeMount(){
  //   var vm = this
  //   console.log('before Mounted')
  //   vm.get('img')
  // },
  methods: {
    get(key) {
      
      this.image=localStorage.getItem(key);
    },
    set(key){
      var vm = this
      try{
        
        localStorage.setItem(key,this.image);
      }
      catch(e) {
        console.log( `Storage failed: ${e}`);
      }
    },
    onFileChange(e) {
       var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.file = files[0]
      this.createImage(this.file);
      // var files = e.target.files || e.dataTransfer.files;
      // if (!files.length)
      //   return;
      // this.createImage(files[0]);
    },
    createImage(file) {
      var image = new Image();
      var reader = new FileReader();
      var vm = this;
      
      reader.onload = (e) => {
        vm.image = e.target.result;
        vm.set('img');
      };
      reader.readAsDataURL(file);
    },
    removeImage: function (e) {
      this.image = '';
      localStorage.removeItem('img')
    }
  } }
// })

// var vm = new Vue({
//     data: {
//         key: ""
//     },
//     methods: {
//         onChange(event) {
//             console.log(event.target.value)
//         }
//     }
// }
</script>