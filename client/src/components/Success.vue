<template>
<v-container align-center>
  <h2 class="display-3">Success!</h2>
  <h4 class="display-1">Your order is complete</h4>
  <p class="mt-5">You will be receiving an email with your order information.</p> 
  <router-link to="/">Go Back to Products</router-link>
</v-container>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  methods: {
    ...mapMutations([
      'clearCart'
    ])
  },
  mounted() {
    this.clearCart();
  }
}
</script>
