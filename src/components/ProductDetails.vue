<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-btn outline @click="goBack">Go back</v-btn>
          <v-img>
          </v-img>
          <v-card-text>{{ this.$store.state.currentProduct.description }}</v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch('getProduct', this.$route.params.id)
  },
  methods: {
    goBack () {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    }
  }
}
</script>
