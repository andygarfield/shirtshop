import Vue from 'vue'
import Router from 'vue-router'
import ProductView from './components/ProductView';
import ProductDetails from './components/ProductDetails';
import TheCartViewer from './components/TheCartViewer';
import Callback from './components/Callback';
import Profile from './components/Profile';
import Success from './components/Success';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: ProductView
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
    },
    {
      path: "/success",
      name: "success",
      component: Success
    }
  ]
});

export default router;