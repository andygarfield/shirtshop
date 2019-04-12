<template>
  <span>
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn
          icon
          color="primary"
          dark
          v-on="on"
        >
          <v-icon>person</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-tile
          v-for="(item, index) in items"
          :key="index"
        >
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </span>
</template>

<script>
export default {
  name: "the-profile",
  data: () => ({
    items: [
      {title: 'Profile'},
      {title: 'Log Off'},
    ]
  })
}
</script>

<style>

</style>
