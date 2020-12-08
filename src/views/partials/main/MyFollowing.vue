<template>
  <v-container>
    <v-row class="d-flex justify-center">
      <v-col cols="8">
        <v-text-field
          v-model="searchQuery"
          outlined
          dense
          label="Cari username"
          append-icon="mdi-magnify"
          rounded
        ></v-text-field>
      </v-col>
      <v-col
        cols="8"
        v-for="(item, index) in personalFollowingList"
        :key="index"
        class="mb-3 white rounded-lg"
      >
        <v-row>
          <v-col cols="8" class="pl-5">
            <v-avatar>
              <img :src="item.profilePicUrl" alt="profilePicUrl" />
            </v-avatar>
            <span class="text-h6 ml-4">{{ item.username }}</span>
          </v-col>
          <v-spacer></v-spacer>
          <v-col class="pr-5 d-flex align-center">
            <v-btn
              @click="displayDeleteConfirmationDialog(item)"
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
          :to="{ name: 'SearchUser' }"
        >
          <v-icon>mdi-account-multiple-plus</v-icon>
        </v-btn>
      </template>
      <span>Temukan Author Baru</span>
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
          >Batal</v-btn>
          <v-btn color="blue darken-1" text @click="unfollowUser">Ya</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import { EventBus } from "@/bus";

export default {
  name: "MyFollowing",

  components: {},

  data: () => ({
    colorTheme: "#4F4F68",
    searchQuery: "",
    isDeleteDialogShown: false,
    unfollowingData: {
      unfollowingId: "",
      unfollowingUsername: "",
    },
  }),
  computed: {
    personalFollowingList() {
      let stored = this.$store.getters["story/personalFollowingList"];
      return stored.filter((item) => {
        return item.username
          .toLowerCase()
          .match(this.searchQuery.toLowerCase());
      });
    },
  },
  methods: {
    async getFollowingList() {
      try {
        await this.$store.dispatch("story/getPersonalFollowing");
      } catch (error) {
        EventBus.$emit("onShowSnackbar", "Gagal mengambil data following");
      }
    },
    displayDeleteConfirmationDialog(userData) {
      this.unfollowingData.unfollowingId = userData._id;
      this.unfollowingData.unfollowingUsername = userData.username;
      this.isDeleteDialogShown = true;
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
          EventBus.$emit("onShowSnackbar", "Berhasil unfollow");
        }
      } catch (error) {
        EventBus.$emit("onShowSnackbar", "Gagal unfollow");
      }
    },
  },
  created() {
    if (this.personalFollowingList.length === 0) {
      this.getFollowingList();
    }
    EventBus.$emit("onPageChange", "Saya Ikuti");
  },
};
</script>