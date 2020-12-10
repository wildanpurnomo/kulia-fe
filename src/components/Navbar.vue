<template>
  <nav>
    <v-toolbar :color="colorTheme" dark>
      <v-app-bar-nav-icon @click="isDrawer = !isDrawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="hidden-md-and-up pl-1">{{ pageTitle }}</v-toolbar-title>
      <v-toolbar-title class="hidden-md-and-down font pl-3">Wappita</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="logout" text class="pr-1">
        <span class="hidden-sm-and-down">Logout</span>
        <v-icon>mdi-logout-variant</v-icon>
      </v-btn>
    </v-toolbar>

    <v-navigation-drawer
      v-model="isDrawer"
      :color="colorTheme"
      absolute
      temporary
      dark
    >
      <v-list nav>
        <v-list-item two-line>
          <v-list-item-avatar>
            <v-img :src="user.profilePicUrl"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ user.username }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item
          v-for="(page, index) in pages"
          :key="index"
          link
          group="pages"
          :to="page.routerTo"
          exact
        >
          <v-list-item-icon>
            <v-icon>{{ page.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ page.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>
<script>
import { EventBus } from "@/bus";

export default {
  name: "Navbar",
  props: {
    pages: Array,
  },
  computed: {
    user() {
      return this.$store.getters["auth/userData"];
    },
  },
  data: () => ({
    isDrawer: false,
    colorTheme: "#394867",
    pageTitle: ''
  }),
  methods: {
    logout() {
      EventBus.$emit("onLogout");
    },
  },
  created() {
    if (this.user.username === "") {
      EventBus.$emit("onAuthenticate");
    }
  },
  mounted() {
    EventBus.$on("onPageChange", (pageTitle) => {
      this.pageTitle = pageTitle;
    });
  },
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Lobster+Two:wght@700&display=swap");
.font {
  font-family: Lobster Two;
  font-size: 25px;
  color: white
}
</style>