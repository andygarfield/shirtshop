<template>
<v-container fluid>
  <v-layout
    wrap
  >
    <the-filter-bar></the-filter-bar>
    <the-products></the-products>
  </v-layout>
</v-container> 
</template>

<script>
import TheFilterBar from './TheFilterBar';
import TheProducts from './TheProducts';

export default {
  components: {
    TheFilterBar,
    TheProducts
  }
}
</script>

<style>
.stick {
  position: sticky;
  top: 60px;
}
</style>
