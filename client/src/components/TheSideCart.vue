<template>
<div
  v-if="cart.length > 0"
>
  <v-card-text class="title filter-header">Cart</v-card-text>
  <v-card
    v-for="(item, index) in cart" 
    :key="index"
    flat
    color="grey lighten-3"
    class="ma-3"
  >
    <div class="pa-3" style="position: relative">
      <v-card-text class="cart-text">
        <span class="font-weight-black">
          {{ item.quantity }}
        </span>&times; {{ item.name }}
      </v-card-text>
      <v-card-text class="cart-text">Size: {{ item.size }}</v-card-text>
      <v-card-text class="cart-text">Color: {{ item.color }}</v-card-text>
      <v-btn
        class="headline side-x"
        small flat fab color="blue"
        @click="removeFromCart(index)"
      >
        &times;
      </v-btn>
    </div>
  </v-card>
</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapState({
      cart: 'cart'
    })
  },
  methods: {
    ...mapMutations([
      'removeFromCart'
    ])
  }
}
</script>

<style scoped>
.cart-text {
  padding: 0px;
}

.side-x {
  position: absolute;
  right: 20px;
  top: 24%;
}
</style>