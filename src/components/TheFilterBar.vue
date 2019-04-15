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
      </v-navigation-drawer>
    </v-card>
  </v-flex>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import FilterType from './FilterType';

export default {
  components: {
    FilterType
  },
  computed: {
    ...mapState({
      departments: 'departments',
    })
  },
  data () {
    return {};
  },
  methods: {
    ...mapMutations([
      'changeFilter'
    ])
  }
}
</script>

<style>

</style>
