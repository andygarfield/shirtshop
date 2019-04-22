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
        <v-list-tile>
          <v-list-tile-title>
            <router-link class="menu-item" to="/profile">Profile</router-link>
          </v-list-tile-title>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-title>
            <a class="menu-item" @click="logout">Log Out</a>
          </v-list-tile-title>
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
      {title: 'Profile', to: '/profile'},
      {title: 'Log Out', to: '/'},
    ]
  }),
  methods:{
    logout() {
      localStorage.removeItem('loggedIn');
      this.$auth.logOut();
    },
  }
}
</script>

<style scoped>
.menu-item {
  text-decoration: none;
  color: black;
}
</style>
