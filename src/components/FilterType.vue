<template>
  <span v-if="filterVar.length != 0"> 
    <v-card-text class="title filter-header">{{ title }}</v-card-text>
    <v-list dense>
      <v-list-tile
        v-for="(item, index) in filterList"
        :key="index"
      >
        <v-list-tile-content>
          <v-btn
            block
            flat
            :alt="item.description"
            :class="{ info: index === selectedDepartment }"
            @click="index === selectedDepartment ? selectDepartment(-1) : selectDepartment(index)"
          >
            {{ item.name }}
          </v-btn>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </span>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  data () {
    return {
      selected: -1
    };
  },
  props: [
    'title',
    'filterList'
  ], 
  computed: {
    ...mapState({
      selectedDepartment: 'selectedDepartment',
    })
  },
  methods: {
    ...mapMutations([
      'selectDepartment'
    ])
  }
}
</script>

<style>

</style>
