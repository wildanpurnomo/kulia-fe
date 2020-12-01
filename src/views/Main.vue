<template>
  <div>
    <MainNavbar :pages="children" />
    <Breadcrumbs />
    <Snackbar :duration="3000" />
    <router-view></router-view>
  </div>
</template>
<script>
import Snackbar from "@/components/Snackbar";
import MainNavbar from "@/components/Navbar.vue";
import Breadcrumbs from "@/components/Breadcrumbs.vue"
import { EventBus } from "@/bus";
import PageModel from "@/models/page.model";

export default {
  name: "Main",
  components: {
    MainNavbar,
    Snackbar,
    Breadcrumbs,
  },
  data: () => ({
    currentPageName: "Beranda",
    children: [
      new PageModel("Beranda", "mdi-view-dashboard", { name: "Home" }),
      new PageModel("Konten Saya", "mdi-content-paste", { name: "MyContent" }),
      new PageModel("Mengikuti", "mdi-account-box-multiple", { name: "MyFollowing" }),
      new PageModel("Edit Profil", "mdi-account", { name: "MyProfile" }),
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
        this.resetStates();
        let message = isForceLogout ? "Sesi berakhir" : "Berhasil log out";
        this.redirectLogin(message);
      }
    },
    redirectLogin(snackbarMessage) {
      this.$router
        .push({
          name: "Login",
          params: {
            snackbarMessage: snackbarMessage,
          },
        })
        .catch((err) => {
          if (process.env.NODE_ENV === "development") {
            console.error(err);
          }
        });
    },
    resetStates() {
      this.$store.dispatch("content/resetState");
    },
  },
  created() {
    EventBus.$on("onLogout", () => {
      this.logout();
    });
    EventBus.$on("onSessionEnd", () => {
      this.logout({ isForceLogout: true});
    });
    EventBus.$on("onAuthenticate", () => {
      this.authenticate();
    });
  },
};
</script>