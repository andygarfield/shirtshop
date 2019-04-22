import Vue from 'vue'
import Router from 'vue-router'
import auth from "./auth/authService";
import Home from './views/Home'
import ProductDetails from './components/ProductDetails';
import TheCartViewer from './components/TheCartViewer';
import Callback from './components/Callback';
import Profile from './components/Profile';

Vue.use(Router);

const router = new Router({
  mode: 'history',
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
    },
    {
      path: '/cart',
      name: 'cart',
      component: TheCartViewer
    },
    {
      path: '/callback',
      name: 'callback',
      component: Callback
    },
    {
      path: "/profile",
      name: "profile",
      component: Profile
    }
  ]
});

export default router;