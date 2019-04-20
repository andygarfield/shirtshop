<template>
  <v-app>
    <the-toolbar></the-toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import TheToolbar from './components/TheToolbar';
import TheProductsView from './components/TheProductsView';

export default {
  name: 'App',
  created() {
    sessionStorage.clear();
    this.$store.dispatch('init');
  },
  components: {
    TheToolbar,
    TheProductsView
  }
}
</script>
