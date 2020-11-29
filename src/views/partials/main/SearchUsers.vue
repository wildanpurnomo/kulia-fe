<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-form ref="searchUsersForm" @submit.prevent="discoverUsers">
          <v-text-field
            v-model="searchQuery"
            outlined
            label="Cari username"
            append-icon="mdi-magnify"
          ></v-text-field>
        </v-form>
      </v-col>
    </v-row>
    <v-row v-for="(item, index) in searchResultList" :key="index">
      <v-col cols="8">
        <v-avatar>
          <img :src="item.profilePicUrl" alt="profilePicUrl" />
        </v-avatar>
        <span class="text-h6 ml-8">{{ item.username }}</span>
      </v-col>
      <v-col cols="4" class="text-end">
        <v-btn
          text
          color="primary"
          v-if="!item.isFollowedByUser && item._id != userData._id"
          @click="followUser(item._id)"
        >
          <v-icon>mdi-plus</v-icon>
          <span class="hidden-sm-and-down">Ikuti</span>
        </v-btn>
        <v-btn
          text
          color="red"
          v-if="item.isFollowedByUser && item._id != userData._id"
          @click="displayUnfollowConfirmation(item)"
        >
          <v-icon>mdi-delete</v-icon>
          <span class="hidden-sm-and-down">Unfollow</span>
        </v-btn>
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