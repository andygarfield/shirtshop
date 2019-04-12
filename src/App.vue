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
    </v-toolbar>
    <v-content>
      <the-products></the-products>
    </v-content>
  </v-app>
</template>

<script>
import ToolbarLogin from './components/ToolbarLogin';
import TheProducts from './components/TheProducts';

export default {
  name: 'App',
  created() {
    this.$store.dispatch('getProducts');
  },
  components: {
    ToolbarLogin,
    TheProducts
  },
  data () {
    return {
      //
    }
  }
}
</script>
