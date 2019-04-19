<template>
  <v-card
    flat
    color="grey lighten-3"
    class="ma-3"
  >
  <!-- v-if="cart.length > 0" -->
    <v-card-title>Cart</v-card-title>
  </v-card>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      cart: 'cart'
    })
  }
}
</script>