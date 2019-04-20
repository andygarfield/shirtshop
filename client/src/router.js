import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import ProductDetails from './components/ProductDetails';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/product/:id',
      name: 'about',
      component: ProductDetails
      //component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})