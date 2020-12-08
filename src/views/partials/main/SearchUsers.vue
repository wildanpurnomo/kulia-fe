<template>
  <v-container>
    <v-row class="d-flex justify-center">
      <v-col cols="8">
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
      <v-col
        cols="8"
        v-for="(item, index) in searchResultList"
        :key="index"
        class="mb-3 white rounded-lg"
      >
        <v-row>
          <v-col cols="8" class="pl-5">
            <v-avatar>
              <img :src="item.profilePicUrl" alt="profilePicUrl" />
            </v-avatar>
            <span class="text-h6 ml-8">{{ item.username }}</span>
          </v-col>
          <v-spacer></v-spacer>
          <v-col class="pr-5 d-flex align-center">
            <v-btn
              v-if="!item.isFollowedByUser && item._id != userData._id"
              @click="followUser(item._id)"
              class="white--text blue-grey darken-3 rounded-xl"
              outlined
              width ="120"
            >Ikuti</v-btn>
            <v-btn
              v-if="item.isFollowedByUser && item._id != userData._id"
              @click="displayUnfollowConfirmation(item)"
              class="red--text text--accent-2 rounded-xl"
              outlined
            >Unfollow</v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-tooltip left>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          fab
          large
          dark
          bottom
          right
          fixed
          v-bind="attrs"
          v-on="on"
          :color="colorTheme"
          :to="{ name: 'MyFollowing' }"
        >
          <v-icon>mdi-account-multiple</v-icon>
        </v-btn>
      </template>
      <span>List Author Diikuti</span>
    </v-tooltip>
    <v-dialog v-model="isDeleteDialogShown" max-width="500" persistent>
      <v-card>
        <v-card-title class="headline">Konfirmasi unfollow</v-card-title>
        <v-card-text>{{
          `Anda akan unfollow ${unfollowingData.unfollowingUsername}`
        }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="isDeleteDialogShown = !isDeleteDialogShown"
            >Batal</v-btn
          >
          <v-btn color="blue darken-1" text @click="unfollowUser">Ya</v-btn>
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
    colorTheme: "#4F4F68",
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
        this.$router.replace(
          { name: "SearchUser" },
          {
            query: {
              username: this.searchQuery,
            },
          }
        );
        let response = await this.$store.dispatch(
          "story/discoverUsers",
          this.searchQuery
        );
        if (response.status === 200) {
          this.$router.push({ query: { username: this.searchQuery } });
          this.searchResultList = response.data.data;
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
          EventBus.$emit("onFollowChange");
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
          EventBus.$emit("onFollowChange");
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