<template>
<div v-if="profile">
  <back-button></back-button>
  <div>
    <div>
      <img :src="profile.picture">
    </div>
    <div>
      <h2>{{ profile.name }}</h2>
      <p>{{ profile.email }}</p>
    </div>
  </div>
  <div>
    <pre>{{ JSON.stringify(profile, null, 2) }}</pre>
  </div>
</div>
</template>

<script>
import BackButton from './BackButton';

export default {
  components: {
  },
  data() {
    return {
      profile: this.$auth.profile
    };
  },
  methods: {
    handleLoginEvent(data) {
      this.profile = data.profile;
    }
  }
};
</script>