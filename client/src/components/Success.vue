<template>
<v-container align-center>
  <home-button class=mb-5></home-button>
  <h2 class="display-3">Success!</h2>
  <h4 class="display-1">Your order is complete</h4>
  <p class="mt-5">You will be receiving an email with your order information.</p> 
</v-container>
</template>

<script>
import { mapMutations } from 'vuex';
import HomeButton from './HomeButton';

export default {
  components: {
    HomeButton
  },
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
