<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
      </v-toolbar-title>
        <v-img
          src="/tshirtshop.png"
          max-width="190px"
        ></v-img>
      <v-spacer></v-spacer>
      <toolbar-login></toolbar-login>
      <v-btn
        icon
        class="grey--text"
      >
        <v-icon>shopping_cart</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <the-products-view></the-products-view>
    </v-content>
  </v-app>
</template>

<script>
import ToolbarLogin from './components/ToolbarLogin';
import TheProductsView from './components/TheProductsView';

export default {
  name: 'App',
  created() {
    this.$store.dispatch('getProducts');
    this.$store.dispatch('getFilters');
  },
  components: {
    ToolbarLogin,
    TheProductsView
  },
  data () {
    return {
      //
    }
  }
}
</script>
