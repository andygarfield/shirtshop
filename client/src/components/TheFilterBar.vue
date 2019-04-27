<template>
<v-flex hidden-sm-and-down md3 pr-3>
  <v-card
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
  </v-card>
</v-flex>
</template>

<script>
import { mapState } from 'vuex'
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
  }
}
</script>
