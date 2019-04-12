<template>
  <span>
    <v-btn
      v-if="!loggedIn"
      flat
      target="_blank"
    >
      <span class="mr-2">Log In</span>
    </v-btn>
    <v-btn
      v-if="!loggedIn"
      color="info"
      target="_blank"
    >
      <span class="mr-2">Sign Up</span>
    </v-btn>
    <the-profile-menu
      v-if="loggedIn"
    ></the-profile-menu>

  </span>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import TheProfileMenu from './TheProfileMenu';

export default {
  components: {
    TheProfileMenu
  },
  computed: mapState({
    loggedIn: 'loggedIn'
  }),
  methods: {
    ...mapMutations([
      'toggleLoggedIn'
    ])
  }
}
</script>

<style>

</style>
