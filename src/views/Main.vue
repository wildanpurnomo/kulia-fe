<template>
  <div>
    <MainNavbar :pageTitle="currentPageName" />
    <router-view></router-view>
  </div>
</template>
<script>
import MainNavbar from "@/components/Navbar.vue";
import { EventBus } from "@/bus";

export default {
  name: "Main",
  components: {
    MainNavbar,
  },
  data: () => ({
    currentPageName: "Home",
    children: [
    ],
  }),
  methods: {
    async authenticate() {
      try {
        await this.$store.dispatch("auth/authenticate");
      } catch (error) {
        this.logout(true);
      }
    },
    async logout(isForceLogout = false) {
      let logoutResponse = await this.$store.dispatch("auth/logout");
      if (logoutResponse.status === 200) {
        let message = isForceLogout
          ? "Session expired"
          : "Successfully logged user out";
        this.redirectLogin(message);
      }
    },
    redirectLogin(snackbarMessage) {
      this.$router.push({
        name: "Login",
        params: {
          snackbarMessage: snackbarMessage,
        },
      });
    },
  },
  created() {
    EventBus.$on("onLogout", () => {
      this.logout();
    });
    EventBus.$on("onSessionEnd", () => {
      this.logout(true);
    });
    EventBus.$on("onAuthenticate", () => {
      this.authenticate();
    });
  },
};
</script>