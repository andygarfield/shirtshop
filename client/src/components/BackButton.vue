<template>
  <v-btn outline small @click="goBack">Go back</v-btn>
</template>

<script>
import { routerGoBack } from '../helpers';

export default {
  methods: {
    goBack: routerGoBack
  }
}
</script>

<style>

</style>
