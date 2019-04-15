<template>
  <v-flex xs3>
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
          :filterVar="departments"
        >
        </filter-type>
        <filter-type
          title="Categories"
          :filterList="categories"
          :filterSelectedVar="selectedCategory"
          
        >
        </filter-type>
      </v-navigation-drawer>
    </v-card>
  </v-flex>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import FilterType from './FilterType';

export default {
  components: {
    FilterType
  },
  computed: {
    ...mapState({
      departments: 'departments'
    }),
    ...mapGetters([
      'categories'
    ])
  },
  data () {
    return {};
  }
}
</script>

<style>

</style>
