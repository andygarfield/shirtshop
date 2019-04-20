<template>
  <v-flex hidden-sm-and-down md3>
    <v-card
      class="d-inline-block elevation-3"
    >
      <v-navigation-drawer
        floating
        stateless
        value="true"
      >
        <filter-type
          title="Departments"
          :filter="departments"
          action="getProductsByDepartment"
        >
        </filter-type>
        <filter-type
          title="Categories"
          :filter="categories"
          action="getProductsByCategory"
        >
        </filter-type>
        <the-side-cart></the-side-cart>
      </v-navigation-drawer>
    </v-card>
  </v-flex>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import FilterType from './FilterType';
import TheSideCart from './TheSideCart';

export default {
  components: {
    FilterType,
    TheSideCart
  },
  data: () => ({
    search: ''
  }),
  computed: {
    ...mapState({
      departments: 'departments',
      categories: 'categories'
    })
  },
  data () {
    return {};
  }
}
</script>
