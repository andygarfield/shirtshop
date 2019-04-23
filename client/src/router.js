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
    // the root path of the app showing the products
    {
      path: '/',
      name: 'home',
      component: ProductView
    },

    // the individual product pages
    {
      path: '/product/:id',
      name: 'product',
      component: ProductDetails
    },

    // the currect shopping cart
    {
      path: '/cart',
      name: 'cart',
      component: TheCartViewer
    },

    // the callback page for Auth0 login
    {
      path: '/callback',
      name: 'callback',
      component: Callback
    },

    // the profile page for the logged in user
    {
      path: "/profile",
      name: "profile",
      component: Profile
    },

    // the landing page after an order is complete
    {
      path: "/success",
      name: "success",
      component: Success
    }
  ]
});

export default router;