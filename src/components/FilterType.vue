<template>
  <span v-if="filterVar.length != 0"> 
    <v-card-text class="title filter-header">{{ title }}</v-card-text>
    <v-list dense>
      <v-list-tile
        v-for="item in filterVar"
        :key="item.name"
      >
        <v-list-tile-content>
          <v-btn
            block
            flat
            :alt="item.description"
          >
            {{ item.name }}
          </v-btn>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </span>
</template>

<script>
export default {
  props: [
    'title',
    'filterVar'
  ]

}
</script>

<style>

</style>
