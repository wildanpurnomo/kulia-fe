<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card class="primary">
          <v-row>
            <v-col md="10" xs="10">
              <div class="white--text text-h5 ml-3">Daftar Author Diikuti</div>
            </v-col>
            <v-col md="2" xs="2" class="text-end">
              <v-btn
                text
                dark
                dense
                style="text-transform: capitalize"
                :to="{ name: 'SearchUser' }"
              >
                <v-icon>mdi-magnify</v-icon>
                <span class="white--text text-h6 hidden-sm-and-down"
                  >Cari Author</span
                >
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="searchQuery"
          outlined
          label="Cari username"
          append-icon="mdi-magnify"
        ></v-text-field>
      </v-col>
      <v-col cols="12" v-for="(item, index) in personalFollowingList" :key="index">
        <v-row>
          <v-col cols="8">
            <v-avatar>
              <img :src="item.profilePicUrl" alt="profilePicUrl" />
            </v-avatar>
            <span class="text-h6 ml-8">{{ item.username }}</span>
          </v-col>
          <v-col cols="4" class="text-end">
            <v-btn
              @click="displayDeleteConfirmationDialog(item)"
              text
              color="red"
            >
              <v-icon>mdi-delete</v-icon>
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
  name: "MyFollowing",

  components: {},

  data: () => ({
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
          EventBus.$emit("onFollowChange");
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