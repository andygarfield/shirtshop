<template>
<span>
  <v-btn
    v-if="!loggedIn"
    color="info"
    target="_blank"
    @click="login"
  >
    <span class="mr-2" small>Log In / Sign Up</span>
  </v-btn>
  <the-profile-menu
    v-if="loggedIn"
  >
  </the-profile-menu>
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
    login() {
      this.$auth.login();
    },
    ...mapMutations([
      'toggleLoggedIn'
    ])
  },
  async created() {
    try {
      await this.$auth.renewTokens();
    } catch (e) {
      // console.log(e);
    }
  },
}
</script>
