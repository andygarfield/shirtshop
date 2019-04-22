<template>
  <v-toolbar app>
    <v-img
      src="/tshirtshop.png"
      max-width="190px"
    ></v-img>
    <v-spacer></v-spacer>
    <toolbar-login class="mr-4"></toolbar-login>
    <v-badge left>
      <template v-slot:badge>
        <span>{{ cartCount }}</span>
      </template>
      <router-link to="/cart">
        <v-icon
          large
          color="grey lighten-1"
        >
          shopping_cart
        </v-icon>
      </router-link>
    </v-badge>
  </v-toolbar>
</template>

<script>
import { mapGetters } from 'vuex';
import ToolbarLogin from './ToolbarLogin';

export default {
  components: {
    ToolbarLogin
  },
  computed: {
    ...mapGetters({
      cartCount: 'cartCount'
    })
  }
}
</script>
