<template>
  <span v-if="filterList.length != 0"> 
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
            :class="{ info: index === selected }"
            @click="index === selected ? select(-1) : select(index)"
          >
            {{ item.name }}
          </v-btn>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </span>
</template>

<script>
import { mapState } from 'vuex';

Vue.forceUpdate();

function initialState() {
  return {
      selected: -1
  };
}

export default {
  data: () => ({
    selected: -1
  }),
  props: [
    'title',
    'filterList',
    'mutation'
  ], 
  methods: {
    select(index) {
      this.selected = index;
      this.$store.commit(this.mutation, index);
    }
  }
}

</script>

<style>

</style>
