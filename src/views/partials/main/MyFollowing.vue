<template>
  <v-container>
    <v-row class="d-flex justify-center">
      <v-col cols="9" md="6" class="pl-1">
        <v-text-field
          v-model="searchQuery"
          outlined
          dense
          label="Cari username"
          append-icon="mdi-magnify"
          rounded
        ></v-text-field>
      </v-col>
      <v-col cols="2" md="2" class="d-flex justify-end pr-1">
        <v-btn
          dark
          rounded
          :color="colorTheme"
          :to="{ name: 'SearchUser' }"
        >
          <v-icon class="hidden-lg-and-up">mdi-account-multiple-plus</v-icon>
          <span class="hidden-md-and-down">Cari Author baru</span>
        </v-btn>
      </v-col>
    
      <v-col
        cols="11"
        md="8"
        v-for="(item, index) in personalFollowingList"
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
              @click="displayDeleteConfirmationDialog(item)"
              class="red--text text--accent-2 rounded-xl"
              outlined
            >
              <v-icon class="hidden-md-and-up">mdi-account-multiple-minus</v-icon>
              <span class="hidden-sm-and-down">Unfollow</span>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-center align-center" v-if="personalFollowingList.length <= 0">
      <v-col cols="12" md="8" sm="10">
        <v-card-title class="font pt-1">Oops ...! <br></v-card-title >
        <v-card-text class="text--disabled text-body-1 font-weight-medium mb-10">
            Tidak ada list Author yang dapat kami tampilkan, karena kamu belum mengikuti satupun Author.
            <router-link :to="{ name: 'SearchUser' }"><br>Temukan dan ikuti Author lainnya</router-link>
        </v-card-text>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-center" v-if="personalFollowingList.length <= 0">
      <v-col cols="12" md="5" sm="8">
        <v-img src="@/assets/image2.png" max-width="500"></v-img>
      </v-col>
    </v-row>
    <v-dialog v-model="isDeleteDialogShown" max-width="500" persistent>
      <v-card>
        <v-card-title class="text-md-h6 text-sm-subtitle">Konfirmasi unfollow</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mt-5">
          {{ `Anda akan unfollow ${unfollowingData.unfollowingUsername}` }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            :color="colorTheme"
            text
            @click="isDeleteDialogShown = !isDeleteDialogShown"
          >Batal</v-btn>
          <v-btn :color="colorTheme" text @click="unfollowUser">Ya</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import { EventBus } from "@/bus";

export default {
  name: "MyFollowing",

  components: {
  },

  data: () => ({
    colorTheme: "#394867",
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
    // EventBus.$emit("onPageChange", "Saya Ikuti");
    // EventBus.$emit("emptyViewMessage", "Tidak ada list Author yang dapat kami tampilkan, karena kamu belum mengikuti satupun Author.");
  },
  mounted() {
    EventBus.$emit("onPageChange", "Saya Ikuti");
  }
};
</script>
<style scope>
@import url("https://fonts.googleapis.com/css2?family=Lobster+Two:wght@700&display=swap");
.font {
  font-family: Lobster Two;
  font-size: 30px;
  color: #394867cb
}
</style>