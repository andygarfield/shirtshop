<template>
<div
  v-if="cart.length > 0"
>
  <v-layout>
    <v-card-text class="title filter-header">Cart</v-card-text>
    <v-card-text
      style="color: #0288D1"
      class="title text-xs-right"
    >{{ subtotal | toCurrency }}</v-card-text>
  </v-layout>
  <v-card
    v-for="(item, index) in cart" 
    :key="index"
    flat
    color="grey lighten-3"
    class="pa-3"
  >
    <v-layout>
      <v-flex xs8>
        <v-card-text class="cart-text">
          <span class="font-weight-black">
            {{ item.quantity }}
          </span>
          &times; {{ item.name }}
        </v-card-text>
        <v-card-text class="cart-text">Size: {{ item.size }}</v-card-text>
        <v-card-text class="cart-text">Color: {{ item.color }}</v-card-text>
      </v-flex>
      <v-flex xs4>
        <v-btn
          class="headline side-x"
          small flat fab color="blue"
          @click="removeFromCart(index)"
        >
          &times;
        </v-btn>
      </v-flex>
    </v-layout>
  </v-card>
  <v-layout>
    <v-btn flat class="primary mt-2 mb-0" block
      to="/cart"
    >Checkout</v-btn>
  </v-layout>
</div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import { toCurrency } from '../helpers';

export default {
  computed: {
    ...mapState({
      cart: 'cart',
    }),
    ...mapGetters([
      'subtotal'
    ])
  },
  methods: {
    ...mapMutations([
      'removeFromCart'
    ])
  },
  filters: {
    toCurrency: toCurrency
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