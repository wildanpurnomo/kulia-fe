<template>
  <v-container>
    <v-row class="d-flex justify-center">
      <v-col cols="9" md="6" class="pl-1">
        <v-form ref="searchUsersForm" @submit.prevent="discoverUsers">
          <v-text-field
            v-model="searchQuery"
            outlined
            dense
            label="Cari username"
            append-icon="mdi-magnify"
            rounded
          ></v-text-field>
        </v-form>
      </v-col>
      <v-col cols="2" md="2" class="d-flex justify-end pr-1">
        <v-btn
          dark
          rounded
          :color="colorTheme"
          :to="{ name: 'MyFollowing' }"
        >
          <v-icon class="hidden-sm-and-up">mdi-account-multiple</v-icon>
          <span class="hidden-sm-and-down">Author diikuti</span>
        </v-btn>
      </v-col>
      <v-col
        cols="11"
        md="8"
        v-for="(item, index) in searchResultList"
        :key="index"
        class="mb-3 px-5 py-1 white rounded-lg"
      >
        <v-row>
          <v-col cols="2" md="1">
            <v-avatar>
              <img :src="item.profilePicUrl" alt="profilePicUrl" />
            </v-avatar>
          </v-col>
          <v-col class="d-flex align-center">
            <span class="text-md-h6 text-sm-subtitle pl-3">{{ item.username }}</span>
          </v-col>
          <v-col class="d-flex align-center justify-end">
            <v-btn
              v-if="!item.isFollowedByUser && item._id != userData._id"
              @click="followUser(item._id)"
              class="rounded-xl"
              dark
              depressed
              :color="colorTheme"
            >
              <v-icon class="hidden-sm-and-up">mdi-account-multiple-plus</v-icon>
              <span class="hidden-sm-and-down px-5">Ikuti</span>
            </v-btn>
            <v-btn
              v-if="item.isFollowedByUser && item._id != userData._id"
              @click="displayUnfollowConfirmation(item)"
              class="red--text text--accent-2 rounded-xl"
              outlined
            >
              <v-icon class="hidden-sm-and-up">mdi-account-multiple-minus</v-icon>
              <span class="hidden-sm-and-down">Unfollow</span>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-dialog v-model="isDeleteDialogShown" max-width="500" persistent>
      <v-card>
        <v-card-title class="headline">Konfirmasi unfollow</v-card-title>
        <v-card-text>{{
          `Anda akan unfollow ${unfollowingData.unfollowingUsername}`
        }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            :color="colorTheme"
            text
            @click="isDeleteDialogShown = !isDeleteDialogShown"
            >Batal</v-btn
          >
          <v-btn :color="colorTheme" text @click="unfollowUser">Ya</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import { EventBus } from "@/bus";

export default {
  name: "SearchUsers",

  components: {},

  data: () => ({
    colorTheme: "#394867",
    searchQuery: "",
    searchResultList: [],
    isDeleteDialogShown: false,
    unfollowingData: {
      unfollowingId: "",
      unfollowingUsername: "",
    },
  }),
  computed: {
    userData() {
      return this.$store.getters["auth/userData"];
    },
  },
  methods: {
    async discoverUsers() {
      try {
        let response = await this.$store.dispatch(
          "story/discoverUsers",
          this.searchQuery
        );
        if (response.status === 200) {
          this.searchResultList = response.data.data;
          this.$router.push({ query: { username: this.searchQuery } }, () => console.log("Finished"));
        }
      } catch (error) {
        EventBus.$emit("onShowSnackbar", "Gagal mengambil data beranda");
      }
    },
    async followUser(userId) {
      try {
        let response = await this.$store.dispatch("story/followUser", {
          followingId: userId,
        });
        if (response.status === 200) {
          this.$store.dispatch("story/getPersonalStories");
          this.discoverUsers();
        }
      } catch (error) {
        EventBus.$emit("onShowSnackbar", "Gagal mengikuti");
      }
    },
    async unfollowUser() {
      try {
        this.unfollowingData.unfollowingUsername = undefined;
        let response = await this.$store.dispatch(
          "story/unfollowUser",
          this.unfollowingData
        );
        if (response.status === 200) {
          this.$store.dispatch("story/getPersonalStories");
          this.isDeleteDialogShown = false;
          this.discoverUsers();
        }
      } catch (error) {
        EventBus.$emit("onShowSnackbar", "Gagal unfollow");
      }
    },
    displayUnfollowConfirmation(userData) {
      this.unfollowingData.unfollowingId = userData._id;
      this.unfollowingData.unfollowingUsername = userData.username;
      this.isDeleteDialogShown = true;
    },
  },
  created() {
    if (this.$route.query.username) {
      this.searchQuery = this.$route.query.username.split("%20").join("");
      this.discoverUsers();
    }
  },
  mounted() {
    EventBus.$emit("onPageChange", "Cari Author");
  },
};
</script>