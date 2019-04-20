<template>
  <v-toolbar app>
    <v-img
      src="/tshirtshop.png"
      max-width="190px"
      :to="'/'"
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
</template>

<script>
import ToolbarLogin from './ToolbarLogin';

export default {
  components: {
    ToolbarLogin
  }
}
</script>
