<template>
<div>
  <p>Loading...</p>
</div>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
  methods: {
    handleLoginEvent(data) {
      this.$router.push(data.state.target || '/');
    }
  },
  computed: {
    ...mapMutations([
      'toggleLoggedIn'
    ])
  },
  created() {
    this.$auth.handleAuthentication();
    this.toggleLoggedIn();
  }
};
</script>