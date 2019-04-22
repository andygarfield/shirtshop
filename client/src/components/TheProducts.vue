<template>
  <v-flex sm12 md9 class="text-xs-center">
    <v-pagination
      v-if="pageCount > 1"
      v-model="page"
      :length="pageCount"
      :total-visible="7"
    ></v-pagination>
    <v-layout wrap>
      <v-flex
        xs12 sm6 md6 lg4 pa-3
        v-for="p in productsInView"
        :key="p.product_id"
      >
        <product-card
          :product="p"
        ></product-card>
      </v-flex>
    </v-layout>
  </v-flex>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import ProductCard from './ProductCard';

export default {
  components: {
    ProductCard
  },
  computed: {
    ...mapState({
      products: 'products'
    }),
    ...mapGetters([
      'productsInView',
      'pageCount'
    ]),
    page: {
      set(page) {
        this.$store.commit('setPage', page);
      },
      get() {
        return this.$store.state.page;
      }
    }
  }
}
</script>
