<template>
     <div id="app"></div>
</template>

 <script>
//  import Vue from 'vue'
// //  import DashboardClient from './DashboardClient.js';
//  export default {
//       name: 'app',
//       data: ()=> {
//       var app;
//          app = new Vue({
//             el: '#app',
//             template: `
//                  <div class="photo-upload">
//             <div class="file-upload-form">
//                 <input
//                     type="file"
//                     @change="previewThumbnail"
//                     name="photo-upload-button"
//                     id="photo-upload-button"
//                     accept="image/*"
//                     class="input-file"
//                 />
//                 <label for="photo-upload-button">Carregue sua foto</label>
//             </div>
//             <div
//                 class="image-preview"
//                 v-if="imageData.length > 0"
//             >
//                 <img
//                     :src="imageData"
//                     class="image-preview__img"
//                 >
//             </div>
//         </div>
//         `,
//             data: function returnImageData() {
//                 return {
//                     imageData: '',
//                 };
//             },
//             methods: {
//                 previewThumbnail: function getPreview(event) {
//                     const input = event.target;
//                     if (input.files && input.files[0]) {
//                         const reader = new FileReader();
//                         reader.onload = (e) => {
//                             this.imageData = e.target.result;
//                         };
//                         reader.readAsDataURL(input.files[0]);
//                     }
//                 },
//             },
//         }) 
//       },
//  }





import Vue from 'vue'
// import App from './App.vue'
// import vuetify from './plugins/vuetify';
Vue.config.productionTip = false
    Vue.config.devtools = false;

       var app = new Vue({
            el: '#app',
            template: `
                 <div class="photo-upload">
            <div class="file-upload-form">
                <input
                    type="file"
                    @change="previewThumbnail"
                    name="photo-upload-button"
                    id="photo-upload-button"
                    accept="image/*"
                    class="input-file"
                />
                <label for="photo-upload-button">Carregue sua foto</label>
            </div>
            <div
                class="image-preview"
                v-if="imageData.length > 0"
            >
                <img
                    :src="imageData"
                    class="image-preview__img"
                >
            </div>
        </div>
        `,
            data: function returnImageData() {
                return {
                    imageData: '',
                };
            },
            methods: {
                previewThumbnail: function getPreview(event) {
                    const input = event.target;
                    if (input.files && input.files[0]) {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                            this.imageData = e.target.result;
                        };
                        reader.readAsDataURL(input.files[0]);
                    }
                },
            },
        })

export default app












 </script>
 
 



<style lang="stylus" scoped>
@import "~styles/_vars.styl"

$gray = #bfbfbf
$dark-gray = #5b5b5b
$pink = #bc0087
$dark-pink = #96006B
$blue = #0084fa
$dark-blue = #0070d3

body
	background $gray
  
.photo-upload
		height auto
		margin 20px 0
		position relative
		text-align center
		width 100%

	.input-file
		height 0.1px
		opacity 0
		overflow hidden
		position absolute
		width 0.1px
		z-index -1

		&:focus + label
			border-color $dark-blue			

		& + label
			background transparent
			border 2px solid $pink
			border-radius 50%
			color $dark-gray
			display inline-block
			font-size 12pt
			font-weight 500
			height 200px
			line-height 200px
			text-align center
			width 200px

			&:hover,
			&:focus
				border-color $dark-blue
				cursor pointer

	.image-preview		
		border-radius 50%
		height 200px
		left -4px
		margin 0 auto
		pointer-events none
		position absolute
		right 0
		top 0
		width 200px

		&__img
			border 2px solid $pink
			border-radius 50%
			height 200px
			object-fit cover
			object-position center
			width 200px
</style>
