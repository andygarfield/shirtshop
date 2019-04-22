import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import ProductDetails from './components/ProductDetails';
import TheCartViewer from './components/TheCartViewer';

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
      name: 'product',
      component: ProductDetails
      //component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/cart',
      name: 'cart',
      component: TheCartViewer
      //component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})