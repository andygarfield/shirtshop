<template>
<span v-if="filter.items.length != 0"> 
  <v-card-text class="title filter-header">{{ title }}</v-card-text>
  <v-list dense>
    <v-list-tile
      v-for="(item, index) in filter.items"
      :key="index"
    >
      <v-list-tile-content>
        <v-btn
          block
          flat
          :alt="item.description"
          :class="{ info: index === filter.selectedIndex }"
          @click="index === filter.selectedIndex ? select(-1) : select(index)"
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

function initialState() {
  return {
      selected: -1
  };
}

export default {
  props: [
    'title',
    'filter',
    'action'
  ], 
  methods: {
    select(index) {
      this.$store.dispatch(this.action, index);
    }
  }
}
</script>
