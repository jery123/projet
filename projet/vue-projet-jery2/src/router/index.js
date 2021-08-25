import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
//import Home from '../views/Home.vue'
import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import Dashboard from "@/pages/Dashboard.vue";
import AdminProfil from "@/pages/AdminProfile.vue";
import TableList from "@/pages/TableList.vue";
import Typography from "@/pages/Typography.vue";
import Icons from "@/pages/Icons.vue";
import Maps from "@/pages/Maps.vue";
import Notifications from "@/pages/Notifications.vue";
import commande from "@/pages/NotificationCommandes.vue";
import UpgradeToPRO from "@/pages/UpgradeToPRO.vue";
import Dashboard_client from "@/pages/Layout/DashboardLayoutUser.vue";
// import { createRouter, createWebHashHistory } from 'vue-router'
// import {  createWebHashHistory } from 'vue-router'
// import CartList from '../components/cart/Cart_List.vue';
// import ProductList from '../components/product/Product_List.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
   
    component: () => import('../pages/utilisateur/Bienvenue.vue'),
    },
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard
      },
      {
        path: "admin-profil",
        name: "Profil d'administrateur",
        component: AdminProfil
      },
      {
        path: "table",
        name: "Liste des utilisateurs",
        component: TableList
      },
      {
        path: "typography",
        name: "Produits en cours",
        component: Typography
      },
      {
        path: "icons",
        name: "Icons",
        component: Icons
      },
      {
        path: "maps",
        name: "Maps",
        meta: {
          hideFooter: true
        },
        component: Maps
      },
      {
        path: "notifications",
        name: "Notifications",
        component: Notifications
      },
      {
        path: "commande",
        name: "Notification",
        component: commande
      },
      {
        path: "upgrade",
        name: "Version plus récente",
        component: UpgradeToPRO
      },
      {
        path: "/produits/:id",
        name: "produit-details",
        component: () => import("../pages/utilisateur/Produit")
      },

    ]
  
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  
  // {
  //   path: '/accueil-client',
  //   name: 'client',
   
  //   component: () => import(/* webpackChunkName: "about" */ "@/pages/utilisateur/Accueil.client.vue")
  // },

  //////////////////pour les clients 
  {
    path: '/client',
    name: 'index',
   
    component: () => import('../pages/utilisateur/Accueil.client.vue')
  },
  {
    // path: '/detail/:id',
    path: '/detail/:id',
    name: 'product_detail-id',
    component: () => import('../pages/utilisateur/product_detail.vue')
  },
  
   {
    path: "/dashboard-producteur/:id",
    name: "Dashboard utilisateur",
     component: Dashboard_client,
     children: [
      //  {
      //   path: '/index',
      //   name: "Dashboard-producteur",
      //   component: () => import('@/pages/DashboardProd.vue')
      //  },
       {
        path: '/addProduct',
        name: 'Entrez les informations sur votre produit',
        component: () => import('@/pages/utilisateur/AddProduct.vue')
       },
       {
        path: '/dashboard-producteur',
        name: 'Dashboard-producteur',
        component: () => import('../pages/DashboardProd.vue')
       },
       {
        path: '/create-product',
        name: 'Info sur le produit',
        component: () => import('@/pages/CreateProduct.vue')
       },
       {
        path: '/profil',
        name: 'Profil d\'utilisateur',
        component: () => import('@/pages/UserProfil.vue')
       },
       {
        path: '/commandes',
        name: 'Commandes sur vos produits',
        component: () => import('@/pages/NotificationProd.vue')
       },
       {
        path: "/produitfarm/:id",
        name: "produitfarm-details",
        component: () => import("../pages/utilisateur/ProduitFarm")
      },
       
    ]
  },
   
   /**================================================
    *                                                *
    *                    produit                     *
    *                                                *
    * ===============================================*
    */
  //  {
  //   path: '/inventory',
  //   component: ProductList
  // },
  // {
  //   path: "/image1",
  //   name: "image",
  //   component: () => import("../pages/Image")
  // },
  // {
  //   path: '/cart',
  //   component: CartList
  // },
  // {
  //   path: '/in',
  //   redirect: '/inventory'
  // },
   
 
  {
    path: "/image",
    name: "image",
    component: () => import("../components/UploadImage")
  },
   
//=======================================END
   
   




 /**================================================
    *                                                *
    *                    login                     *
    *                                                *
    * ===============================================*
    */
   {
    path: '/Home',
    name: 'home',
    component: Home
  },
  {
    path: '/home1',
    component: Home
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/profile',
    name: 'profile',
    // lazy-loaded
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    // lazy-loaded
    component: () => import('../views/BoardAdmin.vue')
  },
  {
    path: '/mod',
    name: 'moderator',
    // lazy-loaded
    component: () => import('../views/BoardModerator.vue')
  },
  {
    path: '/user',
    name: 'user',
    // lazy-loaded
    component: () => import('../views/BoardUser.vue')
  }
   
  // {
  //   path: '/index1',
  //   name: 'index',
  //   component: () => import('../pages/DashboardClient.vue')
  // },
  // {
  //   path: '/default',
  //   name: 'client',
  //   component: () => import('../Vuemmerce/layouts/default.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  // history: createWebHashHistory(),
  base: process.env.BASE_URL,
  routes
})
// const router1 = createRouter({
//   history: createWebHashHistory(),
//   routes
// })

export default router
router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register', '/home'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});