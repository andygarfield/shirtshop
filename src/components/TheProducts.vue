<template>
  <v-container>
    <v-layout justify-space-around wrap>
      <v-flex
        xs12 sm6 md4 class="pa-3"
        v-for="p in products"
        :key="p.product_id"
      >
        <v-card>
          <v-img
            class="white--text"
            height="200px"
            :src="p.image"
          >
          </v-img>
          <v-card-text>{{ p.name }}</v-card-text>
        </v-card>  
      </v-flex>
    </v-layout>
  </v-container> 
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState({
    products: 'products'
  }),
}
</script>

<style>

</style>
