<template>
  <router-view></router-view>
</template>
<script>

export default {
  name: "Auth",
  methods: {
    async authenticate() {
      try {
        let response = await this.$store.dispatch("auth/authenticate");
        if (response.status === 200) {
          this.$router.push({ name: "Home" });
        }
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.log("Not authenticated. This is expected");
        }
      }
    },
    async logout() {
      await this.$store.dispatch("auth/logout");
    },
  },
  created() {
    this.authenticate();
  },
};
</script>