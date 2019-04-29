<template>
  <v-btn outline small @click="goHome">Home</v-btn>
</template>

<script>
export default {
  methods: {
    goHome() {
      this.$router.push('/');
    }
  }
}
</script>
