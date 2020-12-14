<template>
  <v-container>
    <v-row>
      <v-col cols="3" class="hidden-sm-and-down">
        <v-card class="rounded-lg" flat>
          <v-card-title>Wappita Poin: {{ userData.points }}</v-card-title>
          <v-card-text>
            <div class="text-caption">
              Poin anda bertambah ketika postingan anda dibagikan pengguna lain ke beranda Wappita.
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="7">
        <!-- <EmptyView v-if="personalStories.length <= 0" /> -->
        <v-row v-for="(item, index) in personalStories" :key="index">
          <v-card
            width="100%"
            flat
            rounded
            :class="{
              'ml-5': $vuetify.breakpoint.smAndDown,
              'mr-5': $vuetify.breakpoint.smAndDown,
              'mb-5': index !== personalStories.length - 1,
              'mb-0': index === personalStories.length - 1,
            }"
            v-if="item.sharerId"
          >
            <v-list-item class="my-1">
<!-- foto -->
              <v-list-item-avatar>
                <v-img
                  :src="item.sharerId.profilePicUrl"
                  alt="profilePicUrlSharer"
                ></v-img>
              </v-list-item-avatar>
<!-- username, dll -->
              <v-list-item-content>
                <v-list-item-title>
                  <span class="font-weight-bold">
                    {{ item.sharerId.username }}
                  </span>
                  <span class="ml-3 text-caption text--disabled">membagikan konten</span>
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ getTimestampToRelativeTime(item.createdAt) }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
<!-- Caption -->
            <v-card-text v-if="item.caption.length > 0">
              <div class="text-body-2">{{ item.caption }}</div>
            </v-card-text>
<!-- konten yang di share -->
            <v-card class="mx-3 mb-4 rounded-lg" outlined flat>
              <UserContent :contentData="item.contentId" />
            </v-card>
          </v-card>
<!-- postingan orang -->
          <v-card
            width="100%"
            flat
            :class="{
              'ml-5': $vuetify.breakpoint.smAndDown,
              'mr-5': $vuetify.breakpoint.smAndDown,
              'mb-5': index !== personalStories.length - 1,
              'mb-0': index === personalStories.length - 1,
            }"
            v-else
          >
            <UserContent :contentData="item" />
          </v-card>
        </v-row>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-center align-center" v-if="personalStories.length <= 0">
      <v-col cols="12" md="8">
        <v-card-title class="font pt-1">Oops ...! <br></v-card-title >
        <v-card-text class="text--disabled text-body-1 font-weight-medium mb-10">
            Belum ada konten yang dapat kami tampilkan. Untuk mendapatkan pengalaman lebih seru,
            <router-link :to="{ name: 'SearchUser' }"><br>Temukan dan ikuti Author lainnya</router-link>
        </v-card-text>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-center" v-if="personalStories.length <= 0">
      <v-col cols="12" md="5">
        <v-img src="@/assets/image2.png" max-width="500"></v-img>
      </v-col>
    </v-row>
<!-- add content -->
    <div>
      <AddContent />
    </div>
  </v-container>
</template>
<script>
import { EventBus } from "@/bus";
import dateTimeMixin from "@/mixins/datetime.mixin";
import UserContent from "@/components/UserContent.vue";
import AddContent from "@/components/Add.vue";

export default {
  name: "Home",

  components: {
    UserContent,
    AddContent,
  },

  data: () => ({
    isShareToHomeDialogShown: false,
    isShareToSocialDialogShown: false,
  }),
  computed: {
    personalStories() {
      return this.$store.getters["story/personalStories"];
    },
    userData() {
      return this.$store.getters["auth/userData"];
    },
  },
  methods: {
    async getPersonalList() {
      try {
        await this.$store.dispatch("story/getPersonalStories");
      } catch (error) {
        EventBus.$emit("onShowSnackbar", "Gagal mengambil data beranda");
      }
    },
  },
  created() {
    if (this.personalStories.length === 0) {
      this.getPersonalList();
    }
  },
  mounted() {
    EventBus.$emit("onPageChange", "Beranda");
    EventBus.$on("onFollowChange", () => {
      this.getPersonalList();
    });
  },
  mixins: [dateTimeMixin],
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
