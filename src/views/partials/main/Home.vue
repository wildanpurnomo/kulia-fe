<template>
  <v-container>
    <v-row>
      <v-col cols="4" class="hidden-sm-and-down">
        <v-card>
          <v-card-title>Wappita Poin: {{ userData.points }}</v-card-title>
          <v-card-text>
            <div class="font-weight-light">
              Bagikan lebih banyak konten untuk lebih banyak poin
            </div>
          </v-card-text>
          <v-card-actions>
            <v-row align="center" justify="end">
              <v-btn text color="primary" :to="{ name: `AddContent` }"
                >Buat Konten</v-btn
              >
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col>
        <v-row v-for="(item, index) in personalStories" :key="index">
          <v-card
            width="100%"
            :class="{
              'ml-5': $vuetify.breakpoint.smAndDown,
              'mr-5': $vuetify.breakpoint.smAndDown,
              'mb-5': index !== personalStories.length - 1,
              'mb-0': index === personalStories.length - 1,
            }"
            v-if="item.sharerId"
          >
            <v-list-item>
              <v-list-item-avatar>
                <v-img
                  :src="item.sharerId.profilePicUrl"
                  alt="profilePicUrlSharer"
                ></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title
                  ><span class="font-weight-bold"
                    >{{ item.sharerId.username }}
                  </span>
                  <span class="text-body-2 font-weight-normal"
                    >membagikan konten</span
                  ></v-list-item-title
                >
                <v-list-item-subtitle>
                  {{ getTimestampToRelativeTime(item.createdAt) }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-card-text v-if="item.caption.length > 0">
              <div>{{ item.caption }}</div>
            </v-card-text>
            <v-divider></v-divider>
            <UserContent :contentData="item.contentId" />
          </v-card>
          <v-card
            width="100%"
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
  </v-container>
</template>
<script>
import { EventBus } from "@/bus";
import dateTimeMixin from "@/mixins/datetime.mixin";
import UserContent from "@/components/UserContent.vue";

export default {
  name: "Home",

  components: {
    UserContent,
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